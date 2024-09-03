import { withSettleMint } from "@settlemint/sdk/node";
import { makeEnvPublic } from "next-runtime-env";

makeEnvPublic(["SETTLEMINT_APP_URL", "WALLET_CONNECT_PROJECT_ID"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding", "debug");
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.performance = {
      hints: false,
    };
    return config;
  },
};

export default withSettleMint(nextConfig);
