import select from "@inquirer/select";
import type { Template } from "@settlemint/sdk-utils/package-manager";

export async function templatePrompt(templates: Template[]): Promise<Template> {
  if (templates.length === 0) {
    throw new Error("No templates found");
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
