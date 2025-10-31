import type { AuthorizationContext, AuthorizationMiddleware } from "./types";

export interface TrustedIssuerOptions {
  /**
   * Claim topic for which the caller must be registered as a trusted
   * issuer. Topics are represented as either numeric identifiers or
   * descriptive string slugs depending on the deployment setup.
   */
  readonly claimTopic: string | number | bigint;
}

export class MissingTrustedIssuerContextError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MissingTrustedIssuerContextError";
  }
}

export class TrustedIssuerAuthorizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TrustedIssuerAuthorizationError";
  }
}

function hasTopicInSession(context: AuthorizationContext, claimTopic: string | number | bigint): boolean {
  const topics = context.actor?.trustedIssuerClaimTopics ?? [];
  return topics.some((topic) => topic === claimTopic);
}

async function hasTopicInRegistry(
  context: AuthorizationContext,
  claimTopic: string | number | bigint,
  issuer: string,
): Promise<boolean> {
  const registry = context.services?.identityRegistry;
  if (!registry) {
    return false;
  }

  const result = await registry.isTrustedIssuerForClaimTopic(issuer, claimTopic);
  return Boolean(result);
}

/**
 * Middleware factory that ensures the current actor is registered as a
 * trusted issuer for the provided claim topic.
 */
export function trustedIssuer(options: TrustedIssuerOptions): AuthorizationMiddleware {
  const { claimTopic } = options;

  return async (context) => {
    const issuerAddress = context.actor?.address;
    if (!issuerAddress) {
      throw new MissingTrustedIssuerContextError("Missing authenticated actor in authorization context");
    }

    if (hasTopicInSession(context, claimTopic)) {
      return;
    }

    const isTrusted = await hasTopicInRegistry(context, claimTopic, issuerAddress);
    if (!isTrusted) {
      throw new TrustedIssuerAuthorizationError(
        `Actor ${issuerAddress} is not registered as a trusted issuer for claim topic ${String(claimTopic)}`,
      );
    }
  };
}
