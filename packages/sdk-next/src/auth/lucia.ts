import type { GraphQLClient } from "graphql-request";
import type { Session, User } from "lucia";
import { Lucia } from "lucia";
import { cookies } from "next/headers.js";
import { HasuraAdapter } from "./hasura.adapter.js";

export type DatabaseSessionAttributes = Record<never, never>;
export type DatabaseUserAttributes = {
  roles: string[];
};

declare module "lucia" {
  interface Register {
    Lucia: ReturnType<typeof createLucia>["lucia"];
    DatabaseSessionAttributes: DatabaseSessionAttributes;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

export function createLucia({ client }: { client: GraphQLClient }) {
  const adapter = new HasuraAdapter({ client });
  const lucia = new Lucia(adapter, {
    sessionCookie: {
      name: "settlemint",
      attributes: {
        secure: process.env.NODE_ENV === "production",
      },
    },
    getUserAttributes: (attributes) => {
      return {
        roles: attributes.roles,
      };
    },
  });

  return {
    lucia,
    createUser: async (userId: string, attributes?: DatabaseUserAttributes) => {
      await adapter.createUser(userId, attributes);
      const session = await lucia.createSession(userId, {});
      try {
        if (session?.fresh) {
          const sessionCookie = lucia.createSessionCookie(session.id);
          cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
        if (!session) {
          const sessionCookie = lucia.createBlankSessionCookie();
          cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
      } catch {}
      return true;
    },
    validateRequest: async (
      role?: string,
    ): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
      const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
      if (!sessionId) {
        return {
          user: null,
          session: null,
        };
      }

      const result = await lucia.validateSession(sessionId);

      if (role && result.user?.roles?.includes(role)) {
        return {
          user: null,
          session: null,
        };
      }

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
    },
  };
}
