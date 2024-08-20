import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { findProjectRoot } from "@settlemint/sdk-common/utils/path";
import { createChainConfig } from "./chain.js";

/**
 * Creates a Portal REST client based on the OpenAPI specification.
 * This function generates TypeScript types and a client for the Portal REST API.
 *
 * @param portalRest - The base URL of the Portal REST API
 * @param personalAccessToken - The personal access token for authentication
 */
export async function createWagmiClient(options: {
  framework: string;
  nodeUrl?: string;
  personalAccessToken: string;
}) {
  const { framework, nodeUrl } = options;

  if (nodeUrl) {
    // Create directory structure
    const settleMintDir = join(findProjectRoot(process.cwd()), ".settlemint");
    const nodeDir = join(settleMintDir, "node");
    const codegenDir = join(nodeDir, "codegen");
    mkdirSync(codegenDir, { recursive: true });

    await createChainConfig(options);

    const clientConfigPath = join(nodeDir, "wagmi.ts");

    if (framework === "nextjs") {
      writeFileSync(
        clientConfigPath,
        `import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import type { Prettify, TransportConfig } from "viem";
import { Config, cookieStorage, CreateConfigParameters, createStorage, http } from "wagmi";
import { chain } from "./codegen/chain";

export type Web3ModalConfig = Parameters<typeof createWeb3Modal>["0"];
export type LimitedWeb3ModalMetadata = Omit<NonNullable<Web3ModalConfig["metadata"]>, "url">;

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? "";

if (!projectId) {
  console.warn(
    "Wallet Connect Project ID is not defined, add it to your .env.local file as NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID",
  );
}

export function settleMintWagmiConfig(
  parameters: Prettify<
    Partial<Omit<CreateConfigParameters, "client">> & {
      transportConfig?: TransportConfig<"http">;
      metadata: LimitedWeb3ModalMetadata;
    }
  >,
): { wagmiConfig: Config; web3ModalConfig: Web3ModalConfig } {
  const wagmiConfig = defaultWagmiConfig({
    ...parameters,
    chains: [...(parameters?.chains ?? []), chain],
    transports: {
      ...(parameters?.transports ?? []),
      [chain.id]: http(\`\${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/node/jsonrpc\`, parameters?.transportConfig),
    },
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    projectId: projectId ?? "",
    metadata: {
      ...parameters.metadata,
      url: process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL ?? "",
    },
  });

  const web3ModalConfig = {
    metadata: {
      ...parameters.metadata,
      url: process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL ?? "",
    },
    wagmiConfig,
    projectId,
  };

  return {
    wagmiConfig,
    web3ModalConfig,
  };
}
`,
      );
    } else {
      writeFileSync(
        clientConfigPath,
        `"use client"

import { TransportConfig } from 'viem';
import { Config, createConfig, CreateConfigParameters, http } from 'wagmi';
import { chain } from './codegen/chain';

if(globalThis.window?.document !== undefined){
  throw new Error('You cannot use this SDK in a browser environment as it would expose your secrets.')
}

export function settleMintWagmiConfig(
  parameters?: Omit<CreateConfigParameters, 'client'> & { transportConfig?: TransportConfig<'http'>},
): Config {
  return createConfig({
    ...parameters,
    chains: [...(parameters?.chains??[]),chain],
    transports: {
      ...(parameters?.transports??[]),
      [chain.id]: http("${nodeUrl}",{...parameters.transportConfig, fetchOptions: { ...parameters?.transportConfig?.fetchOptions, headers: {...parameters?.transportConfig?.fetchOptions?.headers, "x-auth-token": process.env.SETTLEMINT_PAT_TOKEN} }}),
    },
  })
};
`,
      );
    }
  }
}
