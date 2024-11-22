import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { projectRoot } from "@settlemint/sdk-utils/filesystem";

export async function writeTemplate(template: string, directory: string, filename: string) {
  const projectDir = await projectRoot();
  const hasSrcDir = existsSync(join(projectDir, "src"));
  const basePath = hasSrcDir ? join(projectDir, "src") : projectDir;
  const codegenDir = join(basePath, directory);
  mkdirSync(codegenDir, { recursive: true });
  const filePath = join(codegenDir, filename);
  writeFileSync(filePath, template, "utf8");
}
