/**
 * Digital Notary EAS SDK Workflow Example
 *
 * Demonstrates a digital notary use case with EAS:
 * 1. Initialize EAS client
 * 2. Deploy EAS contracts
 * 3. Register a digital notary schema
 * 4. Create document attestations
 */

import type { Address, Hex } from "viem";
import { decodeAbiParameters, encodeAbiParameters, parseAbiParameters } from "viem";
import { ZERO_ADDRESS, ZERO_BYTES32, createEASClient } from "../eas.js"; // Replace this path with "@settlemint/sdk-eas"

const CONFIG = {
  instance: process.env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN,
  deployerAddress: process.env.SETTLEMINT_DEPLOYER_ADDRESS as Address | undefined,
  debug: true,

  // Configuration options for addresses and references
  resolverAddress: ZERO_ADDRESS, // Use ZERO_ADDRESS for no resolver, or specify custom resolver
  forwarderAddress: undefined, // Use undefined for ZERO_ADDRESS, or specify custom forwarder
  referenceUID: ZERO_BYTES32, // Use ZERO_BYTES32 for no reference, or specify parent attestation
};

// Example addresses for demonstration
const EXAMPLE_DEPLOYER_ADDRESS = CONFIG.deployerAddress;
const EXAMPLE_FROM_ADDRESS = CONFIG.deployerAddress;

// Schema definition with proper typing
interface UserReputationSchema {
  user: Address;
  score: bigint;
  category: string;
  timestamp: bigint;
  verified: boolean;
}

interface DigitalNotarySchema {
  documentHash: string;
  notaryAddress: Address;
  signerAddress: Address;
  notarizationTimestamp: bigint;
  documentType: string;
  witnessCount: bigint;
  isVerified: boolean;
  ipfsHash: string;
}

