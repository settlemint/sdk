import { z } from "zod";

export const AccessTokenSchema = z.string().regex(/^btp_pat_.*|btp_aat_.*$/);

export const UniqueNameSchema = z.string().regex(/^[a-z-]+-[a-z0-9]{5}$/);
export type UniqueName = z.infer<typeof UniqueNameSchema>;

export const SearchKeySchema = z.string().regex(/^[a-z0-9]{5}$/);

export const UrlSchema = z.string().url();

export const ServiceTypeSchema = z.enum([
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
