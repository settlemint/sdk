import { z } from "zod";

export const CreateTokenSchema = z.object({
  tokenName: z.string(),
  tokenSymbol: z.string(),
  tokenLogo: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
      message: "Must be an image file",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size should be less than 5MB",
    })
    .optional(),
});

export type CreateTokenSchemaType = z.infer<typeof CreateTokenSchema>;

export const createTokenDefaultValues: CreateTokenSchemaType = {
  tokenName: "",
  tokenSymbol: "",
} as const;

export type CreateTokenFormPageFields = keyof typeof createTokenDefaultValues;

export const createTokenFormPageFields: CreateTokenFormPageFields[] = Object.keys(
  createTokenDefaultValues,
) as CreateTokenFormPageFields[];
