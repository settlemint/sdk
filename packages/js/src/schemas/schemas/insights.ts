import { z } from "zod";
import { WsApplPlatformReturnValueSchema } from "../ws-appl-platform";
import { UrlSchema } from "./url";

export const InsightsReturnValueSchema = WsApplPlatformReturnValueSchema.extend({
  serviceSubType: z.string(),
  protocol: z.string(),
  endpoints: z.object({
    base: UrlSchema,
  }),
});
export type InsightsReturnValue = z.infer<typeof InsightsReturnValueSchema>;
