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
export interface FileMetadata {
  /**
   * The unique identifier for the file.
   */
  id: string;
  /**
   * The name of the file.
   */
  name: string;
  /**
   * The content type of the file.
   */
  contentType: string;

  /**
   * The size of the file in bytes.
   */
  size: number;

  /**
   * The date and time the file was uploaded.
   */
  uploadedAt: string;

  /**
   * The ETag of the file.
   */
  etag: string;

  /**
   * The URL of the file.
   */
  url?: string;
}

/**
 * Default bucket name to use for file storage when none is specified.
 */
export const DEFAULT_BUCKET = "uploads";
