import { exists, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { projectRoot } from "@settlemint/sdk-utils/filesystem";

export async function writeTemplate(template: string, directory: string, filename: string) {
  const projectDir = await projectRoot();
  const hasSrcDir = await exists(join(projectDir, "src"));
  const basePath = hasSrcDir ? join(projectDir, "src") : projectDir;
  const codegenDir = join(basePath, directory);
  await mkdir(codegenDir, { recursive: true });
  const filePath = join(codegenDir, filename);
  await writeFile(filePath, template, "utf8");
}
