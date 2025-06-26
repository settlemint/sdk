import { afterEach, describe, expect, it, spyOn } from "bun:test";
import { createLogger } from "./logger.js";
import { requestLogger } from "./request-logger.js";

describe("requestLogger", () => {
  const logger = createLogger({ level: "info" });
  const infoSpy = spyOn(console, "info");
  const warningSpy = spyOn(console, "warn");

  afterEach(() => {
    infoSpy.mockClear();
    warningSpy.mockClear();
  });

  it("should log start and end of function execution", async () => {
    const testFn = async (_url: string) => new Response("test result");
    const wrappedFn = requestLogger(logger, "TestFunction", testFn as typeof fetch);

    const result = await wrappedFn("https://example.com");

    expect(await result.text()).toBe("test result");
    expect(infoSpy).toHaveBeenCalledTimes(1);
    expect(infoSpy.mock.calls[0]?.[0]).toMatch(/TestFunction path: https:\/\/example\.com, took \d+ms/);
  });

  it("should log execution time in milliseconds for quick functions", async () => {
    const quickFn = async (_url: string) => new Response("quick");
    const wrappedFn = requestLogger(logger, "QuickFunction", quickFn as typeof fetch);

    await wrappedFn("https://example.com");

    const logMessage = infoSpy.mock.calls[0]?.[0];
    expect(logMessage).toMatch(/took \d+ms/);
  });

  it("should log execution time in seconds and a warning for slow functions", async () => {
    const slowFn = async (_url: string) => {
      await new Promise((resolve) => setTimeout(resolve, 1001));
      return new Response("slow");
    };
    const wrappedFn = requestLogger(logger, "SlowFunction", slowFn as typeof fetch);

    await wrappedFn("https://example.com");

    const logMessage = warningSpy.mock.calls[0]?.[0];
    expect(logMessage).toMatch(/took \d+\.\d{3}s/);
    expect(infoSpy).not.toHaveBeenCalled();
  });

  it("should handle errors and still log execution time", async () => {
    const errorFn = async (_url: string) => {
      throw new Error("Test error");
    };
    const wrappedFn = requestLogger(logger, "ErrorFunction", errorFn as unknown as typeof fetch);

    expect(wrappedFn("https://example.com")).rejects.toThrow("Test error");

    expect(infoSpy).toHaveBeenCalledTimes(1);
    expect(infoSpy.mock.calls[0]?.[0]).toContain("ErrorFunction path: https://example.com, took");
  });

  it("should pass arguments to the wrapped function", async () => {
    const argFn = async (_url: string, options?: RequestInit) => {
      const { a, b } = options?.body ? JSON.parse(options.body as string) : { a: 0, b: "" };
      return new Response(`${a}-${b}`);
    };
    const wrappedFn = requestLogger(logger, "ArgFunction", argFn as typeof fetch);

    const result = await wrappedFn("https://example.com", {
      method: "POST",
      body: JSON.stringify({ a: 42, b: "test" }),
    });

    expect(await result.text()).toBe("42-test");

    expect(infoSpy).toHaveBeenCalledTimes(1);
    expect(infoSpy.mock.calls[0]?.[0]).toMatch(
      /ArgFunction path: https:\/\/example\.com, took \d+ms, args: {"a":42,"b":"test"}/,
    );
  });

  it("should truncate graphql request data", async () => {
    const graphqlFn = async (_url: string) => {
      return new Response("graphql-test");
    };
    const wrappedFn = requestLogger(logger, "GraphqlFunction", graphqlFn as typeof fetch);

    const result = await wrappedFn("https://example.com", {
      method: "POST",
      body: JSON.stringify({
        query:
          "query GetTransactionDetails($hash: String!, $blockNumber: Int) { transaction(hash: $hash, blockNumber: $blockNumber) { id blockNumber timestamp value gasPrice gasUsed status from { address } to { address } logs { topics data } } }",
        variables: {
          hash: "0x123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123a",
          blockNumber: 1234567890,
        },
        operationName: "GetTransactionDetails",
        notRelevant: "notRelevant",
      }),
    });

    expect(await result.text()).toBe("graphql-test");
    expect(infoSpy).toHaveBeenCalledTimes(1);
    expect(infoSpy.mock.calls[0]?.[0]).toMatch(
      /GraphqlFunction path: https:\/\/example\.com, took \d+ms, args: {"query":"query GetTransactionDetails\(\$hash: String!, \$block...","variables":"\{\\"hash\\":\\"0x123abc123abc123abc123abc123abc123abc123...","operationName":"GetTransactionDetails"}/,
    );
  });
});
