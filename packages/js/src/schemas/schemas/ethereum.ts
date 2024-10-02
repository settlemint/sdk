import { z } from "zod";

export const EthereumAddressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/);
export type EthereumAddress = z.infer<typeof EthereumAddressSchema>;

export const EthereumPublicKeySchema = z.string().regex(/^0x[a-fA-F0-9]{64}$/);
export type EthereumPublicKey = z.infer<typeof EthereumPublicKeySchema>;
