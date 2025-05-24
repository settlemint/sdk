import { describe, expect, it, mock } from "bun:test";
import { logger } from "./logging/logger.js";
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
      .mockImplementationOnce(() => Promise.reject(new Error("fail3")))
      .mockImplementation(() => Promise.resolve("success"));

    const result = await retryWhenFailed(fn, 3, 10);
    expect(result).toBe("success");
    expect(fn).toHaveBeenCalledTimes(4); // initial call + 3 retries
  });

  it("should throw after max retries exceeded", async () => {
    const error = new Error("test error");
    const fn = mock(() => Promise.reject(error));

    expect(retryWhenFailed(fn, 3, 10)).rejects.toThrow(error);
    expect(fn).toHaveBeenCalledTimes(4); // initial call + 3 retries
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
      const initialSleepTime = 1000;
      const dummyError = new Error("fail");
      let previousAttemptStart = Date.now();

      const fn = mock(() => {
        const elapsed = Date.now() - previousAttemptStart;
        previousAttemptStart = Date.now();
        const expectedTime = [
          // Initial attempt: No delay (0-100ms for test execution)
          {
            min: 0,
            max: 100,
          },
          // First retry: Base delay (1000ms) + jitter (0-100ms) + CI tolerance
          {
            min: 900,
            max: 1200,
          },
          // Second retry: 2x base delay (2000ms) + jitter (0-100ms) + CI tolerance
          {
            min: 1900,
            max: 2200,
          },
          // Third retry: 4x base delay (4000ms) + jitter (0-100ms) + CI tolerance
          {
            min: 3900,
            max: 4200,
          },
          // Fourth retry: 8x base delay (8000ms) + jitter (0-100ms) + CI tolerance
          {
            min: 7900,
            max: 8200,
          },
        ];
        try {
          expect(elapsed).toBeLessThanOrEqual(expectedTime.at(attempt)?.max ?? 0);
          expect(elapsed).toBeGreaterThanOrEqual(expectedTime.at(attempt)?.min ?? 0);
        } finally {
          attempt += 1;
        }
        return Promise.reject(dummyError);
      });
      await expect(
        retryWhenFailed(fn, 4, initialSleepTime, (err) => {
          const isDummyError = err === dummyError;
          if (!isDummyError) {
            logger.error(err.message, err.stack);
          }
          return !isDummyError;
        }),
      ).rejects.toThrow();
      expect(fn).toHaveBeenCalledTimes(5);
      expect(Date.now() - start).toBeLessThan(30_000);
    },
    { timeout: 30_000 },
  );
});
