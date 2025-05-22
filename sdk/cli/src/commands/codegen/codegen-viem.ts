import { writeTemplate } from "@/commands/codegen/utils/write-template";
import { projectRoot } from "@settlemint/sdk-utils/filesystem";
import { installDependencies, isPackageInstalled } from "@settlemint/sdk-utils/package-manager";
import { note } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { getChainId } from "@settlemint/sdk-viem";

const PACKAGE_NAME = "@settlemint/sdk-viem";

export async function codegenViem(env: DotEnv) {
  const loadBalancerRpcEndpoint = env.SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER_JSON_RPC_ENDPOINT;
  const blockchainNodeRpcEndpoint = env.SETTLEMINT_BLOCKCHAIN_NODE_JSON_RPC_ENDPOINT;
  if (!loadBalancerRpcEndpoint && !blockchainNodeRpcEndpoint) {
    note("[Codegen] No RPC endpoints found, skipping Viem resources generation", "warn");
    return;
  }

  const chainId =
    env.SETTLEMINT_BLOCKCHAIN_NETWORK_CHAIN_ID ??
    (await getChainId({
      accessToken: env.SETTLEMINT_ACCESS_TOKEN,
      rpcUrl: env.SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER_JSON_RPC_ENDPOINT!,
    }));
  if (!chainId) {
    note("[Codegen] No chain ID found, skipping Viem resources generation", "warn");
    return;
  }

  const projectDir = await projectRoot();
  // Install the package only if it's not already installed
  if (!(await isPackageInstalled(PACKAGE_NAME, projectDir))) {
    await installDependencies(PACKAGE_NAME, projectDir);
  }

  // Generate Viem client template with build time safety
  const imports: string[] = [];
  if (loadBalancerRpcEndpoint) {
    imports.push("getPublicClient");
  }
  if (blockchainNodeRpcEndpoint) {
    imports.push("getWalletClient");
  }

  const viemTemplate = [`import { ${imports.join(", ")} } from "${PACKAGE_NAME}";`];

  if (loadBalancerRpcEndpoint) {
    viemTemplate.push(`
/**
 * The public client. Use this if you need to read from the blockchain.
 */
export const publicClient = getPublicClient({
  accessToken: process.env.SETTLEMINT_BLOCKCHAIN_ACCESS_TOKEN,
  chainId: ${env.SETTLEMINT_BLOCKCHAIN_NETWORK_CHAIN_ID ? "process.env.SETTLEMINT_BLOCKCHAIN_NETWORK_CHAIN_ID!" : `"${chainId}"`},
  chainName: process.env.SETTLEMINT_BLOCKCHAIN_NETWORK!,
  rpcUrl: process.env.SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER_JSON_RPC_ENDPOINT!,
});`);
  }

  if (blockchainNodeRpcEndpoint) {
    viemTemplate.push(`
/**
 * The wallet client. Use this if you need to write to the blockchain.
 */
export const walletClient = getWalletClient({
  accessToken: process.env.SETTLEMINT_BLOCKCHAIN_ACCESS_TOKEN,
  chainId: ${env.SETTLEMINT_BLOCKCHAIN_NETWORK_CHAIN_ID ? "process.env.SETTLEMINT_BLOCKCHAIN_NETWORK_CHAIN_ID!" : `"${chainId}"`},
  chainName: process.env.SETTLEMINT_BLOCKCHAIN_NETWORK!,
  rpcUrl: process.env.SETTLEMINT_BLOCKCHAIN_NODE_JSON_RPC_ENDPOINT!,
})();

/**
 * The wallet client for HD wallets. Use this if you need to write to the blockchain.
 * HD wallets require a challenge response to be sent with the request.
 */
export const hdWalletClient = getWalletClient({
  accessToken: process.env.SETTLEMINT_BLOCKCHAIN_ACCESS_TOKEN,
  chainId: ${env.SETTLEMINT_BLOCKCHAIN_NETWORK_CHAIN_ID ? "process.env.SETTLEMINT_BLOCKCHAIN_NETWORK_CHAIN_ID!" : `"${chainId}"`},
  chainName: process.env.SETTLEMINT_BLOCKCHAIN_NETWORK!,
  rpcUrl: process.env.SETTLEMINT_BLOCKCHAIN_NODE_JSON_RPC_ENDPOINT!,
});`);
  }

  await writeTemplate(viemTemplate.join("\n"), "/lib/settlemint", "viem.ts");

  note("Viem resources generated successfully");
}
