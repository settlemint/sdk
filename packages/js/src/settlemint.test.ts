import { describe, expect, test } from "bun:test";
import { createSettleMintClient } from "./settlemint.js";

// Mock the GraphQLClient

describe("createSettleMintClient", () => {
  const validOptions = {
    accessToken: "sm_aat_xxxxxxxxxxxxxxxxxxxxxxxx",
    instance: "https://console.settlemint.com",
  };

  test("creates a client with valid options", () => {
    const client = createSettleMintClient(validOptions);
    expect(client).toBeDefined();
    expect(client.workspace).toBeDefined();
    expect(client.blockchainNetwork).toBeDefined();
    expect(client.blockchainNode).toBeDefined();
    expect(client.middleware).toBeDefined();
    expect(client.integrationTool).toBeDefined();
    expect(client.storage).toBeDefined();
    expect(client.privateKey).toBeDefined();
    expect(client.insights).toBeDefined();
    expect(client.customDeployment).toBeDefined();
  });

  test("throws an error with invalid options", () => {
    expect(() => createSettleMintClient({ ...validOptions, accessToken: "" })).toThrow();
    expect(() => createSettleMintClient({ ...validOptions, instance: "invalid-url" })).toThrow();
  });
});

describe("SettleMint client methods", () => {
  const client = createSettleMintClient({
    accessToken: "sm_aat_xxxxxxxxxxxxxxxxxxxxxxxx",
    instance: "https://console.settlemint.com",
  });

  test("workspace methods are defined", () => {
    expect(client.workspace.list).toBeFunction();
    expect(client.workspace.read).toBeFunction();
  });

  test("blockchainNetwork methods are defined", () => {
    expect(client.blockchainNetwork.list).toBeFunction();
    expect(client.blockchainNetwork.read).toBeFunction();
  });

  test("blockchainNode methods are defined", () => {
    expect(client.blockchainNode.list).toBeFunction();
    expect(client.blockchainNode.read).toBeFunction();
  });

  test("middleware methods are defined", () => {
    expect(client.middleware.list).toBeFunction();
    expect(client.middleware.read).toBeFunction();
  });

  test("integrationTool methods are defined", () => {
    expect(client.integrationTool.list).toBeFunction();
    expect(client.integrationTool.read).toBeFunction();
  });

  test("storage methods are defined", () => {
    expect(client.storage.list).toBeFunction();
    expect(client.storage.read).toBeFunction();
  });

  test("privateKey methods are defined", () => {
    expect(client.privateKey.list).toBeFunction();
    expect(client.privateKey.read).toBeFunction();
  });

  test("insights methods are defined", () => {
    expect(client.insights.list).toBeFunction();
    expect(client.insights.read).toBeFunction();
  });

  test("customDeployment methods are defined", () => {
    expect(client.customDeployment.list).toBeFunction();
    expect(client.customDeployment.read).toBeFunction();
  });
});
