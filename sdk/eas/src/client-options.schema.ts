import { z } from "zod";

export const ClientOptionsSchema = z.object({
  schemaRegistryAddress: z.string().min(1),
  attestationAddress: z.string().min(1),
  blockchainNode: z.string().min(1),
});

export type ClientOptions = z.infer<typeof ClientOptionsSchema>;
