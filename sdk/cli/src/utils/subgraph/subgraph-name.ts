export function getSubgraphName(endpoint: string) {
  return endpoint.split("/").pop();
}
