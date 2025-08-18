import { afterEach, describe, expect, setDefaultTimeout, test } from "bun:test";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { fetchWithRetry } from "@settlemint/sdk-utils/http";
import { PORTAL_NAME } from "./constants/test-resources";
import { forceExitAllCommands, runCommand } from "./utils/run-command";

const COMMAND_TEST_SCOPE = __filename;

setDefaultTimeout(15 * 60_000);

afterEach(() => {
  forceExitAllCommands(COMMAND_TEST_SCOPE);
});

describe("Restart platform resources using the SDK", () => {
  test("Restart smart contract portal middleware on the platform", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "restart",
      "middleware",
      "scp",
      "default",
      "--wait",
      "--accept-defaults",
    ]).result;
    expect(output).toInclude(`Middleware ${PORTAL_NAME} restart initiated successfully`);
    expect(output).toInclude("Middleware is restarted");
    // Make sure it is running
    const env = await loadEnv(false, false);
    const response = await fetchWithRetry(env.SETTLEMINT_PORTAL_REST_ENDPOINT ?? "");
    expect(response.status).toBe(401); // Unauthorized as we did not provide a token
  });
});
