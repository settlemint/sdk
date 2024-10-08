import { type ZodString, z } from "zod";
/**
 * Schema for validating access tokens.
 */
export const AccessTokenSchema: ZodString = z.string().regex(/^sm_pat_.*|sm_aat_.*$/);
export type AccessToken = z.infer<typeof AccessTokenSchema>;
