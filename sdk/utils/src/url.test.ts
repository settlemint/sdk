import { describe, expect, test } from "bun:test";
import { extractBaseUrlBeforeSegment } from "./url.js";

describe("extractBaseUrlBeforeSegment", () => {
  test("returns base URL before the segment when segment exists", () => {
    const url = "https://example.com/api/v1/subgraphs/name/my-subgraph";
    const segment = "/subgraphs";
    const result = extractBaseUrlBeforeSegment(url, segment);
    expect(result).toBe("https://example.com/api/v1");
  });

  test("returns full URL if segment does not exist", () => {
    const url = "https://example.com/api/v1/otherpath/name/my-subgraph";
    const segment = "/subgraphs";
    const result = extractBaseUrlBeforeSegment(url, segment);
    expect(result).toBe("https://example.com/api/v1/otherpath/name/my-subgraph");
  });

  test("returns origin if segment is at the start of the path", () => {
    const url = "https://example.com/subgraphs/name/my-subgraph";
    const segment = "/subgraphs";
    const result = extractBaseUrlBeforeSegment(url, segment);
    expect(result).toBe("https://example.com");
  });

  test("works with URLs with query and hash", () => {
    const url = "https://example.com/api/v1/subgraphs/name/my-subgraph?foo=bar#baz";
    const segment = "/subgraphs";
    const result = extractBaseUrlBeforeSegment(url, segment);
    expect(result).toBe("https://example.com/api/v1");
  });

  test("returns origin if path is just the segment", () => {
    const url = "https://example.com/subgraphs";
    const segment = "/subgraphs";
    const result = extractBaseUrlBeforeSegment(url, segment);
    expect(result).toBe("https://example.com");
  });

  test("returns correct base for nested segment", () => {
    const url = "https://example.com/api/v1/foo/subgraphs/bar";
    const segment = "/subgraphs";
    const result = extractBaseUrlBeforeSegment(url, segment);
    expect(result).toBe("https://example.com/api/v1/foo");
  });

  test("returns full URL if segment is empty", () => {
    const url = "https://example.com/api/v1/subgraphs/name/my-subgraph";
    const segment = "";
    const result = extractBaseUrlBeforeSegment(url, segment);
    expect(result).toBe("https://example.com/api/v1/subgraphs/name/my-subgraph");
  });
});
