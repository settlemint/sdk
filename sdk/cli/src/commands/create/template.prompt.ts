import select from "@inquirer/select";
import type { Template } from "@settlemint/sdk-utils/package-manager";
import { cancel } from "@settlemint/sdk-utils/terminal";

export async function templatePrompt(templates: Template[], argument?: string): Promise<Template> {
  if (templates.length === 0) {
    cancel("No templates found");
  }

  const defaultInstance = argument;

  if (defaultInstance) {
    const template = templates.find((template) => template.value === argument);
    if (!template) {
      cancel(`No template found with name '${argument}'`);
    }
    return template;
  }

  const template = await select({
    message: "Which template do you want to use?",
    choices: [
      ...templates.map((template) => ({
        name: template.label,
        value: template,
      })),
    ],
  });

  return template;
}
