import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createConfig } from "@redocly/openapi-core";
import { findProjectRoot } from "@settlemint/btp-sdk-config";
import openapiTS, { astToString } from "openapi-typescript";

/**
 * Creates a Portal REST client based on the OpenAPI specification.
 * This function generates TypeScript types and a client for the Portal REST API.
 *
 * @param portalRest - The base URL of the Portal REST API
 * @param personalAccessToken - The personal access token for authentication
 */
export async function createRestClient(options: {
  framework: string;
  restURL?: string;
  personalAccessToken: string;
}) {
  const { framework, restURL, personalAccessToken } = options;

  if (restURL) {
    // Create Redocly configuration with custom rules and HTTP headers
    const redocly = await createConfig(
      {
        rules: {
          "operation-operationId-unique": { severity: "error" },
        },
        resolve: {
          http: {
            headers: [
              {
                matches: `${new URL(restURL).protocol}://${new URL(restURL).host}/**`,
                name: "x-auth-token",
                value: personalAccessToken,
              },
            ],
          },
        },
      },
      { extends: ["recommended"] },
    );

    // Generate AST from OpenAPI specification
    const ast = await openapiTS(new URL(`${personalAccessToken}/docs/json`, restURL), {
      redocly,
    });

    // Convert AST to string
    const contents = astToString(ast);

    // Create directory structure
    const btpDir = join(findProjectRoot(process.cwd()), ".btp");
    const portalDir = join(btpDir, "portal");
    const restDir = join(portalDir, "rest");
    const restCodegenDir = join(restDir, "codegen");
    mkdirSync(restCodegenDir, { recursive: true });

    // Write Portal REST types to file
    const portalRestTypesPath = join(restCodegenDir, "portal-schema.d.ts");
    writeFileSync(portalRestTypesPath, contents);

    // Generate and write Portal REST client
    const portalRestClientPath = join(restDir, "index.ts");

    if (framework === "nextjs") {
      writeFileSync(
        portalRestClientPath,
        `
import createClient from "openapi-fetch";
import type { paths } from "./codegen/portal-schema";

export const portal = createClient<paths>({ baseUrl: \`\${process.env.NEXT_PUBLIC_BTP_APP_URL}/proxy/portal/rest\` });
`,
      );
    } else {
      writeFileSync(
        portalRestClientPath,
        `
import createClient from "openapi-fetch";
import type { paths } from "./codegen/portal-schema";

if(globalThis.window?.document !== undefined){
  throw new Error('You cannot use this SDK in a browser environment as it would expose your secrets.')
}

if(!process.env.BTP_PAT_TOKEN){
  throw new Error("BTP_PAT_TOKEN environment variable is required");
}

export const portal = createClient<paths>({ baseUrl: '${restURL}', headers: { "x-auth-token": process.env.BTP_PAT_TOKEN } });
`,
      );
    }
  }
}
