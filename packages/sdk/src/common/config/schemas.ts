import { z } from "zod";

/**
 * Schema for application configuration.
 */
export const ApplicationConfigSchema = z.object({
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
 * Schema for configuration with environment variables.
 */
export const ConfigEnvSchema = ConfigSchema.extend({
  pat: z.string(),
  appUrl: z.string().url().optional(),
  hasuraAdminSecret: z.string().optional(),
  sessionSecret: z.string().min(32).optional(),
  walletConnectProjectId: z.string(),
});

/**
 * Schema for browser-specific configuration with environment variables.
 */
export const BrowserConfigEnvSchema = ConfigSchema.extend({
  appUrl: z.string().url(),
  walletConnectProjectId: z.string(),
});

/**
 * Schema for environment variables.
 */
export const EnvSchema = z.object({
  SETTLEMINT_PAT_TOKEN: z.string(),
  SETTLEMINT_HASURA_GQL_ADMIN_SECRET: z.string().optional(),
  NEXT_PUBLIC_SETTLEMINT_APP_URL: z.string().url().optional(),
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(32).optional(),
  NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: z.string(),
});

/**
 * Schema for application configuration with environment variables.
 */
export const ApplicationConfigEnvSchema = ApplicationConfigSchema.extend({
  pat: z.string(),
  appUrl: z.string().url().optional(),
  hasuraAdminSecret: z.string().optional(),
  walletConnectProjectId: z.string(),
});

/**
 * Schema for browser-specific application configuration with environment variables.
 */
export const BrowserApplicationConfigEnvSchema = ApplicationConfigSchema.extend({
  appUrl: z.string().url(),
  walletConnectProjectId: z.string(),
});

export type ConfigEnv = z.infer<typeof ConfigEnvSchema>;
export type BrowserConfigEnv = z.infer<typeof BrowserConfigEnvSchema>;
export type Config = z.infer<typeof ConfigSchema>;
export type Env = z.infer<typeof EnvSchema>;
export type ApplicationConfigEnv = z.infer<typeof ApplicationConfigEnvSchema>;
export type BrowserApplicationConfigEnv = z.infer<typeof BrowserApplicationConfigEnvSchema>;
