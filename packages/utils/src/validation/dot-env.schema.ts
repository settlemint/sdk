import { z } from "zod";
import { AccessTokenSchema } from "./access-token.schema.js";
import { UrlSchema } from "./url.schema.js";
/**
 * Schema for validating access tokens.
 */
export const DotEnvSchema = z.object({
  SETTLEMINT_ENVIRONMENT: z.string(),
  SETTLEMINT_INSTANCE: UrlSchema,
  SETTLEMINT_ACCESS_TOKEN: AccessTokenSchema,
});

export type DotEnv = z.infer<typeof DotEnvSchema>;
