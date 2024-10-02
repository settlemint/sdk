import { ZodError, type ZodSchema, z } from "zod";

/**
 * Validates the given value against the provided Zod schema.
 * @param schema The Zod schema to validate against.
 * @param value The value to validate.
 * @returns The validated and parsed data if successful.
 * @throws {Error} If validation fails, with a formatted error message.
 */
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

export const AccessTokenSchema = z.string().regex(/^btp_pat_.*|btp_aat_.*$/);

export const UniqueNameSchema = z.string().regex(/^[a-z-]+-[a-z0-9]{5}$/);
export type UniqueName = z.infer<typeof UniqueNameSchema>;

export const SearchKeySchema = z.string().regex(/^[a-z0-9]{5}$/);

export const UrlSchema = z.string().url();

export const ServiceTypeSchema = z.enum([
  "workspace",
  "application",
  "blockchain-network",
  "blockchain-node",
  "smart-contract-set",
  "middleware",
  "integration-tool",
  "storage",
  "private-key",
  "insights",
  "custom-deployment",
]);
export type ServiceType = z.infer<typeof ServiceTypeSchema>;

export const EthereumAddressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/);

export const EthereumPublicKeySchema = z.string().regex(/^0x[a-fA-F0-9]{64}$/);

export const SettleMintClientEnvSchema = z.object({
  SETTLEMINT_ACCESS_TOKEN: AccessTokenSchema,
  SETTLEMINT_INSTANCE: UrlSchema,
  SETTLEMINT_DEFAULT_BLOCKCHAIN_NETWORK: UniqueNameSchema.optional(),
  SETTLEMINT_DEFAULT_BLOCKCHAIN_NODE: UniqueNameSchema.optional(),
  SETTLEMINT_DEFAULT_STORAGE: UniqueNameSchema.optional(),
  SETTLEMINT_DEFAULT_PRIVATE_KEY: UniqueNameSchema.optional(),
  SETTLEMINT_DEFAULT_INTEGRATION_TOOL: UniqueNameSchema.optional(),
  SETTLEMINT_DEFAULT_MIDDLEWARE: UniqueNameSchema.optional(),
  SETTLEMINT_DEFAULT_CUSTOM_DEPLOYMENT: UniqueNameSchema.optional(),
  SETTLEMINT_DEFAULT_INSIGHTS: UniqueNameSchema.optional(),
  SETTLEMINT_DEFAULT_WORKSPACE: UniqueNameSchema.optional(),
  SETTLEMINT_DEFAULT_APPLICATION: UniqueNameSchema.optional(),
});

const BasePlatformReturnValueSchema = z.object({
  uniqueName: UniqueNameSchema,
  displayName: z.string(),
});

export const WorkspaceReturnValueSchema = BasePlatformReturnValueSchema.extend({});
export type WorkspaceReturnValue = z.infer<typeof WorkspaceReturnValueSchema>;

export const ApplicationReturnValueSchema = BasePlatformReturnValueSchema.extend({
  workspace: UniqueNameSchema,
});
export type ApplicationReturnValue = z.infer<typeof ApplicationReturnValueSchema>;

const WsApplPlatformReturnValueSchema = BasePlatformReturnValueSchema.extend({
  workspace: UniqueNameSchema,
  application: UniqueNameSchema,
});

export const BlockchainNetworkReturnValueSchema = WsApplPlatformReturnValueSchema.extend({
  serviceSubType: z.string(),
  chainId: z.string(),
});
export type BlockchainNetworkReturnValue = z.infer<typeof BlockchainNetworkReturnValueSchema>;

export const BlockchainNodeReturnValueSchema = WsApplPlatformReturnValueSchema.extend({
  serviceSubType: z.string(),
  network: UniqueNameSchema,
  endpoints: z.object({
    base: UrlSchema,
    jsonRpc: UrlSchema,
    jsonWs: UrlSchema,
    graphQl: UrlSchema,
  }),
});
export type BlockchainNodeReturnValue = z.infer<typeof BlockchainNodeReturnValueSchema>;

const BaseMiddlewareSchema = WsApplPlatformReturnValueSchema.extend({
  serviceSubType: z.string(),
  endpoints: z.object({
    base: UrlSchema,
  }),
});

