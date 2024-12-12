import { workspaceSpinner } from "@/commands/connect/workspaces.spinner";
import { writeEnvSpinner } from "@/commands/connect/write-env.spinner";
import { PRE_DEPLOYED_CONTRACTS } from "@/constants/predeployed-contracts";
import { getInstanceCredentials } from "@/utils/config";
import {
  getBlockscoutEndpoints,
  getGraphEndpoint,
  getHasuraEndpoints,
  getIpfsEndpoints,
  getPortalEndpoints,
} from "@/utils/get-cluster-service-endpoint";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { cancel, intro, outro } from "@settlemint/sdk-utils/terminal";
import isInCi from "is-in-ci";
import { applicationAccessTokenPrompt } from "./connect/aat.prompt";
import { applicationPrompt } from "./connect/application.prompt";
import { authSecretPrompt } from "./connect/auth-secret.prompt";
import { authUrlPrompt } from "./connect/auth-url.prompt";
import { blockchainNodePrompt } from "./connect/blockchain-node.prompt";
import { blockscoutPrompt } from "./connect/blockscout.prompt";
import { customDeploymentPrompt } from "./connect/custom-deployment.prompt";
import { hasuraPrompt } from "./connect/hasura.prompt";
import { hdPrivateKeyPrompt } from "./connect/hd-private-keys.prompt";
import { instancePrompt } from "./connect/instance.prompt";
import { ipfsPrompt } from "./connect/ipfs.prompt";
import { minioPrompt } from "./connect/minio.prompt";
import { portalPrompt } from "./connect/portal.prompt";
import { servicesSpinner } from "./connect/services.spinner";
import { theGraphPrompt } from "./connect/thegraph.prompt";
import { workspacePrompt } from "./connect/workspace.prompt";

/**
 * Creates and returns the 'connect' command for the SettleMint SDK.
 * This command initializes the setup of the SettleMint SDK in the user's project.
 * It guides the user through a series of prompts to configure their environment,
 * select services, and set up necessary files.
 *
 * @returns {Command} The configured 'connect' command
 */
export function connectCommand(): Command {
  return (
    new Command("connect")
      .option("--prod", "Connect to your production environment")
      .option("-a, --accept-defaults", "Accept the default and previously set values")
      // Set the command description
      .description("Connects your project to your application on SettleMint")
      // Define the action to be executed when the command is run
      .action(async ({ acceptDefaults, prod }) => {
        intro("Connecting your dApp to SettleMint");
        const autoAccept = !!acceptDefaults || isInCi;
        const env: Partial<DotEnv> = await loadEnv(false, !!prod);

        const instance = await instancePrompt(env, autoAccept);
        const personalAccessToken = await getInstanceCredentials(instance);

        if (!personalAccessToken) {
          cancel(
            "No personal access token found for instance, please run `settlemint login` to login to your instance",
          );
        }

        const accessToken = personalAccessToken.personalAccessToken;

        const settlemint = createSettleMintClient({
          accessToken,
          instance,
        });

        const workspaces = await workspaceSpinner(settlemint);

        const workspace = await workspacePrompt(env, workspaces, autoAccept);
        const application = await applicationPrompt(env, workspace?.applications ?? [], autoAccept);

        const aatToken = await applicationAccessTokenPrompt(env, application, settlemint, autoAccept);

        const { middleware, integrationTool, storage, privateKey, insights, customDeployment, blockchainNodes } =
          await servicesSpinner(settlemint, application);

        const blockchainNode = await blockchainNodePrompt(env, blockchainNodes, autoAccept);
        const hasura = await hasuraPrompt(env, integrationTool, autoAccept);
        const thegraph = await theGraphPrompt(env, middleware, autoAccept);
        const portal = await portalPrompt(env, middleware, autoAccept);
        const ipfs = await ipfsPrompt(env, storage, autoAccept);
        const minio = await minioPrompt(env, storage, autoAccept);
        const hdPrivateKey = await hdPrivateKeyPrompt(env, privateKey, autoAccept);
        const cDeployment = await customDeploymentPrompt(env, customDeployment, autoAccept);
        const blockscout = await blockscoutPrompt(env, insights, autoAccept);

        const authUrl = await authUrlPrompt(env, autoAccept, !!prod);
        const authSecret = await authSecretPrompt(env, autoAccept);

        await writeEnvSpinner(!!prod, {
          ...PRE_DEPLOYED_CONTRACTS,
          SETTLEMINT_ACCESS_TOKEN: aatToken,
          SETTLEMINT_INSTANCE: instance,
          SETTLEMINT_WORKSPACE: workspace.id,
          SETTLEMINT_APPLICATION: application.id,
          SETTLEMINT_BLOCKCHAIN_NETWORK: blockchainNode?.blockchainNetwork?.id,
          SETTLEMINT_BLOCKCHAIN_NODE: blockchainNode?.id,
          SETTLEMINT_HASURA: hasura?.id,
          ...getHasuraEndpoints(hasura),
          SETTLEMINT_THEGRAPH: thegraph?.id,
          ...(await getGraphEndpoint(thegraph, env)),
          ...getPortalEndpoints(portal),
          SETTLEMINT_HD_PRIVATE_KEY: hdPrivateKey?.uniqueName,
          NEXTAUTH_URL: authUrl,
          SETTLEMINT_AUTH_SECRET: authSecret,
          SETTLEMINT_MINIO: minio?.id,
          SETTLEMINT_MINIO_ENDPOINT: minio?.endpoints.find((endpoint) => endpoint.id.includes("s3-api"))?.displayValue,
          SETTLEMINT_MINIO_ACCESS_KEY: minio?.credentials.find((credential) => credential.id.includes("access-key"))
            ?.displayValue,
          SETTLEMINT_MINIO_SECRET_KEY: minio?.credentials.find((credential) => credential.id.includes("secret-key"))
            ?.displayValue,
          SETTLEMINT_IPFS: ipfs?.id,
          ...getIpfsEndpoints(ipfs),
          SETTLEMINT_CUSTOM_DEPLOYMENT: cDeployment?.id,
          SETTLEMINT_CUSTOM_DEPLOYMENT_ENDPOINT: cDeployment?.endpoints.find((endpoint) =>
            endpoint.id.includes("internal"),
          )?.displayValue,
          SETTLEMINT_BLOCKSCOUT: blockscout?.id,
          ...getBlockscoutEndpoints(blockscout),
        });

        outro("Connected to SettleMint");
      })
  );
}
