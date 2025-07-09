/* eslint-disable */
/* prettier-ignore */

export type introspection_types = {
  Boolean: unknown;
  Boolean_comparison_exp: {
    kind: "INPUT_OBJECT";
    name: "Boolean_comparison_exp";
    isOneOf: false;
    inputFields: [
      { name: "_eq"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "_gt"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "_gte"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      {
        name: "_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "_is_null"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "_lt"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "_lte"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "_neq"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      {
        name: "_nin";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
        };
        defaultValue: null;
      },
    ];
  };
  Float: unknown;
  Int: unknown;
  Int_comparison_exp: {
    kind: "INPUT_OBJECT";
    name: "Int_comparison_exp";
    isOneOf: false;
    inputFields: [
      { name: "_eq"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "_gt"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "_gte"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      {
        name: "_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "_is_null"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "_lt"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "_lte"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "_neq"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      {
        name: "_nin";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        };
        defaultValue: null;
      },
    ];
  };
  String: unknown;
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
  account: {
    kind: "OBJECT";
    name: "account";
    fields: {
      access_token: { name: "access_token"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      access_token_expires_at: {
        name: "access_token_expires_at";
        type: { kind: "SCALAR"; name: "timestamptz"; ofType: null };
      };
      account_id: {
        name: "account_id";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      created_at: {
        name: "created_at";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      };
      id: {
        name: "id";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      id_token: { name: "id_token"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      password: { name: "password"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      provider_id: {
        name: "provider_id";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      refresh_token: { name: "refresh_token"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      refresh_token_expires_at: {
        name: "refresh_token_expires_at";
        type: { kind: "SCALAR"; name: "timestamptz"; ofType: null };
      };
      scope: { name: "scope"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      updated_at: {
        name: "updated_at";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      };
      user_id: {
        name: "user_id";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
    };
  };
  account_aggregate: {
    kind: "OBJECT";
    name: "account_aggregate";
    fields: {
      aggregate: { name: "aggregate"; type: { kind: "OBJECT"; name: "account_aggregate_fields"; ofType: null } };
      nodes: {
        name: "nodes";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "account"; ofType: null } };
          };
        };
      };
    };
  };
  account_aggregate_fields: {
    kind: "OBJECT";
    name: "account_aggregate_fields";
    fields: {
      count: {
        name: "count";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      max: { name: "max"; type: { kind: "OBJECT"; name: "account_max_fields"; ofType: null } };
      min: { name: "min"; type: { kind: "OBJECT"; name: "account_min_fields"; ofType: null } };
    };
  };
  account_bool_exp: {
    kind: "INPUT_OBJECT";
    name: "account_bool_exp";
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
            ofType: { kind: "INPUT_OBJECT"; name: "account_bool_exp"; ofType: null };
          };
        };
        defaultValue: null;
      },
      { name: "_not"; type: { kind: "INPUT_OBJECT"; name: "account_bool_exp"; ofType: null }; defaultValue: null },
      {
        name: "_or";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "INPUT_OBJECT"; name: "account_bool_exp"; ofType: null };
          };
        };
        defaultValue: null;
      },
      {
        name: "access_token";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "access_token_expires_at";
        type: { kind: "INPUT_OBJECT"; name: "timestamptz_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "account_id";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "created_at";
        type: { kind: "INPUT_OBJECT"; name: "timestamptz_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      { name: "id"; type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null }; defaultValue: null },
      {
        name: "id_token";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "password";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "provider_id";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "refresh_token";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "refresh_token_expires_at";
        type: { kind: "INPUT_OBJECT"; name: "timestamptz_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "scope";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "updated_at";
        type: { kind: "INPUT_OBJECT"; name: "timestamptz_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "user_id";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
    ];
  };
  account_constraint: { name: "account_constraint"; enumValues: "account_pkey" };
  account_insert_input: {
    kind: "INPUT_OBJECT";
    name: "account_insert_input";
    isOneOf: false;
    inputFields: [
      { name: "access_token"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "access_token_expires_at";
        type: { kind: "SCALAR"; name: "timestamptz"; ofType: null };
        defaultValue: null;
      },
      { name: "account_id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "id_token"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "password"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "provider_id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "refresh_token"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "refresh_token_expires_at";
        type: { kind: "SCALAR"; name: "timestamptz"; ofType: null };
        defaultValue: null;
      },
      { name: "scope"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "user_id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
    ];
  };
  account_max_fields: {
    kind: "OBJECT";
    name: "account_max_fields";
    fields: {
      access_token: { name: "access_token"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      access_token_expires_at: {
        name: "access_token_expires_at";
        type: { kind: "SCALAR"; name: "timestamptz"; ofType: null };
      };
      account_id: { name: "account_id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      created_at: { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      id_token: { name: "id_token"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      password: { name: "password"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      provider_id: { name: "provider_id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      refresh_token: { name: "refresh_token"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      refresh_token_expires_at: {
        name: "refresh_token_expires_at";
        type: { kind: "SCALAR"; name: "timestamptz"; ofType: null };
      };
      scope: { name: "scope"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      updated_at: { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      user_id: { name: "user_id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  account_min_fields: {
    kind: "OBJECT";
    name: "account_min_fields";
    fields: {
      access_token: { name: "access_token"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      access_token_expires_at: {
        name: "access_token_expires_at";
        type: { kind: "SCALAR"; name: "timestamptz"; ofType: null };
      };
      account_id: { name: "account_id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      created_at: { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      id_token: { name: "id_token"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      password: { name: "password"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      provider_id: { name: "provider_id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      refresh_token: { name: "refresh_token"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      refresh_token_expires_at: {
        name: "refresh_token_expires_at";
        type: { kind: "SCALAR"; name: "timestamptz"; ofType: null };
      };
      scope: { name: "scope"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      updated_at: { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      user_id: { name: "user_id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  account_mutation_response: {
    kind: "OBJECT";
    name: "account_mutation_response";
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
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "account"; ofType: null } };
          };
        };
      };
    };
  };
  account_on_conflict: {
    kind: "INPUT_OBJECT";
    name: "account_on_conflict";
    isOneOf: false;
    inputFields: [
      {
        name: "constraint";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "ENUM"; name: "account_constraint"; ofType: null } };
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
              ofType: { kind: "ENUM"; name: "account_update_column"; ofType: null };
            };
          };
        };
        defaultValue: "[]";
      },
      { name: "where"; type: { kind: "INPUT_OBJECT"; name: "account_bool_exp"; ofType: null }; defaultValue: null },
    ];
  };
  account_order_by: {
    kind: "INPUT_OBJECT";
    name: "account_order_by";
    isOneOf: false;
    inputFields: [
      { name: "access_token"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "access_token_expires_at"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "account_id"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "created_at"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "id"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "id_token"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "password"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "provider_id"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "refresh_token"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "refresh_token_expires_at"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "scope"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "updated_at"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "user_id"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
    ];
  };
  account_pk_columns_input: {
    kind: "INPUT_OBJECT";
    name: "account_pk_columns_input";
    isOneOf: false;
    inputFields: [
      {
        name: "id";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  account_select_column: {
    name: "account_select_column";
    enumValues:
      | "access_token"
      | "access_token_expires_at"
      | "account_id"
      | "created_at"
      | "id"
      | "id_token"
      | "password"
      | "provider_id"
      | "refresh_token"
      | "refresh_token_expires_at"
      | "scope"
      | "updated_at"
      | "user_id";
  };
  account_set_input: {
    kind: "INPUT_OBJECT";
    name: "account_set_input";
    isOneOf: false;
    inputFields: [
      { name: "access_token"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "access_token_expires_at";
        type: { kind: "SCALAR"; name: "timestamptz"; ofType: null };
        defaultValue: null;
      },
      { name: "account_id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "id_token"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "password"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "provider_id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "refresh_token"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "refresh_token_expires_at";
        type: { kind: "SCALAR"; name: "timestamptz"; ofType: null };
        defaultValue: null;
      },
      { name: "scope"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "user_id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
    ];
  };
  account_stream_cursor_input: {
    kind: "INPUT_OBJECT";
    name: "account_stream_cursor_input";
    isOneOf: false;
    inputFields: [
      {
        name: "initial_value";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "account_stream_cursor_value_input"; ofType: null };
        };
        defaultValue: null;
      },
      { name: "ordering"; type: { kind: "ENUM"; name: "cursor_ordering"; ofType: null }; defaultValue: null },
    ];
  };
  account_stream_cursor_value_input: {
    kind: "INPUT_OBJECT";
    name: "account_stream_cursor_value_input";
    isOneOf: false;
    inputFields: [
      { name: "access_token"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "access_token_expires_at";
        type: { kind: "SCALAR"; name: "timestamptz"; ofType: null };
        defaultValue: null;
      },
      { name: "account_id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "id_token"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "password"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "provider_id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "refresh_token"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "refresh_token_expires_at";
        type: { kind: "SCALAR"; name: "timestamptz"; ofType: null };
        defaultValue: null;
      },
      { name: "scope"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "user_id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
    ];
  };
  account_update_column: {
    name: "account_update_column";
    enumValues:
      | "access_token"
      | "access_token_expires_at"
      | "account_id"
      | "created_at"
      | "id"
      | "id_token"
      | "password"
      | "provider_id"
      | "refresh_token"
      | "refresh_token_expires_at"
      | "scope"
      | "updated_at"
      | "user_id";
  };
  account_updates: {
    kind: "INPUT_OBJECT";
    name: "account_updates";
    isOneOf: false;
    inputFields: [
      { name: "_set"; type: { kind: "INPUT_OBJECT"; name: "account_set_input"; ofType: null }; defaultValue: null },
      {
        name: "where";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "account_bool_exp"; ofType: null };
        };
        defaultValue: null;
      },
    ];
  };
  apikey: {
    kind: "OBJECT";
    name: "apikey";
    fields: {
      created_at: {
        name: "created_at";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      };
      enabled: { name: "enabled"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      expires_at: { name: "expires_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      id: {
        name: "id";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      key: {
        name: "key";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      last_refill_at: { name: "last_refill_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      last_request: { name: "last_request"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      metadata: { name: "metadata"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      permissions: { name: "permissions"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      prefix: { name: "prefix"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      rate_limit_enabled: { name: "rate_limit_enabled"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      rate_limit_max: { name: "rate_limit_max"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      rate_limit_time_window: { name: "rate_limit_time_window"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      refill_amount: { name: "refill_amount"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      refill_interval: { name: "refill_interval"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      remaining: { name: "remaining"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      request_count: { name: "request_count"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      start: { name: "start"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      updated_at: {
        name: "updated_at";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      };
      user_id: {
        name: "user_id";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
    };
  };
  apikey_aggregate: {
    kind: "OBJECT";
    name: "apikey_aggregate";
    fields: {
      aggregate: { name: "aggregate"; type: { kind: "OBJECT"; name: "apikey_aggregate_fields"; ofType: null } };
      nodes: {
        name: "nodes";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "apikey"; ofType: null } };
          };
        };
      };
    };
  };
  apikey_aggregate_fields: {
    kind: "OBJECT";
    name: "apikey_aggregate_fields";
    fields: {
      avg: { name: "avg"; type: { kind: "OBJECT"; name: "apikey_avg_fields"; ofType: null } };
      count: {
        name: "count";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      max: { name: "max"; type: { kind: "OBJECT"; name: "apikey_max_fields"; ofType: null } };
      min: { name: "min"; type: { kind: "OBJECT"; name: "apikey_min_fields"; ofType: null } };
      stddev: { name: "stddev"; type: { kind: "OBJECT"; name: "apikey_stddev_fields"; ofType: null } };
      stddev_pop: { name: "stddev_pop"; type: { kind: "OBJECT"; name: "apikey_stddev_pop_fields"; ofType: null } };
      stddev_samp: { name: "stddev_samp"; type: { kind: "OBJECT"; name: "apikey_stddev_samp_fields"; ofType: null } };
      sum: { name: "sum"; type: { kind: "OBJECT"; name: "apikey_sum_fields"; ofType: null } };
      var_pop: { name: "var_pop"; type: { kind: "OBJECT"; name: "apikey_var_pop_fields"; ofType: null } };
      var_samp: { name: "var_samp"; type: { kind: "OBJECT"; name: "apikey_var_samp_fields"; ofType: null } };
      variance: { name: "variance"; type: { kind: "OBJECT"; name: "apikey_variance_fields"; ofType: null } };
    };
  };
  apikey_avg_fields: {
    kind: "OBJECT";
    name: "apikey_avg_fields";
    fields: {
      rate_limit_max: { name: "rate_limit_max"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      rate_limit_time_window: { name: "rate_limit_time_window"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      refill_amount: { name: "refill_amount"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      refill_interval: { name: "refill_interval"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      remaining: { name: "remaining"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      request_count: { name: "request_count"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
    };
  };
  apikey_bool_exp: {
    kind: "INPUT_OBJECT";
    name: "apikey_bool_exp";
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
            ofType: { kind: "INPUT_OBJECT"; name: "apikey_bool_exp"; ofType: null };
          };
        };
        defaultValue: null;
      },
      { name: "_not"; type: { kind: "INPUT_OBJECT"; name: "apikey_bool_exp"; ofType: null }; defaultValue: null },
      {
        name: "_or";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "INPUT_OBJECT"; name: "apikey_bool_exp"; ofType: null };
          };
        };
        defaultValue: null;
      },
      {
        name: "created_at";
        type: { kind: "INPUT_OBJECT"; name: "timestamptz_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "enabled";
        type: { kind: "INPUT_OBJECT"; name: "Boolean_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "expires_at";
        type: { kind: "INPUT_OBJECT"; name: "timestamptz_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      { name: "id"; type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null }; defaultValue: null },
      { name: "key"; type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null }; defaultValue: null },
      {
        name: "last_refill_at";
        type: { kind: "INPUT_OBJECT"; name: "timestamptz_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "last_request";
        type: { kind: "INPUT_OBJECT"; name: "timestamptz_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "metadata";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      { name: "name"; type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null }; defaultValue: null },
      {
        name: "permissions";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "prefix";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "rate_limit_enabled";
        type: { kind: "INPUT_OBJECT"; name: "Boolean_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "rate_limit_max";
        type: { kind: "INPUT_OBJECT"; name: "Int_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "rate_limit_time_window";
        type: { kind: "INPUT_OBJECT"; name: "Int_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "refill_amount";
        type: { kind: "INPUT_OBJECT"; name: "Int_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "refill_interval";
        type: { kind: "INPUT_OBJECT"; name: "Int_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "remaining";
        type: { kind: "INPUT_OBJECT"; name: "Int_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "request_count";
        type: { kind: "INPUT_OBJECT"; name: "Int_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "start";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "updated_at";
        type: { kind: "INPUT_OBJECT"; name: "timestamptz_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "user_id";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
    ];
  };
  apikey_constraint: { name: "apikey_constraint"; enumValues: "apikey_pkey" };
  apikey_inc_input: {
    kind: "INPUT_OBJECT";
    name: "apikey_inc_input";
    isOneOf: false;
    inputFields: [
      { name: "rate_limit_max"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "rate_limit_time_window"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "refill_amount"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "refill_interval"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "remaining"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "request_count"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
    ];
  };
  apikey_insert_input: {
    kind: "INPUT_OBJECT";
    name: "apikey_insert_input";
    isOneOf: false;
    inputFields: [
      { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "enabled"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "expires_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "key"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "last_refill_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "last_request"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "metadata"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "permissions"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "prefix"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "rate_limit_enabled"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "rate_limit_max"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "rate_limit_time_window"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "refill_amount"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "refill_interval"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "remaining"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "request_count"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "start"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "user_id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
    ];
  };
  apikey_max_fields: {
    kind: "OBJECT";
    name: "apikey_max_fields";
    fields: {
      created_at: { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      expires_at: { name: "expires_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      key: { name: "key"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      last_refill_at: { name: "last_refill_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      last_request: { name: "last_request"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      metadata: { name: "metadata"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      permissions: { name: "permissions"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      prefix: { name: "prefix"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      rate_limit_max: { name: "rate_limit_max"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      rate_limit_time_window: { name: "rate_limit_time_window"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      refill_amount: { name: "refill_amount"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      refill_interval: { name: "refill_interval"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      remaining: { name: "remaining"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      request_count: { name: "request_count"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      start: { name: "start"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      updated_at: { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      user_id: { name: "user_id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  apikey_min_fields: {
    kind: "OBJECT";
    name: "apikey_min_fields";
    fields: {
      created_at: { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      expires_at: { name: "expires_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      key: { name: "key"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      last_refill_at: { name: "last_refill_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      last_request: { name: "last_request"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      metadata: { name: "metadata"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      permissions: { name: "permissions"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      prefix: { name: "prefix"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      rate_limit_max: { name: "rate_limit_max"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      rate_limit_time_window: { name: "rate_limit_time_window"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      refill_amount: { name: "refill_amount"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      refill_interval: { name: "refill_interval"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      remaining: { name: "remaining"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      request_count: { name: "request_count"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      start: { name: "start"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      updated_at: { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      user_id: { name: "user_id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  apikey_mutation_response: {
    kind: "OBJECT";
    name: "apikey_mutation_response";
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
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "apikey"; ofType: null } };
          };
        };
      };
    };
  };
  apikey_on_conflict: {
    kind: "INPUT_OBJECT";
    name: "apikey_on_conflict";
    isOneOf: false;
    inputFields: [
      {
        name: "constraint";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "ENUM"; name: "apikey_constraint"; ofType: null } };
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
              ofType: { kind: "ENUM"; name: "apikey_update_column"; ofType: null };
            };
          };
        };
        defaultValue: "[]";
      },
      { name: "where"; type: { kind: "INPUT_OBJECT"; name: "apikey_bool_exp"; ofType: null }; defaultValue: null },
    ];
  };
  apikey_order_by: {
    kind: "INPUT_OBJECT";
    name: "apikey_order_by";
    isOneOf: false;
    inputFields: [
      { name: "created_at"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "enabled"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "expires_at"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "id"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "key"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "last_refill_at"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "last_request"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "metadata"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "name"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "permissions"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "prefix"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "rate_limit_enabled"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "rate_limit_max"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "rate_limit_time_window"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "refill_amount"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "refill_interval"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "remaining"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "request_count"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "start"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "updated_at"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "user_id"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
    ];
  };
  apikey_pk_columns_input: {
    kind: "INPUT_OBJECT";
    name: "apikey_pk_columns_input";
    isOneOf: false;
    inputFields: [
      {
        name: "id";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  apikey_select_column: {
    name: "apikey_select_column";
    enumValues:
      | "created_at"
      | "enabled"
      | "expires_at"
      | "id"
      | "key"
      | "last_refill_at"
      | "last_request"
      | "metadata"
      | "name"
      | "permissions"
      | "prefix"
      | "rate_limit_enabled"
      | "rate_limit_max"
      | "rate_limit_time_window"
      | "refill_amount"
      | "refill_interval"
      | "remaining"
      | "request_count"
      | "start"
      | "updated_at"
      | "user_id";
  };
  apikey_set_input: {
    kind: "INPUT_OBJECT";
    name: "apikey_set_input";
    isOneOf: false;
    inputFields: [
      { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "enabled"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "expires_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "key"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "last_refill_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "last_request"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "metadata"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "permissions"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "prefix"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "rate_limit_enabled"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "rate_limit_max"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "rate_limit_time_window"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "refill_amount"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "refill_interval"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "remaining"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "request_count"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "start"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "user_id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
    ];
  };
  apikey_stddev_fields: {
    kind: "OBJECT";
    name: "apikey_stddev_fields";
    fields: {
      rate_limit_max: { name: "rate_limit_max"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      rate_limit_time_window: { name: "rate_limit_time_window"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      refill_amount: { name: "refill_amount"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      refill_interval: { name: "refill_interval"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      remaining: { name: "remaining"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      request_count: { name: "request_count"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
    };
  };
  apikey_stddev_pop_fields: {
    kind: "OBJECT";
    name: "apikey_stddev_pop_fields";
    fields: {
      rate_limit_max: { name: "rate_limit_max"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      rate_limit_time_window: { name: "rate_limit_time_window"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      refill_amount: { name: "refill_amount"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      refill_interval: { name: "refill_interval"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      remaining: { name: "remaining"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      request_count: { name: "request_count"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
    };
  };
  apikey_stddev_samp_fields: {
    kind: "OBJECT";
    name: "apikey_stddev_samp_fields";
    fields: {
      rate_limit_max: { name: "rate_limit_max"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      rate_limit_time_window: { name: "rate_limit_time_window"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      refill_amount: { name: "refill_amount"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      refill_interval: { name: "refill_interval"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      remaining: { name: "remaining"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      request_count: { name: "request_count"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
    };
  };
  apikey_stream_cursor_input: {
    kind: "INPUT_OBJECT";
    name: "apikey_stream_cursor_input";
    isOneOf: false;
    inputFields: [
      {
        name: "initial_value";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "apikey_stream_cursor_value_input"; ofType: null };
        };
        defaultValue: null;
      },
      { name: "ordering"; type: { kind: "ENUM"; name: "cursor_ordering"; ofType: null }; defaultValue: null },
    ];
  };
  apikey_stream_cursor_value_input: {
    kind: "INPUT_OBJECT";
    name: "apikey_stream_cursor_value_input";
    isOneOf: false;
    inputFields: [
      { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "enabled"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "expires_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "key"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "last_refill_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "last_request"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "metadata"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "permissions"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "prefix"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "rate_limit_enabled"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "rate_limit_max"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "rate_limit_time_window"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "refill_amount"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "refill_interval"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "remaining"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "request_count"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "start"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "user_id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
    ];
  };
  apikey_sum_fields: {
    kind: "OBJECT";
    name: "apikey_sum_fields";
    fields: {
      rate_limit_max: { name: "rate_limit_max"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      rate_limit_time_window: { name: "rate_limit_time_window"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      refill_amount: { name: "refill_amount"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      refill_interval: { name: "refill_interval"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      remaining: { name: "remaining"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      request_count: { name: "request_count"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
    };
  };
  apikey_update_column: {
    name: "apikey_update_column";
    enumValues:
      | "created_at"
      | "enabled"
      | "expires_at"
      | "id"
      | "key"
      | "last_refill_at"
      | "last_request"
      | "metadata"
      | "name"
      | "permissions"
      | "prefix"
      | "rate_limit_enabled"
      | "rate_limit_max"
      | "rate_limit_time_window"
      | "refill_amount"
      | "refill_interval"
      | "remaining"
      | "request_count"
      | "start"
      | "updated_at"
      | "user_id";
  };
  apikey_updates: {
    kind: "INPUT_OBJECT";
    name: "apikey_updates";
    isOneOf: false;
    inputFields: [
      { name: "_inc"; type: { kind: "INPUT_OBJECT"; name: "apikey_inc_input"; ofType: null }; defaultValue: null },
      { name: "_set"; type: { kind: "INPUT_OBJECT"; name: "apikey_set_input"; ofType: null }; defaultValue: null },
      {
        name: "where";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "apikey_bool_exp"; ofType: null };
        };
        defaultValue: null;
      },
    ];
  };
  apikey_var_pop_fields: {
    kind: "OBJECT";
    name: "apikey_var_pop_fields";
    fields: {
      rate_limit_max: { name: "rate_limit_max"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      rate_limit_time_window: { name: "rate_limit_time_window"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      refill_amount: { name: "refill_amount"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      refill_interval: { name: "refill_interval"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      remaining: { name: "remaining"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      request_count: { name: "request_count"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
    };
  };
  apikey_var_samp_fields: {
    kind: "OBJECT";
    name: "apikey_var_samp_fields";
    fields: {
      rate_limit_max: { name: "rate_limit_max"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      rate_limit_time_window: { name: "rate_limit_time_window"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      refill_amount: { name: "refill_amount"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      refill_interval: { name: "refill_interval"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      remaining: { name: "remaining"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      request_count: { name: "request_count"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
    };
  };
  apikey_variance_fields: {
    kind: "OBJECT";
    name: "apikey_variance_fields";
    fields: {
      rate_limit_max: { name: "rate_limit_max"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      rate_limit_time_window: { name: "rate_limit_time_window"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      refill_amount: { name: "refill_amount"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      refill_interval: { name: "refill_interval"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      remaining: { name: "remaining"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      request_count: { name: "request_count"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
    };
  };
  cursor_ordering: { name: "cursor_ordering"; enumValues: "ASC" | "DESC" };
  mutation_root: {
    kind: "OBJECT";
    name: "mutation_root";
    fields: {
      delete_account: {
        name: "delete_account";
        type: { kind: "OBJECT"; name: "account_mutation_response"; ofType: null };
      };
      delete_account_by_pk: { name: "delete_account_by_pk"; type: { kind: "OBJECT"; name: "account"; ofType: null } };
      delete_apikey: {
        name: "delete_apikey";
        type: { kind: "OBJECT"; name: "apikey_mutation_response"; ofType: null };
      };
      delete_apikey_by_pk: { name: "delete_apikey_by_pk"; type: { kind: "OBJECT"; name: "apikey"; ofType: null } };
      delete_passkey: {
        name: "delete_passkey";
        type: { kind: "OBJECT"; name: "passkey_mutation_response"; ofType: null };
      };
      delete_passkey_by_pk: { name: "delete_passkey_by_pk"; type: { kind: "OBJECT"; name: "passkey"; ofType: null } };
      delete_session: {
        name: "delete_session";
        type: { kind: "OBJECT"; name: "session_mutation_response"; ofType: null };
      };
      delete_session_by_pk: { name: "delete_session_by_pk"; type: { kind: "OBJECT"; name: "session"; ofType: null } };
      delete_settings: {
        name: "delete_settings";
        type: { kind: "OBJECT"; name: "settings_mutation_response"; ofType: null };
      };
      delete_settings_by_pk: {
        name: "delete_settings_by_pk";
        type: { kind: "OBJECT"; name: "settings"; ofType: null };
      };
      delete_user: { name: "delete_user"; type: { kind: "OBJECT"; name: "user_mutation_response"; ofType: null } };
      delete_user_by_pk: { name: "delete_user_by_pk"; type: { kind: "OBJECT"; name: "user"; ofType: null } };
      delete_verification: {
        name: "delete_verification";
        type: { kind: "OBJECT"; name: "verification_mutation_response"; ofType: null };
      };
      delete_verification_by_pk: {
        name: "delete_verification_by_pk";
        type: { kind: "OBJECT"; name: "verification"; ofType: null };
      };
      insert_account: {
        name: "insert_account";
        type: { kind: "OBJECT"; name: "account_mutation_response"; ofType: null };
      };
      insert_account_one: { name: "insert_account_one"; type: { kind: "OBJECT"; name: "account"; ofType: null } };
      insert_apikey: {
        name: "insert_apikey";
        type: { kind: "OBJECT"; name: "apikey_mutation_response"; ofType: null };
      };
      insert_apikey_one: { name: "insert_apikey_one"; type: { kind: "OBJECT"; name: "apikey"; ofType: null } };
      insert_passkey: {
        name: "insert_passkey";
        type: { kind: "OBJECT"; name: "passkey_mutation_response"; ofType: null };
      };
      insert_passkey_one: { name: "insert_passkey_one"; type: { kind: "OBJECT"; name: "passkey"; ofType: null } };
      insert_session: {
        name: "insert_session";
        type: { kind: "OBJECT"; name: "session_mutation_response"; ofType: null };
      };
      insert_session_one: { name: "insert_session_one"; type: { kind: "OBJECT"; name: "session"; ofType: null } };
      insert_settings: {
        name: "insert_settings";
        type: { kind: "OBJECT"; name: "settings_mutation_response"; ofType: null };
      };
      insert_settings_one: { name: "insert_settings_one"; type: { kind: "OBJECT"; name: "settings"; ofType: null } };
      insert_user: { name: "insert_user"; type: { kind: "OBJECT"; name: "user_mutation_response"; ofType: null } };
      insert_user_one: { name: "insert_user_one"; type: { kind: "OBJECT"; name: "user"; ofType: null } };
      insert_verification: {
        name: "insert_verification";
        type: { kind: "OBJECT"; name: "verification_mutation_response"; ofType: null };
      };
      insert_verification_one: {
        name: "insert_verification_one";
        type: { kind: "OBJECT"; name: "verification"; ofType: null };
      };
      update_account: {
        name: "update_account";
        type: { kind: "OBJECT"; name: "account_mutation_response"; ofType: null };
      };
      update_account_by_pk: { name: "update_account_by_pk"; type: { kind: "OBJECT"; name: "account"; ofType: null } };
      update_account_many: {
        name: "update_account_many";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "OBJECT"; name: "account_mutation_response"; ofType: null };
        };
      };
      update_apikey: {
        name: "update_apikey";
        type: { kind: "OBJECT"; name: "apikey_mutation_response"; ofType: null };
      };
      update_apikey_by_pk: { name: "update_apikey_by_pk"; type: { kind: "OBJECT"; name: "apikey"; ofType: null } };
      update_apikey_many: {
        name: "update_apikey_many";
        type: { kind: "LIST"; name: never; ofType: { kind: "OBJECT"; name: "apikey_mutation_response"; ofType: null } };
      };
      update_passkey: {
        name: "update_passkey";
        type: { kind: "OBJECT"; name: "passkey_mutation_response"; ofType: null };
      };
      update_passkey_by_pk: { name: "update_passkey_by_pk"; type: { kind: "OBJECT"; name: "passkey"; ofType: null } };
      update_passkey_many: {
        name: "update_passkey_many";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "OBJECT"; name: "passkey_mutation_response"; ofType: null };
        };
      };
      update_session: {
        name: "update_session";
        type: { kind: "OBJECT"; name: "session_mutation_response"; ofType: null };
      };
      update_session_by_pk: { name: "update_session_by_pk"; type: { kind: "OBJECT"; name: "session"; ofType: null } };
      update_session_many: {
        name: "update_session_many";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "OBJECT"; name: "session_mutation_response"; ofType: null };
        };
      };
      update_settings: {
        name: "update_settings";
        type: { kind: "OBJECT"; name: "settings_mutation_response"; ofType: null };
      };
      update_settings_by_pk: {
        name: "update_settings_by_pk";
        type: { kind: "OBJECT"; name: "settings"; ofType: null };
      };
      update_settings_many: {
        name: "update_settings_many";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "OBJECT"; name: "settings_mutation_response"; ofType: null };
        };
      };
      update_user: { name: "update_user"; type: { kind: "OBJECT"; name: "user_mutation_response"; ofType: null } };
      update_user_by_pk: { name: "update_user_by_pk"; type: { kind: "OBJECT"; name: "user"; ofType: null } };
      update_user_many: {
        name: "update_user_many";
        type: { kind: "LIST"; name: never; ofType: { kind: "OBJECT"; name: "user_mutation_response"; ofType: null } };
      };
      update_verification: {
        name: "update_verification";
        type: { kind: "OBJECT"; name: "verification_mutation_response"; ofType: null };
      };
      update_verification_by_pk: {
        name: "update_verification_by_pk";
        type: { kind: "OBJECT"; name: "verification"; ofType: null };
      };
      update_verification_many: {
        name: "update_verification_many";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "OBJECT"; name: "verification_mutation_response"; ofType: null };
        };
      };
    };
  };
  order_by: {
    name: "order_by";
    enumValues: "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last";
  };
  passkey: {
    kind: "OBJECT";
    name: "passkey";
    fields: {
      aaguid: { name: "aaguid"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      backed_up: {
        name: "backed_up";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      };
      counter: {
        name: "counter";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      created_at: { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      credential_i_d: {
        name: "credential_i_d";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      device_type: {
        name: "device_type";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      id: {
        name: "id";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      public_key: {
        name: "public_key";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      transports: { name: "transports"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      user_id: {
        name: "user_id";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
    };
  };
  passkey_aggregate: {
    kind: "OBJECT";
    name: "passkey_aggregate";
    fields: {
      aggregate: { name: "aggregate"; type: { kind: "OBJECT"; name: "passkey_aggregate_fields"; ofType: null } };
      nodes: {
        name: "nodes";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "passkey"; ofType: null } };
          };
        };
      };
    };
  };
  passkey_aggregate_fields: {
    kind: "OBJECT";
    name: "passkey_aggregate_fields";
    fields: {
      avg: { name: "avg"; type: { kind: "OBJECT"; name: "passkey_avg_fields"; ofType: null } };
      count: {
        name: "count";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      max: { name: "max"; type: { kind: "OBJECT"; name: "passkey_max_fields"; ofType: null } };
      min: { name: "min"; type: { kind: "OBJECT"; name: "passkey_min_fields"; ofType: null } };
      stddev: { name: "stddev"; type: { kind: "OBJECT"; name: "passkey_stddev_fields"; ofType: null } };
      stddev_pop: { name: "stddev_pop"; type: { kind: "OBJECT"; name: "passkey_stddev_pop_fields"; ofType: null } };
      stddev_samp: { name: "stddev_samp"; type: { kind: "OBJECT"; name: "passkey_stddev_samp_fields"; ofType: null } };
      sum: { name: "sum"; type: { kind: "OBJECT"; name: "passkey_sum_fields"; ofType: null } };
      var_pop: { name: "var_pop"; type: { kind: "OBJECT"; name: "passkey_var_pop_fields"; ofType: null } };
      var_samp: { name: "var_samp"; type: { kind: "OBJECT"; name: "passkey_var_samp_fields"; ofType: null } };
      variance: { name: "variance"; type: { kind: "OBJECT"; name: "passkey_variance_fields"; ofType: null } };
    };
  };
  passkey_avg_fields: {
    kind: "OBJECT";
    name: "passkey_avg_fields";
    fields: { counter: { name: "counter"; type: { kind: "SCALAR"; name: "Float"; ofType: null } } };
  };
  passkey_bool_exp: {
    kind: "INPUT_OBJECT";
    name: "passkey_bool_exp";
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
            ofType: { kind: "INPUT_OBJECT"; name: "passkey_bool_exp"; ofType: null };
          };
        };
        defaultValue: null;
      },
      { name: "_not"; type: { kind: "INPUT_OBJECT"; name: "passkey_bool_exp"; ofType: null }; defaultValue: null },
      {
        name: "_or";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "INPUT_OBJECT"; name: "passkey_bool_exp"; ofType: null };
          };
        };
        defaultValue: null;
      },
      {
        name: "aaguid";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "backed_up";
        type: { kind: "INPUT_OBJECT"; name: "Boolean_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      { name: "counter"; type: { kind: "INPUT_OBJECT"; name: "Int_comparison_exp"; ofType: null }; defaultValue: null },
      {
        name: "created_at";
        type: { kind: "INPUT_OBJECT"; name: "timestamptz_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "credential_i_d";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "device_type";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      { name: "id"; type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null }; defaultValue: null },
      { name: "name"; type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null }; defaultValue: null },
      {
        name: "public_key";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "transports";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "user_id";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
    ];
  };
  passkey_constraint: { name: "passkey_constraint"; enumValues: "passkey_pkey" };
  passkey_inc_input: {
    kind: "INPUT_OBJECT";
    name: "passkey_inc_input";
    isOneOf: false;
    inputFields: [{ name: "counter"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null }];
  };
  passkey_insert_input: {
    kind: "INPUT_OBJECT";
    name: "passkey_insert_input";
    isOneOf: false;
    inputFields: [
      { name: "aaguid"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "backed_up"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "counter"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "credential_i_d"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "device_type"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "public_key"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "transports"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "user_id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
    ];
  };
  passkey_max_fields: {
    kind: "OBJECT";
    name: "passkey_max_fields";
    fields: {
      aaguid: { name: "aaguid"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      counter: { name: "counter"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      created_at: { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      credential_i_d: { name: "credential_i_d"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      device_type: { name: "device_type"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      public_key: { name: "public_key"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      transports: { name: "transports"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      user_id: { name: "user_id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  passkey_min_fields: {
    kind: "OBJECT";
    name: "passkey_min_fields";
    fields: {
      aaguid: { name: "aaguid"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      counter: { name: "counter"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      created_at: { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      credential_i_d: { name: "credential_i_d"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      device_type: { name: "device_type"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      public_key: { name: "public_key"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      transports: { name: "transports"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      user_id: { name: "user_id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  passkey_mutation_response: {
    kind: "OBJECT";
    name: "passkey_mutation_response";
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
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "passkey"; ofType: null } };
          };
        };
      };
    };
  };
  passkey_on_conflict: {
    kind: "INPUT_OBJECT";
    name: "passkey_on_conflict";
    isOneOf: false;
    inputFields: [
      {
        name: "constraint";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "ENUM"; name: "passkey_constraint"; ofType: null } };
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
              ofType: { kind: "ENUM"; name: "passkey_update_column"; ofType: null };
            };
          };
        };
        defaultValue: "[]";
      },
      { name: "where"; type: { kind: "INPUT_OBJECT"; name: "passkey_bool_exp"; ofType: null }; defaultValue: null },
    ];
  };
  passkey_order_by: {
    kind: "INPUT_OBJECT";
    name: "passkey_order_by";
    isOneOf: false;
    inputFields: [
      { name: "aaguid"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "backed_up"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "counter"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "created_at"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "credential_i_d"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "device_type"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "id"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "name"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "public_key"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "transports"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "user_id"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
    ];
  };
  passkey_pk_columns_input: {
    kind: "INPUT_OBJECT";
    name: "passkey_pk_columns_input";
    isOneOf: false;
    inputFields: [
      {
        name: "id";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  passkey_select_column: {
    name: "passkey_select_column";
    enumValues:
      | "aaguid"
      | "backed_up"
      | "counter"
      | "created_at"
      | "credential_i_d"
      | "device_type"
      | "id"
      | "name"
      | "public_key"
      | "transports"
      | "user_id";
  };
  passkey_set_input: {
    kind: "INPUT_OBJECT";
    name: "passkey_set_input";
    isOneOf: false;
    inputFields: [
      { name: "aaguid"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "backed_up"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "counter"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "credential_i_d"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "device_type"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "public_key"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "transports"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "user_id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
    ];
  };
  passkey_stddev_fields: {
    kind: "OBJECT";
    name: "passkey_stddev_fields";
    fields: { counter: { name: "counter"; type: { kind: "SCALAR"; name: "Float"; ofType: null } } };
  };
  passkey_stddev_pop_fields: {
    kind: "OBJECT";
    name: "passkey_stddev_pop_fields";
    fields: { counter: { name: "counter"; type: { kind: "SCALAR"; name: "Float"; ofType: null } } };
  };
  passkey_stddev_samp_fields: {
    kind: "OBJECT";
    name: "passkey_stddev_samp_fields";
    fields: { counter: { name: "counter"; type: { kind: "SCALAR"; name: "Float"; ofType: null } } };
  };
  passkey_stream_cursor_input: {
    kind: "INPUT_OBJECT";
    name: "passkey_stream_cursor_input";
    isOneOf: false;
    inputFields: [
      {
        name: "initial_value";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "passkey_stream_cursor_value_input"; ofType: null };
        };
        defaultValue: null;
      },
      { name: "ordering"; type: { kind: "ENUM"; name: "cursor_ordering"; ofType: null }; defaultValue: null },
    ];
  };
  passkey_stream_cursor_value_input: {
    kind: "INPUT_OBJECT";
    name: "passkey_stream_cursor_value_input";
    isOneOf: false;
    inputFields: [
      { name: "aaguid"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "backed_up"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "counter"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "credential_i_d"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "device_type"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "public_key"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "transports"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "user_id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
    ];
  };
  passkey_sum_fields: {
    kind: "OBJECT";
    name: "passkey_sum_fields";
    fields: { counter: { name: "counter"; type: { kind: "SCALAR"; name: "Int"; ofType: null } } };
  };
  passkey_update_column: {
    name: "passkey_update_column";
    enumValues:
      | "aaguid"
      | "backed_up"
      | "counter"
      | "created_at"
      | "credential_i_d"
      | "device_type"
      | "id"
      | "name"
      | "public_key"
      | "transports"
      | "user_id";
  };
  passkey_updates: {
    kind: "INPUT_OBJECT";
    name: "passkey_updates";
    isOneOf: false;
    inputFields: [
      { name: "_inc"; type: { kind: "INPUT_OBJECT"; name: "passkey_inc_input"; ofType: null }; defaultValue: null },
      { name: "_set"; type: { kind: "INPUT_OBJECT"; name: "passkey_set_input"; ofType: null }; defaultValue: null },
      {
        name: "where";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "passkey_bool_exp"; ofType: null };
        };
        defaultValue: null;
      },
    ];
  };
  passkey_var_pop_fields: {
    kind: "OBJECT";
    name: "passkey_var_pop_fields";
    fields: { counter: { name: "counter"; type: { kind: "SCALAR"; name: "Float"; ofType: null } } };
  };
  passkey_var_samp_fields: {
    kind: "OBJECT";
    name: "passkey_var_samp_fields";
    fields: { counter: { name: "counter"; type: { kind: "SCALAR"; name: "Float"; ofType: null } } };
  };
  passkey_variance_fields: {
    kind: "OBJECT";
    name: "passkey_variance_fields";
    fields: { counter: { name: "counter"; type: { kind: "SCALAR"; name: "Float"; ofType: null } } };
  };
  query_root: {
    kind: "OBJECT";
    name: "query_root";
    fields: {
      account: {
        name: "account";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "account"; ofType: null } };
          };
        };
      };
      account_aggregate: {
        name: "account_aggregate";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "account_aggregate"; ofType: null } };
      };
      account_by_pk: { name: "account_by_pk"; type: { kind: "OBJECT"; name: "account"; ofType: null } };
      apikey: {
        name: "apikey";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "apikey"; ofType: null } };
          };
        };
      };
      apikey_aggregate: {
        name: "apikey_aggregate";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "apikey_aggregate"; ofType: null } };
      };
      apikey_by_pk: { name: "apikey_by_pk"; type: { kind: "OBJECT"; name: "apikey"; ofType: null } };
      passkey: {
        name: "passkey";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "passkey"; ofType: null } };
          };
        };
      };
      passkey_aggregate: {
        name: "passkey_aggregate";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "passkey_aggregate"; ofType: null } };
      };
      passkey_by_pk: { name: "passkey_by_pk"; type: { kind: "OBJECT"; name: "passkey"; ofType: null } };
      session: {
        name: "session";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "session"; ofType: null } };
          };
        };
      };
      session_aggregate: {
        name: "session_aggregate";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "session_aggregate"; ofType: null } };
      };
      session_by_pk: { name: "session_by_pk"; type: { kind: "OBJECT"; name: "session"; ofType: null } };
      settings: {
        name: "settings";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "settings"; ofType: null } };
          };
        };
      };
      settings_aggregate: {
        name: "settings_aggregate";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "settings_aggregate"; ofType: null } };
      };
      settings_by_pk: { name: "settings_by_pk"; type: { kind: "OBJECT"; name: "settings"; ofType: null } };
      user: {
        name: "user";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "user"; ofType: null } };
          };
        };
      };
      user_aggregate: {
        name: "user_aggregate";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "user_aggregate"; ofType: null } };
      };
      user_by_pk: { name: "user_by_pk"; type: { kind: "OBJECT"; name: "user"; ofType: null } };
      verification: {
        name: "verification";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "verification"; ofType: null } };
          };
        };
      };
      verification_aggregate: {
        name: "verification_aggregate";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "OBJECT"; name: "verification_aggregate"; ofType: null };
        };
      };
      verification_by_pk: { name: "verification_by_pk"; type: { kind: "OBJECT"; name: "verification"; ofType: null } };
    };
  };
  session: {
    kind: "OBJECT";
    name: "session";
    fields: {
      created_at: {
        name: "created_at";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      };
      expires_at: {
        name: "expires_at";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      };
      id: {
        name: "id";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      impersonated_by: { name: "impersonated_by"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      ip_address: { name: "ip_address"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      token: {
        name: "token";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      updated_at: {
        name: "updated_at";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      };
      user_agent: { name: "user_agent"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      user_id: {
        name: "user_id";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
    };
  };
  session_aggregate: {
    kind: "OBJECT";
    name: "session_aggregate";
    fields: {
      aggregate: { name: "aggregate"; type: { kind: "OBJECT"; name: "session_aggregate_fields"; ofType: null } };
      nodes: {
        name: "nodes";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "session"; ofType: null } };
          };
        };
      };
    };
  };
  session_aggregate_fields: {
    kind: "OBJECT";
    name: "session_aggregate_fields";
    fields: {
      count: {
        name: "count";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      max: { name: "max"; type: { kind: "OBJECT"; name: "session_max_fields"; ofType: null } };
      min: { name: "min"; type: { kind: "OBJECT"; name: "session_min_fields"; ofType: null } };
    };
  };
  session_bool_exp: {
    kind: "INPUT_OBJECT";
    name: "session_bool_exp";
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
            ofType: { kind: "INPUT_OBJECT"; name: "session_bool_exp"; ofType: null };
          };
        };
        defaultValue: null;
      },
      { name: "_not"; type: { kind: "INPUT_OBJECT"; name: "session_bool_exp"; ofType: null }; defaultValue: null },
      {
        name: "_or";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "INPUT_OBJECT"; name: "session_bool_exp"; ofType: null };
          };
        };
        defaultValue: null;
      },
      {
        name: "created_at";
        type: { kind: "INPUT_OBJECT"; name: "timestamptz_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "expires_at";
        type: { kind: "INPUT_OBJECT"; name: "timestamptz_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      { name: "id"; type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null }; defaultValue: null },
      {
        name: "impersonated_by";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "ip_address";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "token";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "updated_at";
        type: { kind: "INPUT_OBJECT"; name: "timestamptz_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "user_agent";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "user_id";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
    ];
  };
  session_constraint: { name: "session_constraint"; enumValues: "session_pkey" | "session_token_unique" };
  session_insert_input: {
    kind: "INPUT_OBJECT";
    name: "session_insert_input";
    isOneOf: false;
    inputFields: [
      { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "expires_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "impersonated_by"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "ip_address"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "token"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "user_agent"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "user_id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
    ];
  };
  session_max_fields: {
    kind: "OBJECT";
    name: "session_max_fields";
    fields: {
      created_at: { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      expires_at: { name: "expires_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      impersonated_by: { name: "impersonated_by"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      ip_address: { name: "ip_address"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      token: { name: "token"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      updated_at: { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      user_agent: { name: "user_agent"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      user_id: { name: "user_id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  session_min_fields: {
    kind: "OBJECT";
    name: "session_min_fields";
    fields: {
      created_at: { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      expires_at: { name: "expires_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      impersonated_by: { name: "impersonated_by"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      ip_address: { name: "ip_address"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      token: { name: "token"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      updated_at: { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      user_agent: { name: "user_agent"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      user_id: { name: "user_id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  session_mutation_response: {
    kind: "OBJECT";
    name: "session_mutation_response";
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
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "session"; ofType: null } };
          };
        };
      };
    };
  };
  session_on_conflict: {
    kind: "INPUT_OBJECT";
    name: "session_on_conflict";
    isOneOf: false;
    inputFields: [
      {
        name: "constraint";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "ENUM"; name: "session_constraint"; ofType: null } };
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
              ofType: { kind: "ENUM"; name: "session_update_column"; ofType: null };
            };
          };
        };
        defaultValue: "[]";
      },
      { name: "where"; type: { kind: "INPUT_OBJECT"; name: "session_bool_exp"; ofType: null }; defaultValue: null },
    ];
  };
  session_order_by: {
    kind: "INPUT_OBJECT";
    name: "session_order_by";
    isOneOf: false;
    inputFields: [
      { name: "created_at"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "expires_at"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "id"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "impersonated_by"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "ip_address"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "token"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "updated_at"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "user_agent"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "user_id"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
    ];
  };
  session_pk_columns_input: {
    kind: "INPUT_OBJECT";
    name: "session_pk_columns_input";
    isOneOf: false;
    inputFields: [
      {
        name: "id";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  session_select_column: {
    name: "session_select_column";
    enumValues:
      | "created_at"
      | "expires_at"
      | "id"
      | "impersonated_by"
      | "ip_address"
      | "token"
      | "updated_at"
      | "user_agent"
      | "user_id";
  };
  session_set_input: {
    kind: "INPUT_OBJECT";
    name: "session_set_input";
    isOneOf: false;
    inputFields: [
      { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "expires_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "impersonated_by"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "ip_address"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "token"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "user_agent"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "user_id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
    ];
  };
  session_stream_cursor_input: {
    kind: "INPUT_OBJECT";
    name: "session_stream_cursor_input";
    isOneOf: false;
    inputFields: [
      {
        name: "initial_value";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "session_stream_cursor_value_input"; ofType: null };
        };
        defaultValue: null;
      },
      { name: "ordering"; type: { kind: "ENUM"; name: "cursor_ordering"; ofType: null }; defaultValue: null },
    ];
  };
  session_stream_cursor_value_input: {
    kind: "INPUT_OBJECT";
    name: "session_stream_cursor_value_input";
    isOneOf: false;
    inputFields: [
      { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "expires_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "impersonated_by"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "ip_address"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "token"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "user_agent"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "user_id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
    ];
  };
  session_update_column: {
    name: "session_update_column";
    enumValues:
      | "created_at"
      | "expires_at"
      | "id"
      | "impersonated_by"
      | "ip_address"
      | "token"
      | "updated_at"
      | "user_agent"
      | "user_id";
  };
  session_updates: {
    kind: "INPUT_OBJECT";
    name: "session_updates";
    isOneOf: false;
    inputFields: [
      { name: "_set"; type: { kind: "INPUT_OBJECT"; name: "session_set_input"; ofType: null }; defaultValue: null },
      {
        name: "where";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "session_bool_exp"; ofType: null };
        };
        defaultValue: null;
      },
    ];
  };
  settings: {
    kind: "OBJECT";
    name: "settings";
    fields: {
      key: {
        name: "key";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      last_updated: {
        name: "last_updated";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "timestamp"; ofType: null } };
      };
      value: {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
    };
  };
  settings_aggregate: {
    kind: "OBJECT";
    name: "settings_aggregate";
    fields: {
      aggregate: { name: "aggregate"; type: { kind: "OBJECT"; name: "settings_aggregate_fields"; ofType: null } };
      nodes: {
        name: "nodes";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "settings"; ofType: null } };
          };
        };
      };
    };
  };
  settings_aggregate_fields: {
    kind: "OBJECT";
    name: "settings_aggregate_fields";
    fields: {
      count: {
        name: "count";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      max: { name: "max"; type: { kind: "OBJECT"; name: "settings_max_fields"; ofType: null } };
      min: { name: "min"; type: { kind: "OBJECT"; name: "settings_min_fields"; ofType: null } };
    };
  };
  settings_bool_exp: {
    kind: "INPUT_OBJECT";
    name: "settings_bool_exp";
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
            ofType: { kind: "INPUT_OBJECT"; name: "settings_bool_exp"; ofType: null };
          };
        };
        defaultValue: null;
      },
      { name: "_not"; type: { kind: "INPUT_OBJECT"; name: "settings_bool_exp"; ofType: null }; defaultValue: null },
      {
        name: "_or";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "INPUT_OBJECT"; name: "settings_bool_exp"; ofType: null };
          };
        };
        defaultValue: null;
      },
      { name: "key"; type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null }; defaultValue: null },
      {
        name: "last_updated";
        type: { kind: "INPUT_OBJECT"; name: "timestamp_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
    ];
  };
  settings_constraint: { name: "settings_constraint"; enumValues: "settings_pkey" };
  settings_insert_input: {
    kind: "INPUT_OBJECT";
    name: "settings_insert_input";
    isOneOf: false;
    inputFields: [
      { name: "key"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "last_updated"; type: { kind: "SCALAR"; name: "timestamp"; ofType: null }; defaultValue: null },
      { name: "value"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
    ];
  };
  settings_max_fields: {
    kind: "OBJECT";
    name: "settings_max_fields";
    fields: {
      key: { name: "key"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      last_updated: { name: "last_updated"; type: { kind: "SCALAR"; name: "timestamp"; ofType: null } };
      value: { name: "value"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  settings_min_fields: {
    kind: "OBJECT";
    name: "settings_min_fields";
    fields: {
      key: { name: "key"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      last_updated: { name: "last_updated"; type: { kind: "SCALAR"; name: "timestamp"; ofType: null } };
      value: { name: "value"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  settings_mutation_response: {
    kind: "OBJECT";
    name: "settings_mutation_response";
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
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "settings"; ofType: null } };
          };
        };
      };
    };
  };
  settings_on_conflict: {
    kind: "INPUT_OBJECT";
    name: "settings_on_conflict";
    isOneOf: false;
    inputFields: [
      {
        name: "constraint";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "ENUM"; name: "settings_constraint"; ofType: null } };
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
              ofType: { kind: "ENUM"; name: "settings_update_column"; ofType: null };
            };
          };
        };
        defaultValue: "[]";
      },
      { name: "where"; type: { kind: "INPUT_OBJECT"; name: "settings_bool_exp"; ofType: null }; defaultValue: null },
    ];
  };
  settings_order_by: {
    kind: "INPUT_OBJECT";
    name: "settings_order_by";
    isOneOf: false;
    inputFields: [
      { name: "key"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "last_updated"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "value"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
    ];
  };
  settings_pk_columns_input: {
    kind: "INPUT_OBJECT";
    name: "settings_pk_columns_input";
    isOneOf: false;
    inputFields: [
      {
        name: "key";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  settings_select_column: { name: "settings_select_column"; enumValues: "key" | "last_updated" | "value" };
  settings_set_input: {
    kind: "INPUT_OBJECT";
    name: "settings_set_input";
    isOneOf: false;
    inputFields: [
      { name: "key"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "last_updated"; type: { kind: "SCALAR"; name: "timestamp"; ofType: null }; defaultValue: null },
      { name: "value"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
    ];
  };
  settings_stream_cursor_input: {
    kind: "INPUT_OBJECT";
    name: "settings_stream_cursor_input";
    isOneOf: false;
    inputFields: [
      {
        name: "initial_value";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "settings_stream_cursor_value_input"; ofType: null };
        };
        defaultValue: null;
      },
      { name: "ordering"; type: { kind: "ENUM"; name: "cursor_ordering"; ofType: null }; defaultValue: null },
    ];
  };
  settings_stream_cursor_value_input: {
    kind: "INPUT_OBJECT";
    name: "settings_stream_cursor_value_input";
    isOneOf: false;
    inputFields: [
      { name: "key"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "last_updated"; type: { kind: "SCALAR"; name: "timestamp"; ofType: null }; defaultValue: null },
      { name: "value"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
    ];
  };
  settings_update_column: { name: "settings_update_column"; enumValues: "key" | "last_updated" | "value" };
  settings_updates: {
    kind: "INPUT_OBJECT";
    name: "settings_updates";
    isOneOf: false;
    inputFields: [
      { name: "_set"; type: { kind: "INPUT_OBJECT"; name: "settings_set_input"; ofType: null }; defaultValue: null },
      {
        name: "where";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "settings_bool_exp"; ofType: null };
        };
        defaultValue: null;
      },
    ];
  };
  subscription_root: {
    kind: "OBJECT";
    name: "subscription_root";
    fields: {
      account: {
        name: "account";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "account"; ofType: null } };
          };
        };
      };
      account_aggregate: {
        name: "account_aggregate";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "account_aggregate"; ofType: null } };
      };
      account_by_pk: { name: "account_by_pk"; type: { kind: "OBJECT"; name: "account"; ofType: null } };
      account_stream: {
        name: "account_stream";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "account"; ofType: null } };
          };
        };
      };
      apikey: {
        name: "apikey";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "apikey"; ofType: null } };
          };
        };
      };
      apikey_aggregate: {
        name: "apikey_aggregate";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "apikey_aggregate"; ofType: null } };
      };
      apikey_by_pk: { name: "apikey_by_pk"; type: { kind: "OBJECT"; name: "apikey"; ofType: null } };
      apikey_stream: {
        name: "apikey_stream";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "apikey"; ofType: null } };
          };
        };
      };
      passkey: {
        name: "passkey";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "passkey"; ofType: null } };
          };
        };
      };
      passkey_aggregate: {
        name: "passkey_aggregate";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "passkey_aggregate"; ofType: null } };
      };
      passkey_by_pk: { name: "passkey_by_pk"; type: { kind: "OBJECT"; name: "passkey"; ofType: null } };
      passkey_stream: {
        name: "passkey_stream";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "passkey"; ofType: null } };
          };
        };
      };
      session: {
        name: "session";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "session"; ofType: null } };
          };
        };
      };
      session_aggregate: {
        name: "session_aggregate";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "session_aggregate"; ofType: null } };
      };
      session_by_pk: { name: "session_by_pk"; type: { kind: "OBJECT"; name: "session"; ofType: null } };
      session_stream: {
        name: "session_stream";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "session"; ofType: null } };
          };
        };
      };
      settings: {
        name: "settings";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "settings"; ofType: null } };
          };
        };
      };
      settings_aggregate: {
        name: "settings_aggregate";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "settings_aggregate"; ofType: null } };
      };
      settings_by_pk: { name: "settings_by_pk"; type: { kind: "OBJECT"; name: "settings"; ofType: null } };
      settings_stream: {
        name: "settings_stream";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "settings"; ofType: null } };
          };
        };
      };
      user: {
        name: "user";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "user"; ofType: null } };
          };
        };
      };
      user_aggregate: {
        name: "user_aggregate";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "user_aggregate"; ofType: null } };
      };
      user_by_pk: { name: "user_by_pk"; type: { kind: "OBJECT"; name: "user"; ofType: null } };
      user_stream: {
        name: "user_stream";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "user"; ofType: null } };
          };
        };
      };
      verification: {
        name: "verification";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "verification"; ofType: null } };
          };
        };
      };
      verification_aggregate: {
        name: "verification_aggregate";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "OBJECT"; name: "verification_aggregate"; ofType: null };
        };
      };
      verification_by_pk: { name: "verification_by_pk"; type: { kind: "OBJECT"; name: "verification"; ofType: null } };
      verification_stream: {
        name: "verification_stream";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "verification"; ofType: null } };
          };
        };
      };
    };
  };
  timestamp: unknown;
  timestamp_comparison_exp: {
    kind: "INPUT_OBJECT";
    name: "timestamp_comparison_exp";
    isOneOf: false;
    inputFields: [
      { name: "_eq"; type: { kind: "SCALAR"; name: "timestamp"; ofType: null }; defaultValue: null },
      { name: "_gt"; type: { kind: "SCALAR"; name: "timestamp"; ofType: null }; defaultValue: null },
      { name: "_gte"; type: { kind: "SCALAR"; name: "timestamp"; ofType: null }; defaultValue: null },
      {
        name: "_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "timestamp"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "_is_null"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "_lt"; type: { kind: "SCALAR"; name: "timestamp"; ofType: null }; defaultValue: null },
      { name: "_lte"; type: { kind: "SCALAR"; name: "timestamp"; ofType: null }; defaultValue: null },
      { name: "_neq"; type: { kind: "SCALAR"; name: "timestamp"; ofType: null }; defaultValue: null },
      {
        name: "_nin";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "timestamp"; ofType: null } };
        };
        defaultValue: null;
      },
    ];
  };
  timestamptz: unknown;
  timestamptz_comparison_exp: {
    kind: "INPUT_OBJECT";
    name: "timestamptz_comparison_exp";
    isOneOf: false;
    inputFields: [
      { name: "_eq"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "_gt"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "_gte"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      {
        name: "_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "_is_null"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "_lt"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "_lte"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "_neq"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      {
        name: "_nin";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
        };
        defaultValue: null;
      },
    ];
  };
  user: {
    kind: "OBJECT";
    name: "user";
    fields: {
      ban_expires: { name: "ban_expires"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      ban_reason: { name: "ban_reason"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      banned: { name: "banned"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      created_at: {
        name: "created_at";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      };
      email: {
        name: "email";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      email_verified: {
        name: "email_verified";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      };
      id: {
        name: "id";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      image: { name: "image"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      last_login_at: { name: "last_login_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      name: {
        name: "name";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      pincode_enabled: {
        name: "pincode_enabled";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      };
      pincode_verification_id: {
        name: "pincode_verification_id";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
      };
      role: { name: "role"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      secret_code_verification_id: {
        name: "secret_code_verification_id";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
      };
      two_factor_enabled: {
        name: "two_factor_enabled";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      };
      two_factor_verification_id: {
        name: "two_factor_verification_id";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
      };
      updated_at: {
        name: "updated_at";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      };
      wallet: { name: "wallet"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  user_aggregate: {
    kind: "OBJECT";
    name: "user_aggregate";
    fields: {
      aggregate: { name: "aggregate"; type: { kind: "OBJECT"; name: "user_aggregate_fields"; ofType: null } };
      nodes: {
        name: "nodes";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "user"; ofType: null } };
          };
        };
      };
    };
  };
  user_aggregate_fields: {
    kind: "OBJECT";
    name: "user_aggregate_fields";
    fields: {
      count: {
        name: "count";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      max: { name: "max"; type: { kind: "OBJECT"; name: "user_max_fields"; ofType: null } };
      min: { name: "min"; type: { kind: "OBJECT"; name: "user_min_fields"; ofType: null } };
    };
  };
  user_bool_exp: {
    kind: "INPUT_OBJECT";
    name: "user_bool_exp";
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
            ofType: { kind: "INPUT_OBJECT"; name: "user_bool_exp"; ofType: null };
          };
        };
        defaultValue: null;
      },
      { name: "_not"; type: { kind: "INPUT_OBJECT"; name: "user_bool_exp"; ofType: null }; defaultValue: null },
      {
        name: "_or";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "INPUT_OBJECT"; name: "user_bool_exp"; ofType: null };
          };
        };
        defaultValue: null;
      },
      {
        name: "ban_expires";
        type: { kind: "INPUT_OBJECT"; name: "timestamptz_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "ban_reason";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "banned";
        type: { kind: "INPUT_OBJECT"; name: "Boolean_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "created_at";
        type: { kind: "INPUT_OBJECT"; name: "timestamptz_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "email";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "email_verified";
        type: { kind: "INPUT_OBJECT"; name: "Boolean_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      { name: "id"; type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null }; defaultValue: null },
      {
        name: "image";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "last_login_at";
        type: { kind: "INPUT_OBJECT"; name: "timestamptz_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      { name: "name"; type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null }; defaultValue: null },
      {
        name: "pincode_enabled";
        type: { kind: "INPUT_OBJECT"; name: "Boolean_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "pincode_verification_id";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      { name: "role"; type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null }; defaultValue: null },
      {
        name: "secret_code_verification_id";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "two_factor_enabled";
        type: { kind: "INPUT_OBJECT"; name: "Boolean_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "two_factor_verification_id";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "updated_at";
        type: { kind: "INPUT_OBJECT"; name: "timestamptz_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "wallet";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
    ];
  };
  user_constraint: {
    name: "user_constraint";
    enumValues:
      | "user_email_unique"
      | "user_pincode_verification_id_unique"
      | "user_pkey"
      | "user_secret_code_verification_id_unique"
      | "user_two_factor_verification_id_unique"
      | "user_wallet_unique";
  };
  user_insert_input: {
    kind: "INPUT_OBJECT";
    name: "user_insert_input";
    isOneOf: false;
    inputFields: [
      { name: "ban_expires"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "ban_reason"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "banned"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "email"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "email_verified"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "image"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "last_login_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "pincode_enabled"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "pincode_verification_id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "role"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "secret_code_verification_id";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "two_factor_enabled"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      {
        name: "two_factor_verification_id";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "wallet"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
    ];
  };
  user_max_fields: {
    kind: "OBJECT";
    name: "user_max_fields";
    fields: {
      ban_expires: { name: "ban_expires"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      ban_reason: { name: "ban_reason"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      created_at: { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      email: { name: "email"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      image: { name: "image"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      last_login_at: { name: "last_login_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      pincode_verification_id: {
        name: "pincode_verification_id";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
      };
      role: { name: "role"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      secret_code_verification_id: {
        name: "secret_code_verification_id";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
      };
      two_factor_verification_id: {
        name: "two_factor_verification_id";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
      };
      updated_at: { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      wallet: { name: "wallet"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  user_min_fields: {
    kind: "OBJECT";
    name: "user_min_fields";
    fields: {
      ban_expires: { name: "ban_expires"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      ban_reason: { name: "ban_reason"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      created_at: { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      email: { name: "email"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      image: { name: "image"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      last_login_at: { name: "last_login_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      pincode_verification_id: {
        name: "pincode_verification_id";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
      };
      role: { name: "role"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      secret_code_verification_id: {
        name: "secret_code_verification_id";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
      };
      two_factor_verification_id: {
        name: "two_factor_verification_id";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
      };
      updated_at: { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      wallet: { name: "wallet"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  user_mutation_response: {
    kind: "OBJECT";
    name: "user_mutation_response";
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
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "user"; ofType: null } };
          };
        };
      };
    };
  };
  user_on_conflict: {
    kind: "INPUT_OBJECT";
    name: "user_on_conflict";
    isOneOf: false;
    inputFields: [
      {
        name: "constraint";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "ENUM"; name: "user_constraint"; ofType: null } };
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
              ofType: { kind: "ENUM"; name: "user_update_column"; ofType: null };
            };
          };
        };
        defaultValue: "[]";
      },
      { name: "where"; type: { kind: "INPUT_OBJECT"; name: "user_bool_exp"; ofType: null }; defaultValue: null },
    ];
  };
  user_order_by: {
    kind: "INPUT_OBJECT";
    name: "user_order_by";
    isOneOf: false;
    inputFields: [
      { name: "ban_expires"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "ban_reason"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "banned"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "created_at"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "email"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "email_verified"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "id"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "image"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "last_login_at"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "name"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "pincode_enabled"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "pincode_verification_id"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "role"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      {
        name: "secret_code_verification_id";
        type: { kind: "ENUM"; name: "order_by"; ofType: null };
        defaultValue: null;
      },
      { name: "two_factor_enabled"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      {
        name: "two_factor_verification_id";
        type: { kind: "ENUM"; name: "order_by"; ofType: null };
        defaultValue: null;
      },
      { name: "updated_at"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "wallet"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
    ];
  };
  user_pk_columns_input: {
    kind: "INPUT_OBJECT";
    name: "user_pk_columns_input";
    isOneOf: false;
    inputFields: [
      {
        name: "id";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  user_select_column: {
    name: "user_select_column";
    enumValues:
      | "ban_expires"
      | "ban_reason"
      | "banned"
      | "created_at"
      | "email"
      | "email_verified"
      | "id"
      | "image"
      | "last_login_at"
      | "name"
      | "pincode_enabled"
      | "pincode_verification_id"
      | "role"
      | "secret_code_verification_id"
      | "two_factor_enabled"
      | "two_factor_verification_id"
      | "updated_at"
      | "wallet";
  };
  user_set_input: {
    kind: "INPUT_OBJECT";
    name: "user_set_input";
    isOneOf: false;
    inputFields: [
      { name: "ban_expires"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "ban_reason"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "banned"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "email"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "email_verified"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "image"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "last_login_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "pincode_enabled"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "pincode_verification_id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "role"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "secret_code_verification_id";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "two_factor_enabled"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      {
        name: "two_factor_verification_id";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "wallet"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
    ];
  };
  user_stream_cursor_input: {
    kind: "INPUT_OBJECT";
    name: "user_stream_cursor_input";
    isOneOf: false;
    inputFields: [
      {
        name: "initial_value";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "user_stream_cursor_value_input"; ofType: null };
        };
        defaultValue: null;
      },
      { name: "ordering"; type: { kind: "ENUM"; name: "cursor_ordering"; ofType: null }; defaultValue: null },
    ];
  };
  user_stream_cursor_value_input: {
    kind: "INPUT_OBJECT";
    name: "user_stream_cursor_value_input";
    isOneOf: false;
    inputFields: [
      { name: "ban_expires"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "ban_reason"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "banned"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "email"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "email_verified"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "image"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "last_login_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "pincode_enabled"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      { name: "pincode_verification_id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "role"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "secret_code_verification_id";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "two_factor_enabled"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null }; defaultValue: null },
      {
        name: "two_factor_verification_id";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "wallet"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
    ];
  };
  user_update_column: {
    name: "user_update_column";
    enumValues:
      | "ban_expires"
      | "ban_reason"
      | "banned"
      | "created_at"
      | "email"
      | "email_verified"
      | "id"
      | "image"
      | "last_login_at"
      | "name"
      | "pincode_enabled"
      | "pincode_verification_id"
      | "role"
      | "secret_code_verification_id"
      | "two_factor_enabled"
      | "two_factor_verification_id"
      | "updated_at"
      | "wallet";
  };
  user_updates: {
    kind: "INPUT_OBJECT";
    name: "user_updates";
    isOneOf: false;
    inputFields: [
      { name: "_set"; type: { kind: "INPUT_OBJECT"; name: "user_set_input"; ofType: null }; defaultValue: null },
      {
        name: "where";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "INPUT_OBJECT"; name: "user_bool_exp"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  verification: {
    kind: "OBJECT";
    name: "verification";
    fields: {
      created_at: { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      expires_at: {
        name: "expires_at";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      };
      id: {
        name: "id";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      identifier: {
        name: "identifier";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      updated_at: { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      value: {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
    };
  };
  verification_aggregate: {
    kind: "OBJECT";
    name: "verification_aggregate";
    fields: {
      aggregate: { name: "aggregate"; type: { kind: "OBJECT"; name: "verification_aggregate_fields"; ofType: null } };
      nodes: {
        name: "nodes";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "verification"; ofType: null } };
          };
        };
      };
    };
  };
  verification_aggregate_fields: {
    kind: "OBJECT";
    name: "verification_aggregate_fields";
    fields: {
      count: {
        name: "count";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      max: { name: "max"; type: { kind: "OBJECT"; name: "verification_max_fields"; ofType: null } };
      min: { name: "min"; type: { kind: "OBJECT"; name: "verification_min_fields"; ofType: null } };
    };
  };
  verification_bool_exp: {
    kind: "INPUT_OBJECT";
    name: "verification_bool_exp";
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
            ofType: { kind: "INPUT_OBJECT"; name: "verification_bool_exp"; ofType: null };
          };
        };
        defaultValue: null;
      },
      { name: "_not"; type: { kind: "INPUT_OBJECT"; name: "verification_bool_exp"; ofType: null }; defaultValue: null },
      {
        name: "_or";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "INPUT_OBJECT"; name: "verification_bool_exp"; ofType: null };
          };
        };
        defaultValue: null;
      },
      {
        name: "created_at";
        type: { kind: "INPUT_OBJECT"; name: "timestamptz_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "expires_at";
        type: { kind: "INPUT_OBJECT"; name: "timestamptz_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      { name: "id"; type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null }; defaultValue: null },
      {
        name: "identifier";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "updated_at";
        type: { kind: "INPUT_OBJECT"; name: "timestamptz_comparison_exp"; ofType: null };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "INPUT_OBJECT"; name: "String_comparison_exp"; ofType: null };
        defaultValue: null;
      },
    ];
  };
  verification_constraint: { name: "verification_constraint"; enumValues: "verification_pkey" };
  verification_insert_input: {
    kind: "INPUT_OBJECT";
    name: "verification_insert_input";
    isOneOf: false;
    inputFields: [
      { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "expires_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "identifier"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "value"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
    ];
  };
  verification_max_fields: {
    kind: "OBJECT";
    name: "verification_max_fields";
    fields: {
      created_at: { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      expires_at: { name: "expires_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      identifier: { name: "identifier"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      updated_at: { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      value: { name: "value"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  verification_min_fields: {
    kind: "OBJECT";
    name: "verification_min_fields";
    fields: {
      created_at: { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      expires_at: { name: "expires_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      identifier: { name: "identifier"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      updated_at: { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null } };
      value: { name: "value"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  verification_mutation_response: {
    kind: "OBJECT";
    name: "verification_mutation_response";
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
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "verification"; ofType: null } };
          };
        };
      };
    };
  };
  verification_on_conflict: {
    kind: "INPUT_OBJECT";
    name: "verification_on_conflict";
    isOneOf: false;
    inputFields: [
      {
        name: "constraint";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "ENUM"; name: "verification_constraint"; ofType: null };
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
              ofType: { kind: "ENUM"; name: "verification_update_column"; ofType: null };
            };
          };
        };
        defaultValue: "[]";
      },
      {
        name: "where";
        type: { kind: "INPUT_OBJECT"; name: "verification_bool_exp"; ofType: null };
        defaultValue: null;
      },
    ];
  };
  verification_order_by: {
    kind: "INPUT_OBJECT";
    name: "verification_order_by";
    isOneOf: false;
    inputFields: [
      { name: "created_at"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "expires_at"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "id"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "identifier"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "updated_at"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
      { name: "value"; type: { kind: "ENUM"; name: "order_by"; ofType: null }; defaultValue: null },
    ];
  };
  verification_pk_columns_input: {
    kind: "INPUT_OBJECT";
    name: "verification_pk_columns_input";
    isOneOf: false;
    inputFields: [
      {
        name: "id";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  verification_select_column: {
    name: "verification_select_column";
    enumValues: "created_at" | "expires_at" | "id" | "identifier" | "updated_at" | "value";
  };
  verification_set_input: {
    kind: "INPUT_OBJECT";
    name: "verification_set_input";
    isOneOf: false;
    inputFields: [
      { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "expires_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "identifier"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "value"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
    ];
  };
  verification_stream_cursor_input: {
    kind: "INPUT_OBJECT";
    name: "verification_stream_cursor_input";
    isOneOf: false;
    inputFields: [
      {
        name: "initial_value";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "verification_stream_cursor_value_input"; ofType: null };
        };
        defaultValue: null;
      },
      { name: "ordering"; type: { kind: "ENUM"; name: "cursor_ordering"; ofType: null }; defaultValue: null },
    ];
  };
  verification_stream_cursor_value_input: {
    kind: "INPUT_OBJECT";
    name: "verification_stream_cursor_value_input";
    isOneOf: false;
    inputFields: [
      { name: "created_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "expires_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "identifier"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "updated_at"; type: { kind: "SCALAR"; name: "timestamptz"; ofType: null }; defaultValue: null },
      { name: "value"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
    ];
  };
  verification_update_column: {
    name: "verification_update_column";
    enumValues: "created_at" | "expires_at" | "id" | "identifier" | "updated_at" | "value";
  };
  verification_updates: {
    kind: "INPUT_OBJECT";
    name: "verification_updates";
    isOneOf: false;
    inputFields: [
      {
        name: "_set";
        type: { kind: "INPUT_OBJECT"; name: "verification_set_input"; ofType: null };
        defaultValue: null;
      },
      {
        name: "where";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "verification_bool_exp"; ofType: null };
        };
        defaultValue: null;
      },
    ];
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
