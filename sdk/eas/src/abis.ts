/**
 * EAS Schema Registry ABI
 * Contains the essential functions for schema registration and retrieval
 */
export const SCHEMA_REGISTRY_ABI = [
  {
    type: "function",
    name: "register",
    inputs: [
      { name: "schema", type: "string", internalType: "string" },
      { name: "resolver", type: "address", internalType: "contract ISchemaResolver" },
      { name: "revocable", type: "bool", internalType: "bool" },
    ],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getSchema",
    inputs: [{ name: "uid", type: "bytes32", internalType: "bytes32" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct SchemaRecord",
        components: [
          { name: "uid", type: "bytes32", internalType: "bytes32" },
          { name: "resolver", type: "address", internalType: "contract ISchemaResolver" },
          { name: "revocable", type: "bool", internalType: "bool" },
          { name: "schema", type: "string", internalType: "string" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "Registered",
    inputs: [
      { name: "uid", type: "bytes32", indexed: true, internalType: "bytes32" },
      { name: "registerer", type: "address", indexed: true, internalType: "address" },
      {
        name: "schema",
        type: "tuple",
        indexed: false,
        internalType: "struct SchemaRecord",
        components: [
          { name: "uid", type: "bytes32", internalType: "bytes32" },
          { name: "resolver", type: "address", internalType: "contract ISchemaResolver" },
          { name: "revocable", type: "bool", internalType: "bool" },
          { name: "schema", type: "string", internalType: "string" },
        ],
      },
    ],
    anonymous: false,
  },
] as const;

/**
 * EAS Attestation Service ABI
 * Contains the essential functions for attestation creation, revocation, and retrieval
 */
export const EAS_ABI = [
  {
    type: "function",
    name: "attest",
    inputs: [
      {
        name: "request",
        type: "tuple",
        internalType: "struct AttestationRequest",
        components: [
          { name: "schema", type: "bytes32", internalType: "bytes32" },
          {
            name: "data",
            type: "tuple",
            internalType: "struct AttestationRequestData",
            components: [
              { name: "recipient", type: "address", internalType: "address" },
              { name: "expirationTime", type: "uint64", internalType: "uint64" },
              { name: "revocable", type: "bool", internalType: "bool" },
              { name: "refUID", type: "bytes32", internalType: "bytes32" },
              { name: "data", type: "bytes", internalType: "bytes" },
              { name: "value", type: "uint256", internalType: "uint256" },
            ],
          },
        ],
      },
    ],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "revoke",
    inputs: [
      {
        name: "request",
        type: "tuple",
        internalType: "struct RevocationRequest",
        components: [
          { name: "schema", type: "bytes32", internalType: "bytes32" },
          {
            name: "data",
            type: "tuple",
            internalType: "struct RevocationRequestData",
            components: [
              { name: "uid", type: "bytes32", internalType: "bytes32" },
              { name: "value", type: "uint256", internalType: "uint256" },
            ],
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "getAttestation",
    inputs: [{ name: "uid", type: "bytes32", internalType: "bytes32" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct Attestation",
        components: [
          { name: "uid", type: "bytes32", internalType: "bytes32" },
          { name: "schema", type: "bytes32", internalType: "bytes32" },
          { name: "time", type: "uint64", internalType: "uint64" },
          { name: "expirationTime", type: "uint64", internalType: "uint64" },
          { name: "revocationTime", type: "uint64", internalType: "uint64" },
          { name: "refUID", type: "bytes32", internalType: "bytes32" },
          { name: "recipient", type: "address", internalType: "address" },
          { name: "attester", type: "address", internalType: "address" },
          { name: "revocable", type: "bool", internalType: "bool" },
          { name: "data", type: "bytes", internalType: "bytes" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "Attested",
    inputs: [
      { name: "recipient", type: "address", indexed: true, internalType: "address" },
      { name: "attester", type: "address", indexed: true, internalType: "address" },
      { name: "uid", type: "bytes32", indexed: false, internalType: "bytes32" },
      { name: "schemaUID", type: "bytes32", indexed: true, internalType: "bytes32" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Revoked",
    inputs: [
      { name: "recipient", type: "address", indexed: true, internalType: "address" },
      { name: "attester", type: "address", indexed: true, internalType: "address" },
      { name: "uid", type: "bytes32", indexed: false, internalType: "bytes32" },
      { name: "schemaUID", type: "bytes32", indexed: true, internalType: "bytes32" },
    ],
    anonymous: false,
  },
] as const;

/**
 * Default ABIs for EAS Portal integration
 */
export const DEFAULT_EAS_ABIS = [
  {
    name: "SchemaRegistry",
    abi: JSON.stringify(SCHEMA_REGISTRY_ABI),
  },
  {
    name: "EAS",
    abi: JSON.stringify(EAS_ABI),
  },
] as const;
