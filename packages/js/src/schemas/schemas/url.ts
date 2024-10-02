import { z } from "zod";

export const UrlSchema = z.string().url();
export type UrlType = z.infer<typeof UrlSchema>;
