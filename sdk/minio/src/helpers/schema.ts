import { z } from "zod";

/**
 * Helper type to extract the inferred type from a Zod schema.
 *
 * @template T - The Zod schema type
 */
export type Static<T extends z.ZodType> = z.infer<T>;

// ----- Schema Definitions -----

/**
 * Schema for file metadata stored in MinIO.
 * Defines the structure and validation rules for file information.
 */
export const FileMetadataSchema = z.object({
  id: z.string(),
  name: z.string(),
  contentType: z.string(),
  size: z.number(),
  uploadedAt: z.string().datetime(),
  etag: z.string(),
  url: z.string().url().optional(),
});

/**
 * Type representing file metadata after validation.
 */
export type FileMetadata = Static<typeof FileMetadataSchema>;

/**
 * Default bucket name to use for file storage when none is specified.
 */
export const DEFAULT_BUCKET = "uploads";
