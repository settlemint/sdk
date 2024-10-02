import { ZodError, type ZodSchema } from "zod";

// Import and re-export all schemas
export * from "./schemas/access-token";
export * from "./schemas/application";
export * from "./schemas/base-platform";
export * from "./schemas/blockchain-network";
export * from "./schemas/blockchain-node";
export * from "./schemas/custom-deployment";
export * from "./schemas/ethereum";
export * from "./schemas/insights";
export * from "./schemas/integration-tool";
export * from "./schemas/middleware";
export * from "./schemas/private-key";
export * from "./schemas/search-key";
export * from "./schemas/service-type";
export * from "./schemas/settlemint-client-env";
export * from "./schemas/storage";
export * from "./schemas/unique-name";
export * from "./schemas/url";
export * from "./schemas/workspace";
export * from "./schemas/ws-appl-platform";

export function validate<T extends ZodSchema>(schema: T, value: unknown): T["_output"] {
  try {
    return schema.parse(value);
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.errors.map((err) => `- ${err.path.join(".")}: ${err.message}`).join("\n");
      throw new Error(`Validation error(s):\n${formattedErrors}`);
    }
    throw error; // Re-throw if it's not a ZodError
  }
}
