import { ZodError, type ZodSchema, z } from "zod";

export const AccessTokenSchema = z.string().regex(/^btp_pat_.*|btp_aat_.*$/);
export type AccessToken = z.infer<typeof AccessTokenSchema>;

export const UrlSchema = z.string().url();
export type UrlType = z.infer<typeof UrlSchema>;

export const IdSchema = z.union([
  z
    .string()
    .uuid(), // PostgreSQL UUID
  z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/), // MongoDB ObjectID
]);
export type Id = z.infer<typeof IdSchema>;

export const SettleMintClientOptionsSchema = z.object({
  accessToken: AccessTokenSchema,
  instance: UrlSchema,
  workspaceId: IdSchema.optional(),
  applicationId: IdSchema.optional(),
  blockchainNetworkId: IdSchema.optional(),
  blockchainNodeId: IdSchema.optional(),
  middlewareId: IdSchema.optional(),
  integrationId: IdSchema.optional(),
  storageId: IdSchema.optional(),
  privateKeyId: IdSchema.optional(),
  insightsId: IdSchema.optional(),
  customDeploymentId: IdSchema.optional(),
});
export type SettleMintClientOptions = z.infer<typeof SettleMintClientOptionsSchema>;

export function validate<T extends ZodSchema>(schema: T, value: unknown): T["_output"] {
  try {
    return schema.parse(value);
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.errors.map((err) => `- ${err.path.join(".")}: ${err.message}`).join("\n");
      throw new Error(`Validation error(s):\n${formattedErrors}`);
    }
    throw error; // Re-throw if it's not a ZodError
  }
}
