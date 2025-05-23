import { describe, expect, it } from "bun:test";
import { getTheGraphUrl, getUpdatedSubgraphEndpoints } from "./thegraph-url";

describe("getTheGraphUrl", () => {
  it("should return undefined when no subgraphUrls are provided", () => {
    expect(getTheGraphUrl()).toBeUndefined();
  });

  it("should return undefined when empty array is provided", () => {
    expect(getTheGraphUrl([])).toBeUndefined();
  });

  it("should return base URL when single subgraph URL is provided", () => {
    const url = "https://thegraph.example.com/subgraphs/name/my-subgraph";
    expect(getTheGraphUrl([url])).toBe("https://thegraph.example.com");
  });

  it("should handle URLs without /subgraphs path", () => {
    const url = "https://thegraph.example.com";
    expect(getTheGraphUrl([url])).toBe("https://thegraph.example.com/");
  });

  it("should handle URLs with additional path segments", () => {
    const url = "https://thegraph.example.com/api/v1/subgraphs/name/my-subgraph";
    expect(getTheGraphUrl([url])).toBe("https://thegraph.example.com/api/v1");
  });
});

describe("getUpdatedSubgraphEndpoints", () => {
  it("should filter out removed subgraph endpoint", () => {
    const existingEndpoints = [
      "https://thegraph.example.com/subgraphs/name/subgraph1",
      "https://thegraph.example.com/subgraphs/name/subgraph2",
    ];
    const result = getUpdatedSubgraphEndpoints({
      existingEndpoints,
      removedSubgraphName: "subgraph1",
    });
    expect(result).toEqual(["https://thegraph.example.com/subgraphs/name/subgraph2"]);
  });

  it("should add new subgraph endpoint when provided", () => {
    const existingEndpoints = ["https://thegraph.example.com/subgraphs/name/subgraph1"];
    const result = getUpdatedSubgraphEndpoints({
      existingEndpoints,
      newSubgraphName: "subgraph2",
      middlewareAdminUrl: "https://thegraph.example.com/admin",
    });
    expect(result).toEqual([
      "https://thegraph.example.com/subgraphs/name/subgraph1",
      "https://thegraph.example.com/subgraphs/name/subgraph2",
    ]);
  });

  it("should throw error when middlewareAdminUrl is missing", () => {
    const existingEndpoints = ["https://thegraph.example.com/subgraphs/name/subgraph1"];
    expect(() =>
      getUpdatedSubgraphEndpoints({
        existingEndpoints,
        newSubgraphName: "subgraph2",
      }),
    ).toThrow("Middleware admin URL is required to add a new subgraph");
  });

  it("should handle empty existing endpoints", () => {
    const result = getUpdatedSubgraphEndpoints({
      existingEndpoints: [],
      newSubgraphName: "subgraph1",
      middlewareAdminUrl: "https://thegraph.example.com/admin",
    });
    expect(result).toEqual(["https://thegraph.example.com/subgraphs/name/subgraph1"]);
  });

  it("should handle multiple operations (remove and add) simultaneously", () => {
    const existingEndpoints = [
      "https://thegraph.example.com/subgraphs/name/subgraph1",
      "https://thegraph.example.com/subgraphs/name/subgraph2",
    ];
    const result = getUpdatedSubgraphEndpoints({
      existingEndpoints,
      newSubgraphName: "subgraph3",
      middlewareAdminUrl: "https://thegraph.example.com/admin",
      removedSubgraphName: "subgraph1",
    });
    expect(result).toEqual([
      "https://thegraph.example.com/subgraphs/name/subgraph2",
      "https://thegraph.example.com/subgraphs/name/subgraph3",
    ]);
  });
});
