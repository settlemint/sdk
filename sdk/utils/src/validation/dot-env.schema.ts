import { tryParseJson } from "@/json.js";
import { z } from "zod";
import { ApplicationAccessTokenSchema, PersonalAccessTokenSchema } from "./access-token.schema.js";
import { UniqueNameSchema } from "./unique-name.schema.js";
import { UrlSchema } from "./url.schema.js";

/**
 * Schema for validating environment variables used by the SettleMint SDK.
 * Defines validation rules and types for configuration values like URLs,
 * access tokens, workspace names, and service endpoints.
 */
export const DotEnvSchema = z.object({
  /** Base URL of the SettleMint platform instance */
  SETTLEMINT_INSTANCE: UrlSchema.default("https://console.settlemint.com"),
  /** Application access token for authenticating with SettleMint services */
  SETTLEMINT_ACCESS_TOKEN: ApplicationAccessTokenSchema.optional(),
  /** @internal */
  SETTLEMINT_PERSONAL_ACCESS_TOKEN: PersonalAccessTokenSchema.optional(),
  /** Unique name of the workspace */
  SETTLEMINT_WORKSPACE: UniqueNameSchema.optional(),
  /** Unique name of the application */
  SETTLEMINT_APPLICATION: UniqueNameSchema.optional(),
  /** Unique name of the blockchain network */
  SETTLEMINT_BLOCKCHAIN_NETWORK: UniqueNameSchema.optional(),
  /** Chain ID of the blockchain network */
  SETTLEMINT_BLOCKCHAIN_NETWORK_CHAIN_ID: z.string().optional(),
  /** Unique name of the blockchain node (should have a private key for signing transactions) */
  SETTLEMINT_BLOCKCHAIN_NODE: UniqueNameSchema.optional(),
  /** JSON RPC endpoint for the blockchain node */
  SETTLEMINT_BLOCKCHAIN_NODE_JSON_RPC_ENDPOINT: UrlSchema.optional(),
  /** Unique name of the blockchain node or load balancer */
  SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER: UniqueNameSchema.optional(),
  /** JSON RPC endpoint for the blockchain node or load balancer */
  SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER_JSON_RPC_ENDPOINT: UrlSchema.optional(),
  /** Unique name of the Hasura instance */
  SETTLEMINT_HASURA: UniqueNameSchema.optional(),
  /** Endpoint URL for the Hasura GraphQL API */
  SETTLEMINT_HASURA_ENDPOINT: UrlSchema.optional(),
  /** Admin secret for authenticating with Hasura */
  SETTLEMINT_HASURA_ADMIN_SECRET: z.string().optional(),
  /** Database connection URL for Hasura */
  SETTLEMINT_HASURA_DATABASE_URL: z.string().optional(),
  /** Unique name of The Graph instance */
  SETTLEMINT_THEGRAPH: UniqueNameSchema.optional(),
  /** Array of endpoint URLs for The Graph subgraphs */
  SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS: z.preprocess(
    (value) => tryParseJson(value as string, []),
    z.array(UrlSchema).optional(),
  ),
  /** Default The Graph subgraph to use */
  SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH: z.string().optional(),
  /** Unique name of the Smart Contract Portal instance */
  SETTLEMINT_PORTAL: UniqueNameSchema.optional(),
  /** GraphQL endpoint URL for the Portal */
  SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT: UrlSchema.optional(),
  /** REST endpoint URL for the Portal */
  SETTLEMINT_PORTAL_REST_ENDPOINT: UrlSchema.optional(),
  /** WebSocket endpoint URL for the Portal */
  SETTLEMINT_PORTAL_WS_ENDPOINT: UrlSchema.optional(),
  /** Unique name of the HD private key */
  SETTLEMINT_HD_PRIVATE_KEY: UniqueNameSchema.optional(),
  /** Address of the HD private key forwarder */
  SETTLEMINT_HD_PRIVATE_KEY_FORWARDER_ADDRESS: z.string().optional(),
  /** Unique name of the accessible private key */
  SETTLEMINT_ACCESSIBLE_PRIVATE_KEY: UniqueNameSchema.optional(),
  /** Unique name of the MinIO instance */
  SETTLEMINT_MINIO: UniqueNameSchema.optional(),
  /** Endpoint URL for MinIO */
  SETTLEMINT_MINIO_ENDPOINT: UrlSchema.optional(),
  /** Access key for MinIO authentication */
  SETTLEMINT_MINIO_ACCESS_KEY: z.string().optional(),
  /** Secret key for MinIO authentication */
  SETTLEMINT_MINIO_SECRET_KEY: z.string().optional(),
  /** Unique name of the IPFS instance */
  SETTLEMINT_IPFS: UniqueNameSchema.optional(),
  /** API endpoint URL for IPFS */
  SETTLEMINT_IPFS_API_ENDPOINT: UrlSchema.optional(),
  /** Pinning service endpoint URL for IPFS */
  SETTLEMINT_IPFS_PINNING_ENDPOINT: UrlSchema.optional(),
  /** Gateway endpoint URL for IPFS */
  SETTLEMINT_IPFS_GATEWAY_ENDPOINT: UrlSchema.optional(),
  /** Unique name of the custom deployment */
  SETTLEMINT_CUSTOM_DEPLOYMENT: UniqueNameSchema.optional(),
  /** Endpoint URL for the custom deployment */
  SETTLEMINT_CUSTOM_DEPLOYMENT_ENDPOINT: UrlSchema.optional(),
  /** Unique name of the Blockscout instance */
  SETTLEMINT_BLOCKSCOUT: UniqueNameSchema.optional(),
  /** GraphQL endpoint URL for Blockscout */
  SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT: UrlSchema.optional(),
  /** UI endpoint URL for Blockscout */
  SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT: UrlSchema.optional(),
  /** Name of the new project being created */
  SETTLEMINT_NEW_PROJECT_NAME: z.string().optional(),
  /** The log level to use */
  SETTLEMINT_LOG_LEVEL: z.enum(["debug", "info", "warn", "error", "none"]).default("warn"),
});

/**
 * Type definition for the environment variables schema.
 */
export type DotEnv = z.infer<typeof DotEnvSchema>;

/**
 * Partial version of the environment variables schema where all fields are optional.
 * Useful for validating incomplete configurations during development or build time.
 */
export const DotEnvSchemaPartial = DotEnvSchema.partial();

/**
 * Type definition for the partial environment variables schema.
 */
export type DotEnvPartial = z.infer<typeof DotEnvSchemaPartial>;
