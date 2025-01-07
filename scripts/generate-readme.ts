import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

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
      await writeFile(readmePath, template);
      console.log(`Successfully generated README.md for ${pkg}`);
    }

    console.log("README generation completed successfully");
  } catch (error) {
    console.error("Error generating README files:", error);
    process.exit(1);
  }
}

// Execute the script
generateReadme();
