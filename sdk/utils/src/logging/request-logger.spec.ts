import { afterEach, describe, expect, it, spyOn } from "bun:test";
import { createLogger } from "./logger.js";
import { requestLogger } from "./request-logger.js";

describe("requestLogger", () => {
  const infoSpy = spyOn(console, "info");
  const warningSpy = spyOn(console, "warn");

  afterEach(() => {
    infoSpy.mockClear();
    warningSpy.mockClear();
  });

  it("should log start and end of function execution", async () => {
    const logger = createLogger();
    const testFn = async (url: string) => new Response("test result");
    const wrappedFn = requestLogger(logger, "TestFunction", testFn as typeof fetch);

    const result = await wrappedFn("https://example.com");

    expect(await result.text()).toBe("test result");
    expect(infoSpy).toHaveBeenCalledTimes(1);
    expect(infoSpy.mock.calls[0]?.[0]).toContain("TestFunction path: https://example.com, body: {}, took");
  });

  it("should log execution time in milliseconds for quick functions", async () => {
    const logger = createLogger();
    const quickFn = async (url: string) => new Response("quick");
    const wrappedFn = requestLogger(logger, "QuickFunction", quickFn as typeof fetch);

    await wrappedFn("https://example.com");

    const logMessage = infoSpy.mock.calls[0]?.[0];
    expect(logMessage).toMatch(/took \d+ms/);
  });

  it("should log execution time in seconds and a warning for slow functions", async () => {
    const logger = createLogger();
    const slowFn = async (url: string) => {
      await new Promise((resolve) => setTimeout(resolve, 3001));
      return new Response("slow");
    };
    const wrappedFn = requestLogger(logger, "SlowFunction", slowFn as typeof fetch);

    await wrappedFn("https://example.com");

    const logMessage = warningSpy.mock.calls[0]?.[0];
    expect(logMessage).toMatch(/took \d+\.\d{3}s/);
    expect(infoSpy).not.toHaveBeenCalled();
  });

  it("should handle errors and still log execution time", async () => {
    const logger = createLogger();
    const errorFn = async (url: string) => {
      throw new Error("Test error");
    };
    const wrappedFn = requestLogger(logger, "ErrorFunction", errorFn as unknown as typeof fetch);

    expect(wrappedFn("https://example.com")).rejects.toThrow("Test error");

    expect(infoSpy).toHaveBeenCalledTimes(1);
    expect(infoSpy.mock.calls[0]?.[0]).toContain("ErrorFunction path: https://example.com, body: {}, took");
  });

  it("should pass arguments to the wrapped function", async () => {
    const logger = createLogger();
    const argFn = async (url: string, options?: RequestInit) => {
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
    expect(infoSpy.mock.calls[0]?.[0]).toContain(
      'ArgFunction path: https://example.com, body: {"a":42,"b":"test"}, took',
    );
  });
});
