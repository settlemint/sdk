import { beforeEach, describe, expect, it, mock } from "bun:test";
import type { ServerClientOptions } from "./helpers/client-options.schema.js";
import { createServerMinioClient } from "./minio.js";

// Mock minio Client
const mockMinioClient = mock(() => ({
  config: {},
  listBuckets: mock(),
  makeBucket: mock(),
  putObject: mock(),
  getObject: mock(),
  removeObject: mock(),
}));

const mockEnsureServer = mock(() => {});

mock.module("minio", () => ({
  Client: mockMinioClient,
}));

mock.module("@settlemint/sdk-utils/runtime", () => ({
  ensureServer: mockEnsureServer,
}));

describe("createServerMinioClient", () => {
  beforeEach(() => {
    mockMinioClient.mockClear();
    mockEnsureServer.mockClear();
  });

  it("should create MinIO client with valid options", () => {
    const options: ServerClientOptions = {
      instance: "https://minio.example.com",
      accessKey: "minioaccess",
      secretKey: "miniosecret",
    };

    const result = createServerMinioClient(options);

    expect(result).toEqual({
      client: expect.any(Object),
    });
    expect(mockMinioClient).toHaveBeenCalledWith({
      endPoint: "minio.example.com",
      accessKey: "minioaccess",
      secretKey: "miniosecret",
      useSSL: true,
      port: undefined,
      region: "eu-central-1",
    });
  });

  it("should create MinIO client with HTTP protocol", () => {
    const options: ServerClientOptions = {
      instance: "http://localhost:9000",
      accessKey: "minioaccess",
      secretKey: "miniosecret",
    };

    createServerMinioClient(options);

    expect(mockMinioClient).toHaveBeenCalledWith({
      endPoint: "localhost",
      accessKey: "minioaccess",
      secretKey: "miniosecret",
      useSSL: false,
      port: 9000,
      region: "eu-central-1",
    });
  });

  it("should create MinIO client with custom port", () => {
    const options: ServerClientOptions = {
      instance: "https://minio.example.com:9443",
      accessKey: "minioaccess",
      secretKey: "miniosecret",
    };

    createServerMinioClient(options);

    expect(mockMinioClient).toHaveBeenCalledWith({
      endPoint: "minio.example.com",
      accessKey: "minioaccess",
      secretKey: "miniosecret",
      useSSL: true,
      port: 9443,
      region: "eu-central-1",
    });
  });

  it("should call ensureServer", () => {
    const options: ServerClientOptions = {
      instance: "https://minio.example.com",
      accessKey: "minioaccess",
      secretKey: "miniosecret",
    };

    createServerMinioClient(options);

    expect(mockEnsureServer).toHaveBeenCalled();
  });

  it("should throw on invalid options", () => {
    const invalidOptions = {
      instance: "not-a-url",
      accessKey: "minioaccess",
      secretKey: "miniosecret",
    } as ServerClientOptions;

    expect(() => createServerMinioClient(invalidOptions)).toThrow();
  });
});
