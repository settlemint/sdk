import { describe, expect, test } from "bun:test";
import { LOCAL_INSTANCE, STANDALONE_INSTANCE } from "@settlemint/sdk-utils/validation";
import { sanitizeInstanceUrl } from "./instance-url-utils";

describe("sanitizeInstanceUrl", () => {
  test("removes trailing slashes", () => {
    expect(sanitizeInstanceUrl("https://test.settlemint.com/")).toBe("https://test.settlemint.com");
    expect(sanitizeInstanceUrl("https://test.settlemint.com///")).toBe("https://test.settlemint.com");
  });

  test("removes whitespace", () => {
    expect(sanitizeInstanceUrl(" https://test.settlemint.com ")).toBe("https://test.settlemint.com");
    expect(sanitizeInstanceUrl("\thttps://test.settlemint.com\n")).toBe("https://test.settlemint.com");
  });

  test("preserves valid URLs without modification", () => {
    expect(sanitizeInstanceUrl("https://test.settlemint.com")).toBe("https://test.settlemint.com");
    expect(sanitizeInstanceUrl("http://localhost:3000")).toBe("http://localhost:3000");
  });

  test("removes URL paths and query parameters", () => {
    expect(sanitizeInstanceUrl("https://test.settlemint.com/path?query=1")).toBe("https://test.settlemint.com");
    expect(sanitizeInstanceUrl("https://test.settlemint.com/path/ ")).toBe("https://test.settlemint.com");
  });

  test("handles special instance values", () => {
    expect(sanitizeInstanceUrl(STANDALONE_INSTANCE)).toBe(STANDALONE_INSTANCE);
    expect(sanitizeInstanceUrl(LOCAL_INSTANCE)).toBe(LOCAL_INSTANCE);
  });
});
