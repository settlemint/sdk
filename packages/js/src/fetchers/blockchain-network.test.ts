import { describe, expect, mock, test } from "bun:test";
import type { GraphQLClient } from "graphql-request";
import { blockchainNetworkList, blockchainNetworkRead } from "./blockchain-network.js";

describe("Blockchain Network Fetchers", () => {
  const mockGqlClient = {
    request: mock(() => Promise.resolve({})),
  } as unknown as GraphQLClient;

  const mockOptions = {
    accessToken: "mock-token",
    instance: "https://mock-instance.com",
  };

  describe("blockchainNetworkList", () => {
    test("should return a list of blockchain networks", async () => {
      const mockResponse = {
        blockchainNetworks: {
          items: [
            { id: "123e4567-e89b-12d3-a456-426614174000", name: "Network 1" },
            { id: "123e4567-e89b-12d3-a456-426614174001", name: "Network 2" },
          ],
        },
      };
      const mockGqlClient = {
        request: mock(() => Promise.resolve(mockResponse)),
      } as unknown as GraphQLClient;

      const list = blockchainNetworkList(mockGqlClient, mockOptions);
      const result = await list("123e4567-e89b-12d3-a456-426614174002");

      expect(result).toEqual(mockResponse.blockchainNetworks.items);
      expect(mockGqlClient.request).toHaveBeenCalledTimes(1);
      expect(mockGqlClient.request).toHaveBeenCalledWith(expect.anything(), {
        id: "123e4567-e89b-12d3-a456-426614174002",
      });
    });

    test("should throw an error for invalid application ID", async () => {
      const list = blockchainNetworkList(mockGqlClient, mockOptions);
      await expect(list("")).rejects.toThrow();
    });
  });

  describe("blockchainNetworkRead", () => {
    test("should return a specific blockchain network", async () => {
      const mockResponse = {
        blockchainNetwork: { id: "123e4567-e89b-12d3-a456-426614174003", name: "Network 1" },
      };
      const mockGqlClient = {
        request: mock(() => Promise.resolve(mockResponse)),
      } as unknown as GraphQLClient;

      const read = blockchainNetworkRead(mockGqlClient, mockOptions);
      const result = await read("123e4567-e89b-12d3-a456-426614174003");

      expect(result).toEqual(mockResponse.blockchainNetwork);
      expect(mockGqlClient.request).toHaveBeenCalledTimes(1);
      expect(mockGqlClient.request).toHaveBeenCalledWith(expect.anything(), {
        id: "123e4567-e89b-12d3-a456-426614174003",
      });
    });

    test("should throw an error for invalid blockchain network ID", async () => {
      const read = blockchainNetworkRead(mockGqlClient, mockOptions);
      expect(read("")).rejects.toThrow();
    });
  });
});
