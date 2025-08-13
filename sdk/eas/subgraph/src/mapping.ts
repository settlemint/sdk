import { Attestation, Schema } from "../generated/schema";
import { Attested, Revoked } from "../generated/EAS/EAS";
import { Registered } from "../generated/SchemaRegistry/SchemaRegistry";

export function handleRegistered(event: Registered): void {
  const id = event.params.uid;
  let entity = Schema.load(id);
  if (entity == null) {
    entity = new Schema(id);
  }
  entity.resolver = event.params.resolver;
  entity.revocable = event.params.revocable;
  entity.schema = event.params.schema;
  entity.createdAt = event.block.timestamp;
  entity.txHash = event.transaction.hash;
  entity.save();
}

export function handleAttested(event: Attested): void {
  const id = event.params.uid;
  let entity = Attestation.load(id);
  if (entity == null) {
    entity = new Attestation(id);
  }
  // schema is bytes32 uid, link by id
  entity.schema = event.params.schema;
  entity.attester = event.params.attester;
  entity.recipient = event.params.recipient;
  entity.time = event.params.time;
  entity.expirationTime = event.params.expirationTime;
  entity.revocable = event.params.revocable;
  entity.refUID = event.params.refUID;
  entity.data = event.params.data;
  entity.txHash = event.transaction.hash;
  entity.save();
}

export function handleRevoked(event: Revoked): void {
  const id = event.params.uid;
  let entity = Attestation.load(id);
  if (entity == null) {
    // If not present, create with minimal fields so revokedAt is known.
    entity = new Attestation(id);
    entity.schema = event.params.schema; // link by uid
    entity.attester = event.params.revoker;
    entity.recipient = event.params.recipient;
    entity.time = event.block.timestamp;
    entity.expirationTime = event.block.timestamp;
    entity.revocable = true;
    entity.refUID = id;
    entity.data = new Uint8Array(0);
    entity.txHash = event.transaction.hash;
  }
  entity.revokedAt = event.block.timestamp;
  entity.save();
}
