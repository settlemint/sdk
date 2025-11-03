import { afterEach, describe, expect, setDefaultTimeout, test } from "bun:test";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { fetchWithRetry } from "@settlemint/sdk-utils/http";
import { NODE_NAME_3_WITHOUT_PK } from "./constants/test-resources";
import { forceExitAllCommands, runCommand } from "./utils/run-command";
import { findBlockchainNodeByName } from "./utils/test-resources";

const COMMAND_TEST_SCOPE = __filename;

setDefaultTimeout(15 * 60_000);

afterEach(() => {
  forceExitAllCommands(COMMAND_TEST_SCOPE);
});

describe("Restart platform resources using the SDK", () => {
  test("Restart blockchain node on the platform", async () => {
    const blockchainNode = await findBlockchainNodeByName(NODE_NAME_3_WITHOUT_PK);
    if (!blockchainNode) {
      throw new Error(`Blockchain node ${NODE_NAME_3_WITHOUT_PK} not found`);
    }
    const { output } = await runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "restart",
      "blockchain-node",
      blockchainNode.uniqueName,
      "--wait",
      "--accept-defaults",
    ]).result;
    expect(output).toInclude(`Blockchain node ${NODE_NAME_3_WITHOUT_PK} restart initiated successfully`);
    expect(output).toInclude("Blockchain node is restarted");
    // Make sure it is running
    const env = await loadEnv(false, false);
    const response = await fetchWithRetry(env.SETTLEMINT_PORTAL_REST_ENDPOINT ?? "");
    expect(response.status).toBe(401); // Unauthorized as we did not provide a token
  });
});
