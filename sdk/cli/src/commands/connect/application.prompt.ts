import { nothingSelectedError } from "@/error/nothing-selected-error";
import select from "@inquirer/select";
import type { Application } from "@settlemint/sdk-js";
import { cancel } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import isInCi from "is-in-ci";

export async function applicationPrompt(
  env: Partial<DotEnv>,
  applications: Omit<Application, "workspace">[],
  accept: boolean | undefined,
): Promise<Omit<Application, "workspace">> {
  const autoAccept = !!accept || isInCi;
  const defaultApplication = applications.find((application) => application.uniqueName === env.SETTLEMINT_APPLICATION);
  const defaultPossible = autoAccept && defaultApplication;

  if (defaultPossible) {
    return defaultApplication;
  }

  if (applications.length === 0) {
    cancel("No applications found");
  }

  if (isInCi) {
    nothingSelectedError("application");
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
