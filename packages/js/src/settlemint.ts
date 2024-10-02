import { getCache, invalidateCache, setCache } from "@/helpers/cache";
import {
  type ApplicationReturnValue,
  ApplicationReturnValueSchema,
  type BlockchainNetworkReturnValue,
  BlockchainNetworkReturnValueSchema,
  type BlockchainNodeReturnValue,
  BlockchainNodeReturnValueSchema,
  type CustomDeploymentReturnValue,
  CustomDeploymentReturnValueSchema,
  type InsightsReturnValue,
  InsightsReturnValueSchema,
  type IntegrationToolReturnValue,
  IntegrationToolReturnValueSchema,
  type MiddlewareReturnValue,
  MiddlewareReturnValueSchema,
  type PrivateKeyReturnValue,
  PrivateKeyReturnValueSchema,
  SearchKeySchema,
  type ServiceType,
  ServiceTypeSchema,
  SettleMintClientEnvSchema,
  type StorageReturnValue,
  StorageReturnValueSchema,
  type UniqueName,
  type WorkspaceReturnValue,
  WorkspaceReturnValueSchema,
  validate,
} from "@/schemas/schemas";
import { type ZodSchema, z } from "zod";

/**
 * Creates a SettleMint client with methods to interact with various resources.
 * @returns An object containing methods to interact with SettleMint resources.
 * @throws {Error} If the environment variables are invalid.
 * @example
 * const client = createSettleMintClient();
 * const blockchainNetworks = await client.blockchainNetwork.list();
 */
