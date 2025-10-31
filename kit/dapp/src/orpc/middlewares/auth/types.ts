export interface AuthenticatedActor {
  /**
   * Unique identifier of the actor executing the ORPC request.
   * For end users this is usually the wallet address.
   */
  readonly address: string;

  /**
   * Optional list of claim topics for which the actor is registered
   * as a trusted issuer. This is primarily populated by the
   * authentication layer so permission middleware can perform
   * synchronous checks without additional service calls.
   */
  readonly trustedIssuerClaimTopics?: ReadonlyArray<string | number | bigint>;
}

export interface IdentityRegistryGateway {
  /**
   * Checks whether the provided issuer is trusted for the supplied
   * claim topic. Middleware can rely on this method when the
   * authentication payload does not provide the list of topics.
   */
  isTrustedIssuerForClaimTopic(
    issuer: string,
    claimTopic: string | number | bigint,
  ): Promise<boolean> | boolean;
}

export interface AuthorizationServices {
  readonly identityRegistry?: IdentityRegistryGateway;
}

export interface AuthorizationContext {
  /**
   * The authenticated actor executing the request. When absent the
   * request should be considered unauthenticated.
   */
  readonly actor?: AuthenticatedActor;

  /**
   * Lazily injected services that can be used by middleware to fetch
   * additional authorization information.
   */
  readonly services?: AuthorizationServices;
}

export type AuthorizationMiddleware = (context: AuthorizationContext) => Promise<void> | void;
