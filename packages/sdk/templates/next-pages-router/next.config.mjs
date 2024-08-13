import { withSettleMint } from "@settlemint/sdk-next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default withSettleMint(nextConfig, {
  output: "standalone",
});
