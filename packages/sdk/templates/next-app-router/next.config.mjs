/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withSettleMint(nextConfig, {
  output: "standalone",
});
