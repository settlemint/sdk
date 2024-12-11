import { describe, expect, test } from "bun:test";
import { ApplicationAccessTokenSchema, PersonalAccessTokenSchema } from "./access-token.schema.js";

describe("ApplicationAccessTokenSchema", () => {
  test("should validate correct access token formats", () => {
    const validTokens = ["sm_aat_abc123", "sm_aat_xyz789"];

    for (const token of validTokens) {
      expect(ApplicationAccessTokenSchema.safeParse(token).success).toBe(true);
    }
  });
});

describe("PersonalAccessTokenSchema", () => {
  test("should validate correct access token formats", () => {
    const validTokens = ["sm_pat_abc123", "sm_pat_xyz789"];

    for (const token of validTokens) {
      expect(PersonalAccessTokenSchema.safeParse(token).success).toBe(true);
    }
  });
});
