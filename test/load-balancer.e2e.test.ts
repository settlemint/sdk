import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { getInstanceCredentials } from "../sdk/cli/src/utils/config";
import { CLUSTER_PROVIDER, CLUSTER_REGION } from "./constants/test-resources";
import { runCommand } from "./utils/run-command";

const COMMAND_TEST_SCOPE = __filename;
const TEST_APPLICATION_NAME = "load-balancer-test-application";

describe("Load Balancer E2E Tests", () => {
  let applicationUniqueName: string;

  beforeAll(async () => {
    const env = await loadEnv(false, false);
    const credentials = await getInstanceCredentials(env.SETTLEMINT_INSTANCE!);
    if (!credentials) {
      throw new Error("No credentials found");
    }
    const settlemint = createSettleMintClient({
      instance: env.SETTLEMINT_INSTANCE!,
      accessToken: credentials.personalAccessToken,
    });
    try {
      await runCommand(COMMAND_TEST_SCOPE, [
        "platform",
        "create",
        "application",
        TEST_APPLICATION_NAME,
        "--accept-defaults",
      ]).result;
    } catch (err) {
      console.error(err);
    }
    const applications = await settlemint.application.list(env.SETTLEMINT_WORKSPACE!);
    applicationUniqueName = applications.find((application) => application.name === TEST_APPLICATION_NAME)?.uniqueName!;
    if (!applicationUniqueName) {
      throw new Error("Application not found");
    }
  });

  afterAll(async () => {
    await runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "delete",
      "application",
      applicationUniqueName,
      "--accept-defaults",
      "-f",
    ]).result;
  });

  test("should not allow creating a load balancer without specifying a network", async () => {
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
        "--application",
        applicationUniqueName,
        "--blockchain-network",
        "fake-network",
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
      expect(output.join("\n")).toContain("No blockchain network selected");
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
