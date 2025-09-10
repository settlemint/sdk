/**
 * EAS The Graph Listing Example
 *
 * This example demonstrates how to configure the EAS SDK with The Graph
 * and perform bulk reads for schemas and attestations using the same style
 * as the other examples.
 */

import { createEASClient } from "../eas.js";
import { createLogger, requestLogger } from "@settlemint/sdk-utils/logging";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import type { Address, Hex } from "viem";
import { decodeAbiParameters, parseAbiParameters } from "viem";

async function theGraphWorkflow() {
  const logger = createLogger();
  const env = await loadEnv(true, false);

  if (!env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT) {
    console.error("❌ Missing SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT");
    process.exit(1);
  }
  if (!env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS || env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS.length === 0) {
    console.error(
      "❌ Missing SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS (JSON array of subgraph URLs ending with /<name>)",
    );
    process.exit(1);
  }

  console.log("🚀 EAS The Graph Listing Example");
  console.log("================================\n");

  // Build client with The Graph config
  const eas = createEASClient({
    instance: env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT,
    accessToken: env.SETTLEMINT_ACCESS_TOKEN,
    theGraph: {
      instances: env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS,
      subgraphName: env.SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH ?? "eas",
      accessToken: env.SETTLEMINT_ACCESS_TOKEN,
      cache: "force-cache",
    },
    debug: true,
  });

  // Replace global fetch logging for visibility (no-op in Node unless used)
  // This pattern mirrors other examples and ensures consistent logging.
  void requestLogger(logger, "eas-thegraph", fetch);

  // Step 1: List Schemas
  console.log("📚 Step 1: List Schemas (via The Graph)");
  try {
    const schemas = await eas.getSchemas({ limit: 10, offset: 0 });
    if (schemas.length === 0) {
      console.log("⚠️  No schemas found in the subgraph\n");
    } else {
      console.log(`✅ Found ${schemas.length} schema(s)`);
      for (const s of schemas) {
        console.log(`   • ${s.uid} | revocable=${s.revocable} | resolver=${s.resolver}`);
      }
      console.log();
    }
  } catch (error) {
    console.log("❌ Failed to list schemas:", error);
    console.log();
  }

  // Step 2: List Attestations (optionally filter by schema/attester/recipient)
  console.log("🧾 Step 2: List Attestations (via The Graph)");
  try {
    // Optional filters
    const schemaUID = process.env.EAS_SCHEMA_UID as Hex | undefined;
    const attester = process.env.EAS_ATTESTER as Address | undefined;
    const recipient =
      (process.env.SETTLEMINT_DEPLOYER_ADDRESS as Address | undefined) ??
      (process.env.EAS_RECIPIENT as Address | undefined);

    const attestations = await eas.getAttestations({
      limit: 10,
      offset: 0,
      schema: schemaUID,
      attester,
      recipient,
    });

    if (attestations.length === 0) {
      console.log("⚠️  No attestations found with current filters\n");
    } else {
      console.log(`✅ Found ${attestations.length} attestation(s)`);
      for (const a of attestations) {
        console.log(`   • uid=${a.uid} schema=${a.schema} attester=${a.attester} recipient=${a.recipient}`);
      }
      console.log();
    }
  } catch (error) {
    console.log("❌ Failed to list attestations:", error);
    console.log();
  }

  // Step 3: (Optional) Decode attestation data for the first attestation of the first schema
  console.log("🔍 Step 3: Optional Data Decode Example");
  try {
    const schemas = await eas.getSchemas({ limit: 1, offset: 0 });
    if (schemas.length === 0) {
      console.log("ℹ️  Skipping decode: no schemas available\n");
      return;
    }

    const schema = schemas[0]!;
    const [example] = await eas.getAttestations({ limit: 1, offset: 0, schema: schema.uid });
    if (!example || !example.data || example.data === ("0x" as Hex)) {
      console.log("ℹ️  Skipping decode: no example attestation with data found\n");
      return;
    }

    // Convert the EAS schema string (e.g., "uint256 score, address user") to ABI parameter format
    const abiParams = parseAbiParameters(schema.schema);
    const decoded = decodeAbiParameters(abiParams, example.data);

    console.log("✅ Decoded example attestation data:");
    console.log(decoded);
    console.log();
  } catch (error) {
    console.log("⚠️  Decode step failed:", error);
    console.log();
  }

  console.log("🎉 The Graph listing example complete\n");
}

if (typeof require !== "undefined" && require.main === module) {
  theGraphWorkflow().catch(console.error);
}

export { theGraphWorkflow };
