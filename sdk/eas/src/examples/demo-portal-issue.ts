/**
 * Demo script to show Portal vs Besu RPC comparison
 * Run this to demonstrate the issue with Portal GraphQL queries
 */

import { GraphQLClient } from "graphql-request";
import { http, type Address, type Hex, createPublicClient } from "viem";

// Test data from our deployment
const EAS_ADDRESS = "0x8da4813fe48efdb7fc7dd1bfee40fe20f01e53d5" as Address;
const SCHEMA_REGISTRY_ADDRESS = "0xe4aa2d08b2884d3673807f44f3248921808fd609" as Address;
const SCHEMA_UID = "0x08b2e2e97720789130096fe5442c7fb4e4e9e2b13b94da335f2d8fcb367de509" as Hex;
const ATTESTATION_UID = "0x525cdc37347b0472e4535513b0e555d482330ea7f3530bcad0053776779b8ae7" as Hex;

async function runDemo() {
  console.log("Portal vs Besu RPC Comparison");
  console.log("=============================\n");

  const accessToken = process.env.SETTLEMINT_ACCESS_TOKEN;
  if (!accessToken) {
    console.error("❌ Please set SETTLEMINT_ACCESS_TOKEN environment variable");
    return;
  }

  // Setup clients
  const portalUrl =
    process.env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT || "https://eas-portal-bddb6.gke-europe.settlemint.com/graphql";
  const rpcUrl = process.env.BESU_RPC_ENDPOINT || "https://poc-validator-1-552b8.eks-europe.settlemint.com/";

  const portalClient = new GraphQLClient(portalUrl, {
    headers: { "x-auth-token": accessToken },
  });

  const besuClient = createPublicClient({
    transport: http(rpcUrl, {
      fetchOptions: {
        headers: { "x-auth-token": accessToken },
      },
    }),
  });

  console.log("Configuration:");
  console.log(`Portal: ${portalUrl}`);
  console.log(`Besu RPC: ${rpcUrl}`);
  console.log(`Schema UID: ${SCHEMA_UID}`);
  console.log(`Attestation UID: ${ATTESTATION_UID}\n`);

  // Test 1: isAttestationValid
  console.log("TEST 1: isAttestationValid()");
  console.log("============================\n");

  try {
    // Portal call
    console.log("Portal GraphQL query:");
    const validationQuery = `
      query {
        EAS(address: "${EAS_ADDRESS}") {
          isAttestationValid(uid: "${ATTESTATION_UID}")
        }
      }
    `;
    console.log(validationQuery);

    const portalValidResult = await portalClient.request(validationQuery);
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
    // Portal call
    console.log("Portal GraphQL query:");
    const schemaQuery = `
      query {
        EASSchemaRegistry(address: "${SCHEMA_REGISTRY_ADDRESS}") {
          getSchema(uid: "${SCHEMA_UID}") {
            uid
            resolver
            revocable
            schema
          }
        }
      }
    `;
    console.log(schemaQuery);

    const portalSchemaResult = await portalClient.request(schemaQuery);
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
    console.log("- Status:", besuSchemaResult.status);
    console.log("- Data length:", besuSchemaResult.data?.length || 0, "bytes");
    console.log("- Raw data (first 200 chars):", besuSchemaResult.data?.slice(0, 200) || "No data");
  } catch (error) {
    console.error("Error in schema test:", error);
  }

  // Test 3: getAttestation
  console.log("\n\nTEST 3: getAttestation()");
  console.log("========================\n");

  try {
    // Portal call
    console.log("Portal GraphQL query:");
    const attestationQuery = `
      query {
        EAS(address: "${EAS_ADDRESS}") {
          getAttestation(uid: "${ATTESTATION_UID}") {
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
    `;
    console.log(attestationQuery);

    const portalAttestationResult = await portalClient.request(attestationQuery);
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
    console.log("- Status:", besuAttestationResult.status);
    console.log("- Data length:", besuAttestationResult.data?.length || 0, "bytes");
    console.log("- Raw data (first 200 chars):", besuAttestationResult.data?.slice(0, 200) || "No data");
  } catch (error) {
    console.error("Error in attestation test:", error);
  }

  // End of tests
  console.log("\n\n=== END OF TESTS ===");
}

// Run the demo
if (require.main === module) {
  runDemo().catch(console.error);
}

export { runDemo };
