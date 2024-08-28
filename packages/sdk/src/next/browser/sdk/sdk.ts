import { createGraphqlClient } from "@/next/browser/sdk/plugins/graphql";
import { createPortalRestClient } from "@/next/browser/sdk/plugins/portal";
import { createViemPublicClient, createViemWalletClient } from "@/next/browser/sdk/plugins/viem";

export const sdkGenerator = {
  createPortalRestClient,
  createGraphqlClient,
  createViemPublicClient,
  createViemWalletClient,
};
