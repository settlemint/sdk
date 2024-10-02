import { z } from "zod";
import { WsApplPlatformReturnValueSchema } from "../ws-appl-platform";
import { UrlSchema } from "./url";

export const BaseMiddlewareSchema = WsApplPlatformReturnValueSchema.extend({
  serviceSubType: z.string(),
  endpoints: z.object({
    base: UrlSchema,
  }),
});
export type BaseMiddleware = z.infer<typeof BaseMiddlewareSchema>;
export const PortalMiddlewareSchema = BaseMiddlewareSchema.extend({
  serviceSubType: z.literal("SMART_CONTRACT_PORTAL"),
  endpoints: z.object({
    base: UrlSchema,
    jsonRpc: UrlSchema,
    jsonWs: UrlSchema,
    graphQl: UrlSchema,
  }),
});
export type PortalMiddleware = z.infer<typeof PortalMiddlewareSchema>;
export const TheGraphMiddlewareSchema = BaseMiddlewareSchema.extend({
  serviceSubType: z.literal("HA_GRAPH"),
  endpoints: z.object({
    base: UrlSchema,
    subgraph: UrlSchema,
    defaultSubgraph: UrlSchema,
  }),
});
export type TheGraphMiddleware = z.infer<typeof TheGraphMiddlewareSchema>;

export const MiddlewareReturnValueSchema = z.union([
  PortalMiddlewareSchema,
  TheGraphMiddlewareSchema,
  BaseMiddlewareSchema,
]);
export type MiddlewareReturnValue = z.infer<typeof MiddlewareReturnValueSchema>;
