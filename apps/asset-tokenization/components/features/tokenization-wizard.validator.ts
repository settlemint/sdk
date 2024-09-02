import { z } from "zod";

export const TokenizationWizardValidator = z.object({
  tokenName: z.string().min(2),
  tokenSymbol: z.string().min(2),
  tokenLogo: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
      message: "Must be an image file",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size should be less than 5MB",
    })
    .optional(),
  tokenHasMaxSupply: z.boolean(),
  tokenMaxSupply: z.coerce.number().min(1),
  walletEntriesCsvFileUpload: z
    .instanceof(File)
    .refine((file) => file.name.endsWith(".csv"), {
      message: "File must be a CSV",
    })
    .refine((file) => file.type === "text/csv", {
      message: "File must be of type text/csv",
    })
    .optional(),
  walletEntries: z.array(
    z.object({
      walletAddress: z.string().min(1, { message: "Wallet address is required" }), // or a more specific validation for wallet addresses
      amount: z.number().positive({ message: "Amount must be a positive number" }),
      ID: z.string().optional(),
      IDDocumentFileUploads: z.array(
        z.instanceof(File).refine((file) => file.type === "application/pdf" || file.type.startsWith("image/"), {
          message: "File must be a PDF or an image",
        }),
      ),
    }),
  ),
  tokenCategory: z.string().min(1, { message: "Category is required" }),
  monetaryValue: z.number().positive({ message: "Monetary value must be a positive number" }),
  currency: z.string().min(1, { message: "Currency is required" }),
  DocumentationFileUploads: z.array(
    z.instanceof(File).refine((file) => file.type === "application/pdf" || file.type.startsWith("image/"), {
      message: "File must be a PDF or an image",
    }),
  ),
  adminWalletAddresses: z.array(
    z.object({
      walletAddress: z.string().min(1, { message: "Admin wallet address is required" }), // or a more specific validation for wallet addresses
    }),
  ),
});

export type TokenizationWizardSchema = z.infer<typeof TokenizationWizardValidator>;

export const tokenizationWizardDefaultValues: TokenizationWizardSchema = {
  tokenName: "",
  tokenSymbol: "",
  tokenLogo: undefined,
  tokenHasMaxSupply: false,
  tokenMaxSupply: 0,
  walletEntriesCsvFileUpload: undefined,
  walletEntries: [],
  tokenCategory: "",
  monetaryValue: 0,
  currency: "",
  DocumentationFileUploads: [],
  adminWalletAddresses: [],
};
