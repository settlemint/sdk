import { z } from "zod";
import { UniqueNameSchema } from "./unique-name";
import { UrlSchema } from "./url";
import { WsApplPlatformReturnValueSchema } from "./ws-appl-platform";

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
