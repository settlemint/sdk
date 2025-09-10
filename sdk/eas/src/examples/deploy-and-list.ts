/**
 * Minimal EAS Subgraph Deploy + List Example
 *
 * - Deploys/uses EAS contracts
 * - Deploys a subgraph via shared Graph deploy utils (through EAS client)
 * - Lists a few attestations and prints data lengths to verify mapping fix
 *
 * Env required:
 * - SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT
 * - SETTLEMINT_ACCESS_TOKEN
 * - SETTLEMINT_DEPLOYER_ADDRESS
 * - SETTLEMINT_THEGRAPH_ADMIN_ENDPOINT
 */

import type { Address, Hex } from "viem";
import { encodeAbiParameters, parseAbiParameters } from "viem";
import { waitForTransactionReceipt } from "@settlemint/sdk-portal";
import { createEASClient } from "../eas.js";

async function deployAndList() {
  const portal = process.env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT;
  const token = process.env.SETTLEMINT_ACCESS_TOKEN;
  const deployer = process.env.SETTLEMINT_DEPLOYER_ADDRESS as Address | undefined;
  const graphAdmin = process.env.SETTLEMINT_THEGRAPH_ADMIN_ENDPOINT;

  if (!portal || !token || !deployer || !graphAdmin) {
    console.error(
      "Missing required env: SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT, SETTLEMINT_ACCESS_TOKEN, SETTLEMINT_DEPLOYER_ADDRESS, SETTLEMINT_THEGRAPH_ADMIN_ENDPOINT",
    );
    process.exit(1);
  }

  console.log("🚀 EAS Deploy + List (Minimal)");

  const client = createEASClient({
    instance: portal,
    accessToken: token,
    debug: true,
  });

  // Ensure contracts are available
  let easAddress: Address | undefined;
  let schemaRegistryAddress: Address | undefined;
  try {
    console.log("🏗️  Deploying EAS contracts (or using existing if already deployed)...");
    const deployment = await client.deploy(deployer);
    easAddress = deployment.easAddress;
    schemaRegistryAddress = deployment.schemaRegistryAddress;
    console.log("✅ Contracts ready:");
    console.log("   EAS:", easAddress);
    console.log("   SchemaRegistry:", schemaRegistryAddress);
  } catch (_err) {
    console.log("ℹ️  Using existing contract addresses (deploy step failed or skipped)");
    const addrs = client.getContractAddresses();
    easAddress = addrs.easAddress;
    schemaRegistryAddress = addrs.schemaRegistryAddress;
    if (!easAddress || !schemaRegistryAddress) {
      throw new Error("EAS/SchemaRegistry addresses not available. Configure in client options or deploy first.");
    }
    console.log("   EAS:", easAddress);
    console.log("   SchemaRegistry:", schemaRegistryAddress);
  }

  // Deploy subgraph
  const name = `eas-example-${Date.now()}`;
  console.log("📊 Deploying subgraph:", name);
  const endpoint = await client.deploySubgraph(graphAdmin, name);
  console.log("✅ Subgraph query endpoint:", endpoint);

  // Wait for the subgraph to start syncing and become queryable
  await waitForSubgraphReady(endpoint, token!, 90_000, 3_000);

  // Seed one schema + one attestation so we can verify end-to-end
  console.log("\n📝 Registering a test schema and creating one attestation...");
  // Register schema
  const schemaReg = await client.registerSchema(
    {
      fields: [
        { name: "userAddress", type: "address" },
        { name: "score", type: "uint256" },
        { name: "category", type: "string" },
        { name: "verified", type: "bool" },
      ],
      resolver: "0x0000000000000000000000000000000000000000",
      revocable: true,
    },
    deployer,
  );
  const schemaReceipt = await waitForTransactionReceipt(schemaReg.hash as Hex, {
    portalGraphqlEndpoint: portal!,
    accessToken: token!,
    timeout: 60_000,
  });
  const schemaUID = extractUidFromEvents(schemaReceipt?.receipt?.events);
  console.log("   Schema UID:", schemaUID);

  // Create multiple attestations
  const payloads: Array<[bigint, string, boolean]> = [
    [BigInt(95), "developer", true],
    [BigInt(88), "tester", true],
    [BigInt(72), "auditor", false],
  ];
  for (const [score, category, verified] of payloads) {
    const encoded = encodeAbiParameters(
      parseAbiParameters("address userAddress, uint256 score, string category, bool verified"),
      [deployer, score, category, verified],
    );
    await client.attest(
      {
        schema: schemaUID,
        data: {
          recipient: deployer,
          expirationTime: BigInt(0),
          revocable: true,
          refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
          data: encoded as Hex,
          value: BigInt(0),
        },
      },
      deployer,
    );
  }

  // Wait until all are indexed
  await waitForAttestationCount(client, payloads.length, 90_000, 3_000);

  // List via SDK then print raw Graph response unformatted
  console.log("\n🔎 Listing up to 5 attestations (SDK + raw Graph):");
  try {
    const list = await client.getAttestations({ limit: 5, offset: 0 });
    console.log(`Found ${list.length} attestations`);
  } catch (err) {
    console.error("❌ SDK list failed:", err);
  }

  try {
    const raw = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-auth-token": token! },
      body: JSON.stringify({
        query:
          "query($first:Int=10){attestations(first:$first,orderBy:time,orderDirection:desc){id schema{ id } attester recipient time expirationTime revocable refUID data revokedAt txHash}}",
        variables: { first: 10 },
      }),
    });
    const text = await raw.text();
    console.log(`\n--- Raw Graph response (attestations) ---\n${text}\n--- end ---`);
  } catch (err) {
    console.error("❌ Raw Graph query failed:", err);
  }
}

