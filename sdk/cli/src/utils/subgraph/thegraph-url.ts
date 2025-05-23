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
    const baseUrl = new URL(middlewareAdminUrl).origin;
    if (baseUrl) {
      existingEndpointsWithoutRemoved.push(`${getTheGraphSubgraphUrl(baseUrl, newSubgraphName)}`);
    }
  }
  return existingEndpointsWithoutRemoved;
}

export function getTheGraphUrl(subgraphUrls?: string[]) {
  if (Array.isArray(subgraphUrls) && subgraphUrls.length > 0) {
    const url = new URL(subgraphUrls[0]);
    const subgraphsPathIndex = url.pathname.indexOf("/subgraphs");
    return url.origin + (subgraphsPathIndex >= 0 ? url.pathname.substring(0, subgraphsPathIndex) : url.pathname);
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
