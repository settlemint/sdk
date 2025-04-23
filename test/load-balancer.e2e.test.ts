import { describe, expect, test } from "bun:test";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { CLUSTER_PROVIDER, CLUSTER_REGION } from "./constants/test-resources";
import { runCommand } from "./utils/run-command";

const COMMAND_TEST_SCOPE = "load-balancer-test";
const FAKE_NODE_OTHER_NETWORK = "fake-node-other-network";

describe("Load Balancer E2E Tests", () => {
  test("should not allow creating a load balancer without specifying nodes", async () => {
    const output: string[] = [];
    const onOutput = (message: string) => {
      output.push(message.toString());
    };
    try {
      const command = runCommand(COMMAND_TEST_SCOPE, [
        "platform",
        "create",
        "load-balancer",
        "evm",
        "test-load-balancer",
        "--provider",
        CLUSTER_PROVIDER,
        "--region",
        CLUSTER_REGION,
        "--accept-defaults",
      ]);
      command.stdout.on("data", onOutput);
      await command.result;
      // Should not reach this point
      expect(false).toBe(true);
    } catch (err) {
      expect(output.join("\n")).toContain("A load balancer must connect to at least one blockchain node");
    }
  });

  test("should not allow creating a load balancer with non-existent nodes", async () => {
    const env = await loadEnv(false, false);
    const output: string[] = [];
    const onOutput = (message: string) => {
      output.push(message.toString());
    };
    try {
      const command = runCommand(COMMAND_TEST_SCOPE, [
        "platform",
        "create",
        "load-balancer",
        "evm",
        "test-load-balancer",
        "--blockchain-nodes",
        "non-existent-node",
        "--provider",
        CLUSTER_PROVIDER,
        "--region",
        CLUSTER_REGION,
        "--accept-defaults",
      ]);
      command.stdout.on("data", onOutput);
      await command.result;
      // Should not reach this point
      expect(false).toBe(true);
    } catch (err) {
      expect(output.join("\n")).toContain(
        `Blockchain node(s) 'non-existent-node' are not part of the application '${env.SETTLEMINT_APPLICATION}'`,
      );
    }
  });
});
