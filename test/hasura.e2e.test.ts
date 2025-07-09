import { describe, expect, test } from "bun:test";
import { createHasuraClient, createHasuraMetadataClient, trackAllTables } from "@settlemint/sdk-hasura";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { createLogger } from "@settlemint/sdk-utils/logging";
import type { introspection } from "./test-app/hasura-env";

const env = await loadEnv(false, false);
const logger = createLogger();

const hasuraMetadataClient = createHasuraMetadataClient(
  {
    instance: env.SETTLEMINT_HASURA_ENDPOINT!,
    accessToken: env.SETTLEMINT_ACCESS_TOKEN!,
    adminSecret: env.SETTLEMINT_HASURA_ADMIN_SECRET!,
  },
  logger,
);

const hasuraClient = createHasuraClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    timestamp: string;
    timestampz: string;
    uuid: string;
    date: string;
    time: string;
    jsonb: string;
    numeric: string;
    interval: string;
    geometry: string;
    geography: string;
  };
}>(
  {
    instance: env.SETTLEMINT_HASURA_ENDPOINT!,
    accessToken: env.SETTLEMINT_ACCESS_TOKEN!,
    adminSecret: env.SETTLEMINT_HASURA_ADMIN_SECRET!,
  },
  {},
  logger,
);

describe("Hasura E2E Tests", () => {
  test("can track all tables", async () => {
    const { result, messages } = await trackAllTables("default", hasuraMetadataClient);
    expect(result).toBe("success");
    expect(messages).toBeArray();
  });

  test("can query users", async () => {
    const query = hasuraClient.graphql(`
      query GetUsers {
        user {
          name
        }
      }
    `);
    const result = await hasuraClient.client.request(query);
    expect(result.user).toBeArray();
  });
});
