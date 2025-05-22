import { describe, expect, it } from "bun:test";
import { appendHeaders } from "./headers.js";

describe("appendHeaders", () => {
  it("should append headers to an object", () => {
    const headers = { "Content-Type": "application/json" };
    const additionalHeaders = { Authorization: "Bearer token" };

    const result = appendHeaders(headers, additionalHeaders);

    expect(result).toEqual({
      "Content-Type": "application/json",
      Authorization: "Bearer token",
    });
  });

  it("should append headers to Headers instance", () => {
    const headers = new Headers({ "Content-Type": "application/json" });
    const additionalHeaders = { Authorization: "Bearer token" };

    const result = appendHeaders(headers, additionalHeaders);

    expect(result instanceof Headers).toBe(true);
    const entries = Array.from((result as Headers).entries());
    expect(entries).toEqual([
      ["authorization", "Bearer token"],
      ["content-type", "application/json"],
    ]);
  });

  it("should append headers to an array", () => {
    const headers = [["Content-Type", "application/json"]] as [string, string][];
    const additionalHeaders = { Authorization: "Bearer token" };

    const result = appendHeaders(headers, additionalHeaders);

    expect(result).toEqual([
      ["Content-Type", "application/json"],
      ["Authorization", "Bearer token"],
    ]);
  });

  it("should handle lazy headers function", () => {
    const headers = () => ({ "Content-Type": "application/json" });
    const additionalHeaders = { Authorization: "Bearer token" };

    const result = appendHeaders(headers, additionalHeaders);

    expect(result).toEqual({
      "Content-Type": "application/json",
      Authorization: "Bearer token",
    });
  });

  it("should filter out undefined values from additional headers", () => {
    const headers = { "Content-Type": "application/json" };
    const additionalHeaders = {
      Authorization: "Bearer token",
      "X-Custom-Header": undefined,
    };

    const result = appendHeaders(headers, additionalHeaders);

    expect(result).toEqual({
      "Content-Type": "application/json",
      Authorization: "Bearer token",
    });
    expect(result).not.toHaveProperty("X-Custom-Header");
  });

  it("should handle undefined headers", () => {
    const headers = undefined;
    const additionalHeaders = { Authorization: "Bearer token" };

    const result = appendHeaders(headers, additionalHeaders);

    expect(result).toEqual({
      Authorization: "Bearer token",
    });
  });
});
