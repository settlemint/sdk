import { describe, expect, it } from "bun:test";
import { appendHeaders } from "./headers.js";

describe("appendHeaders", () => {
  it("should append headers to an object", () => {
    const headers = { "Content-Type": "application/json" };
    const additionalHeaders = { Accept: "application/json" };

    const result = appendHeaders(headers, additionalHeaders);

    expect(result).toEqual({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
  });

  it("should append headers to Headers instance", () => {
    const headers = new Headers({ "Content-Type": "application/json" });
    const additionalHeaders = { Accept: "application/json" };

    const result = appendHeaders(headers, additionalHeaders);

    expect(result instanceof Headers).toBe(true);
    const entries = Array.from((result as Headers).entries());
    expect(entries).toEqual([
      ["accept", "application/json"],
      ["content-type", "application/json"],
    ]);
  });

  it("should append headers to an array", () => {
    const headers = [["Content-Type", "application/json"]] as [string, string][];
    const additionalHeaders = { Accept: "application/json" };

    const result = appendHeaders(headers, additionalHeaders);

    expect(result).toEqual([
      ["Content-Type", "application/json"],
      ["Accept", "application/json"],
    ]);
  });

  it("should handle lazy headers function", () => {
    const headers = () => ({ "Content-Type": "application/json" });
    const additionalHeaders = { Accept: "application/json" };

    const result = appendHeaders(headers, additionalHeaders);

    expect(result).toEqual({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
  });

  it("should filter out undefined values from additional headers", () => {
    const headers = { "Content-Type": "application/json" };
    const additionalHeaders = {
      Accept: "application/json",
      "X-Custom-Header": undefined,
    };

    const result = appendHeaders(headers, additionalHeaders);

    expect(result).toEqual({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    expect(result).not.toHaveProperty("X-Custom-Header");
  });

  it("should handle undefined headers", () => {
    const headers = undefined;
    const additionalHeaders = { Accept: "application/json" };

    const result = appendHeaders(headers, additionalHeaders);

    expect(result).toEqual({
      Accept: "application/json",
    });
  });
});
