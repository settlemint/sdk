import { describe, expect, mock, test } from "bun:test";
import type { GraphQLClient } from "graphql-request";
import { type IntegrationTool, integrationToolList, integrationToolRead } from "./integration-tool.js";

describe("Integration Tool Fetchers", () => {
  const mockGqlClient = {
    request: mock(() => Promise.resolve({})),
  } as unknown as GraphQLClient;

  const mockOptions = {
    accessToken: "mock-token",
    instance: "https://mock-instance.com",
  };

  describe("integrationToolList", () => {
    test("should return a list of integration tools", async () => {
      const mockResponse = {
        integrations: {
          items: [
            {
              id: "123e4567-e89b-12d3-a456-426614174000",
              name: "Integration 1",
              integrationType: "HASURA",
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
              name: "Integration 2",
              integrationType: "HASURA",
              endpoints: [{ id: "endpoint3", label: "Endpoint 3", displayValue: "https://endpoint3.example.com" }],
              credentials: [{ id: "cred3", label: "Credential 3", displayValue: "apikey1" }],
            },
          ] as IntegrationTool[],
        },
      };
      const mockGqlClient = {
        request: mock(() => Promise.resolve(mockResponse)),
      } as unknown as GraphQLClient;

      const list = integrationToolList(mockGqlClient, mockOptions);
      const result = await list("123e4567-e89b-12d3-a456-426614174002");

      expect(result).toEqual(mockResponse.integrations.items);
      expect(mockGqlClient.request).toHaveBeenCalledTimes(1);
      expect(mockGqlClient.request).toHaveBeenCalledWith(expect.anything(), {
        id: "123e4567-e89b-12d3-a456-426614174002",
      });
    });

    test("should throw an error for invalid application ID", async () => {
      const list = integrationToolList(mockGqlClient, mockOptions);
      await expect(list("")).rejects.toThrow();
    });
  });

  describe("integrationToolRead", () => {
    test("should return a specific integration tool", async () => {
      const mockResponse = {
        integration: {
          id: "123e4567-e89b-12d3-a456-426614174003",
          name: "Integration 1",
          integrationType: "HASURA",
          endpoints: [
            { id: "endpoint1", label: "Endpoint 1", displayValue: "https://endpoint1.example.com" },
            { id: "endpoint2", label: "Endpoint 2", displayValue: "https://endpoint2.example.com" },
          ],
          credentials: [
            { id: "cred1", label: "Credential 1", displayValue: "username1" },
            { id: "cred2", label: "Credential 2", displayValue: "password1" },
          ],
        } as IntegrationTool,
      };
      const mockGqlClient = {
        request: mock(() => Promise.resolve(mockResponse)),
      } as unknown as GraphQLClient;

      const read = integrationToolRead(mockGqlClient, mockOptions);
      const result = await read("123e4567-e89b-12d3-a456-426614174003");

      expect(result).toEqual(mockResponse.integration);
      expect(mockGqlClient.request).toHaveBeenCalledTimes(1);
      expect(mockGqlClient.request).toHaveBeenCalledWith(expect.anything(), {
        id: "123e4567-e89b-12d3-a456-426614174003",
      });
    });

    test("should throw an error for invalid integration tool ID", async () => {
      const read = integrationToolRead(mockGqlClient, mockOptions);
      await expect(read("")).rejects.toThrow();
    });
  });
});
