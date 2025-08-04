/**
 * Demo script to show Portal vs Besu RPC comparison
 * Run this to demonstrate the issue with Portal GraphQL queries
 */

import { createPortalClient } from "@settlemint/sdk-portal";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { createLogger, requestLogger } from "@settlemint/sdk-utils/logging";
import { type Address, createPublicClient, type Hex, http } from "viem";
import type { introspection } from "../portal/portal-env.js";

// Test data from our deployment
const EAS_ADDRESS = "0x8da4813fe48efdb7fc7dd1bfee40fe20f01e53d5" as Address;
const SCHEMA_REGISTRY_ADDRESS = "0xe4aa2d08b2884d3673807f44f3248921808fd609" as Address;
const SCHEMA_UID = "0x08b2e2e97720789130096fe5442c7fb4e4e9e2b13b94da335f2d8fcb367de509" as Hex;
const ATTESTATION_UID = "0x525cdc37347b0472e4535513b0e555d482330ea7f3530bcad0053776779b8ae7" as Hex;

async function runDemo() {
  console.log("Portal vs Besu RPC Comparison");
  console.log("=============================\n");

  // Load environment variables using SDK utilities
  const env = await loadEnv(true, false);
  const logger = createLogger();

  if (!env.SETTLEMINT_ACCESS_TOKEN) {
    console.error("❌ Please set SETTLEMINT_ACCESS_TOKEN environment variable");
    return;
  }

  if (!env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT) {
    console.error("❌ Please set SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT environment variable");
    return;
  }

  // Use environment variables for RPC endpoint
  const rpcUrl = env.SETTLEMINT_BLOCKCHAIN_NODE_JSON_RPC_ENDPOINT || env.SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER_JSON_RPC_ENDPOINT;
  if (!rpcUrl) {
    console.error("❌ Please set SETTLEMINT_BLOCKCHAIN_NODE_JSON_RPC_ENDPOINT or SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER_JSON_RPC_ENDPOINT environment variable");
    return;
  }

  // Create type-safe portal client using SDK
  const { client: portalClient, graphql: portalGraphql } = createPortalClient<{
    introspection: introspection;
    disableMasking: true;
    scalars: {
      JSON: unknown;
    };
  }>(
    {
      instance: env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT,
      accessToken: env.SETTLEMINT_ACCESS_TOKEN,
    },
    {
      fetch: requestLogger(logger, "portal", fetch) as typeof fetch,
    },
  );

  const besuClient = createPublicClient({
    transport: http(rpcUrl, {
      fetchOptions: {
        headers: { "x-auth-token": env.SETTLEMINT_ACCESS_TOKEN },
      },
    }),
  });

  console.log("Configuration:");
  console.log(`Portal: ${env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT}`);
  console.log(`Besu RPC: ${rpcUrl}`);
  console.log(`Schema UID: ${SCHEMA_UID}`);
  console.log(`Attestation UID: ${ATTESTATION_UID}\n`);

  // Test 1: isAttestationValid
  console.log("TEST 1: isAttestationValid()");
  console.log("============================\n");

  try {
    // Portal call with type-safe GraphQL
    console.log("Portal GraphQL query:");
    const validationQuery = portalGraphql(`
      query IsAttestationValid($address: String!, $uid: String!) {
        EAS(address: $address) {
          isAttestationValid(uid: $uid)
        }
      }
    `);
    console.log("Query with variables:", {
      address: EAS_ADDRESS,
      uid: ATTESTATION_UID,
    });

    const portalValidResult = await portalClient.request(validationQuery, {
      address: EAS_ADDRESS,
      uid: ATTESTATION_UID,
    });
    console.log("\nPortal raw response:");
    console.log(JSON.stringify(portalValidResult, null, 2));

    // Besu call
    console.log("\n\nBesu RPC call:");
    console.log(`client.readContract({
  address: "${EAS_ADDRESS}",
  abi: EAS_ABI,
  functionName: "isAttestationValid",
  args: ["${ATTESTATION_UID}"]
})`);

    const besuValidResult = await besuClient.readContract({
      address: EAS_ADDRESS,
      abi: [
        {
          inputs: [{ name: "uid", type: "bytes32" }],
          name: "isAttestationValid",
          outputs: [{ name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
      ],
      functionName: "isAttestationValid",
      args: [ATTESTATION_UID],
    });

    console.log("\nBesu raw response:", besuValidResult);
  } catch (error) {
    console.error("Error in validation test:", error);
  }

  // Test 2: getSchema
  console.log("\n\nTEST 2: getSchema()");
  console.log("==================\n");

  try {
    // Portal call with type-safe GraphQL
    console.log("Portal GraphQL query:");
    const schemaQuery = portalGraphql(`
      query GetSchema($address: String!, $uid: String!) {
        EASSchemaRegistry(address: $address) {
          getSchema(uid: $uid) {
            uid
            resolver
            revocable
            schema
          }
        }
      }
    `);
    console.log("Query with variables:", {
      address: SCHEMA_REGISTRY_ADDRESS,
      uid: SCHEMA_UID,
    });

    const portalSchemaResult = await portalClient.request(schemaQuery, {
      address: SCHEMA_REGISTRY_ADDRESS,
      uid: SCHEMA_UID,
    });
    console.log("\nPortal raw response:");
    console.log(JSON.stringify(portalSchemaResult, null, 2));

    // Besu call
    console.log("\n\nBesu RPC call:");
    console.log(`client.call({
  to: "${SCHEMA_REGISTRY_ADDRESS}",
  data: "0xa2ea7c6e${SCHEMA_UID.slice(2)}"
  // getSchema(bytes32) function selector + schema UID
})`);

    const besuSchemaResult = await besuClient.call({
      to: SCHEMA_REGISTRY_ADDRESS,
      data: `0xa2ea7c6e${SCHEMA_UID.slice(2)}` as Hex,
    });

    console.log("\nBesu raw response:");
    console.log("- Data length:", besuSchemaResult.data?.length || 0, "bytes");
    console.log("- Raw data (first 200 chars):", besuSchemaResult.data?.slice(0, 200) || "No data");
  } catch (error) {
    console.error("Error in schema test:", error);
  }

  // Test 3: getAttestation
  console.log("\n\nTEST 3: getAttestation()");
  console.log("========================\n");

  try {
    // Portal call with type-safe GraphQL
    console.log("Portal GraphQL query:");
    const attestationQuery = portalGraphql(`
      query GetAttestation($address: String!, $uid: String!) {
        EAS(address: $address) {
          getAttestation(uid: $uid) {
            uid
            schema
            attester
            recipient
            time
            expirationTime
            revocable
            refUID
            data
            revocationTime
          }
        }
      }
    `);
    console.log("Query with variables:", {
      address: EAS_ADDRESS,
      uid: ATTESTATION_UID,
    });

    const portalAttestationResult = await portalClient.request(attestationQuery, {
      address: EAS_ADDRESS,
      uid: ATTESTATION_UID,
    });
    console.log("\nPortal raw response:");
    console.log(JSON.stringify(portalAttestationResult, null, 2));

    // Besu call
    console.log("\n\nBesu RPC call:");
    console.log(`client.call({
  to: "${EAS_ADDRESS}",
  data: "0xa3112a64${ATTESTATION_UID.slice(2)}"
  // getAttestation(bytes32) function selector + attestation UID
})`);

    const besuAttestationResult = await besuClient.call({
      to: EAS_ADDRESS,
      data: `0xa3112a64${ATTESTATION_UID.slice(2)}` as Hex,
    });

    console.log("\nBesu raw response:");
    console.log("- Data length:", besuAttestationResult.data?.length || 0, "bytes");
    console.log("- Raw data (first 200 chars):", besuAttestationResult.data?.slice(0, 200) || "No data");
  } catch (error) {
    console.error("Error in attestation test:", error);
  }

  console.log("\n\nComparison complete");
}

// Run the demo
if (require.main === module) {
  runDemo().catch(console.error);
}

export { runDemo };
