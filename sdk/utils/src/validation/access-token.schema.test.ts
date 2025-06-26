import { describe, expect, test } from "bun:test";
import { AccessTokenSchema, ApplicationAccessTokenSchema, PersonalAccessTokenSchema } from "./access-token.schema.js";

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

describe("AccessTokenSchema", () => {
  test("should validate both personal and application access tokens", () => {
    const validTokens = ["sm_pat_abc123", "sm_pat_xyz789", "sm_aat_abc123", "sm_aat_xyz789", "sm_pat_", "sm_aat_"];

    for (const token of validTokens) {
      expect(AccessTokenSchema.safeParse(token).success).toBe(true);
    }
  });

  test("should reject invalid token formats", () => {
    const invalidTokens = [
      "pat_abc123", // Missing sm_ prefix
      "sm_xyz_abc123", // Wrong token type
      "sm_patabc123", // Missing underscore after pat
      "sm_aatabc123", // Missing underscore after aat
      "abc_sm_pat_123", // Not starting with sm_pat_
      "abc_sm_aat_123", // Not starting with sm_aat_
      "sm_pat", // Missing trailing underscore
      "sm_aat", // Missing trailing underscore
      "", // Empty string
    ];

    for (const token of invalidTokens) {
      expect(AccessTokenSchema.safeParse(token).success).toBe(false);
    }
  });
});
