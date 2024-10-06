import select from "@inquirer/select";
import type { Middleware } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function theGraphPrompt(
  env: Partial<DotEnv>,
  middlewares: Middleware[],
  accept: boolean,
): Promise<Middleware> {
  const defaultMiddleware = middlewares.find((middleware) => middleware.id === env.SETTLEMINT_THEGRAPH);
  const defaultPossible = accept && defaultMiddleware;

  const application = await select(
    {
      message: "Which The Graph instance do you want to connect to?",
      choices: middlewares
        .filter((middleware) => ["HA_GRAPH", "GRAPH"].includes(middleware.interface))
        .map((middleware) => ({
          name: middleware.name,
          value: middleware,
        })),
      default: defaultMiddleware,
    },
    { signal: defaultPossible ? AbortSignal.timeout(0) : undefined },
  ).catch((error) => {
    if (error.name === "AbortPromptError") {
      return defaultMiddleware;
    }
    throw error;
  });

  if (!application) {
    throw new Error("No TheGraph instance selected");
  }

  return application;
}
