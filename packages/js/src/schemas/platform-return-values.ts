import { EthereumAddressSchema, EthereumPublicKeySchema, UniqueNameSchema, UrlSchema } from "@/schemas/shared";
import { z } from "zod";

const BasePlatformReturnValueSchema = z.object({
  uniqueName: UniqueNameSchema,
  displayName: z.string(),
  serviceSubType: z.string(),
});

export const BlockchainNetworkReturnValueSchema = BasePlatformReturnValueSchema.extend({
  chainId: z.string(),
});
export type BlockchainNetworkReturnValue = z.infer<typeof BlockchainNetworkReturnValueSchema>;

export const BlockchainNodeReturnValueSchema = BasePlatformReturnValueSchema.extend({
  network: UniqueNameSchema,
  endpoints: z.object({
    base: UrlSchema,
    jsonRpc: UrlSchema,
    jsonWs: UrlSchema,
    graphQl: UrlSchema,
  }),
});
export type BlockchainNodeReturnValue = z.infer<typeof BlockchainNodeReturnValueSchema>;

const BaseMiddlewareSchema = BasePlatformReturnValueSchema.extend({
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

const BaseIntegrationToolSchema = BasePlatformReturnValueSchema.extend({
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

const BaseStorageSchema = BasePlatformReturnValueSchema.extend({
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

const BasePrivateKeySchema = BasePlatformReturnValueSchema.extend({});

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

export const InsightsReturnValueSchema = BasePlatformReturnValueSchema.extend({
  protocol: z.string(),
  endpoints: z.object({
    base: UrlSchema,
  }),
});
export type InsightsReturnValue = z.infer<typeof InsightsReturnValueSchema>;

export const CustomDeploymentReturnValueSchema = BasePlatformReturnValueSchema.extend({
  protocol: z.string(),
  endpoints: z.object({
    base: UrlSchema,
  }),
});
export type CustomDeploymentReturnValue = z.infer<typeof CustomDeploymentReturnValueSchema>;
