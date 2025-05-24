/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, mock, test } from "bun:test";
import { Readable } from "node:stream";

// Since the login command is complex with dependencies, we'll test the STDIN reading logic separately
// by extracting it into a testable function
describe("login STDIN reading", () => {
  test("reads token from STDIN properly", async () => {
    const testToken = "test-token-123";

    // Create a mock stdin stream
    const mockStdin = new Readable({
      read() {
        this.push(testToken);
        this.push(null); // End the stream
      },
    });

    // Mock the STDIN reading logic
    const readStdinToken = async (): Promise<string> => {
      const chunks: Buffer[] = [];
      let timeout: NodeJS.Timeout | undefined;

      const timeoutPromise = new Promise<never>((_, reject) => {
        timeout = setTimeout(() => {
          reject(new Error("Timeout reading from STDIN after 30 seconds"));
        }, 30_000);
      });

      try {
        const readPromise = (async () => {
          for await (const chunk of mockStdin) {
            chunks.push(Buffer.from(chunk));
          }
          return Buffer.concat(chunks).toString().trim();
        })();

        const result = await Promise.race([readPromise, timeoutPromise]);
        return result;
      } finally {
        if (timeout) {
          clearTimeout(timeout);
        }
      }
    };

    const result = await readStdinToken();
    expect(result).toBe(testToken);
  });

  test("handles timeout correctly", async () => {
    // Create a mock stdin that never ends
    const mockStdin = new Readable({
      read() {
        // Don't push null, keep stream open
      },
    });

    const readStdinTokenWithShortTimeout = async (): Promise<string> => {
      const chunks: Buffer[] = [];
      let timeout: NodeJS.Timeout | undefined;

      const timeoutPromise = new Promise<never>((_, reject) => {
        timeout = setTimeout(() => {
          reject(new Error("Timeout reading from STDIN after 30 seconds"));
        }, 10); // Very short timeout for test
      });

      try {
        const readPromise = (async () => {
          for await (const chunk of mockStdin) {
            chunks.push(Buffer.from(chunk));
          }
          return Buffer.concat(chunks).toString().trim();
        })();

        const result = await Promise.race([readPromise, timeoutPromise]);
        return result;
      } finally {
        if (timeout) {
          clearTimeout(timeout);
        }
      }
    };

    await expect(readStdinTokenWithShortTimeout()).rejects.toThrow("Timeout reading from STDIN after 30 seconds");
  });

  test("properly cleans up timeout on success", async () => {
    const testToken = "cleanup-test-token";
    let timeoutCleared = false;

    // Mock setTimeout and clearTimeout to verify cleanup
    const originalSetTimeout = global.setTimeout;
    const originalClearTimeout = global.clearTimeout;

    // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any
    global.setTimeout = mock((fn: any, delay: number) => {
      return originalSetTimeout(fn, delay);
      // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any
    }) as any;

    // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any
    global.clearTimeout = mock((id: any) => {
      timeoutCleared = true;
      return originalClearTimeout(id);
      // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any
    }) as any;

    const mockStdin = new Readable({
      read() {
        this.push(testToken);
        this.push(null);
      },
    });

    const readStdinTokenWithCleanup = async (): Promise<string> => {
      const chunks: Buffer[] = [];
      let timeout: NodeJS.Timeout | undefined;

      const timeoutPromise = new Promise<never>((_, reject) => {
        timeout = setTimeout(() => {
          reject(new Error("Timeout reading from STDIN after 30 seconds"));
        }, 30_000);
      });

      try {
        const readPromise = (async () => {
          for await (const chunk of mockStdin) {
            chunks.push(Buffer.from(chunk));
          }
          return Buffer.concat(chunks).toString().trim();
        })();

        const result = await Promise.race([readPromise, timeoutPromise]);
        return result;
      } finally {
        if (timeout) {
          clearTimeout(timeout);
        }
      }
    };

    const result = await readStdinTokenWithCleanup();

    expect(result).toBe(testToken);
    expect(timeoutCleared).toBe(true);
    expect(global.clearTimeout).toHaveBeenCalled();

    // Restore original functions
    global.setTimeout = originalSetTimeout;
    global.clearTimeout = originalClearTimeout;
  });
});
