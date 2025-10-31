import { COLLATERAL_CLAIM_TOPIC } from "../../constants/claim-topics";
import { trustedIssuer } from "../../middlewares/auth/trusted-issuer.middleware";
import type { AuthorizationMiddleware } from "../../middlewares/auth/types";

export interface TokenRoutePermissions {
  readonly updateCollateral: ReadonlyArray<AuthorizationMiddleware>;
}

export const tokenPermissions: TokenRoutePermissions = {
  updateCollateral: [trustedIssuer({ claimTopic: COLLATERAL_CLAIM_TOPIC })],
};
