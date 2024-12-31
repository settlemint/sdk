import { tryParseJson } from "@/core/json.js";
import { z } from "zod";
import { ApplicationAccessTokenSchema, PersonalAccessTokenSchema } from "./access-token.schema.js";
import { UniqueNameSchema } from "./unique-name.schema.js";
import { UrlSchema } from "./url.schema.js";
/**
 * Schema for validating access tokens.
 */
export const DotEnvSchema = z.object({
  SETTLEMINT_INSTANCE: UrlSchema.default("https://console.settlemint.com"),
  SETTLEMINT_ACCESS_TOKEN: ApplicationAccessTokenSchema.optional(),
  SETTLEMINT_PERSONAL_ACCESS_TOKEN: PersonalAccessTokenSchema.optional(),
  SETTLEMINT_WORKSPACE: UniqueNameSchema.optional(),
  SETTLEMINT_APPLICATION: UniqueNameSchema.optional(),
  SETTLEMINT_BLOCKCHAIN_NETWORK: UniqueNameSchema.optional(),
  SETTLEMINT_BLOCKCHAIN_NODE: UniqueNameSchema.optional(),
  SETTLEMINT_LOAD_BALANCER: UniqueNameSchema.optional(),
  SETTLEMINT_HASURA: UniqueNameSchema.optional(),
  SETTLEMINT_HASURA_ENDPOINT: UrlSchema.optional(),
  SETTLEMINT_HASURA_ADMIN_SECRET: z.string().optional(),
  SETTLEMINT_HASURA_DATABASE_URL: z.string().optional(),
  SETTLEMINT_THEGRAPH: UniqueNameSchema.optional(),
  SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS: z.preprocess(
    (value) => tryParseJson(value as string, []),
    z.array(UrlSchema).optional(),
  ),
  SETTLEMINT_THEGRAPH_SUBGRAPH_NAME: z.string().optional(),
  SETTLEMINT_PORTAL: UniqueNameSchema.optional(),
  SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT: UrlSchema.optional(),
  SETTLEMINT_PORTAL_REST_ENDPOINT: UrlSchema.optional(),
  SETTLEMINT_HD_PRIVATE_KEY: UniqueNameSchema.optional(),
  SETTLEMINT_MINIO: UniqueNameSchema.optional(),
  SETTLEMINT_MINIO_ENDPOINT: UrlSchema.optional(),
  SETTLEMINT_MINIO_ACCESS_KEY: z.string().optional(),
  SETTLEMINT_MINIO_SECRET_KEY: z.string().optional(),
  SETTLEMINT_IPFS: UniqueNameSchema.optional(),
  SETTLEMINT_IPFS_API_ENDPOINT: UrlSchema.optional(),
  SETTLEMINT_IPFS_PINNING_ENDPOINT: UrlSchema.optional(),
  SETTLEMINT_IPFS_GATEWAY_ENDPOINT: UrlSchema.optional(),
  SETTLEMINT_CUSTOM_DEPLOYMENT: UniqueNameSchema.optional(),
  SETTLEMINT_CUSTOM_DEPLOYMENT_ENDPOINT: UrlSchema.optional(),
  SETTLEMINT_BLOCKSCOUT: UniqueNameSchema.optional(),
  SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT: UrlSchema.optional(),
  SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT: UrlSchema.optional(),
  SETTLEMINT_NEW_PROJECT_NAME: z.string().optional(),
  SETTLEMINT_SMART_CONTRACT_ADDRESS: z.string().optional(),
  SETTLEMINT_SMART_CONTRACT_DEPLOYMENT_ID: z.string().optional(),
});

export type DotEnv = z.infer<typeof DotEnvSchema>;

export const DotEnvSchemaPartial = DotEnvSchema.partial();
export type DotEnvPartial = z.infer<typeof DotEnvSchemaPartial>;
