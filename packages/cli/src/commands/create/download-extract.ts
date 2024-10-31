import { mkdirSync } from "node:fs";
import type { Template } from "@settlemint/sdk-utils/package-manager";
import { downloadTemplate } from "giget";

/**
 * Downloads and extracts an npm package template to the specified target directory.
 *
 * @param template - The template to download
 * @param targetDir - The directory to extract the template to
 * @returns A Promise that resolves when the download and extraction are complete
 * @throws Will throw an error if the download or extraction fails
 *
 * @example
 * ```typescript
 * await downloadAndExtractNpmPackage("asset-tokenization", "/path/to/project");
 * ```
 */
export async function downloadAndExtractNpmPackage(template: Template["value"], targetDir: string): Promise<void> {
  // Create target directory if it doesn't exist
  mkdirSync(targetDir, { recursive: true });

  // Fetch the latest version from npm registry
  const response = await fetch(`https://registry.npmjs.org/${template}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  const latestVersion = data["dist-tags"].latest as string;
  const tarball = data.versions[latestVersion].dist.tarball as string;

  // Download and extract the package using giget
  await downloadTemplate(tarball, {
    dir: targetDir,
    force: true,
  });
}
