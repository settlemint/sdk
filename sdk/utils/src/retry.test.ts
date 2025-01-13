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
});