export function createSettleMintClient() {
  const validatedEnv = validate(SettleMintClientEnvSchema, process.env);

  /**
   * Performs a fetch request with retry mechanism.
   * @param url - The URL to fetch.
   * @param options - Fetch options.
   * @returns A promise that resolves to the fetch response.
   * @throws {Error} If the API request fails after retries.
   */
  const fetchWithRetry = async (url: string, options: RequestInit): Promise<Response> => {
    const retryCount = 3;
    const retryDelay = 1000;

    let response = await fetch(url, options);

    for (let i = 0; i < retryCount && !response.ok; i++) {
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      response = await fetch(url, options);
    }

    if (!response.ok) {
      throw new Error(`API request failed after ${retryCount} retries: ${response.status} ${response.statusText}`);
    }

    return response;
  };

  /**
   * Fetches data from the SettleMint API.
   * @param type - The service type to fetch data for.
   * @param searchKey - Optional unique name for a specific resource.
   * @returns A promise that resolves to the fetched data.
   * @throws {Error} If the API request fails after retries.
   */
  const fetchData = async <T>(type: ServiceType, searchKey?: UniqueName): Promise<T> => {
    const validatedServiceType = validate(ServiceTypeSchema, type);
    const validatedSearchKey = validate(SearchKeySchema, searchKey);
    const cacheKey = searchKey ? `${validatedServiceType}-${validatedSearchKey}` : validatedServiceType;

    const cachedData = getCache<T>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const url = new URL(`${validatedEnv.SETTLEMINT_INSTANCE}/cm/sdk/${validatedServiceType}`);
    if (searchKey) {
      url.pathname += `/${validatedSearchKey}`;
    }

    const response = await fetchWithRetry(url.toString(), {
      headers: { "x-auth-token": validatedEnv.SETTLEMINT_ACCESS_TOKEN },
    });

    const data: T = await response.json();
    setCache(cacheKey, data);
    return data;
  };

  /**
   * Updates data in the SettleMint API.
   * @param type - The service type to update data for.
   * @param data - The data to update.
   * @param updateSchema - The Zod schema to validate the update data.
   * @param searchKey - Optional unique name for a specific resource.
   * @returns A promise that resolves to the updated data.
   * @throws {Error} If the API request fails after retries.
   */
  const updateData = async <T, U>(
    type: ServiceType,
    data: U,
    updateSchema: ZodSchema<U>,
    searchKey?: UniqueName,
  ): Promise<T> => {
    const validatedServiceType = validate(ServiceTypeSchema, type);
    const validatedSearchKey = validate(SearchKeySchema, searchKey);
    const validatedData = validate(updateSchema, data);
    const url = new URL(`${validatedEnv.SETTLEMINT_INSTANCE}/cm/sdk/${validatedServiceType}/${validatedSearchKey}`);

    const response = await fetchWithRetry(url.toString(), {
      method: "PUT",
      headers: { "x-auth-token": validatedEnv.SETTLEMINT_ACCESS_TOKEN },
      body: JSON.stringify(validatedData),
    });

    const updatedData: T = await response.json();

    setCache(`${validatedServiceType}-${validatedSearchKey}`, updatedData);
    invalidateCache(validatedServiceType);

    return updatedData;
  };

  /**
   * Creates a resource handler with methods to interact with a specific SettleMint resource.
   * @param type - The service type of the resource.
   * @param schema - The Zod schema for validating the resource data.
   * @param defaultSearchKey - Optional default search key for the resource.
   * @param updateSchema - Optional Zod schema for validating update data.
   * @returns An object with methods to list, get, and optionally update the resource.
   */
  const createResourceHandler = <T, U>(
    type: ServiceType,
    schema: ZodSchema<T>,
    defaultSearchKey?: string,
    updateSchema?: ZodSchema<U>,
  ) => ({
    list: async (): Promise<T[]> => validate(z.array(schema), await fetchData<T[]>(type)),
    get: async (uniqueName?: UniqueName): Promise<T> => {
      const searchKey = uniqueName ?? defaultSearchKey;
      return validate(schema, await fetchData<T>(type, searchKey));
    },
    ...(updateSchema && {
      update: async (uniqueName: string, data: U) => {
        const searchKey = uniqueName ?? defaultSearchKey;
        return validate(schema, await updateData<T, U>(type, data, updateSchema, searchKey));
      },
    }),
  });

  return {
    workspace: createResourceHandler<WorkspaceReturnValue, never>(
      "workspace",
      WorkspaceReturnValueSchema,
      validatedEnv.SETTLEMINT_DEFAULT_WORKSPACE,
    ),
    application: createResourceHandler<ApplicationReturnValue, never>(
      "application",
      ApplicationReturnValueSchema,
      validatedEnv.SETTLEMINT_DEFAULT_APPLICATION,
    ),
    blockchainNetwork: createResourceHandler<BlockchainNetworkReturnValue, never>(
      "blockchain-network",
      BlockchainNetworkReturnValueSchema,
      validatedEnv.SETTLEMINT_DEFAULT_BLOCKCHAIN_NETWORK,
    ),
    blockchainNode: createResourceHandler<BlockchainNodeReturnValue, never>(
      "blockchain-node",
      BlockchainNodeReturnValueSchema,
      validatedEnv.SETTLEMINT_DEFAULT_BLOCKCHAIN_NODE,
    ),
    middleware: createResourceHandler<MiddlewareReturnValue, never>(
      "middleware",
      MiddlewareReturnValueSchema,
      validatedEnv.SETTLEMINT_DEFAULT_MIDDLEWARE,
    ),
    integrationTool: createResourceHandler<IntegrationToolReturnValue, never>(
      "integration-tool",
      IntegrationToolReturnValueSchema,
      validatedEnv.SETTLEMINT_DEFAULT_INTEGRATION_TOOL,
    ),
    storage: createResourceHandler<StorageReturnValue, never>(
      "storage",
      StorageReturnValueSchema,
      validatedEnv.SETTLEMINT_DEFAULT_STORAGE,
    ),
    privateKey: createResourceHandler<PrivateKeyReturnValue, never>(
      "private-key",
      PrivateKeyReturnValueSchema,
      validatedEnv.SETTLEMINT_DEFAULT_PRIVATE_KEY,
    ),
    insights: createResourceHandler<InsightsReturnValue, never>(
      "insights",
      InsightsReturnValueSchema,
      validatedEnv.SETTLEMINT_DEFAULT_INSIGHTS,
    ),
    customDeployment: createResourceHandler<CustomDeploymentReturnValue, never>(
      "custom-deployment",
      CustomDeploymentReturnValueSchema,
      validatedEnv.SETTLEMINT_DEFAULT_CUSTOM_DEPLOYMENT,
      // TODO: Pass in the update schema to update the custom deployment
    ),
  };
}