const PortalMiddlewareSchema = BaseMiddlewareSchema.extend({
  serviceSubType: z.literal("SMART_CONTRACT_PORTAL"),
  endpoints: z.object({
    base: UrlSchema,
    jsonRpc: UrlSchema,
    jsonWs: UrlSchema,
    graphQl: UrlSchema,
  }),
});

const TheGraphMiddlewareSchema = BaseMiddlewareSchema.extend({
  serviceSubType: z.literal("HA_GRAPH"),
  endpoints: z.object({
    base: UrlSchema,
    subgraph: UrlSchema,
    defaultSubgraph: UrlSchema,
  }),
});

export const MiddlewareReturnValueSchema = z.union([
  PortalMiddlewareSchema,
  TheGraphMiddlewareSchema,
  BaseMiddlewareSchema,
]);

export type MiddlewareReturnValue = z.infer<typeof MiddlewareReturnValueSchema>;

const BaseIntegrationToolSchema = WsApplPlatformReturnValueSchema.extend({
  serviceSubType: z.string(),
  endpoints: z.object({
    base: UrlSchema,
  }),
});

const HasuraIntegrationToolSchema = BaseIntegrationToolSchema.extend({
  serviceSubType: z.literal("HASURA"),
  endpoints: z.object({
    base: UrlSchema,
    graphQl: UrlSchema,
  }),
  secrets: z.object({
    adminSecret: z.string(),
  }),
});

export const IntegrationToolReturnValueSchema = z.union([HasuraIntegrationToolSchema, BaseIntegrationToolSchema]);
export type IntegrationToolReturnValue = z.infer<typeof IntegrationToolReturnValueSchema>;

const BaseStorageSchema = WsApplPlatformReturnValueSchema.extend({
  serviceSubType: z.string(),
  endpoints: z.object({
    base: UrlSchema,
  }),
});

const IpfsStorageSchema = BaseStorageSchema.extend({
  serviceSubType: z.literal("IPFS"),
  endpoints: z.object({
    base: UrlSchema,
    api: UrlSchema,
    gateway: UrlSchema,
    clusterApi: UrlSchema,
    pinning: UrlSchema,
  }),
  secrets: z.object({
    password: z.string(),
  }),
});

const MinioStorageSchema = BaseStorageSchema.extend({
  serviceSubType: z.literal("MINIO"),
  endpoints: z.object({
    base: UrlSchema,
    s3Api: UrlSchema,
  }),
  secrets: z.object({
    accessKey: z.string(),
    secretKey: z.string(),
  }),
});

export const StorageReturnValueSchema = z.union([IpfsStorageSchema, MinioStorageSchema, BaseStorageSchema]);
export type StorageReturnValue = z.infer<typeof StorageReturnValueSchema>;

const BasePrivateKeySchema = WsApplPlatformReturnValueSchema.extend({
  serviceSubType: z.string(),
});

const HdPrivateKeySchema = BasePrivateKeySchema.extend({
  serviceSubType: z.literal("HD_ECDSA_P256"),
});

const EcdsaPrivateKeySchema = BasePrivateKeySchema.extend({
  serviceSubType: z.literal("MINIO"),
  address: EthereumAddressSchema,
  publicKey: EthereumPublicKeySchema,
});

export const PrivateKeyReturnValueSchema = z.union([HdPrivateKeySchema, EcdsaPrivateKeySchema, BasePrivateKeySchema]);
export type PrivateKeyReturnValue = z.infer<typeof PrivateKeyReturnValueSchema>;

export const InsightsReturnValueSchema = WsApplPlatformReturnValueSchema.extend({
  serviceSubType: z.string(),
  protocol: z.string(),
  endpoints: z.object({
    base: UrlSchema,
  }),
});
export type InsightsReturnValue = z.infer<typeof InsightsReturnValueSchema>;

export const CustomDeploymentReturnValueSchema = WsApplPlatformReturnValueSchema.extend({
  serviceSubType: z.string(),
  protocol: z.string(),
  endpoints: z.object({
    base: UrlSchema,
  }),
});
export type CustomDeploymentReturnValue = z.infer<typeof CustomDeploymentReturnValueSchema>;
