import { z } from "zod";
import { WsApplPlatformReturnValueSchema } from "../ws-appl-platform";
import { UniqueNameSchema } from "./unique-name";
import { UrlSchema } from "./url";

export const BlockchainNodeReturnValueSchema = WsApplPlatformReturnValueSchema.extend({
  serviceSubType: z.string(),
  network: UniqueNameSchema,
  endpoints: z.object({
    base: UrlSchema,
    jsonRpc: UrlSchema,
    jsonWs: UrlSchema,
    graphQl: UrlSchema,
  }),
});
export type BlockchainNodeReturnValue = z.infer<typeof BlockchainNodeReturnValueSchema>;
