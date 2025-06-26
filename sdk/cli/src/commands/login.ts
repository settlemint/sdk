import { instancePrompt } from "@/prompts/instance.prompt";
import { personalAccessTokenPrompt } from "@/prompts/pat.prompt";
import { loginSpinner } from "@/spinners/login.spinner";
import { createExamples } from "@/utils/commands/create-examples";
import { storeCredentials } from "@/utils/config";
import { sanitizeAndValidateInstanceUrl } from "@/utils/instance-url-utils";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { cancel, intro, outro } from "@settlemint/sdk-utils/terminal";
import { PersonalAccessTokenSchema, validate } from "@settlemint/sdk-utils/validation";

/**
 * Creates and returns the 'login' command for the SettleMint SDK CLI.
 * This command stores the personal access token for future use.
 *
 * @returns {Command} The configured 'login' command
 */
export function loginCommand(): Command {
  return new Command("login")
    .description("Login to your SettleMint account.")
    .usage(
      createExamples([
        {
          description: "Login to your SettleMint account",
          command: "login",
        },
        {
          description: "Login to your SettleMint account using a token from STDIN",
          command: "login --token-stdin --accept-defaults",
          commandPrefix: "cat ~/my_token.txt | ",
        },
      ]),
    )
    .option("-a, --accept-defaults", "Accept the default and previously set values")
    .option("--token-stdin", "Provide a token using STDIN")
    .option("-i, --instance <instance>", "The instance to login to (defaults to the instance in the .env file)")
    .action(async ({ acceptDefaults, tokenStdin, instance }, cmd) => {
      intro("Login to your SettleMint account");
      const autoAccept = !!acceptDefaults || !!tokenStdin;
      const env = await loadEnv(false, false);

      const selectedInstance = instance
        ? sanitizeAndValidateInstanceUrl(instance)
        : await instancePrompt({
            env,
            accept: autoAccept,
            freeTextInput: true,
          });

      let personalAccessToken = "";
      if (tokenStdin) {
        if (cmd.args.length > 0) {
          cancel("A token should be provided using STDIN, not as an argument");
        }
        personalAccessToken = await (async () => {
          const chunks: Buffer[] = [];
          let timeout: NodeJS.Timeout | undefined;

          // Set up a timeout to prevent hanging if STDIN never closes
          const timeoutPromise = new Promise<never>((_, reject) => {
            timeout = setTimeout(() => {
              reject(new Error("Timeout reading from STDIN after 30 seconds"));
            }, 1_000);
          });

          try {
            const readPromise = (async () => {
              for await (const chunk of process.stdin) {
                chunks.push(Buffer.from(chunk));
              }
              return Buffer.concat(chunks).toString().trim();
            })();

            const result = await Promise.race([readPromise, timeoutPromise]);
            return result;
          } finally {
            if (timeout) {
              clearTimeout(timeout);
            }
          }
        })();
        try {
          validate(PersonalAccessTokenSchema, personalAccessToken);
        } catch {
          cancel("Invalid personal access token");
        }
      } else {
        personalAccessToken = await personalAccessTokenPrompt(env, selectedInstance, autoAccept);
      }

      // Test the connection by trying to list workspaces
      const client = createSettleMintClient({
        instance: selectedInstance,
        accessToken: personalAccessToken,
      });

      try {
        await loginSpinner(client);
      } catch (_error) {
        cancel(`Invalid personal access token for instance ${selectedInstance}`);
      }

      // If we get here, the connection was successful
      await storeCredentials(personalAccessToken, selectedInstance);

      outro("Successfully logged in to SettleMint!");
    });
}
