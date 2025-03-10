import { portalQueries } from "@/tools/portal/queries";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import pkg from "../package.json";
import { hasuraPrompt } from "./prompts/hasura/hasura";
import { portalPrompt } from "./prompts/portal/portal";
import { thegraphPrompt } from "./prompts/thegraph/thegraph";
import { hasuraMutation } from "./tools/hasura/mutation";
import { hasuraMutations } from "./tools/hasura/mutations";
import { hasuraQueries } from "./tools/hasura/queries";
import { hasuraQuery } from "./tools/hasura/query";
import { portalMutation } from "./tools/portal/mutation";
import { portalMutations } from "./tools/portal/mutations";
import { portalQuery } from "./tools/portal/query";
import { thegraphQueries } from "./tools/thegraph/queries";
import { thegraphQuery } from "./tools/thegraph/query";

const server = new McpServer(
  {
    name: "SettleMint",
    version: pkg.version,
  },
  {
    capabilities: {
      resources: {
        portal: {
          description: "The portal resource",
        },
        thegraph: {
          description: "The Graph resource",
        },
      },
    },
  },
);

// Get the path from command line arguments (it will be the last argument)
const path = process.argv[process.argv.length - 1];
const env: Partial<DotEnv> = await loadEnv(true, false, path);

// Register Portal tools
portalPrompt(server);
portalQueries(server, env);
portalMutations(server, env);
portalQuery(server, env);
portalMutation(server, env);

// Register The Graph tools
thegraphPrompt(server);
thegraphQueries(server, env);
thegraphQuery(server, env);

// Register Hasura tools
hasuraPrompt(server);
hasuraQueries(server, env);
hasuraQuery(server, env);
hasuraMutations(server, env);
hasuraMutation(server, env);

// Start the server with the StdioServerTransport
const transport = new StdioServerTransport();
await server.connect(transport);
