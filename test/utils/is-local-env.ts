export function isLocalEnv(): boolean {
  try {
    const url = new URL(process.env.SETTLEMINT_INSTANCE ?? "");
    return url.hostname.endsWith(".settlemint.be") || url.hostname.endsWith(".k8s.orb.local") || false;
  } catch {
    return false;
  }
}
