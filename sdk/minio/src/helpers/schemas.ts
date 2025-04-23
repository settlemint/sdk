import { Type as t } from "@sinclair/typebox";

/**
 * Schema for file metadata
 */
export const FileMetadataSchema = t.Object(
  {
    id: t.String(),
    name: t.String(),
    contentType: t.String(),
    size: t.Number(),
    uploadedAt: t.String({ format: "date-time" }),
    etag: t.String(),
    url: t.Optional(t.String({ format: "uri" })),
  },
  { $id: "FileMetadata" },
);

/**
 * Default bucket to use for file storage
 */
export const DEFAULT_BUCKET = "uploads";
