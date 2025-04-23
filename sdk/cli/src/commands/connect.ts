import { missingPersonalAccessTokenError } from "@/error/missing-config-error";
import { applicationAccessTokenPrompt } from "@/prompts/aat.prompt";
import { applicationPrompt } from "@/prompts/application.prompt";
import { blockchainNodePrompt } from "@/prompts/cluster-service/blockchain-node.prompt";
import { blockscoutPrompt } from "@/prompts/cluster-service/blockscout.prompt";
import { customDeploymentPrompt } from "@/prompts/cluster-service/custom-deployment.prompt";
import { hasuraPrompt } from "@/prompts/cluster-service/hasura.prompt";
import { hdPrivateKeyPrompt } from "@/prompts/cluster-service/hd-private-keys.prompt";
import { ipfsPrompt } from "@/prompts/cluster-service/ipfs.prompt";
import { minioPrompt } from "@/prompts/cluster-service/minio.prompt";
import { portalPrompt } from "@/prompts/cluster-service/portal.prompt";
import { theGraphPrompt } from "@/prompts/cluster-service/thegraph.prompt";
import { instancePrompt } from "@/prompts/instance.prompt";
import { workspacePrompt } from "@/prompts/workspace.prompt";
import { servicesSpinner } from "@/spinners/services.spinner";
import { workspaceSpinner } from "@/spinners/workspaces.spinner";
import { writeEnvSpinner } from "@/spinners/write-env.spinner";
import { getBlockchainNetworkChainId } from "@/utils/blockchain-network";
import { getInstanceCredentials } from "@/utils/config";
import {
  getBlockchainNodeEndpoints,
  getBlockchainNodeOrLoadBalancerEndpoints,
  getBlockscoutEndpoints,
  getGraphEndpoint,
  getHasuraEndpoints,
  getIpfsEndpoints,
  getMinioEndpoints,
  getPortalEndpoints,
} from "@/utils/get-cluster-service-endpoint";
import { sanitizeAndValidateInstanceUrl } from "@/utils/instance-url-utils";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, outro, table } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { blockchainNodeOrLoadBalancerPrompt } from "../prompts/cluster-service/blockchain-node-or-load-balancer.prompt";
import { subgraphPrompt } from "../prompts/smart-contract-set/subgraph.prompt";

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
      .option("-i, --instance <instance>", "The instance to connect to (defaults to the instance in the .env file)")
      // Set the command description
      .description("Connects your project to your application on SettleMint")
      // Define the action to be executed when the command is run
      .action(async ({ acceptDefaults, prod, instance }) => {
        intro("Connecting your dApp to SettleMint");
        const env: Partial<DotEnv> = await loadEnv(false, !!prod);
        const selectedInstance = instance ? sanitizeAndValidateInstanceUrl(instance) : await instancePrompt(env, true);
        const personalAccessToken = await getInstanceCredentials(selectedInstance);

        if (!personalAccessToken) {
          return missingPersonalAccessTokenError();
        }

        const accessToken = personalAccessToken.personalAccessToken;

        const settlemint = createSettleMintClient({
          accessToken,
          instance: selectedInstance,
        });

        const workspaces = await workspaceSpinner(settlemint);

        const workspace = await workspacePrompt(env, workspaces, acceptDefaults);
        const application = await applicationPrompt(env, workspace?.applications ?? [], acceptDefaults);

        const aatToken = await applicationAccessTokenPrompt(env, application, settlemint, acceptDefaults);

        const {
          middlewares,
          integrationTools,
          storages,
          privateKeys,
          insights,
          customDeployments,
          blockchainNodes,
          loadBalancers,
        } = await servicesSpinner(settlemint, application.uniqueName);

        const nodesWithPrivateKey = blockchainNodes.filter((node) =>
          node && "privateKeys" in node ? Array.isArray(node?.privateKeys) && node?.privateKeys?.length > 0 : false,
        );
        const blockchainNode = await blockchainNodePrompt({
          env,
          nodes: nodesWithPrivateKey,
          accept: acceptDefaults,
          promptMessage: "Which blockchain node do you want to use for sending transactions?",
        });

        const nodesWithoutPrivateKey = blockchainNodes.filter((node) =>
          node && "privateKeys" in node ? !Array.isArray(node?.privateKeys) || node?.privateKeys?.length === 0 : true,
        );
        const loadBalancerOrBlockchainNode = await blockchainNodeOrLoadBalancerPrompt({
          env,
          nodes: nodesWithoutPrivateKey,
          loadBalancers: loadBalancers,
          accept: acceptDefaults,
          promptMessage: "Which load balancer or blockchain node do you want to use for read operations?",
        });
        const hasura = await hasuraPrompt({
          env,
          integrations: integrationTools,
          accept: acceptDefaults,
        });
        const thegraph = await theGraphPrompt({
          env,
          middlewares,
          accept: acceptDefaults,
        });
        const graphEndpoints = await getGraphEndpoint(settlemint, thegraph);
        const [defaultSubgraph] = thegraph
          ? await subgraphPrompt({
              env: { ...env, ...graphEndpoints },
              accept: acceptDefaults,
              message: "Which The Graph subgraph do you want to use as the default?",
            })
          : [];
        const portal = await portalPrompt({
          env,
          middlewares,
          accept: acceptDefaults,
        });
        const ipfs = await ipfsPrompt({
          env,
          storages,
          accept: acceptDefaults,
        });
        const minio = await minioPrompt({
          env,
          storages,
          accept: acceptDefaults,
        });
        const hdPrivateKey = await hdPrivateKeyPrompt({
          env,
          privateKeys,
          accept: acceptDefaults,
        });
        const cDeployment = await customDeploymentPrompt({
          env,
          customDeployments,
          accept: acceptDefaults,
        });
        const blockscout = await blockscoutPrompt({
          env,
          insights,
          accept: acceptDefaults,
        });

        if (acceptDefaults) {
          const selectedServices = [
            {
              type: "Workspace",
              name: workspace.name,
              uniqueName: workspace.uniqueName,
            },
            {
              type: "Application",
              name: application.name,
              uniqueName: application.uniqueName,
            },
            blockchainNode && {
              type: "Blockchain Network",
              name: blockchainNode.blockchainNetwork?.name,
              uniqueName: blockchainNode.blockchainNetwork?.uniqueName,
            },
            blockchainNode && {
              type: "Blockchain Node (use for sending transactions)",
              name: blockchainNode.name,
              uniqueName: blockchainNode.uniqueName,
            },
            loadBalancerOrBlockchainNode && {
              type: "Load Balancer or Blockchain Node (use for read operations)",
              name: loadBalancerOrBlockchainNode.name,
              uniqueName: loadBalancerOrBlockchainNode.uniqueName,
            },
            hasura && {
              type: "Hasura",
              name: hasura.name,
              uniqueName: hasura.uniqueName,
            },
            thegraph && {
              type: "TheGraph",
              name: thegraph.name,
              uniqueName: thegraph.uniqueName,
            },
            portal && {
              type: "Portal",
              name: portal.name,
              uniqueName: portal.uniqueName,
            },
            ipfs && {
              type: "IPFS",
              name: ipfs.name,
              uniqueName: ipfs.uniqueName,
            },
            minio && {
              type: "MinIO",
              name: minio.name,
              uniqueName: minio.uniqueName,
            },
            hdPrivateKey && {
              type: "HD Private Key",
              name: hdPrivateKey.name,
              uniqueName: hdPrivateKey.uniqueName,
            },
            cDeployment && {
              type: "Custom Deployment",
              name: cDeployment.name,
              uniqueName: cDeployment.uniqueName,
            },
            blockscout && {
              type: "Blockscout",
              name: blockscout.name,
              uniqueName: blockscout.uniqueName,
            },
          ].filter(Boolean);
          table("Selected services", selectedServices);
        }

        await writeEnvSpinner(!!prod, {
          SETTLEMINT_ACCESS_TOKEN: aatToken,
          SETTLEMINT_INSTANCE: selectedInstance,
          SETTLEMINT_WORKSPACE: workspace.uniqueName,
          SETTLEMINT_APPLICATION: application.uniqueName,
          SETTLEMINT_BLOCKCHAIN_NETWORK: blockchainNode?.blockchainNetwork?.uniqueName,
          SETTLEMINT_BLOCKCHAIN_NETWORK_CHAIN_ID: getBlockchainNetworkChainId(blockchainNode?.blockchainNetwork),
          SETTLEMINT_BLOCKCHAIN_NODE: blockchainNode?.uniqueName,
          ...getBlockchainNodeEndpoints(blockchainNode),
          SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER: loadBalancerOrBlockchainNode?.uniqueName,
          ...getBlockchainNodeOrLoadBalancerEndpoints(loadBalancerOrBlockchainNode),
          SETTLEMINT_HASURA: hasura?.uniqueName,
          ...getHasuraEndpoints(hasura),
          SETTLEMINT_THEGRAPH: thegraph?.uniqueName,
          SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH: defaultSubgraph,
          ...graphEndpoints,
          SETTLEMINT_PORTAL: portal?.uniqueName,
          ...getPortalEndpoints(portal),
          SETTLEMINT_HD_PRIVATE_KEY: hdPrivateKey?.uniqueName,
          SETTLEMINT_MINIO: minio?.uniqueName,
          ...getMinioEndpoints(minio),
          SETTLEMINT_IPFS: ipfs?.uniqueName,
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