if (typeof require !== "undefined" && require.main === module) {
  deployAndList().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

export { deployAndList };

async function waitForSubgraphReady(endpoint: string, token: string, timeoutMs = 60_000, intervalMs = 2_000) {
  console.log("⏳ Waiting for subgraph to start syncing and accept queries...");
  const start = Date.now();
  let lastError: unknown;
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-auth-token": token },
        body: JSON.stringify({ query: "{ _meta { hasIndexingErrors block { number } } }" }),
      });
      const text = await res.text();
      try {
        const json = JSON.parse(text) as {
          data?: { _meta?: { hasIndexingErrors?: boolean; block?: { number?: number | string } } };
          errors?: Array<{ message: string }>;
        };
        if (json?.data?._meta?.block?.number != null) {
          console.log(`✅ Subgraph ready (block: ${json.data._meta.block.number})`);
          return;
        }
        // If Graph returns an errors array, bubble it up to retry unless it's clearly fatal
        if (json?.errors?.length) {
          const msg = json.errors.map((e) => e.message).join("; ");
          if (/has not started syncing yet/i.test(msg)) {
            lastError = msg;
          } else {
            lastError = msg;
          }
        }
      } catch {
        // Non-JSON or unexpected response, keep retrying
        lastError = text;
      }
    } catch (err) {
      lastError = err;
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  console.warn("⚠️  Subgraph not ready within timeout. Proceeding; queries may fail briefly.");
  if (lastError) console.warn("Last error:", lastError);
}

function extractUidFromEvents(events: unknown): Hex {
  let arr: unknown[] = [];
  if (Array.isArray(events)) arr = events;
  else if (events && typeof events === "object") arr = Object.values(events as Record<string, unknown>);
  for (const ev of arr) {
    if (isUidEvent(ev)) return ev.args.uid as Hex;
  }
  throw new Error("Could not extract UID from events");
}

function isUidEvent(ev: unknown): ev is { args: { uid: Hex } } {
  if (!ev || typeof ev !== "object") return false;
  const args = (ev as { args?: unknown }).args;
  if (!args || typeof args !== "object") return false;
  const uid = (args as { uid?: unknown }).uid;
  return typeof uid === "string";
}

async function waitForAttestationCount(
  client: ReturnType<typeof createEASClient>,
  minCount = 1,
  timeoutMs = 60_000,
  intervalMs = 2_000,
) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const list = await client.getAttestations({ limit: minCount, offset: 0 });
      if (list.length >= minCount) return;
    } catch {}
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  console.warn(`⚠️  Attestations not indexed to ${minCount} within timeout; proceeding.`);
}
