import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  output: "standalone",
};

export default nextConfig;
