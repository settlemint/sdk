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
  <a href="https://console.settlemint.com/documentation">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/sdk-next">NPM</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/settlemint/sdk/issues">Issues</a>
  <br />
</div>

## Table of Contents

- [About](#about)
- [API Reference](#api-reference)
  - [Functions](#functions)
    - [HelloWorld()](#helloworld)
    - [withSettleMint()](#withsettlemint)
  - [Interfaces](#interfaces)
    - [HelloWorldProps](#helloworldprops)
    - [WithSettleMintOptions](#withsettlemintoptions)
- [Contributing](#contributing)
- [License](#license)

## About

The SettleMint Next.js SDK provides a seamless integration layer between Next.js applications and the SettleMint platform. It offers a collection of utilities, hooks, and components specifically designed for Next.js applications, making it easy to interact with SettleMint's services while following Next.js best practices.

## API Reference

### Functions

#### HelloWorld()

> **HelloWorld**(`props`): `ReactElement`

Defined in: [components/test.tsx:16](https://github.com/settlemint/sdk/blob/v2.5.11/sdk/next/src/components/test.tsx#L16)

A simple Hello World component that greets the user.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `props` | [`HelloWorldProps`](#helloworldprops) | The props for the HelloWorld component. |

##### Returns

`ReactElement`

A React element that displays a greeting to the user.

***

#### withSettleMint()

> **withSettleMint**\<`C`\>(`nextConfig`, `options`): `Promise`\<`C`\>

Defined in: [config/with-settlemint.ts:21](https://github.com/settlemint/sdk/blob/v2.5.11/sdk/next/src/config/with-settlemint.ts#L21)

Modifies the passed in Next.js configuration with SettleMint-specific settings.

##### Type Parameters

| Type Parameter |
| ------ |
| `C` *extends* `NextConfig` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `nextConfig` | `C` | The original Next.js configuration |
| `options` | [`WithSettleMintOptions`](#withsettlemintoptions) | Options for customizing the SettleMint configuration |

##### Returns

`Promise`\<`C`\>

The modified Next.js configuration

##### Throws

If the SettleMint configuration cannot be read or processed

### Interfaces

#### HelloWorldProps

Defined in: [components/test.tsx:6](https://github.com/settlemint/sdk/blob/v2.5.11/sdk/next/src/components/test.tsx#L6)

The props for the HelloWorld component.

***

#### WithSettleMintOptions

Defined in: [config/with-settlemint.ts:6](https://github.com/settlemint/sdk/blob/v2.5.11/sdk/next/src/config/with-settlemint.ts#L6)

Options for configuring the SettleMint configuration.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="disabled"></a> `disabled?` | `boolean` | Whether to disable the SettleMint configuration. | [config/with-settlemint.ts:10](https://github.com/settlemint/sdk/blob/v2.5.11/sdk/next/src/config/with-settlemint.ts#L10) |

## Contributing

We welcome contributions from the community! Please check out our [Contributing](https://github.com/settlemint/sdk/blob/main/.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](https://github.com/settlemint/sdk/blob/main/LICENSE) file for more details.
