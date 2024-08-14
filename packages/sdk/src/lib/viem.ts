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
export async function createViemClient(options: {
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

    const clientConfigPath = join(nodeDir, "viem.ts");

    if (framework === "nextjs") {
      writeFileSync(
        clientConfigPath,
        `
import type { UnifyIntersection } from '@settlemint/sdk-react';
import { Address } from 'abitype';
import { type Account, type Chain, type HttpTransport, type PublicClientConfig, type RpcSchema, type TransportConfig, http } from 'viem';
import { chain } from './codegen/chain';

export function settleMintViemConfig<
chain extends Chain | undefined = undefined,
accountOrAddress extends Account | Address | undefined = undefined,
rpcSchema extends RpcSchema | undefined = undefined,
>(parameters: UnifyIntersection<Omit<PublicClientConfig<HttpTransport, chain, accountOrAddress, rpcSchema>, 'chain'|'transport'> &{ transportConfig?: TransportConfig<'http'>}>,
):PublicClientConfig<HttpTransport, chain, accountOrAddress, rpcSchema>{
  return {
    chain,
    transport: http(\`\${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/node/jsonrpc\`,parameters.transportConfig),
    ...parameters
  }
}
`,
      );
    } else {
      writeFileSync(
        clientConfigPath,
        `
import type { UnifyIntersection } from '@settlemint/sdk-react';
import { Address } from 'abitype';
import { type Account, type Chain, type HttpTransport, type PublicClientConfig, type RpcSchema, type TransportConfig, http } from 'viem';
import { chain } from './codegen/chain';

if(globalThis.window?.document !== undefined){
  throw new Error('You cannot use this SDK in a browser environment as it would expose your secrets.')
}

export function settleMintViemConfig<
chain extends Chain | undefined = undefined,
accountOrAddress extends Account | Address | undefined = undefined,
rpcSchema extends RpcSchema | undefined = undefined,
>(parameters: UnifyIntersection<Omit<PublicClientConfig<HttpTransport, chain, accountOrAddress, rpcSchema>, 'chain'|'transport'> &{ transportConfig?: TransportConfig<'http'>}>,
):PublicClientConfig<HttpTransport, chain, accountOrAddress, rpcSchema>{
  return {
    chain,
    transport: http("${nodeUrl}",{...parameters.transportConfig, fetchOptions: { ...parameters.transportConfig.fetchOptions, headers: {...parameters.transportConfig.fetchOptions.headers, "x-auth-token": process.env.SETTLEMINT_PAT_TOKEN} }}),
    ...parameters
  }
}
`,
      );
    }
  }
}
