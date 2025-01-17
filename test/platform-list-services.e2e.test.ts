import { afterEach, describe, expect, test } from "bun:test";
import {} from "node:fs/promises";
import { $ } from "bun";
import { parseDocument } from "yaml";
import { forceExitAllCommands, runCommand } from "./utils/run-command";

const COMMAND_TEST_SCOPE = __filename;

afterEach(() => {
  forceExitAllCommands(COMMAND_TEST_SCOPE);
});

describe("Test platform list services command", () => {
  test("List services", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["platform", "list", "services"]).result;
    expect(output).toInclude("Blockchain networks");
    expect(output).toInclude("Blockchain nodes");
    expect(output).toInclude("Insights");
    expect(output).toInclude("Integration tools");
    expect(output).toInclude("Middlewares");
    expect(output).toInclude("Private keys");
    expect(output).toInclude("Storage");
    expect(output).not.toInclude("Url");
    expect(output).not.toInclude("https://");
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
    expect(output).not.toInclude("Insights");
    expect(output).not.toInclude("Integration tools");
    expect(output).not.toInclude("Private keys");
    expect(output).not.toInclude("Url");
    expect(output).not.toInclude("https://");
  });

  test("List services in wide format", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["platform", "list", "services", "-o", "wide"]).result;
    expect(output).toInclude("Blockchain networks");
    expect(output).toInclude("Blockchain nodes");
    expect(output).toInclude("Insights");
    expect(output).toInclude("Integration tools");
    expect(output).toInclude("Middlewares");
    expect(output).toInclude("Private keys");
    expect(output).toInclude("Storage");
    expect(output).toInclude("Url");
    expect(output).toInclude("https://");
  });

  test("List services in JSON format", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "list",
      "services",
      "--output",
      "json",
      ">",
      "output.json",
    ]).result;
    const json = JSON.parse(output);
    expect(json).toBeArrayOfSize(7);
    expect(json[0]).toMatchObject({
      label: "Blockchain networks",
      items: [
        {
          name: "Starter Kit Network",
          uniqueName: "starter-kit-network-33b2e",
          status: "Completed",
          healthSatus: "Unhealthy (NOT BFT)",
          type: "BesuQBFTBlockchainNetwork",
          provider: "gke",
          region: "europe",
          url: "https://console-release.settlemint.com/workspaces/6787f8bc22d7484e8478680b/applications/6787f8bd22d7484e8478680d/networks/6787f8bf22d7484e84786810/details",
        },
      ],
    });
  });

  test("List services in JSON format and filter with jq", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["platform", "list", "services", "-o", "json"]).result;
    const jqOutput = await $`echo "${output}" | jq 'first.label'`;
    expect(jqOutput.text()).toBe('"Blockchain networks"\n');
  });

  test("List services in YAML format", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "list",
      "services",
      "--output",
      "yaml",
      ">",
      "output.yaml",
    ]).result;
    const yaml = parseDocument(output);
    expect(yaml).toBeObject();
    const parsedYaml = yaml.toJSON();
    expect(parsedYaml).toBeArrayOfSize(7);
    expect(parsedYaml[0]).toMatchObject({
      label: "Blockchain networks",
      items: [
        {
          name: "Starter Kit Network",
          uniqueName: "starter-kit-network-33b2e",
          status: "Completed",
          healthSatus: "Unhealthy (NOT BFT)",
          type: "BesuQBFTBlockchainNetwork",
          provider: "gke",
          region: "europe",
          url: "https://console-release.settlemint.com/workspaces/6787f8bc22d7484e8478680b/applications/6787f8bd22d7484e8478680d/networks/6787f8bf22d7484e84786810/details",
        },
      ],
    });
  });
});
