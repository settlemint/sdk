export function isLocalEnv(): boolean {
  return process.env.SETTLEMINT_INSTANCE?.startsWith("https://console.k8s.orb.local") ?? false;
}
