import select from "@inquirer/select";
import type { Middleware } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function portalPrompt(
  env: Partial<DotEnv>,
  middlewares: Middleware[],
  accept: boolean,
): Promise<Middleware | undefined> {
  const possible = middlewares.filter((middleware) => middleware.interface === "SMART_CONTRACT_PORTAL");

  if (possible.length === 0) {
    return undefined;
  }

  const defaultMiddleware =
    possible.find((middleware) => middleware.id === env.SETTLEMINT_PORTAL) ??
    (possible.length === 1 ? possible[0] : undefined);
  const defaultPossible = accept; // is optional

  if (defaultPossible) {
    return defaultMiddleware;
  }

  const middleware = await select({
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

  return middleware;
}
