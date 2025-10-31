/**
 * Claim topic identifiers leveraged by the dApp when evaluating
 * permissions. The collateral topic is used to ensure that only trusted
 * issuers assigned to that claim topic are able to manage collateral
 * data through the ORPC surface.
 */
export const COLLATERAL_CLAIM_TOPIC = "collateral" as const;
