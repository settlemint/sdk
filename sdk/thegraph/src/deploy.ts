import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { YAML } from "bun";
import { executeCommand } from "@settlemint/sdk-utils/terminal";
import { getPackageManagerExecutable } from "@settlemint/sdk-utils/package-manager";

type SubgraphYaml = {
  specVersion: string;
  schema: { file: string };
  dataSources: Array<{
    kind: string;
    name: string;
    network?: string;
    source: { address?: string; abi: string; startBlock?: number };
    mapping: {
      apiVersion: string;
      language: string;
      file: string;
      entities?: string[];
      abis: Array<{ name: string; file: string }>;
      eventHandlers?: Array<{ event: string; handler: string }>;
    };
  }>;
  templates?: Array<{
    kind: string;
    name: string;
    network?: string;
    source: { abi: string };
    mapping: {
      apiVersion: string;
      language: string;
      file: string;
      entities?: string[];
      abis: Array<{ name: string; file: string }>;
      eventHandlers?: Array<{ event: string; handler: string }>;
    };
  }>;
  features?: string[];
};

export interface DeployWithGraphCLIOptions {
  workingDir: string;
  adminUrl: string; // The Graph admin endpoint (e.g. https://host/admin or /api)
  subgraphName: string;
  ipfsUrl?: string; // The IPFS URL to use (falls back to env)
  versionLabel?: string; // default timestamped
  network?: string; // Network to set in yaml (falls back to env)
  bumpApiVersion?: boolean; // ensure >= 0.0.9
  setAddresses?: Record<string, string>; // map of dataSource.name -> address
}

function normalizeAdminUrl(url: string): string {
  const u = new URL(url);
  if (!u.pathname.includes("/admin") && !u.pathname.includes("/api")) {
    u.pathname = `${u.pathname.endsWith("/") ? u.pathname.slice(0, -1) : u.pathname}/admin`;
  }
  return u.toString();
}

async function findSubgraphYamlFile(workingDir: string): Promise<string> {
  const candidates = [
    join(workingDir, "generated", "scs.subgraph.yaml"),
    join(workingDir, "subgraph", "subgraph.yaml"),
    join(workingDir, "subgraph.yaml"),
  ];
  for (const p of candidates) {
    try {
      await readFile(p);
      return p;
    } catch {}
  }
  throw new Error(`Subgraph configuration file not found in ${workingDir}`);
}

function atLeast(current: string, min: string): string {
  // crude semver compare for 0.0.x
  const [a1 = 0, a2 = 0, a3 = 0] = current.split(".").map((n) => Number.parseInt(n, 10));
  const [b1 = 0, b2 = 0, b3 = 0] = min.split(".").map((n) => Number.parseInt(n, 10));
  if (a1 > b1) return current;
  if (a1 < b1) return min;
  if (a2 > b2) return current;
  if (a2 < b2) return min;
  if ((a3 || 0) >= (b3 || 0)) return current;
  return min;
}

