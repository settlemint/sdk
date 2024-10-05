import { describe, expect, mock, test } from "bun:test";
import type { GraphQLClient } from "graphql-request";
import { blockchainNodeList, blockchainNodeRead } from "./blockchain-node.js";

describe("Blockchain Node Fetchers", () => {
  const mockGqlClient = {
    request: mock(() => Promise.resolve({})),
  } as unknown as GraphQLClient;

  const mockOptions = {
    accessToken: "mock-token",
    instance: "https://mock-instance.com",
  };

  describe("blockchainNodeList", () => {
    test("should return a list of blockchain nodes", async () => {
      const mockResponse = {
        blockchainNodes: {
          items: [
            {
              id: "123e4567-e89b-12d3-a456-426614174000",
              name: "Node 1",
              endpoints: [
                { id: "endpoint1", label: "Endpoint 1", displayValue: "https://endpoint1.example.com" },
                { id: "endpoint2", label: "Endpoint 2", displayValue: "https://endpoint2.example.com" },
              ],
              credentials: [
                { id: "cred1", label: "Credential 1", displayValue: "username1" },
                { id: "cred2", label: "Credential 2", displayValue: "password1" },
              ],
            },
            {
              id: "123e4567-e89b-12d3-a456-426614174001",
              name: "Node 2",
              endpoints: [{ id: "endpoint3", label: "Endpoint 3", displayValue: "https://endpoint3.example.com" }],
              credentials: [{ id: "cred3", label: "Credential 3", displayValue: "apikey1" }],
            },
          ],
        },
      };
      const mockGqlClient = {
        request: mock(() => Promise.resolve(mockResponse)),
      } as unknown as GraphQLClient;

      const list = blockchainNodeList(mockGqlClient, mockOptions);
      const result = await list("123e4567-e89b-12d3-a456-426614174002");

      expect(result).toEqual(mockResponse.blockchainNodes.items);
      expect(mockGqlClient.request).toHaveBeenCalledTimes(1);
      expect(mockGqlClient.request).toHaveBeenCalledWith(expect.anything(), {
        id: "123e4567-e89b-12d3-a456-426614174002",
      });
    });

    test("should throw an error for invalid application ID", async () => {
      const list = blockchainNodeList(mockGqlClient, mockOptions);
      await expect(list("")).rejects.toThrow();
    });
  });

  describe("blockchainNodeRead", () => {
    test("should return a specific blockchain node", async () => {
      const mockResponse = {
        blockchainNode: {
          id: "123e4567-e89b-12d3-a456-426614174003",
          name: "Node 1",
          endpoints: [
            { id: "endpoint1", label: "Endpoint 1", displayValue: "https://endpoint1.example.com" },
            { id: "endpoint2", label: "Endpoint 2", displayValue: "https://endpoint2.example.com" },
          ],
          credentials: [
            { id: "cred1", label: "Credential 1", displayValue: "username1" },
            { id: "cred2", label: "Credential 2", displayValue: "password1" },
          ],
        },
      };
      const mockGqlClient = {
        request: mock(() => Promise.resolve(mockResponse)),
      } as unknown as GraphQLClient;

      const read = blockchainNodeRead(mockGqlClient, mockOptions);
      const result = await read("123e4567-e89b-12d3-a456-426614174003");

      expect(result).toEqual(mockResponse.blockchainNode);
      expect(mockGqlClient.request).toHaveBeenCalledTimes(1);
      expect(mockGqlClient.request).toHaveBeenCalledWith(expect.anything(), {
        id: "123e4567-e89b-12d3-a456-426614174003",
      });
    });

    test("should throw an error for invalid blockchain node ID", async () => {
      const read = blockchainNodeRead(mockGqlClient, mockOptions);
      expect(read("")).rejects.toThrow();
    });
  });
});
