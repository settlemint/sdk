Here are some examples of how to use the SettleMint JavaScript SDK:

### List Workspaces

```javascript
const client = createSettleMintClient({
  accessToken: 'your_access_token',
  instance: 'https://console.settlemint.com'
});

const workspaces = await client.workspace.list();
console.log(workspaces);
```

### Read a Specific Blockchain Network

```javascript
const client = createSettleMintClient({
  accessToken: 'your_access_token',
  instance: 'https://console.settlemint.com'
});

const networkId = 'your_network_id';
const network = await client.blockchainNetwork.read(networkId);
console.log(network);
```
