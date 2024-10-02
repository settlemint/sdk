import { z } from "zod";
import { UrlSchema } from "./url";
import { WsApplPlatformReturnValueSchema } from "./ws-appl-platform";

export const BaseIntegrationToolSchema = WsApplPlatformReturnValueSchema.extend({
  serviceSubType: z.string(),
  endpoints: z.object({
    base: UrlSchema,
  }),
});
export type BaseIntegrationTool = z.infer<typeof BaseIntegrationToolSchema>;

export const HasuraIntegrationToolSchema = BaseIntegrationToolSchema.extend({
  serviceSubType: z.literal("HASURA"),
  endpoints: z.object({
    base: UrlSchema,
    graphQl: UrlSchema,
  }),
  secrets: z.object({
    adminSecret: z.string(),
  }),
});
export type HasuraIntegrationTool = z.infer<typeof HasuraIntegrationToolSchema>;

export const IntegrationToolReturnValueSchema = z.union([HasuraIntegrationToolSchema, BaseIntegrationToolSchema]);
export type IntegrationToolReturnValue = z.infer<typeof IntegrationToolReturnValueSchema>;
