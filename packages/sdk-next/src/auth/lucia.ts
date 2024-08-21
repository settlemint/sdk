import type { GraphQLClient } from "graphql-request";
import type { Session, User } from "lucia";
import { Lucia } from "lucia";
import { cookies } from "next/headers.js";
import { cache } from "react";
import { HasuraAdapter } from "./hasura.adapter.js";

export function createLucia<
  SessionAttributes extends {} = Record<never, never>,
  UserAttributes extends {} = Record<never, never>,
>({ client }: { client: GraphQLClient }) {
  const adapter = new HasuraAdapter<SessionAttributes, UserAttributes>({ client });
  const lucia = new Lucia<SessionAttributes, UserAttributes>(adapter, {
    sessionCookie: {
      name: "settlemint",
      attributes: {
        secure: process.env.NODE_ENV === "production",
      },
    },
  });

  return {
    lucia,
    validateRequest: cache(async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
      const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
      if (!sessionId) {
        return {
          user: null,
          session: null,
        };
      }

      const result = await lucia.validateSession(sessionId);
      // next.js throws when you attempt to set cookie when rendering page
      try {
        if (result.session?.fresh) {
          const sessionCookie = lucia.createSessionCookie(result.session.id);
          cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
        if (!result.session) {
          const sessionCookie = lucia.createBlankSessionCookie();
          cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
      } catch {}
      return result;
    }),
  };
}
