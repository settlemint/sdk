import type { CreateBlockchainNetworkArgs } from "../graphql/blockchain-network.js";
import { setClusterServiceDefaults } from "./cluster-service-defaults.js";

export function setNetworkDefaults(args: CreateBlockchainNetworkArgs): CreateBlockchainNetworkArgs {
  const clusterServiceArgs = setClusterServiceDefaults(args);
  if (args.consensusAlgorithm === "BESU_QBFT") {
    return {
      ...clusterServiceArgs,
      chainId: args.chainId ?? 46040,
      contractSizeLimit: args.contractSizeLimit ?? 2147483647,
      evmStackSize: args.evmStackSize ?? 2048,
      gasLimit: args.gasLimit ?? "9007199254740991",
      gasPrice: args.gasPrice ?? 0,
      secondsPerBlock: args.secondsPerBlock ?? 2,
    };
  }
  return clusterServiceArgs;
}
