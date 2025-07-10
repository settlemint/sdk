import { extractBaseUrlBeforeSegment } from "@settlemint/sdk-utils/url";
import { getSubgraphName } from "@/utils/subgraph/subgraph-name";

export function getUpdatedSubgraphEndpoints({
  existingEndpoints,
  newSubgraphName,
  middlewareAdminUrl,
  removedSubgraphName,
}: {
  existingEndpoints: string[];
  newSubgraphName?: string;
  middlewareAdminUrl?: string;
  removedSubgraphName?: string;
}) {
  const existingEndpointsWithoutRemoved = existingEndpoints.filter((endpoint) => {
    return getSubgraphName(endpoint) !== removedSubgraphName;
  });
  if (newSubgraphName) {
    if (!middlewareAdminUrl) {
      throw new Error("Middleware admin URL is required to add a new subgraph");
    }
    // Extract base URL by removing /admin from the end
    const baseUrl = middlewareAdminUrl.replace(/\/admin\/?$/, "");
    if (baseUrl) {
      const endpoint = getTheGraphSubgraphUrl(baseUrl, newSubgraphName);
      if (!existingEndpointsWithoutRemoved.includes(endpoint)) {
        existingEndpointsWithoutRemoved.push(endpoint);
      }
    }
  }
  return existingEndpointsWithoutRemoved;
}

export function getTheGraphUrl(subgraphUrls?: string[]) {
  if (Array.isArray(subgraphUrls) && subgraphUrls.length > 0) {
    return extractBaseUrlBeforeSegment(subgraphUrls[0], "/subgraphs");
  }
  return undefined;
}

export function getTheGraphSubgraphNames(subgraphUrls?: string[]) {
  if (Array.isArray(subgraphUrls) && subgraphUrls.length > 0) {
    return subgraphUrls.map((url) => getSubgraphName(url)).filter((name) => name !== undefined);
  }
  return [];
}

export function getTheGraphSubgraphUrl(theGraphUrl: string, subgraphName: string) {
  // Parse the base URL
  const url = new URL(theGraphUrl);

  // Ensure pathname ends with a slash to prevent replacing the last segment
  if (!url.pathname.endsWith("/")) {
    url.pathname += "/";
  }

  // Append the subgraph path
  url.pathname += `subgraphs/name/${subgraphName}`;

  return url.toString();
}
