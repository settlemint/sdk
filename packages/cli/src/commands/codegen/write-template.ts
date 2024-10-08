import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { projectRoot } from "@settlemint/sdk-utils/filesystem";

export async function writeTemplate(template: string, directory: string, filename: string) {
  const projectDir = await projectRoot();
  const codegenDir = join(projectDir, directory);
  mkdirSync(codegenDir, { recursive: true });
  const filePath = join(codegenDir, filename);
  writeFileSync(filePath, template, "utf8");
}
