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

  it("should retry on 5xx server errors", async () => {
    const errorResponse = new Response("Server Error", { status: 500, statusText: "Internal Server Error" });
    const successResponse = new Response("success", { status: 200 });

    mockFetch.mockResolvedValueOnce(errorResponse);
    mockFetch.mockResolvedValueOnce(successResponse);

    const result = await fetchWithRetry("https://api.example.com", undefined, 3, 10);

    expect(result).toBe(successResponse);
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it("should retry on 429 rate limit errors", async () => {
    const rateLimitResponse = new Response("Too Many Requests", { status: 429, statusText: "Too Many Requests" });
    const successResponse = new Response("success", { status: 200 });

    mockFetch.mockResolvedValueOnce(rateLimitResponse);
    mockFetch.mockResolvedValueOnce(successResponse);

    const result = await fetchWithRetry("https://api.example.com", undefined, 3, 10);

    expect(result).toBe(successResponse);
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it("should retry on network errors", async () => {
    const networkError = new Error("Network error");
    const successResponse = new Response("success", { status: 200 });

    mockFetch.mockRejectedValueOnce(networkError);
    mockFetch.mockResolvedValueOnce(successResponse);

    const result = await fetchWithRetry("https://api.example.com", undefined, 3, 10);

    expect(result).toBe(successResponse);
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it("should retry on timeout errors (408)", async () => {
    const timeoutResponse = new Response("Request Timeout", { status: 408, statusText: "Request Timeout" });
    const successResponse = new Response("success", { status: 200 });

    mockFetch.mockResolvedValueOnce(timeoutResponse);
    mockFetch.mockResolvedValueOnce(successResponse);

    const result = await fetchWithRetry("https://api.example.com", undefined, 3, 10);

    expect(result).toBe(successResponse);
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it("should throw error after max retries exceeded", async () => {
    const errorResponse = new Response("Server Error", { status: 500, statusText: "Internal Server Error" });
    mockFetch.mockResolvedValue(errorResponse);

    await expect(fetchWithRetry("https://api.example.com", undefined, 2, 10)).rejects.toThrow(
      "HTTP error! status: 500 Internal Server Error",
    );
    expect(mockFetch).toHaveBeenCalledTimes(3); // initial + 2 retries
  });
});
