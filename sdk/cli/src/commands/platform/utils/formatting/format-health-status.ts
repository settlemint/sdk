import type { BlockchainNode } from "@settlemint/sdk-js";
import { camelCaseToWords, replaceUnderscoresAndHyphensWithSpaces } from "@settlemint/sdk-utils";
import { greenBright, yellowBright } from "yoctocolors";

export function formatHealthStatus(healthStatus: BlockchainNode["healthStatus"], printToTerminal = true) {
  if (healthStatus === "HEALTHY") {
    return printToTerminal ? greenBright("Healthy") : "Healthy";
  }
  const label = camelCaseToWords(replaceUnderscoresAndHyphensWithSpaces(healthStatus));
  return printToTerminal ? yellowBright(label) : label;
}
