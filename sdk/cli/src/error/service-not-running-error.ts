import type { BlockchainNode } from "@settlemint/sdk-js";
import { cancel } from "@settlemint/sdk-utils/terminal";

export function serviceNotRunningError(service: string, status: BlockchainNode["status"]) {
  return cancel(`The ${service} service is not in a Running state (status: ${status}). ${getStatusAction(status)}`);
}

function getStatusAction(status: BlockchainNode["status"]) {
  if (status === "PAUSED" || status === "AUTO_PAUSED") {
    return "Please resume the service.";
  }
  if (status === "FAILED") {
    return "Please try restarting the service or contact support.";
  }
  return "Please try again later.";
}
