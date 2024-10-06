import select from "@inquirer/select";
import type { Application } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function applicationPrompt(
  env: Partial<DotEnv>,
  applications: Application[],
  accept: boolean,
): Promise<Application> {
  const defaultApplication = applications.find((application) => application.id === env.SETTLEMINT_APPLICATION);
  const defaultPossible = accept && defaultApplication;

  const application = await select(
    {
      message: "Which application do you want to connect to?",
      choices: applications.map((applications) => ({
        name: applications.name,
        value: applications,
      })),
      default: defaultApplication,
    },
    { signal: defaultPossible ? AbortSignal.timeout(0) : undefined },
  ).catch((error) => {
    if (error.name === "AbortPromptError") {
      return defaultApplication;
    }
    throw error;
  });

  if (!application) {
    throw new Error("No application selected");
  }

  return application;
}
