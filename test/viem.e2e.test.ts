import { describe, expect, test } from "bun:test";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { getPublicClient, getWalletClient } from "@settlemint/sdk-viem";
import { parseAbi } from "viem";

describe("Viem E2E Tests", () => {
  test("should generate a public client", async () => {
    const env = await loadEnv(false, false);
    const publicClient = getPublicClient({
      accessToken: env.SETTLEMINT_ACCESS_TOKEN!,
      chainId: env.SETTLEMINT_BLOCKCHAIN_NETWORK_CHAIN_ID!,
      chainName: env.SETTLEMINT_BLOCKCHAIN_NETWORK!,
      rpcUrl: env.SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER_JSON_RPC_ENDPOINT!,
    });
    expect(publicClient).toBeDefined();
    const block = await publicClient.getBlockNumber();
    expect(block).toBeGreaterThan(0);
    const transactionHash = await publicClient.simulateContract({
      address: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
      abi: parseAbi(["function mint(uint32 tokenId) nonpayable"]),
      functionName: "mint",
      args: [69420],
    });
    expect(transactionHash).toBeDefined();
  });

  test("should generate a wallet client", async () => {
    const env = await loadEnv(false, false);
    const walletClient = getWalletClient({
      accessToken: env.SETTLEMINT_ACCESS_TOKEN!,
      chainId: env.SETTLEMINT_BLOCKCHAIN_NETWORK_CHAIN_ID!,
      chainName: env.SETTLEMINT_BLOCKCHAIN_NETWORK!,
      rpcUrl: env.SETTLEMINT_BLOCKCHAIN_NODE_JSON_RPC_ENDPOINT!,
    });
    expect(walletClient).toBeFunction();
    const chainId = await walletClient().getChainId();
    expect(chainId).toEqual(Number(env.SETTLEMINT_BLOCKCHAIN_NETWORK_CHAIN_ID));
    try {
      await walletClient({
        verificationId: "123",
        challengeResponse: "456",
      }).writeContract({
        account: "0x0000000000000000000000000000000000000000",
        address: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        abi: parseAbi(["function mint(uint32 tokenId) nonpayable"]),
        functionName: "mint",
        args: [69420],
      });
      // If we get here, the test has failed
      expect(false).toBe(true);
    } catch (err) {
      const error = err as Error;
      expect(error.message).toContain("Requested resource not found");
    }
  });
});
