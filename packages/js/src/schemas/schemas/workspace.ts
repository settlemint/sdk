import type { z } from "zod";
import { BasePlatformReturnValueSchema } from "./base-platform";

export const WorkspaceReturnValueSchema = BasePlatformReturnValueSchema.extend({});
export type WorkspaceReturnValue = z.infer<typeof WorkspaceReturnValueSchema>;
