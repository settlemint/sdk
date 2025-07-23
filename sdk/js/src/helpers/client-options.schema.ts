import { AccessTokenSchema, UrlSchema } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Schema for validating SettleMint client options.
 */
export const ClientOptionsSchema = z.object({
  /** The access token used to authenticate with the SettleMint platform */
  accessToken: AccessTokenSchema,
  /** The URL of the SettleMint instance to connect to */
  instance: UrlSchema,
});

/**
 * Type definition for SettleMint client options, inferred from ClientOptionsSchema.
 */
export type ClientOptions = z.infer<typeof ClientOptionsSchema>;
