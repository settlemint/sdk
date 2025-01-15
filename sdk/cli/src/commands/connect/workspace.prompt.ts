import { nothingSelectedError } from "@/error/nothing-selected-error";
import select from "@inquirer/select";
import type { Workspace } from "@settlemint/sdk-js";
import { cancel } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import isInCi from "is-in-ci";

export async function workspacePrompt(
  env: Partial<DotEnv>,
  workspaces: Workspace[],
  accept: boolean | undefined,
): Promise<Workspace> {
  const autoAccept = !!accept || isInCi;
  const defaultWorkspace = workspaces.find((workspace) => workspace.uniqueName === env.SETTLEMINT_WORKSPACE);
  const defaultPossible = autoAccept && defaultWorkspace;

  if (defaultPossible) {
    return defaultWorkspace;
  }

  if (workspaces.length === 0) {
    cancel("No workspaces found");
  }

  if (isInCi) {
    nothingSelectedError("workspace");
  }

  const workspace = await select({
    message: "Which workspace do you want to connect to?",
    choices: workspaces.map((workspace) => ({
      name: `${workspace.name} (${workspace.uniqueName})`,
      value: workspace,
    })),
    default: defaultWorkspace,
  });

  if (!workspace) {
    cancel("No workspace selected");
  }

  return workspace;
}
