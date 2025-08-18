import type { createHasuraMetadataClient } from "../hasura.js";

/**
 * Track all tables in a database
 *
 * @param databaseName - The name of the database to track tables for
 * @param client - The client options to use for the Hasura client
 * @param tableOptions - The options to use for the table tracking
 * @param tableOptions.includeSchemas - The schemas to include in the tracking
 * @param tableOptions.excludeSchemas - The schemas to exclude from the tracking
 * @returns A promise that resolves to an object with a result property indicating success or failure
 * @example
 * import { trackAllTables } from "@settlemint/sdk-hasura/utils/track-all-tables";
 *
 * const client = createHasuraMetadataClient({
 *   instance: "http://localhost:8080",
 *   accessToken: "test",
 *   adminSecret: "test",
 * });
 *
 * const result = await trackAllTables("default", client, {
 *   excludeSchemas: ["drizzle"],
 * });
 * if (result.result === "success") {
 *   console.log("Tables tracked successfully");
 * } else {
 *   console.error("Failed to track tables");
 * }
 */
export async function trackAllTables(
  databaseName: string,
  client: ReturnType<typeof createHasuraMetadataClient>,
  tableOptions: {
    includeSchemas?: string[];
    excludeSchemas?: string[];
  } = {
    includeSchemas: undefined,
    excludeSchemas: undefined,
  },
): Promise<{ result: "success" | "no-tables"; messages: string[] }> {
  const messages: string[] = [];

  const { includeSchemas, excludeSchemas } = tableOptions;

  // Get all tables using pg_get_source_tables
  const getTablesResult = await client<
    Array<{
      name: string;
      schema: string;
    }>
  >({
    type: "pg_get_source_tables",
    args: {
      source: databaseName,
    },
  });

  if (!getTablesResult.ok) {
    throw new Error(`Failed to get tables: ${JSON.stringify(getTablesResult.data)}`);
  }

  const tables = getTablesResult.data;

  if (tables.length === 0) {
    return { result: "no-tables" as const, messages };
  }

  messages.push(`Found ${tables.length} tables in database "${databaseName}"`);

  // Incase a table is already tracked, untrack it first
  await client<{ code?: string }>({
    type: "pg_untrack_tables",
    args: {
      tables: tables.map((table) => ({
        table: table,
      })),
      allow_warnings: true,
    },
  });

  const tablesToTrack = tables.filter((table) => {
    if (Array.isArray(includeSchemas)) {
      return includeSchemas.includes(table.schema);
    }
    if (Array.isArray(excludeSchemas)) {
      return !excludeSchemas.includes(table.schema);
    }
    return true;
  });

  // Track all tables
  const trackResult = await client<{ code?: string }>({
    type: "pg_track_tables",
    args: {
      tables: tablesToTrack.map((table) => ({
        table: table,
      })),
      allow_warnings: true,
    },
  });

  if (!trackResult.ok) {
    throw new Error(`Failed to track tables: ${JSON.stringify(trackResult.data)}`);
  }

  messages.push(`Successfully tracked ${tablesToTrack.length} tables`);

  return { result: "success" as const, messages };
}
