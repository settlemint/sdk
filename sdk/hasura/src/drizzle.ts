import { runsOnServer } from "@settlemint/sdk-utils/runtime";
import { validate } from "@settlemint/sdk-utils/validation";
import { drizzle } from "drizzle-orm/node-postgres";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool, type PoolConfig } from "pg";
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
  }),
  z.object({
    runtime: z.literal("browser"),
  }),
]);

/**
 * Type definition for client options derived from the DrizzleConfigSchema.
 */
export type DrizzleConfig = z.infer<typeof DrizzleConfigSchema>;

/**
 * Creates a Drizzle client for database operations
 *
 * @param options - The configuration options for the Drizzle client
 * @returns The initialized Drizzle client
 * @throws {Error} If called from browser runtime or if validation fails
 */
export function createDrizzleClient(options: Omit<DrizzleConfig, "runtime"> & Record<string, unknown>): NodePgDatabase {
  const validatedOptions = validate(DrizzleConfigSchema, {
    ...options,
    runtime: runsOnServer ? "server" : "browser",
  });

  if (validatedOptions.runtime === "browser") {
    throw new Error("Drizzle client can only be created on the server side");
  }

  const poolConfig: PoolConfig = {
    connectionString: validatedOptions.databaseUrl,
    database: validatedOptions.database,
    password: validatedOptions.password,
    user: validatedOptions.user,
    max: validatedOptions.maxPoolSize,
    idleTimeoutMillis: validatedOptions.idleTimeoutMillis,
    connectionTimeoutMillis: validatedOptions.connectionTimeoutMillis,
  };

  const pool = new Pool(poolConfig);

  // Handle pool errors
  pool.on("error", (err) => {
    console.error("[Drizzle] Unexpected error on idle client:", err);
    process.exit(-1);
  });

  // Handle connection errors
  pool.on("connect", (client) => {
    client.on("error", (err) => {
      console.error("[Drizzle] Database client error:", err);
    });
  });

  return drizzle(pool);
}
