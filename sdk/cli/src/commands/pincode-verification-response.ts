import { missingApplication, missingPersonalAccessTokenError } from "@/error/missing-config-error";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { blockchainNodePrompt } from "@/prompts/cluster-service/blockchain-node.prompt";
import { instancePrompt } from "@/prompts/instance.prompt";
import { pincodeVerificationPrompt } from "@/prompts/pincode-verification.prompt";
import { serviceSpinner } from "@/spinners/service.spinner";
import { createExamples } from "@/utils/commands/create-examples";
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
    .usage(
      createExamples([
        {
          description: "Get pincode verification response for a wallet address",
          command:
            "settlemint pincode-verification-response --wallet-address 0x1234567890123456789012345678901234567890",
        },
        {
          description:
            "Get pincode verification response for a wallet address and connect to a specific blockchain node",
          command:
            "settlemint pincode-verification-response --wallet-address 0x1234567890123456789012345678901234567890 --blockchain-node my-blockchain-node",
        },
      ]),
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

      const pincodeVerificationChallenges = await settlemint.wallet.pincodeVerificationChallenges({
        userWalletAddress: walletAddress,
        nodeId: selectedBlockchainNode.id,
      });
      const verificationChallenge = await pincodeVerificationPrompt(pincodeVerificationChallenges);

      const pincode = await password({
        message: "Enter your pincode",
        validate(value) {
          if (!value.trim()) {
            return "Pincode is required";
          }
          return true;
        },
      });

      const pincodeVerificationResponse = settlemint.wallet.pincodeVerificationChallengeResponse({
        verificationChallenge,
        pincode,
      });
      note(`Pincode verification response: ${pincodeVerificationResponse}`);

      outro("Pincode verification response generated");
    });
}
