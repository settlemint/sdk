/**
 * Extracts the base URL before a specific segment in a URL.
 *
 * @param baseUrl - The base URL to extract the path from
 * @param pathSegment - The path segment to start from
 * @returns The base URL before the specified segment
 * @example
 * ```typescript
 * import { extractBaseUrlBeforeSegment } from "@settlemint/sdk-utils/url";
 *
 * const baseUrl = extractBaseUrlBeforeSegment("https://example.com/api/v1/subgraphs/name/my-subgraph", "/subgraphs");
 * // Returns: "https://example.com/api/v1"
 * ```
 */
export function extractBaseUrlBeforeSegment(baseUrl: string, pathSegment: string) {
  const url = new URL(baseUrl);
  if (pathSegment.trim() === "") {
    return url.toString();
  }
  const segmentIndex = url.pathname.indexOf(pathSegment);
  return url.origin + (segmentIndex >= 0 ? url.pathname.substring(0, segmentIndex) : url.pathname);
}
