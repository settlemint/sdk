import { describe, expect, test } from "bun:test";
import { sanitizeName } from "./sanitize-name";

describe("sanitizeName", () => {
  test("removes special characters", () => {
    expect(sanitizeName("Hello!@#$%^&*()_+")).toBe("hellodollarpercentand");
  });

  test("converts to lowercase", () => {
    expect(sanitizeName("HelloWorld")).toBe("helloworld");
  });

  test("replaces spaces with dashes", () => {
    expect(sanitizeName("Hello World")).toBe("hello-world");
  });

  test("removes leading numbers", () => {
    expect(sanitizeName("123Hello")).toBe("hello");
  });

  test("removes trailing dashes", () => {
    expect(sanitizeName("hello-")).toBe("hello");
  });

  test("removes leading dashes", () => {
    expect(sanitizeName("-hello")).toBe("hello");
  });

  test("respects max length", () => {
    const longString = "this-is-a-very-long-string-that-should-be-truncated";
    expect(sanitizeName(longString, 20)).toBe("this-is-a-very-long");
  });

  test("handles empty strings", () => {
    expect(sanitizeName("")).toBe("");
  });

  test("handles strings with only special characters", () => {
    expect(sanitizeName("!@#$%^&*()")).toBe("dollarpercentand");
  });

  test("handles strings with only numbers", () => {
    expect(sanitizeName("12345")).toBe("");
  });
});
