import type { GraphQLClient } from "graphql-request";
import type { Adapter, DatabaseSession, DatabaseUser } from "lucia";
import type { DatabaseSessionAttributes, DatabaseUserAttributes } from "./lucia.js";

interface HasuraAdapterOptions {
  client: GraphQLClient;
  userAttributesFragment?: string;
  sessionAttributesFragment?: string;
}

export class HasuraAdapter implements Adapter {
  private client: GraphQLClient;

  constructor(options: HasuraAdapterOptions) {
    this.client = options.client;
  }

  async getSessionAndUser(sessionId: string): Promise<[DatabaseSession | null, DatabaseUser | null]> {
    const query = `
      query GetSessionAndUser($sessionId: String!) {
        auth_session_by_pk(id: $sessionId) {
          id
          expires_at
          attributes
          user {
            id
            attributes
          }
        }
      }
    `;

    type GetSessionAndUserResponse = {
      auth_session_by_pk: {
        id: string;
        expires_at: string;
        attributes: DatabaseSessionAttributes;
        user: {
          id: string;
          attributes: DatabaseUserAttributes;
        };
      } | null;
    };

    type GetSessionAndUserVariables = {
      sessionId: string;
    };

    const variables: GetSessionAndUserVariables = { sessionId };

    const data = await this.client.request<GetSessionAndUserResponse>(query, variables);
    if (!data.auth_session_by_pk) {
      return [null, null];
    }

    const session: DatabaseSession = {
      id: data.auth_session_by_pk.id,
      userId: data.auth_session_by_pk.user.id,
      expiresAt: new Date(data.auth_session_by_pk.expires_at),
      attributes: data.auth_session_by_pk.attributes,
    };

    const user: DatabaseUser = {
      id: data.auth_session_by_pk.user.id,
      attributes: data.auth_session_by_pk.user.attributes,
    };

    return [session, user];
  }

  async getUserSessions(userId: string): Promise<DatabaseSession[]> {
    const query = `
      query GetUserSessions($userId: String!) {
        auth_session(where: {user_id: {_eq: $userId}}) {
          id
          expires_at
          attributes
        }
      }
    `;

    type GetUserSessionsResponse = {
      auth_session: {
        id: string;
        expires_at: string;
        attributes: DatabaseSessionAttributes;
      }[];
    };

    type GetUserSessionsVariables = {
      userId: string;
    };

    const variables: GetUserSessionsVariables = { userId };

    const data = await this.client.request<GetUserSessionsResponse>(query, variables);
    return data.auth_session.map((session) => ({
      id: session.id,
      userId,
      expiresAt: new Date(session.expires_at),
      attributes: session.attributes,
    }));
  }

  async setSession(session: DatabaseSession): Promise<void> {
    const mutation = `
      mutation SetSession($id: String!, $userId: String!, $expiresAt: timestamptz!) {
        insert_auth_session_one(object: {id: $id, user_id: $userId, expires_at: $expiresAt}) {
          id
        }
      }
    `;

    type SetSessionResponse = {
      insert_auth_session_one: {
        id: string;
      };
    };

    type SetSessionVariables = {
      id: string;
      userId: string;
      expiresAt: string;
    };

    const variables: SetSessionVariables = {
      id: session.id,
      userId: session.userId,
      expiresAt: session.expiresAt.toISOString(),
    };

    await this.client.request<SetSessionResponse>(mutation, variables);
  }

  async deleteSession(sessionId: string): Promise<void> {
    const mutation = `
      mutation DeleteSession($sessionId: String!) {
        delete_auth_session_by_pk(id: $sessionId) {
          id
        }
      }
    `;

    type DeleteSessionVariables = {
      sessionId: string;
    };

    const variables: DeleteSessionVariables = { sessionId };

    await this.client.request(mutation, variables);
  }

  async deleteUserSessions(userId: string): Promise<void> {
    const mutation = `
      mutation DeleteUserSessions($userId: String!) {
        delete_auth_session(where: {user_id: {_eq: $userId}}) {
          affected_rows
        }
      }
    `;

    type DeleteUserSessionsVariables = {
      userId: string;
    };

    const variables: DeleteUserSessionsVariables = { userId };

    await this.client.request(mutation, variables);
  }

  async deleteExpiredSessions(): Promise<void> {
    const mutation = `
      mutation DeleteExpiredSessions {
        delete_auth_session(where: {expires_at: {_lt: "now()"}}) {
          affected_rows
        }
      }
    `;

    await this.client.request(mutation);
  }

  async updateSessionExpiration(sessionId: string, expiresAt: Date): Promise<void> {
    const mutation = `
      mutation UpdateSessionExpiration($sessionId: String!, $expiresAt: timestamptz!) {
        update_auth_session_by_pk(pk_columns: {id: $sessionId}, _set: {expires_at: $expiresAt}) {
          id
        }
      }
    `;

    type UpdateSessionExpirationVariables = {
      sessionId: string;
      expiresAt: string;
    };

    const variables: UpdateSessionExpirationVariables = {
      sessionId,
      expiresAt: expiresAt.toISOString(),
    };

    await this.client.request(mutation, variables);
  }

  async createUser(userId: string, attributes?: DatabaseUserAttributes): Promise<DatabaseUser> {
    const query = `
      mutation UpsertUser($userId: String!, $attributes: jsonb!) {
        insert_auth_user_one(
          object: {id: $userId, attributes: $attributes},
          on_conflict: {
            constraint: auth_user_pkey,
            update_columns: [attributes]
          }
        ) {
          id
          attributes
        }
        auth_user_aggregate {
          aggregate {
            count
          }
        }
      }
    `;

    type UpsertUserResponse = {
      insert_auth_user_one: {
        id: string;
        attributes: DatabaseUserAttributes;
      };
      auth_user_aggregate: {
        aggregate: {
          count: number;
        };
      };
    };

    type UpsertUserVariables = {
      userId: string;
      attributes: DatabaseUserAttributes;
    };

    const variables: UpsertUserVariables = {
      userId,
      attributes: {
        ...attributes,
        roles: attributes?.roles || [],
      },
    };

    const data = await this.client.request<UpsertUserResponse>(query, variables);

    if (data.auth_user_aggregate.aggregate.count === 1) {
      // If this is the first user, add the admin role
      const updateQuery = `
        mutation UpdateUserRoles($userId: String!) {
          update_auth_user_by_pk(
            pk_columns: {id: $userId},
            _set: {attributes: {roles: ["admin"]}}
          ) {
            id
            attributes
          }
        }
      `;

      type UpdateUserRolesResponse = {
        update_auth_user_by_pk: {
          id: string;
          attributes: DatabaseUserAttributes;
        };
      };

      const updateData = await this.client.request<UpdateUserRolesResponse>(updateQuery, { userId });
      return updateData.update_auth_user_by_pk;
    }

    return data.insert_auth_user_one;
  }
}
