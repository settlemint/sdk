import select from "@inquirer/select";
import type { Application } from "@settlemint/sdk-js";
import { cancel } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function applicationPrompt(
  env: Partial<DotEnv>,
  applications: Omit<Application, "workspace">[],
  accept: boolean,
): Promise<Omit<Application, "workspace">> {
  const defaultApplication = applications.find((application) => application.uniqueName === env.SETTLEMINT_APPLICATION);
  const defaultPossible = accept && defaultApplication;

  if (defaultPossible) {
    return defaultApplication;
  }

  if (applications.length === 0) {
    cancel("No applications found");
  }

  const application = await select({
    message: "Which application do you want to connect to?",
    choices: applications.map((applications) => ({
      name: applications.name,
      value: applications,
    })),
    default: defaultApplication,
  });

  if (!application) {
    cancel("No application selected");
  }

  return application;
}
