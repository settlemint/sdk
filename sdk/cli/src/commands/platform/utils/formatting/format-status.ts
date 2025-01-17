import type { BlockchainNode } from "@settlemint/sdk-js";
import { camelCaseToWords } from "@settlemint/sdk-utils";
import { gray, greenBright, redBright, yellowBright } from "yoctocolors";

export function formatStatus(status: BlockchainNode["status"], printToTerminal = true) {
  const label = camelCaseToWords(status.toLowerCase());
  if (status === "FAILED") {
    return printToTerminal ? redBright(label) : label;
  }
  if (status === "PAUSED" || status === "AUTO_PAUSED" || status === "PAUSING" || status === "AUTO_PAUSING") {
    return printToTerminal ? gray(label) : label;
  }
  if (status === "COMPLETED") {
    return printToTerminal ? greenBright(label) : label;
  }
  return printToTerminal ? yellowBright(label) : label;
}
