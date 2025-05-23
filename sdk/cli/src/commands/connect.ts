import { missingPersonalAccessTokenError } from "@/error/missing-config-error";
import { applicationAccessTokenPrompt } from "@/prompts/aat.prompt";
import { applicationPrompt } from "@/prompts/application.prompt";
import { blockchainNodeOrLoadBalancerPrompt } from "@/prompts/cluster-service/blockchain-node-or-load-balancer.prompt";
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
import { subgraphPrompt } from "@/prompts/smart-contract-set/subgraph.prompt";
import { serviceSecretPrompt } from "@/prompts/standalone/service-secret.prompt";
import { serviceUrlPrompt } from "@/prompts/standalone/service-url.prompt";
import { workspacePrompt } from "@/prompts/workspace.prompt";
import { servicesSpinner } from "@/spinners/services.spinner";
import { workspaceSpinner } from "@/spinners/workspaces.spinner";
import { writeEnvSpinner } from "@/spinners/write-env.spinner";
import { getBlockchainNetworkChainId } from "@/utils/blockchain-network";
import { hasPrivateKey } from "@/utils/cluster-service";
import { createExamples } from "@/utils/commands/create-examples";
import { getInstanceCredentials } from "@/utils/config";
import {
  getBlockchainNodeEnv,
  getBlockchainNodeOrLoadBalancerEnv,
  getBlockscoutEnv,
  getCustomDeploymentEnv,
  getGraphEnv,
  getHasuraEnv,
  getHdPrivateKeyEnv,
  getIpfsEnv,
  getMinioEnv,
  getPortalEnv,
} from "@/utils/get-cluster-service-env";
import { sanitizeAndValidateInstanceUrl } from "@/utils/instance-url-utils";
import { getSubgraphName } from "@/utils/subgraph/subgraph-name";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { maskTokens } from "@settlemint/sdk-utils/logging";
import { intro, outro, table } from "@settlemint/sdk-utils/terminal";
import { type DotEnv, STANDALONE_INSTANCE } from "@settlemint/sdk-utils/validation";

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
      .option(
        "-i, --instance <instance>",
        "The instance to connect to (defaults to the instance in the .env file). Use 'standalone' if your resources are not deployed on the SettleMint platform",
      )
      // Set the command description
      .description("Connects your dApp to your application")
      .usage(
        createExamples([
          {
            description: "Connect to your environment",
            command: "connect",
          },
          {
            description: "Connect to your environment using defaults from the .env file",
            command: "connect --accept-defaults",
          },
          {
            description: "Connect to your production environment",
            command: "connect --prod",
          },
          {
            description: "Connect to a standalone environment (when not using the SettleMint platform)",
            command: "connect --instance standalone",
          },
        ]),
      )
      // Define the action to be executed when the command is run
      .action(async ({ acceptDefaults, prod, instance }) => {
        intro("Connecting your dApp");
        const env: Partial<DotEnv> = await loadEnv(false, !!prod);
        const selectedInstance = instance
          ? sanitizeAndValidateInstanceUrl(instance)
          : await instancePrompt({
              env,
              accept: true,
            });

        if (selectedInstance === STANDALONE_INSTANCE) {
          await connectToStandalone(env, acceptDefaults, prod);
        } else {
          await connectToPlatform(env, selectedInstance, acceptDefaults, prod);
        }

        outro("dApp connected");
      })
  );
}

