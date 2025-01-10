import { cancel } from "@settlemint/sdk-utils";

export function serviceNotRunningError(service: string, status: string) {
  return cancel(`The ${service} service is not in a Running state (status: ${status}).`);
}
