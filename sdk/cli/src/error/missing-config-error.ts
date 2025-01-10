import { cancel } from "@settlemint/sdk-utils/terminal";

type ServiceType = "IPFS storage" | "Blockchain node";

export function missingConfigError(type: ServiceType) {
  return cancel(`Please connect to your ${type} service first. Use the "settlemint connect" command to do this.`);
}

export function missingAccessTokenError(personalAccessTokenExists: boolean) {
  if (personalAccessTokenExists) {
    return cancel("No access token found, please run `settlemint connect` to connect to your instance.");
  }

  return cancel(
    "No personal access token found, please run `settlemint login`, then run `settlemint connect` to connect using an application access token.",
  );
}

export function missingPersonalAccessTokenError() {
  return cancel("No personal access token found for instance, please run `settlemint login` to login to your instance");
}

export function missingApplication() {
  return cancel("No application configured, please run `settlemint connect` to connect to your application");
}
