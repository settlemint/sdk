import { exists, readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tryParseJson } from "@settlemint/sdk-utils";

interface Placeholders {
  "package-name": string;
  about: string;
  "api-reference": string;
  usage: string;
}

/**
 * Generates README.md files for each SDK package
 */
async function generateReadme() {
  try {
    console.log("Starting README generation...");

    // Read the template README
    const templatePath = join(__dirname, "templates", "README-template.md");
    console.log(`Reading template from: ${templatePath}`);
    const template = await readFile(templatePath, "utf-8");

    // Get all SDK package directories
    const sdkDir = join(process.cwd(), "sdk");
    console.log(`Scanning SDK directory: ${sdkDir}`);
    const packages = await readdir(sdkDir);
    console.log(`Found ${packages.length} packages`);

    // Generate README for each package
    for (const pkg of packages) {
      console.log(`Processing package: ${pkg}`);
      const readmePath = join(sdkDir, pkg, "README.md");

      // Write README file
      console.log(`Writing README for ${pkg}...`);
      const packageJson = await readFile(join(sdkDir, pkg, "package.json"), "utf-8");
      const { name } = tryParseJson<{ name: string }>(packageJson);
      const about = (await readFile(join(sdkDir, pkg, "docs", "ABOUT.md"), "utf-8")).trim();
      const apiReference = (await readFile(join(sdkDir, pkg, "docs", "REFERENCE.md"), "utf-8")).trim();
      const usagePath = join(sdkDir, pkg, "docs", "USAGE.md");
      const usage = (await exists(usagePath)) ? (await readFile(usagePath, "utf-8")).trim() : "TODO: define default";
      await writeFile(
        readmePath,
        replacePlaceholders(template, {
          "package-name": name,
          about,
          "api-reference": apiReference,
          usage,
        }),
      );
      console.log(`Successfully generated README.md for ${pkg}`);
    }

    console.log("README generation completed successfully");
  } catch (error) {
    console.error("Error generating README files:", error);
    process.exit(1);
  }
}

/**
 * Replaces placeholders in a template string with provided values
 * @param template - The template string containing placeholders
 * @param placeholders - Object containing placeholder values
 * @returns The template with placeholders replaced
 */
function replacePlaceholders(template: string, placeholders: Placeholders): string {
  return Object.entries(placeholders).reduce((result, [key, value]) => {
    return result.replace(new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, "g"), value);
  }, template);
}

// Execute the script
generateReadme();
