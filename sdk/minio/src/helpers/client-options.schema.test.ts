import { describe, expect, it } from "bun:test";
import { ServerClientOptionsSchema } from "./client-options.schema.js";

describe("ServerClientOptionsSchema", () => {
  it("should validate valid server options", () => {
    const validOptions = {
      instance: "https://minio.example.com",
      accessKey: "minioaccess",
      secretKey: "miniosecret",
    };

    const result = ServerClientOptionsSchema.safeParse(validOptions);
    expect(result.success).toBe(true);
  });

  it("should validate options with HTTP protocol", () => {
    const validOptions = {
      instance: "http://localhost:9000",
      accessKey: "minioaccess",
      secretKey: "miniosecret",
    };

    const result = ServerClientOptionsSchema.safeParse(validOptions);
    expect(result.success).toBe(true);
  });

  it("should validate options with custom port", () => {
    const validOptions = {
      instance: "https://minio.example.com:9443",
      accessKey: "minioaccess",
      secretKey: "miniosecret",
    };

    const result = ServerClientOptionsSchema.safeParse(validOptions);
    expect(result.success).toBe(true);
  });

  it("should reject invalid URL", () => {
    const invalidOptions = {
      instance: "not-a-url",
      accessKey: "minioaccess",
      secretKey: "miniosecret",
    };

    const result = ServerClientOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });

  it("should reject missing instance", () => {
    const invalidOptions = {
      accessKey: "minioaccess",
      secretKey: "miniosecret",
    };

    const result = ServerClientOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });

  it("should reject missing access key", () => {
    const invalidOptions = {
      instance: "https://minio.example.com",
      secretKey: "miniosecret",
    };

    const result = ServerClientOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });

  it("should reject missing secret key", () => {
    const invalidOptions = {
      instance: "https://minio.example.com",
      accessKey: "minioaccess",
    };

    const result = ServerClientOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });

  it("should reject empty access/secret keys", () => {
    const invalidOptions = {
      instance: "https://minio.example.com",
      accessKey: "",
      secretKey: "",
    };

    const result = ServerClientOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });
});
