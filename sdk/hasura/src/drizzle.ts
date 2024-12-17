import { runsOnServer } from "@settlemint/sdk-utils/runtime";
import { validate } from "@settlemint/sdk-utils/validation";
import { drizzle } from "drizzle-orm/node-postgres";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool, type PoolClient } from "pg";
import { z } from "zod";

/**
 * Schema for validating Drizzle client configuration options.
 * Discriminates between server and browser runtime environments.
 */
const DrizzleConfigSchema = z.discriminatedUnion("runtime", [
  z.object({
    runtime: z.literal("server"),
    databaseUrl: z.string().url().min(1),
    database: z.string().min(1),
    password: z.string().min(1),
    user: z.string().min(1),
    maxPoolSize: z.coerce.number().int().positive().default(20),
    idleTimeoutMillis: z.coerce.number().int().positive().default(30000),
    connectionTimeoutMillis: z.coerce.number().int().positive().default(5000),
    maxRetries: z.coerce.number().int().nonnegative().default(3),
    retryDelayMs: z.coerce.number().int().positive().default(5000),
  }),
  z.object({
    runtime: z.literal("browser"),
  }),
]);

type DrizzleConfig = z.infer<typeof DrizzleConfigSchema>;
type ServerConfig = Extract<DrizzleConfig, { runtime: "server" }>;

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
function setupErrorHandling(pool: Pool, config: ServerConfig) {
  let retryCount = 0;

  pool.on("error", async (err: Error) => {
    console.error("[Drizzle] Pool error occurred:", err);

    if (retryCount < config.maxRetries) {
      retryCount++;
      console.log(`[Drizzle] Attempting to recover - retry ${retryCount}/${config.maxRetries}`);

      try {
        const client = await pool.connect();
        client.release();
        console.log("[Drizzle] Successfully recovered connection");
        retryCount = 0;
      } catch (retryError) {
        console.error(`[Drizzle] Recovery attempt ${retryCount} failed:`, retryError);
        await sleep(config.retryDelayMs * 2 ** (retryCount - 1));
      }
    } else {
      console.error("[Drizzle] Max retries exceeded - pool is in an error state");
      pool.emit("permanent-failure", err);
    }
  });

  pool.on("connect", (client: PoolClient) => {
    client.on("error", (err: Error) => {
      console.error("[Drizzle] Database client error:", err);
    });
  });

  pool.on("connect", () => {
    retryCount = 0;
  });
}

/**
 * Creates a Drizzle client for database operations
 *
 * @param options - The configuration options for the Drizzle client
 * @returns The initialized Drizzle client
 * @throws {Error} If called from browser runtime or if validation fails
 */
export function createDrizzleClient(options: Omit<DrizzleConfig, "runtime"> & Record<string, unknown>): NodePgDatabase {
  if (!runsOnServer) {
    throw new Error("Drizzle client can only be created on the server side");
  }

  const validatedOptions = validate(DrizzleConfigSchema, {
    ...options,
    runtime: "server",
  }) as ServerConfig;

  const pool = new Pool({
    connectionString: validatedOptions.databaseUrl,
    database: validatedOptions.database,
    password: validatedOptions.password,
    user: validatedOptions.user,
    max: validatedOptions.maxPoolSize,
    idleTimeoutMillis: validatedOptions.idleTimeoutMillis,
    connectionTimeoutMillis: validatedOptions.connectionTimeoutMillis,
  });

  setupErrorHandling(pool, validatedOptions);

  return drizzle(pool);
}
