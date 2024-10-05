import { z } from "zod";
import { AccessTokenSchema } from "./access-token.schema.js";
import { IdSchema } from "./id.schema.js";
import { UrlSchema } from "./url.schema.js";
/**
 * Schema for validating access tokens.
 */
export const DotEnvSchema = z.object({
  SETTLEMINT_ENVIRONMENT: z.string(),
  SETTLEMINT_INSTANCE: UrlSchema,
  SETTLEMINT_ACCESS_TOKEN: AccessTokenSchema,
  SETTLEMINT_WORKSPACE: IdSchema,
  SETTLEMINT_APPLICATION: IdSchema,
});

export type DotEnv = z.infer<typeof DotEnvSchema>;
