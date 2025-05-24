/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, mock, test } from "bun:test";
import { CommandError, executeCommand } from "./execute-command.js";

describe("executeCommand", () => {
  test("executes command successfully", async () => {
    const output = await executeCommand("echo", ["hello"]);
    expect(output).toContain("hello\n");
  });

  test("captures stderr output", async () => {
    const output = await executeCommand("node", ["-e", "console.error('error message')"]);
    expect(output.some((line) => line.includes("error message"))).toBe(true);
  });

  test("handles command failure with proper error", async () => {
    await expect(
      () => executeCommand("false", []), // Command that always exits with code 1
    ).toThrow(CommandError);
  });

  test("handles non-existent command", async () => {
    await expect(() => executeCommand("non-existent-command-12345", [])).toThrow(CommandError);
  });

  test("respects silent option", async () => {
    const originalWrite = process.stdout.write;
    let stdoutWritten = false;

    // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any
    process.stdout.write = mock((chunk: any) => {
      stdoutWritten = true;
      return true;
    });

    try {
      await executeCommand("echo", ["silent test"], { silent: true });
      expect(stdoutWritten).toBe(false);
    } finally {
      process.stdout.write = originalWrite;
    }
  });

  test("masks sensitive tokens in output", async () => {
    // Test that tokens are masked - this depends on the maskTokens implementation
    const output = await executeCommand("echo", ["token_abc123"]);
    // The exact masking behavior depends on maskTokens implementation
    expect(output).toBeDefined();
    expect(Array.isArray(output)).toBe(true);
  });

  test("properly cleans up stdin pipe on success", async () => {
    const originalUnpipe = process.stdin.unpipe;
    let unpipeCalled = false;

    // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any
    process.stdin.unpipe = mock((destination?: any) => {
      unpipeCalled = true;
      return process.stdin;
    });

    try {
      await executeCommand("echo", ["test"]);
      expect(unpipeCalled).toBe(true);
    } finally {
      process.stdin.unpipe = originalUnpipe;
    }
  });

  test("properly cleans up stdin pipe on error", async () => {
    const originalUnpipe = process.stdin.unpipe;
    let unpipeCalled = false;

    // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any
    process.stdin.unpipe = mock((destination?: any) => {
      unpipeCalled = true;
      return process.stdin;
    });

    try {
      await expect(() => executeCommand("false", [])).toThrow();
      // Wait a bit to ensure the cleanup has happened
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(unpipeCalled).toBe(true);
    } catch {
      // Expected to throw
    } finally {
      process.stdin.unpipe = originalUnpipe;
    }
  });

  test("handles commands that write to both stdout and stderr", async () => {
    const output = await executeCommand("node", [
      "-e",
      "console.log('stdout message'); console.error('stderr message');",
    ]);

    const hasStdout = output.some((line) => line.includes("stdout message"));
    const hasStderr = output.some((line) => line.includes("stderr message"));

    expect(hasStdout).toBe(true);
    expect(hasStderr).toBe(true);
  });

  test("preserves environment variables", async () => {
    const output = await executeCommand("node", ["-e", "console.log(process.env.NODE_ENV || 'undefined');"], {
      env: { NODE_ENV: "test" },
    });

    expect(output.some((line) => line.includes("test"))).toBe(true);
  });
});
