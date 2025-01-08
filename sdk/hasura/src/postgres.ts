import { runsOnServer } from "@settlemint/sdk-utils/runtime";
import pg from "pg";

/**
 * Type definition extending the pg.Pool interface to include custom permanent-failure event
 */
declare module "pg" {
  interface Pool {
    on(event: "permanent-failure", listener: (err: Error) => void): this;
    emit(event: "permanent-failure", err: Error): boolean;
  }
}

/**
 * Utility function to pause execution for a specified duration
 *
 * @param ms - The number of milliseconds to sleep
 * @returns A promise that resolves after the specified duration
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Configures error handling and recovery mechanisms for a PostgreSQL connection pool
 *
 * @param pool - The PostgreSQL connection pool to configure
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
 * Creates a PostgreSQL connection pool with error handling and retry mechanisms
 *
 * @param databaseUrl - The PostgreSQL connection URL
 * @returns A configured PostgreSQL connection pool
 * @throws Will throw an error if called from browser runtime
 * @example
 * import { createPostgresPool } from '@settlemint/sdk-hasura';
 *
 * const pool = createPostgresPool(process.env.SETTLEMINT_HASURA_DATABASE_URL);
 *
 * // The pool will automatically handle connection errors and retries
 * const client = await pool.connect();
 * try {
 *   const result = await client.query('SELECT NOW()');
 *   console.log(result.rows[0]);
 * } finally {
 *   client.release();
 * }
 */
export function createPostgresPool(databaseUrl: string) {
  if (!runsOnServer) {
    throw new Error("Drizzle client can only be created on the server side");
  }

  const pool = new pg.Pool({
    connectionString: databaseUrl,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

  setupErrorHandling(pool);

  return pool;
}
