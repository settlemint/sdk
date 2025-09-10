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
  let hasTables = false;

  test("can track all tables", async () => {
    const { result, messages } = await trackAllTables("default", hasuraMetadataClient);
    expect(result).toBeOneOf(["success", "no-tables"]);
    hasTables = result === "success";
    expect(messages).toBeArray();
  });

  test("can query users", async () => {
    if (!hasTables) {
      // We can only execute this test if there are tables tracked
      // Depends on the test order, test/create-new-standalone-project.e2e.test.ts and test/create-new-settlemint-project.e2e.test.ts will create the tables
      return;
    }
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
