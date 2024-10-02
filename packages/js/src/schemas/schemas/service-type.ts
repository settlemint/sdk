import { z } from "zod";

export const ServiceTypeSchema = z.enum([
  "workspace",
  "application",
  "blockchain-network",
  "blockchain-node",
  "smart-contract-set",
  "middleware",
  "integration-tool",
  "storage",
  "private-key",
  "insights",
  "custom-deployment",
]);
export type ServiceType = z.infer<typeof ServiceTypeSchema>;
