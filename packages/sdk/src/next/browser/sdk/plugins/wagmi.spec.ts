import { beforeAll, describe, expect, mock, test } from "bun:test";
import type { Chain } from "viem";
import { createSettleMintWagmiConfig } from "./wagmi";

process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID = "mock-project-id";

describe("createSettleMintWagmiConfig", () => {
  let mockChain: Chain;
  let settleMintWagmiConfig: ReturnType<typeof createSettleMintWagmiConfig>;

  beforeAll(() => {
    mockChain = {
      id: 1,
      name: "Mock Chain",
      nativeCurrency: { name: "Mock", symbol: "MCK", decimals: 18 },
      rpcUrls: { default: { http: ["https://mock.rpc"] } },
    };
    settleMintWagmiConfig = createSettleMintWagmiConfig(mockChain);
  });

  test("should return a function", () => {
    expect(typeof settleMintWagmiConfig).toBe("function");
  });

  test("should generate valid wagmi and web3modal configs", () => {
    const result = settleMintWagmiConfig({
      wagmiConfig: {},
      web3ModalConfig: {
        metadata: {
          name: "Test App",
          description: "Test Description",
          icons: ["https://mock.icon"],
        },
      },
    });

    expect(result).toHaveProperty("wagmiConfig");
    expect(result).toHaveProperty("web3ModalConfig");
  });

  test("wagmiConfig should contain the provided chain", () => {
    const result = settleMintWagmiConfig({
      wagmiConfig: {},
      web3ModalConfig: {
        metadata: {
          name: "Test App",
          description: "Test Description",
          icons: ["https://mock.icon"],
        },
      },
    });

    expect(result.wagmiConfig.chains).toContain(mockChain);
  });

  test("web3ModalConfig should contain correct metadata", () => {
    const result = settleMintWagmiConfig({
      wagmiConfig: {},
      web3ModalConfig: {
        metadata: {
          name: "Test App",
          description: "Test Description",
          icons: ["https://mock.icon"],
        },
      },
    });

    expect(result.web3ModalConfig.metadata).toMatchObject({
      name: "Test App",
      description: "Test Description",
      url: process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL ?? "",
    });
  });

  test("should warn if WALLET_CONNECT_PROJECT_ID is not defined", () => {
    const originalWarn = console.warn;
    console.warn = mock(() => {});

    const originalProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
    // biome-ignore lint/performance/noDelete: <explanation>
    delete process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

    settleMintWagmiConfig({
      wagmiConfig: {},
      web3ModalConfig: {
        metadata: {
          name: "Test App",
          description: "Test Description",
          icons: ["https://mock.icon"],
        },
      },
    });

    expect(console.warn).toHaveBeenCalledWith(
      "Wallet Connect Project ID is not defined, add it to your .env.local file as NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID",
    );

    console.warn = originalWarn;
    process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID = originalProjectId;
  });
});
