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
  let isRetrying = false;
  const clientErrorHandlers = new WeakSet<pg.PoolClient>();

  const handlePoolError = async (err: Error) => {
    console.error("[Drizzle] Pool error occurred:", err);

    // Prevent concurrent retry attempts
    if (isRetrying) {
      console.log("[Drizzle] Recovery already in progress, skipping");
      return;
    }

    if (retryCount < 3) {
      isRetrying = true;
      retryCount++;
      console.log(`[Drizzle] Attempting to recover - retry ${retryCount}/3`);

      try {
        const client = await pool.connect();
        try {
          // Test the connection
          await client.query("SELECT 1");
          console.log("[Drizzle] Successfully recovered connection");
          retryCount = 0;
        } finally {
          client.release();
        }
      } catch (retryError) {
        console.error(`[Drizzle] Recovery attempt ${retryCount} failed:`, retryError);
        await sleep(5000 * 2 ** (retryCount - 1));
      } finally {
        isRetrying = false;
      }
    } else {
      console.error("[Drizzle] Max retries exceeded - pool is in an error state");
      pool.emit("permanent-failure", err);
    }
  };

  const handleConnect = (client: pg.PoolClient) => {
    // Only add error handler if not already added (prevent memory leaks)
    if (!clientErrorHandlers.has(client)) {
      clientErrorHandlers.add(client);
      client.on("error", (err: Error) => {
        console.error("[Drizzle] Database client error:", err);
      });
    }
    retryCount = 0;
    isRetrying = false;
  };

  pool.on("error", handlePoolError);
  pool.on("connect", handleConnect);
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
