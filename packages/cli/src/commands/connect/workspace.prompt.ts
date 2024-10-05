import { select } from "@inquirer/prompts";
import type { Workspace } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function workspacePrompt(env: Partial<DotEnv>, workspaces: Workspace[]) {
  return select({
    message: "Which workspace do you want to connect to?",
    choices: workspaces.map((workspace) => ({
      name: workspace.name,
      value: workspace,
    })),
    default: workspaces.find((workspace) => workspace.id === env.SETTLEMINT_WORKSPACE),
  });
}
