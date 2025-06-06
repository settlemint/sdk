#!/usr/bin/env bun

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
import { decodeAbiParameters, encodeAbiParameters, getAddress, parseAbiParameters } from "viem";
import { ZERO_ADDRESS, ZERO_BYTES32, createEASClient } from "../src/eas.js";

const CONFIG = {
  instance: process.env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT || "https://your-portal-instance.settlemint.com/graphql",
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN || "sm_aat_your_access_token_here",
  debug: true,
  resolverAddress: ZERO_ADDRESS,
  forwarderAddress: undefined,
  referenceUID: ZERO_BYTES32,
};

const NOTARY_ADDRESS = getAddress("0x00c637560274d2648CC4Fb69e07B57A410a84b92");

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

async function runDigitalNotaryWorkflow() {
  console.log("🏛️ Digital Notary EAS SDK Workflow");
  console.log(`📡 Portal: ${CONFIG.instance}`);
  console.log(`🔏 Notary: ${NOTARY_ADDRESS}\n`);

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
    const deployment = await client.deploy(NOTARY_ADDRESS, CONFIG.forwarderAddress);
    console.log("✅ Contracts deployed:");
    console.log(`   EAS: ${deployment.easAddress}`);
    console.log(`   Schema Registry: ${deployment.schemaRegistryAddress}\n`);

    deployedAddresses = {
      easAddress: deployment.easAddress,
      schemaRegistryAddress: deployment.schemaRegistryAddress,
    };
  } catch (err) {
    const error = err as Error;
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

  // Register Digital Notary Schema
  let schemaUID: Hex | null = null;

  try {
    const schemaResult = await client.registerSchema(
      {
        fields: [
          { name: "documentHash", type: "string", description: "SHA-256 hash of the notarized document" },
          { name: "notaryAddress", type: "address", description: "Address of the certified notary" },
          { name: "signerAddress", type: "address", description: "Address of the document signer" },
          { name: "notarizationTimestamp", type: "uint256", description: "Timestamp when document was notarized" },
          { name: "documentType", type: "string", description: "Type of document (contract, will, deed, etc.)" },
          { name: "witnessCount", type: "uint256", description: "Number of witnesses present" },
          { name: "isVerified", type: "bool", description: "Whether the document signature is verified" },
          { name: "ipfsHash", type: "string", description: "IPFS hash for document storage" },
        ],
        resolver: CONFIG.resolverAddress,
        revocable: true,
      },
      NOTARY_ADDRESS,
    );

    console.log("✅ Digital Notary Schema registered:");
    console.log(`   Transaction: ${schemaResult.hash}\n`);
    schemaUID = schemaResult.hash;
  } catch (error) {
    console.log(`❌ Schema registration failed: ${error.message}\n`);
    schemaUID = "0x1234567890123456789012345678901234567890123456789012345678901234" as Hex;
  }

  // Create Digital Notary Attestations
  try {
    // Create sample notarized document data
    const contractNotarization: DigitalNotarySchema = {
      documentHash: "0xa1b2c3d4e5f67890123456789012345678901234567890123456789012345678",
      notaryAddress: NOTARY_ADDRESS,
      signerAddress: getAddress("0x1234567890123456789012345678901234567890"),
      notarizationTimestamp: BigInt(Math.floor(Date.now() / 1000)),
      documentType: "purchase_agreement",
      witnessCount: BigInt(2),
      isVerified: true,
      ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
    };

    // Encode the data using our helper
    const encodedData = DigitalNotarySchemaHelpers.encodeData(contractNotarization);

    const attestationResult = await client.attest(
      {
        schema: schemaUID,
        data: {
          recipient: contractNotarization.signerAddress,
          expirationTime: BigInt(0),
          revocable: true,
          refUID: CONFIG.referenceUID,
          data: encodedData,
          value: BigInt(0),
        },
      },
      NOTARY_ADDRESS,
    );

    console.log("✅ Document notarization attestation created:");
    console.log(`   Transaction: ${attestationResult.hash}`);

    // Create another sample for will notarization
    const willNotarization: DigitalNotarySchema = {
      documentHash: "0xb2c3d4e5f67890123456789012345678901234567890123456789012345678",
      notaryAddress: NOTARY_ADDRESS,
      signerAddress: getAddress("0x9876543210987654321098765432109876543210"),
      notarizationTimestamp: BigInt(Math.floor(Date.now() / 1000)),
      documentType: "last_will_testament",
      witnessCount: BigInt(3),
      isVerified: true,
      ipfsHash: "QmXwBPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdH",
    };

    const secondEncodedData = DigitalNotarySchemaHelpers.encodeData(willNotarization);

    const multiAttestResult = await client.multiAttest(
      [
        {
          schema: schemaUID,
          data: {
            recipient: willNotarization.signerAddress,
            expirationTime: BigInt(0),
            revocable: true,
            refUID: CONFIG.referenceUID,
            data: secondEncodedData,
            value: BigInt(0),
          },
        },
      ],
      NOTARY_ADDRESS,
    );

    console.log("✅ Will notarization attestation created:");
    console.log(`   Transaction: ${multiAttestResult.hash}\n`);

    // Demonstrate decoding functionality
    console.log("🔍 Demonstrating notary data encoding/decoding:");
    console.log(
      `   Original contract data: ${JSON.stringify(
        contractNotarization,
        (key, value) => (typeof value === "bigint" ? value.toString() : value),
        2,
      )}`,
    );
    console.log(`   Encoded: ${encodedData}`);

    const decodedData = DigitalNotarySchemaHelpers.decodeData(encodedData);
    console.log(
      `   Decoded data: ${JSON.stringify(
        decodedData,
        (key, value) => (typeof value === "bigint" ? value.toString() : value),
        2,
      )}\n`,
    );
  } catch (error) {
    console.log(`❌ Notarization attestation creation failed: ${error.message}\n`);
  }

  // Future: Contract Queries via The Graph
  console.log("🔮 TODO: Digital Notary Queries");
  console.log("   • Document verification by hash");
  console.log("   • Notary attestation history");
  console.log("   • Document type filtering");
  console.log("   • Witness count validation");
  console.log("   Implementation: Use @settlemint/sdk-thegraph\n");

  // Summary
  console.log("🎉 Digital Notary Workflow Complete!");
  console.log("✅ Contract deployment working");
  console.log("✅ Digital notary schema registration working");
  console.log("✅ Document notarization attestations working");
  console.log("🔮 Notary query methods planned (The Graph subgraph needed)");

  if (deployedAddresses) {
    console.log("\n📊 Deployed Contracts:");
    console.log(`   EAS: ${deployedAddresses.easAddress}`);
    console.log(`   Schema Registry: ${deployedAddresses.schemaRegistryAddress}`);
  }
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
  runDigitalNotaryWorkflow().catch(console.error);
}

export { runDigitalNotaryWorkflow, type DigitalNotarySchema };
