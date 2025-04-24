import { camelCaseToWords } from "@settlemint/sdk-utils";

export function formatServiceSubType(service: object, printToTerminal = true) {
  if ("__typename" in service && typeof service.__typename === "string") {
    return printToTerminal ? camelCaseToWords(service.__typename) : service.__typename;
  }
  return "Unknown";
}
