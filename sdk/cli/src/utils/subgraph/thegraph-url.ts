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
    const baseUrl = extractBaseUrlBeforeSegment(middlewareAdminUrl, "/admin");
    if (baseUrl) {
      const endpoint = `${getTheGraphSubgraphUrl(baseUrl, newSubgraphName)}`;
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
    return subgraphUrls.map((url) => getSubgraphName(url));
  }
  return [];
}

export function getTheGraphSubgraphUrl(theGraphUrl: string, subgraphName: string) {
  return `${theGraphUrl}/subgraphs/name/${subgraphName}`;
}

function extractBaseUrlBeforeSegment(baseUrl: string, pathSegment: string) {
  const url = new URL(baseUrl);
  const segmentIndex = url.pathname.indexOf(pathSegment);
  return url.origin + (segmentIndex >= 0 ? url.pathname.substring(0, segmentIndex) : url.pathname);
}
