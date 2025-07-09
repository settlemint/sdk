import type { createHasuraMetadataClient } from "../hasura.js";

/**
 * Track all tables in a database
 *
 * @param databaseName - The name of the database to track tables for
 * @param options - The client options to use for the Hasura client
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
 * const result = await trackAllTables("default", client);
 * if (result.result === "success") {
 *   console.log("Tables tracked successfully");
 * } else {
 *   console.error("Failed to track tables");
 * }
 */
export async function trackAllTables(
  databaseName: string,
  client: ReturnType<typeof createHasuraMetadataClient>,
): Promise<{ result: "success" | "no-tables"; messages: string[] }> {
  const messages: string[] = [];

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
        table: table.name,
      })),
      allow_warnings: true,
    },
  });

  // Track all tables
  const trackResult = await client<{ code?: string }>({
    type: "pg_track_tables",
    args: {
      tables: tables.map((table) => ({
        table: table.name,
      })),
      allow_warnings: true,
    },
  });

  if (!trackResult.ok) {
    throw new Error(`Failed to track tables: ${JSON.stringify(trackResult.data)}`);
  }

  messages.push(`Successfully tracked ${tables.length} tables`);

  return { result: "success" as const, messages };
}
