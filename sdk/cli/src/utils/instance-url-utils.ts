import { LOCAL_INSTANCE, STANDALONE_INSTANCE, UrlSchema, validate } from "@settlemint/sdk-utils/validation";

export function sanitizeInstanceUrl(url: string) {
  if (url === STANDALONE_INSTANCE || url === LOCAL_INSTANCE) {
    return url;
  }
  const instanceUrl = new URL(url);
  return instanceUrl.origin;
}

export function sanitizeAndValidateInstanceUrl(url: string) {
  const sanitizedUrl = sanitizeInstanceUrl(url);
  if (sanitizedUrl === STANDALONE_INSTANCE || sanitizedUrl === LOCAL_INSTANCE) {
    return sanitizedUrl;
  }
  validate(UrlSchema, sanitizedUrl);
  return sanitizedUrl;
}
