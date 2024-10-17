/* eslint-disable */
/* prettier-ignore */

export type introspection_types = {
  Account: {
    kind: "OBJECT";
    name: "Account";
    fields: {
      ERC20approvalsOwner: {
        name: "ERC20approvalsOwner";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "ERC20Approval"; ofType: null } };
          };
        };
      };
      ERC20approvalsSpender: {
        name: "ERC20approvalsSpender";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "ERC20Approval"; ofType: null } };
          };
        };
      };
      ERC20balances: {
        name: "ERC20balances";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "ERC20Balance"; ofType: null } };
          };
        };
      };
      ERC20transferFromEvent: {
        name: "ERC20transferFromEvent";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "ERC20Transfer"; ofType: null } };
          };
        };
      };
      ERC20transferToEvent: {
        name: "ERC20transferToEvent";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "ERC20Transfer"; ofType: null } };
          };
        };
      };
      asERC20: { name: "asERC20"; type: { kind: "OBJECT"; name: "ERC20Contract"; ofType: null } };
      events: {
        name: "events";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "INTERFACE"; name: "Event"; ofType: null } };
          };
        };
      };
      id: {
        name: "id";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Bytes"; ofType: null } };
      };
    };
  };
  Account_filter: {
    kind: "INPUT_OBJECT";
    name: "Account_filter";
    isOneOf: false;
    inputFields: [
      { name: "id"; type: { kind: "SCALAR"; name: "Bytes"; ofType: null }; defaultValue: null },
      { name: "id_not"; type: { kind: "SCALAR"; name: "Bytes"; ofType: null }; defaultValue: null },
      { name: "id_gt"; type: { kind: "SCALAR"; name: "Bytes"; ofType: null }; defaultValue: null },
      { name: "id_lt"; type: { kind: "SCALAR"; name: "Bytes"; ofType: null }; defaultValue: null },
      { name: "id_gte"; type: { kind: "SCALAR"; name: "Bytes"; ofType: null }; defaultValue: null },
      { name: "id_lte"; type: { kind: "SCALAR"; name: "Bytes"; ofType: null }; defaultValue: null },
      {
        name: "id_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Bytes"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "id_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Bytes"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "id_contains"; type: { kind: "SCALAR"; name: "Bytes"; ofType: null }; defaultValue: null },
      { name: "id_not_contains"; type: { kind: "SCALAR"; name: "Bytes"; ofType: null }; defaultValue: null },
      { name: "asERC20"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "asERC20_not"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "asERC20_gt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "asERC20_lt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "asERC20_gte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "asERC20_lte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "asERC20_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "asERC20_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "asERC20_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "asERC20_contains_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "asERC20_not_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "asERC20_not_contains_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "asERC20_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "asERC20_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "asERC20_not_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "asERC20_not_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "asERC20_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "asERC20_ends_with_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "asERC20_not_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "asERC20_not_ends_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      {
        name: "asERC20_";
        type: { kind: "INPUT_OBJECT"; name: "ERC20Contract_filter"; ofType: null };
        defaultValue: null;
      },
      {
        name: "ERC20balances_";
        type: { kind: "INPUT_OBJECT"; name: "ERC20Balance_filter"; ofType: null };
        defaultValue: null;
      },
      {
        name: "ERC20approvalsOwner_";
        type: { kind: "INPUT_OBJECT"; name: "ERC20Approval_filter"; ofType: null };
        defaultValue: null;
      },
      {
        name: "ERC20approvalsSpender_";
        type: { kind: "INPUT_OBJECT"; name: "ERC20Approval_filter"; ofType: null };
        defaultValue: null;
      },
      {
        name: "ERC20transferFromEvent_";
        type: { kind: "INPUT_OBJECT"; name: "ERC20Transfer_filter"; ofType: null };
        defaultValue: null;
      },
      {
        name: "ERC20transferToEvent_";
        type: { kind: "INPUT_OBJECT"; name: "ERC20Transfer_filter"; ofType: null };
        defaultValue: null;
      },
      { name: "events_"; type: { kind: "INPUT_OBJECT"; name: "Event_filter"; ofType: null }; defaultValue: null },
      {
        name: "_change_block";
        type: { kind: "INPUT_OBJECT"; name: "BlockChangedFilter"; ofType: null };
        defaultValue: null;
      },
      {
        name: "and";
        type: { kind: "LIST"; name: never; ofType: { kind: "INPUT_OBJECT"; name: "Account_filter"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "or";
        type: { kind: "LIST"; name: never; ofType: { kind: "INPUT_OBJECT"; name: "Account_filter"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  Account_orderBy: {
    name: "Account_orderBy";
    enumValues:
      | "id"
      | "asERC20"
      | "asERC20__id"
      | "asERC20__name"
      | "asERC20__symbol"
      | "asERC20__decimals"
      | "asERC20__extraData"
      | "asERC20__totalSupply"
      | "asERC20__totalSupplyExact"
      | "ERC20balances"
      | "ERC20approvalsOwner"
      | "ERC20approvalsSpender"
      | "ERC20transferFromEvent"
      | "ERC20transferToEvent"
      | "events";
  };
  Aggregation_interval: { name: "Aggregation_interval"; enumValues: "hour" | "day" };
  BigDecimal: unknown;
  BigInt: unknown;
  BlockChangedFilter: {
    kind: "INPUT_OBJECT";
    name: "BlockChangedFilter";
    isOneOf: false;
    inputFields: [
      {
        name: "number_gte";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  Block_height: {
    kind: "INPUT_OBJECT";
    name: "Block_height";
    isOneOf: false;
    inputFields: [
      { name: "hash"; type: { kind: "SCALAR"; name: "Bytes"; ofType: null }; defaultValue: null },
      { name: "number"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "number_gte"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
    ];
  };
  Boolean: unknown;
  Bytes: unknown;
  ERC20Approval: {
    kind: "OBJECT";
    name: "ERC20Approval";
    fields: {
      contract: {
        name: "contract";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "ERC20Contract"; ofType: null } };
      };
      id: { name: "id"; type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "ID"; ofType: null } } };
      owner: {
        name: "owner";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "Account"; ofType: null } };
      };
      spender: {
        name: "spender";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "Account"; ofType: null } };
      };
      value: {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigDecimal"; ofType: null } };
      };
      valueExact: {
        name: "valueExact";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
      };
    };
  };
  ERC20Approval_filter: {
    kind: "INPUT_OBJECT";
    name: "ERC20Approval_filter";
    isOneOf: false;
    inputFields: [
      { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      { name: "id_not"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      { name: "id_gt"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      { name: "id_lt"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      { name: "id_gte"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      { name: "id_lte"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      {
        name: "id_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "ID"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "id_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "ID"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "contract"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_not"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_gt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_lt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_gte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_lte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "contract_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "contract_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "contract_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_contains_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_not_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "contract_not_contains_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "contract_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "contract_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "contract_not_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "contract_not_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "contract_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_ends_with_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_not_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "contract_not_ends_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      {
        name: "contract_";
        type: { kind: "INPUT_OBJECT"; name: "ERC20Contract_filter"; ofType: null };
        defaultValue: null;
      },
      { name: "owner"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "owner_not"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "owner_gt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "owner_lt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "owner_gte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "owner_lte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "owner_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "owner_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "owner_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "owner_contains_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "owner_not_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "owner_not_contains_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "owner_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "owner_starts_with_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "owner_not_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "owner_not_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "owner_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "owner_ends_with_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "owner_not_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "owner_not_ends_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "owner_"; type: { kind: "INPUT_OBJECT"; name: "Account_filter"; ofType: null }; defaultValue: null },
      { name: "spender"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "spender_not"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "spender_gt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "spender_lt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "spender_gte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "spender_lte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "spender_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "spender_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "spender_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "spender_contains_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "spender_not_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "spender_not_contains_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "spender_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "spender_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "spender_not_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "spender_not_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "spender_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "spender_ends_with_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "spender_not_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "spender_not_ends_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "spender_"; type: { kind: "INPUT_OBJECT"; name: "Account_filter"; ofType: null }; defaultValue: null },
      { name: "value"; type: { kind: "SCALAR"; name: "BigDecimal"; ofType: null }; defaultValue: null },
      { name: "value_not"; type: { kind: "SCALAR"; name: "BigDecimal"; ofType: null }; defaultValue: null },
      { name: "value_gt"; type: { kind: "SCALAR"; name: "BigDecimal"; ofType: null }; defaultValue: null },
      { name: "value_lt"; type: { kind: "SCALAR"; name: "BigDecimal"; ofType: null }; defaultValue: null },
      { name: "value_gte"; type: { kind: "SCALAR"; name: "BigDecimal"; ofType: null }; defaultValue: null },
      { name: "value_lte"; type: { kind: "SCALAR"; name: "BigDecimal"; ofType: null }; defaultValue: null },
      {
        name: "value_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigDecimal"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "value_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigDecimal"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "valueExact"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "valueExact_not"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "valueExact_gt"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "valueExact_lt"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "valueExact_gte"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "valueExact_lte"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      {
        name: "valueExact_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "valueExact_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "_change_block";
        type: { kind: "INPUT_OBJECT"; name: "BlockChangedFilter"; ofType: null };
        defaultValue: null;
      },
      {
        name: "and";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "ERC20Approval_filter"; ofType: null };
        };
        defaultValue: null;
      },
      {
        name: "or";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "ERC20Approval_filter"; ofType: null };
        };
        defaultValue: null;
      },
    ];
  };
  ERC20Approval_orderBy: {
    name: "ERC20Approval_orderBy";
    enumValues:
      | "id"
      | "contract"
      | "contract__id"
      | "contract__name"
      | "contract__symbol"
      | "contract__decimals"
      | "contract__extraData"
      | "contract__totalSupply"
      | "contract__totalSupplyExact"
      | "owner"
      | "owner__id"
      | "spender"
      | "spender__id"
      | "value"
      | "valueExact";
  };
  ERC20Balance: {
    kind: "OBJECT";
    name: "ERC20Balance";
    fields: {
      account: { name: "account"; type: { kind: "OBJECT"; name: "Account"; ofType: null } };
      contract: {
        name: "contract";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "ERC20Contract"; ofType: null } };
      };
      id: { name: "id"; type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "ID"; ofType: null } } };
      transferFromEvent: {
        name: "transferFromEvent";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "ERC20Transfer"; ofType: null } };
          };
        };
      };
      transferToEvent: {
        name: "transferToEvent";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "ERC20Transfer"; ofType: null } };
          };
        };
      };
      value: {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigDecimal"; ofType: null } };
      };
      valueExact: {
        name: "valueExact";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
      };
    };
  };
  ERC20Balance_filter: {
    kind: "INPUT_OBJECT";
    name: "ERC20Balance_filter";
    isOneOf: false;
    inputFields: [
      { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      { name: "id_not"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      { name: "id_gt"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      { name: "id_lt"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      { name: "id_gte"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      { name: "id_lte"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      {
        name: "id_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "ID"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "id_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "ID"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "contract"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_not"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_gt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_lt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_gte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_lte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "contract_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "contract_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "contract_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_contains_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_not_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "contract_not_contains_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "contract_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "contract_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "contract_not_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "contract_not_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "contract_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_ends_with_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_not_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "contract_not_ends_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      {
        name: "contract_";
        type: { kind: "INPUT_OBJECT"; name: "ERC20Contract_filter"; ofType: null };
        defaultValue: null;
      },
      { name: "account"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "account_not"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "account_gt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "account_lt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "account_gte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "account_lte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "account_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "account_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "account_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "account_contains_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "account_not_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "account_not_contains_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "account_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "account_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "account_not_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "account_not_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "account_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "account_ends_with_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "account_not_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "account_not_ends_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "account_"; type: { kind: "INPUT_OBJECT"; name: "Account_filter"; ofType: null }; defaultValue: null },
      { name: "value"; type: { kind: "SCALAR"; name: "BigDecimal"; ofType: null }; defaultValue: null },
      { name: "value_not"; type: { kind: "SCALAR"; name: "BigDecimal"; ofType: null }; defaultValue: null },
      { name: "value_gt"; type: { kind: "SCALAR"; name: "BigDecimal"; ofType: null }; defaultValue: null },
      { name: "value_lt"; type: { kind: "SCALAR"; name: "BigDecimal"; ofType: null }; defaultValue: null },
      { name: "value_gte"; type: { kind: "SCALAR"; name: "BigDecimal"; ofType: null }; defaultValue: null },
      { name: "value_lte"; type: { kind: "SCALAR"; name: "BigDecimal"; ofType: null }; defaultValue: null },
      {
        name: "value_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigDecimal"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "value_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigDecimal"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "valueExact"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "valueExact_not"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "valueExact_gt"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "valueExact_lt"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "valueExact_gte"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "valueExact_lte"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      {
        name: "valueExact_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "valueExact_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "transferFromEvent_";
        type: { kind: "INPUT_OBJECT"; name: "ERC20Transfer_filter"; ofType: null };
        defaultValue: null;
      },
      {
        name: "transferToEvent_";
        type: { kind: "INPUT_OBJECT"; name: "ERC20Transfer_filter"; ofType: null };
        defaultValue: null;
      },
      {
        name: "_change_block";
        type: { kind: "INPUT_OBJECT"; name: "BlockChangedFilter"; ofType: null };
        defaultValue: null;
      },
      {
        name: "and";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "ERC20Balance_filter"; ofType: null };
        };
        defaultValue: null;
      },
      {
        name: "or";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "ERC20Balance_filter"; ofType: null };
        };
        defaultValue: null;
      },
    ];
  };
  ERC20Balance_orderBy: {
    name: "ERC20Balance_orderBy";
    enumValues:
      | "id"
      | "contract"
      | "contract__id"
      | "contract__name"
      | "contract__symbol"
      | "contract__decimals"
      | "contract__extraData"
      | "contract__totalSupply"
      | "contract__totalSupplyExact"
      | "account"
      | "account__id"
      | "value"
      | "valueExact"
      | "transferFromEvent"
      | "transferToEvent";
  };
  ERC20Contract: {
    kind: "OBJECT";
    name: "ERC20Contract";
    fields: {
      approvals: {
        name: "approvals";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "ERC20Approval"; ofType: null } };
          };
        };
      };
      asAccount: {
        name: "asAccount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "Account"; ofType: null } };
      };
      balances: {
        name: "balances";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "ERC20Balance"; ofType: null } };
          };
        };
      };
      decimals: {
        name: "decimals";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      extraData: { name: "extraData"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      id: {
        name: "id";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Bytes"; ofType: null } };
      };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      symbol: { name: "symbol"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      totalSupply: {
        name: "totalSupply";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigDecimal"; ofType: null } };
      };
      totalSupplyExact: {
        name: "totalSupplyExact";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
      };
      transfers: {
        name: "transfers";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "ERC20Transfer"; ofType: null } };
          };
        };
      };
    };
  };
  ERC20Contract_filter: {
    kind: "INPUT_OBJECT";
    name: "ERC20Contract_filter";
    isOneOf: false;
    inputFields: [
      { name: "id"; type: { kind: "SCALAR"; name: "Bytes"; ofType: null }; defaultValue: null },
      { name: "id_not"; type: { kind: "SCALAR"; name: "Bytes"; ofType: null }; defaultValue: null },
      { name: "id_gt"; type: { kind: "SCALAR"; name: "Bytes"; ofType: null }; defaultValue: null },
      { name: "id_lt"; type: { kind: "SCALAR"; name: "Bytes"; ofType: null }; defaultValue: null },
      { name: "id_gte"; type: { kind: "SCALAR"; name: "Bytes"; ofType: null }; defaultValue: null },
      { name: "id_lte"; type: { kind: "SCALAR"; name: "Bytes"; ofType: null }; defaultValue: null },
      {
        name: "id_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Bytes"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "id_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Bytes"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "id_contains"; type: { kind: "SCALAR"; name: "Bytes"; ofType: null }; defaultValue: null },
      { name: "id_not_contains"; type: { kind: "SCALAR"; name: "Bytes"; ofType: null }; defaultValue: null },
      { name: "asAccount"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "asAccount_not"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "asAccount_gt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "asAccount_lt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "asAccount_gte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "asAccount_lte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "asAccount_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "asAccount_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "asAccount_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "asAccount_contains_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "asAccount_not_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "asAccount_not_contains_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "asAccount_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "asAccount_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "asAccount_not_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "asAccount_not_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "asAccount_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "asAccount_ends_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "asAccount_not_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "asAccount_not_ends_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "asAccount_"; type: { kind: "INPUT_OBJECT"; name: "Account_filter"; ofType: null }; defaultValue: null },
      { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "name_not"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "name_gt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "name_lt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "name_gte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "name_lte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "name_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "name_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "name_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "name_contains_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "name_not_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "name_not_contains_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "name_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "name_starts_with_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "name_not_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "name_not_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "name_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "name_ends_with_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "name_not_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "name_not_ends_with_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "symbol"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "symbol_not"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "symbol_gt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "symbol_lt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "symbol_gte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "symbol_lte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "symbol_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "symbol_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "symbol_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "symbol_contains_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "symbol_not_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "symbol_not_contains_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "symbol_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "symbol_starts_with_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "symbol_not_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "symbol_not_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "symbol_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "symbol_ends_with_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "symbol_not_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "symbol_not_ends_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "decimals"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "decimals_not"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "decimals_gt"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "decimals_lt"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "decimals_gte"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "decimals_lte"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      {
        name: "decimals_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "decimals_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "extraData"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "extraData_not"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "extraData_gt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "extraData_lt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "extraData_gte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "extraData_lte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "extraData_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "extraData_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "extraData_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "extraData_contains_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "extraData_not_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "extraData_not_contains_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "extraData_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "extraData_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "extraData_not_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "extraData_not_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "extraData_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "extraData_ends_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "extraData_not_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "extraData_not_ends_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "totalSupply"; type: { kind: "SCALAR"; name: "BigDecimal"; ofType: null }; defaultValue: null },
      { name: "totalSupply_not"; type: { kind: "SCALAR"; name: "BigDecimal"; ofType: null }; defaultValue: null },
      { name: "totalSupply_gt"; type: { kind: "SCALAR"; name: "BigDecimal"; ofType: null }; defaultValue: null },
      { name: "totalSupply_lt"; type: { kind: "SCALAR"; name: "BigDecimal"; ofType: null }; defaultValue: null },
      { name: "totalSupply_gte"; type: { kind: "SCALAR"; name: "BigDecimal"; ofType: null }; defaultValue: null },
      { name: "totalSupply_lte"; type: { kind: "SCALAR"; name: "BigDecimal"; ofType: null }; defaultValue: null },
      {
        name: "totalSupply_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigDecimal"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "totalSupply_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigDecimal"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "totalSupplyExact"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "totalSupplyExact_not"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "totalSupplyExact_gt"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "totalSupplyExact_lt"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "totalSupplyExact_gte"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "totalSupplyExact_lte"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      {
        name: "totalSupplyExact_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "totalSupplyExact_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "balances_";
        type: { kind: "INPUT_OBJECT"; name: "ERC20Balance_filter"; ofType: null };
        defaultValue: null;
      },
      {
        name: "approvals_";
        type: { kind: "INPUT_OBJECT"; name: "ERC20Approval_filter"; ofType: null };
        defaultValue: null;
      },
      {
        name: "transfers_";
        type: { kind: "INPUT_OBJECT"; name: "ERC20Transfer_filter"; ofType: null };
        defaultValue: null;
      },
      {
        name: "_change_block";
        type: { kind: "INPUT_OBJECT"; name: "BlockChangedFilter"; ofType: null };
        defaultValue: null;
      },
      {
        name: "and";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "ERC20Contract_filter"; ofType: null };
        };
        defaultValue: null;
      },
      {
        name: "or";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "ERC20Contract_filter"; ofType: null };
        };
        defaultValue: null;
      },
    ];
  };
  ERC20Contract_orderBy: {
    name: "ERC20Contract_orderBy";
    enumValues:
      | "id"
      | "asAccount"
      | "asAccount__id"
      | "name"
      | "symbol"
      | "decimals"
      | "extraData"
      | "totalSupply"
      | "totalSupplyExact"
      | "balances"
      | "approvals"
      | "transfers";
  };
  ERC20Transfer: {
    kind: "OBJECT";
    name: "ERC20Transfer";
    fields: {
      contract: {
        name: "contract";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "ERC20Contract"; ofType: null } };
      };
      emitter: {
        name: "emitter";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "Account"; ofType: null } };
      };
      from: { name: "from"; type: { kind: "OBJECT"; name: "Account"; ofType: null } };
      fromBalance: { name: "fromBalance"; type: { kind: "OBJECT"; name: "ERC20Balance"; ofType: null } };
      id: { name: "id"; type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "ID"; ofType: null } } };
      timestamp: {
        name: "timestamp";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
      };
      to: { name: "to"; type: { kind: "OBJECT"; name: "Account"; ofType: null } };
      toBalance: { name: "toBalance"; type: { kind: "OBJECT"; name: "ERC20Balance"; ofType: null } };
      transaction: {
        name: "transaction";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "Transaction"; ofType: null } };
      };
      value: {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigDecimal"; ofType: null } };
      };
      valueExact: {
        name: "valueExact";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
      };
    };
  };
  ERC20Transfer_filter: {
    kind: "INPUT_OBJECT";
    name: "ERC20Transfer_filter";
    isOneOf: false;
    inputFields: [
      { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      { name: "id_not"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      { name: "id_gt"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      { name: "id_lt"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      { name: "id_gte"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      { name: "id_lte"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      {
        name: "id_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "ID"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "id_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "ID"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "emitter"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "emitter_not"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "emitter_gt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "emitter_lt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "emitter_gte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "emitter_lte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "emitter_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "emitter_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "emitter_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "emitter_contains_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "emitter_not_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "emitter_not_contains_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "emitter_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "emitter_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "emitter_not_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "emitter_not_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "emitter_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "emitter_ends_with_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "emitter_not_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "emitter_not_ends_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "emitter_"; type: { kind: "INPUT_OBJECT"; name: "Account_filter"; ofType: null }; defaultValue: null },
      { name: "transaction"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "transaction_not"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "transaction_gt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "transaction_lt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "transaction_gte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "transaction_lte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "transaction_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "transaction_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "transaction_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "transaction_contains_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "transaction_not_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "transaction_not_contains_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "transaction_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "transaction_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      {
        name: "transaction_not_starts_with";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      {
        name: "transaction_not_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "transaction_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "transaction_ends_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "transaction_not_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "transaction_not_ends_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      {
        name: "transaction_";
        type: { kind: "INPUT_OBJECT"; name: "Transaction_filter"; ofType: null };
        defaultValue: null;
      },
      { name: "timestamp"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "timestamp_not"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "timestamp_gt"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "timestamp_lt"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "timestamp_gte"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "timestamp_lte"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      {
        name: "timestamp_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "timestamp_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "contract"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_not"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_gt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_lt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_gte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_lte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "contract_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "contract_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "contract_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_contains_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_not_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "contract_not_contains_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "contract_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "contract_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "contract_not_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "contract_not_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "contract_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_ends_with_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "contract_not_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "contract_not_ends_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      {
        name: "contract_";
        type: { kind: "INPUT_OBJECT"; name: "ERC20Contract_filter"; ofType: null };
        defaultValue: null;
      },
      { name: "from"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "from_not"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "from_gt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "from_lt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "from_gte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "from_lte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "from_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "from_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "from_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "from_contains_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "from_not_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "from_not_contains_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "from_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "from_starts_with_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "from_not_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "from_not_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "from_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "from_ends_with_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "from_not_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "from_not_ends_with_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "from_"; type: { kind: "INPUT_OBJECT"; name: "Account_filter"; ofType: null }; defaultValue: null },
      { name: "fromBalance"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "fromBalance_not"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "fromBalance_gt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "fromBalance_lt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "fromBalance_gte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "fromBalance_lte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "fromBalance_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "fromBalance_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "fromBalance_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "fromBalance_contains_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "fromBalance_not_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "fromBalance_not_contains_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "fromBalance_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "fromBalance_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      {
        name: "fromBalance_not_starts_with";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      {
        name: "fromBalance_not_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "fromBalance_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "fromBalance_ends_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "fromBalance_not_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "fromBalance_not_ends_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      {
        name: "fromBalance_";
        type: { kind: "INPUT_OBJECT"; name: "ERC20Balance_filter"; ofType: null };
        defaultValue: null;
      },
      { name: "to"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "to_not"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "to_gt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "to_lt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "to_gte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "to_lte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "to_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "to_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "to_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "to_contains_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "to_not_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "to_not_contains_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "to_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "to_starts_with_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "to_not_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "to_not_starts_with_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "to_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "to_ends_with_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "to_not_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "to_not_ends_with_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "to_"; type: { kind: "INPUT_OBJECT"; name: "Account_filter"; ofType: null }; defaultValue: null },
      { name: "toBalance"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "toBalance_not"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "toBalance_gt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "toBalance_lt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "toBalance_gte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "toBalance_lte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "toBalance_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "toBalance_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "toBalance_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "toBalance_contains_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "toBalance_not_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "toBalance_not_contains_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "toBalance_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "toBalance_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "toBalance_not_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "toBalance_not_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "toBalance_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "toBalance_ends_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "toBalance_not_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "toBalance_not_ends_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      {
        name: "toBalance_";
        type: { kind: "INPUT_OBJECT"; name: "ERC20Balance_filter"; ofType: null };
        defaultValue: null;
      },
      { name: "value"; type: { kind: "SCALAR"; name: "BigDecimal"; ofType: null }; defaultValue: null },
      { name: "value_not"; type: { kind: "SCALAR"; name: "BigDecimal"; ofType: null }; defaultValue: null },
      { name: "value_gt"; type: { kind: "SCALAR"; name: "BigDecimal"; ofType: null }; defaultValue: null },
      { name: "value_lt"; type: { kind: "SCALAR"; name: "BigDecimal"; ofType: null }; defaultValue: null },
      { name: "value_gte"; type: { kind: "SCALAR"; name: "BigDecimal"; ofType: null }; defaultValue: null },
      { name: "value_lte"; type: { kind: "SCALAR"; name: "BigDecimal"; ofType: null }; defaultValue: null },
      {
        name: "value_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigDecimal"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "value_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigDecimal"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "valueExact"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "valueExact_not"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "valueExact_gt"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "valueExact_lt"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "valueExact_gte"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "valueExact_lte"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      {
        name: "valueExact_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "valueExact_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "_change_block";
        type: { kind: "INPUT_OBJECT"; name: "BlockChangedFilter"; ofType: null };
        defaultValue: null;
      },
      {
        name: "and";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "ERC20Transfer_filter"; ofType: null };
        };
        defaultValue: null;
      },
      {
        name: "or";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "ERC20Transfer_filter"; ofType: null };
        };
        defaultValue: null;
      },
    ];
  };
  ERC20Transfer_orderBy: {
    name: "ERC20Transfer_orderBy";
    enumValues:
      | "id"
      | "emitter"
      | "emitter__id"
      | "transaction"
      | "transaction__id"
      | "transaction__timestamp"
      | "transaction__blockNumber"
      | "timestamp"
      | "contract"
      | "contract__id"
      | "contract__name"
      | "contract__symbol"
      | "contract__decimals"
      | "contract__extraData"
      | "contract__totalSupply"
      | "contract__totalSupplyExact"
      | "from"
      | "from__id"
      | "fromBalance"
      | "fromBalance__id"
      | "fromBalance__value"
      | "fromBalance__valueExact"
      | "to"
      | "to__id"
      | "toBalance"
      | "toBalance__id"
      | "toBalance__value"
      | "toBalance__valueExact"
      | "value"
      | "valueExact";
  };
  Event: {
    kind: "INTERFACE";
    name: "Event";
    fields: {
      emitter: {
        name: "emitter";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "Account"; ofType: null } };
      };
      id: { name: "id"; type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "ID"; ofType: null } } };
      timestamp: {
        name: "timestamp";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
      };
      transaction: {
        name: "transaction";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "Transaction"; ofType: null } };
      };
    };
    possibleTypes: "ERC20Transfer";
  };
  Event_filter: {
    kind: "INPUT_OBJECT";
    name: "Event_filter";
    isOneOf: false;
    inputFields: [
      { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      { name: "id_not"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      { name: "id_gt"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      { name: "id_lt"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      { name: "id_gte"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      { name: "id_lte"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      {
        name: "id_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "ID"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "id_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "ID"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "transaction"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "transaction_not"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "transaction_gt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "transaction_lt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "transaction_gte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "transaction_lte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "transaction_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "transaction_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "transaction_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "transaction_contains_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "transaction_not_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "transaction_not_contains_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "transaction_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "transaction_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      {
        name: "transaction_not_starts_with";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      {
        name: "transaction_not_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "transaction_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "transaction_ends_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "transaction_not_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "transaction_not_ends_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      {
        name: "transaction_";
        type: { kind: "INPUT_OBJECT"; name: "Transaction_filter"; ofType: null };
        defaultValue: null;
      },
      { name: "emitter"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "emitter_not"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "emitter_gt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "emitter_lt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "emitter_gte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "emitter_lte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "emitter_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "emitter_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "emitter_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "emitter_contains_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "emitter_not_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "emitter_not_contains_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "emitter_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "emitter_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "emitter_not_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "emitter_not_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "emitter_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "emitter_ends_with_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "emitter_not_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "emitter_not_ends_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "emitter_"; type: { kind: "INPUT_OBJECT"; name: "Account_filter"; ofType: null }; defaultValue: null },
      { name: "timestamp"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "timestamp_not"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "timestamp_gt"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "timestamp_lt"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "timestamp_gte"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "timestamp_lte"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      {
        name: "timestamp_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "timestamp_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "_change_block";
        type: { kind: "INPUT_OBJECT"; name: "BlockChangedFilter"; ofType: null };
        defaultValue: null;
      },
      {
        name: "and";
        type: { kind: "LIST"; name: never; ofType: { kind: "INPUT_OBJECT"; name: "Event_filter"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "or";
        type: { kind: "LIST"; name: never; ofType: { kind: "INPUT_OBJECT"; name: "Event_filter"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  Event_orderBy: {
    name: "Event_orderBy";
    enumValues:
      | "id"
      | "transaction"
      | "transaction__id"
      | "transaction__timestamp"
      | "transaction__blockNumber"
      | "emitter"
      | "emitter__id"
      | "timestamp";
  };
  ID: unknown;
  Int: unknown;
  Int8: unknown;
  OrderDirection: { name: "OrderDirection"; enumValues: "asc" | "desc" };
  Query: {
    kind: "OBJECT";
    name: "Query";
    fields: {
      _meta: { name: "_meta"; type: { kind: "OBJECT"; name: "_Meta_"; ofType: null } };
      account: { name: "account"; type: { kind: "OBJECT"; name: "Account"; ofType: null } };
      accounts: {
        name: "accounts";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "Account"; ofType: null } };
          };
        };
      };
      erc20Approval: { name: "erc20Approval"; type: { kind: "OBJECT"; name: "ERC20Approval"; ofType: null } };
      erc20Approvals: {
        name: "erc20Approvals";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "ERC20Approval"; ofType: null } };
          };
        };
      };
      erc20Balance: { name: "erc20Balance"; type: { kind: "OBJECT"; name: "ERC20Balance"; ofType: null } };
      erc20Balances: {
        name: "erc20Balances";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "ERC20Balance"; ofType: null } };
          };
        };
      };
      erc20Contract: { name: "erc20Contract"; type: { kind: "OBJECT"; name: "ERC20Contract"; ofType: null } };
      erc20Contracts: {
        name: "erc20Contracts";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "ERC20Contract"; ofType: null } };
          };
        };
      };
      erc20Transfer: { name: "erc20Transfer"; type: { kind: "OBJECT"; name: "ERC20Transfer"; ofType: null } };
      erc20Transfers: {
        name: "erc20Transfers";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "ERC20Transfer"; ofType: null } };
          };
        };
      };
      event: { name: "event"; type: { kind: "INTERFACE"; name: "Event"; ofType: null } };
      events: {
        name: "events";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "INTERFACE"; name: "Event"; ofType: null } };
          };
        };
      };
      tokenVolume: { name: "tokenVolume"; type: { kind: "OBJECT"; name: "TokenVolume"; ofType: null } };
      tokenVolumeStats_collection: {
        name: "tokenVolumeStats_collection";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: {
              kind: "NON_NULL";
              name: never;
              ofType: { kind: "OBJECT"; name: "TokenVolumeStats"; ofType: null };
            };
          };
        };
      };
      tokenVolumes: {
        name: "tokenVolumes";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "TokenVolume"; ofType: null } };
          };
        };
      };
      transaction: { name: "transaction"; type: { kind: "OBJECT"; name: "Transaction"; ofType: null } };
      transactions: {
        name: "transactions";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "Transaction"; ofType: null } };
          };
        };
      };
    };
  };
  String: unknown;
  Subscription: {
    kind: "OBJECT";
    name: "Subscription";
    fields: {
      _meta: { name: "_meta"; type: { kind: "OBJECT"; name: "_Meta_"; ofType: null } };
      account: { name: "account"; type: { kind: "OBJECT"; name: "Account"; ofType: null } };
      accounts: {
        name: "accounts";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "Account"; ofType: null } };
          };
        };
      };
      erc20Approval: { name: "erc20Approval"; type: { kind: "OBJECT"; name: "ERC20Approval"; ofType: null } };
      erc20Approvals: {
        name: "erc20Approvals";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "ERC20Approval"; ofType: null } };
          };
        };
      };
      erc20Balance: { name: "erc20Balance"; type: { kind: "OBJECT"; name: "ERC20Balance"; ofType: null } };
      erc20Balances: {
        name: "erc20Balances";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "ERC20Balance"; ofType: null } };
          };
        };
      };
      erc20Contract: { name: "erc20Contract"; type: { kind: "OBJECT"; name: "ERC20Contract"; ofType: null } };
      erc20Contracts: {
        name: "erc20Contracts";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "ERC20Contract"; ofType: null } };
          };
        };
      };
      erc20Transfer: { name: "erc20Transfer"; type: { kind: "OBJECT"; name: "ERC20Transfer"; ofType: null } };
      erc20Transfers: {
        name: "erc20Transfers";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "ERC20Transfer"; ofType: null } };
          };
        };
      };
      event: { name: "event"; type: { kind: "INTERFACE"; name: "Event"; ofType: null } };
      events: {
        name: "events";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "INTERFACE"; name: "Event"; ofType: null } };
          };
        };
      };
      tokenVolume: { name: "tokenVolume"; type: { kind: "OBJECT"; name: "TokenVolume"; ofType: null } };
      tokenVolumeStats_collection: {
        name: "tokenVolumeStats_collection";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: {
              kind: "NON_NULL";
              name: never;
              ofType: { kind: "OBJECT"; name: "TokenVolumeStats"; ofType: null };
            };
          };
        };
      };
      tokenVolumes: {
        name: "tokenVolumes";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "TokenVolume"; ofType: null } };
          };
        };
      };
      transaction: { name: "transaction"; type: { kind: "OBJECT"; name: "Transaction"; ofType: null } };
      transactions: {
        name: "transactions";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "Transaction"; ofType: null } };
          };
        };
      };
    };
  };
  Timestamp: unknown;
  TokenVolume: {
    kind: "OBJECT";
    name: "TokenVolume";
    fields: {
      id: {
        name: "id";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int8"; ofType: null } };
      };
      timestamp: {
        name: "timestamp";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Timestamp"; ofType: null } };
      };
      token: {
        name: "token";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "ERC20Contract"; ofType: null } };
      };
      transferCount: {
        name: "transferCount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      volume: {
        name: "volume";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
      };
    };
  };
  TokenVolumeStats: {
    kind: "OBJECT";
    name: "TokenVolumeStats";
    fields: {
      id: {
        name: "id";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int8"; ofType: null } };
      };
      timestamp: {
        name: "timestamp";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Timestamp"; ofType: null } };
      };
      totalTransfers: {
        name: "totalTransfers";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      totalVolume: {
        name: "totalVolume";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
      };
    };
  };
  TokenVolumeStats_filter: {
    kind: "INPUT_OBJECT";
    name: "TokenVolumeStats_filter";
    isOneOf: false;
    inputFields: [
      { name: "id"; type: { kind: "SCALAR"; name: "Int8"; ofType: null }; defaultValue: null },
      { name: "id_gt"; type: { kind: "SCALAR"; name: "Int8"; ofType: null }; defaultValue: null },
      { name: "id_lt"; type: { kind: "SCALAR"; name: "Int8"; ofType: null }; defaultValue: null },
      { name: "id_gte"; type: { kind: "SCALAR"; name: "Int8"; ofType: null }; defaultValue: null },
      { name: "id_lte"; type: { kind: "SCALAR"; name: "Int8"; ofType: null }; defaultValue: null },
      {
        name: "id_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int8"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "timestamp"; type: { kind: "SCALAR"; name: "Timestamp"; ofType: null }; defaultValue: null },
      { name: "timestamp_gt"; type: { kind: "SCALAR"; name: "Timestamp"; ofType: null }; defaultValue: null },
      { name: "timestamp_lt"; type: { kind: "SCALAR"; name: "Timestamp"; ofType: null }; defaultValue: null },
      { name: "timestamp_gte"; type: { kind: "SCALAR"; name: "Timestamp"; ofType: null }; defaultValue: null },
      { name: "timestamp_lte"; type: { kind: "SCALAR"; name: "Timestamp"; ofType: null }; defaultValue: null },
      {
        name: "timestamp_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Timestamp"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "_change_block";
        type: { kind: "INPUT_OBJECT"; name: "BlockChangedFilter"; ofType: null };
        defaultValue: null;
      },
      {
        name: "and";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "TokenVolumeStats_filter"; ofType: null };
        };
        defaultValue: null;
      },
      {
        name: "or";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "TokenVolumeStats_filter"; ofType: null };
        };
        defaultValue: null;
      },
    ];
  };
  TokenVolume_filter: {
    kind: "INPUT_OBJECT";
    name: "TokenVolume_filter";
    isOneOf: false;
    inputFields: [
      { name: "id"; type: { kind: "SCALAR"; name: "Int8"; ofType: null }; defaultValue: null },
      { name: "id_not"; type: { kind: "SCALAR"; name: "Int8"; ofType: null }; defaultValue: null },
      { name: "id_gt"; type: { kind: "SCALAR"; name: "Int8"; ofType: null }; defaultValue: null },
      { name: "id_lt"; type: { kind: "SCALAR"; name: "Int8"; ofType: null }; defaultValue: null },
      { name: "id_gte"; type: { kind: "SCALAR"; name: "Int8"; ofType: null }; defaultValue: null },
      { name: "id_lte"; type: { kind: "SCALAR"; name: "Int8"; ofType: null }; defaultValue: null },
      {
        name: "id_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int8"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "id_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int8"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "timestamp"; type: { kind: "SCALAR"; name: "Timestamp"; ofType: null }; defaultValue: null },
      { name: "timestamp_not"; type: { kind: "SCALAR"; name: "Timestamp"; ofType: null }; defaultValue: null },
      { name: "timestamp_gt"; type: { kind: "SCALAR"; name: "Timestamp"; ofType: null }; defaultValue: null },
      { name: "timestamp_lt"; type: { kind: "SCALAR"; name: "Timestamp"; ofType: null }; defaultValue: null },
      { name: "timestamp_gte"; type: { kind: "SCALAR"; name: "Timestamp"; ofType: null }; defaultValue: null },
      { name: "timestamp_lte"; type: { kind: "SCALAR"; name: "Timestamp"; ofType: null }; defaultValue: null },
      {
        name: "timestamp_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Timestamp"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "timestamp_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Timestamp"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "token"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "token_not"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "token_gt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "token_lt"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "token_gte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "token_lte"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "token_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "token_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "token_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "token_contains_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "token_not_contains"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "token_not_contains_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "token_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "token_starts_with_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "token_not_starts_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "token_not_starts_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      { name: "token_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "token_ends_with_nocase"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      { name: "token_not_ends_with"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "token_not_ends_with_nocase";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
        defaultValue: null;
      },
      {
        name: "token_";
        type: { kind: "INPUT_OBJECT"; name: "ERC20Contract_filter"; ofType: null };
        defaultValue: null;
      },
      { name: "transferCount"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "transferCount_not"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "transferCount_gt"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "transferCount_lt"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "transferCount_gte"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "transferCount_lte"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      {
        name: "transferCount_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "transferCount_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "volume"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "volume_not"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "volume_gt"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "volume_lt"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "volume_gte"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "volume_lte"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      {
        name: "volume_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "volume_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "_change_block";
        type: { kind: "INPUT_OBJECT"; name: "BlockChangedFilter"; ofType: null };
        defaultValue: null;
      },
      {
        name: "and";
        type: { kind: "LIST"; name: never; ofType: { kind: "INPUT_OBJECT"; name: "TokenVolume_filter"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "or";
        type: { kind: "LIST"; name: never; ofType: { kind: "INPUT_OBJECT"; name: "TokenVolume_filter"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  TokenVolume_orderBy: {
    name: "TokenVolume_orderBy";
    enumValues:
      | "id"
      | "timestamp"
      | "token"
      | "token__id"
      | "token__name"
      | "token__symbol"
      | "token__decimals"
      | "token__extraData"
      | "token__totalSupply"
      | "token__totalSupplyExact"
      | "transferCount"
      | "volume";
  };
  Transaction: {
    kind: "OBJECT";
    name: "Transaction";
    fields: {
      blockNumber: {
        name: "blockNumber";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
      };
      events: {
        name: "events";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "INTERFACE"; name: "Event"; ofType: null } };
          };
        };
      };
      id: { name: "id"; type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "ID"; ofType: null } } };
      timestamp: {
        name: "timestamp";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
      };
    };
  };
  Transaction_filter: {
    kind: "INPUT_OBJECT";
    name: "Transaction_filter";
    isOneOf: false;
    inputFields: [
      { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      { name: "id_not"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      { name: "id_gt"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      { name: "id_lt"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      { name: "id_gte"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      { name: "id_lte"; type: { kind: "SCALAR"; name: "ID"; ofType: null }; defaultValue: null },
      {
        name: "id_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "ID"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "id_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "ID"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "timestamp"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "timestamp_not"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "timestamp_gt"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "timestamp_lt"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "timestamp_gte"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "timestamp_lte"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      {
        name: "timestamp_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "timestamp_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "blockNumber"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "blockNumber_not"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "blockNumber_gt"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "blockNumber_lt"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "blockNumber_gte"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      { name: "blockNumber_lte"; type: { kind: "SCALAR"; name: "BigInt"; ofType: null }; defaultValue: null },
      {
        name: "blockNumber_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
        };
        defaultValue: null;
      },
      {
        name: "blockNumber_not_in";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "BigInt"; ofType: null } };
        };
        defaultValue: null;
      },
      { name: "events_"; type: { kind: "INPUT_OBJECT"; name: "Event_filter"; ofType: null }; defaultValue: null },
      {
        name: "_change_block";
        type: { kind: "INPUT_OBJECT"; name: "BlockChangedFilter"; ofType: null };
        defaultValue: null;
      },
      {
        name: "and";
        type: { kind: "LIST"; name: never; ofType: { kind: "INPUT_OBJECT"; name: "Transaction_filter"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "or";
        type: { kind: "LIST"; name: never; ofType: { kind: "INPUT_OBJECT"; name: "Transaction_filter"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  Transaction_orderBy: { name: "Transaction_orderBy"; enumValues: "id" | "timestamp" | "blockNumber" | "events" };
  _Block_: {
    kind: "OBJECT";
    name: "_Block_";
    fields: {
      hash: { name: "hash"; type: { kind: "SCALAR"; name: "Bytes"; ofType: null } };
      number: {
        name: "number";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      parentHash: { name: "parentHash"; type: { kind: "SCALAR"; name: "Bytes"; ofType: null } };
      timestamp: { name: "timestamp"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
    };
  };
  _Meta_: {
    kind: "OBJECT";
    name: "_Meta_";
    fields: {
      block: {
        name: "block";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "_Block_"; ofType: null } };
      };
      deployment: {
        name: "deployment";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      hasIndexingErrors: {
        name: "hasIndexingErrors";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      };
    };
  };
  _SubgraphErrorPolicy_: { name: "_SubgraphErrorPolicy_"; enumValues: "allow" | "deny" };
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
  name: "thegraph-fallback";
  query: "Query";
  mutation: never;
  subscription: "Subscription";
  types: introspection_types;
};

import * as gqlTada from "gql.tada";
