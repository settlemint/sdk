import { describe, expect, it } from "bun:test";
import { ClientOptionsSchema, GetChainIdOptionsSchema, getWalletClient, WalletVerificationType } from "./viem.js";

describe("ClientOptionsSchema", () => {
  const generateTestToken = () => `sm_aat_${Math.random().toString(36).substring(2, 15)}`;

  it("should validate valid options", () => {
    const validOptions = {
      accessToken: generateTestToken(),
      chainId: "1",
      chainName: "Ethereum",
      rpcUrl: "https://rpc.example.com",
    };

    const result = ClientOptionsSchema.safeParse(validOptions);
    expect(result.success).toBe(true);
  });

  it("should validate options without access token", () => {
    const validOptions = {
      chainId: "1",
      chainName: "Ethereum",
      rpcUrl: "https://rpc.example.com",
    };

    const result = ClientOptionsSchema.safeParse(validOptions);
    expect(result.success).toBe(true);
  });

  it("should reject invalid RPC URL", () => {
    const invalidOptions = {
      accessToken: generateTestToken(),
      chainId: "1",
      chainName: "Ethereum",
      rpcUrl: "not-a-url",
    };

    const result = ClientOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });

  it("should reject missing required fields", () => {
    const invalidOptions = {
      accessToken: generateTestToken(),
    };

    const result = ClientOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });
});

describe("GetChainIdOptionsSchema", () => {
  const generateTestToken = () => `sm_aat_${Math.random().toString(36).substring(2, 15)}`;

  it("should validate valid options", () => {
    const validOptions = {
      accessToken: generateTestToken(),
      rpcUrl: "https://rpc.example.com",
    };

    const result = GetChainIdOptionsSchema.safeParse(validOptions);
    expect(result.success).toBe(true);
  });

  it("should validate options without access token", () => {
    const validOptions = {
      rpcUrl: "https://rpc.example.com",
    };

    const result = GetChainIdOptionsSchema.safeParse(validOptions);
    expect(result.success).toBe(true);
  });

  it("should reject invalid RPC URL", () => {
    const invalidOptions = {
      rpcUrl: "not-a-url",
    };

    const result = GetChainIdOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });
});

describe("getWalletClient verification proof headers", () => {
  interface CapturedRequest {
    method: string;
    headers: Headers;
  }

  const userWalletAddress = "0x0000000000000000000000000000000000000001";

  // Each test gets its own RPC URL so the cached client factory never reuses another test's fetch mock
  const createClient = (rpcUrl: string, requests: CapturedRequest[]) =>
    getWalletClient({
      chainId: "46040",
      chainName: "proof-headers-test",
      rpcUrl,
      httpTransportConfig: {
        fetchFn: async (input, init) => {
          const request = new Request(input, init);
          const body = (await request.json()) as { id: number; method: string };
          requests.push({ method: body.method, headers: request.headers });
          const result = body.method === "user_deleteWalletVerification" ? [{ success: true }] : [];
          return new Response(JSON.stringify({ jsonrpc: "2.0", id: body.id, result }), {
            headers: { "Content-Type": "application/json" },
          });
        },
      },
    });

  it("sends the challenge proof headers with createWalletVerification", async () => {
    const requests: CapturedRequest[] = [];
    const walletClient = createClient("https://proof-create.example.com", requests);

    await walletClient({ challengeId: "challenge-1", challengeResponse: "response-1" }).createWalletVerification({
      userWalletAddress,
      walletVerificationInfo: {
        name: "pincode",
        verificationType: WalletVerificationType.PINCODE,
        pincode: "123456",
      },
    });

    expect(requests).toHaveLength(1);
    expect(requests[0]?.method).toBe("user_createWalletVerification");
    expect(requests[0]?.headers.get("x-auth-challenge-id")).toBe("challenge-1");
    expect(requests[0]?.headers.get("x-auth-challenge-response")).toBe("response-1");
  });

  it("sends the challenge proof headers with deleteWalletVerification", async () => {
    const requests: CapturedRequest[] = [];
    const walletClient = createClient("https://proof-delete.example.com", requests);

    await walletClient({ challengeId: "challenge-2", challengeResponse: "response-2" }).deleteWalletVerification({
      userWalletAddress,
      verificationId: "verification-1",
    });

    expect(requests).toHaveLength(1);
    expect(requests[0]?.method).toBe("user_deleteWalletVerification");
    expect(requests[0]?.headers.get("x-auth-challenge-id")).toBe("challenge-2");
    expect(requests[0]?.headers.get("x-auth-challenge-response")).toBe("response-2");
  });

  it("sends no challenge proof headers when no proof is given", async () => {
    const requests: CapturedRequest[] = [];
    const walletClient = createClient("https://proof-none.example.com", requests);

    await walletClient().deleteWalletVerification({
      userWalletAddress,
      verificationId: "verification-1",
    });

    expect(requests).toHaveLength(1);
    expect(requests[0]?.headers.has("x-auth-challenge-id")).toBe(false);
    expect(requests[0]?.headers.has("x-auth-challenge-response")).toBe(false);
  });
});
