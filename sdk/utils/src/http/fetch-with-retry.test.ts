import { beforeEach, describe, expect, it, mock } from "bun:test";
import { fetchWithRetry } from "./fetch-with-retry.js";

// Mock the global fetch - disable linting for test mocking
const mockFetch = mock(() => Promise.resolve(new Response()));
// biome-ignore lint/suspicious/noExplicitAny: Required for test mocking
(global as any).fetch = mockFetch;

describe("fetchWithRetry", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("should return response on successful request", async () => {
    const mockResponse = new Response("success", { status: 200 });
    mockFetch.mockResolvedValueOnce(mockResponse);

    const result = await fetchWithRetry("https://api.example.com");

    expect(result).toBe(mockResponse);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith("https://api.example.com", undefined);
  });

  it("should return response on 4xx error (no retry)", async () => {
    const mockResponse = new Response("not found", { status: 404, statusText: "Not Found" });
    mockFetch.mockResolvedValueOnce(mockResponse);

    const result = await fetchWithRetry("https://api.example.com");

    expect(result).toBe(mockResponse);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should pass through request init options", async () => {
    const mockResponse = new Response("success", { status: 200 });
    mockFetch.mockResolvedValueOnce(mockResponse);

    const init: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: "test" }),
    };

    await fetchWithRetry("https://api.example.com", init);

    expect(mockFetch).toHaveBeenCalledWith("https://api.example.com", init);
  });

  it("should work with URL object", async () => {
    const mockResponse = new Response("success", { status: 200 });
    mockFetch.mockResolvedValueOnce(mockResponse);

    const url = new URL("https://api.example.com/endpoint");
    await fetchWithRetry(url);

    expect(mockFetch).toHaveBeenCalledWith(url, undefined);
  });
});
