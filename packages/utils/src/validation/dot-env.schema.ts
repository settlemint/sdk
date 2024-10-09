import { z } from "zod";
import { AccessTokenSchema } from "./access-token.schema.js";
import { IdSchema } from "./id.schema.js";
import { UrlSchema } from "./url.schema.js";
/**
 * Schema for validating access tokens.
 */
export const DotEnvSchema = z.object({
  SETTLEMINT_INSTANCE: UrlSchema,
  SETTLEMINT_ACCESS_TOKEN: AccessTokenSchema,
  SETTLEMINT_WORKSPACE: IdSchema,
  SETTLEMINT_APPLICATION: IdSchema,
  SETTLEMINT_HASURA: IdSchema.optional(),
  SETTLEMINT_HASURA_ENDPOINT: UrlSchema.optional(),
  SETTLEMINT_HASURA_ADMIN_SECRET: z.string().optional(),
  SETTLEMINT_THEGRAPH: IdSchema.optional(),
  SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT: UrlSchema.optional(),
  SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT_FALLBACK: UrlSchema.optional(),
  SETTLEMINT_PORTAL: IdSchema.optional(),
  SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT: UrlSchema.optional(),
  SETTLEMINT_PORTAL_REST_ENDPOINT: UrlSchema.optional(),
  SETTLEMINT_HD_PRIVATE_KEY: z.string().optional(),
  SETTLEMINT_MINIO: IdSchema.optional(),
  SETTLEMINT_MINIO_ENDPOINT: UrlSchema.optional(),
  SETTLEMINT_MINIO_ACCESS_KEY: z.string().optional(),
  SETTLEMINT_MINIO_SECRET_KEY: z.string().optional(),
  SETTLEMINT_IPFS: IdSchema.optional(),
  SETTLEMINT_IPFS_API_ENDPOINT: UrlSchema.optional(),
  SETTLEMINT_IPFS_PINNING_ENDPOINT: UrlSchema.optional(),
  SETTLEMINT_IPFS_GATEWAY_ENDPOINT: UrlSchema.optional(),
  SETTLEMINT_AUTH_SECRET: z.string(),
  NEXTAUTH_URL: UrlSchema,
});

export type DotEnv = z.infer<typeof DotEnvSchema>;

export const DotEnvSchemaPartial = DotEnvSchema.partial();
export type DotEnvPartial = z.infer<typeof DotEnvSchemaPartial>;
