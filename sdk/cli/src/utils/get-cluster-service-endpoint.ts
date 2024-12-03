import { testGqlEndpoint } from "@/commands/codegen/test-gql-endpoint";
import type { Middleware, Storage } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils";

export async function getHAGraphEndpoint(
  service: Middleware | undefined,
  env: Partial<DotEnv>,
): Promise<Partial<DotEnv>> {
  if (!service || service.__typename !== "HAGraphMiddleware") {
    return {};
  }

  const testEndpoint = service.subgraphs.find(
    ({ graphqlQueryEndpoint }) => !graphqlQueryEndpoint?.id.endsWith("-starterkits"),
  )?.graphqlQueryEndpoint?.displayValue;

  const hasEndpoint =
    testEndpoint && env.SETTLEMINT_ACCESS_TOKEN
      ? await testGqlEndpoint(env.SETTLEMINT_ACCESS_TOKEN, undefined, testEndpoint)
      : false;

  const endpoint = hasEndpoint
    ? testEndpoint
    : service.subgraphs.find(({ graphqlQueryEndpoint }) => graphqlQueryEndpoint?.id.includes("-starterkits"))
        ?.graphqlQueryEndpoint?.displayValue;

  if (!endpoint) {
    return {};
  }

  return {
    SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT: endpoint,
  };
}

export function getIpfsEndpoints(service: Storage | undefined): Partial<DotEnv> {
  if (!service || service.__typename !== "IPFSStorage") {
    return {};
  }

  return {
    SETTLEMINT_IPFS_API_ENDPOINT: service?.endpoints.find((endpoint) => endpoint.id.includes("api"))?.displayValue,
    SETTLEMINT_IPFS_PINNING_ENDPOINT: service?.endpoints.find((endpoint) => endpoint.id.includes("cluster-pinning-api"))
      ?.displayValue,
    SETTLEMINT_IPFS_GATEWAY_ENDPOINT: service?.endpoints.find((endpoint) => endpoint.id.includes("gateway"))
      ?.displayValue,
  };
}
