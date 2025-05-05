# @settlemint/sdk-eas

Ethereum Attestation Service (EAS) integration for SettleMint SDK.

## Features

- [ ] Attestation submit/parse
- [ ] Graph query helpers
- [ ] Schema creation utils

## Installation

```bash
npm install @settlemint/sdk-eas
```

## Usage

```typescript
import { createEASClient } from '@settlemint/sdk-eas';
import { getPublicClient, getWalletClient } from '@settlemint/sdk-viem';

const publicClient = getPublicClient({ ... });
const walletClient = getWalletClient({ ... });

const easClient = createEASClient({
  publicClient,
  walletClient,
  schemaRegistryAddress: '0x...',
  attestationContractAddress: '0x...',
});

// Create a schema
const schemaId = await easClient.createSchema({
  schema: 'bytes32 documentHash,uint256 timestamp,address userId',
  resolver: '0x...',
  revocable: true,
});

// Submit an attestation
const attestationId = await easClient.submitAttestation(schemaId, {
  recipient: '0x...',
  expirationTime: 0n,
  revocable: true,
  data: '0x...',
});

// Parse an attestation
const attestation = await easClient.parseAttestation(attestationId);

// Get attestations for a schema
const attestations = await easClient.getAttestations(schemaId);
```

## License

FSL-1.1-MIT 