async function prepareYaml(
  path: string,
  options: Pick<DeployWithGraphCLIOptions, "network" | "bumpApiVersion" | "setAddresses">,
) {
  const raw = await readFile(path, "utf8");

  // Prefer structured edit when stringify exists
  type YamlModule = { parse: (s: string) => unknown; stringify?: (v: unknown) => string };
  const Y = YAML as unknown as YamlModule;
  if (typeof Y.stringify === "function") {
    const yamlDoc = Y.parse(raw) as SubgraphYaml;
    const minApi = "0.0.9";
    for (const ds of yamlDoc.dataSources) {
      if (options.network) ds.network = options.network;
      if (options.bumpApiVersion) ds.mapping.apiVersion = atLeast(ds.mapping.apiVersion, minApi);
      if (options.setAddresses?.[ds.name]) {
        ds.source.address = options.setAddresses[ds.name];
      }
    }
    if (yamlDoc.templates) {
      for (const t of yamlDoc.templates) {
        if (options.network) t.network = options.network;
        if (options.bumpApiVersion) t.mapping.apiVersion = atLeast(t.mapping.apiVersion, minApi);
      }
    }
    await writeFile(path, Y.stringify(yamlDoc));
    return;
  }

  // Fallback: targeted text edits (no stringify available in this Bun runtime)
  let updated = raw;
  const network = options.network;
  const setAddresses = options.setAddresses ?? {};

  // Inject network under each data source if provided and not present
  if (network) {
    // Matches a dataSource header line: "- kind: ...\n    name: <Name>" and ensures a network line after name
    updated = updated.replace(
      /(^\s*-\s*kind:\s*ethereum[\s\S]*?\n\s*name:\s*.*?)(\n)(?!\s*network:)/gm,
      `$1$2    network: ${network}$2`,
    );
  }

  // Replace addresses per data source name
  for (const [name, address] of Object.entries(setAddresses)) {
    const re = new RegExp(`(name:\\s*${name}[\\s\\S]*?source:[\\s\\S]*?address:\\s*")0x[0-9a-fA-F]{40}(" )?`, "m");
    // Try common patterns; if not found, do a looser replace within the data source block
    if (re.test(updated)) {
      updated = updated.replace(re, `$1${address}$2`);
    } else {
      const blockRe = new RegExp(`(name:\\s*${name}[\\s\\S]*?source:[\\s\\S]*?address:\\s*")[^"]*(")`, "m");
      updated = updated.replace(blockRe, `$1${address}$2`);
    }
  }

  await writeFile(path, updated);
}

export async function deploySubgraphWithGraphCLI(opts: DeployWithGraphCLIOptions): Promise<string> {
  const {
    workingDir,
    adminUrl,
    subgraphName,
    ipfsUrl,
    versionLabel = `v1.0.${Date.now()}`,
    network,
    bumpApiVersion = true,
    setAddresses,
  } = opts;
  // Resolve network & IPFS dynamically (no hardcoded defaults)
  const resolvedNetwork = network ?? process.env.SETTLEMINT_THEGRAPH_NETWORK;
  if (!resolvedNetwork) {
    throw new Error("Network not provided. Set 'network' option or SETTLEMINT_THEGRAPH_NETWORK env.");
  }
  const resolvedIpfs = ipfsUrl ?? process.env.SETTLEMINT_IPFS_ENDPOINT ?? process.env.SETTLEMINT_IPFS;
  if (!resolvedIpfs) {
    throw new Error("IPFS endpoint not provided. Set 'ipfsUrl' option or SETTLEMINT_IPFS_ENDPOINT env.");
  }

  const yamlPath = await findSubgraphYamlFile(workingDir);
  await prepareYaml(yamlPath, { network: resolvedNetwork, bumpApiVersion, setAddresses });

  const { command, args } = await getPackageManagerExecutable();

  // codegen and build using installed graph cli
  await executeCommand(command, [...args, "graph", "codegen", yamlPath], { cwd: workingDir });
  await executeCommand(command, [...args, "graph", "build", yamlPath], { cwd: workingDir });

  const admin = normalizeAdminUrl(adminUrl);

  // create and deploy
  await executeCommand(command, [...args, "graph", "create", "--node", admin, subgraphName], { cwd: workingDir });
  await executeCommand(
    command,
    [
      ...args,
      "graph",
      "deploy",
      "--version-label",
      versionLabel,
      "--node",
      admin,
      "--ipfs",
      resolvedIpfs,
      subgraphName,
      yamlPath,
    ],
    { cwd: workingDir },
  );

  // build query endpoint from admin
  const url = new URL(admin);
  url.pathname = url.pathname.replace(/\/(admin|api)\/?$/, "/");
  if (!url.pathname.endsWith("/")) url.pathname += "/";
  url.pathname += `subgraphs/name/${subgraphName}`;
  return url.toString();
}
