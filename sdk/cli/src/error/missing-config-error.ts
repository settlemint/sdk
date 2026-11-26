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

export function missingHasuraAdminSecretError(personalAccessTokenExists: boolean) {
  const howToFix =
    "Run `settlemint login` with the personal access token of a workspace admin, or set SETTLEMINT_HASURA_ADMIN_SECRET in your environment or .env.local file.";

  if (personalAccessTokenExists) {
    return cancel(
      `Could not read the Hasura admin secret. The platform returns it only to workspace admins using a personal access token. ${howToFix}`,
    );
  }

  return cancel(
    `Could not read the Hasura admin secret: no personal access token found and SETTLEMINT_HASURA_ADMIN_SECRET is not set. ${howToFix}`,
  );
}

export function missingApplication() {
  return cancel("No application configured, please run `settlemint connect` to connect to your application");
}
