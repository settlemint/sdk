import { getStarterkits } from "@/utils/platform-utils";
import select from "@inquirer/select";
import type { PlatformConfig } from "@settlemint/sdk-js";
import { cancel } from "@settlemint/sdk-utils/terminal";

export async function templatePrompt(platformConfig: PlatformConfig, argument?: string): Promise<string> {
  const starterkits = getStarterkits(platformConfig);

  if (starterkits.length === 0) {
    cancel("No templates found");
  }

  const defaultInstance = argument;

  if (defaultInstance) {
    const template = starterkits.find((starterKit) => starterKit.id === argument);
    if (!template) {
      cancel(`No template found with name '${argument}'`);
    }
    return template.id;
  }

  const template = await select({
    message: "Which template do you want to use?",
    choices: [
      ...starterkits
        .map((template) => ({
          name: template.name,
          value: template.id,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    ],
  });

  return template;
}
