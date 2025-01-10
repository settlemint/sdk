import { servicePrompt } from "@/commands/connect/service.prompt";
import select from "@inquirer/select";
import type { Middleware } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function portalPrompt(
  env: Partial<DotEnv>,
  middlewares: Middleware[],
  accept: boolean | undefined,
): Promise<Middleware | undefined> {
  const possible = middlewares.filter((middleware) => middleware.interface === "SMART_CONTRACT_PORTAL");
  return servicePrompt<Middleware>(
    env,
    possible,
    accept,
    "SETTLEMINT_PORTAL",
    async ({ defaultService: defaultMiddleware }) => {
      return select({
        message: "Which Smart Contract Portal instance do you want to connect to?",
        choices: [
          ...possible.map((middleware) => ({
            name: middleware.name,
            value: middleware,
          })),
          {
            name: "None",
            value: undefined,
          },
        ],
        default: defaultMiddleware,
      });
    },
  );
}
