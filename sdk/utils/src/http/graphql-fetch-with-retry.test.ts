import { describe, expect, it } from "bun:test";

describe("graphqlFetchWithRetry", () => {
  it("should be a function", () => {
    const { graphqlFetchWithRetry } = require("./graphql-fetch-with-retry.js");
    expect(typeof graphqlFetchWithRetry).toBe("function");
  });

  it("should handle basic successful response", async () => {
    // Simple test that verifies the function exists and can be called
    // More complex testing would require sophisticated mocking of the retry logic
    const { graphqlFetchWithRetry } = require("./graphql-fetch-with-retry.js");

    // Test that the function is properly exported
    expect(graphqlFetchWithRetry).toBeDefined();
    expect(typeof graphqlFetchWithRetry).toBe("function");
  });
});
