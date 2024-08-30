import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { type Config, ConfigSchema } from "@/common/config/schemas";
import { findParentConfigRoot, findProjectRoot } from "@/common/path";

export function readSettlemintConfig(inParents = false): Config | undefined {
  const projectRoot = inParents ? findParentConfigRoot(process.cwd()) : findProjectRoot(process.cwd());
  const configPath = join(projectRoot, ".settlemintrc.json");

  if (existsSync(configPath)) {
    try {
      const configContent = readFileSync(configPath, "utf-8");
      const parsedConfig = JSON.parse(configContent);
      return ConfigSchema.parse(parsedConfig);
    } catch (error) {
      console.error("Error reading or parsing .settlemintrc.json:", error);
      return undefined;
    }
  }
  return undefined;
}
