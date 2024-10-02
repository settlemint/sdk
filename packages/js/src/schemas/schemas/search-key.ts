import { z } from "zod";

export const SearchKeySchema = z.string().regex(/^[a-z0-9]{5}$/);
export type SearchKey = z.infer<typeof SearchKeySchema>;
