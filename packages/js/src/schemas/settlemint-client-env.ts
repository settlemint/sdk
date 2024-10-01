import { z } from "zod";
import { AccessTokenSchema, UniqueNameSchema, UrlSchema } from "./shared";

export const SettleMintClientEnvSchema = z.object({
  SETTLEMINT_ACCESS_TOKEN: AccessTokenSchema,
  SETTLEMINT_INSTANCE: UrlSchema,
  SETTLEMINT_DEFAULT_BLOCKCHAIN_NETWORK: UniqueNameSchema.optional(),
  SETTLEMINT_DEFAULT_BLOCKCHAIN_NODE: UniqueNameSchema.optional(),
  SETTLEMINT_DEFAULT_STORAGE: UniqueNameSchema.optional(),
  SETTLEMINT_DEFAULT_PRIVATE_KEY: UniqueNameSchema.optional(),
  SETTLEMINT_DEFAULT_INTEGRATION_TOOL: UniqueNameSchema.optional(),
  SETTLEMINT_DEFAULT_MIDDLEWARE: UniqueNameSchema.optional(),
  SETTLEMINT_DEFAULT_CUSTOM_DEPLOYMENT: UniqueNameSchema.optional(),
  SETTLEMINT_DEFAULT_INSIGHTS: UniqueNameSchema.optional(),
});
