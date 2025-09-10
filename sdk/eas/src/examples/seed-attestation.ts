/**
 * Seed a schema and one attestation against the EAS contracts
 * that the local EAS subgraph is indexing (reads addresses from subgraph.yaml).
 */

import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { Address, Hex } from "viem";
import { encodeAbiParameters, parseAbiParameters } from "viem";
import { ZERO_ADDRESS, ZERO_BYTES32, createEASClient } from "../eas.js";
import { waitForTransactionReceipt } from "@settlemint/sdk-portal";

async function seed() {
  const portal = process.env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT;
  const token = process.env.SETTLEMINT_ACCESS_TOKEN;
  const from = process.env.SETTLEMINT_DEPLOYER_ADDRESS as Address | undefined;
  if (!portal || !token || !from) {
    console.error(
      "Missing env: SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT, SETTLEMINT_ACCESS_TOKEN, SETTLEMINT_DEPLOYER_ADDRESS",
    );
    process.exit(1);
  }

  // Locate subgraph.yaml next to the EAS subgraph
  const thisFile = fileURLToPath(import.meta.url);
  const examplesDir = dirname(thisFile);
  const easRoot = dirname(examplesDir); // sdk/eas/src
  const subgraphYamlPath = join(dirname(easRoot), "subgraph", "subgraph.yaml");
  const yamlRaw = await readFile(subgraphYamlPath, "utf8");
  // Minimalistic extraction of addresses to avoid adding yaml dependency here
  const easMatch = yamlRaw.match(
    /\n\s*-\s*kind:\s*ethereum[\s\S]*?\n\s*name:\s*EAS[\s\S]*?\n\s*address:\s*"(0x[a-fA-F0-9]{40})"/,
  );
  const regMatch = yamlRaw.match(
    /\n\s*-\s*kind:\s*ethereum[\s\S]*?\n\s*name:\s*SchemaRegistry[\s\S]*?\n\s*address:\s*"(0x[a-fA-F0-9]{40})"/,
  );
  const easAddress = (easMatch?.[1] ?? "") as Address;
  const schemaRegistryAddress = (regMatch?.[1] ?? "") as Address;
  if (!easAddress || !schemaRegistryAddress) {
    throw new Error("Could not find EAS/SchemaRegistry addresses in subgraph.yaml");
  }

  console.log("Using contracts indexed by the subgraph:", { easAddress, schemaRegistryAddress });

  const client = createEASClient({
    instance: portal,
    accessToken: token,
    easContractAddress: easAddress,
    schemaRegistryContractAddress: schemaRegistryAddress,
  });

  // Register a simple schema
  console.log("Registering schema...");
  const reg = await client.registerSchema(
    {
      fields: [
        { name: "userAddress", type: "address" },
        { name: "score", type: "uint256" },
        { name: "category", type: "string" },
        { name: "verified", type: "bool" },
      ],
      resolver: ZERO_ADDRESS,
      revocable: true,
    },
    from,
  );
  const regRcpt = await waitForTransactionReceipt(reg.hash, {
    portalGraphqlEndpoint: portal,
    accessToken: token,
    timeout: 60000,
  });
  const schemaUID: Hex | undefined = (() => {
    const evs = regRcpt.receipt?.events;
    const arr = Array.isArray(evs) ? evs : evs ? Object.values(evs) : [];
    for (const ev of arr) {
      if (ev && typeof ev === "object" && "args" in ev && ev.args && typeof ev.args === "object" && "uid" in ev.args) {
        const uid = (ev.args as { uid?: unknown }).uid;
        if (typeof uid === "string") return uid as Hex;
      }
    }
    return undefined;
  })();
  if (!schemaUID) throw new Error("Could not extract schema UID from receipt");
  console.log("Schema UID:", schemaUID);

  // Create one attestation
  console.log("Creating attestation...");
  const data = encodeAbiParameters(
    parseAbiParameters("address userAddress, uint256 score, string category, bool verified"),
    [from, BigInt(95), "developer", true],
  );
  const att = await client.attest(
    {
      schema: schemaUID,
      data: {
        recipient: from,
        expirationTime: BigInt(0),
        revocable: true,
        refUID: ZERO_BYTES32,
        data,
        value: BigInt(0),
      },
    },
    from,
  );

  console.log("Attestation tx:", att.hash);
}

if (import.meta.main) {
  seed().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

export { seed };
