import { select } from "@inquirer/prompts";
import type { Application } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function applicationPrompt(env: Partial<DotEnv>, applications: Application[]) {
  return select({
    message: "Which application do you want to connect to?",
    choices: applications.map((applications) => ({
      name: applications.name,
      value: applications,
    })),
    default: applications.find((applications) => applications.id === env.SETTLEMINT_APPLICATION),
  });
}
