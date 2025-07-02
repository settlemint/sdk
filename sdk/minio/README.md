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
  <a href="https://console.settlemint.com/documentation">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/sdk-minio">NPM</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/settlemint/sdk/issues">Issues</a>
  <br />
</div>

## Table of Contents

- [About](#about)
- [API Reference](#api-reference)
  - [Functions](#functions)
    - [createPresignedUploadUrl()](#createpresigneduploadurl)
    - [createServerMinioClient()](#createserverminioclient)
    - [deleteFile()](#deletefile)
    - [getFileById()](#getfilebyid)
    - [getFilesList()](#getfileslist)
    - [uploadFile()](#uploadfile)
  - [Interfaces](#interfaces)
    - [FileMetadata](#filemetadata)
  - [Variables](#variables)
    - [DEFAULT\_BUCKET](#default_bucket)
- [Contributing](#contributing)
- [License](#license)

## About

The SettleMint MinIO SDK provides a simple way to interact with MinIO object storage through the SettleMint platform. It enables you to easily store and retrieve files using MinIO's S3-compatible API in a secure and scalable manner.

## API Reference

### Functions

#### createPresignedUploadUrl()

> **createPresignedUploadUrl**(`client`, `fileName`, `path`, `bucket`, `expirySeconds`): `Promise`\<`string`\>

Defined in: [sdk/minio/src/helpers/functions.ts:261](https://github.com/settlemint/sdk/blob/v2.4.1/sdk/minio/src/helpers/functions.ts#L261)

Creates a presigned upload URL for direct browser uploads

##### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `client` | `Client` | `undefined` | The MinIO client to use |
| `fileName` | `string` | `undefined` | The file name to use |
| `path` | `string` | `""` | Optional path/folder |
| `bucket` | `string` | `DEFAULT_BUCKET` | Optional bucket name (defaults to DEFAULT_BUCKET) |
| `expirySeconds` | `number` | `3600` | How long the URL should be valid for |

##### Returns

`Promise`\<`string`\>

Presigned URL for PUT operation

##### Throws

Will throw an error if URL creation fails or client initialization fails

##### Example

```ts
import { createServerMinioClient, createPresignedUploadUrl } from "@settlemint/sdk-minio";

const { client } = createServerMinioClient({
  instance: process.env.SETTLEMINT_MINIO_ENDPOINT!,
  accessKey: process.env.SETTLEMINT_MINIO_ACCESS_KEY!,
  secretKey: process.env.SETTLEMINT_MINIO_SECRET_KEY!
});

// Generate the presigned URL on the server
const url = await createPresignedUploadUrl(client, "report.pdf", "documents/");

// Send the URL to the client/browser via HTTP response
return Response.json({ uploadUrl: url });

// Then in the browser:
const response = await fetch('/api/get-upload-url');
const { uploadUrl } = await response.json();
await fetch(uploadUrl, {
 method: 'PUT',
 headers: { 'Content-Type': 'application/pdf' },
 body: pdfFile
});
```

***

#### createServerMinioClient()

> **createServerMinioClient**(`options`): `object`

Defined in: [sdk/minio/src/minio.ts:23](https://github.com/settlemint/sdk/blob/v2.4.1/sdk/minio/src/minio.ts#L23)

Creates a MinIO client for server-side use with authentication.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `accessKey`: `string`; `instance`: `string`; `secretKey`: `string`; \} | The server client options for configuring the MinIO client |
| `options.accessKey` | `string` | The MinIO access key used to authenticate with the MinIO server |
| `options.instance` | `string` | The URL of the MinIO instance to connect to |
| `options.secretKey` | `string` | The MinIO secret key used to authenticate with the MinIO server |

##### Returns

`object`

An object containing the initialized MinIO client

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `client` | `Client` | [sdk/minio/src/minio.ts:23](https://github.com/settlemint/sdk/blob/v2.4.1/sdk/minio/src/minio.ts#L23) |

##### Throws

Will throw an error if not called on the server or if the options fail validation

##### Example

```ts
import { createServerMinioClient } from "@settlemint/sdk-minio";

const { client } = createServerMinioClient({
  instance: process.env.SETTLEMINT_MINIO_ENDPOINT!,
  accessKey: process.env.SETTLEMINT_MINIO_ACCESS_KEY!,
  secretKey: process.env.SETTLEMINT_MINIO_SECRET_KEY!
});
client.listBuckets();
```

***

#### deleteFile()

> **deleteFile**(`client`, `fileId`, `bucket`): `Promise`\<`boolean`\>

Defined in: [sdk/minio/src/helpers/functions.ts:214](https://github.com/settlemint/sdk/blob/v2.4.1/sdk/minio/src/helpers/functions.ts#L214)

Deletes a file from storage

##### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `client` | `Client` | `undefined` | The MinIO client to use |
| `fileId` | `string` | `undefined` | The file identifier/path |
| `bucket` | `string` | `DEFAULT_BUCKET` | Optional bucket name (defaults to DEFAULT_BUCKET) |

##### Returns

`Promise`\<`boolean`\>

Success status

##### Throws

Will throw an error if deletion fails or client initialization fails

##### Example

```ts
import { createServerMinioClient, deleteFile } from "@settlemint/sdk-minio";

const { client } = createServerMinioClient({
  instance: process.env.SETTLEMINT_MINIO_ENDPOINT!,
  accessKey: process.env.SETTLEMINT_MINIO_ACCESS_KEY!,
  secretKey: process.env.SETTLEMINT_MINIO_SECRET_KEY!
});

await deleteFile(client, "documents/report.pdf");
```

***

#### getFileById()

> **getFileById**(`client`, `fileId`, `bucket`): `Promise`\<[`FileMetadata`](#filemetadata)\>

Defined in: [sdk/minio/src/helpers/functions.ts:141](https://github.com/settlemint/sdk/blob/v2.4.1/sdk/minio/src/helpers/functions.ts#L141)

Gets a single file by its object name

##### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `client` | `Client` | `undefined` | The MinIO client to use |
| `fileId` | `string` | `undefined` | The file identifier/path |
| `bucket` | `string` | `DEFAULT_BUCKET` | Optional bucket name (defaults to DEFAULT_BUCKET) |

##### Returns

`Promise`\<[`FileMetadata`](#filemetadata)\>

File metadata with presigned URL

##### Throws

Will throw an error if the file doesn't exist or client initialization fails

##### Example

```ts
import { createServerMinioClient, getFileByObjectName } from "@settlemint/sdk-minio";

const { client } = createServerMinioClient({
  instance: process.env.SETTLEMINT_MINIO_ENDPOINT!,
  accessKey: process.env.SETTLEMINT_MINIO_ACCESS_KEY!,
  secretKey: process.env.SETTLEMINT_MINIO_SECRET_KEY!
});

const file = await getFileByObjectName(client, "documents/report.pdf");
```

***

#### getFilesList()

> **getFilesList**(`client`, `prefix`, `bucket`): `Promise`\<[`FileMetadata`](#filemetadata)[]\>

Defined in: [sdk/minio/src/helpers/functions.ts:62](https://github.com/settlemint/sdk/blob/v2.4.1/sdk/minio/src/helpers/functions.ts#L62)

Gets a list of files with optional prefix filter

##### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `client` | `Client` | `undefined` | The MinIO client to use |
| `prefix` | `string` | `""` | Optional prefix to filter files (like a folder path) |
| `bucket` | `string` | `DEFAULT_BUCKET` | Optional bucket name (defaults to DEFAULT_BUCKET) |

##### Returns

`Promise`\<[`FileMetadata`](#filemetadata)[]\>

Array of file metadata objects

##### Throws

Will throw an error if the operation fails or client initialization fails

##### Example

```ts
import { createServerMinioClient, getFilesList } from "@settlemint/sdk-minio";

const { client } = createServerMinioClient({
  instance: process.env.SETTLEMINT_MINIO_ENDPOINT!,
  accessKey: process.env.SETTLEMINT_MINIO_ACCESS_KEY!,
  secretKey: process.env.SETTLEMINT_MINIO_SECRET_KEY!
});

const files = await getFilesList(client, "documents/");
```

***

#### uploadFile()

> **uploadFile**(`client`, `buffer`, `objectName`, `contentType`, `bucket`): `Promise`\<[`FileMetadata`](#filemetadata)\>

Defined in: [sdk/minio/src/helpers/functions.ts:311](https://github.com/settlemint/sdk/blob/v2.4.1/sdk/minio/src/helpers/functions.ts#L311)

Uploads a buffer directly to storage

##### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `client` | `Client` | `undefined` | The MinIO client to use |
| `buffer` | `Buffer` | `undefined` | The buffer to upload |
| `objectName` | `string` | `undefined` | The full object name/path |
| `contentType` | `string` | `undefined` | The content type of the file |
| `bucket` | `string` | `DEFAULT_BUCKET` | Optional bucket name (defaults to DEFAULT_BUCKET) |

##### Returns

`Promise`\<[`FileMetadata`](#filemetadata)\>

The uploaded file metadata

##### Throws

Will throw an error if upload fails or client initialization fails

##### Example

```ts
import { createServerMinioClient, uploadBuffer } from "@settlemint/sdk-minio";

const { client } = createServerMinioClient({
  instance: process.env.SETTLEMINT_MINIO_ENDPOINT!,
  accessKey: process.env.SETTLEMINT_MINIO_ACCESS_KEY!,
  secretKey: process.env.SETTLEMINT_MINIO_SECRET_KEY!
});

const buffer = Buffer.from("Hello, world!");
const uploadedFile = await uploadFile(client, buffer, "documents/hello.txt", "text/plain");
```

### Interfaces

#### FileMetadata

Defined in: [sdk/minio/src/helpers/schema.ts:29](https://github.com/settlemint/sdk/blob/v2.4.1/sdk/minio/src/helpers/schema.ts#L29)

Type representing file metadata after validation.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="contenttype"></a> `contentType` | `string` | The content type of the file. | [sdk/minio/src/helpers/schema.ts:41](https://github.com/settlemint/sdk/blob/v2.4.1/sdk/minio/src/helpers/schema.ts#L41) |
| <a id="etag"></a> `etag` | `string` | The ETag of the file. | [sdk/minio/src/helpers/schema.ts:56](https://github.com/settlemint/sdk/blob/v2.4.1/sdk/minio/src/helpers/schema.ts#L56) |
| <a id="id"></a> `id` | `string` | The unique identifier for the file. | [sdk/minio/src/helpers/schema.ts:33](https://github.com/settlemint/sdk/blob/v2.4.1/sdk/minio/src/helpers/schema.ts#L33) |
| <a id="name"></a> `name` | `string` | The name of the file. | [sdk/minio/src/helpers/schema.ts:37](https://github.com/settlemint/sdk/blob/v2.4.1/sdk/minio/src/helpers/schema.ts#L37) |
| <a id="size"></a> `size` | `number` | The size of the file in bytes. | [sdk/minio/src/helpers/schema.ts:46](https://github.com/settlemint/sdk/blob/v2.4.1/sdk/minio/src/helpers/schema.ts#L46) |
| <a id="uploadedat"></a> `uploadedAt` | `string` | The date and time the file was uploaded. | [sdk/minio/src/helpers/schema.ts:51](https://github.com/settlemint/sdk/blob/v2.4.1/sdk/minio/src/helpers/schema.ts#L51) |
| <a id="url"></a> `url?` | `string` | The URL of the file. | [sdk/minio/src/helpers/schema.ts:61](https://github.com/settlemint/sdk/blob/v2.4.1/sdk/minio/src/helpers/schema.ts#L61) |

### Variables

#### DEFAULT\_BUCKET

> `const` **DEFAULT\_BUCKET**: `"uploads"` = `"uploads"`

Defined in: [sdk/minio/src/helpers/schema.ts:67](https://github.com/settlemint/sdk/blob/v2.4.1/sdk/minio/src/helpers/schema.ts#L67)

Default bucket name to use for file storage when none is specified.

## Contributing

We welcome contributions from the community! Please check out our [Contributing](https://github.com/settlemint/sdk/blob/main/.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](https://github.com/settlemint/sdk/blob/main/LICENSE) file for more details.
