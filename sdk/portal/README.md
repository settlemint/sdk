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
<a href="https://fsl.software" rel="nofollow"><img src="https://img.shields.io/npm/l/@settlemint/sdk-portal" alt="License"></a>
<a href="https://www.npmjs.com/package/@settlemint/sdk-portal" rel="nofollow"><img src="https://img.shields.io/npm/dw/@settlemint/sdk-portal" alt="npm"></a>
<a href="https://github.com/settlemint/sdk" rel="nofollow"><img src="https://img.shields.io/github/stars/settlemint/sdk" alt="stars"></a>
</p>

<div align="center">
  <a href="https://console.settlemint.com/documentation/">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://discord.com/invite/Mt5yqFrey9">Discord</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/sdk-portal">NPM</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/settlemint/sdk/issues">Issues</a>
  <br />
</div>

## Table of Contents

- [About](#about)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## About

The SettleMint Smart Contract Portal SDK provides a seamless way to interact with the Smart Contract Portal Middleware API. It enables you to easily interact with your smart contracts using a REST or GraphQL API.

The SDK offers a type-safe interface for all Portal API operations, with comprehensive error handling and validation. It integrates smoothly with modern TypeScript applications while providing a simple and intuitive developer experience.

For detailed information about using the Smart Contract Portal Middleware, check out our [official documentation](https://console.settlemint.com/documentation/docs/using-platform/middleware/#the-smart-contract-portal-middleware).

## Usage

TODO: define default

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

We welcome contributions from the community! Please check out our [Contributing](../../.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](LICENSE) file for more details.
