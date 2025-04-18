import { describe, expect, it } from "bun:test";
import { createPortalClient } from "./portal.js";

describe("createPortalClient", () => {
  it("should set headers correctly", () => {
    const { client } = createPortalClient(
      {
        instance: "https://portal.settlemint.com",
        accessToken: "sm_aat_abc123", // Should match ApplicationAccessTokenSchema format
      },
      {
        headers: {
          "my-custom-header": "custom-header",
        },
      },
    );

    expect(client.requestConfig.headers).toEqual({
      "x-auth-token": "sm_aat_abc123",
      "my-custom-header": "custom-header",
    });
  });
});
