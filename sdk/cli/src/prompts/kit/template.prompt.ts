import { getKits } from "@/utils/platform-utils";
import select from "@inquirer/select";
import type { PlatformConfig } from "@settlemint/sdk-js";
import { cancel } from "@settlemint/sdk-utils/terminal";

export async function templatePrompt(
  platformConfig: PlatformConfig,
  argument?: string,
): Promise<PlatformConfig["kits"][number]> {
  const kits = getKits(platformConfig);

  if (kits.length === 0) {
    cancel("No templates found");
  }

  const defaultInstance = argument;

  if (defaultInstance) {
    const template = kits.find((kit) => kit.id === argument);
    if (!template) {
      cancel(`No template found with name '${argument}'`);
    }
    return template;
  }

  const template = await select<PlatformConfig["kits"][number]>({
    message: "Which template do you want to use?",
    choices: [
      ...kits
        .map((template) => ({
          name: template.name,
          value: template,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    ],
  });

  return template;
}