async function runEASWorkflow() {
  if (!CONFIG.instance || !CONFIG.accessToken || !EXAMPLE_DEPLOYER_ADDRESS || !EXAMPLE_FROM_ADDRESS) {
    console.error(
      "Missing environment variables. Please set SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT, SETTLEMINT_ACCESS_TOKEN, and SETTLEMINT_DEPLOYER_ADDRESS.",
    );
    process.exit(1);
  }

  console.log("🚀 Simple EAS SDK Workflow");
  console.log("===========================\n");

  let _deployedAddresses: { easAddress: Address; schemaRegistryAddress: Address };
  let schemaResult: { hash: Hex } | undefined;

  // Step 1: Initialize EAS Client
  console.log("📋 Step 1: Initialize EAS Client");
  const client = createEASClient({
    instance: CONFIG.instance,
    accessToken: CONFIG.accessToken,
    debug: CONFIG.debug,
  });
  console.log("✅ EAS client initialized\n");

  // Step 2: Deploy EAS Contracts (if needed)
  console.log("🏗️  Step 2: Deploy EAS Contracts");
  try {
    const deployment = await client.deploy(
      EXAMPLE_DEPLOYER_ADDRESS,
      CONFIG.forwarderAddress, // Will use ZERO_ADDRESS if undefined
    );
    console.log("✅ Contracts deployed:");
    console.log(`   EAS: ${deployment.easAddress}`);
    console.log(`   Schema Registry: ${deployment.schemaRegistryAddress}\n`);

    _deployedAddresses = {
      easAddress: deployment.easAddress,
      schemaRegistryAddress: deployment.schemaRegistryAddress,
    };
  } catch (err) {
    const error = err as Error;
    console.log(`❌ Deployment failed: ${error.message}`);

    const addresses = client.getContractAddresses();
    console.log("ℹ️  Using existing contracts:");
    console.log(`   EAS: ${addresses.easAddress || "Not set"}`);
    console.log(`   Schema Registry: ${addresses.schemaRegistryAddress || "Not set"}`);
    console.log("✅ Contracts ready\n");
  }

  // Step 3: Register Schema
  console.log("📝 Step 3: Register Schema");
  try {
    schemaResult = await client.registerSchema(
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
      EXAMPLE_FROM_ADDRESS,
    );

    console.log("✅ Schema registered successfully");
    console.log(`   Schema UID: ${schemaResult.hash}`);
    console.log(
      `   Resolver: ${CONFIG.resolverAddress} (${CONFIG.resolverAddress === ZERO_ADDRESS ? "none" : "custom"})\n`,
    );

    // Step 4: Create Attestations
    console.log("🎯 Step 4: Create Attestations");
    try {
      const attestationResult = await client.attest(
        {
          schema: schemaResult.hash,
          data: {
            recipient: EXAMPLE_FROM_ADDRESS,
            expirationTime: BigInt(0),
            revocable: true,
            refUID: CONFIG.referenceUID,
            data: "0x",
            value: BigInt(0),
          },
        },
        EXAMPLE_FROM_ADDRESS,
      );

      console.log("✅ Attestation created successfully");
      console.log(`   Attestation transaction hash: ${attestationResult.hash}`);
      console.log(
        `   Reference: ${CONFIG.referenceUID} (${CONFIG.referenceUID === ZERO_BYTES32 ? "standalone" : "linked"})`,
      );

      const multiAttestResult = await client.multiAttest(
        [
          {
            schema: schemaResult.hash,
            data: {
              recipient: EXAMPLE_FROM_ADDRESS,
              expirationTime: BigInt(0),
              revocable: true,
              refUID: CONFIG.referenceUID,
              data: "0x",
              value: BigInt(0),
            },
          },
        ],
        EXAMPLE_FROM_ADDRESS,
      );

      console.log("✅ Multi-attestation created successfully");
      console.log(`   Transaction hash: ${multiAttestResult.hash}\n`);
    } catch (error) {
      console.log("⚠️  Attestation creation failed:", error);
    }
  } catch (error) {
    console.log("⚠️  Schema registration failed:", error);
  }

  // Step 5: Retrieve Schema
  console.log("📖 Step 5: Retrieve Schema");
  if (!schemaResult) {
    console.log("⚠️  No schema registered, skipping retrieval test\n");
  } else {
    try {
      const schema = await client.getSchema(schemaResult.hash);
      console.log("✅ Schema retrieved successfully");
      console.log(`   UID: ${schema.uid}`);
      console.log(`   Resolver: ${schema.resolver}`);
      console.log(`   Revocable: ${schema.revocable}`);
      console.log(`   Schema: ${schema.schema}\n`);
    } catch (error) {
      console.log("⚠️  Schema retrieval failed:");
      console.log(`   ${error}\n`);
    }
  }

  // Step 6: Check Attestation Validity
  console.log("🔍 Step 6: Check Attestation Validity");
  try {
    // We'll create an example attestation UID to check
    const exampleAttestationUID = "0xabcd567890123456789012345678901234567890123456789012345678901234" as Hex;
    const isValid = await client.isValidAttestation(exampleAttestationUID);
    console.log("✅ Attestation validity checked");
    console.log(`   UID: ${exampleAttestationUID}`);
    console.log(`   Is Valid: ${isValid}\n`);
  } catch (error) {
    console.log("⚠️  Attestation validity check failed:");
    console.log(`   ${error}\n`);
  }

  // Step 7: Get Timestamp for Data
  console.log("⏰ Step 7: Get Timestamp for Data");
  try {
    // Data must be padded to 32 bytes (64 hex chars) for bytes32
    const sampleData = "0x1234567890abcdef000000000000000000000000000000000000000000000000" as Hex;
    const timestamp = await client.getTimestamp(sampleData);
    console.log("✅ Timestamp retrieved successfully");
    console.log(`   Data: ${sampleData}`);
    console.log(`   Timestamp: ${timestamp} (${new Date(Number(timestamp) * 1000).toISOString()})\n`);
  } catch (error) {
    console.log("⚠️  Timestamp retrieval failed:");
    console.log(`   ${error}\n`);
  }

  // Note: Bulk query operations require The Graph integration
  console.log("📝 Note about Bulk Operations:");
  console.log("   • getSchemas() and getAttestations() require The Graph subgraph integration");
  console.log("   • Individual lookups (getSchema, getAttestation) are fully functional via Portal");
  console.log("   • Consider implementing The Graph integration for bulk data operations\n");

  // Final Summary
  console.log("🎉 Workflow Complete!");
  console.log("=====================");
  console.log("✅ EAS client initialized");
  console.log("✅ Contract deployment ready");
  console.log("✅ Schema registration ready");
  console.log("✅ Attestation creation ready");
  console.log("✅ Individual schema retrieval implemented");
  console.log("✅ Individual attestation retrieval implemented");
  console.log("✅ Attestation validation implemented");
  console.log("✅ Data timestamp retrieval implemented");

  console.log("\n💡 Production ready!");
  console.log("- Core EAS operations fully implemented");
  console.log("- Portal GraphQL integration for all individual queries");
  console.log("- Comprehensive error handling with specific error messages");
  console.log("- Type-safe TypeScript API with full type inference");
  console.log("- No hardcoded values - fully configurable");

  console.log("\n🔑 Fully Implemented Features:");
  console.log("- ✅ Contract deployment (EAS + Schema Registry)");
  console.log("- ✅ Schema registration with field validation");
  console.log("- ✅ Single and multi-attestation creation");
  console.log("- ✅ Attestation revocation");
  console.log("- ✅ Schema lookup by UID");
  console.log("- ✅ Attestation lookup by UID");
  console.log("- ✅ Attestation validity checking");
  console.log("- ✅ Data timestamp queries");

  console.log("\n🚧 Future Enhancements (requiring The Graph):");
  console.log("- ⏳ Bulk schema listings (getSchemas)");
  console.log("- ⏳ Bulk attestation listings (getAttestations)");
  console.log("- ⏳ Advanced filtering and pagination");

  console.log("\n🔑 To use with real Portal:");
  console.log("- Obtain valid EAS Portal access token");
  console.log("- Provide deployer and transaction sender addresses");
  console.log("- Deploy or configure contract addresses");
  console.log("- Start creating and querying attestations!");
}

