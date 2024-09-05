import { z } from "zod";

/**
 * Schema for application configuration.
 */
const ApplicationConfigSchema = z.object({
  application: z.object({
    id: z.string(),
    displayName: z.string(),
  }),
  portalGql: z.string().url().optional(),
  portalRest: z.string().url().optional(),
  thegraphGql: z.string().url().optional(),
  hasuraGql: z.string().url().optional(),
  nodeJsonRpc: z.string().url().optional(),
  nodeJsonRpcDeploy: z.string().url().optional(),
});

/**
 * Schema for the main configuration.
 */
export const ConfigSchema = z.object({
  framework: z.string(),
  instance: z.string().url(),
  workspace: z.object({
    id: z.string(),
    displayName: z.string(),
  }),
  childWorkspace: z
    .object({
      id: z.string(),
      displayName: z.string(),
    })
    .optional(),
  defaultApplication: z.object({
    id: z.string(),
    displayName: z.string(),
  }),
  applications: z.record(z.string(), ApplicationConfigSchema).optional(),
});

/**
 * Schema for environment variables.
 */
export const EnvSchema = z.object({
  SETTLEMINT_PAT_TOKEN: z.string(),
  SETTLEMINT_HASURA_GQL_ADMIN_SECRET: z.string().optional(),
  SETTLEMINT_APP_URL: z.string().url().optional(),
  SETTLEMINT_AUTH_SECRET: z.string().min(32).optional(),
  WALLET_CONNECT_PROJECT_ID: z.string(),
});

export type Config = z.infer<typeof ConfigSchema>;
export type ApplicationConfig = z.infer<typeof ApplicationConfigSchema>;
export type Env = z.infer<typeof EnvSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}
