import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Registers blockchain concept resources with the MCP server
 *
 * @param server - The MCP server instance
 *
 * @example
 * import { registerBlockchainConcepts } from "@settlemint/sdk-mcp/resources/blockchain-concepts";
 *
 * registerBlockchainConcepts(server);
 */
export const registerBlockchainConcepts = (server: McpServer) => {
  server.resource("blockchain-concepts", "blockchain-concepts://", async (uri) => ({
    contents: [
      {
        uri: uri.href,
        mimeType: "text/markdown",
        text: `# Blockchain Fundamentals

## Key Concepts

### Blocks
- **Block**: A container data structure that aggregates transactions for inclusion in the blockchain
- **Block Header**: Contains metadata about a block, including previous block hash, timestamp, and merkle root
- **Block Height**: The number of blocks preceding a particular block in the blockchain
- **Genesis Block**: The first block in a blockchain, hardcoded into the protocol

### Transactions
- **Transaction**: A signed message that changes the state of the blockchain
- **Transaction Fee**: Cost to process a transaction, typically paid to miners/validators
- **Gas**: Unit measuring computational work in Ethereum and EVM-compatible chains
- **Gas Price**: Amount of cryptocurrency willing to pay per unit of gas
- **Gas Limit**: Maximum amount of gas a transaction can consume

### Consensus
- **Consensus Mechanism**: Process by which nodes agree on the state of the blockchain
- **Proof of Work (PoW)**: Consensus requiring computational work to validate blocks
- **Proof of Stake (PoS)**: Consensus where validators are selected based on cryptocurrency holdings
- **Finality**: Property where once a transaction is processed, it cannot be altered or reversed
- **Fork**: Event where a blockchain splits into two separate chains

### Cryptography
- **Public Key**: Publicly shareable key used to verify digital signatures
- **Private Key**: Secret key used to create digital signatures
- **Digital Signature**: Cryptographic mechanism to verify authenticity and integrity
- **Hash Function**: One-way function that maps data of arbitrary size to fixed-size values
- **Merkle Tree**: Data structure used for efficient verification of blockchain data

## Smart Contracts

### Basics
- **Smart Contract**: Self-executing code deployed on a blockchain
- **Bytecode**: Compiled smart contract code executed by the blockchain virtual machine
- **ABI (Application Binary Interface)**: JSON interface defining how to interact with a smart contract
- **State Variables**: Variables stored in contract storage
- **Events**: Mechanisms for logging on the blockchain that applications can subscribe to

### Development
- **Solidity**: Primary programming language for Ethereum smart contracts
- **Function Modifiers**: Reusable code that can change the behavior of functions
- **View Functions**: Functions that read but don't modify state
- **Pure Functions**: Functions that neither read nor modify state
- **Payable Functions**: Functions that can receive cryptocurrency

### Security
- **Reentrancy**: Vulnerability where a contract can be interrupted during execution
- **Integer Overflow/Underflow**: Arithmetic errors in contract calculations
- **Gas Optimization**: Techniques to reduce transaction costs
- **Auditing**: Process of reviewing smart contract code for vulnerabilities
- **Upgradeability Patterns**: Methods to update deployed smart contract logic

## Tokens and Standards

### Token Types
- **Fungible Tokens**: Interchangeable tokens like cryptocurrencies (ERC-20)
- **Non-Fungible Tokens (NFTs)**: Unique tokens representing distinct assets (ERC-721)
- **Semi-Fungible Tokens**: Tokens with both fungible and non-fungible properties (ERC-1155)

### Standards
- **ERC-20**: Standard interface for fungible tokens
- **ERC-721**: Standard interface for non-fungible tokens
- **ERC-1155**: Multi-token standard for both fungible and non-fungible tokens
- **ERC-4626**: Tokenized Vault Standard
- **ERC-6551**: NFT Bound Accounts

## Blockchain Networks

### Network Types
- **Public Blockchain**: Open, permissionless networks like Ethereum or Bitcoin
- **Private Blockchain**: Restricted, permissioned networks for specific organizations
- **Consortium Blockchain**: Semi-private networks governed by a group of organizations
- **Layer 1**: Base blockchain protocols (Ethereum, Bitcoin, Solana)
- **Layer 2**: Scaling solutions built on top of Layer 1 (Optimism, Arbitrum)

### Interoperability
- **Cross-Chain**: Communication between different blockchain networks
- **Bridge**: Infrastructure allowing assets to move between blockchains
- **Atomic Swap**: Trustless exchange of cryptocurrencies across different blockchains
- **Wrapped Tokens**: Tokens representing assets from another blockchain`,
      },
      {
        uri: `${uri.href}/platform-architecture`,
        mimeType: "text/markdown",
        text: `# SettleMint Platform Architecture

## Core Components

### Workspaces
- **Workspace**: Top-level organizational unit in the SettleMint platform
- **Workspace Credits**: Resources allocated to a workspace for running services
- **Workspace Unique Name**: Globally unique identifier for a workspace

### Applications
- **Application**: Container for blockchain networks and integration tools
- **Application Unique Name**: Unique identifier for an application within a workspace
- **Application Access Token**: Authentication token for accessing application resources

### Blockchain Networks
- **Blockchain Network**: A blockchain instance running on the SettleMint platform
- **Blockchain Node**: Individual node in a blockchain network
- **Load Balancer**: Distributes incoming JSON-RPC requests across multiple blockchain nodes
- **Network Type**: Type of blockchain network (Ethereum, Fabric, etc.)
- **Consensus Mechanism**: Method used to achieve agreement on the blockchain state

### Integration Tools
- **Integration Tool**: Component that connects blockchain networks with external systems
- **Hasura**: GraphQL engine for database access
- **Chainlink**: Oracle service for connecting blockchains with external data
- **Integration Studio**: Low-code integration platform

### Storage
- **Storage**: Persistent storage for blockchain data and application files
- **Storage Type**: Type of storage (block, file, object)
- **Storage Provider**: Cloud provider for storage resources

### Middleware
- **Middleware**: Services that facilitate interaction with blockchain networks
- **Graph Subgraphs**: Indexed blockchain data for efficient querying
- **API Gateway**: Entry point for API requests to the platform

## Deployment Models

### Cloud Deployment
- **Dedicated**: Resources exclusively allocated to a single customer
- **Shared**: Resources shared among multiple customers
- **Region**: Geographic location where resources are deployed
- **Provider**: Cloud provider (AWS, Azure, GCP)

### On-Premises Deployment
- **Private Cloud**: SettleMint platform deployed in a customer's private cloud
- **Air-Gapped**: Completely isolated deployment without internet connectivity
- **Hybrid**: Combination of cloud and on-premises deployments

## Security Features

### Authentication
- **Personal Access Token**: Token for authenticating with the SettleMint API
- **Application Access Token**: Token for accessing specific application resources
- **Pincode Verification**: Additional security layer for sensitive operations

### Key Management
- **Private Key**: Cryptographic key for signing blockchain transactions
- **Key Rotation**: Process of changing cryptographic keys
- **Hardware Security Module (HSM)**: Specialized hardware for secure key storage

### Access Control
- **Role-Based Access Control (RBAC)**: Access management based on user roles
- **Permission**: Specific action that can be performed on a resource
- **Policy**: Set of permissions assigned to a user or role`,
      },
    ],
  }));
};
