import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, outro, spinner } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Creates and returns the 'workspace' command for the SettleMint SDK.
 * This command creates a new workspace in the SettleMint platform.
 * It takes a name and optional description for the workspace.
 *
 * @returns {Command} The configured 'workspace' command
 */
export function workspaceCreateCommand(): Command<[name: string], { prod?: boolean; description?: string }> {
  return new Command("workspace")
    .alias("w")
    .argument("<name>", "The name of the workspace")
    .option("--prod", "Connect to your production environment")
    .option("--description <description>", "Description of the workspace")
    .option("--tax-id-value <taxIdValue>", "Tax ID value")
    .option("--tax-id-type <taxIdType>", "Tax ID type")
    .option("--postal-code <postalCode>", "Postal code")
    .option("--payment-method-id <paymentMethodId>", "Payment method ID")
    .option("--parent-id <parentId>", "Parent workspace ID")
    .option("--country <country>", "Country")
    .option("--company-name <companyName>", "Company name")
    .option("--city <city>", "City")
    .option("--address-line-2 <addressLine2>", "Address line 2")
    .option("--address-line-1 <addressLine1>", "Address line 1")
    .action(
      async (
        name,
        {
          prod,
          taxIdValue,
          taxIdType,
          postalCode,
          paymentMethodId,
          parentId,
          country,
          companyName,
          city,
          addressLine2,
          addressLine1,
        },
      ) => {
        intro("Creating workspace in the SettleMint platform");

        const env: DotEnv = await loadEnv(true, !!prod);

        const settlemint = createSettleMintClient({
          accessToken: env.SETTLEMINT_ACCESS_TOKEN,
          instance: env.SETTLEMINT_INSTANCE,
        });

        const workspace = await spinner({
          startMessage: "Creating workspace",
          task: async () => {
            return settlemint.workspace.create({
              name,
              taxIdValue,
              taxIdType,
              postalCode,
              paymentMethodId,
              parentId,
              country,
              companyName,
              city,
              addressLine2,
              addressLine1,
            });
          },
          stopMessage: "Workspace created",
        });

        outro(`Workspace ${workspace.name} created successfully`);
      },
    );
}
