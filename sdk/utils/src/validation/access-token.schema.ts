import { type ZodString, z } from "zod";
/**
 * Schema for validating access tokens.
 */
export const ApplicationAccessTokenSchema: ZodString = z.string().regex(/^sm_aat_.*$/);
export type ApplicationAccessToken = z.infer<typeof ApplicationAccessTokenSchema>;

export const PersonalAccessTokenSchema: ZodString = z.string().regex(/^sm_pat_.*$/);
export type PersonalAccessToken = z.infer<typeof PersonalAccessTokenSchema>;

export const AccessTokenSchema: ZodString = z.string().regex(/^sm_pat_.*|sm_aat_.*$/);
export type AccessToken = z.infer<typeof AccessTokenSchema>;
