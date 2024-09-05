import { paraglide } from "@inlang/paraglide-next/plugin";
import { withSettleMint } from "@settlemint/sdk/node";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding", "debug");
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.performance = {
      hints: false,
    };
    return config;
  },
  experimental: {
    typedRoutes: true,
  },
};

export default withSettleMint(
  paraglide({
    paraglide: {
      project: "./project.inlang",
      outdir: "./paraglide",
    },
    ...nextConfig,
  }),
);
