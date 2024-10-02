import { z } from "zod";
import { UniqueNameSchema } from "./unique-name";

export const BasePlatformReturnValueSchema = z.object({
  uniqueName: UniqueNameSchema,
  displayName: z.string(),
});
export type BasePlatformReturnValue = z.infer<typeof BasePlatformReturnValueSchema>;
