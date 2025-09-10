/**
 * Subgraph deployment utility for EAS SDK
 * Delegates to shared TheGraph deploy utilities for a clean, headless flow
 */

import { deploySubgraphWithGraphCLI } from "@settlemint/sdk-thegraph";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import type { Address } from "viem";

interface DeploySubgraphOptions {
  subgraphName: string;
  theGraphAdminEndpoint: string;
  easAddress: Address;
  schemaRegistryAddress: Address;
  ipfsEndpoint?: string;
  networkName?: string;
}

/**
 * Deploy an EAS subgraph using shared Graph CLI utilities
 */
export async function deployEASSubgraphInternal(options: DeploySubgraphOptions): Promise<string> {
  const { subgraphName, theGraphAdminEndpoint, easAddress, schemaRegistryAddress, ipfsEndpoint, networkName } = options;
  // Resolve the EAS subgraph working directory robustly (independent of CWD)
  const thisFile = fileURLToPath(import.meta.url);
  const easSrcDir = dirname(thisFile); // .../sdk/eas/src
  const easRoot = dirname(easSrcDir); // .../sdk/eas
  const workingDir = join(easRoot, "subgraph");

  // Delegate to shared TheGraph deploy utility
  const queryEndpoint = await deploySubgraphWithGraphCLI({
    workingDir,
    adminUrl: theGraphAdminEndpoint,
    subgraphName,
    ipfsUrl: ipfsEndpoint,
    network: networkName,
    bumpApiVersion: true,
    setAddresses: {
      EAS: easAddress,
      SchemaRegistry: schemaRegistryAddress,
    },
  });

  return queryEndpoint;
}
