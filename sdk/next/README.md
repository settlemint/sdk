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
<a href="https://fsl.software" rel="nofollow"><img src="https://img.shields.io/npm/l/@settlemint/sdk-next" alt="License"></a>
<a href="https://www.npmjs.com/package/@settlemint/sdk-next" rel="nofollow"><img src="https://img.shields.io/npm/dw/@settlemint/sdk-next" alt="npm"></a>
<a href="https://github.com/settlemint/sdk" rel="nofollow"><img src="https://img.shields.io/github/stars/settlemint/sdk" alt="stars"></a>
</p>

<div align="center">
  <a href="https://console.settlemint.com/documentation/">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://discord.com/invite/Mt5yqFrey9">Discord</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/sdk-next">NPM</a>
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

The SettleMint Next.js SDK provides a seamless integration layer between Next.js applications and the SettleMint platform. It offers a collection of utilities, hooks, and components specifically designed for Next.js applications, making it easy to interact with SettleMint's services while following Next.js best practices.

## Usage

TODO: define default

## API Reference

## Functions

### HelloWorld()

> **HelloWorld**(`__namedParameters`): `ReactElement`

Defined in: [components/test.tsx:10](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/next/src/components/test.tsx#L10)

A simple Hello World component that greets the user.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | `HelloWorldProps` |

#### Returns

`ReactElement`

***

### proxyMiddleware()

> **proxyMiddleware**(`request`): `NextResponse` \| `undefined`

Defined in: [middlewares/proxy.ts:22](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/next/src/middlewares/proxy.ts#L22)

Middleware function to handle proxy requests

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | `NextRequest` | The incoming Next.js request |

#### Returns

`NextResponse` \| `undefined`

A modified NextResponse for proxy routes, or undefined for non-proxy routes

#### Example

```typescript
import { proxyMiddleware } from './middleware/proxy';

export default function middleware(request: NextRequest) {
  return proxyMiddleware(request);
}
```

***

### withSettleMint()

> **withSettleMint**\<`C`\>(`nextConfig`, `options`): `Promise`\<`C`\>

Defined in: [config/with-settlemint.ts:18](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/next/src/config/with-settlemint.ts#L18)

Modifies the passed in Next.js configuration with SettleMint-specific settings

#### Type Parameters

| Type Parameter |
| ------ |
| `C` *extends* `NextConfig` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `nextConfig` | `C` | The original Next.js configuration |
| `options` | `WithSettleMintOptions` | Options for customizing the SettleMint configuration |

#### Returns

`Promise`\<`C`\>

A Promise that resolves to the modified Next.js configuration

#### Throws

If the SettleMint configuration cannot be read or processed

## Contributing

We welcome contributions from the community! Please check out our [Contributing](../../.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](LICENSE) file for more details.
