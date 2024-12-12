import { cancel } from "@settlemint/sdk-utils/terminal";

type ServiceType = "IPFS storage" | "Blockchain node";

export function missingConfigError(type: ServiceType) {
  return cancel(`Please connect to your ${type} service first. Use the "settlemint connect" command to do this.`);
}

export function missingAccessTokenError() {
  return cancel("No access token found, please run `settlemint connect` to connect to your instance");
}
