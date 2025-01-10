export function sanitizeInstanceUrl(url: string) {
  const instanceUrl = new URL(url);
  return instanceUrl.origin;
}
