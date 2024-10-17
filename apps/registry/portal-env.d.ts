/* eslint-disable */
/* prettier-ignore */

export type introspection_types = {
  Boolean: unknown;
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
  ID: unknown;
  Int: unknown;
  JSON: unknown;
  Mutation: {
    kind: "OBJECT";
    name: "Mutation";
    fields: {
      StarterKitERC20Approve: {
        name: "StarterKitERC20Approve";
        type: { kind: "OBJECT"; name: "StarterKitERC20TransactionOutput"; ofType: null };
      };
      StarterKitERC20FactoryCreateToken: {
        name: "StarterKitERC20FactoryCreateToken";
        type: { kind: "OBJECT"; name: "StarterKitERC20FactoryTransactionOutput"; ofType: null };
      };
      StarterKitERC20Mint: {
        name: "StarterKitERC20Mint";
        type: { kind: "OBJECT"; name: "StarterKitERC20TransactionOutput"; ofType: null };
      };
      StarterKitERC20Permit: {
        name: "StarterKitERC20Permit";
        type: { kind: "OBJECT"; name: "StarterKitERC20TransactionOutput"; ofType: null };
      };
      StarterKitERC20RegistryAddToken: {
        name: "StarterKitERC20RegistryAddToken";
        type: { kind: "OBJECT"; name: "StarterKitERC20RegistryTransactionOutput"; ofType: null };
      };
      StarterKitERC20RenounceOwnership: {
        name: "StarterKitERC20RenounceOwnership";
        type: { kind: "OBJECT"; name: "StarterKitERC20TransactionOutput"; ofType: null };
      };
      StarterKitERC20Transfer: {
        name: "StarterKitERC20Transfer";
        type: { kind: "OBJECT"; name: "StarterKitERC20TransactionOutput"; ofType: null };
      };
      StarterKitERC20TransferFrom: {
        name: "StarterKitERC20TransferFrom";
        type: { kind: "OBJECT"; name: "StarterKitERC20TransactionOutput"; ofType: null };
      };
      StarterKitERC20TransferOwnership: {
        name: "StarterKitERC20TransferOwnership";
        type: { kind: "OBJECT"; name: "StarterKitERC20TransactionOutput"; ofType: null };
      };
      createWallet: { name: "createWallet"; type: { kind: "OBJECT"; name: "CreateWalletOutput"; ofType: null } };
    };
  };
  Query: {
    kind: "OBJECT";
    name: "Query";
    fields: {
      StarterKitERC20: { name: "StarterKitERC20"; type: { kind: "OBJECT"; name: "StarterKitERC20"; ofType: null } };
      StarterKitERC20ApproveReceipt: {
        name: "StarterKitERC20ApproveReceipt";
        type: { kind: "OBJECT"; name: "StarterKitERC20TransactionReceiptOutput"; ofType: null };
      };
      StarterKitERC20Factory: {
        name: "StarterKitERC20Factory";
        type: { kind: "OBJECT"; name: "StarterKitERC20Factory"; ofType: null };
      };
      StarterKitERC20FactoryCreateTokenReceipt: {
        name: "StarterKitERC20FactoryCreateTokenReceipt";
        type: { kind: "OBJECT"; name: "StarterKitERC20FactoryTransactionReceiptOutput"; ofType: null };
      };
      StarterKitERC20MintReceipt: {
        name: "StarterKitERC20MintReceipt";
        type: { kind: "OBJECT"; name: "StarterKitERC20TransactionReceiptOutput"; ofType: null };
      };
      StarterKitERC20PermitReceipt: {
        name: "StarterKitERC20PermitReceipt";
        type: { kind: "OBJECT"; name: "StarterKitERC20TransactionReceiptOutput"; ofType: null };
      };
      StarterKitERC20Registry: {
        name: "StarterKitERC20Registry";
        type: { kind: "OBJECT"; name: "StarterKitERC20Registry"; ofType: null };
      };
      StarterKitERC20RegistryAddTokenReceipt: {
        name: "StarterKitERC20RegistryAddTokenReceipt";
        type: { kind: "OBJECT"; name: "StarterKitERC20RegistryTransactionReceiptOutput"; ofType: null };
      };
      StarterKitERC20RenounceOwnershipReceipt: {
        name: "StarterKitERC20RenounceOwnershipReceipt";
        type: { kind: "OBJECT"; name: "StarterKitERC20TransactionReceiptOutput"; ofType: null };
      };
      StarterKitERC20TransferFromReceipt: {
        name: "StarterKitERC20TransferFromReceipt";
        type: { kind: "OBJECT"; name: "StarterKitERC20TransactionReceiptOutput"; ofType: null };
      };
      StarterKitERC20TransferOwnershipReceipt: {
        name: "StarterKitERC20TransferOwnershipReceipt";
        type: { kind: "OBJECT"; name: "StarterKitERC20TransactionReceiptOutput"; ofType: null };
      };
      StarterKitERC20TransferReceipt: {
        name: "StarterKitERC20TransferReceipt";
        type: { kind: "OBJECT"; name: "StarterKitERC20TransactionReceiptOutput"; ofType: null };
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
  StarterKitERC20: {
    kind: "OBJECT";
    name: "StarterKitERC20";
    fields: {
      DOMAIN_SEPARATOR: { name: "DOMAIN_SEPARATOR"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      allowance: { name: "allowance"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      balanceOf: { name: "balanceOf"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      decimals: { name: "decimals"; type: { kind: "SCALAR"; name: "Int"; ofType: null } };
      eip712Domain: {
        name: "eip712Domain";
        type: { kind: "OBJECT"; name: "StarterKitERC20Eip712DomainOutput"; ofType: null };
      };
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      name: { name: "name"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      nonces: { name: "nonces"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      owner: { name: "owner"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      symbol: { name: "symbol"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      totalSupply: { name: "totalSupply"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  StarterKitERC20ApproveInput: {
    kind: "INPUT_OBJECT";
    name: "StarterKitERC20ApproveInput";
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
  StarterKitERC20Eip712DomainOutput: {
    kind: "OBJECT";
    name: "StarterKitERC20Eip712DomainOutput";
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
  StarterKitERC20Factory: {
    kind: "OBJECT";
    name: "StarterKitERC20Factory";
    fields: {
      _registry: { name: "_registry"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
      registry: { name: "registry"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  StarterKitERC20FactoryCreateTokenInput: {
    kind: "INPUT_OBJECT";
    name: "StarterKitERC20FactoryCreateTokenInput";
    isOneOf: false;
    inputFields: [
      {
        name: "extraData_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "name_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "symbol_";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  StarterKitERC20FactoryTransactionOutput: {
    kind: "OBJECT";
    name: "StarterKitERC20FactoryTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  StarterKitERC20FactoryTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "StarterKitERC20FactoryTransactionReceiptOutput";
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
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
      };
      logsBloom: {
        name: "logsBloom";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
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
    };
  };
  StarterKitERC20MintInput: {
    kind: "INPUT_OBJECT";
    name: "StarterKitERC20MintInput";
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
  StarterKitERC20PermitInput: {
    kind: "INPUT_OBJECT";
    name: "StarterKitERC20PermitInput";
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
  StarterKitERC20Registry: {
    kind: "OBJECT";
    name: "StarterKitERC20Registry";
    fields: {
      getTokenByAddress: {
        name: "getTokenByAddress";
        type: { kind: "OBJECT"; name: "StarterKitERC20RegistryGetTokenByAddressOutput"; ofType: null };
      };
      getTokenByIndex: {
        name: "getTokenByIndex";
        type: { kind: "OBJECT"; name: "StarterKitERC20RegistryGetTokenByIndexOutput"; ofType: null };
      };
      getTokenBySymbol: {
        name: "getTokenBySymbol";
        type: { kind: "OBJECT"; name: "StarterKitERC20RegistryGetTokenBySymbolOutput"; ofType: null };
      };
      getTokenList: {
        name: "getTokenList";
        type: {
          kind: "LIST";
          name: never;
          ofType: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "OBJECT"; name: "StarterKitERC20RegistryTuple0GetTokenListOutput"; ofType: null };
          };
        };
      };
      id: { name: "id"; type: { kind: "SCALAR"; name: "ID"; ofType: null } };
    };
  };
  StarterKitERC20RegistryAddTokenInput: {
    kind: "INPUT_OBJECT";
    name: "StarterKitERC20RegistryAddTokenInput";
    isOneOf: false;
    inputFields: [
      {
        name: "extraData";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
      {
        name: "factoryAddress";
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
        name: "tokenAddress";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
        defaultValue: null;
      },
    ];
  };
  StarterKitERC20RegistryGetTokenByAddressOutput: {
    kind: "OBJECT";
    name: "StarterKitERC20RegistryGetTokenByAddressOutput";
    fields: {
      token: {
        name: "token";
        type: { kind: "OBJECT"; name: "StarterKitERC20RegistryTokenGetTokenByAddressOutput"; ofType: null };
      };
    };
  };
  StarterKitERC20RegistryGetTokenByIndexOutput: {
    kind: "OBJECT";
    name: "StarterKitERC20RegistryGetTokenByIndexOutput";
    fields: {
      token: {
        name: "token";
        type: { kind: "OBJECT"; name: "StarterKitERC20RegistryTokenGetTokenByIndexOutput"; ofType: null };
      };
    };
  };
  StarterKitERC20RegistryGetTokenBySymbolOutput: {
    kind: "OBJECT";
    name: "StarterKitERC20RegistryGetTokenBySymbolOutput";
    fields: {
      token: {
        name: "token";
        type: { kind: "OBJECT"; name: "StarterKitERC20RegistryTokenGetTokenBySymbolOutput"; ofType: null };
      };
    };
  };
  StarterKitERC20RegistryTokenGetTokenByAddressOutput: {
    kind: "OBJECT";
    name: "StarterKitERC20RegistryTokenGetTokenByAddressOutput";
    fields: {
      extraData: { name: "extraData"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      symbol: { name: "symbol"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      tokenAddress: { name: "tokenAddress"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  StarterKitERC20RegistryTokenGetTokenByIndexOutput: {
    kind: "OBJECT";
    name: "StarterKitERC20RegistryTokenGetTokenByIndexOutput";
    fields: {
      extraData: { name: "extraData"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      symbol: { name: "symbol"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      tokenAddress: { name: "tokenAddress"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  StarterKitERC20RegistryTokenGetTokenBySymbolOutput: {
    kind: "OBJECT";
    name: "StarterKitERC20RegistryTokenGetTokenBySymbolOutput";
    fields: {
      extraData: { name: "extraData"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      symbol: { name: "symbol"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      tokenAddress: { name: "tokenAddress"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  StarterKitERC20RegistryTransactionOutput: {
    kind: "OBJECT";
    name: "StarterKitERC20RegistryTransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  StarterKitERC20RegistryTransactionReceiptOutput: {
    kind: "OBJECT";
    name: "StarterKitERC20RegistryTransactionReceiptOutput";
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
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
      };
      logsBloom: {
        name: "logsBloom";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
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
    };
  };
  StarterKitERC20RegistryTuple0GetTokenListOutput: {
    kind: "OBJECT";
    name: "StarterKitERC20RegistryTuple0GetTokenListOutput";
    fields: {
      extraData: { name: "extraData"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      symbol: { name: "symbol"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
      tokenAddress: { name: "tokenAddress"; type: { kind: "SCALAR"; name: "String"; ofType: null } };
    };
  };
  StarterKitERC20TransactionOutput: {
    kind: "OBJECT";
    name: "StarterKitERC20TransactionOutput";
    fields: { transactionHash: { name: "transactionHash"; type: { kind: "SCALAR"; name: "String"; ofType: null } } };
  };
  StarterKitERC20TransactionReceiptOutput: {
    kind: "OBJECT";
    name: "StarterKitERC20TransactionReceiptOutput";
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
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
      };
      logsBloom: {
        name: "logsBloom";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
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
    };
  };
  StarterKitERC20TransferFromInput: {
    kind: "INPUT_OBJECT";
    name: "StarterKitERC20TransferFromInput";
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
  StarterKitERC20TransferInput: {
    kind: "INPUT_OBJECT";
    name: "StarterKitERC20TransferInput";
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
  StarterKitERC20TransferOwnershipInput: {
    kind: "INPUT_OBJECT";
    name: "StarterKitERC20TransferOwnershipInput";
    isOneOf: false;
    inputFields: [
      {
        name: "newOwner";
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
        type: {
          kind: "NON_NULL";
          name: never;
          ofType: {
            kind: "LIST";
            name: never;
            ofType: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
          };
        };
      };
      logsBloom: {
        name: "logsBloom";
        type: { kind: "NON_NULL"; name: never; ofType: { kind: "SCALAR"; name: "String"; ofType: null } };
      };
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
    };
  };
  TransactionReceiptStatus: { name: "TransactionReceiptStatus"; enumValues: "Reverted" | "Success" };
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

import * as gqlTada from "gql.tada";
