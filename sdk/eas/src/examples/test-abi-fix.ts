#!/usr/bin/env bun
/**
 * Example: Verify EAS subgraph ABI fix
 *
 * This example demonstrates that the corrected ABI structure
 * allows the subgraph to retrieve real JSON data instead of "0x00000000"
 */

import { createEASClient } from "../eas.js";

async function testEASSubgraphAbiFix() {
  console.log("🧪 Testing EAS Subgraph ABI Fix");
  console.log("================================");

  // Create EAS client with a deployed subgraph that has the corrected ABI
  const easClient = createEASClient({
    instance: "https://eas-portal-6e7d3.gke-europe.settlemint.com/graphql",
    accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!,
    debug: false,
    easContractAddress: "0xc52882481d82f42d78e5d80dbad80716dd92729e",
    schemaRegistryContractAddress: "0xe139280637f3c9c31a0c2949965945e076744ff4",
    theGraph: {
      // Use a subgraph deployed with the corrected ABI
      instances: ["https://eas-graph-e01d4.gke-europe.settlemint.com/subgraphs/name/corrected-abi-working"],
      accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!,
      subgraphName: "corrected-abi-working",
      cache: "no-cache",
    },
  });

  try {
    // Query attestations
    const attestations = await easClient.getAttestations({ limit: 5, offset: 0 });
    console.log(`✅ Retrieved ${attestations.length} attestations`);

    // Check if we can retrieve real data
    let successCount = 0;
    for (const attestation of attestations) {
      if (attestation.data && attestation.data !== "0x00000000" && attestation.data.length > 10) {
        successCount++;
        console.log(`✅ Attestation ${attestation.uid.slice(0, 10)}... has real data`);

        // Try to decode the data
        try {
          const decoded = Buffer.from(attestation.data.slice(2), "hex").toString("utf-8");
          const parsed = JSON.parse(decoded);
          console.log("   📝 Decoded JSON:", parsed);
        } catch {
          console.log("   📦 Has data but not JSON format");
        }
      }
    }

    if (successCount > 0) {
      console.log(`\n🎉 SUCCESS: ABI fix working! ${successCount}/${attestations.length} attestations have real data`);
    } else {
      console.log("\n⚠️ No attestations with real data found - may need different test data");
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

// Run if called directly
if (import.meta.main) {
  testEASSubgraphAbiFix();
}
