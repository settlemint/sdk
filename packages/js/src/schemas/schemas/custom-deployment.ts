import { z } from "zod";
import { UrlSchema } from "./url";
import { WsApplPlatformReturnValueSchema } from "./ws-appl-platform";

export const CustomDeploymentReturnValueSchema = WsApplPlatformReturnValueSchema.extend({
  serviceSubType: z.string(),
  protocol: z.string(),
  endpoints: z.object({
    base: UrlSchema,
  }),
});
export type CustomDeploymentReturnValue = z.infer<typeof CustomDeploymentReturnValueSchema>;
