import { config } from "@settlemint/btp-sdk-config";
import type { NextConfig } from "next";

export type WithBTPOptions = {
  disabled?: boolean;
};

/**
 * Modifies the passed in Next.js configuration
 */
export async function withBTP<C extends NextConfig>(nextConfig: C, { disabled }: WithBTPOptions = {}): Promise<C> {
  if (disabled) {
    const cfg = await config();

    return {
      output: "standalone",
      ...nextConfig,
    } as C;
  }
  return nextConfig;
}
