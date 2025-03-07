import { getKits } from "@/utils/platform-utils";
import select from "@inquirer/select";
import type { PlatformConfig } from "@settlemint/sdk-js";
import { cancel } from "@settlemint/sdk-utils/terminal";

type Choice = {
  name: string;
  value: PlatformConfig["kits"][number];
};

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

  const selectedValue = (await select({
    message: "Which template do you want to use?",
    choices: [
      ...kits
        .map(
          (template): Choice => ({
            name: template.name,
            value: template,
          }),
        )
        .sort((a: Choice, b: Choice) => a.name.localeCompare(b.name)),
    ],
  })) as PlatformConfig["kits"][number];

  return selectedValue;
}
