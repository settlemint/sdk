import type { z } from "zod";
import { BasePlatformReturnValueSchema } from "./base-platform";
import { UniqueNameSchema } from "./unique-name";

export const WsApplPlatformReturnValueSchema = BasePlatformReturnValueSchema.extend({
  workspace: UniqueNameSchema,
  application: UniqueNameSchema,
});
export type WsApplPlatformReturnValue = z.infer<typeof WsApplPlatformReturnValueSchema>;