async function connectToPlatform(
  env: Partial<DotEnv>,
  selectedInstance: string,
  acceptDefaults: boolean | undefined,
  prod: boolean | undefined,
) {
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

  const nodesWithPrivateKey = blockchainNodes.filter(hasPrivateKey);
  const blockchainNode = await blockchainNodePrompt({
    env,
    nodes: nodesWithPrivateKey,
    accept: acceptDefaults,
    promptMessage: "Which blockchain node do you want to use for sending transactions?",
  });

  const nodesWithoutPrivateKey = blockchainNodes.filter((node) => !hasPrivateKey(node));
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
  const graphEnv = await getGraphEnv(settlemint, thegraph);
  const [defaultSubgraph] = thegraph
    ? await subgraphPrompt({
        env: { ...env, ...graphEnv },
        accept: acceptDefaults,
        message: "Which The Graph subgraph do you want to use as the default?",
      })
    : [graphEnv.SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH];
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
    ...getBlockchainNodeEnv(blockchainNode),
    SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER: loadBalancerOrBlockchainNode?.uniqueName,
    ...getBlockchainNodeOrLoadBalancerEnv(loadBalancerOrBlockchainNode),
    SETTLEMINT_HASURA: hasura?.uniqueName,
    ...getHasuraEnv(hasura),
    SETTLEMINT_THEGRAPH: thegraph?.uniqueName,
    ...graphEnv,
    SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH: defaultSubgraph,
    SETTLEMINT_PORTAL: portal?.uniqueName,
    ...getPortalEnv(portal),
    SETTLEMINT_HD_PRIVATE_KEY: hdPrivateKey?.uniqueName,
    ...getHdPrivateKeyEnv(hdPrivateKey),
    SETTLEMINT_MINIO: minio?.uniqueName,
    ...getMinioEnv(minio),
    SETTLEMINT_IPFS: ipfs?.uniqueName,
    ...getIpfsEnv(ipfs),
    SETTLEMINT_CUSTOM_DEPLOYMENT: cDeployment?.uniqueName,
    ...getCustomDeploymentEnv(cDeployment),
    SETTLEMINT_BLOCKSCOUT: blockscout?.uniqueName,
    ...getBlockscoutEnv(blockscout),
  });
}

