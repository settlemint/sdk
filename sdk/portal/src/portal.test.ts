import { describe, expect, it } from "bun:test";
import { createPortalClient } from "./portal.js";

describe("createPortalClient", () => {
  it("should set headers correctly in server runtime", () => {
    const { client } = createPortalClient({
      instance: "https://portal.settlemint.com",
      runtime: "server",
      accessToken: "sm_aat_abc123", // Should match ApplicationAccessTokenSchema format
    });

    expect(client.requestConfig.headers).toEqual({
      "x-auth-token": "sm_aat_abc123",
    });
  });

  it("should set headers correctly in browser runtime", () => {
    const { client } = createPortalClient({
      instance: "https://portal.settlemint.com",
      runtime: "browser",
      accessToken: "sm_aat_abc123", // Should match ApplicationAccessTokenSchema format
    });

    expect(client.requestConfig.headers).toEqual({
      "x-auth-token": "sm_aat_abc123",
    });
  });
});
