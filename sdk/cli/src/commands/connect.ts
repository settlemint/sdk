import { workspaceSpinner } from "@/commands/connect/workspaces.spinner";
import { writeEnvSpinner } from "@/commands/connect/write-env.spinner";
import { missingPersonalAccessTokenError } from "@/error/missing-config-error";
import { getInstanceCredentials } from "@/utils/config";
import {
  getBlockscoutEndpoints,
  getGraphEndpoint,
  getHasuraEndpoints,
  getIpfsEndpoints,
  getMinioEndpoints,
  getPortalEndpoints,
} from "@/utils/get-cluster-service-endpoint";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, outro } from "@settlemint/sdk-utils/terminal";
import isInCi from "is-in-ci";
import { applicationAccessTokenPrompt } from "./connect/aat.prompt";
import { applicationPrompt } from "./connect/application.prompt";
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
          return missingPersonalAccessTokenError();
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

        await writeEnvSpinner(!!prod, {
          SETTLEMINT_ACCESS_TOKEN: aatToken,
          SETTLEMINT_INSTANCE: instance,
          SETTLEMINT_WORKSPACE: workspace.uniqueName,
          SETTLEMINT_APPLICATION: application.uniqueName,
          SETTLEMINT_BLOCKCHAIN_NETWORK: blockchainNode?.blockchainNetwork?.uniqueName,
          SETTLEMINT_BLOCKCHAIN_NODE: blockchainNode?.uniqueName,
          SETTLEMINT_HASURA: hasura?.uniqueName,
          ...getHasuraEndpoints(hasura),
          SETTLEMINT_THEGRAPH: thegraph?.uniqueName,
          ...(await getGraphEndpoint(thegraph, env)),
          ...getPortalEndpoints(portal),
          SETTLEMINT_HD_PRIVATE_KEY: hdPrivateKey?.uniqueName,
          SETTLEMINT_MINIO: minio?.uniqueName,
          ...getMinioEndpoints(minio),
          SETTLEMINT_IPFS: ipfs?.id,
          ...getIpfsEndpoints(ipfs),
          SETTLEMINT_CUSTOM_DEPLOYMENT: cDeployment?.uniqueName,
          SETTLEMINT_CUSTOM_DEPLOYMENT_ENDPOINT: cDeployment?.endpoints.find((endpoint) =>
            endpoint.id.includes("internal"),
          )?.displayValue,
          SETTLEMINT_BLOCKSCOUT: blockscout?.uniqueName,
          ...getBlockscoutEndpoints(blockscout),
        });

        outro("Connected to SettleMint");
      })
  );
}
