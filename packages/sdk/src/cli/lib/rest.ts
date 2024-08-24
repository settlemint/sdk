import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { findProjectRoot } from "@/common/path";
import { createConfig } from "@redocly/openapi-core";
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
    const settleMintDir = join(findProjectRoot(process.cwd()), ".settlemint");
    const portalDir = join(settleMintDir, "portal");
    const restDir = join(portalDir, "rest");
    mkdirSync(restDir, { recursive: true });

    // Write Portal REST types to file
    const portalRestTypesPath = join(restDir, "portal-schema.d.ts");
    writeFileSync(portalRestTypesPath, contents);
  }
}
