import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomiclabs/hardhat-solhint";
import type { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 10_000,
      },
    },
  },
  networks: {
    hardhat: {},
    settlemint: {
      url: process.env.SETTLEMINT_NODE_JSON_RPC_URL ?? "",
      httpHeaders: {
        "x-auth-token": process.env.SETTLEMINT_PAT_TOKEN ?? "",
      },
    },
  },
};

export default config;
