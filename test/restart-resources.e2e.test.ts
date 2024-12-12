import { afterEach, describe, expect, setDefaultTimeout, test } from "bun:test";
import { SMART_CONTRACT_SET_NAME } from "./constants/test-resources";
import { forceExitAllCommands, runCommand } from "./utils/run-command";

const COMMAND_TEST_SCOPE = __filename;

setDefaultTimeout(15 * 60_000);

afterEach(() => {
  forceExitAllCommands(COMMAND_TEST_SCOPE);
});

describe("Restart platform resources using the SDK", () => {
  test.skip("Restart custom deployment on the platform", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "restart",
      "cd",
      "default",
      "--wait",
      "--accept-defaults",
    ]).result;
    expect(output).toInclude(`Custom deployment ${SMART_CONTRACT_SET_NAME} restart initiated successfully`);
  });
});
