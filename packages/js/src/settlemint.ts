import { getCache, setCache } from "@/helpers/cache";
import {
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
  type StorageReturnValue,
  StorageReturnValueSchema,
} from "@/schemas/platform-return-values";
import { SettleMintClientEnvSchema } from "@/schemas/settlemint-client-env";
import { SearchKeySchema, type ServiceType, ServiceTypeSchema, type UniqueName } from "@/schemas/shared";
import { validate } from "@/schemas/validator";
import { type ZodSchema, z } from "zod";

export function createSettleMintClient() {
  const validatedEnv = validate(SettleMintClientEnvSchema, process.env);

  /**
   * Generic function to fetch data from the SettleMint API
   * @param type - The service type
   * @param searchKey - Optional unique name for specific resource
   * @returns Promise with the fetched data
   */
  const fetchData = async <T>(type: ServiceType, searchKey?: UniqueName): Promise<T> => {
    const validatedServiceType = validate(ServiceTypeSchema, type);
    const cacheKey = searchKey ? `${validatedServiceType}-${searchKey}` : validatedServiceType;

    const cachedData = getCache<T>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const url = new URL(`${validatedEnv.SETTLEMINT_INSTANCE}/cm/sdk/${validatedServiceType}`);
    if (searchKey) {
      url.pathname += `/${validate(SearchKeySchema, searchKey)}`;
    }

    let response = await fetch(url.toString(), {
      headers: { "x-auth-token": validatedEnv.SETTLEMINT_ACCESS_TOKEN },
    });

    if (!response.ok) {
      const retryCount = 3;
      const retryDelay = 1000;

      for (let i = 0; i < retryCount; i++) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        response = await fetch(url, {
          headers: { "x-auth-token": validatedEnv.SETTLEMINT_ACCESS_TOKEN },
        });
        if (response.ok) break;
      }

      if (!response.ok) {
        throw new Error(`API request failed after ${retryCount} retries: ${response.status} ${response.statusText}`);
      }
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data: T = await response.json();
    setCache(cacheKey, data);
    return data;
  };

  /**
   * Generic resource handler
   * @param type - The service type
   * @param schema - Zod schema for validation
   * @returns Object with list and get methods for the resource
   */
  const createResourceHandler = <T>(type: ServiceType, schema: ZodSchema<T>) => ({
    list: async (): Promise<T[]> => validate(z.array(schema), await fetchData<T[]>(type)),
    get: async (uniqueName?: string): Promise<T> => {
      const searchKey =
        uniqueName ?? (type === "blockchain-network" ? validatedEnv.SETTLEMINT_DEFAULT_BLOCKCHAIN_NETWORK : undefined);
      return validate(schema, await fetchData<T>(type, searchKey));
    },
  });

  const resources = {
    blockchainNetwork: createResourceHandler<BlockchainNetworkReturnValue>(
      "blockchain-network",
      BlockchainNetworkReturnValueSchema,
    ),
    blockchainNode: createResourceHandler<BlockchainNodeReturnValue>(
      "blockchain-node",
      BlockchainNodeReturnValueSchema,
    ),
    middleware: createResourceHandler<MiddlewareReturnValue>("middleware", MiddlewareReturnValueSchema),
    integrationTool: createResourceHandler<IntegrationToolReturnValue>(
      "integration-tool",
      IntegrationToolReturnValueSchema,
    ),
    storage: createResourceHandler<StorageReturnValue>("storage", StorageReturnValueSchema),
    privateKey: createResourceHandler<PrivateKeyReturnValue>("private-key", PrivateKeyReturnValueSchema),
    insights: createResourceHandler<InsightsReturnValue>("insights", InsightsReturnValueSchema),
    customDeployment: createResourceHandler<CustomDeploymentReturnValue>(
      "custom-deployment",
      CustomDeploymentReturnValueSchema,
    ),
  };

  return resources;
}
