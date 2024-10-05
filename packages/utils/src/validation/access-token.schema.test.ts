import { describe, expect, test } from "bun:test";
import { AccessTokenSchema } from "./access-token.schema.js";

describe("AccessTokenSchema", () => {
  test("should validate correct access token formats", () => {
    const validTokens = ["btp_pat_abc123", "btp_aat_xyz789"];

    for (const token of validTokens) {
      expect(AccessTokenSchema.safeParse(token).success).toBe(true);
    }
  });

  test("should reject invalid access token formats", () => {
    const invalidTokens = ["invalid_token", "btp_invalid_abc123", "btp_pat_", "btp_aat_", "", 123, null, undefined];

    for (const token of invalidTokens) {
      expect(AccessTokenSchema.safeParse(token).success).toBe(false);
    }
  });
});
