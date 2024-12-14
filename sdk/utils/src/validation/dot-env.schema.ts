import { z } from "zod";
import { ApplicationAccessTokenSchema, PersonalAccessTokenSchema } from "./access-token.schema.js";
import { IdSchema } from "./id.schema.js";
import { UrlSchema } from "./url.schema.js";
/**
 * Schema for validating access tokens.
 */
export const DotEnvSchema = z.object({
  SETTLEMINT_INSTANCE: UrlSchema,
  SETTLEMINT_ACCESS_TOKEN: ApplicationAccessTokenSchema,
  SETTLEMINT_PERSONAL_ACCESS_TOKEN: PersonalAccessTokenSchema.optional(),
  SETTLEMINT_WORKSPACE: IdSchema,
  SETTLEMINT_APPLICATION: IdSchema,
  SETTLEMINT_BLOCKCHAIN_NETWORK: IdSchema.optional(),
  SETTLEMINT_BLOCKCHAIN_NODE: IdSchema.optional(),
  SETTLEMINT_LOAD_BALANCER: IdSchema.optional(),
  SETTLEMINT_HASURA: IdSchema.optional(),
  SETTLEMINT_HASURA_ENDPOINT: UrlSchema.optional(),
  SETTLEMINT_HASURA_ADMIN_SECRET: z.string().optional(),
  SETTLEMINT_THEGRAPH: IdSchema.optional(),
  SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT: UrlSchema.optional(),
  SETTLEMINT_THEGRAPH_SUBGRAPH_NAME: z.string().optional(),
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
  SETTLEMINT_CUSTOM_DEPLOYMENT: IdSchema.optional(),
  SETTLEMINT_CUSTOM_DEPLOYMENT_ENDPOINT: UrlSchema.optional(),
  SETTLEMINT_BLOCKSCOUT: IdSchema.optional(),
  SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT: UrlSchema.optional(),
  SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT: UrlSchema.optional(),
  SETTLEMINT_NEW_PROJECT_NAME: z.string().optional(),
  NEXTAUTH_URL: UrlSchema,
  SETTLEMINT_PREDEPLOYED_CONTRACT_ERC20_REGISTRY: z.literal("0x5e771e1417100000000000000000000000000001"),
  SETTLEMINT_PREDEPLOYED_CONTRACT_ERC20_FACTORY: z.literal("0x5e771e1417100000000000000000000000000002"),
  SETTLEMINT_PREDEPLOYED_CONTRACT_ERC20_DEX_FACTORY: z.literal("0x5e771e1417100000000000000000000000000003"),
  SETTLEMINT_SMART_CONTRACT_SET: IdSchema.optional(),
  SETTLEMINT_SMART_CONTRACT_SET_ADDRESS: z.string().optional(),
  SETTLEMINT_SMART_CONTRACT_SET_DEPLOYMENT_ID: z.string().optional(),
});

export type DotEnv = z.infer<typeof DotEnvSchema>;

export const DotEnvSchemaPartial = DotEnvSchema.partial();
export type DotEnvPartial = z.infer<typeof DotEnvSchemaPartial>;
