/* eslint-disable */
/* prettier-ignore */

export type introspection_types = {
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
  DeleteWalletVerificationOutput: {
    kind: "OBJECT";
    name: "DeleteWalletVerificationOutput";
    fields: { success: { name: "success"; type: { kind: "SCALAR"; name: "Boolean"; ofType: null } } };
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
  ID: unknown;
  Int: unknown;
  JSON: unknown;
  Mutation: {
    kind: "OBJECT";
    name: "Mutation";
    fields: {
      DeployContract: {
        name: "DeployContract";
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
      getContracts: { name: "getContracts"; type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null } };
      getContractsDeployStatus: {
        name: "getContractsDeployStatus";
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
      getContractsEas: {
        name: "getContractsEas";
        type: { kind: "OBJECT"; name: "ContractsPaginatedOutput"; ofType: null };
      };
      getContractsEasSchemaRegistry: {
        name: "getContractsEasSchemaRegistry";
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
  String: unknown;
  Subscription: {
    kind: "OBJECT";
    name: "Subscription";
    fields: {
      getContractsDeployStatus: {
        name: "getContractsDeployStatus";
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
