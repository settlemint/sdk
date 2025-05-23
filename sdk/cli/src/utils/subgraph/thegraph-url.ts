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
      existingEndpointsWithoutRemoved.push(`${baseUrl}/subgraphs/name/${getSubgraphName(newSubgraphName)}`);
    }
  }
  return existingEndpointsWithoutRemoved;
}

export function getTheGraphUrl(subgraphUrls?: string[]) {
  if (subgraphUrls?.length === 1) {
    const url = new URL(subgraphUrls[0]);
    const subgraphsPathIndex = url.pathname.indexOf("/subgraphs");
    return url.origin + (subgraphsPathIndex >= 0 ? url.pathname.substring(0, subgraphsPathIndex) : url.pathname);
  }
  return undefined;
}
