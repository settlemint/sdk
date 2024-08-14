/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type GenericErc20 = {
  __typename?: 'GenericErc20';
  DOMAIN_SEPARATOR?: Maybe<Scalars['String']['output']>;
  allowance?: Maybe<Scalars['String']['output']>;
  balanceOf?: Maybe<Scalars['String']['output']>;
  decimals?: Maybe<Scalars['Int']['output']>;
  eip712Domain?: Maybe<GenericErc20Eip712DomainOutput>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nonces?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<Scalars['String']['output']>;
  paused?: Maybe<Scalars['Boolean']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  totalSupply?: Maybe<Scalars['String']['output']>;
};


export type GenericErc20AllowanceArgs = {
  owner: Scalars['String']['input'];
  spender: Scalars['String']['input'];
};


export type GenericErc20BalanceOfArgs = {
  account: Scalars['String']['input'];
};


export type GenericErc20NoncesArgs = {
  owner: Scalars['String']['input'];
};

export type GenericErc20ApproveInput = {
  spender: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type GenericErc20BurnFromInput = {
  account: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type GenericErc20BurnInput = {
  value: Scalars['String']['input'];
};

export type GenericErc20Eip712DomainOutput = {
  __typename?: 'GenericErc20Eip712DomainOutput';
  chainId?: Maybe<Scalars['String']['output']>;
  extensions?: Maybe<Array<Scalars['String']['output']>>;
  fields?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  salt?: Maybe<Scalars['String']['output']>;
  verifyingContract?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

export type GenericErc20MintInput = {
  amount: Scalars['String']['input'];
  to: Scalars['String']['input'];
};

export type GenericErc20PermitInput = {
  deadline: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  r: Scalars['String']['input'];
  s: Scalars['String']['input'];
  spender: Scalars['String']['input'];
  v: Scalars['Int']['input'];
  value: Scalars['String']['input'];
};

/** Returns the transaction hash */
export type GenericErc20TransactionOutput = {
  __typename?: 'GenericErc20TransactionOutput';
  transactionHash?: Maybe<Scalars['String']['output']>;
};

/** Returns the transaction receipt */
export type GenericErc20TransactionReceiptOutput = {
  __typename?: 'GenericErc20TransactionReceiptOutput';
  /** Blob Gas Price */
  blobGasPrice?: Maybe<Scalars['String']['output']>;
  /** Blob Gas Used */
  blobGasUsed?: Maybe<Scalars['String']['output']>;
  /** Block Hash */
  blockHash: Scalars['String']['output'];
  /** Block Number */
  blockNumber: Scalars['String']['output'];
  /** Contract Address */
  contractAddress?: Maybe<Scalars['String']['output']>;
  /** Cumulative Gas Used */
  cumulativeGasUsed: Scalars['String']['output'];
  /** Effective Gas Price */
  effectiveGasPrice: Scalars['String']['output'];
  /** From */
  from: Scalars['String']['output'];
  /** Gas Used */
  gasUsed: Scalars['String']['output'];
  /** Logs */
  logs: Array<Scalars['String']['output']>;
  /** Logs Bloom */
  logsBloom: Scalars['String']['output'];
  /** Root */
  root?: Maybe<Scalars['String']['output']>;
  /** Status */
  status: TransactionReceiptStatus;
  /** To */
  to?: Maybe<Scalars['String']['output']>;
  /** Transaction Hash */
  transactionHash: Scalars['String']['output'];
  /** Transaction Index */
  transactionIndex: Scalars['Int']['output'];
  /** Type */
  type: Scalars['String']['output'];
};

export type GenericErc20TransferFromInput = {
  from: Scalars['String']['input'];
  to: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type GenericErc20TransferInput = {
  to: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type GenericErc20TransferOwnershipInput = {
  newOwner: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  GenericErc20Approve?: Maybe<GenericErc20TransactionOutput>;
  GenericErc20Burn?: Maybe<GenericErc20TransactionOutput>;
  GenericErc20BurnFrom?: Maybe<GenericErc20TransactionOutput>;
  GenericErc20Mint?: Maybe<GenericErc20TransactionOutput>;
  GenericErc20Pause?: Maybe<GenericErc20TransactionOutput>;
  GenericErc20Permit?: Maybe<GenericErc20TransactionOutput>;
  GenericErc20RenounceOwnership?: Maybe<GenericErc20TransactionOutput>;
  GenericErc20Transfer?: Maybe<GenericErc20TransactionOutput>;
  GenericErc20TransferFrom?: Maybe<GenericErc20TransactionOutput>;
  GenericErc20TransferOwnership?: Maybe<GenericErc20TransactionOutput>;
  GenericErc20Unpause?: Maybe<GenericErc20TransactionOutput>;
};


export type MutationGenericErc20ApproveArgs = {
  address: Scalars['String']['input'];
  from: Scalars['String']['input'];
  gasLimit?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['String']['input']>;
  input: GenericErc20ApproveInput;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  simulate?: InputMaybe<Scalars['Boolean']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};


export type MutationGenericErc20BurnArgs = {
  address: Scalars['String']['input'];
  from: Scalars['String']['input'];
  gasLimit?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['String']['input']>;
  input: GenericErc20BurnInput;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  simulate?: InputMaybe<Scalars['Boolean']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};


export type MutationGenericErc20BurnFromArgs = {
  address: Scalars['String']['input'];
  from: Scalars['String']['input'];
  gasLimit?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['String']['input']>;
  input: GenericErc20BurnFromInput;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  simulate?: InputMaybe<Scalars['Boolean']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};


export type MutationGenericErc20MintArgs = {
  address: Scalars['String']['input'];
  from: Scalars['String']['input'];
  gasLimit?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['String']['input']>;
  input: GenericErc20MintInput;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  simulate?: InputMaybe<Scalars['Boolean']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};


export type MutationGenericErc20PauseArgs = {
  address: Scalars['String']['input'];
  from: Scalars['String']['input'];
  gasLimit?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  simulate?: InputMaybe<Scalars['Boolean']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};


export type MutationGenericErc20PermitArgs = {
  address: Scalars['String']['input'];
  from: Scalars['String']['input'];
  gasLimit?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['String']['input']>;
  input: GenericErc20PermitInput;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  simulate?: InputMaybe<Scalars['Boolean']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};


export type MutationGenericErc20RenounceOwnershipArgs = {
  address: Scalars['String']['input'];
  from: Scalars['String']['input'];
  gasLimit?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  simulate?: InputMaybe<Scalars['Boolean']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};


export type MutationGenericErc20TransferArgs = {
  address: Scalars['String']['input'];
  from: Scalars['String']['input'];
  gasLimit?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['String']['input']>;
  input: GenericErc20TransferInput;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  simulate?: InputMaybe<Scalars['Boolean']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};


export type MutationGenericErc20TransferFromArgs = {
  address: Scalars['String']['input'];
  from: Scalars['String']['input'];
  gasLimit?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['String']['input']>;
  input: GenericErc20TransferFromInput;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  simulate?: InputMaybe<Scalars['Boolean']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};


export type MutationGenericErc20TransferOwnershipArgs = {
  address: Scalars['String']['input'];
  from: Scalars['String']['input'];
  gasLimit?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['String']['input']>;
  input: GenericErc20TransferOwnershipInput;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  simulate?: InputMaybe<Scalars['Boolean']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};


export type MutationGenericErc20UnpauseArgs = {
  address: Scalars['String']['input'];
  from: Scalars['String']['input'];
  gasLimit?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  simulate?: InputMaybe<Scalars['Boolean']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  GenericErc20ApproveReceipt?: Maybe<GenericErc20TransactionReceiptOutput>;
  GenericErc20BurnFromReceipt?: Maybe<GenericErc20TransactionReceiptOutput>;
  GenericErc20BurnReceipt?: Maybe<GenericErc20TransactionReceiptOutput>;
  GenericErc20MintReceipt?: Maybe<GenericErc20TransactionReceiptOutput>;
  GenericErc20PauseReceipt?: Maybe<GenericErc20TransactionReceiptOutput>;
  GenericErc20PermitReceipt?: Maybe<GenericErc20TransactionReceiptOutput>;
  GenericErc20RenounceOwnershipReceipt?: Maybe<GenericErc20TransactionReceiptOutput>;
  GenericErc20TransferFromReceipt?: Maybe<GenericErc20TransactionReceiptOutput>;
  GenericErc20TransferOwnershipReceipt?: Maybe<GenericErc20TransactionReceiptOutput>;
  GenericErc20TransferReceipt?: Maybe<GenericErc20TransactionReceiptOutput>;
  GenericErc20UnpauseReceipt?: Maybe<GenericErc20TransactionReceiptOutput>;
  generic_erc_20?: Maybe<GenericErc20>;
  /** Get the list of pending and recently processed transactions */
  getPendingAndRecentlyProcessedTransactions?: Maybe<TransactionsPaginatedOutput>;
  /** Get the list of pending transactions */
  getPendingTransactions?: Maybe<TransactionsPaginatedOutput>;
  /** Get the list of processed transactions */
  getProcessedTransactions?: Maybe<TransactionsPaginatedOutput>;
  /** Get a transaction */
  getTransaction?: Maybe<TransactionOutput>;
};


export type QueryGenericErc20ApproveReceiptArgs = {
  transactionHash: Scalars['String']['input'];
};


export type QueryGenericErc20BurnFromReceiptArgs = {
  transactionHash: Scalars['String']['input'];
};


export type QueryGenericErc20BurnReceiptArgs = {
  transactionHash: Scalars['String']['input'];
};


export type QueryGenericErc20MintReceiptArgs = {
  transactionHash: Scalars['String']['input'];
};


export type QueryGenericErc20PauseReceiptArgs = {
  transactionHash: Scalars['String']['input'];
};


export type QueryGenericErc20PermitReceiptArgs = {
  transactionHash: Scalars['String']['input'];
};


export type QueryGenericErc20RenounceOwnershipReceiptArgs = {
  transactionHash: Scalars['String']['input'];
};


export type QueryGenericErc20TransferFromReceiptArgs = {
  transactionHash: Scalars['String']['input'];
};


export type QueryGenericErc20TransferOwnershipReceiptArgs = {
  transactionHash: Scalars['String']['input'];
};


export type QueryGenericErc20TransferReceiptArgs = {
  transactionHash: Scalars['String']['input'];
};


export type QueryGenericErc20UnpauseReceiptArgs = {
  transactionHash: Scalars['String']['input'];
};


export type QueryGeneric_Erc_20Args = {
  address: Scalars['String']['input'];
};


export type QueryGetPendingAndRecentlyProcessedTransactionsArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  functionName?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  processedAfter?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetPendingTransactionsArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  functionName?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetProcessedTransactionsArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  functionName?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  processedAfter?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetTransactionArgs = {
  transactionHash: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Get the list of pending and recently processed transactions */
  getPendingAndRecentlyProcessedTransactions?: Maybe<TransactionsPaginatedOutput>;
  /** Get the list of pending transactions */
  getPendingTransactions?: Maybe<TransactionsPaginatedOutput>;
  /** Get the list of processed transactions */
  getProcessedTransactions?: Maybe<TransactionsPaginatedOutput>;
  /** Get a transaction */
  getTransaction?: Maybe<TransactionOutput>;
};


export type SubscriptionGetPendingAndRecentlyProcessedTransactionsArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  functionName?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  processedAfter?: InputMaybe<Scalars['String']['input']>;
};


export type SubscriptionGetPendingTransactionsArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  functionName?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type SubscriptionGetProcessedTransactionsArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  functionName?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  processedAfter?: InputMaybe<Scalars['String']['input']>;
};


export type SubscriptionGetTransactionArgs = {
  transactionHash: Scalars['String']['input'];
};

/** Returns the transaction */
export type TransactionOutput = {
  __typename?: 'TransactionOutput';
  /** Contract address */
  address: Scalars['String']['output'];
  /** Created at */
  createdAt?: Maybe<Scalars['String']['output']>;
  /** From address */
  from: Scalars['String']['output'];
  /** Function name */
  functionName: Scalars['String']['output'];
  /** Metadata */
  metadata?: Maybe<Scalars['JSON']['output']>;
  /** Receipt */
  receipt?: Maybe<TransactionReceiptOutput>;
  /** Transaction Hash */
  transactionHash: Scalars['String']['output'];
  /** Created at */
  updatedAt?: Maybe<Scalars['String']['output']>;
};

/** The transaction receipt */
export type TransactionReceiptOutput = {
  __typename?: 'TransactionReceiptOutput';
  /** Blob Gas Price */
  blobGasPrice?: Maybe<Scalars['String']['output']>;
  /** Blob Gas Used */
  blobGasUsed?: Maybe<Scalars['String']['output']>;
  /** Block Hash */
  blockHash: Scalars['String']['output'];
  /** Block Number */
  blockNumber: Scalars['String']['output'];
  /** Contract Address */
  contractAddress?: Maybe<Scalars['String']['output']>;
  /** Cumulative Gas Used */
  cumulativeGasUsed: Scalars['String']['output'];
  /** Effective Gas Price */
  effectiveGasPrice: Scalars['String']['output'];
  /** From */
  from: Scalars['String']['output'];
  /** Gas Used */
  gasUsed: Scalars['String']['output'];
  /** Logs */
  logs: Array<Scalars['String']['output']>;
  /** Logs Bloom */
  logsBloom: Scalars['String']['output'];
  /** Root */
  root?: Maybe<Scalars['String']['output']>;
  /** Status */
  status: TransactionReceiptStatus;
  /** To */
  to?: Maybe<Scalars['String']['output']>;
  /** Transaction Hash */
  transactionHash: Scalars['String']['output'];
  /** Transaction Index */
  transactionIndex: Scalars['Int']['output'];
  /** Type */
  type: Scalars['String']['output'];
};

export enum TransactionReceiptStatus {
  Reverted = 'Reverted',
  Success = 'Success'
}

/** Transactions paginated output */
export type TransactionsPaginatedOutput = {
  __typename?: 'TransactionsPaginatedOutput';
  /** Total number of results */
  count: Scalars['Int']['output'];
  records: Array<TransactionOutput>;
};

export type GetAllPendingAndRecentlyProcessedTransactionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPendingAndRecentlyProcessedTransactionsQuery = { __typename?: 'Query', getPendingAndRecentlyProcessedTransactions?: { __typename?: 'TransactionsPaginatedOutput', records: Array<{ __typename?: 'TransactionOutput', address: string, createdAt?: string | null, from: string, functionName: string, metadata?: any | null, transactionHash: string, updatedAt?: string | null, receipt?: { __typename?: 'TransactionReceiptOutput', type: string, transactionIndex: number, transactionHash: string, to?: string | null, root?: string | null, status: TransactionReceiptStatus, logsBloom: string, logs: Array<string>, gasUsed: string, from: string, effectiveGasPrice: string, cumulativeGasUsed: string, contractAddress?: string | null, blockNumber: string, blockHash: string, blobGasUsed?: string | null, blobGasPrice?: string | null } | null }> } | null };


export const GetAllPendingAndRecentlyProcessedTransactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllPendingAndRecentlyProcessedTransactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPendingAndRecentlyProcessedTransactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"functionName"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"receipt"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"transactionIndex"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"root"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"logsBloom"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"gasUsed"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"effectiveGasPrice"}},{"kind":"Field","name":{"kind":"Name","value":"cumulativeGasUsed"}},{"kind":"Field","name":{"kind":"Name","value":"contractAddress"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockHash"}},{"kind":"Field","name":{"kind":"Name","value":"blobGasUsed"}},{"kind":"Field","name":{"kind":"Name","value":"blobGasPrice"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllPendingAndRecentlyProcessedTransactionsQuery, GetAllPendingAndRecentlyProcessedTransactionsQueryVariables>;