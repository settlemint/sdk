import { describe, expect, it, mock } from "bun:test";
import { retryWhenFailed } from "./retry.js";

describe("retryWhenFailed", () => {
  it("should return result on successful execution", async () => {
    const fn = mock(() => Promise.resolve("success"));
    const result = await retryWhenFailed(fn);
    expect(result).toBe("success");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should retry on failure up to max retries", async () => {
    const fn = mock()
      .mockImplementationOnce(() => Promise.reject(new Error("fail1")))
      .mockImplementationOnce(() => Promise.reject(new Error("fail2")))
      .mockImplementation(() => Promise.resolve("success"));

    const result = await retryWhenFailed(fn, 3, 10);
    expect(result).toBe("success");
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("should throw after max retries exceeded", async () => {
    const error = new Error("test error");
    const fn = mock(() => Promise.reject(error));

    expect(retryWhenFailed(fn, 3, 10)).rejects.toThrow(error);
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("should stop retrying when stopOnError returns true", async () => {
    const error = new Error("stop error");
    const fn = mock(() => Promise.reject(error));
    const stopOnError = mock(() => true);

    expect(retryWhenFailed(fn, 3, 10, stopOnError)).rejects.toThrow(error);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(stopOnError).toHaveBeenCalledWith(error);
  });

  it("should continue retrying when stopOnError returns false", async () => {
    const fn = mock()
      .mockImplementationOnce(() => Promise.reject(new Error("fail1")))
      .mockImplementationOnce(() => Promise.reject(new Error("fail2")))
      .mockImplementation(() => Promise.resolve("success"));
    const stopOnError = mock(() => false);

    const result = await retryWhenFailed(fn, 3, 10, stopOnError);
    expect(result).toBe("success");
    expect(fn).toHaveBeenCalledTimes(3);
    expect(stopOnError).toHaveBeenCalledTimes(2);
  });

  it(
    "should retry with exponential backoff and not exceed 30 seconds",
    async () => {
      const start = Date.now();
      let attempt = 0;
      const fn = mock(() => {
        const elapsed = Date.now() - start;
        attempt += 1;
        // With initial sleep of 1000ms, exponential backoff should result in delays of:
        // 1st retry: ~1000ms * 2^1 * jitter = 0-2000ms
        // 2nd retry: ~1000ms * 2^2 * jitter = 0-4000ms
        // 3rd retry: ~1000ms * 2^3 * jitter = 0-8000ms
        // 4th retry: ~1000ms * 2^4 * jitter = 0-16000ms
        // 5th retry: ~1000ms * 2^5 * jitter = 0-32000ms
        expect(elapsed).toBeLessThan(2000 * 2 ** attempt);
        return Promise.reject(new Error("fail"));
      });
      expect(retryWhenFailed(fn)).rejects.toThrow();
      expect(fn).toHaveBeenCalledTimes(5);
      expect(Date.now() - start).toBeLessThan(30_000);
    },
    { timeout: 30_000 },
  );
});
