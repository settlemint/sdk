import { UrlSchema, validate } from "@settlemint/sdk-utils";

export function sanitizeInstanceUrl(url: string) {
  const instanceUrl = new URL(url);
  return instanceUrl.origin;
}

export function sanitizeAndValidateInstanceUrl(url: string) {
  const sanitizedUrl = sanitizeInstanceUrl(url);
  validate(UrlSchema, sanitizedUrl);
  return sanitizedUrl;
}
