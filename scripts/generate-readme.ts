import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tryParseJson } from "@settlemint/sdk-utils";

interface Placeholders {
  "package-name": string;
  about: string;
  "api-reference": string;
}

interface PlaceholdersToc {
  "toc-contents": string;
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
    const sdkDirEntries = await readdir(sdkDir, { withFileTypes: true });
    const packages = sdkDirEntries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
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
      const apiReferenceRaw = (await readFile(join(sdkDir, pkg, "docs", "REFERENCE.md"), "utf-8")).trim();
      const apiReference = processApiReference(apiReferenceRaw);

      const templateWithoutToc = replacePlaceholders(template, {
        "package-name": name,
        about,
        "api-reference": apiReference,
      });

      const toc = getTocContents(templateWithoutToc);
      await writeFile(readmePath, replacePlaceholders(templateWithoutToc, { "toc-contents": toc }));
      console.log(`Successfully generated README.md for ${pkg}`);
    }

    console.log("README generation completed successfully");
  } catch (error) {
    console.error("Error generating README files:", error);
    process.exit(1);
  }
}

function replacePlaceholders(template: string, placeholders: Placeholders | PlaceholdersToc): string {
  return Object.entries(placeholders).reduce((result, [key, value]) => {
    return result.replace(new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, "g"), value);
  }, template);
}

function getTocContents(templateContents: string): string {
  // Extract all H2, H3, and H4 headings from the template
  const headingMatches = templateContents.match(/^(#{2,4})\s+(.+)$/gm);
  if (!headingMatches) {
    return "";
  }

  // Convert matches to TOC entries with links and proper indentation
  return `## Table of Contents

${headingMatches
  .map((match) => {
    const level = match.match(/^(#{2,4})/)?.[0].length || 2;
    const title = match.replace(/^#{2,4}\s+/, "");
    const anchor = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[<>()]/g, "");
    const indent = "  ".repeat(level - 2); // Indent based on heading level
    return `${indent}- [${title}](#${anchor})`;
  })
  .join("\n")}`;
}

function processApiReference(content: string): string {
  return content
    .replace(/REFERENCE\.md/gi, "README.md")
    .replace(/^#####\s+/gm, "###### ")
    .replace(/^####\s+/gm, "##### ")
    .replace(/^###\s+/gm, "#### ")
    .replace(/^##\s+/gm, "### ");
}

// Execute the script
generateReadme();
