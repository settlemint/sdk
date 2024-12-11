import { loginSpinner } from "@/commands/connect/login.spinner";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { cancel, intro, outro } from "@settlemint/sdk-utils/terminal";
import { storeCredentials } from "../utils/config";
import { instancePrompt } from "./connect/instance.prompt";
import { personalAccessTokenPrompt } from "./connect/pat.prompt";

/**
 * Creates and returns the 'login' command for the SettleMint SDK CLI.
 * This command stores the personal access token for future use.
 *
 * @returns {Command} The configured 'login' command
 */
export function loginCommand(): Command {
  return new Command("login")
    .description("Login to your SettleMint account")
    .option("-a, --accept-defaults", "Accept the default and previously set values")
    .action(async ({ acceptDefaults }) => {
      intro("Logging in to your SettleMint account");

      const env = await loadEnv(false, false);
      const instance = await instancePrompt(env, !!acceptDefaults);
      const personalAccessToken = await personalAccessTokenPrompt(instance);

      // Test the connection by trying to list workspaces
      const client = createSettleMintClient({
        instance,
        accessToken: personalAccessToken,
      });

      try {
        await loginSpinner(client);
      } catch (error) {
        cancel(`Invalid personal access token for instance ${instance}`);
      }

      // If we get here, the connection was successful
      await storeCredentials(personalAccessToken, instance);

      outro("Successfully logged in to SettleMint!");
    });
}
