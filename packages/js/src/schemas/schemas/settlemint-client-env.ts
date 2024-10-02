import { z } from "zod";
import { AccessTokenSchema } from "./access-token";
import { UniqueNameSchema } from "./unique-name";
import { UrlSchema } from "./url";

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
  SETTLEMINT_DEFAULT_WORKSPACE: UniqueNameSchema.optional(),
  SETTLEMINT_DEFAULT_APPLICATION: UniqueNameSchema.optional(),
});
export type SettleMintClientEnv = z.infer<typeof SettleMintClientEnvSchema>;
