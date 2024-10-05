import { describe, expect, mock, test } from "bun:test";
import type { GraphQLClient } from "graphql-request";
import { workspaceList, workspaceRead } from "./workspace";

describe("Workspace Fetchers", () => {
  const mockGqlClient = {
    request: mock(() => Promise.resolve({})),
  } as unknown as GraphQLClient;

  const mockOptions = {
    accessToken: "mock-token",
    instance: "https://mock-instance.com",
  };

  describe("workspaceList", () => {
    test("should return a list of workspaces", async () => {
      const mockResponse = {
        workspaces: [
          { id: "123e4567-e89b-12d3-a456-426614174000", name: "Workspace 1", applications: [] },
          { id: "123e4567-e89b-12d3-a456-426614174001", name: "Workspace 2", applications: [] },
        ],
      };
      const mockGqlClient = {
        request: mock(() => Promise.resolve(mockResponse)),
      } as unknown as GraphQLClient;

      const list = workspaceList(mockGqlClient, mockOptions);
      const result = await list();

      expect(result).toEqual(mockResponse.workspaces);
      expect(mockGqlClient.request).toHaveBeenCalledTimes(1);
      expect(mockGqlClient.request).toHaveBeenCalledWith(expect.anything());
    });
  });

  describe("workspaceRead", () => {
    test("should return a specific workspace", async () => {
      const mockResponse = {
        workspace: { id: "123e4567-e89b-12d3-a456-426614174003", name: "Workspace 1", applications: [] },
      };
      const mockGqlClient = {
        request: mock(() => Promise.resolve(mockResponse)),
      } as unknown as GraphQLClient;

      const read = workspaceRead(mockGqlClient, mockOptions);
      const result = await read("123e4567-e89b-12d3-a456-426614174003");

      expect(result).toEqual(mockResponse.workspace);
      expect(mockGqlClient.request).toHaveBeenCalledTimes(1);
      expect(mockGqlClient.request).toHaveBeenCalledWith(expect.anything(), {
        id: "123e4567-e89b-12d3-a456-426614174003",
      });
    });

    test("should throw an error for invalid workspace ID", async () => {
      const read = workspaceRead(mockGqlClient, mockOptions);
      await expect(read("")).rejects.toThrow();
    });
  });
});
