/**
 * Creates a Portal REST client based on the OpenAPI specification.
 * This function generates TypeScript types and a client for the Portal REST API.
 *
 * @param portalRest - The base URL of the Portal REST API
 * @param personalAccessToken - The personal access token for authentication
 */
export async function createWagmiConfig() {
  return {
    importLine: "",
    sdkLine: {
      node: {
        wagmi: "sdkGenerator.createWagmiConfig({ ...config?.wagmi, chain })",
      },
    },
  };
}
