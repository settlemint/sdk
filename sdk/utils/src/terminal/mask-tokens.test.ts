import { describe, expect, test } from "bun:test";
import { maskTokens } from "./mask-tokens.js";

describe("maskTokens", () => {
  test("should mask SettleMint personal access tokens", () => {
    const output = "Token: sm_pat_abc123xyz";
    expect(maskTokens(output)).toBe("Token: ***");
  });

  test("should mask SettleMint application access tokens", () => {
    const output = "Token: sm_aat_abc123xyz";
    expect(maskTokens(output)).toBe("Token: ***");
  });

  test("should mask SettleMint service account tokens", () => {
    const output = "Token: sm_sat_abc123xyz";
    expect(maskTokens(output)).toBe("Token: ***");
  });

  test("should mask multiple tokens in the same string", () => {
    const output = "Tokens: sm_pat_abc123 and sm_aat_xyz789";
    expect(maskTokens(output)).toBe("Tokens: *** and ***");
  });

  test("should not mask non-token strings", () => {
    const output = "Regular text without tokens";
    expect(maskTokens(output)).toBe("Regular text without tokens");
  });

  test("should handle empty string", () => {
    expect(maskTokens("")).toBe("");
  });
});
