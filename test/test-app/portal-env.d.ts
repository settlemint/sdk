/* eslint-disable */
/* prettier-ignore */

export type introspection_types = {
  Bond: {
    kind: "OBJECT";
    name: "Bond";
    fields: {
      CLOCK_MODE: { name: "CLOCK_MODE"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      DEFAULT_ADMIN_ROLE: { name: "DEFAULT_ADMIN_ROLE"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      DOMAIN_SEPARATOR: { name: "DOMAIN_SEPARATOR"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      SUPPLY_MANAGEMENT_ROLE: {
        name: "SUPPLY_MANAGEMENT_ROLE";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
      };
      USER_MANAGEMENT_ROLE: { name: "USER_MANAGEMENT_ROLE"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      allowance: { name: "allowance"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      availableBalance: {
        name: "availableBalance";
        type: { kind: "OBJECT"; name: "BondAvailableBalanceOutput"; ofType: null };
      };
      balanceOf: { name: "balanceOf"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      balanceOfAt: { name: "balanceOfAt"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      bondRedeemed: { name: "bondRedeemed"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      canManageYield: { name: "canManageYield"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      cap: { name: "cap"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      clock: { name: "clock"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      decimals: { name: "decimals"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      eip712Domain: { name: "eip712Domain"; type: { kind: "OBJECT"; name: "BondEip712DomainOutput"; ofType: null } };
      faceValue: { name: "faceValue"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      frozen: { name: "frozen"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      getRoleAdmin: { name: "getRoleAdmin"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      hasRole: { name: "hasRole"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      isMatured: { name: "isMatured"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      isTrustedForwarder: { name: "isTrustedForwarder"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      maturityDate: { name: "maturityDate"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      missingUnderlyingAmount: {
        name: "missingUnderlyingAmount";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
      };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      nonces: { name: "nonces"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      paused: { name: "paused"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      supportsInterface: { name: "supportsInterface"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      symbol: { name: "symbol"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      totalSupply: { name: "totalSupply"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      totalSupplyAt: { name: "totalSupplyAt"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      totalUnderlyingNeeded: { name: "totalUnderlyingNeeded"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      trustedForwarder: { name: "trustedForwarder"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      underlyingAsset: { name: "underlyingAsset"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      underlyingAssetBalance: {
        name: "underlyingAssetBalance";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
      };
      withdrawableUnderlyingAmount: {
        name: "withdrawableUnderlyingAmount";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
      };
      yieldBasisPerUnit: { name: "yieldBasisPerUnit"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      yieldSchedule: { name: "yieldSchedule"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      yieldToken: { name: "yieldToken"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  BondApproveInput: {
    kind: "INPUT_OBJECT";
    name: "BondApproveInput";
    isOneOf: false;
    inputFields: [
      {
        name: "spender";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  BondAvailableBalanceOutput: {
    kind: "OBJECT";
    name: "BondAvailableBalanceOutput";
    fields: { available: { name: "available"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  BondBlockUserInput: {
    kind: "INPUT_OBJECT";
    name: "BondBlockUserInput";
    isOneOf: false;
    inputFields: [
      {
        name: "user";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  BondBlockedInput: {
    kind: "INPUT_OBJECT";
    name: "BondBlockedInput";
    isOneOf: false;
    inputFields: [
      {
        name: "account";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  BondBurnFromInput: {
    kind: "INPUT_OBJECT";
    name: "BondBurnFromInput";
    isOneOf: false;
    inputFields: [
      {
        name: "account";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  BondBurnInput: {
    kind: "INPUT_OBJECT";
    name: "BondBurnInput";
    isOneOf: false;
    inputFields: [
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  BondClawbackInput: {
    kind: "INPUT_OBJECT";
    name: "BondClawbackInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  BondEip712DomainOutput: {
    kind: "OBJECT";
    name: "BondEip712DomainOutput";
    fields: {
      chainId: { name: "chainId"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      extensions: {
        name: "extensions";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
      };
      fields: { name: "fields"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      salt: { name: "salt"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      verifyingContract: { name: "verifyingContract"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      version: { name: "version"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  BondFactory: {
    kind: "OBJECT";
    name: "BondFactory";
    fields: {
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      isAddressDeployed: { name: "isAddressDeployed"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      isFactoryToken: { name: "isFactoryToken"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      isTrustedForwarder: { name: "isTrustedForwarder"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      predictAddress: {
        name: "predictAddress";
        type: { kind: "OBJECT"; name: "BondFactoryPredictAddressOutput"; ofType: null };
      };
      trustedForwarder: { name: "trustedForwarder"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  BondFactoryCreateInput: {
    kind: "INPUT_OBJECT";
    name: "BondFactoryCreateInput";
    isOneOf: false;
    inputFields: [
      {
        name: "cap";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "decimals";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "faceValue";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "maturityDate";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "name";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "symbol";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "underlyingAsset";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  BondFactoryPredictAddressOutput: {
    kind: "OBJECT";
    name: "BondFactoryPredictAddressOutput";
    fields: { predicted: { name: "predicted"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  BondFactoryTransactionOutput: {
    kind: "OBJECT";
    name: "BondFactoryTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  BondFactoryTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "BondFactoryTransactionReceiptOutput";
    fields: {
      blobGasPrice: { name: "blobGasPrice"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blobGasUsed: { name: "blobGasUsed"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blockHash: {
        name: "blockHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      blockNumber: {
        name: "blockNumber";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      contractAddress: { name: "contractAddress"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      cumulativeGasUsed: {
        name: "cumulativeGasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      effectiveGasPrice: {
        name: "effectiveGasPrice";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      events: {
        name: "events";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      from: {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      gasUsed: {
        name: "gasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      logs: {
        name: "logs";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      logsBloom: {
        name: "logsBloom";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      revertReason: { name: "revertReason"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      revertReasonDecoded: { name: "revertReasonDecoded"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      root: { name: "root"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      status: {
        name: "status";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "ENUM"; name: "TransactionReceiptStatus"; ofType: null };
        };
      };
      to: { name: "to"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      transactionHash: {
        name: "transactionHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      transactionIndex: {
        name: "transactionIndex";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      type: {
        name: "type";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      userOperationReceipts: {
        name: "userOperationReceipts";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "OBJECT"; name: "UserOperationReceipt"; ofType: null };
          };
        };
      };
    };
  };
  BondFreezeInput: {
    kind: "INPUT_OBJECT";
    name: "BondFreezeInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "user";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  BondGrantRoleInput: {
    kind: "INPUT_OBJECT";
    name: "BondGrantRoleInput";
    isOneOf: false;
    inputFields: [
      {
        name: "account";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "role";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  BondMintInput: {
    kind: "INPUT_OBJECT";
    name: "BondMintInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  BondPermitInput: {
    kind: "INPUT_OBJECT";
    name: "BondPermitInput";
    isOneOf: false;
    inputFields: [
      {
        name: "deadline";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "owner";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "r";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "s";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "spender";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "v";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  BondRedeemInput: {
    kind: "INPUT_OBJECT";
    name: "BondRedeemInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  BondRenounceRoleInput: {
    kind: "INPUT_OBJECT";
    name: "BondRenounceRoleInput";
    isOneOf: false;
    inputFields: [
      {
        name: "callerConfirmation";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "role";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  BondRevokeRoleInput: {
    kind: "INPUT_OBJECT";
    name: "BondRevokeRoleInput";
    isOneOf: false;
    inputFields: [
      {
        name: "account";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "role";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  BondSetYieldScheduleInput: {
    kind: "INPUT_OBJECT";
    name: "BondSetYieldScheduleInput";
    isOneOf: false;
    inputFields: [
      {
        name: "schedule";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  BondTopUpUnderlyingAssetInput: {
    kind: "INPUT_OBJECT";
    name: "BondTopUpUnderlyingAssetInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  BondTransactionOutput: {
    kind: "OBJECT";
    name: "BondTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  BondTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "BondTransactionReceiptOutput";
    fields: {
      blobGasPrice: { name: "blobGasPrice"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blobGasUsed: { name: "blobGasUsed"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blockHash: {
        name: "blockHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      blockNumber: {
        name: "blockNumber";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      contractAddress: { name: "contractAddress"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      cumulativeGasUsed: {
        name: "cumulativeGasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      effectiveGasPrice: {
        name: "effectiveGasPrice";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      events: {
        name: "events";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      from: {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      gasUsed: {
        name: "gasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      logs: {
        name: "logs";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      logsBloom: {
        name: "logsBloom";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      revertReason: { name: "revertReason"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      revertReasonDecoded: { name: "revertReasonDecoded"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      root: { name: "root"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      status: {
        name: "status";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "ENUM"; name: "TransactionReceiptStatus"; ofType: null };
        };
      };
      to: { name: "to"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      transactionHash: {
        name: "transactionHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      transactionIndex: {
        name: "transactionIndex";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      type: {
        name: "type";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      userOperationReceipts: {
        name: "userOperationReceipts";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "OBJECT"; name: "UserOperationReceipt"; ofType: null };
          };
        };
      };
    };
  };
  BondTransferFromInput: {
    kind: "INPUT_OBJECT";
    name: "BondTransferFromInput";
    isOneOf: false;
    inputFields: [
      {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  BondTransferInput: {
    kind: "INPUT_OBJECT";
    name: "BondTransferInput";
    isOneOf: false;
    inputFields: [
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  BondUnblockUserInput: {
    kind: "INPUT_OBJECT";
    name: "BondUnblockUserInput";
    isOneOf: false;
    inputFields: [
      {
        name: "user";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  BondWithdrawExcessUnderlyingAssetsInput: {
    kind: "INPUT_OBJECT";
    name: "BondWithdrawExcessUnderlyingAssetsInput";
    isOneOf: false;
    inputFields: [
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  BondWithdrawTokenInput: {
    kind: "INPUT_OBJECT";
    name: "BondWithdrawTokenInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "token";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  BondWithdrawUnderlyingAssetInput: {
    kind: "INPUT_OBJECT";
    name: "BondWithdrawUnderlyingAssetInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  Boolean: unknown;
  ConstructorArguments: unknown;
  Contract: {
    kind: "OBJECT";
    name: "Contract";
    fields: {
      abiName: { name: "abiName"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      address: { name: "address"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      createdAt: { name: "createdAt"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      transaction: { name: "transaction"; type: { kind: "OBJECT"; name: "TransactionOutput"; ofType: null } };
      transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  ContractDeploymentTransactionOutput: {
    kind: "OBJECT";
    name: "ContractDeploymentTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  ContractsPaginatedOutput: {
    kind: "OBJECT";
    name: "ContractsPaginatedOutput";
    fields: {
      count: {
        name: "count";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      records: {
        name: "records";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "OBJECT"; name: "Contract"; ofType: null } };
          };
        };
      };
    };
  };
  CreateWalletInfoInput: {
    kind: "INPUT_OBJECT";
    name: "CreateWalletInfoInput";
    isOneOf: false;
    inputFields: [
      {
        name: "name";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  CreateWalletOutput: {
    kind: "OBJECT";
    name: "CreateWalletOutput";
    fields: {
      address: { name: "address"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      derivationPath: { name: "derivationPath"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  CreateWalletVerificationInput: {
    kind: "INPUT_OBJECT";
    name: "CreateWalletVerificationInput";
    isOneOf: false;
    inputFields: [
      { name: "otp"; type: { kind: "INPUT_OBJECT"; name: "OTPSettingsInput"; ofType: null }; defaultValue: null },
      {
        name: "pincode";
        type: { kind: "INPUT_OBJECT"; name: "PincodeSettingsInput"; ofType: null };
        defaultValue: null;
      },
      {
        name: "secretCodes";
        type: { kind: "INPUT_OBJECT"; name: "SecretCodesSettingsInput"; ofType: null };
        defaultValue: null;
      },
    ];
  };
  CreateWalletVerificationOutput: {
    kind: "OBJECT";
    name: "CreateWalletVerificationOutput";
    fields: {
      id: { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      parameters: { name: "parameters"; type: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      verificationType: {
        name: "verificationType";
        type: { kind: "ENUM"; name: "WalletVerificationType"; ofType: null };
      };
    };
  };
  CryptoCurrency: {
    kind: "OBJECT";
    name: "CryptoCurrency";
    fields: {
      DEFAULT_ADMIN_ROLE: { name: "DEFAULT_ADMIN_ROLE"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      DOMAIN_SEPARATOR: { name: "DOMAIN_SEPARATOR"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      SUPPLY_MANAGEMENT_ROLE: {
        name: "SUPPLY_MANAGEMENT_ROLE";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
      };
      allowance: { name: "allowance"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      balanceOf: { name: "balanceOf"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      decimals: { name: "decimals"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      eip712Domain: {
        name: "eip712Domain";
        type: { kind: "OBJECT"; name: "CryptoCurrencyEip712DomainOutput"; ofType: null };
      };
      getRoleAdmin: { name: "getRoleAdmin"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      hasRole: { name: "hasRole"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      isTrustedForwarder: { name: "isTrustedForwarder"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      nonces: { name: "nonces"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      supportsInterface: { name: "supportsInterface"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      symbol: { name: "symbol"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      totalSupply: { name: "totalSupply"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      trustedForwarder: { name: "trustedForwarder"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  CryptoCurrencyApproveInput: {
    kind: "INPUT_OBJECT";
    name: "CryptoCurrencyApproveInput";
    isOneOf: false;
    inputFields: [
      {
        name: "spender";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  CryptoCurrencyEip712DomainOutput: {
    kind: "OBJECT";
    name: "CryptoCurrencyEip712DomainOutput";
    fields: {
      chainId: { name: "chainId"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      extensions: {
        name: "extensions";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
      };
      fields: { name: "fields"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      salt: { name: "salt"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      verifyingContract: { name: "verifyingContract"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      version: { name: "version"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  CryptoCurrencyFactory: {
    kind: "OBJECT";
    name: "CryptoCurrencyFactory";
    fields: {
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      isAddressDeployed: { name: "isAddressDeployed"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      isFactoryToken: { name: "isFactoryToken"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      isTrustedForwarder: { name: "isTrustedForwarder"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      predictAddress: {
        name: "predictAddress";
        type: { kind: "OBJECT"; name: "CryptoCurrencyFactoryPredictAddressOutput"; ofType: null };
      };
      trustedForwarder: { name: "trustedForwarder"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  CryptoCurrencyFactoryCreateInput: {
    kind: "INPUT_OBJECT";
    name: "CryptoCurrencyFactoryCreateInput";
    isOneOf: false;
    inputFields: [
      {
        name: "decimals";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "initialSupply";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "name";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "symbol";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  CryptoCurrencyFactoryPredictAddressOutput: {
    kind: "OBJECT";
    name: "CryptoCurrencyFactoryPredictAddressOutput";
    fields: { predicted: { name: "predicted"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  CryptoCurrencyFactoryTransactionOutput: {
    kind: "OBJECT";
    name: "CryptoCurrencyFactoryTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  CryptoCurrencyFactoryTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "CryptoCurrencyFactoryTransactionReceiptOutput";
    fields: {
      blobGasPrice: { name: "blobGasPrice"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blobGasUsed: { name: "blobGasUsed"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blockHash: {
        name: "blockHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      blockNumber: {
        name: "blockNumber";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      contractAddress: { name: "contractAddress"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      cumulativeGasUsed: {
        name: "cumulativeGasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      effectiveGasPrice: {
        name: "effectiveGasPrice";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      events: {
        name: "events";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      from: {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      gasUsed: {
        name: "gasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      logs: {
        name: "logs";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      logsBloom: {
        name: "logsBloom";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      revertReason: { name: "revertReason"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      revertReasonDecoded: { name: "revertReasonDecoded"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      root: { name: "root"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      status: {
        name: "status";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "ENUM"; name: "TransactionReceiptStatus"; ofType: null };
        };
      };
      to: { name: "to"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      transactionHash: {
        name: "transactionHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      transactionIndex: {
        name: "transactionIndex";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      type: {
        name: "type";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      userOperationReceipts: {
        name: "userOperationReceipts";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "OBJECT"; name: "UserOperationReceipt"; ofType: null };
          };
        };
      };
    };
  };
  CryptoCurrencyGrantRoleInput: {
    kind: "INPUT_OBJECT";
    name: "CryptoCurrencyGrantRoleInput";
    isOneOf: false;
    inputFields: [
      {
        name: "account";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "role";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  CryptoCurrencyMintInput: {
    kind: "INPUT_OBJECT";
    name: "CryptoCurrencyMintInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  CryptoCurrencyPermitInput: {
    kind: "INPUT_OBJECT";
    name: "CryptoCurrencyPermitInput";
    isOneOf: false;
    inputFields: [
      {
        name: "deadline";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "owner";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "r";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "s";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "spender";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "v";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  CryptoCurrencyRenounceRoleInput: {
    kind: "INPUT_OBJECT";
    name: "CryptoCurrencyRenounceRoleInput";
    isOneOf: false;
    inputFields: [
      {
        name: "callerConfirmation";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "role";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  CryptoCurrencyRevokeRoleInput: {
    kind: "INPUT_OBJECT";
    name: "CryptoCurrencyRevokeRoleInput";
    isOneOf: false;
    inputFields: [
      {
        name: "account";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "role";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  CryptoCurrencyTransactionOutput: {
    kind: "OBJECT";
    name: "CryptoCurrencyTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  CryptoCurrencyTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "CryptoCurrencyTransactionReceiptOutput";
    fields: {
      blobGasPrice: { name: "blobGasPrice"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blobGasUsed: { name: "blobGasUsed"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blockHash: {
        name: "blockHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      blockNumber: {
        name: "blockNumber";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      contractAddress: { name: "contractAddress"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      cumulativeGasUsed: {
        name: "cumulativeGasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      effectiveGasPrice: {
        name: "effectiveGasPrice";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      events: {
        name: "events";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      from: {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      gasUsed: {
        name: "gasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      logs: {
        name: "logs";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      logsBloom: {
        name: "logsBloom";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      revertReason: { name: "revertReason"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      revertReasonDecoded: { name: "revertReasonDecoded"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      root: { name: "root"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      status: {
        name: "status";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "ENUM"; name: "TransactionReceiptStatus"; ofType: null };
        };
      };
      to: { name: "to"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      transactionHash: {
        name: "transactionHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      transactionIndex: {
        name: "transactionIndex";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      type: {
        name: "type";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      userOperationReceipts: {
        name: "userOperationReceipts";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "OBJECT"; name: "UserOperationReceipt"; ofType: null };
          };
        };
      };
    };
  };
  CryptoCurrencyTransferFromInput: {
    kind: "INPUT_OBJECT";
    name: "CryptoCurrencyTransferFromInput";
    isOneOf: false;
    inputFields: [
      {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  CryptoCurrencyTransferInput: {
    kind: "INPUT_OBJECT";
    name: "CryptoCurrencyTransferInput";
    isOneOf: false;
    inputFields: [
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  CryptoCurrencyWithdrawTokenInput: {
    kind: "INPUT_OBJECT";
    name: "CryptoCurrencyWithdrawTokenInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "token";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DeleteWalletVerificationOutput: {
    kind: "OBJECT";
    name: "DeleteWalletVerificationOutput";
    fields: { success: { name: "success"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } } };
  };
  DeployContractBondFactoryInput: {
    kind: "INPUT_OBJECT";
    name: "DeployContractBondFactoryInput";
    isOneOf: false;
    inputFields: [
      {
        name: "forwarder";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DeployContractBondInput: {
    kind: "INPUT_OBJECT";
    name: "DeployContractBondInput";
    isOneOf: false;
    inputFields: [
      {
        name: "_cap";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "_faceValue";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "_maturityDate";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "_underlyingAsset";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "decimals_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "forwarder";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "initialOwner";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "name";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "symbol";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DeployContractCryptoCurrencyFactoryInput: {
    kind: "INPUT_OBJECT";
    name: "DeployContractCryptoCurrencyFactoryInput";
    isOneOf: false;
    inputFields: [
      {
        name: "forwarder";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DeployContractCryptoCurrencyInput: {
    kind: "INPUT_OBJECT";
    name: "DeployContractCryptoCurrencyInput";
    isOneOf: false;
    inputFields: [
      {
        name: "decimals_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "forwarder";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "initialOwner";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "initialSupply";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "name";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "symbol";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DeployContractDepositFactoryInput: {
    kind: "INPUT_OBJECT";
    name: "DeployContractDepositFactoryInput";
    isOneOf: false;
    inputFields: [
      {
        name: "forwarder";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DeployContractDepositInput: {
    kind: "INPUT_OBJECT";
    name: "DeployContractDepositInput";
    isOneOf: false;
    inputFields: [
      {
        name: "collateralLivenessSeconds";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Float"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "decimals_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "forwarder";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "initialOwner";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "name";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "symbol";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DeployContractEquityFactoryInput: {
    kind: "INPUT_OBJECT";
    name: "DeployContractEquityFactoryInput";
    isOneOf: false;
    inputFields: [
      {
        name: "forwarder";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DeployContractEquityInput: {
    kind: "INPUT_OBJECT";
    name: "DeployContractEquityInput";
    isOneOf: false;
    inputFields: [
      {
        name: "decimals_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "equityCategory_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "equityClass_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "forwarder";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "initialOwner";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "name";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "symbol";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DeployContractFixedYieldFactoryInput: {
    kind: "INPUT_OBJECT";
    name: "DeployContractFixedYieldFactoryInput";
    isOneOf: false;
    inputFields: [
      {
        name: "forwarder";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DeployContractFixedYieldInput: {
    kind: "INPUT_OBJECT";
    name: "DeployContractFixedYieldInput";
    isOneOf: false;
    inputFields: [
      {
        name: "endDate_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "forwarder";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "initialOwner";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "interval_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "rate_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "startDate_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "tokenAddress";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DeployContractFundFactoryInput: {
    kind: "INPUT_OBJECT";
    name: "DeployContractFundFactoryInput";
    isOneOf: false;
    inputFields: [
      {
        name: "forwarder";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DeployContractFundInput: {
    kind: "INPUT_OBJECT";
    name: "DeployContractFundInput";
    isOneOf: false;
    inputFields: [
      {
        name: "decimals_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "forwarder";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "fundCategory_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "fundClass_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "initialOwner";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "managementFeeBps_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "name";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "symbol";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DeployContractStableCoinFactoryInput: {
    kind: "INPUT_OBJECT";
    name: "DeployContractStableCoinFactoryInput";
    isOneOf: false;
    inputFields: [
      {
        name: "forwarder";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DeployContractStableCoinInput: {
    kind: "INPUT_OBJECT";
    name: "DeployContractStableCoinInput";
    isOneOf: false;
    inputFields: [
      {
        name: "collateralLivenessSeconds";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Float"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "decimals_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "forwarder";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "initialOwner";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "name";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "symbol";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  Deposit: {
    kind: "OBJECT";
    name: "Deposit";
    fields: {
      AUDITOR_ROLE: { name: "AUDITOR_ROLE"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      CLOCK_MODE: { name: "CLOCK_MODE"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      DEFAULT_ADMIN_ROLE: { name: "DEFAULT_ADMIN_ROLE"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      DOMAIN_SEPARATOR: { name: "DOMAIN_SEPARATOR"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      SUPPLY_MANAGEMENT_ROLE: {
        name: "SUPPLY_MANAGEMENT_ROLE";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
      };
      USER_MANAGEMENT_ROLE: { name: "USER_MANAGEMENT_ROLE"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      allowance: { name: "allowance"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      availableBalance: {
        name: "availableBalance";
        type: { kind: "OBJECT"; name: "DepositAvailableBalanceOutput"; ofType: null };
      };
      balanceOf: { name: "balanceOf"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      clock: { name: "clock"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      collateral: { name: "collateral"; type: { kind: "OBJECT"; name: "DepositCollateralOutput"; ofType: null } };
      decimals: { name: "decimals"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      eip712Domain: { name: "eip712Domain"; type: { kind: "OBJECT"; name: "DepositEip712DomainOutput"; ofType: null } };
      frozen: { name: "frozen"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      getRoleAdmin: { name: "getRoleAdmin"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      hasRole: { name: "hasRole"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      isTrustedForwarder: { name: "isTrustedForwarder"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      lastCollateralUpdate: { name: "lastCollateralUpdate"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      liveness: { name: "liveness"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      nonces: { name: "nonces"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      paused: { name: "paused"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      supportsInterface: { name: "supportsInterface"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      symbol: { name: "symbol"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      totalSupply: { name: "totalSupply"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      trustedForwarder: { name: "trustedForwarder"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  DepositAllowUserInput: {
    kind: "INPUT_OBJECT";
    name: "DepositAllowUserInput";
    isOneOf: false;
    inputFields: [
      {
        name: "user";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DepositAllowedInput: {
    kind: "INPUT_OBJECT";
    name: "DepositAllowedInput";
    isOneOf: false;
    inputFields: [
      {
        name: "account";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DepositApproveInput: {
    kind: "INPUT_OBJECT";
    name: "DepositApproveInput";
    isOneOf: false;
    inputFields: [
      {
        name: "spender";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DepositAvailableBalanceOutput: {
    kind: "OBJECT";
    name: "DepositAvailableBalanceOutput";
    fields: { available: { name: "available"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  DepositBurnFromInput: {
    kind: "INPUT_OBJECT";
    name: "DepositBurnFromInput";
    isOneOf: false;
    inputFields: [
      {
        name: "account";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DepositBurnInput: {
    kind: "INPUT_OBJECT";
    name: "DepositBurnInput";
    isOneOf: false;
    inputFields: [
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DepositClawbackInput: {
    kind: "INPUT_OBJECT";
    name: "DepositClawbackInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DepositCollateralOutput: {
    kind: "OBJECT";
    name: "DepositCollateralOutput";
    fields: {
      amount: { name: "amount"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      timestamp: { name: "timestamp"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
    };
  };
  DepositDisallowUserInput: {
    kind: "INPUT_OBJECT";
    name: "DepositDisallowUserInput";
    isOneOf: false;
    inputFields: [
      {
        name: "user";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DepositEip712DomainOutput: {
    kind: "OBJECT";
    name: "DepositEip712DomainOutput";
    fields: {
      chainId: { name: "chainId"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      extensions: {
        name: "extensions";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
      };
      fields: { name: "fields"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      salt: { name: "salt"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      verifyingContract: { name: "verifyingContract"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      version: { name: "version"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  DepositFactory: {
    kind: "OBJECT";
    name: "DepositFactory";
    fields: {
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      isAddressDeployed: { name: "isAddressDeployed"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      isFactoryToken: { name: "isFactoryToken"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      isTrustedForwarder: { name: "isTrustedForwarder"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      predictAddress: {
        name: "predictAddress";
        type: { kind: "OBJECT"; name: "DepositFactoryPredictAddressOutput"; ofType: null };
      };
      trustedForwarder: { name: "trustedForwarder"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  DepositFactoryCreateInput: {
    kind: "INPUT_OBJECT";
    name: "DepositFactoryCreateInput";
    isOneOf: false;
    inputFields: [
      {
        name: "collateralLivenessSeconds";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Float"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "decimals";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "name";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "symbol";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DepositFactoryPredictAddressOutput: {
    kind: "OBJECT";
    name: "DepositFactoryPredictAddressOutput";
    fields: { predicted: { name: "predicted"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  DepositFactoryTransactionOutput: {
    kind: "OBJECT";
    name: "DepositFactoryTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  DepositFactoryTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "DepositFactoryTransactionReceiptOutput";
    fields: {
      blobGasPrice: { name: "blobGasPrice"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blobGasUsed: { name: "blobGasUsed"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blockHash: {
        name: "blockHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      blockNumber: {
        name: "blockNumber";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      contractAddress: { name: "contractAddress"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      cumulativeGasUsed: {
        name: "cumulativeGasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      effectiveGasPrice: {
        name: "effectiveGasPrice";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      events: {
        name: "events";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      from: {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      gasUsed: {
        name: "gasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      logs: {
        name: "logs";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      logsBloom: {
        name: "logsBloom";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      revertReason: { name: "revertReason"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      revertReasonDecoded: { name: "revertReasonDecoded"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      root: { name: "root"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      status: {
        name: "status";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "ENUM"; name: "TransactionReceiptStatus"; ofType: null };
        };
      };
      to: { name: "to"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      transactionHash: {
        name: "transactionHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      transactionIndex: {
        name: "transactionIndex";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      type: {
        name: "type";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      userOperationReceipts: {
        name: "userOperationReceipts";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "OBJECT"; name: "UserOperationReceipt"; ofType: null };
          };
        };
      };
    };
  };
  DepositFreezeInput: {
    kind: "INPUT_OBJECT";
    name: "DepositFreezeInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "user";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DepositGrantRoleInput: {
    kind: "INPUT_OBJECT";
    name: "DepositGrantRoleInput";
    isOneOf: false;
    inputFields: [
      {
        name: "account";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "role";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DepositMintInput: {
    kind: "INPUT_OBJECT";
    name: "DepositMintInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DepositPermitInput: {
    kind: "INPUT_OBJECT";
    name: "DepositPermitInput";
    isOneOf: false;
    inputFields: [
      {
        name: "deadline";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "owner";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "r";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "s";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "spender";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "v";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DepositRenounceRoleInput: {
    kind: "INPUT_OBJECT";
    name: "DepositRenounceRoleInput";
    isOneOf: false;
    inputFields: [
      {
        name: "callerConfirmation";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "role";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DepositRevokeRoleInput: {
    kind: "INPUT_OBJECT";
    name: "DepositRevokeRoleInput";
    isOneOf: false;
    inputFields: [
      {
        name: "account";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "role";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DepositTransactionOutput: {
    kind: "OBJECT";
    name: "DepositTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  DepositTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "DepositTransactionReceiptOutput";
    fields: {
      blobGasPrice: { name: "blobGasPrice"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blobGasUsed: { name: "blobGasUsed"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blockHash: {
        name: "blockHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      blockNumber: {
        name: "blockNumber";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      contractAddress: { name: "contractAddress"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      cumulativeGasUsed: {
        name: "cumulativeGasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      effectiveGasPrice: {
        name: "effectiveGasPrice";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      events: {
        name: "events";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      from: {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      gasUsed: {
        name: "gasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      logs: {
        name: "logs";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      logsBloom: {
        name: "logsBloom";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      revertReason: { name: "revertReason"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      revertReasonDecoded: { name: "revertReasonDecoded"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      root: { name: "root"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      status: {
        name: "status";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "ENUM"; name: "TransactionReceiptStatus"; ofType: null };
        };
      };
      to: { name: "to"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      transactionHash: {
        name: "transactionHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      transactionIndex: {
        name: "transactionIndex";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      type: {
        name: "type";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      userOperationReceipts: {
        name: "userOperationReceipts";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "OBJECT"; name: "UserOperationReceipt"; ofType: null };
          };
        };
      };
    };
  };
  DepositTransferFromInput: {
    kind: "INPUT_OBJECT";
    name: "DepositTransferFromInput";
    isOneOf: false;
    inputFields: [
      {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DepositTransferInput: {
    kind: "INPUT_OBJECT";
    name: "DepositTransferInput";
    isOneOf: false;
    inputFields: [
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DepositUpdateCollateralInput: {
    kind: "INPUT_OBJECT";
    name: "DepositUpdateCollateralInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DepositWithdrawTokenInput: {
    kind: "INPUT_OBJECT";
    name: "DepositWithdrawTokenInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "token";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  Equity: {
    kind: "OBJECT";
    name: "Equity";
    fields: {
      CLOCK_MODE: { name: "CLOCK_MODE"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      DEFAULT_ADMIN_ROLE: { name: "DEFAULT_ADMIN_ROLE"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      DOMAIN_SEPARATOR: { name: "DOMAIN_SEPARATOR"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      SUPPLY_MANAGEMENT_ROLE: {
        name: "SUPPLY_MANAGEMENT_ROLE";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
      };
      USER_MANAGEMENT_ROLE: { name: "USER_MANAGEMENT_ROLE"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      allowance: { name: "allowance"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      availableBalance: {
        name: "availableBalance";
        type: { kind: "OBJECT"; name: "EquityAvailableBalanceOutput"; ofType: null };
      };
      balanceOf: { name: "balanceOf"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      checkpoints: {
        name: "checkpoints";
        type: { kind: "OBJECT"; name: "EquityTuple0CheckpointsOutput"; ofType: null };
      };
      clock: { name: "clock"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      decimals: { name: "decimals"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      delegates: { name: "delegates"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      eip712Domain: { name: "eip712Domain"; type: { kind: "OBJECT"; name: "EquityEip712DomainOutput"; ofType: null } };
      equityCategory: { name: "equityCategory"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      equityClass: { name: "equityClass"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      frozen: { name: "frozen"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      getPastTotalSupply: { name: "getPastTotalSupply"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      getPastVotes: { name: "getPastVotes"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      getRoleAdmin: { name: "getRoleAdmin"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      getVotes: { name: "getVotes"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      hasRole: { name: "hasRole"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      isTrustedForwarder: { name: "isTrustedForwarder"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      nonces: { name: "nonces"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      numCheckpoints: { name: "numCheckpoints"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      paused: { name: "paused"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      supportsInterface: { name: "supportsInterface"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      symbol: { name: "symbol"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      totalSupply: { name: "totalSupply"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      trustedForwarder: { name: "trustedForwarder"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  EquityApproveInput: {
    kind: "INPUT_OBJECT";
    name: "EquityApproveInput";
    isOneOf: false;
    inputFields: [
      {
        name: "spender";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EquityAvailableBalanceOutput: {
    kind: "OBJECT";
    name: "EquityAvailableBalanceOutput";
    fields: { available: { name: "available"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  EquityBlockUserInput: {
    kind: "INPUT_OBJECT";
    name: "EquityBlockUserInput";
    isOneOf: false;
    inputFields: [
      {
        name: "user";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EquityBlockedInput: {
    kind: "INPUT_OBJECT";
    name: "EquityBlockedInput";
    isOneOf: false;
    inputFields: [
      {
        name: "account";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EquityBurnFromInput: {
    kind: "INPUT_OBJECT";
    name: "EquityBurnFromInput";
    isOneOf: false;
    inputFields: [
      {
        name: "account";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EquityBurnInput: {
    kind: "INPUT_OBJECT";
    name: "EquityBurnInput";
    isOneOf: false;
    inputFields: [
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EquityClawbackInput: {
    kind: "INPUT_OBJECT";
    name: "EquityClawbackInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EquityDelegateBySigInput: {
    kind: "INPUT_OBJECT";
    name: "EquityDelegateBySigInput";
    isOneOf: false;
    inputFields: [
      {
        name: "delegatee";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "expiry";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "nonce";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "r";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "s";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "v";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EquityDelegateInput: {
    kind: "INPUT_OBJECT";
    name: "EquityDelegateInput";
    isOneOf: false;
    inputFields: [
      {
        name: "delegatee";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EquityEip712DomainOutput: {
    kind: "OBJECT";
    name: "EquityEip712DomainOutput";
    fields: {
      chainId: { name: "chainId"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      extensions: {
        name: "extensions";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
      };
      fields: { name: "fields"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      salt: { name: "salt"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      verifyingContract: { name: "verifyingContract"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      version: { name: "version"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  EquityFactory: {
    kind: "OBJECT";
    name: "EquityFactory";
    fields: {
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      isAddressDeployed: { name: "isAddressDeployed"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      isFactoryToken: { name: "isFactoryToken"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      isTrustedForwarder: { name: "isTrustedForwarder"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      predictAddress: {
        name: "predictAddress";
        type: { kind: "OBJECT"; name: "EquityFactoryPredictAddressOutput"; ofType: null };
      };
      trustedForwarder: { name: "trustedForwarder"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  EquityFactoryCreateInput: {
    kind: "INPUT_OBJECT";
    name: "EquityFactoryCreateInput";
    isOneOf: false;
    inputFields: [
      {
        name: "decimals";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "equityCategory";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "equityClass";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "name";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "symbol";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EquityFactoryPredictAddressOutput: {
    kind: "OBJECT";
    name: "EquityFactoryPredictAddressOutput";
    fields: { predicted: { name: "predicted"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  EquityFactoryTransactionOutput: {
    kind: "OBJECT";
    name: "EquityFactoryTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  EquityFactoryTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "EquityFactoryTransactionReceiptOutput";
    fields: {
      blobGasPrice: { name: "blobGasPrice"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blobGasUsed: { name: "blobGasUsed"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blockHash: {
        name: "blockHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      blockNumber: {
        name: "blockNumber";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      contractAddress: { name: "contractAddress"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      cumulativeGasUsed: {
        name: "cumulativeGasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      effectiveGasPrice: {
        name: "effectiveGasPrice";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      events: {
        name: "events";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      from: {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      gasUsed: {
        name: "gasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      logs: {
        name: "logs";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      logsBloom: {
        name: "logsBloom";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      revertReason: { name: "revertReason"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      revertReasonDecoded: { name: "revertReasonDecoded"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      root: { name: "root"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      status: {
        name: "status";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "ENUM"; name: "TransactionReceiptStatus"; ofType: null };
        };
      };
      to: { name: "to"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      transactionHash: {
        name: "transactionHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      transactionIndex: {
        name: "transactionIndex";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      type: {
        name: "type";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      userOperationReceipts: {
        name: "userOperationReceipts";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "OBJECT"; name: "UserOperationReceipt"; ofType: null };
          };
        };
      };
    };
  };
  EquityFreezeInput: {
    kind: "INPUT_OBJECT";
    name: "EquityFreezeInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "user";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EquityGrantRoleInput: {
    kind: "INPUT_OBJECT";
    name: "EquityGrantRoleInput";
    isOneOf: false;
    inputFields: [
      {
        name: "account";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "role";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EquityMintInput: {
    kind: "INPUT_OBJECT";
    name: "EquityMintInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EquityPermitInput: {
    kind: "INPUT_OBJECT";
    name: "EquityPermitInput";
    isOneOf: false;
    inputFields: [
      {
        name: "deadline";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "owner";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "r";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "s";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "spender";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "v";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EquityRenounceRoleInput: {
    kind: "INPUT_OBJECT";
    name: "EquityRenounceRoleInput";
    isOneOf: false;
    inputFields: [
      {
        name: "callerConfirmation";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "role";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EquityRevokeRoleInput: {
    kind: "INPUT_OBJECT";
    name: "EquityRevokeRoleInput";
    isOneOf: false;
    inputFields: [
      {
        name: "account";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "role";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EquityTransactionOutput: {
    kind: "OBJECT";
    name: "EquityTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  EquityTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "EquityTransactionReceiptOutput";
    fields: {
      blobGasPrice: { name: "blobGasPrice"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blobGasUsed: { name: "blobGasUsed"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blockHash: {
        name: "blockHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      blockNumber: {
        name: "blockNumber";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      contractAddress: { name: "contractAddress"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      cumulativeGasUsed: {
        name: "cumulativeGasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      effectiveGasPrice: {
        name: "effectiveGasPrice";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      events: {
        name: "events";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      from: {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      gasUsed: {
        name: "gasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      logs: {
        name: "logs";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      logsBloom: {
        name: "logsBloom";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      revertReason: { name: "revertReason"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      revertReasonDecoded: { name: "revertReasonDecoded"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      root: { name: "root"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      status: {
        name: "status";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "ENUM"; name: "TransactionReceiptStatus"; ofType: null };
        };
      };
      to: { name: "to"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      transactionHash: {
        name: "transactionHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      transactionIndex: {
        name: "transactionIndex";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      type: {
        name: "type";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      userOperationReceipts: {
        name: "userOperationReceipts";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "OBJECT"; name: "UserOperationReceipt"; ofType: null };
          };
        };
      };
    };
  };
  EquityTransferFromInput: {
    kind: "INPUT_OBJECT";
    name: "EquityTransferFromInput";
    isOneOf: false;
    inputFields: [
      {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EquityTransferInput: {
    kind: "INPUT_OBJECT";
    name: "EquityTransferInput";
    isOneOf: false;
    inputFields: [
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EquityTuple0CheckpointsOutput: {
    kind: "OBJECT";
    name: "EquityTuple0CheckpointsOutput";
    fields: {
      _key: { name: "_key"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      _value: { name: "_value"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  EquityUnblockUserInput: {
    kind: "INPUT_OBJECT";
    name: "EquityUnblockUserInput";
    isOneOf: false;
    inputFields: [
      {
        name: "user";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EquityWithdrawTokenInput: {
    kind: "INPUT_OBJECT";
    name: "EquityWithdrawTokenInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "token";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  FixedYield: {
    kind: "OBJECT";
    name: "FixedYield";
    fields: {
      DEFAULT_ADMIN_ROLE: { name: "DEFAULT_ADMIN_ROLE"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      RATE_BASIS_POINTS: { name: "RATE_BASIS_POINTS"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      allPeriods: {
        name: "allPeriods";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
      };
      calculateAccruedYield: { name: "calculateAccruedYield"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      calculateAccruedYield1: {
        name: "calculateAccruedYield1";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
      };
      currentPeriod: { name: "currentPeriod"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      endDate: { name: "endDate"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      getRoleAdmin: { name: "getRoleAdmin"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      hasRole: { name: "hasRole"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      interval: { name: "interval"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      isTrustedForwarder: { name: "isTrustedForwarder"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      lastClaimedPeriod: { name: "lastClaimedPeriod"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      lastClaimedPeriod2: { name: "lastClaimedPeriod2"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      lastCompletedPeriod: { name: "lastCompletedPeriod"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      paused: { name: "paused"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      periodEnd: { name: "periodEnd"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      rate: { name: "rate"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      startDate: { name: "startDate"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      supportsInterface: { name: "supportsInterface"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      timeUntilNextPeriod: { name: "timeUntilNextPeriod"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      token: { name: "token"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      totalUnclaimedYield: { name: "totalUnclaimedYield"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      totalYieldForNextPeriod: {
        name: "totalYieldForNextPeriod";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
      };
      trustedForwarder: { name: "trustedForwarder"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      underlyingAsset: { name: "underlyingAsset"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  FixedYieldFactory: {
    kind: "OBJECT";
    name: "FixedYieldFactory";
    fields: {
      allSchedules: { name: "allSchedules"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      allSchedulesLength: { name: "allSchedulesLength"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      isTrustedForwarder: { name: "isTrustedForwarder"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      trustedForwarder: { name: "trustedForwarder"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  FixedYieldFactoryCreateInput: {
    kind: "INPUT_OBJECT";
    name: "FixedYieldFactoryCreateInput";
    isOneOf: false;
    inputFields: [
      {
        name: "endTime";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "interval";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "rate";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "startTime";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "token";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  FixedYieldFactoryTransactionOutput: {
    kind: "OBJECT";
    name: "FixedYieldFactoryTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  FixedYieldFactoryTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "FixedYieldFactoryTransactionReceiptOutput";
    fields: {
      blobGasPrice: { name: "blobGasPrice"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blobGasUsed: { name: "blobGasUsed"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blockHash: {
        name: "blockHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      blockNumber: {
        name: "blockNumber";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      contractAddress: { name: "contractAddress"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      cumulativeGasUsed: {
        name: "cumulativeGasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      effectiveGasPrice: {
        name: "effectiveGasPrice";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      events: {
        name: "events";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      from: {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      gasUsed: {
        name: "gasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      logs: {
        name: "logs";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      logsBloom: {
        name: "logsBloom";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      revertReason: { name: "revertReason"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      revertReasonDecoded: { name: "revertReasonDecoded"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      root: { name: "root"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      status: {
        name: "status";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "ENUM"; name: "TransactionReceiptStatus"; ofType: null };
        };
      };
      to: { name: "to"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      transactionHash: {
        name: "transactionHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      transactionIndex: {
        name: "transactionIndex";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      type: {
        name: "type";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      userOperationReceipts: {
        name: "userOperationReceipts";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "OBJECT"; name: "UserOperationReceipt"; ofType: null };
          };
        };
      };
    };
  };
  FixedYieldGrantRoleInput: {
    kind: "INPUT_OBJECT";
    name: "FixedYieldGrantRoleInput";
    isOneOf: false;
    inputFields: [
      {
        name: "account";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "role";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  FixedYieldRenounceRoleInput: {
    kind: "INPUT_OBJECT";
    name: "FixedYieldRenounceRoleInput";
    isOneOf: false;
    inputFields: [
      {
        name: "callerConfirmation";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "role";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  FixedYieldRevokeRoleInput: {
    kind: "INPUT_OBJECT";
    name: "FixedYieldRevokeRoleInput";
    isOneOf: false;
    inputFields: [
      {
        name: "account";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "role";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  FixedYieldTopUpUnderlyingAssetInput: {
    kind: "INPUT_OBJECT";
    name: "FixedYieldTopUpUnderlyingAssetInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  FixedYieldTransactionOutput: {
    kind: "OBJECT";
    name: "FixedYieldTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  FixedYieldTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "FixedYieldTransactionReceiptOutput";
    fields: {
      blobGasPrice: { name: "blobGasPrice"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blobGasUsed: { name: "blobGasUsed"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blockHash: {
        name: "blockHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      blockNumber: {
        name: "blockNumber";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      contractAddress: { name: "contractAddress"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      cumulativeGasUsed: {
        name: "cumulativeGasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      effectiveGasPrice: {
        name: "effectiveGasPrice";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      events: {
        name: "events";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      from: {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      gasUsed: {
        name: "gasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      logs: {
        name: "logs";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      logsBloom: {
        name: "logsBloom";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      revertReason: { name: "revertReason"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      revertReasonDecoded: { name: "revertReasonDecoded"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      root: { name: "root"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      status: {
        name: "status";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "ENUM"; name: "TransactionReceiptStatus"; ofType: null };
        };
      };
      to: { name: "to"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      transactionHash: {
        name: "transactionHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      transactionIndex: {
        name: "transactionIndex";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      type: {
        name: "type";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      userOperationReceipts: {
        name: "userOperationReceipts";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "OBJECT"; name: "UserOperationReceipt"; ofType: null };
          };
        };
      };
    };
  };
  FixedYieldWithdrawAllUnderlyingAssetInput: {
    kind: "INPUT_OBJECT";
    name: "FixedYieldWithdrawAllUnderlyingAssetInput";
    isOneOf: false;
    inputFields: [
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  FixedYieldWithdrawUnderlyingAssetInput: {
    kind: "INPUT_OBJECT";
    name: "FixedYieldWithdrawUnderlyingAssetInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  Float: unknown;
  Forwarder: {
    kind: "OBJECT";
    name: "Forwarder";
    fields: {
      eip712Domain: {
        name: "eip712Domain";
        type: { kind: "OBJECT"; name: "ForwarderEip712DomainOutput"; ofType: null };
      };
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      nonces: { name: "nonces"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      verify: { name: "verify"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
    };
  };
  ForwarderEip712DomainOutput: {
    kind: "OBJECT";
    name: "ForwarderEip712DomainOutput";
    fields: {
      chainId: { name: "chainId"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      extensions: {
        name: "extensions";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
      };
      fields: { name: "fields"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      salt: { name: "salt"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      verifyingContract: { name: "verifyingContract"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      version: { name: "version"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  ForwarderExecuteBatchInput: {
    kind: "INPUT_OBJECT";
    name: "ForwarderExecuteBatchInput";
    isOneOf: false;
    inputFields: [
      {
        name: "refundReceiver";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "requests";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: {
              kind: "NON_NULL";
              name: never;
              ofType: { kind: "INPUT_OBJECT"; name: "ForwarderForwarderExecuteBatchRequestsInput"; ofType: null };
            };
          };
        };
        defaultValue: null;
      },
    ];
  };
  ForwarderExecuteInput: {
    kind: "INPUT_OBJECT";
    name: "ForwarderExecuteInput";
    isOneOf: false;
    inputFields: [
      {
        name: "request";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "ForwarderForwarderExecuteRequestInput"; ofType: null };
        };
        defaultValue: null;
      },
    ];
  };
  ForwarderForwarderExecuteBatchRequestsInput: {
    kind: "INPUT_OBJECT";
    name: "ForwarderForwarderExecuteBatchRequestsInput";
    isOneOf: false;
    inputFields: [
      {
        name: "data";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "deadline";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Float"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "gas";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "signature";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  ForwarderForwarderExecuteRequestInput: {
    kind: "INPUT_OBJECT";
    name: "ForwarderForwarderExecuteRequestInput";
    isOneOf: false;
    inputFields: [
      {
        name: "data";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "deadline";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Float"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "gas";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "signature";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  ForwarderTransactionOutput: {
    kind: "OBJECT";
    name: "ForwarderTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  ForwarderTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "ForwarderTransactionReceiptOutput";
    fields: {
      blobGasPrice: { name: "blobGasPrice"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blobGasUsed: { name: "blobGasUsed"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blockHash: {
        name: "blockHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      blockNumber: {
        name: "blockNumber";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      contractAddress: { name: "contractAddress"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      cumulativeGasUsed: {
        name: "cumulativeGasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      effectiveGasPrice: {
        name: "effectiveGasPrice";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      events: {
        name: "events";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      from: {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      gasUsed: {
        name: "gasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      logs: {
        name: "logs";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      logsBloom: {
        name: "logsBloom";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      revertReason: { name: "revertReason"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      revertReasonDecoded: { name: "revertReasonDecoded"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      root: { name: "root"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      status: {
        name: "status";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "ENUM"; name: "TransactionReceiptStatus"; ofType: null };
        };
      };
      to: { name: "to"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      transactionHash: {
        name: "transactionHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      transactionIndex: {
        name: "transactionIndex";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      type: {
        name: "type";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      userOperationReceipts: {
        name: "userOperationReceipts";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "OBJECT"; name: "UserOperationReceipt"; ofType: null };
          };
        };
      };
    };
  };
  ForwarderVerifyRequestInput: {
    kind: "INPUT_OBJECT";
    name: "ForwarderVerifyRequestInput";
    isOneOf: false;
    inputFields: [
      {
        name: "data";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "deadline";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Float"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "gas";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "signature";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  Fund: {
    kind: "OBJECT";
    name: "Fund";
    fields: {
      CLOCK_MODE: { name: "CLOCK_MODE"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      DEFAULT_ADMIN_ROLE: { name: "DEFAULT_ADMIN_ROLE"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      DOMAIN_SEPARATOR: { name: "DOMAIN_SEPARATOR"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      SUPPLY_MANAGEMENT_ROLE: {
        name: "SUPPLY_MANAGEMENT_ROLE";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
      };
      USER_MANAGEMENT_ROLE: { name: "USER_MANAGEMENT_ROLE"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      allowance: { name: "allowance"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      availableBalance: {
        name: "availableBalance";
        type: { kind: "OBJECT"; name: "FundAvailableBalanceOutput"; ofType: null };
      };
      balanceOf: { name: "balanceOf"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      checkpoints: { name: "checkpoints"; type: { kind: "OBJECT"; name: "FundTuple0CheckpointsOutput"; ofType: null } };
      clock: { name: "clock"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      decimals: { name: "decimals"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      delegates: { name: "delegates"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      eip712Domain: { name: "eip712Domain"; type: { kind: "OBJECT"; name: "FundEip712DomainOutput"; ofType: null } };
      frozen: { name: "frozen"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      fundCategory: { name: "fundCategory"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      fundClass: { name: "fundClass"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      getPastTotalSupply: { name: "getPastTotalSupply"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      getPastVotes: { name: "getPastVotes"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      getRoleAdmin: { name: "getRoleAdmin"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      getVotes: { name: "getVotes"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      hasRole: { name: "hasRole"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      isTrustedForwarder: { name: "isTrustedForwarder"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      managementFeeBps: { name: "managementFeeBps"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      nonces: { name: "nonces"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      numCheckpoints: { name: "numCheckpoints"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      paused: { name: "paused"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      supportsInterface: { name: "supportsInterface"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      symbol: { name: "symbol"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      totalSupply: { name: "totalSupply"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      trustedForwarder: { name: "trustedForwarder"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  FundApproveInput: {
    kind: "INPUT_OBJECT";
    name: "FundApproveInput";
    isOneOf: false;
    inputFields: [
      {
        name: "spender";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  FundAvailableBalanceOutput: {
    kind: "OBJECT";
    name: "FundAvailableBalanceOutput";
    fields: { available: { name: "available"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  FundBlockUserInput: {
    kind: "INPUT_OBJECT";
    name: "FundBlockUserInput";
    isOneOf: false;
    inputFields: [
      {
        name: "user";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  FundBlockedInput: {
    kind: "INPUT_OBJECT";
    name: "FundBlockedInput";
    isOneOf: false;
    inputFields: [
      {
        name: "account";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  FundBurnFromInput: {
    kind: "INPUT_OBJECT";
    name: "FundBurnFromInput";
    isOneOf: false;
    inputFields: [
      {
        name: "account";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  FundBurnInput: {
    kind: "INPUT_OBJECT";
    name: "FundBurnInput";
    isOneOf: false;
    inputFields: [
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  FundClawbackInput: {
    kind: "INPUT_OBJECT";
    name: "FundClawbackInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  FundDelegateBySigInput: {
    kind: "INPUT_OBJECT";
    name: "FundDelegateBySigInput";
    isOneOf: false;
    inputFields: [
      {
        name: "delegatee";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "expiry";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "nonce";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "r";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "s";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "v";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  FundDelegateInput: {
    kind: "INPUT_OBJECT";
    name: "FundDelegateInput";
    isOneOf: false;
    inputFields: [
      {
        name: "delegatee";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  FundEip712DomainOutput: {
    kind: "OBJECT";
    name: "FundEip712DomainOutput";
    fields: {
      chainId: { name: "chainId"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      extensions: {
        name: "extensions";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
      };
      fields: { name: "fields"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      salt: { name: "salt"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      verifyingContract: { name: "verifyingContract"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      version: { name: "version"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  FundFactory: {
    kind: "OBJECT";
    name: "FundFactory";
    fields: {
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      isAddressDeployed: { name: "isAddressDeployed"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      isFactoryFund: { name: "isFactoryFund"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      isTrustedForwarder: { name: "isTrustedForwarder"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      predictAddress: {
        name: "predictAddress";
        type: { kind: "OBJECT"; name: "FundFactoryPredictAddressOutput"; ofType: null };
      };
      trustedForwarder: { name: "trustedForwarder"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  FundFactoryCreateInput: {
    kind: "INPUT_OBJECT";
    name: "FundFactoryCreateInput";
    isOneOf: false;
    inputFields: [
      {
        name: "decimals";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "fundCategory";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "fundClass";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "managementFeeBps";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "name";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "symbol";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  FundFactoryPredictAddressOutput: {
    kind: "OBJECT";
    name: "FundFactoryPredictAddressOutput";
    fields: { predicted: { name: "predicted"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  FundFactoryTransactionOutput: {
    kind: "OBJECT";
    name: "FundFactoryTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  FundFactoryTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "FundFactoryTransactionReceiptOutput";
    fields: {
      blobGasPrice: { name: "blobGasPrice"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blobGasUsed: { name: "blobGasUsed"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blockHash: {
        name: "blockHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      blockNumber: {
        name: "blockNumber";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      contractAddress: { name: "contractAddress"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      cumulativeGasUsed: {
        name: "cumulativeGasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      effectiveGasPrice: {
        name: "effectiveGasPrice";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      events: {
        name: "events";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      from: {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      gasUsed: {
        name: "gasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      logs: {
        name: "logs";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      logsBloom: {
        name: "logsBloom";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      revertReason: { name: "revertReason"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      revertReasonDecoded: { name: "revertReasonDecoded"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      root: { name: "root"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      status: {
        name: "status";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "ENUM"; name: "TransactionReceiptStatus"; ofType: null };
        };
      };
      to: { name: "to"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      transactionHash: {
        name: "transactionHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      transactionIndex: {
        name: "transactionIndex";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      type: {
        name: "type";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      userOperationReceipts: {
        name: "userOperationReceipts";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "OBJECT"; name: "UserOperationReceipt"; ofType: null };
          };
        };
      };
    };
  };
  FundFreezeInput: {
    kind: "INPUT_OBJECT";
    name: "FundFreezeInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "user";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  FundGrantRoleInput: {
    kind: "INPUT_OBJECT";
    name: "FundGrantRoleInput";
    isOneOf: false;
    inputFields: [
      {
        name: "account";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "role";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  FundMintInput: {
    kind: "INPUT_OBJECT";
    name: "FundMintInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  FundPermitInput: {
    kind: "INPUT_OBJECT";
    name: "FundPermitInput";
    isOneOf: false;
    inputFields: [
      {
        name: "deadline";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "owner";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "r";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "s";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "spender";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "v";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  FundRenounceRoleInput: {
    kind: "INPUT_OBJECT";
    name: "FundRenounceRoleInput";
    isOneOf: false;
    inputFields: [
      {
        name: "callerConfirmation";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "role";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  FundRevokeRoleInput: {
    kind: "INPUT_OBJECT";
    name: "FundRevokeRoleInput";
    isOneOf: false;
    inputFields: [
      {
        name: "account";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "role";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  FundTransactionOutput: {
    kind: "OBJECT";
    name: "FundTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  FundTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "FundTransactionReceiptOutput";
    fields: {
      blobGasPrice: { name: "blobGasPrice"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blobGasUsed: { name: "blobGasUsed"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blockHash: {
        name: "blockHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      blockNumber: {
        name: "blockNumber";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      contractAddress: { name: "contractAddress"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      cumulativeGasUsed: {
        name: "cumulativeGasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      effectiveGasPrice: {
        name: "effectiveGasPrice";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      events: {
        name: "events";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      from: {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      gasUsed: {
        name: "gasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      logs: {
        name: "logs";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      logsBloom: {
        name: "logsBloom";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      revertReason: { name: "revertReason"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      revertReasonDecoded: { name: "revertReasonDecoded"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      root: { name: "root"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      status: {
        name: "status";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "ENUM"; name: "TransactionReceiptStatus"; ofType: null };
        };
      };
      to: { name: "to"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      transactionHash: {
        name: "transactionHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      transactionIndex: {
        name: "transactionIndex";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      type: {
        name: "type";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      userOperationReceipts: {
        name: "userOperationReceipts";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "OBJECT"; name: "UserOperationReceipt"; ofType: null };
          };
        };
      };
    };
  };
  FundTransferFromInput: {
    kind: "INPUT_OBJECT";
    name: "FundTransferFromInput";
    isOneOf: false;
    inputFields: [
      {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  FundTransferInput: {
    kind: "INPUT_OBJECT";
    name: "FundTransferInput";
    isOneOf: false;
    inputFields: [
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  FundTuple0CheckpointsOutput: {
    kind: "OBJECT";
    name: "FundTuple0CheckpointsOutput";
    fields: {
      _key: { name: "_key"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      _value: { name: "_value"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  FundUnblockUserInput: {
    kind: "INPUT_OBJECT";
    name: "FundUnblockUserInput";
    isOneOf: false;
    inputFields: [
      {
        name: "user";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  FundWithdrawTokenInput: {
    kind: "INPUT_OBJECT";
    name: "FundWithdrawTokenInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "token";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  ID: unknown;
  Int: unknown;
  JSON: unknown;
  Mutation: {
    kind: "OBJECT";
    name: "Mutation";
    fields: {
      BondApprove: { name: "BondApprove"; type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null } };
      BondBlockUser: { name: "BondBlockUser"; type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null } };
      BondBlocked: { name: "BondBlocked"; type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null } };
      BondBurn: { name: "BondBurn"; type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null } };
      BondBurnFrom: { name: "BondBurnFrom"; type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null } };
      BondClawback: { name: "BondClawback"; type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null } };
      BondFactoryCreate: {
        name: "BondFactoryCreate";
        type: { kind: "OBJECT"; name: "BondFactoryTransactionOutput"; ofType: null };
      };
      BondFreeze: { name: "BondFreeze"; type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null } };
      BondGrantRole: { name: "BondGrantRole"; type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null } };
      BondMature: { name: "BondMature"; type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null } };
      BondMint: { name: "BondMint"; type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null } };
      BondPause: { name: "BondPause"; type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null } };
      BondPermit: { name: "BondPermit"; type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null } };
      BondRedeem: { name: "BondRedeem"; type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null } };
      BondRedeemAll: { name: "BondRedeemAll"; type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null } };
      BondRenounceRole: {
        name: "BondRenounceRole";
        type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null };
      };
      BondRevokeRole: { name: "BondRevokeRole"; type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null } };
      BondSetYieldSchedule: {
        name: "BondSetYieldSchedule";
        type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null };
      };
      BondTopUpMissingAmount: {
        name: "BondTopUpMissingAmount";
        type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null };
      };
      BondTopUpUnderlyingAsset: {
        name: "BondTopUpUnderlyingAsset";
        type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null };
      };
      BondTransfer: { name: "BondTransfer"; type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null } };
      BondTransferFrom: {
        name: "BondTransferFrom";
        type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null };
      };
      BondUnblockUser: {
        name: "BondUnblockUser";
        type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null };
      };
      BondUnpause: { name: "BondUnpause"; type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null } };
      BondWithdrawExcessUnderlyingAssets: {
        name: "BondWithdrawExcessUnderlyingAssets";
        type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null };
      };
      BondWithdrawToken: {
        name: "BondWithdrawToken";
        type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null };
      };
      BondWithdrawUnderlyingAsset: {
        name: "BondWithdrawUnderlyingAsset";
        type: { kind: "OBJECT"; name: "BondTransactionOutput"; ofType: null };
      };
      CryptoCurrencyApprove: {
        name: "CryptoCurrencyApprove";
        type: { kind: "OBJECT"; name: "CryptoCurrencyTransactionOutput"; ofType: null };
      };
      CryptoCurrencyFactoryCreate: {
        name: "CryptoCurrencyFactoryCreate";
        type: { kind: "OBJECT"; name: "CryptoCurrencyFactoryTransactionOutput"; ofType: null };
      };
      CryptoCurrencyGrantRole: {
        name: "CryptoCurrencyGrantRole";
        type: { kind: "OBJECT"; name: "CryptoCurrencyTransactionOutput"; ofType: null };
      };
      CryptoCurrencyMint: {
        name: "CryptoCurrencyMint";
        type: { kind: "OBJECT"; name: "CryptoCurrencyTransactionOutput"; ofType: null };
      };
      CryptoCurrencyPermit: {
        name: "CryptoCurrencyPermit";
        type: { kind: "OBJECT"; name: "CryptoCurrencyTransactionOutput"; ofType: null };
      };
      CryptoCurrencyRenounceRole: {
        name: "CryptoCurrencyRenounceRole";
        type: { kind: "OBJECT"; name: "CryptoCurrencyTransactionOutput"; ofType: null };
      };
      CryptoCurrencyRevokeRole: {
        name: "CryptoCurrencyRevokeRole";
        type: { kind: "OBJECT"; name: "CryptoCurrencyTransactionOutput"; ofType: null };
      };
      CryptoCurrencyTransfer: {
        name: "CryptoCurrencyTransfer";
        type: { kind: "OBJECT"; name: "CryptoCurrencyTransactionOutput"; ofType: null };
      };
      CryptoCurrencyTransferFrom: {
        name: "CryptoCurrencyTransferFrom";
        type: { kind: "OBJECT"; name: "CryptoCurrencyTransactionOutput"; ofType: null };
      };
      CryptoCurrencyWithdrawToken: {
        name: "CryptoCurrencyWithdrawToken";
        type: { kind: "OBJECT"; name: "CryptoCurrencyTransactionOutput"; ofType: null };
      };
      DeployContract: {
        name: "DeployContract";
        type: { kind: "OBJECT"; name: "ContractDeploymentTransactionOutput"; ofType: null };
      };
      DeployContractBond: {
        name: "DeployContractBond";
        type: { kind: "OBJECT"; name: "ContractDeploymentTransactionOutput"; ofType: null };
      };
      DeployContractBondFactory: {
        name: "DeployContractBondFactory";
        type: { kind: "OBJECT"; name: "ContractDeploymentTransactionOutput"; ofType: null };
      };
      DeployContractCryptoCurrency: {
        name: "DeployContractCryptoCurrency";
        type: { kind: "OBJECT"; name: "ContractDeploymentTransactionOutput"; ofType: null };
      };
      DeployContractCryptoCurrencyFactory: {
        name: "DeployContractCryptoCurrencyFactory";
        type: { kind: "OBJECT"; name: "ContractDeploymentTransactionOutput"; ofType: null };
      };
      DeployContractDeposit: {
        name: "DeployContractDeposit";
        type: { kind: "OBJECT"; name: "ContractDeploymentTransactionOutput"; ofType: null };
      };
      DeployContractDepositFactory: {
        name: "DeployContractDepositFactory";
        type: { kind: "OBJECT"; name: "ContractDeploymentTransactionOutput"; ofType: null };
      };
      DeployContractEquity: {
        name: "DeployContractEquity";
        type: { kind: "OBJECT"; name: "ContractDeploymentTransactionOutput"; ofType: null };
      };
      DeployContractEquityFactory: {
        name: "DeployContractEquityFactory";
        type: { kind: "OBJECT"; name: "ContractDeploymentTransactionOutput"; ofType: null };
      };
      DeployContractFixedYield: {
        name: "DeployContractFixedYield";
        type: { kind: "OBJECT"; name: "ContractDeploymentTransactionOutput"; ofType: null };
      };
      DeployContractFixedYieldFactory: {
        name: "DeployContractFixedYieldFactory";
        type: { kind: "OBJECT"; name: "ContractDeploymentTransactionOutput"; ofType: null };
      };
      DeployContractForwarder: {
        name: "DeployContractForwarder";
        type: { kind: "OBJECT"; name: "ContractDeploymentTransactionOutput"; ofType: null };
      };
      DeployContractFund: {
        name: "DeployContractFund";
        type: { kind: "OBJECT"; name: "ContractDeploymentTransactionOutput"; ofType: null };
      };
      DeployContractFundFactory: {
        name: "DeployContractFundFactory";
        type: { kind: "OBJECT"; name: "ContractDeploymentTransactionOutput"; ofType: null };
      };
      DeployContractStableCoin: {
        name: "DeployContractStableCoin";
        type: { kind: "OBJECT"; name: "ContractDeploymentTransactionOutput"; ofType: null };
      };
      DeployContractStableCoinFactory: {
        name: "DeployContractStableCoinFactory";
        type: { kind: "OBJECT"; name: "ContractDeploymentTransactionOutput"; ofType: null };
      };
      DepositAllowUser: {
        name: "DepositAllowUser";
        type: { kind: "OBJECT"; name: "DepositTransactionOutput"; ofType: null };
      };
      DepositAllowed: {
        name: "DepositAllowed";
        type: { kind: "OBJECT"; name: "DepositTransactionOutput"; ofType: null };
      };
      DepositApprove: {
        name: "DepositApprove";
        type: { kind: "OBJECT"; name: "DepositTransactionOutput"; ofType: null };
      };
      DepositBurn: { name: "DepositBurn"; type: { kind: "OBJECT"; name: "DepositTransactionOutput"; ofType: null } };
      DepositBurnFrom: {
        name: "DepositBurnFrom";
        type: { kind: "OBJECT"; name: "DepositTransactionOutput"; ofType: null };
      };
      DepositClawback: {
        name: "DepositClawback";
        type: { kind: "OBJECT"; name: "DepositTransactionOutput"; ofType: null };
      };
      DepositDisallowUser: {
        name: "DepositDisallowUser";
        type: { kind: "OBJECT"; name: "DepositTransactionOutput"; ofType: null };
      };
      DepositFactoryCreate: {
        name: "DepositFactoryCreate";
        type: { kind: "OBJECT"; name: "DepositFactoryTransactionOutput"; ofType: null };
      };
      DepositFreeze: {
        name: "DepositFreeze";
        type: { kind: "OBJECT"; name: "DepositTransactionOutput"; ofType: null };
      };
      DepositGrantRole: {
        name: "DepositGrantRole";
        type: { kind: "OBJECT"; name: "DepositTransactionOutput"; ofType: null };
      };
      DepositMint: { name: "DepositMint"; type: { kind: "OBJECT"; name: "DepositTransactionOutput"; ofType: null } };
      DepositPause: { name: "DepositPause"; type: { kind: "OBJECT"; name: "DepositTransactionOutput"; ofType: null } };
      DepositPermit: {
        name: "DepositPermit";
        type: { kind: "OBJECT"; name: "DepositTransactionOutput"; ofType: null };
      };
      DepositRenounceRole: {
        name: "DepositRenounceRole";
        type: { kind: "OBJECT"; name: "DepositTransactionOutput"; ofType: null };
      };
      DepositRevokeRole: {
        name: "DepositRevokeRole";
        type: { kind: "OBJECT"; name: "DepositTransactionOutput"; ofType: null };
      };
      DepositTransfer: {
        name: "DepositTransfer";
        type: { kind: "OBJECT"; name: "DepositTransactionOutput"; ofType: null };
      };
      DepositTransferFrom: {
        name: "DepositTransferFrom";
        type: { kind: "OBJECT"; name: "DepositTransactionOutput"; ofType: null };
      };
      DepositUnpause: {
        name: "DepositUnpause";
        type: { kind: "OBJECT"; name: "DepositTransactionOutput"; ofType: null };
      };
      DepositUpdateCollateral: {
        name: "DepositUpdateCollateral";
        type: { kind: "OBJECT"; name: "DepositTransactionOutput"; ofType: null };
      };
      DepositWithdrawToken: {
        name: "DepositWithdrawToken";
        type: { kind: "OBJECT"; name: "DepositTransactionOutput"; ofType: null };
      };
      EquityApprove: { name: "EquityApprove"; type: { kind: "OBJECT"; name: "EquityTransactionOutput"; ofType: null } };
      EquityBlockUser: {
        name: "EquityBlockUser";
        type: { kind: "OBJECT"; name: "EquityTransactionOutput"; ofType: null };
      };
      EquityBlocked: { name: "EquityBlocked"; type: { kind: "OBJECT"; name: "EquityTransactionOutput"; ofType: null } };
      EquityBurn: { name: "EquityBurn"; type: { kind: "OBJECT"; name: "EquityTransactionOutput"; ofType: null } };
      EquityBurnFrom: {
        name: "EquityBurnFrom";
        type: { kind: "OBJECT"; name: "EquityTransactionOutput"; ofType: null };
      };
      EquityClawback: {
        name: "EquityClawback";
        type: { kind: "OBJECT"; name: "EquityTransactionOutput"; ofType: null };
      };
      EquityDelegate: {
        name: "EquityDelegate";
        type: { kind: "OBJECT"; name: "EquityTransactionOutput"; ofType: null };
      };
      EquityDelegateBySig: {
        name: "EquityDelegateBySig";
        type: { kind: "OBJECT"; name: "EquityTransactionOutput"; ofType: null };
      };
      EquityFactoryCreate: {
        name: "EquityFactoryCreate";
        type: { kind: "OBJECT"; name: "EquityFactoryTransactionOutput"; ofType: null };
      };
      EquityFreeze: { name: "EquityFreeze"; type: { kind: "OBJECT"; name: "EquityTransactionOutput"; ofType: null } };
      EquityGrantRole: {
        name: "EquityGrantRole";
        type: { kind: "OBJECT"; name: "EquityTransactionOutput"; ofType: null };
      };
      EquityMint: { name: "EquityMint"; type: { kind: "OBJECT"; name: "EquityTransactionOutput"; ofType: null } };
      EquityPause: { name: "EquityPause"; type: { kind: "OBJECT"; name: "EquityTransactionOutput"; ofType: null } };
      EquityPermit: { name: "EquityPermit"; type: { kind: "OBJECT"; name: "EquityTransactionOutput"; ofType: null } };
      EquityRenounceRole: {
        name: "EquityRenounceRole";
        type: { kind: "OBJECT"; name: "EquityTransactionOutput"; ofType: null };
      };
      EquityRevokeRole: {
        name: "EquityRevokeRole";
        type: { kind: "OBJECT"; name: "EquityTransactionOutput"; ofType: null };
      };
      EquityTransfer: {
        name: "EquityTransfer";
        type: { kind: "OBJECT"; name: "EquityTransactionOutput"; ofType: null };
      };
      EquityTransferFrom: {
        name: "EquityTransferFrom";
        type: { kind: "OBJECT"; name: "EquityTransactionOutput"; ofType: null };
      };
      EquityUnblockUser: {
        name: "EquityUnblockUser";
        type: { kind: "OBJECT"; name: "EquityTransactionOutput"; ofType: null };
      };
      EquityUnpause: { name: "EquityUnpause"; type: { kind: "OBJECT"; name: "EquityTransactionOutput"; ofType: null } };
      EquityWithdrawToken: {
        name: "EquityWithdrawToken";
        type: { kind: "OBJECT"; name: "EquityTransactionOutput"; ofType: null };
      };
      FixedYieldClaimYield: {
        name: "FixedYieldClaimYield";
        type: { kind: "OBJECT"; name: "FixedYieldTransactionOutput"; ofType: null };
      };
      FixedYieldFactoryCreate: {
        name: "FixedYieldFactoryCreate";
        type: { kind: "OBJECT"; name: "FixedYieldFactoryTransactionOutput"; ofType: null };
      };
      FixedYieldGrantRole: {
        name: "FixedYieldGrantRole";
        type: { kind: "OBJECT"; name: "FixedYieldTransactionOutput"; ofType: null };
      };
      FixedYieldPause: {
        name: "FixedYieldPause";
        type: { kind: "OBJECT"; name: "FixedYieldTransactionOutput"; ofType: null };
      };
      FixedYieldRenounceRole: {
        name: "FixedYieldRenounceRole";
        type: { kind: "OBJECT"; name: "FixedYieldTransactionOutput"; ofType: null };
      };
      FixedYieldRevokeRole: {
        name: "FixedYieldRevokeRole";
        type: { kind: "OBJECT"; name: "FixedYieldTransactionOutput"; ofType: null };
      };
      FixedYieldTopUpUnderlyingAsset: {
        name: "FixedYieldTopUpUnderlyingAsset";
        type: { kind: "OBJECT"; name: "FixedYieldTransactionOutput"; ofType: null };
      };
      FixedYieldUnpause: {
        name: "FixedYieldUnpause";
        type: { kind: "OBJECT"; name: "FixedYieldTransactionOutput"; ofType: null };
      };
      FixedYieldWithdrawAllUnderlyingAsset: {
        name: "FixedYieldWithdrawAllUnderlyingAsset";
        type: { kind: "OBJECT"; name: "FixedYieldTransactionOutput"; ofType: null };
      };
      FixedYieldWithdrawUnderlyingAsset: {
        name: "FixedYieldWithdrawUnderlyingAsset";
        type: { kind: "OBJECT"; name: "FixedYieldTransactionOutput"; ofType: null };
      };
      ForwarderExecute: {
        name: "ForwarderExecute";
        type: { kind: "OBJECT"; name: "ForwarderTransactionOutput"; ofType: null };
      };
      ForwarderExecuteBatch: {
        name: "ForwarderExecuteBatch";
        type: { kind: "OBJECT"; name: "ForwarderTransactionOutput"; ofType: null };
      };
      FundApprove: { name: "FundApprove"; type: { kind: "OBJECT"; name: "FundTransactionOutput"; ofType: null } };
      FundBlockUser: { name: "FundBlockUser"; type: { kind: "OBJECT"; name: "FundTransactionOutput"; ofType: null } };
      FundBlocked: { name: "FundBlocked"; type: { kind: "OBJECT"; name: "FundTransactionOutput"; ofType: null } };
      FundBurn: { name: "FundBurn"; type: { kind: "OBJECT"; name: "FundTransactionOutput"; ofType: null } };
      FundBurnFrom: { name: "FundBurnFrom"; type: { kind: "OBJECT"; name: "FundTransactionOutput"; ofType: null } };
      FundClawback: { name: "FundClawback"; type: { kind: "OBJECT"; name: "FundTransactionOutput"; ofType: null } };
      FundCollectManagementFee: {
        name: "FundCollectManagementFee";
        type: { kind: "OBJECT"; name: "FundTransactionOutput"; ofType: null };
      };
      FundDelegate: { name: "FundDelegate"; type: { kind: "OBJECT"; name: "FundTransactionOutput"; ofType: null } };
      FundDelegateBySig: {
        name: "FundDelegateBySig";
        type: { kind: "OBJECT"; name: "FundTransactionOutput"; ofType: null };
      };
      FundFactoryCreate: {
        name: "FundFactoryCreate";
        type: { kind: "OBJECT"; name: "FundFactoryTransactionOutput"; ofType: null };
      };
      FundFreeze: { name: "FundFreeze"; type: { kind: "OBJECT"; name: "FundTransactionOutput"; ofType: null } };
      FundGrantRole: { name: "FundGrantRole"; type: { kind: "OBJECT"; name: "FundTransactionOutput"; ofType: null } };
      FundMint: { name: "FundMint"; type: { kind: "OBJECT"; name: "FundTransactionOutput"; ofType: null } };
      FundPause: { name: "FundPause"; type: { kind: "OBJECT"; name: "FundTransactionOutput"; ofType: null } };
      FundPermit: { name: "FundPermit"; type: { kind: "OBJECT"; name: "FundTransactionOutput"; ofType: null } };
      FundRenounceRole: {
        name: "FundRenounceRole";
        type: { kind: "OBJECT"; name: "FundTransactionOutput"; ofType: null };
      };
      FundRevokeRole: { name: "FundRevokeRole"; type: { kind: "OBJECT"; name: "FundTransactionOutput"; ofType: null } };
      FundTransfer: { name: "FundTransfer"; type: { kind: "OBJECT"; name: "FundTransactionOutput"; ofType: null } };
      FundTransferFrom: {
        name: "FundTransferFrom";
        type: { kind: "OBJECT"; name: "FundTransactionOutput"; ofType: null };
      };
      FundUnblockUser: {
        name: "FundUnblockUser";
        type: { kind: "OBJECT"; name: "FundTransactionOutput"; ofType: null };
      };
      FundUnpause: { name: "FundUnpause"; type: { kind: "OBJECT"; name: "FundTransactionOutput"; ofType: null } };
      FundWithdrawToken: {
        name: "FundWithdrawToken";
        type: { kind: "OBJECT"; name: "FundTransactionOutput"; ofType: null };
      };
      StableCoinApprove: {
        name: "StableCoinApprove";
        type: { kind: "OBJECT"; name: "StableCoinTransactionOutput"; ofType: null };
      };
      StableCoinBlockUser: {
        name: "StableCoinBlockUser";
        type: { kind: "OBJECT"; name: "StableCoinTransactionOutput"; ofType: null };
      };
      StableCoinBlocked: {
        name: "StableCoinBlocked";
        type: { kind: "OBJECT"; name: "StableCoinTransactionOutput"; ofType: null };
      };
      StableCoinBurn: {
        name: "StableCoinBurn";
        type: { kind: "OBJECT"; name: "StableCoinTransactionOutput"; ofType: null };
      };
      StableCoinBurnFrom: {
        name: "StableCoinBurnFrom";
        type: { kind: "OBJECT"; name: "StableCoinTransactionOutput"; ofType: null };
      };
      StableCoinClawback: {
        name: "StableCoinClawback";
        type: { kind: "OBJECT"; name: "StableCoinTransactionOutput"; ofType: null };
      };
      StableCoinFactoryCreate: {
        name: "StableCoinFactoryCreate";
        type: { kind: "OBJECT"; name: "StableCoinFactoryTransactionOutput"; ofType: null };
      };
      StableCoinFreeze: {
        name: "StableCoinFreeze";
        type: { kind: "OBJECT"; name: "StableCoinTransactionOutput"; ofType: null };
      };
      StableCoinGrantRole: {
        name: "StableCoinGrantRole";
        type: { kind: "OBJECT"; name: "StableCoinTransactionOutput"; ofType: null };
      };
      StableCoinMint: {
        name: "StableCoinMint";
        type: { kind: "OBJECT"; name: "StableCoinTransactionOutput"; ofType: null };
      };
      StableCoinPause: {
        name: "StableCoinPause";
        type: { kind: "OBJECT"; name: "StableCoinTransactionOutput"; ofType: null };
      };
      StableCoinPermit: {
        name: "StableCoinPermit";
        type: { kind: "OBJECT"; name: "StableCoinTransactionOutput"; ofType: null };
      };
      StableCoinRenounceRole: {
        name: "StableCoinRenounceRole";
        type: { kind: "OBJECT"; name: "StableCoinTransactionOutput"; ofType: null };
      };
      StableCoinRevokeRole: {
        name: "StableCoinRevokeRole";
        type: { kind: "OBJECT"; name: "StableCoinTransactionOutput"; ofType: null };
      };
      StableCoinTransfer: {
        name: "StableCoinTransfer";
        type: { kind: "OBJECT"; name: "StableCoinTransactionOutput"; ofType: null };
      };
      StableCoinTransferFrom: {
        name: "StableCoinTransferFrom";
        type: { kind: "OBJECT"; name: "StableCoinTransactionOutput"; ofType: null };
      };
      StableCoinUnblockUser: {
        name: "StableCoinUnblockUser";
        type: { kind: "OBJECT"; name: "StableCoinTransactionOutput"; ofType: null };
      };
      StableCoinUnpause: {
        name: "StableCoinUnpause";
        type: { kind: "OBJECT"; name: "StableCoinTransactionOutput"; ofType: null };
      };
      StableCoinUpdateCollateral: {
        name: "StableCoinUpdateCollateral";
        type: { kind: "OBJECT"; name: "StableCoinTransactionOutput"; ofType: null };
      };
      StableCoinWithdrawToken: {
        name: "StableCoinWithdrawToken";
        type: { kind: "OBJECT"; name: "StableCoinTransactionOutput"; ofType: null };
      };
      createWallet: { name: "createWallet"; type: { kind: "OBJECT"; name: "CreateWalletOutput"; ofType: null } };
      createWalletVerification: {
        name: "createWalletVerification";
        type: { kind: "OBJECT"; name: "CreateWalletVerificationOutput"; ofType: null };
      };
      createWalletVerificationChallenges: {
        name: "createWalletVerificationChallenges";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "OBJECT"; name: "WalletVerificationChallenge"; ofType: null };
          };
        };
      };
      deleteWalletVerification: {
        name: "deleteWalletVerification";
        type: { kind: "OBJECT"; name: "DeleteWalletVerificationOutput"; ofType: null };
      };
      verifyWalletVerificationChallenge: {
        name: "verifyWalletVerificationChallenge";
        type: { kind: "OBJECT"; name: "VerifyWalletVerificationChallengeOutput"; ofType: null };
      };
    };
  };
  OTPAlgorithm: {
    name: "OTPAlgorithm";
    enumValues: "SHA1" | "SHA3_224" | "SHA3_256" | "SHA3_384" | "SHA3_512" | "SHA224" | "SHA256" | "SHA384" | "SHA512";
  };
  OTPSettingsInput: {
    kind: "INPUT_OBJECT";
    name: "OTPSettingsInput";
    isOneOf: false;
    inputFields: [
      { name: "algorithm"; type: { kind: "ENUM"; name: "OTPAlgorithm"; ofType: null }; defaultValue: null },
      { name: "digits"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
      { name: "issuer"; type: { kind: "SCALAR"; name: "String"; ofType: null }; defaultValue: null },
      {
        name: "name";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      { name: "period"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
    ];
  };
  PincodeSettingsInput: {
    kind: "INPUT_OBJECT";
    name: "PincodeSettingsInput";
    isOneOf: false;
    inputFields: [
      {
        name: "name";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "pincode";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  Query: {
    kind: "OBJECT";
    name: "Query";
    fields: {
      Bond: { name: "Bond"; type: { kind: "OBJECT"; name: "Bond"; ofType: null } };
      BondApproveReceipt: {
        name: "BondApproveReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      BondBlockUserReceipt: {
        name: "BondBlockUserReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      BondBlockedReceipt: {
        name: "BondBlockedReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      BondBurnFromReceipt: {
        name: "BondBurnFromReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      BondBurnReceipt: {
        name: "BondBurnReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      BondClawbackReceipt: {
        name: "BondClawbackReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      BondFactory: { name: "BondFactory"; type: { kind: "OBJECT"; name: "BondFactory"; ofType: null } };
      BondFactoryCreateReceipt: {
        name: "BondFactoryCreateReceipt";
        type: { kind: "OBJECT"; name: "BondFactoryTransactionReceiptOutput"; ofType: null };
      };
      BondFreezeReceipt: {
        name: "BondFreezeReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      BondGrantRoleReceipt: {
        name: "BondGrantRoleReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      BondMatureReceipt: {
        name: "BondMatureReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      BondMintReceipt: {
        name: "BondMintReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      BondPauseReceipt: {
        name: "BondPauseReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      BondPermitReceipt: {
        name: "BondPermitReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      BondRedeemAllReceipt: {
        name: "BondRedeemAllReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      BondRedeemReceipt: {
        name: "BondRedeemReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      BondRenounceRoleReceipt: {
        name: "BondRenounceRoleReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      BondRevokeRoleReceipt: {
        name: "BondRevokeRoleReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      BondSetYieldScheduleReceipt: {
        name: "BondSetYieldScheduleReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      BondTopUpMissingAmountReceipt: {
        name: "BondTopUpMissingAmountReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      BondTopUpUnderlyingAssetReceipt: {
        name: "BondTopUpUnderlyingAssetReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      BondTransferFromReceipt: {
        name: "BondTransferFromReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      BondTransferReceipt: {
        name: "BondTransferReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      BondUnblockUserReceipt: {
        name: "BondUnblockUserReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      BondUnpauseReceipt: {
        name: "BondUnpauseReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      BondWithdrawExcessUnderlyingAssetsReceipt: {
        name: "BondWithdrawExcessUnderlyingAssetsReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      BondWithdrawTokenReceipt: {
        name: "BondWithdrawTokenReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      BondWithdrawUnderlyingAssetReceipt: {
        name: "BondWithdrawUnderlyingAssetReceipt";
        type: { kind: "OBJECT"; name: "BondTransactionReceiptOutput"; ofType: null };
      };
      CryptoCurrency: { name: "CryptoCurrency"; type: { kind: "OBJECT"; name: "CryptoCurrency"; ofType: null } };
      CryptoCurrencyApproveReceipt: {
        name: "CryptoCurrencyApproveReceipt";
        type: { kind: "OBJECT"; name: "CryptoCurrencyTransactionReceiptOutput"; ofType: null };
      };
      CryptoCurrencyFactory: {
        name: "CryptoCurrencyFactory";
        type: { kind: "OBJECT"; name: "CryptoCurrencyFactory"; ofType: null };
      };
      CryptoCurrencyFactoryCreateReceipt: {
        name: "CryptoCurrencyFactoryCreateReceipt";
        type: { kind: "OBJECT"; name: "CryptoCurrencyFactoryTransactionReceiptOutput"; ofType: null };
      };
      CryptoCurrencyGrantRoleReceipt: {
        name: "CryptoCurrencyGrantRoleReceipt";
        type: { kind: "OBJECT"; name: "CryptoCurrencyTransactionReceiptOutput"; ofType: null };
      };
      CryptoCurrencyMintReceipt: {
        name: "CryptoCurrencyMintReceipt";
        type: { kind: "OBJECT"; name: "CryptoCurrencyTransactionReceiptOutput"; ofType: null };
      };
      CryptoCurrencyPermitReceipt: {
        name: "CryptoCurrencyPermitReceipt";
        type: { kind: "OBJECT"; name: "CryptoCurrencyTransactionReceiptOutput"; ofType: null };
      };
      CryptoCurrencyRenounceRoleReceipt: {
        name: "CryptoCurrencyRenounceRoleReceipt";
        type: { kind: "OBJECT"; name: "CryptoCurrencyTransactionReceiptOutput"; ofType: null };
      };
      CryptoCurrencyRevokeRoleReceipt: {
        name: "CryptoCurrencyRevokeRoleReceipt";
        type: { kind: "OBJECT"; name: "CryptoCurrencyTransactionReceiptOutput"; ofType: null };
      };
      CryptoCurrencyTransferFromReceipt: {
        name: "CryptoCurrencyTransferFromReceipt";
        type: { kind: "OBJECT"; name: "CryptoCurrencyTransactionReceiptOutput"; ofType: null };
      };
      CryptoCurrencyTransferReceipt: {
        name: "CryptoCurrencyTransferReceipt";
        type: { kind: "OBJECT"; name: "CryptoCurrencyTransactionReceiptOutput"; ofType: null };
      };
      CryptoCurrencyWithdrawTokenReceipt: {
        name: "CryptoCurrencyWithdrawTokenReceipt";
        type: { kind: "OBJECT"; name: "CryptoCurrencyTransactionReceiptOutput"; ofType: null };
      };
      Deposit: { name: "Deposit"; type: { kind: "OBJECT"; name: "Deposit"; ofType: null } };
      DepositAllowUserReceipt: {
        name: "DepositAllowUserReceipt";
        type: { kind: "OBJECT"; name: "DepositTransactionReceiptOutput"; ofType: null };
      };
      DepositAllowedReceipt: {
        name: "DepositAllowedReceipt";
        type: { kind: "OBJECT"; name: "DepositTransactionReceiptOutput"; ofType: null };
      };
      DepositApproveReceipt: {
        name: "DepositApproveReceipt";
        type: { kind: "OBJECT"; name: "DepositTransactionReceiptOutput"; ofType: null };
      };
      DepositBurnFromReceipt: {
        name: "DepositBurnFromReceipt";
        type: { kind: "OBJECT"; name: "DepositTransactionReceiptOutput"; ofType: null };
      };
      DepositBurnReceipt: {
        name: "DepositBurnReceipt";
        type: { kind: "OBJECT"; name: "DepositTransactionReceiptOutput"; ofType: null };
      };
      DepositClawbackReceipt: {
        name: "DepositClawbackReceipt";
        type: { kind: "OBJECT"; name: "DepositTransactionReceiptOutput"; ofType: null };
      };
      DepositDisallowUserReceipt: {
        name: "DepositDisallowUserReceipt";
        type: { kind: "OBJECT"; name: "DepositTransactionReceiptOutput"; ofType: null };
      };
      DepositFactory: { name: "DepositFactory"; type: { kind: "OBJECT"; name: "DepositFactory"; ofType: null } };
      DepositFactoryCreateReceipt: {
        name: "DepositFactoryCreateReceipt";
        type: { kind: "OBJECT"; name: "DepositFactoryTransactionReceiptOutput"; ofType: null };
      };
      DepositFreezeReceipt: {
        name: "DepositFreezeReceipt";
        type: { kind: "OBJECT"; name: "DepositTransactionReceiptOutput"; ofType: null };
      };
      DepositGrantRoleReceipt: {
        name: "DepositGrantRoleReceipt";
        type: { kind: "OBJECT"; name: "DepositTransactionReceiptOutput"; ofType: null };
      };
      DepositMintReceipt: {
        name: "DepositMintReceipt";
        type: { kind: "OBJECT"; name: "DepositTransactionReceiptOutput"; ofType: null };
      };
      DepositPauseReceipt: {
        name: "DepositPauseReceipt";
        type: { kind: "OBJECT"; name: "DepositTransactionReceiptOutput"; ofType: null };
      };
      DepositPermitReceipt: {
        name: "DepositPermitReceipt";
        type: { kind: "OBJECT"; name: "DepositTransactionReceiptOutput"; ofType: null };
      };
      DepositRenounceRoleReceipt: {
        name: "DepositRenounceRoleReceipt";
        type: { kind: "OBJECT"; name: "DepositTransactionReceiptOutput"; ofType: null };
      };
      DepositRevokeRoleReceipt: {
        name: "DepositRevokeRoleReceipt";
        type: { kind: "OBJECT"; name: "DepositTransactionReceiptOutput"; ofType: null };
      };
      DepositTransferFromReceipt: {
        name: "DepositTransferFromReceipt";
        type: { kind: "OBJECT"; name: "DepositTransactionReceiptOutput"; ofType: null };
      };
      DepositTransferReceipt: {
        name: "DepositTransferReceipt";
        type: { kind: "OBJECT"; name: "DepositTransactionReceiptOutput"; ofType: null };
      };
      DepositUnpauseReceipt: {
        name: "DepositUnpauseReceipt";
        type: { kind: "OBJECT"; name: "DepositTransactionReceiptOutput"; ofType: null };
      };
      DepositUpdateCollateralReceipt: {
        name: "DepositUpdateCollateralReceipt";
        type: { kind: "OBJECT"; name: "DepositTransactionReceiptOutput"; ofType: null };
      };
      DepositWithdrawTokenReceipt: {
        name: "DepositWithdrawTokenReceipt";
        type: { kind: "OBJECT"; name: "DepositTransactionReceiptOutput"; ofType: null };
      };
      Equity: { name: "Equity"; type: { kind: "OBJECT"; name: "Equity"; ofType: null } };
      EquityApproveReceipt: {
        name: "EquityApproveReceipt";
        type: { kind: "OBJECT"; name: "EquityTransactionReceiptOutput"; ofType: null };
      };
      EquityBlockUserReceipt: {
        name: "EquityBlockUserReceipt";
        type: { kind: "OBJECT"; name: "EquityTransactionReceiptOutput"; ofType: null };
      };
      EquityBlockedReceipt: {
        name: "EquityBlockedReceipt";
        type: { kind: "OBJECT"; name: "EquityTransactionReceiptOutput"; ofType: null };
      };
      EquityBurnFromReceipt: {
        name: "EquityBurnFromReceipt";
        type: { kind: "OBJECT"; name: "EquityTransactionReceiptOutput"; ofType: null };
      };
      EquityBurnReceipt: {
        name: "EquityBurnReceipt";
        type: { kind: "OBJECT"; name: "EquityTransactionReceiptOutput"; ofType: null };
      };
      EquityClawbackReceipt: {
        name: "EquityClawbackReceipt";
        type: { kind: "OBJECT"; name: "EquityTransactionReceiptOutput"; ofType: null };
      };
      EquityDelegateBySigReceipt: {
        name: "EquityDelegateBySigReceipt";
        type: { kind: "OBJECT"; name: "EquityTransactionReceiptOutput"; ofType: null };
      };
      EquityDelegateReceipt: {
        name: "EquityDelegateReceipt";
        type: { kind: "OBJECT"; name: "EquityTransactionReceiptOutput"; ofType: null };
      };
      EquityFactory: { name: "EquityFactory"; type: { kind: "OBJECT"; name: "EquityFactory"; ofType: null } };
      EquityFactoryCreateReceipt: {
        name: "EquityFactoryCreateReceipt";
        type: { kind: "OBJECT"; name: "EquityFactoryTransactionReceiptOutput"; ofType: null };
      };
      EquityFreezeReceipt: {
        name: "EquityFreezeReceipt";
        type: { kind: "OBJECT"; name: "EquityTransactionReceiptOutput"; ofType: null };
      };
      EquityGrantRoleReceipt: {
        name: "EquityGrantRoleReceipt";
        type: { kind: "OBJECT"; name: "EquityTransactionReceiptOutput"; ofType: null };
      };
      EquityMintReceipt: {
        name: "EquityMintReceipt";
        type: { kind: "OBJECT"; name: "EquityTransactionReceiptOutput"; ofType: null };
      };
      EquityPauseReceipt: {
        name: "EquityPauseReceipt";
        type: { kind: "OBJECT"; name: "EquityTransactionReceiptOutput"; ofType: null };
      };
      EquityPermitReceipt: {
        name: "EquityPermitReceipt";
        type: { kind: "OBJECT"; name: "EquityTransactionReceiptOutput"; ofType: null };
      };
      EquityRenounceRoleReceipt: {
        name: "EquityRenounceRoleReceipt";
        type: { kind: "OBJECT"; name: "EquityTransactionReceiptOutput"; ofType: null };
      };
      EquityRevokeRoleReceipt: {
        name: "EquityRevokeRoleReceipt";
        type: { kind: "OBJECT"; name: "EquityTransactionReceiptOutput"; ofType: null };
      };
      EquityTransferFromReceipt: {
        name: "EquityTransferFromReceipt";
        type: { kind: "OBJECT"; name: "EquityTransactionReceiptOutput"; ofType: null };
      };
      EquityTransferReceipt: {
        name: "EquityTransferReceipt";
        type: { kind: "OBJECT"; name: "EquityTransactionReceiptOutput"; ofType: null };
      };
      EquityUnblockUserReceipt: {
        name: "EquityUnblockUserReceipt";
        type: { kind: "OBJECT"; name: "EquityTransactionReceiptOutput"; ofType: null };
      };
      EquityUnpauseReceipt: {
        name: "EquityUnpauseReceipt";
        type: { kind: "OBJECT"; name: "EquityTransactionReceiptOutput"; ofType: null };
      };
      EquityWithdrawTokenReceipt: {
        name: "EquityWithdrawTokenReceipt";
        type: { kind: "OBJECT"; name: "EquityTransactionReceiptOutput"; ofType: null };
      };
      FixedYield: { name: "FixedYield"; type: { kind: "OBJECT"; name: "FixedYield"; ofType: null } };
      FixedYieldClaimYieldReceipt: {
        name: "FixedYieldClaimYieldReceipt";
        type: { kind: "OBJECT"; name: "FixedYieldTransactionReceiptOutput"; ofType: null };
      };
      FixedYieldFactory: {
        name: "FixedYieldFactory";
        type: { kind: "OBJECT"; name: "FixedYieldFactory"; ofType: null };
      };
      FixedYieldFactoryCreateReceipt: {
        name: "FixedYieldFactoryCreateReceipt";
        type: { kind: "OBJECT"; name: "FixedYieldFactoryTransactionReceiptOutput"; ofType: null };
      };
      FixedYieldGrantRoleReceipt: {
        name: "FixedYieldGrantRoleReceipt";
        type: { kind: "OBJECT"; name: "FixedYieldTransactionReceiptOutput"; ofType: null };
      };
      FixedYieldPauseReceipt: {
        name: "FixedYieldPauseReceipt";
        type: { kind: "OBJECT"; name: "FixedYieldTransactionReceiptOutput"; ofType: null };
      };
      FixedYieldRenounceRoleReceipt: {
        name: "FixedYieldRenounceRoleReceipt";
        type: { kind: "OBJECT"; name: "FixedYieldTransactionReceiptOutput"; ofType: null };
      };
      FixedYieldRevokeRoleReceipt: {
        name: "FixedYieldRevokeRoleReceipt";
        type: { kind: "OBJECT"; name: "FixedYieldTransactionReceiptOutput"; ofType: null };
      };
      FixedYieldTopUpUnderlyingAssetReceipt: {
        name: "FixedYieldTopUpUnderlyingAssetReceipt";
        type: { kind: "OBJECT"; name: "FixedYieldTransactionReceiptOutput"; ofType: null };
      };
      FixedYieldUnpauseReceipt: {
        name: "FixedYieldUnpauseReceipt";
        type: { kind: "OBJECT"; name: "FixedYieldTransactionReceiptOutput"; ofType: null };
      };
      FixedYieldWithdrawAllUnderlyingAssetReceipt: {
        name: "FixedYieldWithdrawAllUnderlyingAssetReceipt";
        type: { kind: "OBJECT"; name: "FixedYieldTransactionReceiptOutput"; ofType: null };
      };
      FixedYieldWithdrawUnderlyingAssetReceipt: {
        name: "FixedYieldWithdrawUnderlyingAssetReceipt";
        type: { kind: "OBJECT"; name: "FixedYieldTransactionReceiptOutput"; ofType: null };
      };
      Forwarder: { name: "Forwarder"; type: { kind: "OBJECT"; name: "Forwarder"; ofType: null } };
      ForwarderExecuteBatchReceipt: {
        name: "ForwarderExecuteBatchReceipt";
        type: { kind: "OBJECT"; name: "ForwarderTransactionReceiptOutput"; ofType: null };
      };
      ForwarderExecuteReceipt: {
        name: "ForwarderExecuteReceipt";
        type: { kind: "OBJECT"; name: "ForwarderTransactionReceiptOutput"; ofType: null };
      };
      Fund: { name: "Fund"; type: { kind: "OBJECT"; name: "Fund"; ofType: null } };
      FundApproveReceipt: {
        name: "FundApproveReceipt";
        type: { kind: "OBJECT"; name: "FundTransactionReceiptOutput"; ofType: null };
      };
      FundBlockUserReceipt: {
        name: "FundBlockUserReceipt";
        type: { kind: "OBJECT"; name: "FundTransactionReceiptOutput"; ofType: null };
      };
      FundBlockedReceipt: {
        name: "FundBlockedReceipt";
        type: { kind: "OBJECT"; name: "FundTransactionReceiptOutput"; ofType: null };
      };
      FundBurnFromReceipt: {
        name: "FundBurnFromReceipt";
        type: { kind: "OBJECT"; name: "FundTransactionReceiptOutput"; ofType: null };
      };
      FundBurnReceipt: {
        name: "FundBurnReceipt";
        type: { kind: "OBJECT"; name: "FundTransactionReceiptOutput"; ofType: null };
      };
      FundClawbackReceipt: {
        name: "FundClawbackReceipt";
        type: { kind: "OBJECT"; name: "FundTransactionReceiptOutput"; ofType: null };
      };
      FundCollectManagementFeeReceipt: {
        name: "FundCollectManagementFeeReceipt";
        type: { kind: "OBJECT"; name: "FundTransactionReceiptOutput"; ofType: null };
      };
      FundDelegateBySigReceipt: {
        name: "FundDelegateBySigReceipt";
        type: { kind: "OBJECT"; name: "FundTransactionReceiptOutput"; ofType: null };
      };
      FundDelegateReceipt: {
        name: "FundDelegateReceipt";
        type: { kind: "OBJECT"; name: "FundTransactionReceiptOutput"; ofType: null };
      };
      FundFactory: { name: "FundFactory"; type: { kind: "OBJECT"; name: "FundFactory"; ofType: null } };
      FundFactoryCreateReceipt: {
        name: "FundFactoryCreateReceipt";
        type: { kind: "OBJECT"; name: "FundFactoryTransactionReceiptOutput"; ofType: null };
      };
      FundFreezeReceipt: {
        name: "FundFreezeReceipt";
        type: { kind: "OBJECT"; name: "FundTransactionReceiptOutput"; ofType: null };
      };
      FundGrantRoleReceipt: {
        name: "FundGrantRoleReceipt";
        type: { kind: "OBJECT"; name: "FundTransactionReceiptOutput"; ofType: null };
      };
      FundMintReceipt: {
        name: "FundMintReceipt";
        type: { kind: "OBJECT"; name: "FundTransactionReceiptOutput"; ofType: null };
      };
      FundPauseReceipt: {
        name: "FundPauseReceipt";
        type: { kind: "OBJECT"; name: "FundTransactionReceiptOutput"; ofType: null };
      };
      FundPermitReceipt: {
        name: "FundPermitReceipt";
        type: { kind: "OBJECT"; name: "FundTransactionReceiptOutput"; ofType: null };
      };
      FundRenounceRoleReceipt: {
        name: "FundRenounceRoleReceipt";
        type: { kind: "OBJECT"; name: "FundTransactionReceiptOutput"; ofType: null };
      };
      FundRevokeRoleReceipt: {
        name: "FundRevokeRoleReceipt";
        type: { kind: "OBJECT"; name: "FundTransactionReceiptOutput"; ofType: null };
      };
      FundTransferFromReceipt: {
        name: "FundTransferFromReceipt";
        type: { kind: "OBJECT"; name: "FundTransactionReceiptOutput"; ofType: null };
      };
      FundTransferReceipt: {
        name: "FundTransferReceipt";
        type: { kind: "OBJECT"; name: "FundTransactionReceiptOutput"; ofType: null };
      };
      FundUnblockUserReceipt: {
        name: "FundUnblockUserReceipt";
        type: { kind: "OBJECT"; name: "FundTransactionReceiptOutput"; ofType: null };
      };
      FundUnpauseReceipt: {
        name: "FundUnpauseReceipt";
        type: { kind: "OBJECT"; name: "FundTransactionReceiptOutput"; ofType: null };
      };
      FundWithdrawTokenReceipt: {
        name: "FundWithdrawTokenReceipt";
        type: { kind: "OBJECT"; name: "FundTransactionReceiptOutput"; ofType: null };
      };
      StableCoin: { name: "StableCoin"; type: { kind: "OBJECT"; name: "StableCoin"; ofType: null } };
      StableCoinApproveReceipt: {
        name: "StableCoinApproveReceipt";
        type: { kind: "OBJECT"; name: "StableCoinTransactionReceiptOutput"; ofType: null };
      };
      StableCoinBlockUserReceipt: {
        name: "StableCoinBlockUserReceipt";
        type: { kind: "OBJECT"; name: "StableCoinTransactionReceiptOutput"; ofType: null };
      };
      StableCoinBlockedReceipt: {
        name: "StableCoinBlockedReceipt";
        type: { kind: "OBJECT"; name: "StableCoinTransactionReceiptOutput"; ofType: null };
      };
      StableCoinBurnFromReceipt: {
        name: "StableCoinBurnFromReceipt";
        type: { kind: "OBJECT"; name: "StableCoinTransactionReceiptOutput"; ofType: null };
      };
      StableCoinBurnReceipt: {
        name: "StableCoinBurnReceipt";
        type: { kind: "OBJECT"; name: "StableCoinTransactionReceiptOutput"; ofType: null };
      };
      StableCoinClawbackReceipt: {
        name: "StableCoinClawbackReceipt";
        type: { kind: "OBJECT"; name: "StableCoinTransactionReceiptOutput"; ofType: null };
      };
      StableCoinFactory: {
        name: "StableCoinFactory";
        type: { kind: "OBJECT"; name: "StableCoinFactory"; ofType: null };
      };
      StableCoinFactoryCreateReceipt: {
        name: "StableCoinFactoryCreateReceipt";
        type: { kind: "OBJECT"; name: "StableCoinFactoryTransactionReceiptOutput"; ofType: null };
      };
      StableCoinFreezeReceipt: {
        name: "StableCoinFreezeReceipt";
        type: { kind: "OBJECT"; name: "StableCoinTransactionReceiptOutput"; ofType: null };
      };
      StableCoinGrantRoleReceipt: {
        name: "StableCoinGrantRoleReceipt";
        type: { kind: "OBJECT"; name: "StableCoinTransactionReceiptOutput"; ofType: null };
      };
      StableCoinMintReceipt: {
        name: "StableCoinMintReceipt";
        type: { kind: "OBJECT"; name: "StableCoinTransactionReceiptOutput"; ofType: null };
      };
      StableCoinPauseReceipt: {
        name: "StableCoinPauseReceipt";
        type: { kind: "OBJECT"; name: "StableCoinTransactionReceiptOutput"; ofType: null };
      };
      StableCoinPermitReceipt: {
        name: "StableCoinPermitReceipt";
        type: { kind: "OBJECT"; name: "StableCoinTransactionReceiptOutput"; ofType: null };
      };
      StableCoinRenounceRoleReceipt: {
        name: "StableCoinRenounceRoleReceipt";
        type: { kind: "OBJECT"; name: "StableCoinTransactionReceiptOutput"; ofType: null };
      };
      StableCoinRevokeRoleReceipt: {
        name: "StableCoinRevokeRoleReceipt";
        type: { kind: "OBJECT"; name: "StableCoinTransactionReceiptOutput"; ofType: null };
      };
      StableCoinTransferFromReceipt: {
        name: "StableCoinTransferFromReceipt";
        type: { kind: "OBJECT"; name: "StableCoinTransactionReceiptOutput"; ofType: null };
      };
      StableCoinTransferReceipt: {
        name: "StableCoinTransferReceipt";
        type: { kind: "OBJECT"; name: "StableCoinTransactionReceiptOutput"; ofType: null };
      };
      StableCoinUnblockUserReceipt: {
        name: "StableCoinUnblockUserReceipt";
        type: { kind: "OBJECT"; name: "StableCoinTransactionReceiptOutput"; ofType: null };
      };
      StableCoinUnpauseReceipt: {
        name: "StableCoinUnpauseReceipt";
        type: { kind: "OBJECT"; name: "StableCoinTransactionReceiptOutput"; ofType: null };
      };
      StableCoinUpdateCollateralReceipt: {
        name: "StableCoinUpdateCollateralReceipt";
        type: { kind: "OBJECT"; name: "StableCoinTransactionReceiptOutput"; ofType: null };
      };
      StableCoinWithdrawTokenReceipt: {
        name: "StableCoinWithdrawTokenReceipt";
        type: { kind: "OBJECT"; name: "StableCoinTransactionReceiptOutput"; ofType: null };
      };
      getContracts: { name: "getContracts"; type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null } };
      getContractsBond: {
        name: "getContractsBond";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsBondFactory: {
        name: "getContractsBondFactory";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsCryptoCurrency: {
        name: "getContractsCryptoCurrency";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsCryptoCurrencyFactory: {
        name: "getContractsCryptoCurrencyFactory";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsDeposit: {
        name: "getContractsDeposit";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsDepositFactory: {
        name: "getContractsDepositFactory";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsEquity: {
        name: "getContractsEquity";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsEquityFactory: {
        name: "getContractsEquityFactory";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsFixedYield: {
        name: "getContractsFixedYield";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsFixedYieldFactory: {
        name: "getContractsFixedYieldFactory";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsForwarder: {
        name: "getContractsForwarder";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsFund: {
        name: "getContractsFund";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsFundFactory: {
        name: "getContractsFundFactory";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsStableCoin: {
        name: "getContractsStableCoin";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsStableCoinFactory: {
        name: "getContractsStableCoinFactory";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getPendingAndRecentlyProcessedTransactions: {
        name: "getPendingAndRecentlyProcessedTransactions";
        type: { kind: "OBJECT"; name: "TransactionsPaginatedOutput"; ofType: null };
      };
      getPendingTransactions: {
        name: "getPendingTransactions";
        type: { kind: "OBJECT"; name: "TransactionsPaginatedOutput"; ofType: null };
      };
      getProcessedTransactions: {
        name: "getProcessedTransactions";
        type: { kind: "OBJECT"; name: "TransactionsPaginatedOutput"; ofType: null };
      };
      getTransaction: { name: "getTransaction"; type: { kind: "OBJECT"; name: "TransactionOutput"; ofType: null } };
      getTransactionsTimeline: {
        name: "getTransactionsTimeline";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "OBJECT"; name: "TransactionTimelineOutput"; ofType: null };
          };
        };
      };
      getWalletVerifications: {
        name: "getWalletVerifications";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "OBJECT"; name: "WalletVerification"; ofType: null };
          };
        };
      };
    };
  };
  SecretCodesSettingsInput: {
    kind: "INPUT_OBJECT";
    name: "SecretCodesSettingsInput";
    isOneOf: false;
    inputFields: [
      {
        name: "name";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  StableCoin: {
    kind: "OBJECT";
    name: "StableCoin";
    fields: {
      AUDITOR_ROLE: { name: "AUDITOR_ROLE"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      CLOCK_MODE: { name: "CLOCK_MODE"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      DEFAULT_ADMIN_ROLE: { name: "DEFAULT_ADMIN_ROLE"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      DOMAIN_SEPARATOR: { name: "DOMAIN_SEPARATOR"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      SUPPLY_MANAGEMENT_ROLE: {
        name: "SUPPLY_MANAGEMENT_ROLE";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
      };
      USER_MANAGEMENT_ROLE: { name: "USER_MANAGEMENT_ROLE"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      allowance: { name: "allowance"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      availableBalance: {
        name: "availableBalance";
        type: { kind: "OBJECT"; name: "StableCoinAvailableBalanceOutput"; ofType: null };
      };
      balanceOf: { name: "balanceOf"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      clock: { name: "clock"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      collateral: { name: "collateral"; type: { kind: "OBJECT"; name: "StableCoinCollateralOutput"; ofType: null } };
      decimals: { name: "decimals"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      eip712Domain: {
        name: "eip712Domain";
        type: { kind: "OBJECT"; name: "StableCoinEip712DomainOutput"; ofType: null };
      };
      frozen: { name: "frozen"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      getRoleAdmin: { name: "getRoleAdmin"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      hasRole: { name: "hasRole"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      isTrustedForwarder: { name: "isTrustedForwarder"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      lastCollateralUpdate: { name: "lastCollateralUpdate"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      liveness: { name: "liveness"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      nonces: { name: "nonces"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      paused: { name: "paused"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      supportsInterface: { name: "supportsInterface"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      symbol: { name: "symbol"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      totalSupply: { name: "totalSupply"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      trustedForwarder: { name: "trustedForwarder"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  StableCoinApproveInput: {
    kind: "INPUT_OBJECT";
    name: "StableCoinApproveInput";
    isOneOf: false;
    inputFields: [
      {
        name: "spender";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  StableCoinAvailableBalanceOutput: {
    kind: "OBJECT";
    name: "StableCoinAvailableBalanceOutput";
    fields: { available: { name: "available"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  StableCoinBlockUserInput: {
    kind: "INPUT_OBJECT";
    name: "StableCoinBlockUserInput";
    isOneOf: false;
    inputFields: [
      {
        name: "user";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  StableCoinBlockedInput: {
    kind: "INPUT_OBJECT";
    name: "StableCoinBlockedInput";
    isOneOf: false;
    inputFields: [
      {
        name: "account";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  StableCoinBurnFromInput: {
    kind: "INPUT_OBJECT";
    name: "StableCoinBurnFromInput";
    isOneOf: false;
    inputFields: [
      {
        name: "account";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  StableCoinBurnInput: {
    kind: "INPUT_OBJECT";
    name: "StableCoinBurnInput";
    isOneOf: false;
    inputFields: [
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  StableCoinClawbackInput: {
    kind: "INPUT_OBJECT";
    name: "StableCoinClawbackInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  StableCoinCollateralOutput: {
    kind: "OBJECT";
    name: "StableCoinCollateralOutput";
    fields: {
      amount: { name: "amount"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      timestamp: { name: "timestamp"; type: { kind: "SCALAR"; name: "Float"; ofType: null } };
    };
  };
  StableCoinEip712DomainOutput: {
    kind: "OBJECT";
    name: "StableCoinEip712DomainOutput";
    fields: {
      chainId: { name: "chainId"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      extensions: {
        name: "extensions";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
      };
      fields: { name: "fields"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      salt: { name: "salt"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      verifyingContract: { name: "verifyingContract"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      version: { name: "version"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  StableCoinFactory: {
    kind: "OBJECT";
    name: "StableCoinFactory";
    fields: {
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      isAddressDeployed: { name: "isAddressDeployed"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      isFactoryToken: { name: "isFactoryToken"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      isTrustedForwarder: { name: "isTrustedForwarder"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      predictAddress: {
        name: "predictAddress";
        type: { kind: "OBJECT"; name: "StableCoinFactoryPredictAddressOutput"; ofType: null };
      };
      trustedForwarder: { name: "trustedForwarder"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  StableCoinFactoryCreateInput: {
    kind: "INPUT_OBJECT";
    name: "StableCoinFactoryCreateInput";
    isOneOf: false;
    inputFields: [
      {
        name: "collateralLivenessSeconds";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Float"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "decimals";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "name";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "symbol";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  StableCoinFactoryPredictAddressOutput: {
    kind: "OBJECT";
    name: "StableCoinFactoryPredictAddressOutput";
    fields: { predicted: { name: "predicted"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  StableCoinFactoryTransactionOutput: {
    kind: "OBJECT";
    name: "StableCoinFactoryTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  StableCoinFactoryTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "StableCoinFactoryTransactionReceiptOutput";
    fields: {
      blobGasPrice: { name: "blobGasPrice"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blobGasUsed: { name: "blobGasUsed"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blockHash: {
        name: "blockHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      blockNumber: {
        name: "blockNumber";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      contractAddress: { name: "contractAddress"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      cumulativeGasUsed: {
        name: "cumulativeGasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      effectiveGasPrice: {
        name: "effectiveGasPrice";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      events: {
        name: "events";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      from: {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      gasUsed: {
        name: "gasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      logs: {
        name: "logs";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      logsBloom: {
        name: "logsBloom";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      revertReason: { name: "revertReason"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      revertReasonDecoded: { name: "revertReasonDecoded"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      root: { name: "root"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      status: {
        name: "status";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "ENUM"; name: "TransactionReceiptStatus"; ofType: null };
        };
      };
      to: { name: "to"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      transactionHash: {
        name: "transactionHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      transactionIndex: {
        name: "transactionIndex";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      type: {
        name: "type";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      userOperationReceipts: {
        name: "userOperationReceipts";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "OBJECT"; name: "UserOperationReceipt"; ofType: null };
          };
        };
      };
    };
  };
  StableCoinFreezeInput: {
    kind: "INPUT_OBJECT";
    name: "StableCoinFreezeInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "user";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  StableCoinGrantRoleInput: {
    kind: "INPUT_OBJECT";
    name: "StableCoinGrantRoleInput";
    isOneOf: false;
    inputFields: [
      {
        name: "account";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "role";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  StableCoinMintInput: {
    kind: "INPUT_OBJECT";
    name: "StableCoinMintInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  StableCoinPermitInput: {
    kind: "INPUT_OBJECT";
    name: "StableCoinPermitInput";
    isOneOf: false;
    inputFields: [
      {
        name: "deadline";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "owner";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "r";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "s";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "spender";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "v";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  StableCoinRenounceRoleInput: {
    kind: "INPUT_OBJECT";
    name: "StableCoinRenounceRoleInput";
    isOneOf: false;
    inputFields: [
      {
        name: "callerConfirmation";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "role";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  StableCoinRevokeRoleInput: {
    kind: "INPUT_OBJECT";
    name: "StableCoinRevokeRoleInput";
    isOneOf: false;
    inputFields: [
      {
        name: "account";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "role";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  StableCoinTransactionOutput: {
    kind: "OBJECT";
    name: "StableCoinTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  StableCoinTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "StableCoinTransactionReceiptOutput";
    fields: {
      blobGasPrice: { name: "blobGasPrice"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blobGasUsed: { name: "blobGasUsed"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blockHash: {
        name: "blockHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      blockNumber: {
        name: "blockNumber";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      contractAddress: { name: "contractAddress"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      cumulativeGasUsed: {
        name: "cumulativeGasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      effectiveGasPrice: {
        name: "effectiveGasPrice";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      events: {
        name: "events";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      from: {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      gasUsed: {
        name: "gasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      logs: {
        name: "logs";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      logsBloom: {
        name: "logsBloom";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      revertReason: { name: "revertReason"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      revertReasonDecoded: { name: "revertReasonDecoded"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      root: { name: "root"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      status: {
        name: "status";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "ENUM"; name: "TransactionReceiptStatus"; ofType: null };
        };
      };
      to: { name: "to"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      transactionHash: {
        name: "transactionHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      transactionIndex: {
        name: "transactionIndex";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      type: {
        name: "type";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      userOperationReceipts: {
        name: "userOperationReceipts";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "OBJECT"; name: "UserOperationReceipt"; ofType: null };
          };
        };
      };
    };
  };
  StableCoinTransferFromInput: {
    kind: "INPUT_OBJECT";
    name: "StableCoinTransferFromInput";
    isOneOf: false;
    inputFields: [
      {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  StableCoinTransferInput: {
    kind: "INPUT_OBJECT";
    name: "StableCoinTransferInput";
    isOneOf: false;
    inputFields: [
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  StableCoinUnblockUserInput: {
    kind: "INPUT_OBJECT";
    name: "StableCoinUnblockUserInput";
    isOneOf: false;
    inputFields: [
      {
        name: "user";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  StableCoinUpdateCollateralInput: {
    kind: "INPUT_OBJECT";
    name: "StableCoinUpdateCollateralInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  StableCoinWithdrawTokenInput: {
    kind: "INPUT_OBJECT";
    name: "StableCoinWithdrawTokenInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "token";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  String: unknown;
  Subscription: {
    kind: "OBJECT";
    name: "Subscription";
    fields: {
      getPendingAndRecentlyProcessedTransactions: {
        name: "getPendingAndRecentlyProcessedTransactions";
        type: { kind: "OBJECT"; name: "TransactionsPaginatedOutput"; ofType: null };
      };
      getPendingTransactions: {
        name: "getPendingTransactions";
        type: { kind: "OBJECT"; name: "TransactionsPaginatedOutput"; ofType: null };
      };
      getProcessedTransactions: {
        name: "getProcessedTransactions";
        type: { kind: "OBJECT"; name: "TransactionsPaginatedOutput"; ofType: null };
      };
      getTransaction: { name: "getTransaction"; type: { kind: "OBJECT"; name: "TransactionOutput"; ofType: null } };
    };
  };
  TransactionOutput: {
    kind: "OBJECT";
    name: "TransactionOutput";
    fields: {
      address: {
        name: "address";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      createdAt: { name: "createdAt"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      from: {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      functionName: {
        name: "functionName";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      isContract: {
        name: "isContract";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      };
      metadata: { name: "metadata"; type: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      receipt: { name: "receipt"; type: { kind: "OBJECT"; name: "TransactionReceiptOutput"; ofType: null } };
      transactionHash: {
        name: "transactionHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      updatedAt: { name: "updatedAt"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  TransactionReceiptOutput: {
    kind: "OBJECT";
    name: "TransactionReceiptOutput";
    fields: {
      blobGasPrice: { name: "blobGasPrice"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blobGasUsed: { name: "blobGasUsed"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      blockHash: {
        name: "blockHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      blockNumber: {
        name: "blockNumber";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      contractAddress: { name: "contractAddress"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      cumulativeGasUsed: {
        name: "cumulativeGasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      effectiveGasPrice: {
        name: "effectiveGasPrice";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      events: {
        name: "events";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      from: {
        name: "from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      gasUsed: {
        name: "gasUsed";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      logs: {
        name: "logs";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      };
      logsBloom: {
        name: "logsBloom";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      revertReason: { name: "revertReason"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      revertReasonDecoded: { name: "revertReasonDecoded"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      root: { name: "root"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      status: {
        name: "status";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "ENUM"; name: "TransactionReceiptStatus"; ofType: null };
        };
      };
      to: { name: "to"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      transactionHash: {
        name: "transactionHash";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      transactionIndex: {
        name: "transactionIndex";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      type: {
        name: "type";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
      userOperationReceipts: {
        name: "userOperationReceipts";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "OBJECT"; name: "UserOperationReceipt"; ofType: null };
          };
        };
      };
    };
  };
  TransactionReceiptStatus: { name: "TransactionReceiptStatus"; enumValues: "Reverted" | "Success" };
  TransactionTimelineGranularity: {
    name: "TransactionTimelineGranularity";
    enumValues: "DAY" | "HOUR" | "MONTH" | "YEAR";
  };
  TransactionTimelineOutput: {
    kind: "OBJECT";
    name: "TransactionTimelineOutput";
    fields: {
      count: { name: "count"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      end: { name: "end"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      start: { name: "start"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  TransactionsPaginatedOutput: {
    kind: "OBJECT";
    name: "TransactionsPaginatedOutput";
    fields: {
      count: {
        name: "count";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Int"; ofType: null } };
      };
      records: {
        name: "records";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: {
              kind: "NON_NULL";
              name: never;
              ofType: { kind: "OBJECT"; name: "TransactionOutput"; ofType: null };
            };
          };
        };
      };
    };
  };
  UserOperationReceipt: {
    kind: "OBJECT";
    name: "UserOperationReceipt";
    fields: {
      actualGasCost: { name: "actualGasCost"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      actualGasUsed: { name: "actualGasUsed"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      entryPoint: { name: "entryPoint"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      logs: {
        name: "logs";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
      };
      nonce: { name: "nonce"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      sender: { name: "sender"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      success: { name: "success"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      userOpHash: { name: "userOpHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  VerifyWalletVerificationChallengeOutput: {
    kind: "OBJECT";
    name: "VerifyWalletVerificationChallengeOutput";
    fields: { verified: { name: "verified"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } } };
  };
  WalletVerification: {
    kind: "OBJECT";
    name: "WalletVerification";
    fields: {
      id: { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      verificationType: {
        name: "verificationType";
        type: { kind: "ENUM"; name: "WalletVerificationType"; ofType: null };
      };
    };
  };
  WalletVerificationChallenge: {
    kind: "OBJECT";
    name: "WalletVerificationChallenge";
    fields: {
      challenge: { name: "challenge"; type: { kind: "SCALAR"; name: "JSON"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      verificationType: {
        name: "verificationType";
        type: { kind: "ENUM"; name: "WalletVerificationType"; ofType: null };
      };
    };
  };
  WalletVerificationType: { name: "WalletVerificationType"; enumValues: "OTP" | "PINCODE" | "SECRET_CODES" };
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
  name: "portal";
  query: "Query";
  mutation: "Mutation";
  subscription: "Subscription";
  types: introspection_types;
};
