import { describe, expect, test } from "bun:test";
import { createSettleMintViemConfig } from "./viem";

describe("createSettleMintViemConfig", () => {
  const mockChain = {
    id: 1,
    name: "Ethereum",
    network: "mainnet",
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    rpcUrls: {
      default: { http: ["https://ethereum.rpc.url"] },
    },
  };

  test("returns a function", () => {
    const result = createSettleMintViemConfig(mockChain);
    expect(typeof result).toBe("function");
  });

  test("returned function generates correct Viem configuration", () => {
    const configFunction = createSettleMintViemConfig(mockChain);
    const config = configFunction({});

    expect(config).toEqual({
      chain: mockChain,
      transport: expect.any(Function),
    });
  });

  test("passes through additional parameters", () => {
    const configFunction = createSettleMintViemConfig(mockChain);
    const config = configFunction({
      pollingInterval: 4000,
    });

    expect(config).toEqual({
      chain: mockChain,
      transport: expect.any(Function),
      pollingInterval: 4000,
    });
  });
});
