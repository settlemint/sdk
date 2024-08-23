import { hasura } from "@/.settlemint/hasura/gql";
import { createLucia } from "@settlemint/sdk-next/auth";

export type DatabaseSessionAttributes = Record<never, never>;
export type DatabaseUserAttributes = Record<never, never>;

declare module "lucia" {
  interface Register {
    Lucia: ReturnType<typeof createLucia>;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

export const { lucia, validateRequest } = createLucia<DatabaseSessionAttributes, DatabaseUserAttributes>({
  client: hasura,
});
