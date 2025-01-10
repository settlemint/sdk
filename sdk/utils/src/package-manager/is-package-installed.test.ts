import { describe, expect, test } from "bun:test";
import { join } from "node:path";
import { isPackageInstalled } from "./is-package-installed.js";

const monoRepoDir = join(__dirname, "..", "..", "..", "..");
const packageDir = join(__dirname, "..", "..");

describe("isPackageInstalled", () => {
  test("returns true when package is in dependencies", async () => {
    const result = await isPackageInstalled("is-in-ci", packageDir);
    expect(result).toBe(true);
  });

  test("returns true when package is in devDependencies", async () => {
    const result = await isPackageInstalled("knip", monoRepoDir);
    expect(result).toBe(true);
  });

  test("returns false when package is not installed", async () => {
    const result = await isPackageInstalled("dependency-pkg", monoRepoDir);
    expect(result).toBe(false);
  });
});
