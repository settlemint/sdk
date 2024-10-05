import { z } from "zod";
/**
 * Schema for validating access tokens.
 */
export const AccessTokenSchema = z.string().regex(/^btp_pat_.*|btp_aat_.*$/);
export type AccessToken = z.infer<typeof AccessTokenSchema>;
