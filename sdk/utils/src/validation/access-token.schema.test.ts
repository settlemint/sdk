import { describe, expect, test } from "bun:test";
import { AccessTokenSchema } from "./access-token.schema.js";

describe("AccessTokenSchema", () => {
  test("should validate correct access token formats", () => {
    const validTokens = ["sm_pat_abc123", "sm_pat_xyz789"];

    for (const token of validTokens) {
      expect(AccessTokenSchema.safeParse(token).success).toBe(true);
    }
  });
});
