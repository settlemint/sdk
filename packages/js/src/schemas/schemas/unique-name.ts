import { z } from "zod";

export const UniqueNameSchema = z.string().regex(/^[a-z-]+-[a-z0-9]{5}$/);
export type UniqueName = z.infer<typeof UniqueNameSchema>;
