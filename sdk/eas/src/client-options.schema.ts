import { Wallet } from "ethers";
import { z } from "zod";

export const ClientOptionsSchema = z.object({
  schemaRegistryAddress: z.string().min(1),
  attestationAddress: z.string().min(1),
  blockchainNode: z.string().min(1),
  wallet: z.union([
    z
      .string()
      .min(1), // private key
    z.instanceof(Wallet), // Wallet instance
  ]),
});

export type ClientOptions = z.infer<typeof ClientOptionsSchema>;
