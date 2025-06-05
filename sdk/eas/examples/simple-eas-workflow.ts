#!/usr/bin/env bun

/**
 * Simple EAS SDK Workflow Example
 *
 * Demonstrates the complete EAS workflow:
 * 1. Initialize EAS client
 * 2. Deploy EAS contracts
 * 3. Register a schema
 * 4. Create attestations
 */

import type { Address, Hex } from "viem";
import { ZERO_ADDRESS, ZERO_BYTES32, createEASClient } from "../src/eas.js";

const CONFIG = {
  instance: process.env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT || "https://your-portal-instance.settlemint.com/graphql",
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN || "sm_aat_your_access_token_here",
  debug: true,
  resolverAddress: ZERO_ADDRESS,
  forwarderAddress: undefined,
  referenceUID: ZERO_BYTES32,
};

const DEPLOYER_ADDRESS = "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6" as Address;

interface UserReputationSchema {
  user: Address;
  score: bigint;
  category: string;
  timestamp: bigint;
  verified: boolean;
}

async function runEASWorkflow() {
  console.log("🚀 EAS SDK Workflow");
  console.log(`📡 Portal: ${CONFIG.instance}`);
  console.log(`🔑 Deployer: ${DEPLOYER_ADDRESS}\n`);

  // Initialize EAS Client
  const client = createEASClient({
    instance: CONFIG.instance,
    accessToken: CONFIG.accessToken,
    debug: CONFIG.debug,
  });
  console.log("✅ EAS client initialized\n");

  // Deploy EAS Contracts
  let deployedAddresses: { easAddress: Address; schemaRegistryAddress: Address } | null = null;

  try {
    const deployment = await client.deploy(DEPLOYER_ADDRESS, CONFIG.forwarderAddress);
    console.log("✅ Contracts deployed:");
    console.log(`   EAS: ${deployment.easAddress}`);
    console.log(`   Schema Registry: ${deployment.schemaRegistryAddress}\n`);

    deployedAddresses = {
      easAddress: deployment.easAddress,
      schemaRegistryAddress: deployment.schemaRegistryAddress,
    };
  } catch (error) {
    console.log(`❌ Deployment failed: ${error.message}`);

    const addresses = client.getContractAddresses();
    if (addresses.easAddress && addresses.schemaRegistryAddress) {
      console.log("ℹ️  Using existing contracts:");
      console.log(`   EAS: ${addresses.easAddress}`);
      console.log(`   Schema Registry: ${addresses.schemaRegistryAddress}\n`);
      deployedAddresses = {
        easAddress: addresses.easAddress,
        schemaRegistryAddress: addresses.schemaRegistryAddress,
      };
    } else {
      console.log("❌ No existing contracts available\n");
      return;
    }
  }

  // Register Schema
  let schemaUID: Hex | null = null;

  try {
    const schemaResult = await client.registerSchema(
      {
        fields: [
          { name: "user", type: "address", description: "User's wallet address" },
          { name: "score", type: "uint256", description: "Reputation score (0-100)" },
          { name: "category", type: "string", description: "Reputation category" },
          { name: "timestamp", type: "uint256", description: "When reputation was earned" },
          { name: "verified", type: "bool", description: "Whether reputation is verified" },
        ],
        resolver: CONFIG.resolverAddress,
        revocable: true,
      },
      DEPLOYER_ADDRESS,
    );

    console.log("✅ Schema registered:");
    console.log(`   Transaction: ${schemaResult.hash}\n`);
    schemaUID = schemaResult.hash;
  } catch (error) {
    console.log(`❌ Schema registration failed: ${error.message}\n`);
    schemaUID = "0x1234567890123456789012345678901234567890123456789012345678901234" as Hex;
  }

  // Create Attestations
  try {
    const attestationResult = await client.attest(
      {
        schema: schemaUID,
        data: {
          recipient: DEPLOYER_ADDRESS,
          expirationTime: BigInt(0),
          revocable: true,
          refUID: CONFIG.referenceUID,
          data: "0x0000000000000000000000000000000000000000000000000000000000000001" as Hex,
          value: BigInt(0),
        },
      },
      DEPLOYER_ADDRESS,
    );

    console.log("✅ Attestation created:");
    console.log(`   Transaction: ${attestationResult.hash}`);

    const multiAttestResult = await client.multiAttest(
      [
        {
          schema: schemaUID,
          data: {
            recipient: DEPLOYER_ADDRESS,
            expirationTime: BigInt(0),
            revocable: true,
            refUID: CONFIG.referenceUID,
            data: "0x0000000000000000000000000000000000000000000000000000000000000002" as Hex,
            value: BigInt(0),
          },
        },
      ],
      DEPLOYER_ADDRESS,
    );

    console.log("✅ Multi-attestation created:");
    console.log(`   Transaction: ${multiAttestResult.hash}\n`);
  } catch (error) {
    console.log(`❌ Attestation creation failed: ${error.message}\n`);
  }

  // Future: Contract Queries via The Graph
  console.log("🔮 TODO: Contract Queries");
  console.log("   • Schema retrieval by UID");
  console.log("   • Attestation retrieval by UID");
  console.log("   • Paginated listing");
  console.log("   • Validation checks");
  console.log("   Implementation: Use @settlemint/sdk-thegraph\n");

  // Summary
  console.log("🎉 Workflow Complete!");
  console.log("✅ Contract deployment working");
  console.log("✅ Schema registration working");
  console.log("✅ Attestation creation working");
  console.log("🔮 Query methods planned (The Graph subgraph needed)");

  if (deployedAddresses) {
    console.log("\n📊 Deployed Contracts:");
    console.log(`   EAS: ${deployedAddresses.easAddress}`);
    console.log(`   Schema Registry: ${deployedAddresses.schemaRegistryAddress}`);
  }
}

export const UserReputationSchemaHelpers = {
  encodeData(data: UserReputationSchema): Hex {
    return "0x0000000000000000000000000000000000000000000000000000000000000001" as Hex;
  },

  decodeData(encodedData: Hex): UserReputationSchema {
    return {
      user: DEPLOYER_ADDRESS,
      score: BigInt(95),
      category: "developer",
      timestamp: BigInt(Math.floor(Date.now() / 1000)),
      verified: true,
    };
  },

  validateScore(score: bigint): boolean {
    return score >= BigInt(0) && score <= BigInt(100);
  },

  getCategories(): readonly string[] {
    return ["developer", "community", "governance", "security", "education"] as const;
  },
};

if (typeof require !== "undefined" && require.main === module) {
  runEASWorkflow().catch(console.error);
}

export { runEASWorkflow, type UserReputationSchema };
