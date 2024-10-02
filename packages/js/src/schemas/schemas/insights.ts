import { z } from "zod";
import { UrlSchema } from "./url";
import { WsApplPlatformReturnValueSchema } from "./ws-appl-platform";

export const InsightsReturnValueSchema = WsApplPlatformReturnValueSchema.extend({
  serviceSubType: z.string(),
  protocol: z.string(),
  endpoints: z.object({
    base: UrlSchema,
  }),
});
export type InsightsReturnValue = z.infer<typeof InsightsReturnValueSchema>;
