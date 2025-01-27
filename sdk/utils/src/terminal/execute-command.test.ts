import { describe, expect, test } from "bun:test";
import { executeCommand } from "./execute-command.js";

describe("executeCommand", () => {
  test("executes command successfully", async () => {
    const output = await executeCommand("echo", ["hello"]);
    expect(output).toContain("hello\n");
  });
});
