import { runsOnServer } from "@settlemint/sdk-utils/runtime";
import { drizzle } from "drizzle-orm/node-postgres";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import pg from "pg";

/**
 * Type for the extended Pool events including our custom permanent-failure event
 */
declare module "pg" {
  interface Pool {
    on(event: "permanent-failure", listener: (err: Error) => void): this;
    emit(event: "permanent-failure", err: Error): boolean;
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Handles database connection errors and retry logic
 */
function setupErrorHandling(pool: pg.Pool) {
  let retryCount = 0;

  pool.on("error", async (err: Error) => {
    console.error("[Drizzle] Pool error occurred:", err);

    if (retryCount < 3) {
      retryCount++;
      console.log(`[Drizzle] Attempting to recover - retry ${retryCount}/3`);

      try {
        const client = await pool.connect();
        client.release();
        console.log("[Drizzle] Successfully recovered connection");
        retryCount = 0;
      } catch (retryError) {
        console.error(`[Drizzle] Recovery attempt ${retryCount} failed:`, retryError);
        await sleep(5000 * 2 ** (retryCount - 1));
      }
    } else {
      console.error("[Drizzle] Max retries exceeded - pool is in an error state");
      pool.emit("permanent-failure", err);
    }
  });

  pool.on("connect", (client: pg.PoolClient) => {
    client.on("error", (err: Error) => {
      console.error("[Drizzle] Database client error:", err);
    });
  });

  pool.on("connect", () => {
    retryCount = 0;
  });
}

/**
 * Creates a Drizzle client for database operations with schema typings
 *
 * @param databaseUrl - The PostgreSQL connection URL
 * @param schemas - Object containing the schema definitions
 * @returns The initialized Drizzle client with proper schema typings
 * @throws {Error} If called from browser runtime or if validation fails
 */
export function createDrizzleClient<TSchema extends Record<string, unknown>>(params: {
  databaseUrl: string;
  schemas?: TSchema;
}): NodePgDatabase<TSchema> {
  if (!runsOnServer) {
    throw new Error("Drizzle client can only be created on the server side");
  }

  const pool = new pg.Pool({
    connectionString: params.databaseUrl,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

  setupErrorHandling(pool);

  return drizzle(pool, { schema: params.schemas });
}
