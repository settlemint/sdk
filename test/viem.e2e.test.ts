import { describe, expect, test } from "bun:test";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { WalletVerificationType, getChainId, getPublicClient, getWalletClient } from "@settlemint/sdk-viem";
import { parseAbi } from "viem";

describe("Viem E2E Tests", () => {
  test("can create a public client", async () => {
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

  test("can create a wallet client", async () => {
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
    const transactionHash = await walletClient().simulateContract({
      address: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
      abi: parseAbi(["function mint(uint32 tokenId) nonpayable"]),
      functionName: "mint",
      args: [69420],
    });
    expect(transactionHash).toBeDefined();
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

  test("can execute custom json rpc methods", async () => {
    const env = await loadEnv(false, false);
    const settlemint = createSettleMintClient({
      accessToken: process.env.SETTLEMINT_ACCESS_TOKEN_E2E_TESTS!,
      instance: env.SETTLEMINT_INSTANCE!,
    });
    const walletClient = getWalletClient({
      accessToken: env.SETTLEMINT_ACCESS_TOKEN!,
      chainId: env.SETTLEMINT_BLOCKCHAIN_NETWORK_CHAIN_ID!,
      chainName: env.SETTLEMINT_BLOCKCHAIN_NETWORK!,
      rpcUrl: env.SETTLEMINT_BLOCKCHAIN_NODE_JSON_RPC_ENDPOINT!,
    });
    const privateKey = await settlemint.privateKey.read(env.SETTLEMINT_HD_PRIVATE_KEY!);
    const wallet = await walletClient().createWallet({
      keyVaultId: privateKey.uniqueName,
      walletInfo: {
        name: "test-wallet",
      },
    });
    expect(wallet).toBeArray();
    expect(wallet.length).toBe(1);
    const verifications = await walletClient().createWalletVerification({
      userWalletAddress: wallet[0]?.address!,
      walletVerificationInfo: {
        name: "pincode-verification",
        verificationType: WalletVerificationType.PINCODE,
        pincode: "123456",
      },
    });
    expect(verifications).toBeArray();
    expect(verifications.length).toBe(1);
    await walletClient().deleteWalletVerification({
      userWalletAddress: wallet[0]?.address!,
      verificationId: verifications[0]?.id!,
    });
    const updatedVerifications = await walletClient().getWalletVerifications({
      userWalletAddress: wallet[0]?.address!,
    });
    expect(updatedVerifications).toBeArray();
    expect(updatedVerifications.length).toBe(0);
  });

  test("can get the chain id", async () => {
    const env = await loadEnv(false, false);
    const chainId = await getChainId({
      accessToken: env.SETTLEMINT_ACCESS_TOKEN!,
      rpcUrl: env.SETTLEMINT_BLOCKCHAIN_NODE_JSON_RPC_ENDPOINT!,
    });
    expect(chainId).toBe(Number(env.SETTLEMINT_BLOCKCHAIN_NETWORK_CHAIN_ID));
  });
});
