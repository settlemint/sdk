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
<a href="https://fsl.software" rel="nofollow"><img src="https://img.shields.io/npm/l/@settlemint/sdk-minio" alt="License"></a>
<a href="https://www.npmjs.com/package/@settlemint/sdk-minio" rel="nofollow"><img src="https://img.shields.io/npm/dw/@settlemint/sdk-minio" alt="npm"></a>
<a href="https://github.com/settlemint/sdk" rel="nofollow"><img src="https://img.shields.io/github/stars/settlemint/sdk" alt="stars"></a>
</p>

<div align="center">
  <a href="https://console.settlemint.com/documentation/">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://discord.com/invite/Mt5yqFrey9">Discord</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/sdk-minio">NPM</a>
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

The SettleMint MinIO SDK provides a simple way to interact with MinIO object storage through the SettleMint platform. It enables you to easily store and retrieve files using MinIO's S3-compatible API in a secure and scalable manner.

For detailed information about using MinIO with the SettleMint platform, check out our [official documentation](https://console.settlemint.com/documentation/docs/using-platform/storage/).

## API Reference

### Functions

#### createServerMinioClient()

> **createServerMinioClient**(`options`): `object`

Defined in: [sdk/minio/src/minio.ts:28](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/minio/src/minio.ts#L28)

Creates a Portal client for server-side use with additional authentication.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `accessKey`: `string`; `accessToken`: `string`; `instance`: `string`; `secretKey`: `string`; \} | The server client options for configuring the Portal client. |
| `options.accessKey` | `string` | - |
| `options.accessToken` | `string` | - |
| `options.instance` | `string` | - |
| `options.secretKey` | `string` | - |

##### Returns

`object`

An object containing the GraphQL client and the initialized graphql function.

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `client` | `Client` | [sdk/minio/src/minio.ts:28](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/minio/src/minio.ts#L28) |

##### Throws

Will throw an error if not called on the server or if the options fail validation.

##### Example

```ts
const { client, graphql } = createServerPortalClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    DateTime: Date;
    JSON: Record<string, unknown>;
  };
}>({
  instance: 'https://your-portal-instance.com',
  accessToken: 'your-access-token',
  adminSecret: 'your-admin-secret',
});
```

## Contributing

We welcome contributions from the community! Please check out our [Contributing](../../.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](LICENSE) file for more details.
