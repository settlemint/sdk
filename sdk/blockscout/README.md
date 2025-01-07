<p align="center">
  <img src="https://github.com/settlemint/sdk/blob/main/logo.svg" width="200px" align="center" alt="SettleMint logo" />
  <h1 align="center">SettleMint SDK</h1>
  <p align="center">
    ✨ <a href="https://settlemint.com">https://settlemint.com</a> ✨
    <br/>
    Integrate SettleMint into your application with ease.
  </p>
</p>

<p align="center">
<a href="https://github.com/settlemint/sdk/actions?query=branch%3Amain"><img src="https://github.com/settlemint/sdk/actions/workflows/build.yml/badge.svg?event=push&branch=main" alt="CI status" /></a>
<a href="https://fsl.software" rel="nofollow"><img src="https://img.shields.io/npm/l/@settlemint/sdk-blockscout" alt="License"></a>
<a href="https://www.npmjs.com/package/@settlemint/sdk-blockscout" rel="nofollow"><img src="https://img.shields.io/npm/dw/@settlemint/sdk-blockscout" alt="npm"></a>
<a href="https://github.com/settlemint/sdk" rel="nofollow"><img src="https://img.shields.io/github/stars/settlemint/sdk" alt="stars"></a>
</p>

<div align="center">
  <a href="https://console.settlemint.com/documentation/">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://discord.com/invite/Mt5yqFrey9">Discord</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/sdk-blockscout">NPM</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/settlemint/sdk/issues">Issues</a>
  <br />
</div>

## Table of Contents

- [About](#about)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## About

The SettleMint Blockscout SDK provides a seamless way to interact with Blockscout APIs for blockchain data exploration and analysis. It enables you to easily query transaction data, blocks, addresses, smart contracts and more from your SettleMint-powered blockchain networks.

For detailed information about using Blockscout with the SettleMint platform, check out our [official documentation](https://console.settlemint.com/documentation/docs/using-platform/insights/).

## API Reference

### Creating a Blockscout Client

#### Server-side Usage

```typescript
import { createBlockscoutClient } from '@settlemint/sdk-blockscout';

const { client } = createBlockscoutClient({
  instance: 'https://your-blockscout-instance.com',
  accessToken: 'your-access-token',
});
```

#### Browser-side Usage

```typescript
import { createBlockscoutClient } from '@settlemint/sdk-blockscout';

const { client } = createBlockscoutClient({});
```

### Making GraphQL Queries

```typescript
import { createBlockscoutClient } from '@settlemint/sdk-blockscout';

const { client, graphql } = createBlockscoutClient({
  instance: 'https://your-blockscout-instance.com',
  accessToken: 'your-access-token',
});

// Define your query using the type-safe graphql template literal
const query = graphql(`
  query GetTransaction($hash: String!) {
    transaction(hash: $hash) {
      hash
      blockNumber
      value
      gasUsed
    }
  }
`);

// Execute the query
const result = await client.request(query, {
  hash: "0x123abc..."
});
```

## Contributing

We welcome contributions to the SettleMint SDK! If you'd like to contribute, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them with a clear commit message
4. Push your changes to your fork
5. Create a pull request to the main repository

Please ensure that your code follows the existing style and includes appropriate tests and documentation.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](LICENSE) file for more details.
