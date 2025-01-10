import { servicePrompt } from "@/commands/connect/service.prompt";
import select from "@inquirer/select";
import type { Middleware } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function theGraphPrompt(env: Partial<DotEnv>, middlewares: Middleware[], accept: boolean | undefined) {
  const possible = middlewares.filter((middleware) => middleware.__typename === "HAGraphMiddleware");
  return servicePrompt(env, possible, accept, "SETTLEMINT_THEGRAPH", async ({ defaultService: defaultMiddleware }) => {
    return select({
      message: "Which The Graph instance do you want to connect to?",
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
  });
}
