import type { ClientOptions as ViemClientOptions } from "@settlemint/sdk-viem";
import { z } from "zod";

export const ClientOptionsSchema = z.object({
  schemaRegistryAddress: z.string().min(1),
  attestationAddress: z.string().min(1),
  ...z.object({
    accessToken: z.string().min(1),
    chainId: z.string().min(1),
    chainName: z.string().min(1),
    rpcUrl: z.string().min(1),
  }).shape,
});

export type ClientOptions = z.infer<typeof ClientOptionsSchema> &
  Pick<ViemClientOptions, "accessToken" | "chainId" | "chainName" | "rpcUrl">;
