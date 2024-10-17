/* eslint-disable */
/* prettier-ignore */

export type introspection_types = {
  Boolean: unknown;
  Int: unknown;
  String: unknown;
  String_array_comparison_exp: {
    kind: "INPUT_OBJECT";
    name: "String_array_comparison_exp";
    isOneOf: false;
    inputFields: [
      {
        name: "_contained_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "_contains";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "_eq";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "_gt";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "_gte";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: {
              kind: "LIST";
              name: never;
              ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
            };
          };
        };
        defaultValue: null;
      },
      { name: "_is_null"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      {
        name: "_lt";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "_lte";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "_neq";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "_nin";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: {
              kind: "LIST";
              name: never;
              ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
            };
          };
        };
        defaultValue: null;
      },
    ];
  };
  String_comparison_exp: {
    kind: "INPUT_OBJECT";
    name: "String_comparison_exp";
    isOneOf: false;
    inputFields: [
      { name: "_eq"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "_gt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "_gte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "_ilike"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "_iregex"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "_is_null"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "_like"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "_lt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "_lte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "_neq"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "_nilike"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "_nin";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "_niregex"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "_nlike"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "_nregex"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "_nsimilar"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "_regex"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "_similar"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
    ];
  };
  cursor_ordering: { name: "cursor_ordering"; enumValues: "ASC" | "DESC" };
  mutation_root: {
    kind: "OBJECT";
    name: "mutation_root";
    fields: {
      delete_starterkit_wallets: {
        name: "delete_starterkit_wallets";
        type: { kind: "OBJECT"; name: "starterkit_wallets_mutation_response"; ofType: null };
      };
      delete_starterkit_wallets_by_pk: {
        name: "delete_starterkit_wallets_by_pk";
        type: { kind: "OBJECT"; name: "starterkit_wallets"; ofType: null };
      };
      insert_starterkit_wallets: {
        name: "insert_starterkit_wallets";
        type: { kind: "OBJECT"; name: "starterkit_wallets_mutation_response"; ofType: null };
      };
      insert_starterkit_wallets_one: {
        name: "insert_starterkit_wallets_one";
        type: { kind: "OBJECT"; name: "starterkit_wallets"; ofType: null };
      };
      update_starterkit_wallets: {
        name: "update_starterkit_wallets";
        type: { kind: "OBJECT"; name: "starterkit_wallets_mutation_response"; ofType: null };
      };
      update_starterkit_wallets_by_pk: {
        name: "update_starterkit_wallets_by_pk";
        type: { kind: "OBJECT"; name: "starterkit_wallets"; ofType: null };
      };
      update_starterkit_wallets_many: {
        name: "update_starterkit_wallets_many";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "OBJECT"; name: "starterkit_wallets_mutation_response"; ofType: null };
        };
      };
    };
  };
  order_by: {
    name: "order_by";
    enumValues: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last";
  };
  query_root: {
    kind: "OBJECT";
    name: "query_root";
    fields: {
      starterkit_wallets: {
        name: "starterkit_wallets";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: {
              kind: "NON_NULL";
              name: never;
              ofType: { kind: "OBJECT"; name: "starterkit_wallets"; ofType: null };
            };
          };
        };
      };
      starterkit_wallets_aggregate: {
        name: "starterkit_wallets_aggregate";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "OBJECT"; name: "starterkit_wallets_aggregate"; ofType: null };
        };
      };
      starterkit_wallets_by_pk: {
        name: "starterkit_wallets_by_pk";
        type: { kind: "OBJECT"; name: "starterkit_wallets"; ofType: null };
      };
    };
  };
  starterkit_wallets: {
    kind: "OBJECT";
    name: "starterkit_wallets";
    fields: {
      email: {
        name: "email";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      password: {
        name: "password";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      role: {
        name: "role";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
      };
      wallet: {
        name: "wallet";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
    };
  };
  starterkit_wallets_aggregate: {
    kind: "OBJECT";
    name: "starterkit_wallets_aggregate";
    fields: {
      aggregate: {
        name: "aggregate";
        type: { kind: "OBJECT"; name: "starterkit_wallets_aggregate_fields"; ofType: null };
      };
      nodes: {
        name: "nodes";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: {
              kind: "NON_NULL";
              name: never;
              ofType: { kind: "OBJECT"; name: "starterkit_wallets"; ofType: null };
            };
          };
        };
      };
    };
  };
  starterkit_wallets_aggregate_fields: {
    kind: "OBJECT";
    name: "starterkit_wallets_aggregate_fields";
    fields: {
      count: {
        name: "count";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      max: { name: "max"; type: { kind: "OBJECT"; name: "starterkit_wallets_max_fields"; ofType: null } };
      min: { name: "min"; type: { kind: "OBJECT"; name: "starterkit_wallets_min_fields"; ofType: null } };
    };
  };
  starterkit_wallets_bool_exp: {
    kind: "INPUT_OBJECT";
    name: "starterkit_wallets_bool_exp";
    isOneOf: false;
    inputFields: [
      {
        name: "_and";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "INPUT_OBJECT"; name: "starterkit_wallets_bool_exp"; ofType: null };
          };
        };
        defaultValue: null;
      },
      {
        name: "_not";
        type: { kind: "INPUT_OBJECT"; name: "starterkit_wallets_bool_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "_or";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "INPUT_OBJECT"; name: "starterkit_wallets_bool_exp"; ofType: null };
          };
        };
        defaultValue: null;
      },
      {
        name: "email";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "password";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "role";
        type: { kind: "INPUT_OBJECT"; name: "String_array_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "wallet";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
    ];
  };
  starterkit_wallets_constraint: {
    name: "starterkit_wallets_constraint";
    enumValues: "starterkit_wallets_pkey" | "starterkit_wallets_wallet_key";
  };
  starterkit_wallets_insert_input: {
    kind: "INPUT_OBJECT";
    name: "starterkit_wallets_insert_input";
    isOneOf: false;
    inputFields: [
      { name: "email"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "password"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "role";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "wallet"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
    ];
  };
  starterkit_wallets_max_fields: {
    kind: "OBJECT";
    name: "starterkit_wallets_max_fields";
    fields: {
      email: { name: "email"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      password: { name: "password"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      role: {
        name: "role";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
      };
      wallet: { name: "wallet"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  starterkit_wallets_min_fields: {
    kind: "OBJECT";
    name: "starterkit_wallets_min_fields";
    fields: {
      email: { name: "email"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      password: { name: "password"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      role: {
        name: "role";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
      };
      wallet: { name: "wallet"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  starterkit_wallets_mutation_response: {
    kind: "OBJECT";
    name: "starterkit_wallets_mutation_response";
    fields: {
      affected_rows: {
        name: "affected_rows";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      returning: {
        name: "returning";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: {
              kind: "NON_NULL";
              name: never;
              ofType: { kind: "OBJECT"; name: "starterkit_wallets"; ofType: null };
            };
          };
        };
      };
    };
  };
  starterkit_wallets_on_conflict: {
    kind: "INPUT_OBJECT";
    name: "starterkit_wallets_on_conflict";
    isOneOf: false;
    inputFields: [
      {
        name: "constraint";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "ENUM"; name: "starterkit_wallets_constraint"; ofType: null };
        };
        defaultValue: null;
      },
      {
        name: "update_columns";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: {
              kind: "NON_NULL";
              name: never;
              ofType: { kind: "ENUM"; name: "starterkit_wallets_update_column"; ofType: null };
            };
          };
        };
        defaultValue: "[]";
      },
      {
        name: "where";
        type: { kind: "INPUT_OBJECT"; name: "starterkit_wallets_bool_exp"; ofType: null };
        defaultValue: null;
      },
    ];
  };
  starterkit_wallets_order_by: {
    kind: "INPUT_OBJECT";
    name: "starterkit_wallets_order_by";
    isOneOf: false;
    inputFields: [
      { name: "email"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "password"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "role"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "wallet"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
    ];
  };
  starterkit_wallets_pk_columns_input: {
    kind: "INPUT_OBJECT";
    name: "starterkit_wallets_pk_columns_input";
    isOneOf: false;
    inputFields: [
      {
        name: "email";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  starterkit_wallets_select_column: {
    name: "starterkit_wallets_select_column";
    enumValues: "email" | "password" | "role" | "wallet";
  };
  starterkit_wallets_set_input: {
    kind: "INPUT_OBJECT";
    name: "starterkit_wallets_set_input";
    isOneOf: false;
    inputFields: [
      { name: "email"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "password"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "role";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "wallet"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
    ];
  };
  starterkit_wallets_stream_cursor_input: {
    kind: "INPUT_OBJECT";
    name: "starterkit_wallets_stream_cursor_input";
    isOneOf: false;
    inputFields: [
      {
        name: "initial_value";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "starterkit_wallets_stream_cursor_value_input"; ofType: null };
        };
        defaultValue: null;
      },
      { name: "ordering"; type: { kind: "ENUM"; name: "cursor_ordering"; ofType: null }; defaultValue: null },
    ];
  };
  starterkit_wallets_stream_cursor_value_input: {
    kind: "INPUT_OBJECT";
    name: "starterkit_wallets_stream_cursor_value_input";
    isOneOf: false;
    inputFields: [
      { name: "email"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "password"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "role";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "wallet"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
    ];
  };
  starterkit_wallets_update_column: {
    name: "starterkit_wallets_update_column";
    enumValues: "email" | "password" | "role" | "wallet";
  };
  starterkit_wallets_updates: {
    kind: "INPUT_OBJECT";
    name: "starterkit_wallets_updates";
    isOneOf: false;
    inputFields: [
      {
        name: "_set";
        type: { kind: "INPUT_OBJECT"; name: "starterkit_wallets_set_input"; ofType: null };
        defaultValue: null;
      },
      {
        name: "where";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "starterkit_wallets_bool_exp"; ofType: null };
        };
        defaultValue: null;
      },
    ];
  };
  subscription_root: {
    kind: "OBJECT";
    name: "subscription_root";
    fields: {
      starterkit_wallets: {
        name: "starterkit_wallets";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: {
              kind: "NON_NULL";
              name: never;
              ofType: { kind: "OBJECT"; name: "starterkit_wallets"; ofType: null };
            };
          };
        };
      };
      starterkit_wallets_aggregate: {
        name: "starterkit_wallets_aggregate";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "OBJECT"; name: "starterkit_wallets_aggregate"; ofType: null };
        };
      };
      starterkit_wallets_by_pk: {
        name: "starterkit_wallets_by_pk";
        type: { kind: "OBJECT"; name: "starterkit_wallets"; ofType: null };
      };
      starterkit_wallets_stream: {
        name: "starterkit_wallets_stream";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: {
              kind: "NON_NULL";
              name: never;
              ofType: { kind: "OBJECT"; name: "starterkit_wallets"; ofType: null };
            };
          };
        };
      };
    };
  };
};

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  name: "hasura";
  query: "query_root";
  mutation: "mutation_root";
  subscription: "subscription_root";
  types: introspection_types;
};

import * as gqlTada from "gql.tada";
