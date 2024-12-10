export const SMART_CONTRACT_SET_DETAILS = [
  {
    id: "solidity-empty",
    name: "Empty",
    image: {
      registry: "ghcr.io",
      repository: "settlemint/solidity-empty",
      tag: "7.7.7",
    },
  },
  {
    id: "solidity-token-erc20",
    name: "ERC20 token",
    image: {
      registry: "ghcr.io",
      repository: "settlemint/solidity-token-erc20",
      tag: "7.7.7",
    },
  },
  {
    id: "solidity-token-erc1155",
    name: "ERC1155 token",
    image: {
      registry: "ghcr.io",
      repository: "settlemint/solidity-token-erc1155",
      tag: "7.7.7",
    },
  },
  {
    id: "solidity-token-erc20-metatx",
    name: "ERC20 token with MetaTx",
    image: {
      registry: "ghcr.io",
      repository: "settlemint/solidity-token-erc20-metatx",
      tag: "7.7.7",
    },
  },
  {
    id: "solidity-supplychain",
    name: "Supplychain",
    image: {
      registry: "ghcr.io",
      repository: "settlemint/solidity-supplychain",
      tag: "7.7.7",
    },
  },
  {
    id: "chaincode-ts-empty",
    name: "Empty typescript",
    image: {
      registry: "ghcr.io",
      repository: "settlemint/chaincode-typescript-empty",
      tag: "7.0.13",
    },
  },
  {
    id: "chaincode-ts-empty-pdc",
    name: "Empty typescript with PDC",
    image: {
      registry: "ghcr.io",
      repository: "settlemint/chaincode-typescript-empty-pdc",
      tag: "7.0.1",
    },
  },
  {
    id: "chaincode-go-empty",
    name: "Empty go",
    image: {
      registry: "ghcr.io",
      repository: "settlemint/chaincode-go-empty",
      tag: "7.0.5",
    },
  },
  {
    id: "solidity-statemachine",
    name: "State Machine",
    image: {
      registry: "ghcr.io",
      repository: "settlemint/solidity-statemachine",
      tag: "7.7.7",
    },
  },
  {
    id: "solidity-token-erc20-crowdsale",
    name: "ERC20 token with crowdsale mechanism",
    image: {
      registry: "ghcr.io",
      repository: "settlemint/solidity-token-erc20-crowdsale",
      tag: "7.7.7",
    },
  },
  {
    id: "solidity-token-erc721",
    name: "ERC721",
    image: {
      registry: "ghcr.io",
      repository: "settlemint/solidity-token-erc721",
      tag: "7.7.7",
    },
  },
  {
    id: "solidity-token-erc721a",
    name: "ERC721a",
    image: {
      registry: "ghcr.io",
      repository: "settlemint/solidity-token-erc721a",
      tag: "7.7.7",
    },
  },
  {
    id: "solidity-token-erc721-generative-art",
    name: "ERC721 Generative Art",
    image: {
      registry: "ghcr.io",
      repository: "settlemint/solidity-token-erc721-generative-art",
      tag: "7.7.7",
    },
  },
  {
    id: "solidity-token-soulbound",
    name: "Soulbound Token",
    image: {
      registry: "ghcr.io",
      repository: "settlemint/solidity-token-soulbound",
      tag: "7.7.7",
    },
  },
  {
    id: "solidity-diamond-bond",
    name: "Diamond bond",
    image: {
      registry: "ghcr.io",
      repository: "settlemint/solidity-diamond-bond",
      tag: "7.7.7",
    },
  },
  {
    id: "solidity-attestation-service",
    name: "Attestation Service",
    image: {
      registry: "ghcr.io",
      repository: "settlemint/solidity-attestation-service",
      tag: "7.7.7",
    },
  },
  {
    id: "solidity-zeto",
    name: "Zeto",
    featureflagged: true,
    image: {
      registry: "ghcr.io",
      repository: "settlemint/solidity-zeto",
      tag: "7.7.7",
    },
  },
  {
    id: "solidity-starterkit",
    name: "Starterkit",
    featureflagged: true,
    image: {
      registry: "ghcr.io",
      repository: "settlemint/solidity-predeployed",
      tag: "7.7.7",
    },
  },
];

export const SMART_CONTRACT_SETS = SMART_CONTRACT_SET_DETAILS.map((set) => set.id);