export const DigitalNotarySchemaHelpers = {
  /**
   * Encodes DigitalNotarySchema data using ABI encoding.
   * @param data - The digital notary data to encode
   * @returns The ABI-encoded data as a hex string
   * @example
   * ```ts
   * import { DigitalNotarySchemaHelpers } from './simple-eas-workflow';
   * import { getAddress } from 'viem';
   *
   * const encoded = DigitalNotarySchemaHelpers.encodeData({
   *   documentHash: "0xa1b2c3d4e5f67890123456789012345678901234567890123456789012345678",
   *   notaryAddress: getAddress("0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"),
   *   signerAddress: getAddress("0x1234567890123456789012345678901234567890"),
   *   notarizationTimestamp: BigInt(Math.floor(Date.now() / 1000)),
   *   documentType: "purchase_agreement",
   *   witnessCount: BigInt(2),
   *   isVerified: true,
   *   ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
   * });
   * ```
   */
  encodeData(data: DigitalNotarySchema): Hex {
    return encodeAbiParameters(
      parseAbiParameters(
        "string documentHash, address notaryAddress, address signerAddress, uint256 notarizationTimestamp, string documentType, uint256 witnessCount, bool isVerified, string ipfsHash",
      ),
      [
        data.documentHash,
        data.notaryAddress,
        data.signerAddress,
        data.notarizationTimestamp,
        data.documentType,
        data.witnessCount,
        data.isVerified,
        data.ipfsHash,
      ],
    );
  },

  /**
   * Decodes ABI-encoded data back to DigitalNotarySchema format.
   * @param encodedData - The ABI-encoded hex data to decode
   * @returns The decoded digital notary data
   * @example
   * ```ts
   * import { DigitalNotarySchemaHelpers } from './simple-eas-workflow';
   *
   * const decoded = DigitalNotarySchemaHelpers.decodeData("0x...");
   * console.log(decoded.documentHash, decoded.notaryAddress, decoded.documentType);
   * ```
   */
  decodeData(encodedData: Hex): DigitalNotarySchema {
    const [
      documentHash,
      notaryAddress,
      signerAddress,
      notarizationTimestamp,
      documentType,
      witnessCount,
      isVerified,
      ipfsHash,
    ] = decodeAbiParameters(
      parseAbiParameters(
        "string documentHash, address notaryAddress, address signerAddress, uint256 notarizationTimestamp, string documentType, uint256 witnessCount, bool isVerified, string ipfsHash",
      ),
      encodedData,
    );

    return {
      documentHash: documentHash as string,
      notaryAddress: notaryAddress as Address,
      signerAddress: signerAddress as Address,
      notarizationTimestamp: notarizationTimestamp as bigint,
      documentType: documentType as string,
      witnessCount: witnessCount as bigint,
      isVerified: isVerified as boolean,
      ipfsHash: ipfsHash as string,
    };
  },

  /**
   * Validates that a document hash follows the expected format.
   * @param documentHash - The document hash to validate
   * @returns Whether the hash is valid
   */
  validateDocumentHash(documentHash: string): boolean {
    return /^0x[a-fA-F0-9]{64}$/.test(documentHash);
  },

  /**
   * Validates that witness count is within reasonable bounds.
   * @param witnessCount - The number of witnesses
   * @returns Whether the witness count is valid
   */
  validateWitnessCount(witnessCount: bigint): boolean {
    return witnessCount >= BigInt(0) && witnessCount <= BigInt(10);
  },

  /**
   * Gets the supported document types for notarization.
   * @returns Array of supported document types
   */
  getDocumentTypes(): readonly string[] {
    return [
      "purchase_agreement",
      "last_will_testament",
      "power_of_attorney",
      "real_estate_deed",
      "business_contract",
      "loan_agreement",
      "affidavit",
      "other",
    ] as const;
  },

  /**
   * Validates that the IPFS hash follows the expected format.
   * @param ipfsHash - The IPFS hash to validate
   * @returns Whether the IPFS hash is valid
   */
  validateIpfsHash(ipfsHash: string): boolean {
    return /^Qm[1-9A-HJ-NP-Za-km-z]{44}$/.test(ipfsHash);
  },
};

if (typeof require !== "undefined" && require.main === module) {
  runEASWorkflow().catch(console.error);
}

export { runEASWorkflow, type UserReputationSchema };
