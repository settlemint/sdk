import { missingApplication, missingPersonalAccessTokenError } from "@/error/missing-config-error";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { blockchainNodePrompt } from "@/prompts/cluster-service/blockchain-node.prompt";
import { instancePrompt } from "@/prompts/instance.prompt";
import { serviceSpinner } from "@/spinners/service.spinner";
import { getInstanceCredentials } from "@/utils/config";
import { sanitizeAndValidateInstanceUrl } from "@/utils/instance-url-utils";
import { Command } from "@commander-js/extra-typings";
import password from "@inquirer/password";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, note, outro } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export function pincodeVerificationResponseCommand() {
  return new Command("pincode-verification-response")
    .alias("pvr")
    .description("Get pincode verification response for a blockchain node")
    .requiredOption("--wallet-address <walletAddress>", "The wallet address to get pincode verification response for")
    .option("-i, --instance <instance>", "The instance to connect to (defaults to the instance in the .env file)")
    .option(
      "--blockchain-node <blockchainNode>",
      "Blockchain Node unique name to get pincode verification response for",
    )
    .action(async ({ instance, blockchainNode, walletAddress }) => {
      intro("Generating pincode verification response for wallet address");

      const env: Partial<DotEnv> = await loadEnv(false, false);
      const applicationUniqueName = env.SETTLEMINT_APPLICATION;
      if (!applicationUniqueName) {
        return missingApplication();
      }

      const selectedInstance = instance ? sanitizeAndValidateInstanceUrl(instance) : await instancePrompt(env, true);
      const personalAccessToken = await getInstanceCredentials(selectedInstance);
      if (!personalAccessToken) {
        return missingPersonalAccessTokenError();
      }

      const settlemint = createSettleMintClient({
        accessToken: personalAccessToken.personalAccessToken,
        instance: selectedInstance,
      });

      const blockchainNodes = await serviceSpinner("blockchain node", () =>
        settlemint.blockchainNode.list(applicationUniqueName),
      );
      let selectedBlockchainNode = blockchainNode
        ? blockchainNodes.find((node) => node.uniqueName === blockchainNode)
        : undefined;

      if (!selectedBlockchainNode) {
        selectedBlockchainNode = await blockchainNodePrompt({
          env,
          nodes: blockchainNodes,
          accept: false,
          isRequired: true,
        });
        if (!selectedBlockchainNode) {
          return nothingSelectedError("blockchain node");
        }
      }

      const pincode = await password({
        message: "Enter your pincode",
        validate(value) {
          if (value.length !== 6) {
            return "Pincode must be 6 digits";
          }
          return true;
        },
      });
      const pincodeVerificationResponse = await settlemint.wallet.pincodeVerificationResponse({
        userWalletAddress: walletAddress,
        pincode,
        nodeId: selectedBlockchainNode.id,
      });
      note(`Pincode verification response: ${pincodeVerificationResponse}`);

      outro("Pincode verification response generated");
    });
}
