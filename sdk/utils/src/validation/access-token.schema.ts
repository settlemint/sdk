import { type ZodString, z } from "zod";

/**
 * Schema for validating application access tokens.
 * Application access tokens start with 'sm_aat_' prefix.
 */
export const ApplicationAccessTokenSchema: ZodString = z.string().regex(/^sm_aat_.*$/);
export type ApplicationAccessToken = z.infer<typeof ApplicationAccessTokenSchema>;

/**
 * Schema for validating personal access tokens.
 * Personal access tokens start with 'sm_pat_' prefix.
 */
export const PersonalAccessTokenSchema: ZodString = z.string().regex(/^sm_pat_.*$/);
export type PersonalAccessToken = z.infer<typeof PersonalAccessTokenSchema>;

/**
 * Schema for validating both application and personal access tokens.
 * Accepts tokens starting with either 'sm_pat_' or 'sm_aat_' prefix.
 */
export const AccessTokenSchema: ZodString = z.string().regex(/^sm_pat_.*|sm_aat_.*$/);
export type AccessToken = z.infer<typeof AccessTokenSchema>;
