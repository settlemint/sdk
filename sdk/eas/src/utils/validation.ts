import { ApplicationAccessTokenSchema, UrlOrPathSchema, UrlSchema } from "@settlemint/sdk-utils/validation";
import { type Address, isAddress } from "viem";
import { z } from "zod";

const ethAddressSchema = z.custom<Address>(
  (val) => typeof val === "string" && isAddress(val),
  "Invalid Ethereum address",
);

/**
 * Zod schema for EASClientOptions.
 */
export const EASClientOptionsSchema = z.object({
  /**
   * The EAS instance URL
   */
  instance: UrlSchema,
  /**
   * The application access token
   */
  accessToken: ApplicationAccessTokenSchema.optional(),
  /**
   * The EAS contract address
   */
  easContractAddress: ethAddressSchema.optional(),
  /**
   * The schema registry contract address
   */
  schemaRegistryContractAddress: ethAddressSchema.optional(),
  /**
   * Whether to enable debug mode
   */
  debug: z.boolean().optional(),
  /**
   * Optional The Graph configuration for enabling bulk listing queries
   */
  theGraph: z
    .object({
      /** TheGraph subgraph endpoints (must include an entry that ends with `/<subgraphName>`). */
      instances: z.array(UrlOrPathSchema),
      /** Subgraph name used to select the correct instance from `instances`. */
      subgraphName: z.string(),
      /** Optional access token for authenticated Graph endpoints. */
      accessToken: ApplicationAccessTokenSchema.optional(),
      /** Optional cache policy passed to GraphQL client. */
      cache: z.enum(["default", "force-cache", "no-cache", "no-store", "only-if-cached", "reload"]).optional(),
    })
    .optional(),
});
