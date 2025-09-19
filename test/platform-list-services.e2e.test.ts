import { afterEach, describe, expect, setDefaultTimeout, test } from "bun:test";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { $ } from "bun";
import { parseDocument } from "yaml";
import { forceExitAllCommands, runCommand } from "./utils/run-command";

const COMMAND_TEST_SCOPE = __filename;

setDefaultTimeout(60_000);

afterEach(() => {
  forceExitAllCommands(COMMAND_TEST_SCOPE);
});

describe("Test platform list services command", () => {
  test("List services", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["platform", "list", "services"]).result;
    expect(output).toInclude("Blockchain networks");
    expect(output).toInclude("Blockchain nodes");
    expect(output).toInclude("Load balancers");
    expect(output).toInclude("Insights");
    expect(output).toInclude("Integration tools");
    expect(output).toInclude("Middlewares");
    expect(output).toInclude("Private keys");
    expect(output).toInclude("Storage");
    expect(output).not.toInclude("Url");
  });

  test("List services with specific type", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "list",
      "services",
      "--type",
      "middleware",
      "storage",
    ]).result;
    expect(output).toInclude("Middlewares");
    expect(output).toInclude("Storage");
    expect(output).not.toInclude("Blockchain networks");
    expect(output).not.toInclude("Blockchain nodes");
    expect(output).not.toInclude("Load balancers");
    expect(output).not.toInclude("Insights");
    expect(output).not.toInclude("Integration tools");
    expect(output).not.toInclude("Private keys");
    expect(output).not.toInclude("Url");
  });

  test("List services in wide format", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["platform", "list", "services", "-o", "wide"]).result;
    expect(output).toInclude("Blockchain networks");
    expect(output).toInclude("Blockchain nodes");
    expect(output).toInclude("Load balancers");
    expect(output).toInclude("Insights");
    expect(output).toInclude("Integration tools");
    expect(output).toInclude("Middlewares");
    expect(output).toInclude("Private keys");
    expect(output).toInclude("Storage");
    expect(output).toInclude("Url");
  });

  test("List services in JSON format", async () => {
    const env = await loadEnv(false, false);
    const settlemint = createSettleMintClient({
      accessToken: process.env.SETTLEMINT_ACCESS_TOKEN_E2E_TESTS!,
      instance: env.SETTLEMINT_INSTANCE!,
    });
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["platform", "list", "services", "--output", "json"])
      .result;
    const json = JSON.parse(output);
    const application = await settlemint.application.read(env.SETTLEMINT_APPLICATION!);
    expect(json.application).toEqual({
      uniqueName: env.SETTLEMINT_APPLICATION!,
      name: application.name,
      url: `https://console-release.settlemint.com/workspaces/${application.workspace.id}/applications/${application.id}/dashboard`,
    });
    expect(json.workspace).toEqual({
      uniqueName: env.SETTLEMINT_WORKSPACE!,
      name: application.workspace.name,
      url: `https://console-release.settlemint.com/workspaces/${application.workspace.id}`,
    });
    expect(json.services.length).toBeGreaterThanOrEqual(17);
    const blockchainNetwork = await settlemint.blockchainNetwork.read(env.SETTLEMINT_BLOCKCHAIN_NETWORK!);
    expect(json.services[0]).toMatchObject({
      group: "Blockchain networks",
      name: "SDK Demo Network",
      uniqueName: env.SETTLEMINT_BLOCKCHAIN_NETWORK,
      status: "Completed",
      healthStatus: "NOT BFT",
      type: "BesuQBFTBlockchainNetwork",
      provider: "gke",
      region: "europe",
      url: `https://console-release.settlemint.com/workspaces/${application.workspace.id}/applications/${application.id}/networks/${blockchainNetwork.id}/details`,
    });
  });

  test("List services in JSON format and filter with jq", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["platform", "list", "services", "-o", "json"]).result;
    const jqOutput = await $`echo "${output}" | jq '.services[0].group'`;
    expect(jqOutput.text()).toBe('"Blockchain networks"\n');
  });

  test("List services in YAML format", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["platform", "list", "services", "--output", "yaml"])
      .result;
    const yaml = parseDocument(output);
    expect(yaml).toBeObject();
    const parsedYaml = yaml.toJSON();
    const env = await loadEnv(false, false);
    const settlemint = createSettleMintClient({
      accessToken: process.env.SETTLEMINT_ACCESS_TOKEN_E2E_TESTS!,
      instance: env.SETTLEMINT_INSTANCE!,
    });
    const application = await settlemint.application.read(env.SETTLEMINT_APPLICATION!);
    expect(parsedYaml.application).toEqual({
      uniqueName: env.SETTLEMINT_APPLICATION!,
      name: application.name,
      url: `https://console-release.settlemint.com/workspaces/${application.workspace.id}/applications/${application.id}/dashboard`,
    });
    expect(parsedYaml.workspace).toEqual({
      uniqueName: env.SETTLEMINT_WORKSPACE!,
      name: application.workspace.name,
      url: `https://console-release.settlemint.com/workspaces/${application.workspace.id}`,
    });
    expect(parsedYaml.services.length).toBeGreaterThanOrEqual(17);
    const blockchainNetwork = await settlemint.blockchainNetwork.read(env.SETTLEMINT_BLOCKCHAIN_NETWORK!);
    expect(parsedYaml.services[0]).toMatchObject({
      group: "Blockchain networks",
      name: "SDK Demo Network",
      uniqueName: env.SETTLEMINT_BLOCKCHAIN_NETWORK,
      status: "Completed",
      healthStatus: "NOT BFT",
      type: "BesuQBFTBlockchainNetwork",
      provider: "gke",
      region: "europe",
      url: `https://console-release.settlemint.com/workspaces/${application.workspace.id}/applications/${application.id}/networks/${blockchainNetwork.id}/details`,
    });
  });

  test("List workspaces", async () => {
    const env = await loadEnv(false, false);
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["platform", "list", "workspaces"]).result;
    expect(output).toContain("Workspaces");
    expect(output).toContain("Name");
    expect(output).toContain("Unique Name");
    expect(env.SETTLEMINT_WORKSPACE).toBeDefined();
    expect(output).toContain(env.SETTLEMINT_WORKSPACE ?? "");
    expect(output).not.toContain("Url");
  });

  test("List workspaces in wide format", async () => {
    const env = await loadEnv(false, false);
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["platform", "list", "workspaces", "-o", "wide"]).result;
    expect(output).toContain("Workspaces");
    expect(output).toContain("Name");
    expect(output).toContain("Unique Name");
    expect(env.SETTLEMINT_WORKSPACE).toBeDefined();
    expect(output).toContain(env.SETTLEMINT_WORKSPACE ?? "");
    expect(output).toContain("Url");
  });

  test("List workspaces in JSON format", async () => {
    const env = await loadEnv(false, false);
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["platform", "list", "workspaces", "-o", "json"]).result;
    const parsed = JSON.parse(output);
    expect(parsed).toBeArray();
    const settlemint = createSettleMintClient({
      accessToken: process.env.SETTLEMINT_ACCESS_TOKEN_E2E_TESTS!,
      instance: env.SETTLEMINT_INSTANCE!,
    });
    const workspace = await settlemint.workspace.read(env.SETTLEMINT_WORKSPACE!);
    expect(parsed).toEqual(
      expect.arrayContaining([
        {
          name: workspace.name,
          uniqueName: workspace.uniqueName,
          url: `https://console-release.settlemint.com/workspaces/${workspace.id}`,
        },
      ]),
    );
  });

  test("List workspaces in YAML format", async () => {
    const env = await loadEnv(false, false);
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["platform", "list", "workspaces", "-o", "yaml"]).result;
    const yaml = parseDocument(output);
    expect(yaml).toBeObject();
    const parsed = yaml.toJSON();
    expect(parsed).toBeArray();
    const settlemint = createSettleMintClient({
      accessToken: process.env.SETTLEMINT_ACCESS_TOKEN_E2E_TESTS!,
      instance: env.SETTLEMINT_INSTANCE!,
    });
    const workspace = await settlemint.workspace.read(env.SETTLEMINT_WORKSPACE!);
    expect(parsed).toEqual(
      expect.arrayContaining([
        {
          name: workspace.name,
          uniqueName: workspace.uniqueName,
          url: `https://console-release.settlemint.com/workspaces/${workspace.id}`,
        },
      ]),
    );
  });

  test("List applications", async () => {
    const env = await loadEnv(false, false);
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["platform", "list", "applications"]).result;
    expect(output).toContain("Applications");
    expect(output).toContain("Name");
    expect(output).toContain("Unique Name");
    expect(env.SETTLEMINT_APPLICATION).toBeDefined();
    expect(output).toContain(env.SETTLEMINT_APPLICATION ?? "");
    expect(output).not.toContain("Url");
  });

  test("List applications in wide format", async () => {
    const env = await loadEnv(false, false);
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["platform", "list", "applications", "-o", "wide"]).result;
    expect(output).toContain("Applications");
    expect(output).toContain("Name");
    expect(output).toContain("Unique Name");
    expect(env.SETTLEMINT_APPLICATION).toBeDefined();
    expect(output).toContain(env.SETTLEMINT_APPLICATION ?? "");
    expect(output).toContain("Url");
  });

  test("List applications in JSON format", async () => {
    const env = await loadEnv(false, false);
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["platform", "list", "applications", "-o", "json"]).result;
    const parsed = JSON.parse(output);
    expect(parsed).toBeArray();
    const settlemint = createSettleMintClient({
      accessToken: process.env.SETTLEMINT_ACCESS_TOKEN_E2E_TESTS!,
      instance: env.SETTLEMINT_INSTANCE!,
    });
    const application = await settlemint.application.read(env.SETTLEMINT_APPLICATION!);
    expect(parsed).toEqual(
      expect.arrayContaining([
        {
          name: application.name,
          uniqueName: application.uniqueName,
          url: `https://console-release.settlemint.com/workspaces/${application.workspace.id}/applications/${application.id}/dashboard`,
        },
      ]),
    );
  });

  test("List applications in YAML format", async () => {
    const env = await loadEnv(false, false);
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["platform", "list", "applications", "-o", "yaml"]).result;
    const yaml = parseDocument(output);
    expect(yaml).toBeObject();
    const parsed = yaml.toJSON();
    expect(parsed).toBeArray();
    const settlemint = createSettleMintClient({
      accessToken: process.env.SETTLEMINT_ACCESS_TOKEN_E2E_TESTS!,
      instance: env.SETTLEMINT_INSTANCE!,
    });
    const application = await settlemint.application.read(env.SETTLEMINT_APPLICATION!);
    expect(parsed).toEqual(
      expect.arrayContaining([
        {
          name: application.name,
          uniqueName: application.uniqueName,
          url: `https://console-release.settlemint.com/workspaces/${application.workspace.id}/applications/${application.id}/dashboard`,
        },
      ]),
    );
  });
});
