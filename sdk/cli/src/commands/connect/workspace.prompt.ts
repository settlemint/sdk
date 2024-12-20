import select from "@inquirer/select";
import type { Workspace } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function workspacePrompt(
  env: Partial<DotEnv>,
  workspaces: Workspace[],
  accept: boolean,
): Promise<Workspace> {
  const defaultWorkspace = workspaces.find((workspace) => workspace.uniqueName === env.SETTLEMINT_WORKSPACE);
  const defaultPossible = accept && defaultWorkspace;

  if (defaultPossible) {
    return defaultWorkspace;
  }

  if (workspaces.length === 0) {
    throw new Error("No workspaces found");
  }

  const workspace = await select({
    message: "Which workspace do you want to connect to?",
    choices: workspaces.map((workspace) => ({
      name: workspace.name,
      value: workspace,
    })),
    default: defaultWorkspace,
  });

  if (!workspace) {
    throw new Error("No workspace selected");
  }

  return workspace;
}
