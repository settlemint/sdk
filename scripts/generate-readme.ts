import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tryParseJson } from "@settlemint/sdk-utils";
import * as mustache from "mustache";

interface Placeholders {
  "package-name"?: string;
  about?: string;
  "api-reference"?: string;
  "toc-contents"?: string;
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
    const sdkDir = join(__dirname, "..", "sdk");
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
      const apiReference = await processApiReference(apiReferenceRaw);

      const templateWithoutToc = replacePlaceholders(template, {
        "package-name": name,
        about,
        "api-reference": apiReference,
      });

      const toc = getTocContents(templateWithoutToc);
      await writeFile(
        readmePath,
        replacePlaceholders(templateWithoutToc.replace("\\{\\{\\{ toc-contents \\}\\}\\}", "{{{ toc-contents }}}"), {
          "toc-contents": `\n${toc}\n`,
        }),
      );
      console.log(`Successfully generated README.md for ${pkg}`);
    }

    // Main README
    const mainReadmePath = join(__dirname, "..", "README.md");
    console.log(`Writing main README to: ${mainReadmePath}`);

    // Generate package table on main README
    const packageTable = ["## Packages\n\n| Name | Description | NPM |", "|---------|-------------|---------|"];
    for (const pkg of packages.sort()) {
      const packageJsonPath = join(sdkDir, pkg, "package.json");
      const packageJson = await readFile(packageJsonPath, "utf-8");
      const { name, description } = tryParseJson<{ name: string; description: string }>(packageJson);
      packageTable.push(
        `| [\`${name}\`](sdk/${pkg}) | ${description} | [![npm version](https://img.shields.io/npm/v/${name})](https://www.npmjs.com/package/${name}) |`,
      );
    }

    await writeFile(
      mainReadmePath,
      replacePlaceholders(template.replace("\\{\\{\\{ toc-contents \\}\\}\\}", ""), {
        about: `The SettleMint SDK provides a comprehensive set of tools and libraries for integrating blockchain functionality into your applications.
It enables seamless interaction with the SettleMint platform's features and services.\n\n${packageTable.join("\n")}\n`,
      }),
    );

    console.log("README generation completed successfully");
  } catch (error) {
    console.error("Error generating README files:", error);
    process.exit(1);
  }
}

function replacePlaceholders(template: string, placeholders: Placeholders): string {
  const mustacheExport = mustache as unknown as { default: { render: typeof mustache.render } };
  return mustacheExport.default.render(template, placeholders);
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
      .replace(/[<>()\\]/g, "");
    const indent = "  ".repeat(level - 2); // Indent based on heading level
    return `${indent}- [${title}](#${anchor})`;
  })
  .join("\n")}`;
}

async function processApiReference(content: string): Promise<string> {
  const version = await getVersion();
  return (
    content
      .replace(/REFERENCE\.md/gi, "README.md")
      .replace(/^#####\s+/gm, "###### ")
      .replace(/^####\s+/gm, "##### ")
      .replace(/^###\s+/gm, "#### ")
      .replace(/^##\s+/gm, "### ")
      // Convert relative links to absolute GitHub links
      .replace(/\[([^\]]+)\]\((\.\/[^)]+)\)/g, (match, linkText, relativePath) => {
        // Remove leading ./ from the path
        const cleanPath = relativePath.replace(/^\.\//, "");
        return `[${linkText}](https://github.com/settlemint/sdk/tree/v${version}/sdk/cli/${cleanPath})`;
      })
  );
}

async function getVersion(): Promise<string> {
  const packageJsonPath = join(__dirname, "..", "package.json");
  const packageJson = await readFile(packageJsonPath, "utf-8");
  const { version } = tryParseJson<{ version: string }>(packageJson);
  return version.replace(/-\w+$/, "");
}

// Execute the script
generateReadme();
