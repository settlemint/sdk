import { z } from "zod";
import { EthereumAddressSchema, EthereumPublicKeySchema } from "./ethereum";
import { WsApplPlatformReturnValueSchema } from "./ws-appl-platform";

export const BasePrivateKeySchema = WsApplPlatformReturnValueSchema.extend({
  serviceSubType: z.string(),
});
export type BasePrivateKey = z.infer<typeof BasePrivateKeySchema>;

export const HdPrivateKeySchema = BasePrivateKeySchema.extend({
  serviceSubType: z.literal("HD_ECDSA_P256"),
});
export type HdPrivateKey = z.infer<typeof HdPrivateKeySchema>;

export const EcdsaPrivateKeySchema = BasePrivateKeySchema.extend({
  serviceSubType: z.literal("ECDSA"),
  address: EthereumAddressSchema,
  publicKey: EthereumPublicKeySchema,
});
export type EcdsaPrivateKey = z.infer<typeof EcdsaPrivateKeySchema>;

export const PrivateKeyReturnValueSchema = z.union([HdPrivateKeySchema, EcdsaPrivateKeySchema, BasePrivateKeySchema]);
export type PrivateKeyReturnValue = z.infer<typeof PrivateKeyReturnValueSchema>;
