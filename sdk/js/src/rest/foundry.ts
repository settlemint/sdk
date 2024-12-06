import type { Id } from "@settlemint/sdk-utils";
import { IdSchema, validate } from "@settlemint/sdk-utils/validation";
import type { ClientOptions } from "../helpers/client-options.schema.js";

export function getEnv(options: ClientOptions) {
  return async (blockchainNodeId: Id, graphMiddlewareId?: Id) => {
    validate(IdSchema, blockchainNodeId);
    const url = new URL(`/cm/ide/foundry/${encodeURIComponent(blockchainNodeId)}/env-sdk`, options.instance);
    if (graphMiddlewareId) {
      validate(IdSchema, graphMiddlewareId);
      url.searchParams.set("graphMiddlewareId", encodeURIComponent(graphMiddlewareId));
    }
    const response = await fetch(url, {
      headers: {
        "x-auth-token": options.accessToken,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch environment variables: ${response.statusText}`);
    }
    const raw = await response.text();
    const envVars = raw.split("\n").map((line) => line.trim());
    return envVars.reduce(
      (acc, envVar) => {
        const [key, value] = envVar.split("=");
        if (key && value) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, string>,
    );
  };
}
