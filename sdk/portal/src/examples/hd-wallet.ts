import { loadEnv } from "@settlemint/sdk-utils/environment";
import { createLogger, requestLogger } from "@settlemint/sdk-utils/logging";
import type { Address } from "viem";
import { createPortalClient } from "../portal.js"; // Replace this path with "@settlemint/sdk-portal"
import { handleWalletVerificationChallenge } from "../wallet-verification-challenge.js"; // Replace this path with "@settlemint/sdk-portal"
import type { introspection } from "./schemas/portal-env.d.ts"; // Replace this path with the generated introspection type

const env = await loadEnv(false, false);
const logger = createLogger();

const { client: portalClient, graphql: portalGraphql } = createPortalClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    // Change unknown to the type you are using to store metadata
    JSON: unknown;
  };
}>(
  {
    instance: env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT!,
    accessToken: env.SETTLEMINT_ACCESS_TOKEN!,
  },
  {
    fetch: requestLogger(logger, "portal", fetch) as typeof fetch,
  },
);

/**
 * First create a wallet using the HD private key, this needs to be done for every user that is using your app
 */
const wallet = await portalClient.request(
  portalGraphql(`
    mutation createUserWallet($keyVaultId: String!, $name: String!) {
      createWallet(keyVaultId: $keyVaultId, walletInfo: { name: $name }) {
        address
      }
    }
  `),
  {
    keyVaultId: env.SETTLEMINT_HD_PRIVATE_KEY!,
    name: "My Wallet",
  },
);

/**
 * Set a pincode for the wallet, this is used to verify the wallet when the user is sending a transaction to the chain
 */
const pincodeVerification = await portalClient.request(
  portalGraphql(`
    mutation setPinCode($address: String!, $pincode: String!) {
      createWalletVerification(
        userWalletAddress: $address
        verificationInfo: {pincode: {name: "PINCODE", pincode: $pincode}}
      ) {
        id
        name
        parameters
        verificationType
      }
    }
    `),
  {
    address: wallet.createWallet?.address!,
    pincode: "123456",
  },
);

/**
 * Generate a challenge response for the pincode verification
 */
const challengeResponse = await handleWalletVerificationChallenge({
  portalClient,
  portalGraphql,
  verificationId: pincodeVerification.createWalletVerification?.id!,
  userWalletAddress: wallet.createWallet?.address! as Address,
  code: "123456",
  verificationType: "pincode",
});

/**
 * Send a transaction to the chain
 * This is a sample of how to send a transaction to the chain using the portal client and the asset tokenization keyVaultId
 * @see https://github.com/settlemint/asset-tokenization-kit
 */
const result = await portalClient.request(
  portalGraphql(`
    mutation BondMint(
      $challengeResponse: String!,
      $verificationId: String,
      $address: String!,
      $from: String!,
      $input: BondMintInput!
    ) {
      BondMint(
        challengeResponse: $challengeResponse
        verificationId: $verificationId
        address: $address
        from: $from
        input: $input
      ) {
        transactionHash
      }
    }
  `),
  {
    challengeResponse: challengeResponse.challengeResponse,
    verificationId: pincodeVerification.createWalletVerification?.id!,
    address: wallet.createWallet?.address!,
    from: wallet.createWallet?.address!,
    input: {
      to: "0x0000000000000000000000000000000000000000",
      amount: "1000000000000000000",
    },
  },
);

// Log the transaction hash
console.log("Transaction hash:", result.BondMint?.transactionHash);
