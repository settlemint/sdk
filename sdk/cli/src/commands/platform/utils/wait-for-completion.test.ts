/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, mock, test } from "bun:test";
import { waitForCompletion } from "./wait-for-completion.js";

// Mock the settlemint client and services
const mockRead = mock(() => Promise.resolve({ status: "COMPLETED" }));
const mockRestart = mock(() => Promise.resolve());

const mockService = {
  read: mockRead,
  restart: mockRestart,
};

const mockSettlemintClient = {
  blockchainNetwork: mockService,
  blockchainNode: mockService,
  customDeployment: mockService,
  insights: mockService,
  integrationTool: mockService,
  loadBalancer: mockService,
  middleware: mockService,
  privateKey: mockService,
  storage: mockService,
  // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any
} as any;

describe("waitForCompletion", () => {
  test("resolves immediately for workspace resource type", async () => {
    const result = await waitForCompletion({
      settlemint: mockSettlemintClient,
      type: "workspace",
      uniqueName: "test-workspace",
      action: "deploy",
    });

    expect(result).toBe(true);
  });

  test("resolves immediately for application resource type", async () => {
    const result = await waitForCompletion({
      settlemint: mockSettlemintClient,
      type: "application",
      uniqueName: "test-app",
      action: "deploy",
    });

    expect(result).toBe(true);
  });

  test("calls service read method", async () => {
    // Mock service that completes immediately
    const mockCompleteRead = mock(() => Promise.resolve({ status: "COMPLETED" }));
    const completeMockService = { read: mockCompleteRead, restart: mockRestart };
    // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any
    const completeMockClient = { blockchainNetwork: completeMockService } as any;

    const result = await waitForCompletion({
      settlemint: completeMockClient,
      type: "blockchain network",
      uniqueName: "test-network",
      action: "deploy",
    });

    expect(result).toBe(true);
    expect(mockCompleteRead).toHaveBeenCalledWith("test-network");
  });

  test("handles failed status correctly", async () => {
    const mockFailedRead = mock(() => Promise.resolve({ status: "FAILED" }));
    const failedMockService = { read: mockFailedRead, restart: mockRestart };
    // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any
    const failedMockClient = { blockchainNetwork: failedMockService } as any;

    const result = await waitForCompletion({
      settlemint: failedMockClient,
      type: "blockchain network",
      uniqueName: "test-network",
      action: "deploy",
    });

    expect(result).toBe(false);
  });

  test("throws error for unsupported service type", async () => {
    // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any
    const mockClientWithoutService = {} as any;

    await expect(() =>
      waitForCompletion({
        settlemint: mockClientWithoutService,
        type: "blockchain network" as const,
        uniqueName: "test-network",
        action: "deploy",
      }),
    ).toThrow("Service blockchainNetwork does not support status checking");
  });
});
