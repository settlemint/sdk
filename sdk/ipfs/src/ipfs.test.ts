import { beforeEach, describe, expect, it, mock } from "bun:test";
import type { ClientOptions, ServerClientOptions } from "./helpers/client-options.schema.js";
import { createIpfsClient, createServerIpfsClient } from "./ipfs.js";

// Mock kubo-rpc-client
const mockCreate = mock(() => ({
  add: mock(),
  get: mock(),
  cat: mock(),
}));

const mockEnsureServer = mock(() => {});

mock.module("kubo-rpc-client", () => ({
  create: mockCreate,
}));

mock.module("@settlemint/sdk-utils/runtime", () => ({
  ensureServer: mockEnsureServer,
}));

describe("createIpfsClient", () => {
  beforeEach(() => {
    mockCreate.mockClear();
  });

  it("should create IPFS client with valid options", () => {
    const options: ClientOptions = {
      instance: "https://ipfs.example.com",
    };

    const result = createIpfsClient(options);

    expect(result).toEqual({
      client: expect.any(Object),
    });
    expect(mockCreate).toHaveBeenCalledWith({
      url: "https://ipfs.example.com",
    });
  });

  it("should throw on invalid options", () => {
    const invalidOptions = {
      instance: "not-a-url",
    } as ClientOptions;

    expect(() => createIpfsClient(invalidOptions)).toThrow();
  });
});

describe("createServerIpfsClient", () => {
  beforeEach(() => {
    mockCreate.mockClear();
    mockEnsureServer.mockClear();
  });

  it("should create server IPFS client with valid options", () => {
    const options: ServerClientOptions = {
      instance: "https://ipfs.example.com",
      accessToken: "sm_aat_abcdef123456789",
    };

    const result = createServerIpfsClient(options);

    expect(result).toEqual({
      client: expect.any(Object),
    });
    expect(mockCreate).toHaveBeenCalledWith({
      url: "https://ipfs.example.com",
      headers: {
        "x-auth-token": "sm_aat_abcdef123456789",
      },
    });
  });

  it("should call ensureServer", () => {
    const options: ServerClientOptions = {
      instance: "https://ipfs.example.com",
      accessToken: "sm_aat_abcdef123456789",
    };

    createServerIpfsClient(options);

    expect(mockEnsureServer).toHaveBeenCalled();
  });

  it("should throw on invalid options", () => {
    const invalidOptions = {
      instance: "not-a-url",
      accessToken: "sm_aat_abcdef123456789",
    } as ServerClientOptions;

    expect(() => createServerIpfsClient(invalidOptions)).toThrow();
  });
});
