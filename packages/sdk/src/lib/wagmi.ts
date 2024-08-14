import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createChainConfig } from "./chain.ts";
import { findProjectRoot } from "./path.ts";

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
        `"use client"

import type { TransportConfig } from 'viem';
import { Config, createConfig, CreateConfigParameters, http } from 'wagmi';
import { chain } from './codegen/chain';

export function settleMintWagmiConfig(
  parameters?: Omit<CreateConfigParameters, 'client'> & { transportConfig?: TransportConfig<'http'>},
): Config {
  return createConfig({
    ...parameters,
    chains: [...(parameters?.chains??[]),chain],
    transports: {
      ...(parameters?.transports??[]),
      [chain.id]: http(\`\${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/node/jsonrpc\`,parameters?.transportConfig),
    },
  })
};
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
