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

  test("checks timeout before sleep to prevent overshoot", async () => {
    let callCount = 0;

    // Mock service that changes status on second call
    const mockSlowRead = mock(() => {
      callCount++;
      if (callCount === 1) {
        return Promise.resolve({ status: "PENDING" });
      }
      return Promise.resolve({ status: "COMPLETED" });
    });

    const slowMockService = { read: mockSlowRead, restart: mockRestart };
    // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any
    const slowMockClient = { blockchainNetwork: slowMockService } as any;

    const result = await waitForCompletion({
      settlemint: slowMockClient,
      type: "blockchain network",
      uniqueName: "test-network",
      action: "deploy",
      maxTimeout: 30000, // 30 seconds - enough for test to complete
    });

    // Should complete successfully before timeout
    expect(result).toBe(true);
    expect(callCount).toBe(2); // Should have been called twice
  });

  test("times out properly when maxTimeout is exceeded", async () => {
    // Mock service that never completes
    const mockNeverComplete = mock(() => Promise.resolve({ status: "PENDING" }));
    const neverCompleteMockService = { read: mockNeverComplete, restart: mockRestart };
    // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any
    const neverCompleteMockClient = { blockchainNetwork: neverCompleteMockService } as any;

    await expect(() =>
      waitForCompletion({
        settlemint: neverCompleteMockClient,
        type: "blockchain network",
        uniqueName: "test-network",
        action: "deploy",
        maxTimeout: 50, // Very short timeout for test
      }),
    ).toThrow("Operation timed out after");
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
