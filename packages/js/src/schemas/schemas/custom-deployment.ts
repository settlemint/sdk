import { z } from "zod";
import { WsApplPlatformReturnValueSchema } from "../ws-appl-platform";
import { UrlSchema } from "./url";

export const CustomDeploymentReturnValueSchema = WsApplPlatformReturnValueSchema.extend({
  serviceSubType: z.string(),
  protocol: z.string(),
  endpoints: z.object({
    base: UrlSchema,
  }),
});
export type CustomDeploymentReturnValue = z.infer<typeof CustomDeploymentReturnValueSchema>;
