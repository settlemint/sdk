import { withBTP } from "@settlemint/btp-sdk-next";

/** @type {import('next').NextConfig} */
const nextConfig = await withBTP({});

export default nextConfig;
