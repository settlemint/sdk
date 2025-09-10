import { Attestation, Schema } from "../generated/schema";
import { type Attested, type Revoked, EAS } from "../generated/EAS/EAS";
import type { Registered } from "../generated/SchemaRegistry/SchemaRegistry";
import { Bytes, BigInt as GraphBigInt } from "@graphprotocol/graph-ts";

export function handleRegistered(event: Registered): void {
  const uid = event.params.uid;
  // Convert bytes32 to hex string for ID
  const id = uid.toHexString();

  let entity = Schema.load(id);
  if (entity == null) {
    entity = new Schema(id);
  }
  entity.resolver = event.params.schema.resolver;
  entity.revocable = event.params.schema.revocable;
  entity.schema = event.params.schema.schema;
  entity.createdAt = event.block.timestamp;
  entity.txHash = event.transaction.hash;
  entity.save();
}

export function handleAttested(event: Attested): void {
  const uid = event.params.uid;
  const id = uid.toHexString();
  let entity = Attestation.load(id);
  if (entity == null) {
    entity = new Attestation(id);
  }

  // Always set basic fields from event
  entity.schema = event.params.schemaUID;
  entity.attester = event.params.attester;
  entity.recipient = event.params.recipient;
  entity.time = event.block.timestamp;
  entity.txHash = event.transaction.hash;
  entity.revoked = false;
  // Initialize with defaults
  entity.expirationTime = GraphBigInt.fromI32(0);
  entity.revocable = true;
  entity.refUID = Bytes.fromHexString("0x0000000000000000000000000000000000000000000000000000000000000000");
  entity.data = Bytes.empty(); // Default to empty
  // Try contract call to get real data
  const easContract = EAS.bind(event.address);
  const attestationResult = easContract.try_getAttestation(uid);

  if (!attestationResult.reverted) {
    const attestation = attestationResult.value;

    // Update all fields from contract
    entity.time = attestation.time;
    entity.expirationTime = attestation.expirationTime;
    entity.revocable = attestation.revocable;
    entity.refUID = attestation.refUID;

    // The critical part - get the data field
    if (attestation.data && attestation.data.length > 0) {
      entity.data = attestation.data;
    }
  }
  entity.save();
}

export function handleRevoked(event: Revoked): void {
  const uid = event.params.uid;
  // Convert bytes32 to hex string for ID
  const id = uid.toHexString();

  let entity = Attestation.load(id);
  if (entity == null) {
    // If not present, create with minimal fields so revokedAt is known.
    entity = new Attestation(id);
    entity.schema = event.params.schemaUID; // link by uid
    entity.attester = event.params.attester;
    entity.recipient = event.params.recipient;
    entity.time = event.block.timestamp;
    entity.expirationTime = event.block.timestamp;
    entity.revocable = true;
    entity.refUID = uid;
    entity.data = Bytes.empty();
    entity.txHash = event.transaction.hash;
    entity.revoked = false; // Will be set to true below
  }
  entity.revokedAt = event.block.timestamp;
  entity.revoked = true; // Mark as revoked
  entity.save();
}
