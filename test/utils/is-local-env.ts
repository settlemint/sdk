export function isLocalEnv(): boolean {
  return (
    process.env.SETTLEMINT_INSTANCE?.startsWith("https://console.k8s.orb.local") ||
    /^https:\/\/[a-z]+?\.settlemint\.be/i.test(process.env.SETTLEMINT_INSTANCE ?? "") ||
    false
  );
}
