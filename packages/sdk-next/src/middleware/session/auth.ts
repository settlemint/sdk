import { z } from "zod";

// Define the Zod schema for the auth.address session object
export const AuthSessionSchema = z.object({
  address: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/)
    .optional(),
});

// Type inference from the schema
export type AuthSession = z.infer<typeof AuthSessionSchema>;