async function connectToStandalone(
  env: Partial<DotEnv>,
  acceptDefaults: boolean | undefined,
  prod: boolean | undefined,
) {
  const standalonePrompts = [
    {
      id: "blockchainNodeJsonRpcEndpoint",
      label: "Blockchain Node JSON RPC Endpoint",
      message: "What is the JSON RPC endpoint for the blockchain node you want to use for sending transactions?",
      example: "https://blockchain-node.mydomain.com",
      defaultValue: env.SETTLEMINT_BLOCKCHAIN_NODE_JSON_RPC_ENDPOINT,
      isSecret: false,
    },
    {
      id: "loadBalancerJsonRpcEndpoint",
      label: "Load Balancer JSON RPC Endpoint",
      message:
        "What is the JSON RPC endpoint for the load balancer or blockchain node you want to use for read operations?",
      example: "https://load-balancer.mydomain.com",
      defaultValue: env.SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER_JSON_RPC_ENDPOINT,
      isSecret: false,
    },
    {
      id: "hasuraEndpoint",
      label: "Hasura GraphQL Endpoint",
      message: "What is the GraphQL endpoint for the Hasura instance you want to connect to?",
      example: "https://hasura.mydomain.com/v1/graphql",
      defaultValue: env.SETTLEMINT_HASURA_ENDPOINT,
      isSecret: false,
    },
    {
      id: "hasuraAdminSecret",
      label: "Hasura Admin Secret",
      message: "What is the admin secret for the Hasura instance you want to connect to?",
      example: "",
      defaultValue: env.SETTLEMINT_HASURA_ADMIN_SECRET,
      isSecret: true,
    },
    {
      id: "hasuraDatabaseUrl",
      label: "Hasura Database URL",
      message: "What is the database URL for the Hasura instance you want to connect to?",
      example: "postgresql://username:password@host:port/database",
      defaultValue: env.SETTLEMINT_HASURA_DATABASE_URL,
      isSecret: false,
    },
    {
      id: "theGraphEndpoint",
      label: "The Graph subgraph GraphQL Endpoint",
      message: "What is the GraphQL endpoint for the The Graph subgraph you want to connect to?",
      example: "https://thegraph.mydomain.com/subgraphs/name/my-subgraph",
      defaultValue:
        Array.isArray(env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS) &&
        env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS.length > 0
          ? env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS[0]
          : undefined,
      isSecret: false,
    },
    {
      id: "portalGraphqlEndpoint",
      label: "Smart Contract Portal GraphQL Endpoint",
      message: "What is the GraphQL endpoint for the Smart Contract Portal instance you want to connect to?",
      example: "https://portal.mydomain.com/graphql",
      defaultValue: env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT,
      isSecret: false,
    },
    {
      id: "minioEndpoint",
      label: "MinIO Endpoint",
      message: "What is the endpoint for the MinIO instance you want to connect to?",
      example: "s3://minio.mydomain.com",
      defaultValue: env.SETTLEMINT_MINIO_ENDPOINT,
      isSecret: false,
    },
    {
      id: "minioAccessKey",
      label: "MinIO Access Key",
      message: "What is the access key for the MinIO instance you want to connect to?",
      example: "",
      defaultValue: env.SETTLEMINT_MINIO_ACCESS_KEY,
      isSecret: true,
    },
    {
      id: "minioSecretKey",
      label: "MinIO Secret Key",
      message: "What is the secret key for the MinIO instance you want to connect to?",
      example: "",
      defaultValue: env.SETTLEMINT_MINIO_SECRET_KEY,
      isSecret: true,
    },
    {
      id: "ipfsApiEndpoint",
      label: "IPFS API Endpoint",
      message: "What is the endpoint for the IPFS instance you want to connect to?",
      example: "https://ipfs.mydomain.com/api/v0",
      defaultValue: env.SETTLEMINT_IPFS_API_ENDPOINT,
      isSecret: false,
    },
    {
      id: "blockscoutGraphqlEndpoint",
      label: "Blockscout GraphQL Endpoint",
      message: "What is the GraphQL endpoint for the Blockscout instance you want to connect to?",
      example: "https://blockscout.mydomain.com/api/v1/graphql",
      defaultValue: env.SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT,
      isSecret: false,
    },
  ] as const;
  const selectedServices: Partial<
    Record<
      (typeof standalonePrompts)[number]["id"],
      {
        label: string;
        result: string | undefined;
        isSecret: boolean;
      }
    >
  > = {};
  for (const prompt of standalonePrompts) {
    const { id, message, example, defaultValue, isSecret } = prompt;
    const result = isSecret
      ? await serviceSecretPrompt({
          message,
          defaultSecret: defaultValue,
          accept: acceptDefaults,
        })
      : await serviceUrlPrompt({
          message,
          example,
          defaultUrl: defaultValue,
          accept: acceptDefaults,
        });
    selectedServices[id] = {
      label: prompt.label,
      result,
      isSecret,
    };
  }

  if (acceptDefaults) {
    table(
      "Selected services",
      Object.values(selectedServices)
        .map((item) => {
          if (item.isSecret) {
            return {
              ...item,
              result: "********",
            };
          }
          return {
            ...item,
            result: item.result ? maskTokens(item.result) : undefined,
          };
        })
        .filter(Boolean),
    );
  }

  await writeEnvSpinner(!!prod, {
    SETTLEMINT_INSTANCE: STANDALONE_INSTANCE,
    SETTLEMINT_BLOCKCHAIN_NODE_JSON_RPC_ENDPOINT: selectedServices.blockchainNodeJsonRpcEndpoint?.result,
    SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER_JSON_RPC_ENDPOINT: selectedServices.loadBalancerJsonRpcEndpoint?.result,
    SETTLEMINT_HASURA_ENDPOINT: selectedServices.hasuraEndpoint?.result,
    SETTLEMINT_HASURA_ADMIN_SECRET: selectedServices.hasuraAdminSecret?.result,
    SETTLEMINT_HASURA_DATABASE_URL: selectedServices.hasuraDatabaseUrl?.result,
    SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS: selectedServices.theGraphEndpoint?.result
      ? [selectedServices.theGraphEndpoint.result]
      : [],
    SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH: selectedServices.theGraphEndpoint?.result
      ? getSubgraphName(selectedServices.theGraphEndpoint.result)
      : undefined,
    SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT: selectedServices.portalGraphqlEndpoint?.result,
    SETTLEMINT_MINIO_ENDPOINT: selectedServices.minioEndpoint?.result,
    SETTLEMINT_MINIO_ACCESS_KEY: selectedServices.minioAccessKey?.result,
    SETTLEMINT_MINIO_SECRET_KEY: selectedServices.minioSecretKey?.result,
    SETTLEMINT_IPFS_API_ENDPOINT: selectedServices.ipfsApiEndpoint?.result,
    SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT: selectedServices.blockscoutGraphqlEndpoint?.result,
  });
}
