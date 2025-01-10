import { describe, expect, test } from "bun:test";
import { join } from "node:path";
import { projectRoot } from "./project-root.js";

const utilsPackagePath = join(__dirname, "..", "..");
const sdkPackagePath = join(utilsPackagePath, "..", "..");

describe("projectRoot", () => {
  test("should find utils package from this test file", async () => {
    expect(await projectRoot(false, __dirname)).toBe(utilsPackagePath);
  });

  test("should find sdk package from utils package root", async () => {
    expect(await projectRoot(false, utilsPackagePath)).toBe(sdkPackagePath);
  });
});
