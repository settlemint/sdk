import { z } from "zod";
import { AccessTokenSchema, UniqueNameSchema, UrlSchema } from "./shared";

export const SettleMintClientEnvSchema = z.object({
  SETTLEMINT_ACCESS_TOKEN: AccessTokenSchema,
  SETTLEMINT_INSTANCE: UrlSchema,
  SETTLEMINT_DEFAULT_BLOCKCHAIN_NETWORK: UniqueNameSchema.optional(),
});
