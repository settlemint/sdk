import type { z } from "zod";
import { BasePlatformReturnValueSchema } from "./base-platform";
import { UniqueNameSchema } from "./unique-name";

export const ApplicationReturnValueSchema = BasePlatformReturnValueSchema.extend({
  workspace: UniqueNameSchema,
});
export type ApplicationReturnValue = z.infer<typeof ApplicationReturnValueSchema>;
