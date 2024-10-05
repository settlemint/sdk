import { describe, expect, mock, test } from "bun:test";
import type { GraphQLClient } from "graphql-request";
import { privateKeyList, privatekeyRead } from "./private-key";

describe("Private Key Fetchers", () => {
  const mockGqlClient = {
    request: mock(() => Promise.resolve({})),
  } as unknown as GraphQLClient;

  const mockOptions = {
    accessToken: "mock-token",
    instance: "https://mock-instance.com",
  };

  describe("privateKeyList", () => {
    test("should return a list of private keys", async () => {
      const mockResponse = {
        privateKeys: {
          items: [
            { id: "123e4567-e89b-12d3-a456-426614174000", name: "Key 1" },
            { id: "123e4567-e89b-12d3-a456-426614174001", name: "Key 2" },
          ],
        },
      };
      const mockGqlClient = {
        request: mock(() => Promise.resolve(mockResponse)),
      } as unknown as GraphQLClient;

      const list = privateKeyList(mockGqlClient, mockOptions);
      const result = await list("123e4567-e89b-12d3-a456-426614174002");

      expect(result).toEqual(mockResponse.privateKeys.items);
      expect(mockGqlClient.request).toHaveBeenCalledTimes(1);
      expect(mockGqlClient.request).toHaveBeenCalledWith(expect.anything(), {
        id: "123e4567-e89b-12d3-a456-426614174002",
      });
    });

    test("should throw an error for invalid application ID", async () => {
      const list = privateKeyList(mockGqlClient, mockOptions);
      await expect(list("")).rejects.toThrow();
    });
  });

  describe("privatekeyRead", () => {
    test("should return a specific private key", async () => {
      const mockResponse = {
        privateKey: { id: "123e4567-e89b-12d3-a456-426614174003", name: "Key 1" },
      };
      const mockGqlClient = {
        request: mock(() => Promise.resolve(mockResponse)),
      } as unknown as GraphQLClient;

      const read = privatekeyRead(mockGqlClient, mockOptions);
      const result = await read("123e4567-e89b-12d3-a456-426614174003");

      expect(result).toEqual(mockResponse.privateKey);
      expect(mockGqlClient.request).toHaveBeenCalledTimes(1);
      expect(mockGqlClient.request).toHaveBeenCalledWith(expect.anything(), {
        id: "123e4567-e89b-12d3-a456-426614174003",
      });
    });

    test("should throw an error for invalid private key ID", async () => {
      const read = privatekeyRead(mockGqlClient, mockOptions);
      await expect(read("")).rejects.toThrow();
    });
  });
});
