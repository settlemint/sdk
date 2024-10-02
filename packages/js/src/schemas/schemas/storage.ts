import { z } from "zod";
import { UrlSchema } from "./url";
import { WsApplPlatformReturnValueSchema } from "./ws-appl-platform";

export const BaseStorageSchema = WsApplPlatformReturnValueSchema.extend({
  serviceSubType: z.string(),
  endpoints: z.object({
    base: UrlSchema,
  }),
});
export type BaseStorage = z.infer<typeof BaseStorageSchema>;
export const IpfsStorageSchema = BaseStorageSchema.extend({
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
export type IpfsStorage = z.infer<typeof IpfsStorageSchema>;
export const MinioStorageSchema = BaseStorageSchema.extend({
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
export type MinioStorage = z.infer<typeof MinioStorageSchema>;

export const StorageReturnValueSchema = z.union([IpfsStorageSchema, MinioStorageSchema, BaseStorageSchema]);
export type StorageReturnValue = z.infer<typeof StorageReturnValueSchema>;
