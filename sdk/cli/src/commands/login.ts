import { loginSpinner } from "@/commands/connect/login.spinner";
import { createExamples } from "@/commands/platform/utils/create-examples";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { cancel, intro, outro } from "@settlemint/sdk-utils/terminal";
import { PersonalAccessTokenSchema, validate } from "@settlemint/sdk-utils/validation";
import { setDefaultInstance, storeCredentials } from "../utils/config";
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
    .description(
      `Login to your SettleMint account.\n${createExamples([
        {
          description: "Login to your SettleMint account",
          command: "login",
        },
        {
          description: "Login to your SettleMint account using a token from STDIN",
          command: "login --token-stdin --accept-defaults",
          commandPrefix: "cat ~/my_token.txt | ",
        },
      ])}`,
    )
    .option("-a, --accept-defaults", "Accept the default and previously set values")
    .option("-d, --default", "Set this instance as the default")
    .option("--token-stdin", "Provide a token using STDIN")
    .action(async ({ acceptDefaults, default: isDefault, tokenStdin }) => {
      intro("Login to your SettleMint account");

      const env = await loadEnv(false, false);

      const instance = await instancePrompt(env, !!acceptDefaults);

      let personalAccessToken: string;
      if (tokenStdin) {
        const chunks: Buffer[] = [];
        for await (const chunk of process.stdin) {
          chunks.push(Buffer.from(chunk));
        }
        personalAccessToken = Buffer.concat(chunks).toString().trim();
        try {
          validate(PersonalAccessTokenSchema, personalAccessToken);
        } catch {
          cancel("Invalid personal access token");
        }
      } else {
        personalAccessToken = await personalAccessTokenPrompt(env, instance, !!acceptDefaults);
      }

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

      if (isDefault) {
        await setDefaultInstance(instance);
      }

      outro("Successfully logged in to SettleMint!");
    });
}
