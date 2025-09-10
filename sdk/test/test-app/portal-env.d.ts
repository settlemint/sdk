/* eslint-disable */
/* prettier-ignore */

export type introspection_types = {
  AirdropFactory: {
    kind: "OBJECT";
    name: "AirdropFactory";
    fields: {
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      isTrustedForwarder: { name: "isTrustedForwarder"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      predictLinearVestingAirdropAddress: {
        name: "predictLinearVestingAirdropAddress";
        type: { kind: "OBJECT"; name: "AirdropFactoryPredictLinearVestingAirdropAddressOutput"; ofType: null };
      };
      predictPushAirdropAddress: {
        name: "predictPushAirdropAddress";
        type: { kind: "OBJECT"; name: "AirdropFactoryPredictPushAirdropAddressOutput"; ofType: null };
      };
      predictStandardAirdropAddress: {
        name: "predictStandardAirdropAddress";
        type: { kind: "OBJECT"; name: "AirdropFactoryPredictStandardAirdropAddressOutput"; ofType: null };
      };
      trustedForwarder: { name: "trustedForwarder"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  AirdropFactoryDeployLinearVestingAirdropInput: {
    kind: "INPUT_OBJECT";
    name: "AirdropFactoryDeployLinearVestingAirdropInput";
    isOneOf: false;
    inputFields: [
      {
        name: "claimPeriodEnd";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "cliffDuration";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "merkleRoot";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "owner";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "tokenAddress";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "vestingDuration";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  AirdropFactoryDeployPushAirdropInput: {
    kind: "INPUT_OBJECT";
    name: "AirdropFactoryDeployPushAirdropInput";
    isOneOf: false;
    inputFields: [
      {
        name: "distributionCap";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "merkleRoot";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "owner";
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
  AirdropFactoryDeployStandardAirdropInput: {
    kind: "INPUT_OBJECT";
    name: "AirdropFactoryDeployStandardAirdropInput";
    isOneOf: false;
    inputFields: [
      {
        name: "endTime";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "merkleRoot";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "owner";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "startTime";
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
  AirdropFactoryPredictLinearVestingAirdropAddressOutput: {
    kind: "OBJECT";
    name: "AirdropFactoryPredictLinearVestingAirdropAddressOutput";
    fields: {
      predictedAirdropAddress: {
        name: "predictedAirdropAddress";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
      };
      predictedStrategyAddress: {
        name: "predictedStrategyAddress";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
      };
    };
  };
  AirdropFactoryPredictPushAirdropAddressOutput: {
    kind: "OBJECT";
    name: "AirdropFactoryPredictPushAirdropAddressOutput";
    fields: { predictedAddress: { name: "predictedAddress"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  AirdropFactoryPredictStandardAirdropAddressOutput: {
    kind: "OBJECT";
    name: "AirdropFactoryPredictStandardAirdropAddressOutput";
    fields: { predictedAddress: { name: "predictedAddress"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  AirdropFactoryTransactionOutput: {
    kind: "OBJECT";
    name: "AirdropFactoryTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  AirdropFactoryTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "AirdropFactoryTransactionReceiptOutput";
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
  ContractDeployStatus: {
    kind: "OBJECT";
    name: "ContractDeployStatus";
    fields: {
      abiName: { name: "abiName"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      address: { name: "address"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      createdAt: { name: "createdAt"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      deployedAt: { name: "deployedAt"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      revertedAt: { name: "revertedAt"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      transaction: { name: "transaction"; type: { kind: "OBJECT"; name: "TransactionOutput"; ofType: null } };
      transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  ContractDeploymentTransactionOutput: {
    kind: "OBJECT";
    name: "ContractDeploymentTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  ContractsDeployStatusPaginatedOutput: {
    kind: "OBJECT";
    name: "ContractsDeployStatusPaginatedOutput";
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
              ofType: { kind: "OBJECT"; name: "ContractDeployStatus"; ofType: null };
            };
          };
        };
      };
    };
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
      { name: "walletIndex"; type: { kind: "SCALAR"; name: "Int"; ofType: null }; defaultValue: null },
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
  DeployContractAirdropFactoryInput: {
    kind: "INPUT_OBJECT";
    name: "DeployContractAirdropFactoryInput";
    isOneOf: false;
    inputFields: [
      {
        name: "forwarder";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
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
  DeployContractEASInput: {
    kind: "INPUT_OBJECT";
    name: "DeployContractEASInput";
    isOneOf: false;
    inputFields: [
      {
        name: "forwarder";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "registry";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DeployContractEASSchemaRegistryInput: {
    kind: "INPUT_OBJECT";
    name: "DeployContractEASSchemaRegistryInput";
    isOneOf: false;
    inputFields: [
      {
        name: "forwarder";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DeployContractERC721TradingCardsMetaDogInput: {
    kind: "INPUT_OBJECT";
    name: "DeployContractERC721TradingCardsMetaDogInput";
    isOneOf: false;
    inputFields: [
      {
        name: "baseTokenURI_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "name_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "proxyRegistryAddress_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "symbol_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "wallet_";
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
  DeployContractGenericERC20Input: {
    kind: "INPUT_OBJECT";
    name: "DeployContractGenericERC20Input";
    isOneOf: false;
    inputFields: [
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
  DeployContractPushAirdropInput: {
    kind: "INPUT_OBJECT";
    name: "DeployContractPushAirdropInput";
    isOneOf: false;
    inputFields: [
      {
        name: "_distributionCap";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "initialOwner";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "root";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "tokenAddress";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "trustedForwarder";
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
  DeployContractStandardAirdropInput: {
    kind: "INPUT_OBJECT";
    name: "DeployContractStandardAirdropInput";
    isOneOf: false;
    inputFields: [
      {
        name: "_endTime";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "_startTime";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "initialOwner";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "root";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "tokenAddress";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "trustedForwarder";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DeployContractVaultFactoryInput: {
    kind: "INPUT_OBJECT";
    name: "DeployContractVaultFactoryInput";
    isOneOf: false;
    inputFields: [
      {
        name: "forwarder";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DeployContractVaultInput: {
    kind: "INPUT_OBJECT";
    name: "DeployContractVaultInput";
    isOneOf: false;
    inputFields: [
      {
        name: "_required";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "_signers";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
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
    ];
  };
  DeployContractVestingAirdropInput: {
    kind: "INPUT_OBJECT";
    name: "DeployContractVestingAirdropInput";
    isOneOf: false;
    inputFields: [
      {
        name: "_claimPeriodEnd";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "_claimStrategy";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "initialOwner";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "root";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "tokenAddress";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "trustedForwarder";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DeployContractXvPSettlementFactoryInput: {
    kind: "INPUT_OBJECT";
    name: "DeployContractXvPSettlementFactoryInput";
    isOneOf: false;
    inputFields: [
      {
        name: "forwarder";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  DeployContractXvPSettlementInput: {
    kind: "INPUT_OBJECT";
    name: "DeployContractXvPSettlementInput";
    isOneOf: false;
    inputFields: [
      {
        name: "forwarder";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "settlementAutoExecute";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "settlementCutoffDate";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "settlementFlows";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: {
              kind: "NON_NULL";
              name: never;
              ofType: {
                kind: "INPUT_OBJECT";
                name: "XvPSettlementDeployContractXvPSettlementSettlementFlowsInput";
                ofType: null;
              };
            };
          };
        };
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
  EAS: {
    kind: "OBJECT";
    name: "EAS";
    fields: {
      eip712Domain: { name: "eip712Domain"; type: { kind: "OBJECT"; name: "EASEip712DomainOutput"; ofType: null } };
      getAttestTypeHash: { name: "getAttestTypeHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      getAttestation: {
        name: "getAttestation";
        type: { kind: "OBJECT"; name: "EASTuple0GetAttestationOutput"; ofType: null };
      };
      getDomainSeparator: { name: "getDomainSeparator"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      getName: { name: "getName"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      getNonce: { name: "getNonce"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      getRevokeOffchain: { name: "getRevokeOffchain"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      getRevokeTypeHash: { name: "getRevokeTypeHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      getSchemaRegistry: { name: "getSchemaRegistry"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      getTimestamp: { name: "getTimestamp"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      isAttestationValid: { name: "isAttestationValid"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      isTrustedForwarder: { name: "isTrustedForwarder"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      trustedForwarder: { name: "trustedForwarder"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      version: { name: "version"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  EASAttestByDelegationInput: {
    kind: "INPUT_OBJECT";
    name: "EASAttestByDelegationInput";
    isOneOf: false;
    inputFields: [
      {
        name: "delegatedRequest";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "EASEASAttestByDelegationDelegatedRequestInput"; ofType: null };
        };
        defaultValue: null;
      },
    ];
  };
  EASAttestInput: {
    kind: "INPUT_OBJECT";
    name: "EASAttestInput";
    isOneOf: false;
    inputFields: [
      {
        name: "request";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "EASEASAttestRequestInput"; ofType: null };
        };
        defaultValue: null;
      },
    ];
  };
  EASEASAttestByDelegationDelegatedRequestInput: {
    kind: "INPUT_OBJECT";
    name: "EASEASAttestByDelegationDelegatedRequestInput";
    isOneOf: false;
    inputFields: [
      {
        name: "attester";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "data";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "EASEASEASAttestByDelegationDelegatedRequestDataInput"; ofType: null };
        };
        defaultValue: null;
      },
      {
        name: "deadline";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "schema";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "signature";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "INPUT_OBJECT";
            name: "EASEASEASAttestByDelegationDelegatedRequestSignatureInput";
            ofType: null;
          };
        };
        defaultValue: null;
      },
    ];
  };
  EASEASAttestRequestInput: {
    kind: "INPUT_OBJECT";
    name: "EASEASAttestRequestInput";
    isOneOf: false;
    inputFields: [
      {
        name: "data";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "EASEASEASAttestRequestDataInput"; ofType: null };
        };
        defaultValue: null;
      },
      {
        name: "schema";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EASEASEASAttestByDelegationDelegatedRequestDataInput: {
    kind: "INPUT_OBJECT";
    name: "EASEASEASAttestByDelegationDelegatedRequestDataInput";
    isOneOf: false;
    inputFields: [
      {
        name: "data";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "expirationTime";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "recipient";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "refUID";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "revocable";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EASEASEASAttestByDelegationDelegatedRequestSignatureInput: {
    kind: "INPUT_OBJECT";
    name: "EASEASEASAttestByDelegationDelegatedRequestSignatureInput";
    isOneOf: false;
    inputFields: [
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
  EASEASEASAttestRequestDataInput: {
    kind: "INPUT_OBJECT";
    name: "EASEASEASAttestRequestDataInput";
    isOneOf: false;
    inputFields: [
      {
        name: "data";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "expirationTime";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "recipient";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "refUID";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "revocable";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EASEASEASMultiAttestByDelegationMultiDelegatedRequestsDataInput: {
    kind: "INPUT_OBJECT";
    name: "EASEASEASMultiAttestByDelegationMultiDelegatedRequestsDataInput";
    isOneOf: false;
    inputFields: [
      {
        name: "data";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "expirationTime";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "recipient";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "refUID";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "revocable";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EASEASEASMultiAttestByDelegationMultiDelegatedRequestsSignaturesInput: {
    kind: "INPUT_OBJECT";
    name: "EASEASEASMultiAttestByDelegationMultiDelegatedRequestsSignaturesInput";
    isOneOf: false;
    inputFields: [
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
  EASEASEASMultiAttestMultiRequestsDataInput: {
    kind: "INPUT_OBJECT";
    name: "EASEASEASMultiAttestMultiRequestsDataInput";
    isOneOf: false;
    inputFields: [
      {
        name: "data";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "expirationTime";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "recipient";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "refUID";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "revocable";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EASEASEASMultiRevokeByDelegationMultiDelegatedRequestsDataInput: {
    kind: "INPUT_OBJECT";
    name: "EASEASEASMultiRevokeByDelegationMultiDelegatedRequestsDataInput";
    isOneOf: false;
    inputFields: [
      {
        name: "uid";
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
  EASEASEASMultiRevokeByDelegationMultiDelegatedRequestsSignaturesInput: {
    kind: "INPUT_OBJECT";
    name: "EASEASEASMultiRevokeByDelegationMultiDelegatedRequestsSignaturesInput";
    isOneOf: false;
    inputFields: [
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
  EASEASEASMultiRevokeMultiRequestsDataInput: {
    kind: "INPUT_OBJECT";
    name: "EASEASEASMultiRevokeMultiRequestsDataInput";
    isOneOf: false;
    inputFields: [
      {
        name: "uid";
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
  EASEASEASRevokeByDelegationDelegatedRequestDataInput: {
    kind: "INPUT_OBJECT";
    name: "EASEASEASRevokeByDelegationDelegatedRequestDataInput";
    isOneOf: false;
    inputFields: [
      {
        name: "uid";
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
  EASEASEASRevokeByDelegationDelegatedRequestSignatureInput: {
    kind: "INPUT_OBJECT";
    name: "EASEASEASRevokeByDelegationDelegatedRequestSignatureInput";
    isOneOf: false;
    inputFields: [
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
  EASEASEASRevokeRequestDataInput: {
    kind: "INPUT_OBJECT";
    name: "EASEASEASRevokeRequestDataInput";
    isOneOf: false;
    inputFields: [
      {
        name: "uid";
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
  EASEASMultiAttestByDelegationMultiDelegatedRequestsInput: {
    kind: "INPUT_OBJECT";
    name: "EASEASMultiAttestByDelegationMultiDelegatedRequestsInput";
    isOneOf: false;
    inputFields: [
      {
        name: "attester";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "data";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: {
              kind: "NON_NULL";
              name: never;
              ofType: {
                kind: "INPUT_OBJECT";
                name: "EASEASEASMultiAttestByDelegationMultiDelegatedRequestsDataInput";
                ofType: null;
              };
            };
          };
        };
        defaultValue: null;
      },
      {
        name: "deadline";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "schema";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "signatures";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: {
              kind: "NON_NULL";
              name: never;
              ofType: {
                kind: "INPUT_OBJECT";
                name: "EASEASEASMultiAttestByDelegationMultiDelegatedRequestsSignaturesInput";
                ofType: null;
              };
            };
          };
        };
        defaultValue: null;
      },
    ];
  };
  EASEASMultiAttestMultiRequestsInput: {
    kind: "INPUT_OBJECT";
    name: "EASEASMultiAttestMultiRequestsInput";
    isOneOf: false;
    inputFields: [
      {
        name: "data";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: {
              kind: "NON_NULL";
              name: never;
              ofType: { kind: "INPUT_OBJECT"; name: "EASEASEASMultiAttestMultiRequestsDataInput"; ofType: null };
            };
          };
        };
        defaultValue: null;
      },
      {
        name: "schema";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EASEASMultiRevokeByDelegationMultiDelegatedRequestsInput: {
    kind: "INPUT_OBJECT";
    name: "EASEASMultiRevokeByDelegationMultiDelegatedRequestsInput";
    isOneOf: false;
    inputFields: [
      {
        name: "data";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: {
              kind: "NON_NULL";
              name: never;
              ofType: {
                kind: "INPUT_OBJECT";
                name: "EASEASEASMultiRevokeByDelegationMultiDelegatedRequestsDataInput";
                ofType: null;
              };
            };
          };
        };
        defaultValue: null;
      },
      {
        name: "deadline";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "revoker";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "schema";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "signatures";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: {
              kind: "NON_NULL";
              name: never;
              ofType: {
                kind: "INPUT_OBJECT";
                name: "EASEASEASMultiRevokeByDelegationMultiDelegatedRequestsSignaturesInput";
                ofType: null;
              };
            };
          };
        };
        defaultValue: null;
      },
    ];
  };
  EASEASMultiRevokeMultiRequestsInput: {
    kind: "INPUT_OBJECT";
    name: "EASEASMultiRevokeMultiRequestsInput";
    isOneOf: false;
    inputFields: [
      {
        name: "data";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: {
              kind: "NON_NULL";
              name: never;
              ofType: { kind: "INPUT_OBJECT"; name: "EASEASEASMultiRevokeMultiRequestsDataInput"; ofType: null };
            };
          };
        };
        defaultValue: null;
      },
      {
        name: "schema";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EASEASRevokeByDelegationDelegatedRequestInput: {
    kind: "INPUT_OBJECT";
    name: "EASEASRevokeByDelegationDelegatedRequestInput";
    isOneOf: false;
    inputFields: [
      {
        name: "data";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "EASEASEASRevokeByDelegationDelegatedRequestDataInput"; ofType: null };
        };
        defaultValue: null;
      },
      {
        name: "deadline";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "revoker";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "schema";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "signature";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "INPUT_OBJECT";
            name: "EASEASEASRevokeByDelegationDelegatedRequestSignatureInput";
            ofType: null;
          };
        };
        defaultValue: null;
      },
    ];
  };
  EASEASRevokeRequestInput: {
    kind: "INPUT_OBJECT";
    name: "EASEASRevokeRequestInput";
    isOneOf: false;
    inputFields: [
      {
        name: "data";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "EASEASEASRevokeRequestDataInput"; ofType: null };
        };
        defaultValue: null;
      },
      {
        name: "schema";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EASEip712DomainOutput: {
    kind: "OBJECT";
    name: "EASEip712DomainOutput";
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
  EASIncreaseNonceInput: {
    kind: "INPUT_OBJECT";
    name: "EASIncreaseNonceInput";
    isOneOf: false;
    inputFields: [
      {
        name: "newNonce";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EASMultiAttestByDelegationInput: {
    kind: "INPUT_OBJECT";
    name: "EASMultiAttestByDelegationInput";
    isOneOf: false;
    inputFields: [
      {
        name: "multiDelegatedRequests";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: {
              kind: "NON_NULL";
              name: never;
              ofType: {
                kind: "INPUT_OBJECT";
                name: "EASEASMultiAttestByDelegationMultiDelegatedRequestsInput";
                ofType: null;
              };
            };
          };
        };
        defaultValue: null;
      },
    ];
  };
  EASMultiAttestInput: {
    kind: "INPUT_OBJECT";
    name: "EASMultiAttestInput";
    isOneOf: false;
    inputFields: [
      {
        name: "multiRequests";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: {
              kind: "NON_NULL";
              name: never;
              ofType: { kind: "INPUT_OBJECT"; name: "EASEASMultiAttestMultiRequestsInput"; ofType: null };
            };
          };
        };
        defaultValue: null;
      },
    ];
  };
  EASMultiRevokeByDelegationInput: {
    kind: "INPUT_OBJECT";
    name: "EASMultiRevokeByDelegationInput";
    isOneOf: false;
    inputFields: [
      {
        name: "multiDelegatedRequests";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: {
              kind: "NON_NULL";
              name: never;
              ofType: {
                kind: "INPUT_OBJECT";
                name: "EASEASMultiRevokeByDelegationMultiDelegatedRequestsInput";
                ofType: null;
              };
            };
          };
        };
        defaultValue: null;
      },
    ];
  };
  EASMultiRevokeInput: {
    kind: "INPUT_OBJECT";
    name: "EASMultiRevokeInput";
    isOneOf: false;
    inputFields: [
      {
        name: "multiRequests";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: {
              kind: "NON_NULL";
              name: never;
              ofType: { kind: "INPUT_OBJECT"; name: "EASEASMultiRevokeMultiRequestsInput"; ofType: null };
            };
          };
        };
        defaultValue: null;
      },
    ];
  };
  EASMultiRevokeOffchainInput: {
    kind: "INPUT_OBJECT";
    name: "EASMultiRevokeOffchainInput";
    isOneOf: false;
    inputFields: [
      {
        name: "data";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
    ];
  };
  EASMultiTimestampInput: {
    kind: "INPUT_OBJECT";
    name: "EASMultiTimestampInput";
    isOneOf: false;
    inputFields: [
      {
        name: "data";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
    ];
  };
  EASRevokeByDelegationInput: {
    kind: "INPUT_OBJECT";
    name: "EASRevokeByDelegationInput";
    isOneOf: false;
    inputFields: [
      {
        name: "delegatedRequest";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "EASEASRevokeByDelegationDelegatedRequestInput"; ofType: null };
        };
        defaultValue: null;
      },
    ];
  };
  EASRevokeInput: {
    kind: "INPUT_OBJECT";
    name: "EASRevokeInput";
    isOneOf: false;
    inputFields: [
      {
        name: "request";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: { kind: "INPUT_OBJECT"; name: "EASEASRevokeRequestInput"; ofType: null };
        };
        defaultValue: null;
      },
    ];
  };
  EASRevokeOffchainInput: {
    kind: "INPUT_OBJECT";
    name: "EASRevokeOffchainInput";
    isOneOf: false;
    inputFields: [
      {
        name: "data";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EASSchemaRegistry: {
    kind: "OBJECT";
    name: "EASSchemaRegistry";
    fields: {
      getSchema: {
        name: "getSchema";
        type: { kind: "OBJECT"; name: "EASSchemaRegistryTuple0GetSchemaOutput"; ofType: null };
      };
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      isTrustedForwarder: { name: "isTrustedForwarder"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      trustedForwarder: { name: "trustedForwarder"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      version: { name: "version"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  EASSchemaRegistryRegisterInput: {
    kind: "INPUT_OBJECT";
    name: "EASSchemaRegistryRegisterInput";
    isOneOf: false;
    inputFields: [
      {
        name: "resolver";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "revocable";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "schema";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EASSchemaRegistryTransactionOutput: {
    kind: "OBJECT";
    name: "EASSchemaRegistryTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  EASSchemaRegistryTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "EASSchemaRegistryTransactionReceiptOutput";
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
  EASSchemaRegistryTuple0GetSchemaOutput: {
    kind: "OBJECT";
    name: "EASSchemaRegistryTuple0GetSchemaOutput";
    fields: {
      resolver: { name: "resolver"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      revocable: { name: "revocable"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      schema: { name: "schema"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      uid: { name: "uid"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  EASTimestampInput: {
    kind: "INPUT_OBJECT";
    name: "EASTimestampInput";
    isOneOf: false;
    inputFields: [
      {
        name: "data";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EASTransactionOutput: {
    kind: "OBJECT";
    name: "EASTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  EASTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "EASTransactionReceiptOutput";
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
  EASTuple0GetAttestationOutput: {
    kind: "OBJECT";
    name: "EASTuple0GetAttestationOutput";
    fields: {
      attester: { name: "attester"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      data: { name: "data"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      expirationTime: { name: "expirationTime"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      recipient: { name: "recipient"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      refUID: { name: "refUID"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      revocable: { name: "revocable"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      revocationTime: { name: "revocationTime"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      schema: { name: "schema"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      time: { name: "time"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      uid: { name: "uid"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  ERC20TokenMetaTxForwarder: {
    kind: "OBJECT";
    name: "ERC20TokenMetaTxForwarder";
    fields: {
      eip712Domain: {
        name: "eip712Domain";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxForwarderEip712DomainOutput"; ofType: null };
      };
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      nonces: { name: "nonces"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      verify: { name: "verify"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
    };
  };
  ERC20TokenMetaTxForwarderERC20TokenMetaTxForwarderExecuteBatchRequestsInput: {
    kind: "INPUT_OBJECT";
    name: "ERC20TokenMetaTxForwarderERC20TokenMetaTxForwarderExecuteBatchRequestsInput";
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
  ERC20TokenMetaTxForwarderERC20TokenMetaTxForwarderExecuteRequestInput: {
    kind: "INPUT_OBJECT";
    name: "ERC20TokenMetaTxForwarderERC20TokenMetaTxForwarderExecuteRequestInput";
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
  ERC20TokenMetaTxForwarderEip712DomainOutput: {
    kind: "OBJECT";
    name: "ERC20TokenMetaTxForwarderEip712DomainOutput";
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
  ERC20TokenMetaTxForwarderExecuteBatchInput: {
    kind: "INPUT_OBJECT";
    name: "ERC20TokenMetaTxForwarderExecuteBatchInput";
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
              ofType: {
                kind: "INPUT_OBJECT";
                name: "ERC20TokenMetaTxForwarderERC20TokenMetaTxForwarderExecuteBatchRequestsInput";
                ofType: null;
              };
            };
          };
        };
        defaultValue: null;
      },
    ];
  };
  ERC20TokenMetaTxForwarderExecuteInput: {
    kind: "INPUT_OBJECT";
    name: "ERC20TokenMetaTxForwarderExecuteInput";
    isOneOf: false;
    inputFields: [
      {
        name: "request";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "INPUT_OBJECT";
            name: "ERC20TokenMetaTxForwarderERC20TokenMetaTxForwarderExecuteRequestInput";
            ofType: null;
          };
        };
        defaultValue: null;
      },
    ];
  };
  ERC20TokenMetaTxForwarderTransactionOutput: {
    kind: "OBJECT";
    name: "ERC20TokenMetaTxForwarderTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  ERC20TokenMetaTxForwarderTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "ERC20TokenMetaTxForwarderTransactionReceiptOutput";
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
  ERC20TokenMetaTxForwarderVerifyRequestInput: {
    kind: "INPUT_OBJECT";
    name: "ERC20TokenMetaTxForwarderVerifyRequestInput";
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
  ERC20TokenMetaTxGenericTokenMeta: {
    kind: "OBJECT";
    name: "ERC20TokenMetaTxGenericTokenMeta";
    fields: {
      DOMAIN_SEPARATOR: { name: "DOMAIN_SEPARATOR"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      allowance: { name: "allowance"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      balanceOf: { name: "balanceOf"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      decimals: { name: "decimals"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      eip712Domain: {
        name: "eip712Domain";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxGenericTokenMetaEip712DomainOutput"; ofType: null };
      };
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      isTrustedForwarder: { name: "isTrustedForwarder"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      msgData: { name: "msgData"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      nonces: { name: "nonces"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      owner: { name: "owner"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      paused: { name: "paused"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      symbol: { name: "symbol"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      totalSupply: { name: "totalSupply"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      trustedForwarder: { name: "trustedForwarder"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  ERC20TokenMetaTxGenericTokenMetaApproveInput: {
    kind: "INPUT_OBJECT";
    name: "ERC20TokenMetaTxGenericTokenMetaApproveInput";
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
  ERC20TokenMetaTxGenericTokenMetaBurnFromInput: {
    kind: "INPUT_OBJECT";
    name: "ERC20TokenMetaTxGenericTokenMetaBurnFromInput";
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
  ERC20TokenMetaTxGenericTokenMetaBurnInput: {
    kind: "INPUT_OBJECT";
    name: "ERC20TokenMetaTxGenericTokenMetaBurnInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  ERC20TokenMetaTxGenericTokenMetaEip712DomainOutput: {
    kind: "OBJECT";
    name: "ERC20TokenMetaTxGenericTokenMetaEip712DomainOutput";
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
  ERC20TokenMetaTxGenericTokenMetaMintInput: {
    kind: "INPUT_OBJECT";
    name: "ERC20TokenMetaTxGenericTokenMetaMintInput";
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
  ERC20TokenMetaTxGenericTokenMetaPermitInput: {
    kind: "INPUT_OBJECT";
    name: "ERC20TokenMetaTxGenericTokenMetaPermitInput";
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
  ERC20TokenMetaTxGenericTokenMetaTransactionOutput: {
    kind: "OBJECT";
    name: "ERC20TokenMetaTxGenericTokenMetaTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  ERC20TokenMetaTxGenericTokenMetaTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "ERC20TokenMetaTxGenericTokenMetaTransactionReceiptOutput";
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
  ERC20TokenMetaTxGenericTokenMetaTransferFromInput: {
    kind: "INPUT_OBJECT";
    name: "ERC20TokenMetaTxGenericTokenMetaTransferFromInput";
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
  ERC20TokenMetaTxGenericTokenMetaTransferInput: {
    kind: "INPUT_OBJECT";
    name: "ERC20TokenMetaTxGenericTokenMetaTransferInput";
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
  ERC20TokenMetaTxGenericTokenMetaTransferOwnershipInput: {
    kind: "INPUT_OBJECT";
    name: "ERC20TokenMetaTxGenericTokenMetaTransferOwnershipInput";
    isOneOf: false;
    inputFields: [
      {
        name: "newOwner";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  ERC721TradingCardsMetaDog: {
    kind: "OBJECT";
    name: "ERC721TradingCardsMetaDog";
    fields: {
      MAX_PER_TX: { name: "MAX_PER_TX"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      MAX_SUPPLY: { name: "MAX_SUPPLY"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      PRICE_IN_WEI_PUBLIC: { name: "PRICE_IN_WEI_PUBLIC"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      PRICE_IN_WEI_WHITELIST: {
        name: "PRICE_IN_WEI_WHITELIST";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
      };
      RESERVES: { name: "RESERVES"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      ROYALTIES_IN_BASIS_POINTS: {
        name: "ROYALTIES_IN_BASIS_POINTS";
        type: { kind: "SCALAR"; name: "String"; ofType: null };
      };
      _proxyRegistryAddress: { name: "_proxyRegistryAddress"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      _whitelistMerkleRoot: { name: "_whitelistMerkleRoot"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      balanceOf: { name: "balanceOf"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      frozen: { name: "frozen"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      getAllowance: { name: "getAllowance"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      getApproved: { name: "getApproved"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      isApprovedForAll: { name: "isApprovedForAll"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      mintPaused: { name: "mintPaused"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      owner: { name: "owner"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      ownerOf: { name: "ownerOf"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      paused: { name: "paused"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      royaltyInfo: {
        name: "royaltyInfo";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogRoyaltyInfoOutput"; ofType: null };
      };
      supportsInterface: { name: "supportsInterface"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      symbol: { name: "symbol"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      tokenByIndex: { name: "tokenByIndex"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      tokenOfOwnerByIndex: { name: "tokenOfOwnerByIndex"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      tokenURI: { name: "tokenURI"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      totalSupply: { name: "totalSupply"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      wallet: { name: "wallet"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  ERC721TradingCardsMetaDogApproveInput: {
    kind: "INPUT_OBJECT";
    name: "ERC721TradingCardsMetaDogApproveInput";
    isOneOf: false;
    inputFields: [
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "tokenId";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  ERC721TradingCardsMetaDogBatchSafeTransferFromInput: {
    kind: "INPUT_OBJECT";
    name: "ERC721TradingCardsMetaDogBatchSafeTransferFromInput";
    isOneOf: false;
    inputFields: [
      {
        name: "_from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "_to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "_tokenIds";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
      {
        name: "data_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  ERC721TradingCardsMetaDogBatchTransferFromInput: {
    kind: "INPUT_OBJECT";
    name: "ERC721TradingCardsMetaDogBatchTransferFromInput";
    isOneOf: false;
    inputFields: [
      {
        name: "_from";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "_to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "_tokenIds";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
    ];
  };
  ERC721TradingCardsMetaDogBurnInput: {
    kind: "INPUT_OBJECT";
    name: "ERC721TradingCardsMetaDogBurnInput";
    isOneOf: false;
    inputFields: [
      {
        name: "tokenId";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  ERC721TradingCardsMetaDogFreezeTokenInput: {
    kind: "INPUT_OBJECT";
    name: "ERC721TradingCardsMetaDogFreezeTokenInput";
    isOneOf: false;
    inputFields: [
      {
        name: "tokenId";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  ERC721TradingCardsMetaDogGiftInput: {
    kind: "INPUT_OBJECT";
    name: "ERC721TradingCardsMetaDogGiftInput";
    isOneOf: false;
    inputFields: [
      {
        name: "recipients_";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
    ];
  };
  ERC721TradingCardsMetaDogPublicMintInput: {
    kind: "INPUT_OBJECT";
    name: "ERC721TradingCardsMetaDogPublicMintInput";
    isOneOf: false;
    inputFields: [
      {
        name: "count";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  ERC721TradingCardsMetaDogRoyaltyInfoOutput: {
    kind: "OBJECT";
    name: "ERC721TradingCardsMetaDogRoyaltyInfoOutput";
    fields: {
      address0: { name: "address0"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      uint2561: { name: "uint2561"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  ERC721TradingCardsMetaDogSafeTransferFromInput: {
    kind: "INPUT_OBJECT";
    name: "ERC721TradingCardsMetaDogSafeTransferFromInput";
    isOneOf: false;
    inputFields: [
      {
        name: "data";
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
      {
        name: "tokenId";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  ERC721TradingCardsMetaDogSetApprovalForAllInput: {
    kind: "INPUT_OBJECT";
    name: "ERC721TradingCardsMetaDogSetApprovalForAllInput";
    isOneOf: false;
    inputFields: [
      {
        name: "approved";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "operator";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  ERC721TradingCardsMetaDogSetBaseURIInput: {
    kind: "INPUT_OBJECT";
    name: "ERC721TradingCardsMetaDogSetBaseURIInput";
    isOneOf: false;
    inputFields: [
      {
        name: "baseTokenURI_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  ERC721TradingCardsMetaDogSetProxyRegistryAddressInput: {
    kind: "INPUT_OBJECT";
    name: "ERC721TradingCardsMetaDogSetProxyRegistryAddressInput";
    isOneOf: false;
    inputFields: [
      {
        name: "proxyRegistryAddress_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  ERC721TradingCardsMetaDogSetWhitelistMerkleRootInput: {
    kind: "INPUT_OBJECT";
    name: "ERC721TradingCardsMetaDogSetWhitelistMerkleRootInput";
    isOneOf: false;
    inputFields: [
      {
        name: "whitelistMerkleRoot_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  ERC721TradingCardsMetaDogTransactionOutput: {
    kind: "OBJECT";
    name: "ERC721TradingCardsMetaDogTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  ERC721TradingCardsMetaDogTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "ERC721TradingCardsMetaDogTransactionReceiptOutput";
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
  ERC721TradingCardsMetaDogTransferFromInput: {
    kind: "INPUT_OBJECT";
    name: "ERC721TradingCardsMetaDogTransferFromInput";
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
        name: "tokenId";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  ERC721TradingCardsMetaDogTransferOwnershipInput: {
    kind: "INPUT_OBJECT";
    name: "ERC721TradingCardsMetaDogTransferOwnershipInput";
    isOneOf: false;
    inputFields: [
      {
        name: "newOwner";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  ERC721TradingCardsMetaDogWhitelistMintInput: {
    kind: "INPUT_OBJECT";
    name: "ERC721TradingCardsMetaDogWhitelistMintInput";
    isOneOf: false;
    inputFields: [
      {
        name: "allowance";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "count";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "proof";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
    ];
  };
  EmptyCounter: {
    kind: "OBJECT";
    name: "EmptyCounter";
    fields: {
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      number: { name: "number"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  EmptyCounterSetNumberInput: {
    kind: "INPUT_OBJECT";
    name: "EmptyCounterSetNumberInput";
    isOneOf: false;
    inputFields: [
      {
        name: "newNumber";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  EmptyCounterTransactionOutput: {
    kind: "OBJECT";
    name: "EmptyCounterTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  EmptyCounterTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "EmptyCounterTransactionReceiptOutput";
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
  GenericERC20: {
    kind: "OBJECT";
    name: "GenericERC20";
    fields: {
      DOMAIN_SEPARATOR: { name: "DOMAIN_SEPARATOR"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      allowance: { name: "allowance"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      balanceOf: { name: "balanceOf"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      decimals: { name: "decimals"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      eip712Domain: {
        name: "eip712Domain";
        type: { kind: "OBJECT"; name: "GenericERC20Eip712DomainOutput"; ofType: null };
      };
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      nonces: { name: "nonces"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      owner: { name: "owner"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      paused: { name: "paused"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      symbol: { name: "symbol"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      totalSupply: { name: "totalSupply"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  GenericERC20ApproveInput: {
    kind: "INPUT_OBJECT";
    name: "GenericERC20ApproveInput";
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
  GenericERC20BurnFromInput: {
    kind: "INPUT_OBJECT";
    name: "GenericERC20BurnFromInput";
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
  GenericERC20BurnInput: {
    kind: "INPUT_OBJECT";
    name: "GenericERC20BurnInput";
    isOneOf: false;
    inputFields: [
      {
        name: "value";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  GenericERC20Eip712DomainOutput: {
    kind: "OBJECT";
    name: "GenericERC20Eip712DomainOutput";
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
  GenericERC20MintInput: {
    kind: "INPUT_OBJECT";
    name: "GenericERC20MintInput";
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
  GenericERC20PermitInput: {
    kind: "INPUT_OBJECT";
    name: "GenericERC20PermitInput";
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
  GenericERC20TransactionOutput: {
    kind: "OBJECT";
    name: "GenericERC20TransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  GenericERC20TransactionReceiptOutput: {
    kind: "OBJECT";
    name: "GenericERC20TransactionReceiptOutput";
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
  GenericERC20TransferFromInput: {
    kind: "INPUT_OBJECT";
    name: "GenericERC20TransferFromInput";
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
  GenericERC20TransferInput: {
    kind: "INPUT_OBJECT";
    name: "GenericERC20TransferInput";
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
  GenericERC20TransferOwnershipInput: {
    kind: "INPUT_OBJECT";
    name: "GenericERC20TransferOwnershipInput";
    isOneOf: false;
    inputFields: [
      {
        name: "newOwner";
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
      AirdropFactoryDeployLinearVestingAirdrop: {
        name: "AirdropFactoryDeployLinearVestingAirdrop";
        type: { kind: "OBJECT"; name: "AirdropFactoryTransactionOutput"; ofType: null };
      };
      AirdropFactoryDeployPushAirdrop: {
        name: "AirdropFactoryDeployPushAirdrop";
        type: { kind: "OBJECT"; name: "AirdropFactoryTransactionOutput"; ofType: null };
      };
      AirdropFactoryDeployStandardAirdrop: {
        name: "AirdropFactoryDeployStandardAirdrop";
        type: { kind: "OBJECT"; name: "AirdropFactoryTransactionOutput"; ofType: null };
      };
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
      DeployContractAirdropFactory: {
        name: "DeployContractAirdropFactory";
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
      DeployContractEAS: {
        name: "DeployContractEAS";
        type: { kind: "OBJECT"; name: "ContractDeploymentTransactionOutput"; ofType: null };
      };
      DeployContractEASSchemaRegistry: {
        name: "DeployContractEASSchemaRegistry";
        type: { kind: "OBJECT"; name: "ContractDeploymentTransactionOutput"; ofType: null };
      };
      DeployContractERC721TradingCardsMetaDog: {
        name: "DeployContractERC721TradingCardsMetaDog";
        type: { kind: "OBJECT"; name: "ContractDeploymentTransactionOutput"; ofType: null };
      };
      DeployContractEmptyCounter: {
        name: "DeployContractEmptyCounter";
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
      DeployContractGenericERC20: {
        name: "DeployContractGenericERC20";
        type: { kind: "OBJECT"; name: "ContractDeploymentTransactionOutput"; ofType: null };
      };
      DeployContractPushAirdrop: {
        name: "DeployContractPushAirdrop";
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
      DeployContractStandardAirdrop: {
        name: "DeployContractStandardAirdrop";
        type: { kind: "OBJECT"; name: "ContractDeploymentTransactionOutput"; ofType: null };
      };
      DeployContractVault: {
        name: "DeployContractVault";
        type: { kind: "OBJECT"; name: "ContractDeploymentTransactionOutput"; ofType: null };
      };
      DeployContractVaultFactory: {
        name: "DeployContractVaultFactory";
        type: { kind: "OBJECT"; name: "ContractDeploymentTransactionOutput"; ofType: null };
      };
      DeployContractVestingAirdrop: {
        name: "DeployContractVestingAirdrop";
        type: { kind: "OBJECT"; name: "ContractDeploymentTransactionOutput"; ofType: null };
      };
      DeployContractXvPSettlement: {
        name: "DeployContractXvPSettlement";
        type: { kind: "OBJECT"; name: "ContractDeploymentTransactionOutput"; ofType: null };
      };
      DeployContractXvPSettlementFactory: {
        name: "DeployContractXvPSettlementFactory";
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
      EASAttest: { name: "EASAttest"; type: { kind: "OBJECT"; name: "EASTransactionOutput"; ofType: null } };
      EASAttestByDelegation: {
        name: "EASAttestByDelegation";
        type: { kind: "OBJECT"; name: "EASTransactionOutput"; ofType: null };
      };
      EASIncreaseNonce: {
        name: "EASIncreaseNonce";
        type: { kind: "OBJECT"; name: "EASTransactionOutput"; ofType: null };
      };
      EASMultiAttest: { name: "EASMultiAttest"; type: { kind: "OBJECT"; name: "EASTransactionOutput"; ofType: null } };
      EASMultiAttestByDelegation: {
        name: "EASMultiAttestByDelegation";
        type: { kind: "OBJECT"; name: "EASTransactionOutput"; ofType: null };
      };
      EASMultiRevoke: { name: "EASMultiRevoke"; type: { kind: "OBJECT"; name: "EASTransactionOutput"; ofType: null } };
      EASMultiRevokeByDelegation: {
        name: "EASMultiRevokeByDelegation";
        type: { kind: "OBJECT"; name: "EASTransactionOutput"; ofType: null };
      };
      EASMultiRevokeOffchain: {
        name: "EASMultiRevokeOffchain";
        type: { kind: "OBJECT"; name: "EASTransactionOutput"; ofType: null };
      };
      EASMultiTimestamp: {
        name: "EASMultiTimestamp";
        type: { kind: "OBJECT"; name: "EASTransactionOutput"; ofType: null };
      };
      EASRevoke: { name: "EASRevoke"; type: { kind: "OBJECT"; name: "EASTransactionOutput"; ofType: null } };
      EASRevokeByDelegation: {
        name: "EASRevokeByDelegation";
        type: { kind: "OBJECT"; name: "EASTransactionOutput"; ofType: null };
      };
      EASRevokeOffchain: {
        name: "EASRevokeOffchain";
        type: { kind: "OBJECT"; name: "EASTransactionOutput"; ofType: null };
      };
      EASSchemaRegistryRegister: {
        name: "EASSchemaRegistryRegister";
        type: { kind: "OBJECT"; name: "EASSchemaRegistryTransactionOutput"; ofType: null };
      };
      EASTimestamp: { name: "EASTimestamp"; type: { kind: "OBJECT"; name: "EASTransactionOutput"; ofType: null } };
      ERC20TokenMetaTxForwarderExecute: {
        name: "ERC20TokenMetaTxForwarderExecute";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxForwarderTransactionOutput"; ofType: null };
      };
      ERC20TokenMetaTxForwarderExecuteBatch: {
        name: "ERC20TokenMetaTxForwarderExecuteBatch";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxForwarderTransactionOutput"; ofType: null };
      };
      ERC20TokenMetaTxGenericTokenMetaApprove: {
        name: "ERC20TokenMetaTxGenericTokenMetaApprove";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxGenericTokenMetaTransactionOutput"; ofType: null };
      };
      ERC20TokenMetaTxGenericTokenMetaBurn: {
        name: "ERC20TokenMetaTxGenericTokenMetaBurn";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxGenericTokenMetaTransactionOutput"; ofType: null };
      };
      ERC20TokenMetaTxGenericTokenMetaBurnFrom: {
        name: "ERC20TokenMetaTxGenericTokenMetaBurnFrom";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxGenericTokenMetaTransactionOutput"; ofType: null };
      };
      ERC20TokenMetaTxGenericTokenMetaMint: {
        name: "ERC20TokenMetaTxGenericTokenMetaMint";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxGenericTokenMetaTransactionOutput"; ofType: null };
      };
      ERC20TokenMetaTxGenericTokenMetaPause: {
        name: "ERC20TokenMetaTxGenericTokenMetaPause";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxGenericTokenMetaTransactionOutput"; ofType: null };
      };
      ERC20TokenMetaTxGenericTokenMetaPermit: {
        name: "ERC20TokenMetaTxGenericTokenMetaPermit";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxGenericTokenMetaTransactionOutput"; ofType: null };
      };
      ERC20TokenMetaTxGenericTokenMetaRenounceOwnership: {
        name: "ERC20TokenMetaTxGenericTokenMetaRenounceOwnership";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxGenericTokenMetaTransactionOutput"; ofType: null };
      };
      ERC20TokenMetaTxGenericTokenMetaTransfer: {
        name: "ERC20TokenMetaTxGenericTokenMetaTransfer";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxGenericTokenMetaTransactionOutput"; ofType: null };
      };
      ERC20TokenMetaTxGenericTokenMetaTransferFrom: {
        name: "ERC20TokenMetaTxGenericTokenMetaTransferFrom";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxGenericTokenMetaTransactionOutput"; ofType: null };
      };
      ERC20TokenMetaTxGenericTokenMetaTransferOwnership: {
        name: "ERC20TokenMetaTxGenericTokenMetaTransferOwnership";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxGenericTokenMetaTransactionOutput"; ofType: null };
      };
      ERC20TokenMetaTxGenericTokenMetaUnpause: {
        name: "ERC20TokenMetaTxGenericTokenMetaUnpause";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxGenericTokenMetaTransactionOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogApprove: {
        name: "ERC721TradingCardsMetaDogApprove";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogBatchSafeTransferFrom: {
        name: "ERC721TradingCardsMetaDogBatchSafeTransferFrom";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogBatchTransferFrom: {
        name: "ERC721TradingCardsMetaDogBatchTransferFrom";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogBurn: {
        name: "ERC721TradingCardsMetaDogBurn";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogCollectReserves: {
        name: "ERC721TradingCardsMetaDogCollectReserves";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogFreeze: {
        name: "ERC721TradingCardsMetaDogFreeze";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogFreezeAllTokens: {
        name: "ERC721TradingCardsMetaDogFreezeAllTokens";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogFreezeToken: {
        name: "ERC721TradingCardsMetaDogFreezeToken";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogGift: {
        name: "ERC721TradingCardsMetaDogGift";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogPause: {
        name: "ERC721TradingCardsMetaDogPause";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogPauseMint: {
        name: "ERC721TradingCardsMetaDogPauseMint";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogPublicMint: {
        name: "ERC721TradingCardsMetaDogPublicMint";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogRenounceOwnership: {
        name: "ERC721TradingCardsMetaDogRenounceOwnership";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogSafeTransferFrom: {
        name: "ERC721TradingCardsMetaDogSafeTransferFrom";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogSetApprovalForAll: {
        name: "ERC721TradingCardsMetaDogSetApprovalForAll";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogSetBaseURI: {
        name: "ERC721TradingCardsMetaDogSetBaseURI";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogSetProxyRegistryAddress: {
        name: "ERC721TradingCardsMetaDogSetProxyRegistryAddress";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogSetWhitelistMerkleRoot: {
        name: "ERC721TradingCardsMetaDogSetWhitelistMerkleRoot";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogStartPublicSale: {
        name: "ERC721TradingCardsMetaDogStartPublicSale";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogTransferFrom: {
        name: "ERC721TradingCardsMetaDogTransferFrom";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogTransferOwnership: {
        name: "ERC721TradingCardsMetaDogTransferOwnership";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogUnpause: {
        name: "ERC721TradingCardsMetaDogUnpause";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogUnpauseMint: {
        name: "ERC721TradingCardsMetaDogUnpauseMint";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogWhitelistMint: {
        name: "ERC721TradingCardsMetaDogWhitelistMint";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogWithdraw: {
        name: "ERC721TradingCardsMetaDogWithdraw";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionOutput"; ofType: null };
      };
      EmptyCounterIncrement: {
        name: "EmptyCounterIncrement";
        type: { kind: "OBJECT"; name: "EmptyCounterTransactionOutput"; ofType: null };
      };
      EmptyCounterSetNumber: {
        name: "EmptyCounterSetNumber";
        type: { kind: "OBJECT"; name: "EmptyCounterTransactionOutput"; ofType: null };
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
      GenericERC20Approve: {
        name: "GenericERC20Approve";
        type: { kind: "OBJECT"; name: "GenericERC20TransactionOutput"; ofType: null };
      };
      GenericERC20Burn: {
        name: "GenericERC20Burn";
        type: { kind: "OBJECT"; name: "GenericERC20TransactionOutput"; ofType: null };
      };
      GenericERC20BurnFrom: {
        name: "GenericERC20BurnFrom";
        type: { kind: "OBJECT"; name: "GenericERC20TransactionOutput"; ofType: null };
      };
      GenericERC20Mint: {
        name: "GenericERC20Mint";
        type: { kind: "OBJECT"; name: "GenericERC20TransactionOutput"; ofType: null };
      };
      GenericERC20Pause: {
        name: "GenericERC20Pause";
        type: { kind: "OBJECT"; name: "GenericERC20TransactionOutput"; ofType: null };
      };
      GenericERC20Permit: {
        name: "GenericERC20Permit";
        type: { kind: "OBJECT"; name: "GenericERC20TransactionOutput"; ofType: null };
      };
      GenericERC20RenounceOwnership: {
        name: "GenericERC20RenounceOwnership";
        type: { kind: "OBJECT"; name: "GenericERC20TransactionOutput"; ofType: null };
      };
      GenericERC20Transfer: {
        name: "GenericERC20Transfer";
        type: { kind: "OBJECT"; name: "GenericERC20TransactionOutput"; ofType: null };
      };
      GenericERC20TransferFrom: {
        name: "GenericERC20TransferFrom";
        type: { kind: "OBJECT"; name: "GenericERC20TransactionOutput"; ofType: null };
      };
      GenericERC20TransferOwnership: {
        name: "GenericERC20TransferOwnership";
        type: { kind: "OBJECT"; name: "GenericERC20TransactionOutput"; ofType: null };
      };
      GenericERC20Unpause: {
        name: "GenericERC20Unpause";
        type: { kind: "OBJECT"; name: "GenericERC20TransactionOutput"; ofType: null };
      };
      PushAirdropBatchDistribute: {
        name: "PushAirdropBatchDistribute";
        type: { kind: "OBJECT"; name: "PushAirdropTransactionOutput"; ofType: null };
      };
      PushAirdropDistribute: {
        name: "PushAirdropDistribute";
        type: { kind: "OBJECT"; name: "PushAirdropTransactionOutput"; ofType: null };
      };
      PushAirdropMarkAsDistributed: {
        name: "PushAirdropMarkAsDistributed";
        type: { kind: "OBJECT"; name: "PushAirdropTransactionOutput"; ofType: null };
      };
      PushAirdropRenounceOwnership: {
        name: "PushAirdropRenounceOwnership";
        type: { kind: "OBJECT"; name: "PushAirdropTransactionOutput"; ofType: null };
      };
      PushAirdropTransferOwnership: {
        name: "PushAirdropTransferOwnership";
        type: { kind: "OBJECT"; name: "PushAirdropTransactionOutput"; ofType: null };
      };
      PushAirdropUpdateDistributionCap: {
        name: "PushAirdropUpdateDistributionCap";
        type: { kind: "OBJECT"; name: "PushAirdropTransactionOutput"; ofType: null };
      };
      PushAirdropUpdateMerkleRoot: {
        name: "PushAirdropUpdateMerkleRoot";
        type: { kind: "OBJECT"; name: "PushAirdropTransactionOutput"; ofType: null };
      };
      PushAirdropWithdrawTokens: {
        name: "PushAirdropWithdrawTokens";
        type: { kind: "OBJECT"; name: "PushAirdropTransactionOutput"; ofType: null };
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
      StandardAirdropBatchClaim: {
        name: "StandardAirdropBatchClaim";
        type: { kind: "OBJECT"; name: "StandardAirdropTransactionOutput"; ofType: null };
      };
      StandardAirdropClaim: {
        name: "StandardAirdropClaim";
        type: { kind: "OBJECT"; name: "StandardAirdropTransactionOutput"; ofType: null };
      };
      StandardAirdropRenounceOwnership: {
        name: "StandardAirdropRenounceOwnership";
        type: { kind: "OBJECT"; name: "StandardAirdropTransactionOutput"; ofType: null };
      };
      StandardAirdropTransferOwnership: {
        name: "StandardAirdropTransferOwnership";
        type: { kind: "OBJECT"; name: "StandardAirdropTransactionOutput"; ofType: null };
      };
      StandardAirdropWithdrawTokens: {
        name: "StandardAirdropWithdrawTokens";
        type: { kind: "OBJECT"; name: "StandardAirdropTransactionOutput"; ofType: null };
      };
      VaultBatchConfirm: {
        name: "VaultBatchConfirm";
        type: { kind: "OBJECT"; name: "VaultTransactionOutput"; ofType: null };
      };
      VaultBatchSubmitContractCalls: {
        name: "VaultBatchSubmitContractCalls";
        type: { kind: "OBJECT"; name: "VaultTransactionOutput"; ofType: null };
      };
      VaultBatchSubmitERC20Transfers: {
        name: "VaultBatchSubmitERC20Transfers";
        type: { kind: "OBJECT"; name: "VaultTransactionOutput"; ofType: null };
      };
      VaultBatchSubmitTransactions: {
        name: "VaultBatchSubmitTransactions";
        type: { kind: "OBJECT"; name: "VaultTransactionOutput"; ofType: null };
      };
      VaultConfirm: { name: "VaultConfirm"; type: { kind: "OBJECT"; name: "VaultTransactionOutput"; ofType: null } };
      VaultFactoryCreate: {
        name: "VaultFactoryCreate";
        type: { kind: "OBJECT"; name: "VaultFactoryTransactionOutput"; ofType: null };
      };
      VaultGrantRole: {
        name: "VaultGrantRole";
        type: { kind: "OBJECT"; name: "VaultTransactionOutput"; ofType: null };
      };
      VaultPause: { name: "VaultPause"; type: { kind: "OBJECT"; name: "VaultTransactionOutput"; ofType: null } };
      VaultRenounceRole: {
        name: "VaultRenounceRole";
        type: { kind: "OBJECT"; name: "VaultTransactionOutput"; ofType: null };
      };
      VaultRevoke: { name: "VaultRevoke"; type: { kind: "OBJECT"; name: "VaultTransactionOutput"; ofType: null } };
      VaultRevokeRole: {
        name: "VaultRevokeRole";
        type: { kind: "OBJECT"; name: "VaultTransactionOutput"; ofType: null };
      };
      VaultSetRequirement: {
        name: "VaultSetRequirement";
        type: { kind: "OBJECT"; name: "VaultTransactionOutput"; ofType: null };
      };
      VaultSubmitContractCall: {
        name: "VaultSubmitContractCall";
        type: { kind: "OBJECT"; name: "VaultTransactionOutput"; ofType: null };
      };
      VaultSubmitERC20Transfer: {
        name: "VaultSubmitERC20Transfer";
        type: { kind: "OBJECT"; name: "VaultTransactionOutput"; ofType: null };
      };
      VaultSubmitTransaction: {
        name: "VaultSubmitTransaction";
        type: { kind: "OBJECT"; name: "VaultTransactionOutput"; ofType: null };
      };
      VaultUnpause: { name: "VaultUnpause"; type: { kind: "OBJECT"; name: "VaultTransactionOutput"; ofType: null } };
      VestingAirdropBatchClaim: {
        name: "VestingAirdropBatchClaim";
        type: { kind: "OBJECT"; name: "VestingAirdropTransactionOutput"; ofType: null };
      };
      VestingAirdropClaim: {
        name: "VestingAirdropClaim";
        type: { kind: "OBJECT"; name: "VestingAirdropTransactionOutput"; ofType: null };
      };
      VestingAirdropRenounceOwnership: {
        name: "VestingAirdropRenounceOwnership";
        type: { kind: "OBJECT"; name: "VestingAirdropTransactionOutput"; ofType: null };
      };
      VestingAirdropSetClaimStrategy: {
        name: "VestingAirdropSetClaimStrategy";
        type: { kind: "OBJECT"; name: "VestingAirdropTransactionOutput"; ofType: null };
      };
      VestingAirdropTransferOwnership: {
        name: "VestingAirdropTransferOwnership";
        type: { kind: "OBJECT"; name: "VestingAirdropTransactionOutput"; ofType: null };
      };
      VestingAirdropWithdrawTokens: {
        name: "VestingAirdropWithdrawTokens";
        type: { kind: "OBJECT"; name: "VestingAirdropTransactionOutput"; ofType: null };
      };
      XvPSettlementApprove: {
        name: "XvPSettlementApprove";
        type: { kind: "OBJECT"; name: "XvPSettlementTransactionOutput"; ofType: null };
      };
      XvPSettlementCancel: {
        name: "XvPSettlementCancel";
        type: { kind: "OBJECT"; name: "XvPSettlementTransactionOutput"; ofType: null };
      };
      XvPSettlementExecute: {
        name: "XvPSettlementExecute";
        type: { kind: "OBJECT"; name: "XvPSettlementTransactionOutput"; ofType: null };
      };
      XvPSettlementFactoryCreate: {
        name: "XvPSettlementFactoryCreate";
        type: { kind: "OBJECT"; name: "XvPSettlementFactoryTransactionOutput"; ofType: null };
      };
      XvPSettlementRevokeApproval: {
        name: "XvPSettlementRevokeApproval";
        type: { kind: "OBJECT"; name: "XvPSettlementTransactionOutput"; ofType: null };
      };
      createWallet: { name: "createWallet"; type: { kind: "OBJECT"; name: "CreateWalletOutput"; ofType: null } };
      createWalletVerification: {
        name: "createWalletVerification";
        type: { kind: "OBJECT"; name: "CreateWalletVerificationOutput"; ofType: null };
      };
      createWalletVerificationChallenge: {
        name: "createWalletVerificationChallenge";
        type: { kind: "OBJECT"; name: "VerificationChallenge"; ofType: null };
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
      verifyWalletVerificationChallengeById: {
        name: "verifyWalletVerificationChallengeById";
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
  PushAirdrop: {
    kind: "OBJECT";
    name: "PushAirdrop";
    fields: {
      MAX_BATCH_SIZE: { name: "MAX_BATCH_SIZE"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      distributed: { name: "distributed"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      distributionCap: { name: "distributionCap"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      isDistributed: { name: "isDistributed"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      isTrustedForwarder: { name: "isTrustedForwarder"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      merkleRoot: { name: "merkleRoot"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      owner: { name: "owner"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      token: { name: "token"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      totalDistributed: { name: "totalDistributed"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      trustedForwarder: { name: "trustedForwarder"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  PushAirdropBatchDistributeInput: {
    kind: "INPUT_OBJECT";
    name: "PushAirdropBatchDistributeInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amounts";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
      {
        name: "merkleProofs";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
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
        };
        defaultValue: null;
      },
      {
        name: "recipients";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
    ];
  };
  PushAirdropDistributeInput: {
    kind: "INPUT_OBJECT";
    name: "PushAirdropDistributeInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "merkleProof";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
      {
        name: "recipient";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  PushAirdropMarkAsDistributedInput: {
    kind: "INPUT_OBJECT";
    name: "PushAirdropMarkAsDistributedInput";
    isOneOf: false;
    inputFields: [
      {
        name: "recipients";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
    ];
  };
  PushAirdropTransactionOutput: {
    kind: "OBJECT";
    name: "PushAirdropTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  PushAirdropTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "PushAirdropTransactionReceiptOutput";
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
  PushAirdropTransferOwnershipInput: {
    kind: "INPUT_OBJECT";
    name: "PushAirdropTransferOwnershipInput";
    isOneOf: false;
    inputFields: [
      {
        name: "newOwner";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  PushAirdropUpdateDistributionCapInput: {
    kind: "INPUT_OBJECT";
    name: "PushAirdropUpdateDistributionCapInput";
    isOneOf: false;
    inputFields: [
      {
        name: "newCap";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  PushAirdropUpdateMerkleRootInput: {
    kind: "INPUT_OBJECT";
    name: "PushAirdropUpdateMerkleRootInput";
    isOneOf: false;
    inputFields: [
      {
        name: "newRoot";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  PushAirdropWithdrawTokensInput: {
    kind: "INPUT_OBJECT";
    name: "PushAirdropWithdrawTokensInput";
    isOneOf: false;
    inputFields: [
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  Query: {
    kind: "OBJECT";
    name: "Query";
    fields: {
      AirdropFactory: { name: "AirdropFactory"; type: { kind: "OBJECT"; name: "AirdropFactory"; ofType: null } };
      AirdropFactoryDeployLinearVestingAirdropReceipt: {
        name: "AirdropFactoryDeployLinearVestingAirdropReceipt";
        type: { kind: "OBJECT"; name: "AirdropFactoryTransactionReceiptOutput"; ofType: null };
      };
      AirdropFactoryDeployPushAirdropReceipt: {
        name: "AirdropFactoryDeployPushAirdropReceipt";
        type: { kind: "OBJECT"; name: "AirdropFactoryTransactionReceiptOutput"; ofType: null };
      };
      AirdropFactoryDeployStandardAirdropReceipt: {
        name: "AirdropFactoryDeployStandardAirdropReceipt";
        type: { kind: "OBJECT"; name: "AirdropFactoryTransactionReceiptOutput"; ofType: null };
      };
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
      EAS: { name: "EAS"; type: { kind: "OBJECT"; name: "EAS"; ofType: null } };
      EASAttestByDelegationReceipt: {
        name: "EASAttestByDelegationReceipt";
        type: { kind: "OBJECT"; name: "EASTransactionReceiptOutput"; ofType: null };
      };
      EASAttestReceipt: {
        name: "EASAttestReceipt";
        type: { kind: "OBJECT"; name: "EASTransactionReceiptOutput"; ofType: null };
      };
      EASIncreaseNonceReceipt: {
        name: "EASIncreaseNonceReceipt";
        type: { kind: "OBJECT"; name: "EASTransactionReceiptOutput"; ofType: null };
      };
      EASMultiAttestByDelegationReceipt: {
        name: "EASMultiAttestByDelegationReceipt";
        type: { kind: "OBJECT"; name: "EASTransactionReceiptOutput"; ofType: null };
      };
      EASMultiAttestReceipt: {
        name: "EASMultiAttestReceipt";
        type: { kind: "OBJECT"; name: "EASTransactionReceiptOutput"; ofType: null };
      };
      EASMultiRevokeByDelegationReceipt: {
        name: "EASMultiRevokeByDelegationReceipt";
        type: { kind: "OBJECT"; name: "EASTransactionReceiptOutput"; ofType: null };
      };
      EASMultiRevokeOffchainReceipt: {
        name: "EASMultiRevokeOffchainReceipt";
        type: { kind: "OBJECT"; name: "EASTransactionReceiptOutput"; ofType: null };
      };
      EASMultiRevokeReceipt: {
        name: "EASMultiRevokeReceipt";
        type: { kind: "OBJECT"; name: "EASTransactionReceiptOutput"; ofType: null };
      };
      EASMultiTimestampReceipt: {
        name: "EASMultiTimestampReceipt";
        type: { kind: "OBJECT"; name: "EASTransactionReceiptOutput"; ofType: null };
      };
      EASRevokeByDelegationReceipt: {
        name: "EASRevokeByDelegationReceipt";
        type: { kind: "OBJECT"; name: "EASTransactionReceiptOutput"; ofType: null };
      };
      EASRevokeOffchainReceipt: {
        name: "EASRevokeOffchainReceipt";
        type: { kind: "OBJECT"; name: "EASTransactionReceiptOutput"; ofType: null };
      };
      EASRevokeReceipt: {
        name: "EASRevokeReceipt";
        type: { kind: "OBJECT"; name: "EASTransactionReceiptOutput"; ofType: null };
      };
      EASSchemaRegistry: {
        name: "EASSchemaRegistry";
        type: { kind: "OBJECT"; name: "EASSchemaRegistry"; ofType: null };
      };
      EASSchemaRegistryRegisterReceipt: {
        name: "EASSchemaRegistryRegisterReceipt";
        type: { kind: "OBJECT"; name: "EASSchemaRegistryTransactionReceiptOutput"; ofType: null };
      };
      EASTimestampReceipt: {
        name: "EASTimestampReceipt";
        type: { kind: "OBJECT"; name: "EASTransactionReceiptOutput"; ofType: null };
      };
      ERC20TokenMetaTxForwarder: {
        name: "ERC20TokenMetaTxForwarder";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxForwarder"; ofType: null };
      };
      ERC20TokenMetaTxForwarderExecuteBatchReceipt: {
        name: "ERC20TokenMetaTxForwarderExecuteBatchReceipt";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxForwarderTransactionReceiptOutput"; ofType: null };
      };
      ERC20TokenMetaTxForwarderExecuteReceipt: {
        name: "ERC20TokenMetaTxForwarderExecuteReceipt";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxForwarderTransactionReceiptOutput"; ofType: null };
      };
      ERC20TokenMetaTxGenericTokenMeta: {
        name: "ERC20TokenMetaTxGenericTokenMeta";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxGenericTokenMeta"; ofType: null };
      };
      ERC20TokenMetaTxGenericTokenMetaApproveReceipt: {
        name: "ERC20TokenMetaTxGenericTokenMetaApproveReceipt";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxGenericTokenMetaTransactionReceiptOutput"; ofType: null };
      };
      ERC20TokenMetaTxGenericTokenMetaBurnFromReceipt: {
        name: "ERC20TokenMetaTxGenericTokenMetaBurnFromReceipt";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxGenericTokenMetaTransactionReceiptOutput"; ofType: null };
      };
      ERC20TokenMetaTxGenericTokenMetaBurnReceipt: {
        name: "ERC20TokenMetaTxGenericTokenMetaBurnReceipt";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxGenericTokenMetaTransactionReceiptOutput"; ofType: null };
      };
      ERC20TokenMetaTxGenericTokenMetaMintReceipt: {
        name: "ERC20TokenMetaTxGenericTokenMetaMintReceipt";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxGenericTokenMetaTransactionReceiptOutput"; ofType: null };
      };
      ERC20TokenMetaTxGenericTokenMetaPauseReceipt: {
        name: "ERC20TokenMetaTxGenericTokenMetaPauseReceipt";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxGenericTokenMetaTransactionReceiptOutput"; ofType: null };
      };
      ERC20TokenMetaTxGenericTokenMetaPermitReceipt: {
        name: "ERC20TokenMetaTxGenericTokenMetaPermitReceipt";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxGenericTokenMetaTransactionReceiptOutput"; ofType: null };
      };
      ERC20TokenMetaTxGenericTokenMetaRenounceOwnershipReceipt: {
        name: "ERC20TokenMetaTxGenericTokenMetaRenounceOwnershipReceipt";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxGenericTokenMetaTransactionReceiptOutput"; ofType: null };
      };
      ERC20TokenMetaTxGenericTokenMetaTransferFromReceipt: {
        name: "ERC20TokenMetaTxGenericTokenMetaTransferFromReceipt";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxGenericTokenMetaTransactionReceiptOutput"; ofType: null };
      };
      ERC20TokenMetaTxGenericTokenMetaTransferOwnershipReceipt: {
        name: "ERC20TokenMetaTxGenericTokenMetaTransferOwnershipReceipt";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxGenericTokenMetaTransactionReceiptOutput"; ofType: null };
      };
      ERC20TokenMetaTxGenericTokenMetaTransferReceipt: {
        name: "ERC20TokenMetaTxGenericTokenMetaTransferReceipt";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxGenericTokenMetaTransactionReceiptOutput"; ofType: null };
      };
      ERC20TokenMetaTxGenericTokenMetaUnpauseReceipt: {
        name: "ERC20TokenMetaTxGenericTokenMetaUnpauseReceipt";
        type: { kind: "OBJECT"; name: "ERC20TokenMetaTxGenericTokenMetaTransactionReceiptOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDog: {
        name: "ERC721TradingCardsMetaDog";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDog"; ofType: null };
      };
      ERC721TradingCardsMetaDogApproveReceipt: {
        name: "ERC721TradingCardsMetaDogApproveReceipt";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionReceiptOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogBatchSafeTransferFromReceipt: {
        name: "ERC721TradingCardsMetaDogBatchSafeTransferFromReceipt";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionReceiptOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogBatchTransferFromReceipt: {
        name: "ERC721TradingCardsMetaDogBatchTransferFromReceipt";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionReceiptOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogBurnReceipt: {
        name: "ERC721TradingCardsMetaDogBurnReceipt";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionReceiptOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogCollectReservesReceipt: {
        name: "ERC721TradingCardsMetaDogCollectReservesReceipt";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionReceiptOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogFreezeAllTokensReceipt: {
        name: "ERC721TradingCardsMetaDogFreezeAllTokensReceipt";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionReceiptOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogFreezeReceipt: {
        name: "ERC721TradingCardsMetaDogFreezeReceipt";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionReceiptOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogFreezeTokenReceipt: {
        name: "ERC721TradingCardsMetaDogFreezeTokenReceipt";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionReceiptOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogGiftReceipt: {
        name: "ERC721TradingCardsMetaDogGiftReceipt";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionReceiptOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogPauseMintReceipt: {
        name: "ERC721TradingCardsMetaDogPauseMintReceipt";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionReceiptOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogPauseReceipt: {
        name: "ERC721TradingCardsMetaDogPauseReceipt";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionReceiptOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogPublicMintReceipt: {
        name: "ERC721TradingCardsMetaDogPublicMintReceipt";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionReceiptOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogRenounceOwnershipReceipt: {
        name: "ERC721TradingCardsMetaDogRenounceOwnershipReceipt";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionReceiptOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogSafeTransferFromReceipt: {
        name: "ERC721TradingCardsMetaDogSafeTransferFromReceipt";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionReceiptOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogSetApprovalForAllReceipt: {
        name: "ERC721TradingCardsMetaDogSetApprovalForAllReceipt";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionReceiptOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogSetBaseURIReceipt: {
        name: "ERC721TradingCardsMetaDogSetBaseURIReceipt";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionReceiptOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogSetProxyRegistryAddressReceipt: {
        name: "ERC721TradingCardsMetaDogSetProxyRegistryAddressReceipt";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionReceiptOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogSetWhitelistMerkleRootReceipt: {
        name: "ERC721TradingCardsMetaDogSetWhitelistMerkleRootReceipt";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionReceiptOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogStartPublicSaleReceipt: {
        name: "ERC721TradingCardsMetaDogStartPublicSaleReceipt";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionReceiptOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogTransferFromReceipt: {
        name: "ERC721TradingCardsMetaDogTransferFromReceipt";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionReceiptOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogTransferOwnershipReceipt: {
        name: "ERC721TradingCardsMetaDogTransferOwnershipReceipt";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionReceiptOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogUnpauseMintReceipt: {
        name: "ERC721TradingCardsMetaDogUnpauseMintReceipt";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionReceiptOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogUnpauseReceipt: {
        name: "ERC721TradingCardsMetaDogUnpauseReceipt";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionReceiptOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogWhitelistMintReceipt: {
        name: "ERC721TradingCardsMetaDogWhitelistMintReceipt";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionReceiptOutput"; ofType: null };
      };
      ERC721TradingCardsMetaDogWithdrawReceipt: {
        name: "ERC721TradingCardsMetaDogWithdrawReceipt";
        type: { kind: "OBJECT"; name: "ERC721TradingCardsMetaDogTransactionReceiptOutput"; ofType: null };
      };
      EmptyCounter: { name: "EmptyCounter"; type: { kind: "OBJECT"; name: "EmptyCounter"; ofType: null } };
      EmptyCounterIncrementReceipt: {
        name: "EmptyCounterIncrementReceipt";
        type: { kind: "OBJECT"; name: "EmptyCounterTransactionReceiptOutput"; ofType: null };
      };
      EmptyCounterSetNumberReceipt: {
        name: "EmptyCounterSetNumberReceipt";
        type: { kind: "OBJECT"; name: "EmptyCounterTransactionReceiptOutput"; ofType: null };
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
      GenericERC20: { name: "GenericERC20"; type: { kind: "OBJECT"; name: "GenericERC20"; ofType: null } };
      GenericERC20ApproveReceipt: {
        name: "GenericERC20ApproveReceipt";
        type: { kind: "OBJECT"; name: "GenericERC20TransactionReceiptOutput"; ofType: null };
      };
      GenericERC20BurnFromReceipt: {
        name: "GenericERC20BurnFromReceipt";
        type: { kind: "OBJECT"; name: "GenericERC20TransactionReceiptOutput"; ofType: null };
      };
      GenericERC20BurnReceipt: {
        name: "GenericERC20BurnReceipt";
        type: { kind: "OBJECT"; name: "GenericERC20TransactionReceiptOutput"; ofType: null };
      };
      GenericERC20MintReceipt: {
        name: "GenericERC20MintReceipt";
        type: { kind: "OBJECT"; name: "GenericERC20TransactionReceiptOutput"; ofType: null };
      };
      GenericERC20PauseReceipt: {
        name: "GenericERC20PauseReceipt";
        type: { kind: "OBJECT"; name: "GenericERC20TransactionReceiptOutput"; ofType: null };
      };
      GenericERC20PermitReceipt: {
        name: "GenericERC20PermitReceipt";
        type: { kind: "OBJECT"; name: "GenericERC20TransactionReceiptOutput"; ofType: null };
      };
      GenericERC20RenounceOwnershipReceipt: {
        name: "GenericERC20RenounceOwnershipReceipt";
        type: { kind: "OBJECT"; name: "GenericERC20TransactionReceiptOutput"; ofType: null };
      };
      GenericERC20TransferFromReceipt: {
        name: "GenericERC20TransferFromReceipt";
        type: { kind: "OBJECT"; name: "GenericERC20TransactionReceiptOutput"; ofType: null };
      };
      GenericERC20TransferOwnershipReceipt: {
        name: "GenericERC20TransferOwnershipReceipt";
        type: { kind: "OBJECT"; name: "GenericERC20TransactionReceiptOutput"; ofType: null };
      };
      GenericERC20TransferReceipt: {
        name: "GenericERC20TransferReceipt";
        type: { kind: "OBJECT"; name: "GenericERC20TransactionReceiptOutput"; ofType: null };
      };
      GenericERC20UnpauseReceipt: {
        name: "GenericERC20UnpauseReceipt";
        type: { kind: "OBJECT"; name: "GenericERC20TransactionReceiptOutput"; ofType: null };
      };
      PushAirdrop: { name: "PushAirdrop"; type: { kind: "OBJECT"; name: "PushAirdrop"; ofType: null } };
      PushAirdropBatchDistributeReceipt: {
        name: "PushAirdropBatchDistributeReceipt";
        type: { kind: "OBJECT"; name: "PushAirdropTransactionReceiptOutput"; ofType: null };
      };
      PushAirdropDistributeReceipt: {
        name: "PushAirdropDistributeReceipt";
        type: { kind: "OBJECT"; name: "PushAirdropTransactionReceiptOutput"; ofType: null };
      };
      PushAirdropMarkAsDistributedReceipt: {
        name: "PushAirdropMarkAsDistributedReceipt";
        type: { kind: "OBJECT"; name: "PushAirdropTransactionReceiptOutput"; ofType: null };
      };
      PushAirdropRenounceOwnershipReceipt: {
        name: "PushAirdropRenounceOwnershipReceipt";
        type: { kind: "OBJECT"; name: "PushAirdropTransactionReceiptOutput"; ofType: null };
      };
      PushAirdropTransferOwnershipReceipt: {
        name: "PushAirdropTransferOwnershipReceipt";
        type: { kind: "OBJECT"; name: "PushAirdropTransactionReceiptOutput"; ofType: null };
      };
      PushAirdropUpdateDistributionCapReceipt: {
        name: "PushAirdropUpdateDistributionCapReceipt";
        type: { kind: "OBJECT"; name: "PushAirdropTransactionReceiptOutput"; ofType: null };
      };
      PushAirdropUpdateMerkleRootReceipt: {
        name: "PushAirdropUpdateMerkleRootReceipt";
        type: { kind: "OBJECT"; name: "PushAirdropTransactionReceiptOutput"; ofType: null };
      };
      PushAirdropWithdrawTokensReceipt: {
        name: "PushAirdropWithdrawTokensReceipt";
        type: { kind: "OBJECT"; name: "PushAirdropTransactionReceiptOutput"; ofType: null };
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
      StandardAirdrop: { name: "StandardAirdrop"; type: { kind: "OBJECT"; name: "StandardAirdrop"; ofType: null } };
      StandardAirdropBatchClaimReceipt: {
        name: "StandardAirdropBatchClaimReceipt";
        type: { kind: "OBJECT"; name: "StandardAirdropTransactionReceiptOutput"; ofType: null };
      };
      StandardAirdropClaimReceipt: {
        name: "StandardAirdropClaimReceipt";
        type: { kind: "OBJECT"; name: "StandardAirdropTransactionReceiptOutput"; ofType: null };
      };
      StandardAirdropRenounceOwnershipReceipt: {
        name: "StandardAirdropRenounceOwnershipReceipt";
        type: { kind: "OBJECT"; name: "StandardAirdropTransactionReceiptOutput"; ofType: null };
      };
      StandardAirdropTransferOwnershipReceipt: {
        name: "StandardAirdropTransferOwnershipReceipt";
        type: { kind: "OBJECT"; name: "StandardAirdropTransactionReceiptOutput"; ofType: null };
      };
      StandardAirdropWithdrawTokensReceipt: {
        name: "StandardAirdropWithdrawTokensReceipt";
        type: { kind: "OBJECT"; name: "StandardAirdropTransactionReceiptOutput"; ofType: null };
      };
      Vault: { name: "Vault"; type: { kind: "OBJECT"; name: "Vault"; ofType: null } };
      VaultBatchConfirmReceipt: {
        name: "VaultBatchConfirmReceipt";
        type: { kind: "OBJECT"; name: "VaultTransactionReceiptOutput"; ofType: null };
      };
      VaultBatchSubmitContractCallsReceipt: {
        name: "VaultBatchSubmitContractCallsReceipt";
        type: { kind: "OBJECT"; name: "VaultTransactionReceiptOutput"; ofType: null };
      };
      VaultBatchSubmitERC20TransfersReceipt: {
        name: "VaultBatchSubmitERC20TransfersReceipt";
        type: { kind: "OBJECT"; name: "VaultTransactionReceiptOutput"; ofType: null };
      };
      VaultBatchSubmitTransactionsReceipt: {
        name: "VaultBatchSubmitTransactionsReceipt";
        type: { kind: "OBJECT"; name: "VaultTransactionReceiptOutput"; ofType: null };
      };
      VaultConfirmReceipt: {
        name: "VaultConfirmReceipt";
        type: { kind: "OBJECT"; name: "VaultTransactionReceiptOutput"; ofType: null };
      };
      VaultFactory: { name: "VaultFactory"; type: { kind: "OBJECT"; name: "VaultFactory"; ofType: null } };
      VaultFactoryCreateReceipt: {
        name: "VaultFactoryCreateReceipt";
        type: { kind: "OBJECT"; name: "VaultFactoryTransactionReceiptOutput"; ofType: null };
      };
      VaultGrantRoleReceipt: {
        name: "VaultGrantRoleReceipt";
        type: { kind: "OBJECT"; name: "VaultTransactionReceiptOutput"; ofType: null };
      };
      VaultPauseReceipt: {
        name: "VaultPauseReceipt";
        type: { kind: "OBJECT"; name: "VaultTransactionReceiptOutput"; ofType: null };
      };
      VaultRenounceRoleReceipt: {
        name: "VaultRenounceRoleReceipt";
        type: { kind: "OBJECT"; name: "VaultTransactionReceiptOutput"; ofType: null };
      };
      VaultRevokeReceipt: {
        name: "VaultRevokeReceipt";
        type: { kind: "OBJECT"; name: "VaultTransactionReceiptOutput"; ofType: null };
      };
      VaultRevokeRoleReceipt: {
        name: "VaultRevokeRoleReceipt";
        type: { kind: "OBJECT"; name: "VaultTransactionReceiptOutput"; ofType: null };
      };
      VaultSetRequirementReceipt: {
        name: "VaultSetRequirementReceipt";
        type: { kind: "OBJECT"; name: "VaultTransactionReceiptOutput"; ofType: null };
      };
      VaultSubmitContractCallReceipt: {
        name: "VaultSubmitContractCallReceipt";
        type: { kind: "OBJECT"; name: "VaultTransactionReceiptOutput"; ofType: null };
      };
      VaultSubmitERC20TransferReceipt: {
        name: "VaultSubmitERC20TransferReceipt";
        type: { kind: "OBJECT"; name: "VaultTransactionReceiptOutput"; ofType: null };
      };
      VaultSubmitTransactionReceipt: {
        name: "VaultSubmitTransactionReceipt";
        type: { kind: "OBJECT"; name: "VaultTransactionReceiptOutput"; ofType: null };
      };
      VaultUnpauseReceipt: {
        name: "VaultUnpauseReceipt";
        type: { kind: "OBJECT"; name: "VaultTransactionReceiptOutput"; ofType: null };
      };
      VestingAirdrop: { name: "VestingAirdrop"; type: { kind: "OBJECT"; name: "VestingAirdrop"; ofType: null } };
      VestingAirdropBatchClaimReceipt: {
        name: "VestingAirdropBatchClaimReceipt";
        type: { kind: "OBJECT"; name: "VestingAirdropTransactionReceiptOutput"; ofType: null };
      };
      VestingAirdropClaimReceipt: {
        name: "VestingAirdropClaimReceipt";
        type: { kind: "OBJECT"; name: "VestingAirdropTransactionReceiptOutput"; ofType: null };
      };
      VestingAirdropRenounceOwnershipReceipt: {
        name: "VestingAirdropRenounceOwnershipReceipt";
        type: { kind: "OBJECT"; name: "VestingAirdropTransactionReceiptOutput"; ofType: null };
      };
      VestingAirdropSetClaimStrategyReceipt: {
        name: "VestingAirdropSetClaimStrategyReceipt";
        type: { kind: "OBJECT"; name: "VestingAirdropTransactionReceiptOutput"; ofType: null };
      };
      VestingAirdropTransferOwnershipReceipt: {
        name: "VestingAirdropTransferOwnershipReceipt";
        type: { kind: "OBJECT"; name: "VestingAirdropTransactionReceiptOutput"; ofType: null };
      };
      VestingAirdropWithdrawTokensReceipt: {
        name: "VestingAirdropWithdrawTokensReceipt";
        type: { kind: "OBJECT"; name: "VestingAirdropTransactionReceiptOutput"; ofType: null };
      };
      XvPSettlement: { name: "XvPSettlement"; type: { kind: "OBJECT"; name: "XvPSettlement"; ofType: null } };
      XvPSettlementApproveReceipt: {
        name: "XvPSettlementApproveReceipt";
        type: { kind: "OBJECT"; name: "XvPSettlementTransactionReceiptOutput"; ofType: null };
      };
      XvPSettlementCancelReceipt: {
        name: "XvPSettlementCancelReceipt";
        type: { kind: "OBJECT"; name: "XvPSettlementTransactionReceiptOutput"; ofType: null };
      };
      XvPSettlementExecuteReceipt: {
        name: "XvPSettlementExecuteReceipt";
        type: { kind: "OBJECT"; name: "XvPSettlementTransactionReceiptOutput"; ofType: null };
      };
      XvPSettlementFactory: {
        name: "XvPSettlementFactory";
        type: { kind: "OBJECT"; name: "XvPSettlementFactory"; ofType: null };
      };
      XvPSettlementFactoryCreateReceipt: {
        name: "XvPSettlementFactoryCreateReceipt";
        type: { kind: "OBJECT"; name: "XvPSettlementFactoryTransactionReceiptOutput"; ofType: null };
      };
      XvPSettlementRevokeApprovalReceipt: {
        name: "XvPSettlementRevokeApprovalReceipt";
        type: { kind: "OBJECT"; name: "XvPSettlementTransactionReceiptOutput"; ofType: null };
      };
      getContracts: { name: "getContracts"; type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null } };
      getContractsAirdropFactory: {
        name: "getContractsAirdropFactory";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
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
      getContractsDeployStatus: {
        name: "getContractsDeployStatus";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusAirdropFactory: {
        name: "getContractsDeployStatusAirdropFactory";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusBond: {
        name: "getContractsDeployStatusBond";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusBondFactory: {
        name: "getContractsDeployStatusBondFactory";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusCryptoCurrency: {
        name: "getContractsDeployStatusCryptoCurrency";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusCryptoCurrencyFactory: {
        name: "getContractsDeployStatusCryptoCurrencyFactory";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusDeposit: {
        name: "getContractsDeployStatusDeposit";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusDepositFactory: {
        name: "getContractsDeployStatusDepositFactory";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusEas: {
        name: "getContractsDeployStatusEas";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusEasSchemaRegistry: {
        name: "getContractsDeployStatusEasSchemaRegistry";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusEmptyCounter: {
        name: "getContractsDeployStatusEmptyCounter";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusEquity: {
        name: "getContractsDeployStatusEquity";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusEquityFactory: {
        name: "getContractsDeployStatusEquityFactory";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusErc20TokenMetaTxForwarder: {
        name: "getContractsDeployStatusErc20TokenMetaTxForwarder";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusErc20TokenMetaTxGenericTokenMeta: {
        name: "getContractsDeployStatusErc20TokenMetaTxGenericTokenMeta";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusErc721TradingCardsMetaDog: {
        name: "getContractsDeployStatusErc721TradingCardsMetaDog";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusFixedYield: {
        name: "getContractsDeployStatusFixedYield";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusFixedYieldFactory: {
        name: "getContractsDeployStatusFixedYieldFactory";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusForwarder: {
        name: "getContractsDeployStatusForwarder";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusFund: {
        name: "getContractsDeployStatusFund";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusFundFactory: {
        name: "getContractsDeployStatusFundFactory";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusGenericErc20: {
        name: "getContractsDeployStatusGenericErc20";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusPushAirdrop: {
        name: "getContractsDeployStatusPushAirdrop";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusStableCoin: {
        name: "getContractsDeployStatusStableCoin";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusStableCoinFactory: {
        name: "getContractsDeployStatusStableCoinFactory";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusStandardAirdrop: {
        name: "getContractsDeployStatusStandardAirdrop";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusVault: {
        name: "getContractsDeployStatusVault";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusVaultFactory: {
        name: "getContractsDeployStatusVaultFactory";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusVestingAirdrop: {
        name: "getContractsDeployStatusVestingAirdrop";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusXvPSettlement: {
        name: "getContractsDeployStatusXvPSettlement";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusXvPSettlementFactory: {
        name: "getContractsDeployStatusXvPSettlementFactory";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeposit: {
        name: "getContractsDeposit";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsDepositFactory: {
        name: "getContractsDepositFactory";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsEas: {
        name: "getContractsEas";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsEasSchemaRegistry: {
        name: "getContractsEasSchemaRegistry";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsEmptyCounter: {
        name: "getContractsEmptyCounter";
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
      getContractsErc20TokenMetaTxForwarder: {
        name: "getContractsErc20TokenMetaTxForwarder";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsErc20TokenMetaTxGenericTokenMeta: {
        name: "getContractsErc20TokenMetaTxGenericTokenMeta";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsErc721TradingCardsMetaDog: {
        name: "getContractsErc721TradingCardsMetaDog";
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
      getContractsGenericErc20: {
        name: "getContractsGenericErc20";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsPushAirdrop: {
        name: "getContractsPushAirdrop";
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
      getContractsStandardAirdrop: {
        name: "getContractsStandardAirdrop";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsVault: {
        name: "getContractsVault";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsVaultFactory: {
        name: "getContractsVaultFactory";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsVestingAirdrop: {
        name: "getContractsVestingAirdrop";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsXvPSettlement: {
        name: "getContractsXvPSettlement";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsXvPSettlementFactory: {
        name: "getContractsXvPSettlementFactory";
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
  StandardAirdrop: {
    kind: "OBJECT";
    name: "StandardAirdrop";
    fields: {
      endTime: { name: "endTime"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      isClaimed: { name: "isClaimed"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      isTrustedForwarder: { name: "isTrustedForwarder"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      merkleRoot: { name: "merkleRoot"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      owner: { name: "owner"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      startTime: { name: "startTime"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      token: { name: "token"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      trustedForwarder: { name: "trustedForwarder"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  StandardAirdropBatchClaimInput: {
    kind: "INPUT_OBJECT";
    name: "StandardAirdropBatchClaimInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amounts";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
      {
        name: "indices";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
      {
        name: "merkleProofs";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
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
        };
        defaultValue: null;
      },
    ];
  };
  StandardAirdropClaimInput: {
    kind: "INPUT_OBJECT";
    name: "StandardAirdropClaimInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "index";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "merkleProof";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
    ];
  };
  StandardAirdropTransactionOutput: {
    kind: "OBJECT";
    name: "StandardAirdropTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  StandardAirdropTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "StandardAirdropTransactionReceiptOutput";
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
  StandardAirdropTransferOwnershipInput: {
    kind: "INPUT_OBJECT";
    name: "StandardAirdropTransferOwnershipInput";
    isOneOf: false;
    inputFields: [
      {
        name: "newOwner";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  StandardAirdropWithdrawTokensInput: {
    kind: "INPUT_OBJECT";
    name: "StandardAirdropWithdrawTokensInput";
    isOneOf: false;
    inputFields: [
      {
        name: "to";
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
      getContractsDeployStatus: {
        name: "getContractsDeployStatus";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusAirdropFactory: {
        name: "getContractsDeployStatusAirdropFactory";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusBond: {
        name: "getContractsDeployStatusBond";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusBondFactory: {
        name: "getContractsDeployStatusBondFactory";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusCryptoCurrency: {
        name: "getContractsDeployStatusCryptoCurrency";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusCryptoCurrencyFactory: {
        name: "getContractsDeployStatusCryptoCurrencyFactory";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusDeposit: {
        name: "getContractsDeployStatusDeposit";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusDepositFactory: {
        name: "getContractsDeployStatusDepositFactory";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusEas: {
        name: "getContractsDeployStatusEas";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusEasSchemaRegistry: {
        name: "getContractsDeployStatusEasSchemaRegistry";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusEmptyCounter: {
        name: "getContractsDeployStatusEmptyCounter";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusEquity: {
        name: "getContractsDeployStatusEquity";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusEquityFactory: {
        name: "getContractsDeployStatusEquityFactory";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusErc20TokenMetaTxForwarder: {
        name: "getContractsDeployStatusErc20TokenMetaTxForwarder";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusErc20TokenMetaTxGenericTokenMeta: {
        name: "getContractsDeployStatusErc20TokenMetaTxGenericTokenMeta";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusErc721TradingCardsMetaDog: {
        name: "getContractsDeployStatusErc721TradingCardsMetaDog";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusFixedYield: {
        name: "getContractsDeployStatusFixedYield";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusFixedYieldFactory: {
        name: "getContractsDeployStatusFixedYieldFactory";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusForwarder: {
        name: "getContractsDeployStatusForwarder";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusFund: {
        name: "getContractsDeployStatusFund";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusFundFactory: {
        name: "getContractsDeployStatusFundFactory";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusGenericErc20: {
        name: "getContractsDeployStatusGenericErc20";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusPushAirdrop: {
        name: "getContractsDeployStatusPushAirdrop";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusStableCoin: {
        name: "getContractsDeployStatusStableCoin";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusStableCoinFactory: {
        name: "getContractsDeployStatusStableCoinFactory";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusStandardAirdrop: {
        name: "getContractsDeployStatusStandardAirdrop";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusVault: {
        name: "getContractsDeployStatusVault";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusVaultFactory: {
        name: "getContractsDeployStatusVaultFactory";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusVestingAirdrop: {
        name: "getContractsDeployStatusVestingAirdrop";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusXvPSettlement: {
        name: "getContractsDeployStatusXvPSettlement";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
      };
      getContractsDeployStatusXvPSettlementFactory: {
        name: "getContractsDeployStatusXvPSettlementFactory";
        type: { kind: "OBJECT"; name: "ContractsDeployStatusPaginatedOutput"; ofType: null };
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
  Vault: {
    kind: "OBJECT";
    name: "Vault";
    fields: {
      DEFAULT_ADMIN_ROLE: { name: "DEFAULT_ADMIN_ROLE"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      SIGNER_ROLE: { name: "SIGNER_ROLE"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      confirmations: { name: "confirmations"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      getConfirmers: {
        name: "getConfirmers";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
      };
      getRoleAdmin: { name: "getRoleAdmin"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      getRoleMember: { name: "getRoleMember"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      getRoleMemberCount: { name: "getRoleMemberCount"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      getRoleMembers: {
        name: "getRoleMembers";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
      };
      hasConfirmed: { name: "hasConfirmed"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      hasRole: { name: "hasRole"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      isTrustedForwarder: { name: "isTrustedForwarder"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      paused: { name: "paused"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      required: { name: "required"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      requirement: { name: "requirement"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      signers: { name: "signers"; type: { kind: "OBJECT"; name: "VaultSignersOutput"; ofType: null } };
      supportsInterface: { name: "supportsInterface"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      transaction: {
        name: "transaction";
        type: { kind: "OBJECT"; name: "VaultTuple0TransactionOutput"; ofType: null };
      };
      transactions: { name: "transactions"; type: { kind: "OBJECT"; name: "VaultTransactionsOutput"; ofType: null } };
      trustedForwarder: { name: "trustedForwarder"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  VaultBatchConfirmInput: {
    kind: "INPUT_OBJECT";
    name: "VaultBatchConfirmInput";
    isOneOf: false;
    inputFields: [
      {
        name: "txIndices";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
    ];
  };
  VaultBatchSubmitContractCallsInput: {
    kind: "INPUT_OBJECT";
    name: "VaultBatchSubmitContractCallsInput";
    isOneOf: false;
    inputFields: [
      {
        name: "abiEncodedArguments";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
      {
        name: "comments";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
      {
        name: "selectors";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
      {
        name: "targets";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
      {
        name: "values";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
    ];
  };
  VaultBatchSubmitERC20TransfersInput: {
    kind: "INPUT_OBJECT";
    name: "VaultBatchSubmitERC20TransfersInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amounts";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
      {
        name: "comments";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
      {
        name: "to";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
      {
        name: "tokens";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
    ];
  };
  VaultBatchSubmitTransactionsInput: {
    kind: "INPUT_OBJECT";
    name: "VaultBatchSubmitTransactionsInput";
    isOneOf: false;
    inputFields: [
      {
        name: "comments";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
      {
        name: "data";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
      {
        name: "to";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
      {
        name: "value";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
    ];
  };
  VaultConfirmInput: {
    kind: "INPUT_OBJECT";
    name: "VaultConfirmInput";
    isOneOf: false;
    inputFields: [
      {
        name: "txIndex";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  VaultFactory: {
    kind: "OBJECT";
    name: "VaultFactory";
    fields: {
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      isAddressDeployed: { name: "isAddressDeployed"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      isFactoryVault: { name: "isFactoryVault"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      isTrustedForwarder: { name: "isTrustedForwarder"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      predictAddress: {
        name: "predictAddress";
        type: { kind: "OBJECT"; name: "VaultFactoryPredictAddressOutput"; ofType: null };
      };
      trustedForwarder: { name: "trustedForwarder"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  VaultFactoryCreateInput: {
    kind: "INPUT_OBJECT";
    name: "VaultFactoryCreateInput";
    isOneOf: false;
    inputFields: [
      {
        name: "required";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "signers";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
    ];
  };
  VaultFactoryPredictAddressOutput: {
    kind: "OBJECT";
    name: "VaultFactoryPredictAddressOutput";
    fields: { predicted: { name: "predicted"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  VaultFactoryTransactionOutput: {
    kind: "OBJECT";
    name: "VaultFactoryTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  VaultFactoryTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "VaultFactoryTransactionReceiptOutput";
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
  VaultGrantRoleInput: {
    kind: "INPUT_OBJECT";
    name: "VaultGrantRoleInput";
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
  VaultRenounceRoleInput: {
    kind: "INPUT_OBJECT";
    name: "VaultRenounceRoleInput";
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
  VaultRevokeInput: {
    kind: "INPUT_OBJECT";
    name: "VaultRevokeInput";
    isOneOf: false;
    inputFields: [
      {
        name: "txIndex";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  VaultRevokeRoleInput: {
    kind: "INPUT_OBJECT";
    name: "VaultRevokeRoleInput";
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
  VaultSetRequirementInput: {
    kind: "INPUT_OBJECT";
    name: "VaultSetRequirementInput";
    isOneOf: false;
    inputFields: [
      {
        name: "_required";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  VaultSignersOutput: {
    kind: "OBJECT";
    name: "VaultSignersOutput";
    fields: {
      signers_: {
        name: "signers_";
        type: {
          kind: "LIST";
          name: never;
          ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        };
      };
    };
  };
  VaultSubmitContractCallInput: {
    kind: "INPUT_OBJECT";
    name: "VaultSubmitContractCallInput";
    isOneOf: false;
    inputFields: [
      {
        name: "abiEncodedArguments";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "comment";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "selector";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "target";
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
  VaultSubmitERC20TransferInput: {
    kind: "INPUT_OBJECT";
    name: "VaultSubmitERC20TransferInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "comment";
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
  VaultSubmitTransactionInput: {
    kind: "INPUT_OBJECT";
    name: "VaultSubmitTransactionInput";
    isOneOf: false;
    inputFields: [
      {
        name: "comment";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "data";
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
  VaultTransactionOutput: {
    kind: "OBJECT";
    name: "VaultTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  VaultTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "VaultTransactionReceiptOutput";
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
  VaultTransactionsOutput: {
    kind: "OBJECT";
    name: "VaultTransactionsOutput";
    fields: {
      comment: { name: "comment"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      data: { name: "data"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      executed: { name: "executed"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      numConfirmations: { name: "numConfirmations"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      to: { name: "to"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      value: { name: "value"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  VaultTuple0TransactionOutput: {
    kind: "OBJECT";
    name: "VaultTuple0TransactionOutput";
    fields: {
      comment: { name: "comment"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      data: { name: "data"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      executed: { name: "executed"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      numConfirmations: { name: "numConfirmations"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      to: { name: "to"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      value: { name: "value"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  VerificationChallenge: {
    kind: "OBJECT";
    name: "VerificationChallenge";
    fields: {
      challenge: { name: "challenge"; type: { kind: "OBJECT"; name: "VerificationChallengeData"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      verificationId: { name: "verificationId"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      verificationType: {
        name: "verificationType";
        type: { kind: "ENUM"; name: "WalletVerificationType"; ofType: null };
      };
    };
  };
  VerificationChallengeData: {
    kind: "OBJECT";
    name: "VerificationChallengeData";
    fields: {
      salt: { name: "salt"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      secret: { name: "secret"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  VerifyWalletVerificationChallengeOutput: {
    kind: "OBJECT";
    name: "VerifyWalletVerificationChallengeOutput";
    fields: { verified: { name: "verified"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } } };
  };
  VestingAirdrop: {
    kind: "OBJECT";
    name: "VestingAirdrop";
    fields: {
      claimPeriodEnd: { name: "claimPeriodEnd"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      claimStrategy: { name: "claimStrategy"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      isClaimed: { name: "isClaimed"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      isTrustedForwarder: { name: "isTrustedForwarder"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      merkleRoot: { name: "merkleRoot"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      owner: { name: "owner"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      token: { name: "token"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      trustedForwarder: { name: "trustedForwarder"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  VestingAirdropBatchClaimInput: {
    kind: "INPUT_OBJECT";
    name: "VestingAirdropBatchClaimInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amounts";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
      {
        name: "indices";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
      {
        name: "merkleProofs";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
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
        };
        defaultValue: null;
      },
    ];
  };
  VestingAirdropClaimInput: {
    kind: "INPUT_OBJECT";
    name: "VestingAirdropClaimInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "index";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "merkleProof";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
        defaultValue: null;
      },
    ];
  };
  VestingAirdropSetClaimStrategyInput: {
    kind: "INPUT_OBJECT";
    name: "VestingAirdropSetClaimStrategyInput";
    isOneOf: false;
    inputFields: [
      {
        name: "newStrategy";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  VestingAirdropTransactionOutput: {
    kind: "OBJECT";
    name: "VestingAirdropTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  VestingAirdropTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "VestingAirdropTransactionReceiptOutput";
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
  VestingAirdropTransferOwnershipInput: {
    kind: "INPUT_OBJECT";
    name: "VestingAirdropTransferOwnershipInput";
    isOneOf: false;
    inputFields: [
      {
        name: "newOwner";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  VestingAirdropWithdrawTokensInput: {
    kind: "INPUT_OBJECT";
    name: "VestingAirdropWithdrawTokensInput";
    isOneOf: false;
    inputFields: [
      {
        name: "to";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
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
  XvPSettlement: {
    kind: "OBJECT";
    name: "XvPSettlement";
    fields: {
      approvals: { name: "approvals"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      autoExecute: { name: "autoExecute"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      cancelled: { name: "cancelled"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      createdAt: { name: "createdAt"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      cutoffDate: { name: "cutoffDate"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      executed: { name: "executed"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      flows: {
        name: "flows";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "OBJECT"; name: "XvPSettlementTuple0FlowsOutput"; ofType: null };
          };
        };
      };
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      isFullyApproved: { name: "isFullyApproved"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      isTrustedForwarder: { name: "isTrustedForwarder"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      trustedForwarder: { name: "trustedForwarder"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  XvPSettlementDeployContractXvPSettlementSettlementFlowsInput: {
    kind: "INPUT_OBJECT";
    name: "XvPSettlementDeployContractXvPSettlementSettlementFlowsInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "asset";
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
  XvPSettlementFactory: {
    kind: "OBJECT";
    name: "XvPSettlementFactory";
    fields: {
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      isAddressDeployed: { name: "isAddressDeployed"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      isFactoryContract: { name: "isFactoryContract"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      isTrustedForwarder: { name: "isTrustedForwarder"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
      predictAddress: {
        name: "predictAddress";
        type: { kind: "OBJECT"; name: "XvPSettlementFactoryPredictAddressOutput"; ofType: null };
      };
      trustedForwarder: { name: "trustedForwarder"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  XvPSettlementFactoryCreateInput: {
    kind: "INPUT_OBJECT";
    name: "XvPSettlementFactoryCreateInput";
    isOneOf: false;
    inputFields: [
      {
        name: "autoExecute";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "Boolean"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "cutoffDate";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "flows";
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: {
              kind: "NON_NULL";
              name: never;
              ofType: {
                kind: "INPUT_OBJECT";
                name: "XvPSettlementFactoryXvPSettlementFactoryCreateFlowsInput";
                ofType: null;
              };
            };
          };
        };
        defaultValue: null;
      },
    ];
  };
  XvPSettlementFactoryPredictAddressFlowsInput: {
    kind: "INPUT_OBJECT";
    name: "XvPSettlementFactoryPredictAddressFlowsInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "asset";
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
  XvPSettlementFactoryPredictAddressOutput: {
    kind: "OBJECT";
    name: "XvPSettlementFactoryPredictAddressOutput";
    fields: { predicted: { name: "predicted"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  XvPSettlementFactoryTransactionOutput: {
    kind: "OBJECT";
    name: "XvPSettlementFactoryTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  XvPSettlementFactoryTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "XvPSettlementFactoryTransactionReceiptOutput";
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
  XvPSettlementFactoryXvPSettlementFactoryCreateFlowsInput: {
    kind: "INPUT_OBJECT";
    name: "XvPSettlementFactoryXvPSettlementFactoryCreateFlowsInput";
    isOneOf: false;
    inputFields: [
      {
        name: "amount";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "asset";
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
  XvPSettlementTransactionOutput: {
    kind: "OBJECT";
    name: "XvPSettlementTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  XvPSettlementTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "XvPSettlementTransactionReceiptOutput";
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
  XvPSettlementTuple0FlowsOutput: {
    kind: "OBJECT";
    name: "XvPSettlementTuple0FlowsOutput";
    fields: {
      amount: { name: "amount"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      asset: { name: "asset"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      from: { name: "from"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      to: { name: "to"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
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
  name: "portaltest";
  query: "Query";
  mutation: "Mutation";
  subscription: "Subscription";
  types: introspection_types;
};
