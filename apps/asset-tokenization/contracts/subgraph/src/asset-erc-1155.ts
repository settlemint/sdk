import {
  ApprovalForAll as ApprovalForAllEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  TransferBatch as TransferBatchEvent,
  TransferSingle as TransferSingleEvent,
  URI as URIEvent,
  Unpaused as UnpausedEvent,
} from "../generated/AssetERC1155/AssetERC1155";
import {
  ApprovalForAll,
  OwnershipTransferred,
  Paused,
  TransferBatch,
  TransferSingle,
  URI,
  Unpaused,
} from "../generated/schema";

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  const entity = new ApprovalForAll(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.account = event.params.account;
  entity.operator = event.params.operator;
  entity.approved = event.params.approved;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferredEvent): void {
  const entity = new OwnershipTransferred(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePaused(event: PausedEvent): void {
  const entity = new Paused(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTransferBatch(event: TransferBatchEvent): void {
  const entity = new TransferBatch(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.operator = event.params.operator;
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.ids = event.params.ids;
  entity.values = event.params.values;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTransferSingle(event: TransferSingleEvent): void {
  const entity = new TransferSingle(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.operator = event.params.operator;
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.AssetERC1155_id = event.params.id;
  entity.value = event.params.value;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleURI(event: URIEvent): void {
  const entity = new URI(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.value = event.params.value;
  entity.AssetERC1155_id = event.params.id;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUnpaused(event: UnpausedEvent): void {
  const entity = new Unpaused(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
