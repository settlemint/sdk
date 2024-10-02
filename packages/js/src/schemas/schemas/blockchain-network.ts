import { z } from "zod";
import { WsApplPlatformReturnValueSchema } from "./ws-appl-platform";

export const BlockchainNetworkReturnValueSchema = WsApplPlatformReturnValueSchema.extend({
  serviceSubType: z.string(),
  chainId: z.string(),
});
export type BlockchainNetworkReturnValue = z.infer<typeof BlockchainNetworkReturnValueSchema>;
