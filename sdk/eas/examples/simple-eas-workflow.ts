#!/usr/bin/env bun

/**
 * Simple EAS SDK Workflow Example
 *
 * This example demonstrates the complete EAS workflow:
 * 1. Initialize EAS client
 * 2. Deploy EAS contracts (if needed)
 * 3. Register a schema
 * 4. Create attestations
 * 5. Retrieve schemas and attestations
 */

import type { Address, Hex } from "viem";
import { createEASClient } from "../src/eas.js";
import type { SchemaField } from "../src/types.js";

// Configuration
const CONFIG = {
  instance:
    process.env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT ||
    "https://attestation-portal-ee231.gke-europe.settlemint.com/graphql",
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN || "sm_aat_example_token_for_testing",
  // Contract addresses are optional - can be deployed via client
  // easContractAddress: "0xd46081aeEC4Ee8DB98eBDd9E066B5B9b151A2096" as Address,
  // schemaRegistryContractAddress: "0x5EFfB599d6DebD7cf576fb94F4C086b2bCC917b6" as Address,
  debug: true,
};

// Schema definition with proper typing
interface UserReputationSchema {
  user: Address;
  score: bigint;
  category: string;
  timestamp: bigint;
  verified: boolean;
}

async function simpleEASWorkflow() {
  console.log("🚀 Simple EAS SDK Workflow");
  console.log("===========================\n");

  try {
    // 1. Initialize EAS client
    console.log("📋 Step 1: Initialize EAS Client");
    const eas = createEASClient(CONFIG);
    console.log("✅ EAS client initialized\n");

    // 2. Deploy EAS contracts (if needed)
    console.log("🏗️  Step 2: Deploy EAS Contracts");
    try {
      const deployResult = await eas.deploy();
      console.log("✅ Contracts deployed:");
      console.log(`   EAS: ${deployResult.easAddress}`);
      console.log(`   Schema Registry: ${deployResult.schemaRegistryAddress}`);
    } catch (error) {
      console.log("ℹ️  Using existing contracts:");
      const addresses = eas.getContractAddresses();
      console.log(`   EAS: ${addresses.easAddress || "Not set"}`);
      console.log(`   Schema Registry: ${addresses.schemaRegistryAddress || "Not set"}`);
      console.log("✅ Contracts ready");
    }
    console.log();

    // 3. Register a schema
    console.log("📝 Step 3: Register Schema");
    const schemaFields: SchemaField[] = [
      { name: "user", type: "address", description: "User's wallet address" },
      { name: "score", type: "uint256", description: "Reputation score (0-100)" },
      { name: "category", type: "string", description: "Reputation category" },
      { name: "timestamp", type: "uint256", description: "When reputation was earned" },
      { name: "verified", type: "bool", description: "Whether reputation is verified" },
    ];

    try {
      const schemaResult = await eas.registerSchema({
        fields: schemaFields,
        resolver: "0x0000000000000000000000000000000000000000" as Address,
        revocable: true,
      });

      console.log("✅ Schema registered:");
      console.log(`   Transaction: ${schemaResult.hash}`);
      console.log(`   Success: ${schemaResult.success}`);
    } catch (error) {
      console.log("⚠️  Schema registration not implemented yet");
      console.log("   Schema fields defined:");
      schemaFields.forEach((field, index) => {
        console.log(`   ${index + 1}. ${field.name}: ${field.type} - ${field.description}`);
      });
    }

    // For demo purposes, we'll use a mock schema UID
    const schemaUID = "0x1234567890123456789012345678901234567890123456789012345678901234" as Hex;
    console.log(`   Schema UID: ${schemaUID}\n`);

    // 4. Create attestations
    console.log("🎯 Step 4: Create Attestations");

    try {
      // Attestation 1: High reputation user
      const attestation1 = await eas.attest({
        schema: schemaUID,
        data: {
          recipient: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6" as Address,
          expirationTime: BigInt(0), // Never expires
          revocable: true,
          refUID: "0x0000000000000000000000000000000000000000000000000000000000000000" as Hex,
          data: "0x" as Hex, // Encoded: user=0x742d35..., score=95, category="developer", timestamp=1704067200, verified=true
          value: BigInt(0),
        },
      });

      console.log("✅ Attestation 1 created:");
      console.log(`   Transaction: ${attestation1.hash}`);
      console.log("   Type: High reputation developer");

      // Attestation 2: Community contributor
      const attestation2 = await eas.attest({
        schema: schemaUID,
        data: {
          recipient: "0x8ba1f109551bD432803012645Hac136c22C177ec" as Address,
          expirationTime: BigInt(Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60), // 1 year
          revocable: true,
          refUID: "0x0000000000000000000000000000000000000000000000000000000000000000" as Hex,
          data: "0x" as Hex, // Encoded: user=0x8ba1f1..., score=78, category="community", timestamp=1704067200, verified=true
          value: BigInt(0),
        },
      });

      console.log("✅ Attestation 2 created:");
      console.log(`   Transaction: ${attestation2.hash}`);
      console.log("   Type: Community contributor");
    } catch (error) {
      console.log("⚠️  Attestation creation not implemented yet");
      console.log("   Attestation data prepared:");
      console.log("   - High reputation developer");
      console.log("   - Community contributor");
    }
    console.log();

    // 5. Retrieve schema
    console.log("📖 Step 5: Retrieve Schema");
    try {
      const retrievedSchema = await eas.getSchema(schemaUID);
      console.log("✅ Schema retrieved:");
      console.log(`   UID: ${retrievedSchema.uid}`);
      console.log(`   Schema: ${retrievedSchema.schema}`);
      console.log(`   Resolver: ${retrievedSchema.resolver}`);
      console.log(`   Revocable: ${retrievedSchema.revocable}`);
    } catch (error) {
      console.log("⚠️  Schema retrieval not implemented yet");
      console.log(`   Would retrieve schema: ${schemaUID}`);
    }
    console.log();

    // 6. Retrieve all schemas
    console.log("📚 Step 6: Retrieve All Schemas");
    try {
      const allSchemas = await eas.getSchemas({ limit: 10 });
      console.log(`✅ Retrieved ${allSchemas.length} schemas`);
      allSchemas.forEach((schema, index) => {
        console.log(`   ${index + 1}. ${schema.uid} - ${schema.schema}`);
      });
    } catch (error) {
      console.log("⚠️  Schemas retrieval not implemented yet");
      console.log("   Would retrieve paginated schemas");
    }
    console.log();

    // 7. Retrieve attestations
    console.log("📋 Step 7: Retrieve Attestations");

    // Mock attestation UIDs for demo
    const attestationUID1 = "0xabcd567890123456789012345678901234567890123456789012345678901234" as Hex;
    const attestationUID2 = "0xefgh567890123456789012345678901234567890123456789012345678901234" as Hex;

    try {
      const retrievedAttestation1 = await eas.getAttestation(attestationUID1);
      console.log("✅ Attestation 1 retrieved:");
      console.log(`   UID: ${retrievedAttestation1.uid}`);
      console.log(`   Schema: ${retrievedAttestation1.schema}`);
      console.log(`   Attester: ${retrievedAttestation1.attester}`);
      console.log(`   Recipient: ${retrievedAttestation1.recipient}`);
      console.log(`   Time: ${new Date(Number(retrievedAttestation1.time) * 1000).toISOString()}`);
      console.log(`   Revocable: ${retrievedAttestation1.revocable}`);

      const retrievedAttestation2 = await eas.getAttestation(attestationUID2);
      console.log("✅ Attestation 2 retrieved:");
      console.log(`   UID: ${retrievedAttestation2.uid}`);
      console.log(`   Schema: ${retrievedAttestation2.schema}`);
      console.log(`   Attester: ${retrievedAttestation2.attester}`);
      console.log(`   Recipient: ${retrievedAttestation2.recipient}`);
      console.log(`   Time: ${new Date(Number(retrievedAttestation2.time) * 1000).toISOString()}`);
      console.log(`   Revocable: ${retrievedAttestation2.revocable}`);
    } catch (error) {
      console.log("⚠️  Attestation retrieval not implemented yet");
      console.log(`   Would retrieve attestations: ${attestationUID1}, ${attestationUID2}`);
    }
    console.log();

    // 8. Retrieve all attestations
    console.log("📋 Step 8: Retrieve All Attestations");
    try {
      const allAttestations = await eas.getAttestations({
        limit: 10,
        schema: schemaUID,
      });
      console.log(`✅ Retrieved ${allAttestations.length} attestations for schema`);
      allAttestations.forEach((attestation, index) => {
        console.log(`   ${index + 1}. ${attestation.uid} - ${attestation.recipient}`);
      });
    } catch (error) {
      console.log("⚠️  Attestations retrieval not implemented yet");
      console.log("   Would retrieve paginated attestations");
    }
    console.log();

    // 9. Summary
    console.log("🎉 Workflow Complete!");
    console.log("=====================");
    console.log("✅ EAS client initialized");
    console.log("✅ Contract deployment interface ready");
    console.log("✅ Schema registration interface ready");
    console.log("✅ Attestation creation interface ready");
    console.log("✅ Schema retrieval interface ready");
    console.log("✅ Attestation retrieval interface ready");
    console.log("\n💡 Next steps:");
    console.log("- Implement the actual method logic");
    console.log("- Add Portal or direct blockchain integration");
    console.log("- Add data encoding/decoding utilities");
    console.log("- Set up event monitoring");
  } catch (error) {
    console.error("❌ Workflow failed:", error);

    if (error instanceof Error) {
      console.error("Error details:", error.message);

      // Provide helpful debugging information
      if (error.message.includes("not implemented yet")) {
        console.log("\n💡 Implementation Status:");
        console.log("- This is the clean interface design phase");
        console.log("- Method implementations will be added later");
        console.log("- All method signatures are properly defined");
      }
    }
  }
}

// Type-safe helper functions for working with the schema
export const UserReputationSchemaHelpers = {
  /**
   * Encode user reputation data for attestation
   */
  encodeData(data: UserReputationSchema): Hex {
    // In a real implementation, this would use ABI encoding
    // For demo purposes, we return a placeholder
    return "0x" as Hex;
  },

  /**
   * Decode attestation data to typed object
   */
  decodeData(encodedData: Hex): UserReputationSchema {
    // In a real implementation, this would use ABI decoding
    // For demo purposes, we return mock data
    return {
      user: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6" as Address,
      score: BigInt(95),
      category: "developer",
      timestamp: BigInt(Math.floor(Date.now() / 1000)),
      verified: true,
    };
  },

  /**
   * Validate reputation score
   */
  validateScore(score: bigint): boolean {
    return score >= BigInt(0) && score <= BigInt(100);
  },

  /**
   * Get reputation category enum
   */
  getCategories(): readonly string[] {
    return ["developer", "community", "governance", "security", "education"] as const;
  },
};

// Run the workflow
if (typeof require !== "undefined" && require.main === module) {
  simpleEASWorkflow().catch(console.error);
}

export { simpleEASWorkflow, type UserReputationSchema };
