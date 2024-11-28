import { testGqlEndpoint } from "@/commands/codegen/test-gql-endpoint";
import { accessTokenPrompt } from "@/commands/connect/accesstoken.prompt";
import { workspaceSpinner } from "@/commands/connect/workspaces.spinner";
import { writeEnvSpinner } from "@/commands/connect/write-env.spinner";
import { PRE_DEPLOYED_CONTRACTS } from "@/constants/predeployed-contracts";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, outro } from "@settlemint/sdk-utils/terminal";
import isInCi from "is-in-ci";
import { applicationPrompt } from "./connect/application.prompt";
import { authSecretPrompt } from "./connect/auth-secret.prompt";
import { authUrlPrompt } from "./connect/auth-url.prompt";
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

        const accessToken = await accessTokenPrompt(env, autoAccept);
        const instance = await instancePrompt(env, autoAccept);

        const settlemint = createSettleMintClient({
          accessToken,
          instance,
        });

        const workspaces = await workspaceSpinner(settlemint);

        const workspace = await workspacePrompt(env, workspaces, autoAccept);
        const application = await applicationPrompt(env, workspace?.applications ?? [], autoAccept);

        const { middleware, integrationTool, storage, privateKey, insights, customDeployment } = await servicesSpinner(
          settlemint,
          application,
        );

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

        const theGraph = await testGqlEndpoint(
          accessToken,
          undefined,
          thegraph?.endpoints.find((endpoint) => endpoint.id.includes("graphql"))?.displayValue,
        );

        const blockscoutEndpoint = blockscout?.endpoints.find((endpoint) =>
          endpoint.id.includes("interface"),
        )?.displayValue;

        await writeEnvSpinner(!!prod, {
          ...PRE_DEPLOYED_CONTRACTS,
          SETTLEMINT_ACCESS_TOKEN: accessToken,
          SETTLEMINT_INSTANCE: instance,
          SETTLEMINT_WORKSPACE: workspace.id,
          SETTLEMINT_APPLICATION: application.id,
          SETTLEMINT_HASURA: hasura?.id,
          SETTLEMINT_HASURA_ENDPOINT: hasura?.endpoints.find((endpoint) => endpoint.id.includes("graphql"))
            ?.displayValue,
          SETTLEMINT_HASURA_ADMIN_SECRET: hasura?.credentials.find((credential) =>
            credential.id.includes("admin-secret"),
          )?.displayValue,
          SETTLEMINT_THEGRAPH: thegraph?.id,
          SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT: thegraph?.endpoints.find((endpoint) =>
            endpoint.id.includes(theGraph ? "graphql" : "default-subgraph-graphql"),
          )?.displayValue,
          SETTLEMINT_PORTAL: portal?.id,
          SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT: portal?.endpoints.find((endpoint) => endpoint.id.includes("graphql"))
            ?.displayValue,
          SETTLEMINT_PORTAL_REST_ENDPOINT: portal?.endpoints.find((endpoint) => endpoint.id.includes("rest"))
            ?.displayValue,
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
          SETTLEMINT_IPFS_API_ENDPOINT: ipfs?.endpoints.find((endpoint) => endpoint.id.includes("api"))?.displayValue,
          SETTLEMINT_IPFS_PINNING_ENDPOINT: ipfs?.endpoints.find((endpoint) =>
            endpoint.id.includes("cluster-pinning-api"),
          )?.displayValue,
          SETTLEMINT_IPFS_GATEWAY_ENDPOINT: ipfs?.endpoints.find((endpoint) => endpoint.id.includes("gateway"))
            ?.displayValue,
          SETTLEMINT_CUSTOM_DEPLOYMENT: cDeployment?.id,
          SETTLEMINT_CUSTOM_DEPLOYMENT_ENDPOINT: cDeployment?.endpoints.find((endpoint) =>
            endpoint.id.includes("internal"),
          )?.displayValue,
          SETTLEMINT_BLOCKSCOUT: blockscout?.id,
          SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT: blockscoutEndpoint
            ? `${blockscoutEndpoint}/api/v1/graphql`
            : undefined,
          SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT: blockscoutEndpoint,
        });

        outro("Connected to SettleMint");
      })
  );
}
