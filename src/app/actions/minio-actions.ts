"use server"; // Mark this file as containing Server Actions

import { Buffer } from "node:buffer"; // Use node: prefix for built-in
import * as fs from "node:fs/promises"; // For file system operations
import * as os from "node:os"; // For temporary directory
import * as path from "node:path"; // For joining paths
import { client as minioClient } from "@/lib/settlemint/minio";
import { type StaticDecode, t } from "@/lib/utils/typebox";

// Remove the next-safe-action import
// import { action } from "@/lib/safe-action";

// --- Assume these are defined correctly in the full file scope ---
declare const DEFAULT_BUCKET_NAME: string;
declare const MINIO_PUBLIC_URL: string | undefined;
declare const MAX_FILE_SIZE_MB: number;
// ---

const uploadArgsSchema = t.Object({
  file: t.Any({ description: "File object" }),
  maxSizeMB: t.Optional(t.Number({ minimum: 0 })),
  uploadPathPrefix: t.Optional(t.String()),
});
type UploadArgs = StaticDecode<typeof uploadArgsSchema>;

export async function uploadFileToMinio({
  file,
  maxSizeMB,
  uploadPathPrefix,
}: UploadArgs): Promise<{ success: true; fileUrl: string; objectName: string } | { success: false; error: string }> {
  if (!(file instanceof File)) {
    return { success: false, error: "Invalid file input." };
  }
  const bucketName = DEFAULT_BUCKET_NAME;

  if (!MINIO_PUBLIC_URL)
    return {
      success: false,
      error: "Minio public URL could not be determined.",
    };

  const effectiveMaxSizeMB = maxSizeMB ?? MAX_FILE_SIZE_MB;
  // Use Number.isNaN for type safety
  if (Number.isNaN(effectiveMaxSizeMB) || effectiveMaxSizeMB <= 0)
    return { success: false, error: "Invalid max file size." };
  if (file.size === 0) return { success: false, error: "File is empty." };
  if (file.size > effectiveMaxSizeMB * 1024 * 1024)
    return {
      success: false,
      error: `File size exceeds the limit of ${effectiveMaxSizeMB}MB.`,
    };

  const filename = encodeURIComponent(file.name.replace(/\s+/g, "_"));
  const pathPrefix = uploadPathPrefix ? `${uploadPathPrefix.replace(/\/$/, "")}/` : "";
  const objectName = `${pathPrefix}${Date.now()}-${filename}`;

  let tempFilePath: string | undefined; // Define outside try for finally block

  console.log(
    `Attempting upload via fPutObject: Bucket='${bucketName}', Object='${objectName}', Type='${
      file.type || "N/A"
    }', Size=${file.size}`,
  );

  try {
    const buffer = Buffer.from(await file.arrayBuffer());

    // Create a temporary file path
    // Use a unique name in the OS temp directory
    tempFilePath = path.join(os.tmpdir(), `upload-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`);

    console.log(`Writing buffer to temporary file: ${tempFilePath}`);
    await fs.writeFile(tempFilePath, buffer);

    // Define metadata
    const metadata = {
      "Content-Type": file.type || "application/octet-stream", // Fallback
    };
    console.log("Using metadata:", metadata);

    // ** Use fPutObject **
    console.log("Attempting fPutObject from temp file...");
    const result = await minioClient.fPutObject(
      bucketName,
      objectName,
      tempFilePath, // Pass the file path
      metadata, // Pass metadata
    );

    console.log("Settlemint Minio SDK upload successful (fPutObject):", {
      objectName,
      result,
    });

    const publicUrlBase = MINIO_PUBLIC_URL.endsWith("/") ? MINIO_PUBLIC_URL : `${MINIO_PUBLIC_URL}/`;
    const fileUrl = `${publicUrlBase}${bucketName}/${objectName}`;

    return { success: true, fileUrl, objectName };
  } catch (error) {
    console.error(`Raw error during fPutObject upload for ${objectName}:`, JSON.stringify(error, null, 2));
    console.error("Settlemint Minio SDK upload action failed (fPutObject):", error);
    const message = error instanceof Error ? error.message : "Unknown upload error.";
    return { success: false, error: `Upload failed: ${message}` };
  } finally {
    // Clean up the temporary file if it was created
    if (tempFilePath) {
      try {
        console.log(`Cleaning up temporary file: ${tempFilePath}`);
        await fs.unlink(tempFilePath);
      } catch (cleanupError) {
        console.error(`Failed to clean up temporary file ${tempFilePath}:`, cleanupError);
      }
    }
  }
}

// ... existing code for deleteArgsSchema and deleteFileFromMinio ...
// Note: Added declarations for missing constants at the top for context
//       and fixed Number.isNaN usage. Addressed node:buffer import.
