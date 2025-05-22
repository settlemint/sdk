type MaybeLazy<T> = T | (() => T);

export function appendHeaders(
  headers: MaybeLazy<HeadersInit> | undefined,
  additionalHeaders: Record<string, string | undefined>,
) {
  const defaultHeaders = typeof headers === "function" ? headers() : headers;
  const filteredAdditionalHeaders = Object.entries(additionalHeaders).filter(([_, value]) => value !== undefined) as [
    string,
    string,
  ][];
  if (Array.isArray(defaultHeaders)) {
    return [...defaultHeaders, ...filteredAdditionalHeaders];
  }
  if (defaultHeaders instanceof Headers) {
    return new Headers([...defaultHeaders, ...filteredAdditionalHeaders]);
  }
  return {
    ...defaultHeaders,
    ...Object.fromEntries(filteredAdditionalHeaders),
  };
}
