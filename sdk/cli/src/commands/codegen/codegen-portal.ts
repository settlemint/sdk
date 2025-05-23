import { writeTemplate } from "@/commands/codegen/utils/write-template";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
import { generateSchema } from "@gql.tada/cli-utils";
import { projectRoot } from "@settlemint/sdk-utils/filesystem";
import { installDependencies, isPackageInstalled } from "@settlemint/sdk-utils/package-manager";
import { type DotEnv, STANDALONE_INSTANCE } from "@settlemint/sdk-utils/validation";

const PACKAGE_NAME = "@settlemint/sdk-portal";
export async function codegenPortal(env: DotEnv) {
  const gqlEndpoint = env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT;
  if (!gqlEndpoint) {
    return;
  }

  const instance = env.SETTLEMINT_INSTANCE;
  const accessToken =
    instance === STANDALONE_INSTANCE
      ? undefined
      : await getApplicationOrPersonalAccessToken({
          env,
          instance: env.SETTLEMINT_INSTANCE,
          prefer: "application",
        });

  await generateSchema({
    input: gqlEndpoint,
    output: "portal-schema.graphql",
    tsconfig: undefined,
    headers: accessToken
      ? {
          "x-auth-token": accessToken,
        }
      : {},
  });

  const template = `import { createPortalClient, getWebsocketClient } from "${PACKAGE_NAME}";
import type { introspection } from "@schemas/portal-env";
import { createLogger, requestLogger, type LogLevel } from '@settlemint/sdk-utils/logging';

const logger = createLogger({ level: process.env.SETTLEMINT_LOG_LEVEL as LogLevel });

export const { client: portalClient, graphql: portalGraphql } = createPortalClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    /** Used for metadata field */
    JSON: unknown;
  };
}>({
  instance: process.env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT!,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN ?? "",
}, {
  fetch: requestLogger(logger, "portal", fetch) as typeof fetch,
});

export const getPortalWebsocketClient = getWebsocketClient({
  portalGraphqlEndpoint: process.env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT!,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN ?? "",
});
`;

  await writeTemplate(template, "/lib/settlemint", "portal.ts");

  const projectDir = await projectRoot();
  // Install the package only if it's not already installed
  if (!(await isPackageInstalled(PACKAGE_NAME, projectDir))) {
    await installDependencies(PACKAGE_NAME, projectDir);
  }
}
