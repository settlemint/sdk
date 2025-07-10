export function getSubgraphName(endpoint: string) {
  if (endpoint.toLowerCase().includes("/subgraphs/")) {
    return endpoint.split("/").pop();
  }
  return undefined;
}
