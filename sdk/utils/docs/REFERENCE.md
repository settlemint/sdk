## Variables

### ApplicationAccessTokenSchema

> `const` **ApplicationAccessTokenSchema**: `ZodString`

Defined in: [sdk/utils/src/validation/access-token.schema.ts:5](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/utils/src/validation/access-token.schema.ts#L5)

Schema for validating access tokens.

***

### DotEnvSchema

> `const` **DotEnvSchema**: `ZodObject`\<\{ `SETTLEMINT_ACCESS_TOKEN`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_APPLICATION`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_BLOCKCHAIN_NETWORK`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_BLOCKCHAIN_NODE`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_BLOCKSCOUT`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_CUSTOM_DEPLOYMENT`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_CUSTOM_DEPLOYMENT_ENDPOINT`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_HASURA`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_HASURA_ADMIN_SECRET`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_HASURA_DATABASE_URL`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_HASURA_ENDPOINT`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_HD_PRIVATE_KEY`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_INSTANCE`: `ZodDefault`\<`ZodString`\>; `SETTLEMINT_IPFS`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_IPFS_API_ENDPOINT`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_IPFS_GATEWAY_ENDPOINT`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_IPFS_PINNING_ENDPOINT`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_LOAD_BALANCER`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_MINIO`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_MINIO_ACCESS_KEY`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_MINIO_ENDPOINT`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_MINIO_SECRET_KEY`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_NEW_PROJECT_NAME`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_PERSONAL_ACCESS_TOKEN`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_PORTAL`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_PORTAL_REST_ENDPOINT`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_SMART_CONTRACT_ADDRESS`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_SMART_CONTRACT_DEPLOYMENT_ID`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_THEGRAPH`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_THEGRAPH_SUBGRAPH_NAME`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS`: `ZodEffects`\<`ZodOptional`\<`ZodArray`\<`ZodString`\>\>, `undefined` \| `string`[], `unknown`\>; `SETTLEMINT_WORKSPACE`: `ZodOptional`\<`ZodString`\>; \}, `"strip"`, \{ `SETTLEMINT_ACCESS_TOKEN`: `string`; `SETTLEMINT_APPLICATION`: `string`; `SETTLEMINT_BLOCKCHAIN_NETWORK`: `string`; `SETTLEMINT_BLOCKCHAIN_NODE`: `string`; `SETTLEMINT_BLOCKSCOUT`: `string`; `SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT`: `string`; `SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT`: `string`; `SETTLEMINT_CUSTOM_DEPLOYMENT`: `string`; `SETTLEMINT_CUSTOM_DEPLOYMENT_ENDPOINT`: `string`; `SETTLEMINT_HASURA`: `string`; `SETTLEMINT_HASURA_ADMIN_SECRET`: `string`; `SETTLEMINT_HASURA_DATABASE_URL`: `string`; `SETTLEMINT_HASURA_ENDPOINT`: `string`; `SETTLEMINT_HD_PRIVATE_KEY`: `string`; `SETTLEMINT_INSTANCE`: `string`; `SETTLEMINT_IPFS`: `string`; `SETTLEMINT_IPFS_API_ENDPOINT`: `string`; `SETTLEMINT_IPFS_GATEWAY_ENDPOINT`: `string`; `SETTLEMINT_IPFS_PINNING_ENDPOINT`: `string`; `SETTLEMINT_LOAD_BALANCER`: `string`; `SETTLEMINT_MINIO`: `string`; `SETTLEMINT_MINIO_ACCESS_KEY`: `string`; `SETTLEMINT_MINIO_ENDPOINT`: `string`; `SETTLEMINT_MINIO_SECRET_KEY`: `string`; `SETTLEMINT_NEW_PROJECT_NAME`: `string`; `SETTLEMINT_PERSONAL_ACCESS_TOKEN`: `string`; `SETTLEMINT_PORTAL`: `string`; `SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT`: `string`; `SETTLEMINT_PORTAL_REST_ENDPOINT`: `string`; `SETTLEMINT_SMART_CONTRACT_ADDRESS`: `string`; `SETTLEMINT_SMART_CONTRACT_DEPLOYMENT_ID`: `string`; `SETTLEMINT_THEGRAPH`: `string`; `SETTLEMINT_THEGRAPH_SUBGRAPH_NAME`: `string`; `SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS`: `string`[]; `SETTLEMINT_WORKSPACE`: `string`; \}, \{ `SETTLEMINT_ACCESS_TOKEN`: `string`; `SETTLEMINT_APPLICATION`: `string`; `SETTLEMINT_BLOCKCHAIN_NETWORK`: `string`; `SETTLEMINT_BLOCKCHAIN_NODE`: `string`; `SETTLEMINT_BLOCKSCOUT`: `string`; `SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT`: `string`; `SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT`: `string`; `SETTLEMINT_CUSTOM_DEPLOYMENT`: `string`; `SETTLEMINT_CUSTOM_DEPLOYMENT_ENDPOINT`: `string`; `SETTLEMINT_HASURA`: `string`; `SETTLEMINT_HASURA_ADMIN_SECRET`: `string`; `SETTLEMINT_HASURA_DATABASE_URL`: `string`; `SETTLEMINT_HASURA_ENDPOINT`: `string`; `SETTLEMINT_HD_PRIVATE_KEY`: `string`; `SETTLEMINT_INSTANCE`: `string`; `SETTLEMINT_IPFS`: `string`; `SETTLEMINT_IPFS_API_ENDPOINT`: `string`; `SETTLEMINT_IPFS_GATEWAY_ENDPOINT`: `string`; `SETTLEMINT_IPFS_PINNING_ENDPOINT`: `string`; `SETTLEMINT_LOAD_BALANCER`: `string`; `SETTLEMINT_MINIO`: `string`; `SETTLEMINT_MINIO_ACCESS_KEY`: `string`; `SETTLEMINT_MINIO_ENDPOINT`: `string`; `SETTLEMINT_MINIO_SECRET_KEY`: `string`; `SETTLEMINT_NEW_PROJECT_NAME`: `string`; `SETTLEMINT_PERSONAL_ACCESS_TOKEN`: `string`; `SETTLEMINT_PORTAL`: `string`; `SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT`: `string`; `SETTLEMINT_PORTAL_REST_ENDPOINT`: `string`; `SETTLEMINT_SMART_CONTRACT_ADDRESS`: `string`; `SETTLEMINT_SMART_CONTRACT_DEPLOYMENT_ID`: `string`; `SETTLEMINT_THEGRAPH`: `string`; `SETTLEMINT_THEGRAPH_SUBGRAPH_NAME`: `string`; `SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS`: `unknown`; `SETTLEMINT_WORKSPACE`: `string`; \}\>

Defined in: [sdk/utils/src/validation/dot-env.schema.ts:9](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/utils/src/validation/dot-env.schema.ts#L9)

Schema for validating access tokens.

***

### IdSchema

> `const` **IdSchema**: `ZodUnion`\<\[`ZodString`, `ZodString`\]\>

Defined in: [sdk/utils/src/validation/id.schema.ts:5](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/utils/src/validation/id.schema.ts#L5)

Schema for validating IDs. Accepts both PostgreSQL UUIDs and MongoDB ObjectIDs.

***

### UniqueNameSchema

> `const` **UniqueNameSchema**: `ZodString`

Defined in: [sdk/utils/src/validation/unique-name.schema.ts:5](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/utils/src/validation/unique-name.schema.ts#L5)

Schema for validating unique names. Only accepts lowercase alphanumeric characters.

***

### UrlPathSchema

> `const` **UrlPathSchema**: `ZodString`

Defined in: [sdk/utils/src/validation/url.schema.ts:17](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/utils/src/validation/url.schema.ts#L17)

Schema for validating URL paths.

This schema ensures that the path:
- Starts with a forward slash
- Can contain letters, numbers, hyphens, underscores, and additional forward slashes
- Does not end with a forward slash (unless it's the root path "/")
- Is case-sensitive

***

### UrlSchema

> `const` **UrlSchema**: `ZodString`

Defined in: [sdk/utils/src/validation/url.schema.ts:5](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/utils/src/validation/url.schema.ts#L5)

Schema for validating URLs.

## Functions

### emptyDir()

> **emptyDir**(`dir`): `Promise`\<`void`\>

Defined in: [sdk/utils/src/package-manager/download-and-extract.ts:93](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/utils/src/package-manager/download-and-extract.ts#L93)

Empties a directory by removing all its contents except for the .git directory.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `dir` | `string` | The directory to empty |

#### Returns

`Promise`\<`void`\>

#### Example

```typescript
await emptyDir("/path/to/directory");
```

***

### executeCommand()

> **executeCommand**(`command`, `args`, `options`?): `Promise`\<`string`[]\>

Defined in: [sdk/utils/src/terminal/execute-command.ts:17](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/utils/src/terminal/execute-command.ts#L17)

Executes a command with the given arguments in a child process

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `command` | `string` | The command to execute |
| `args` | `string`[] | Array of arguments to pass to the command |
| `options`? | `ExecuteCommandOptions` | Options to pass to the spawn command |

#### Returns

`Promise`\<`string`[]\>

Promise that resolves when the process completes successfully

#### Throws

Error if the process fails or exits with non-zero code

***

### exists()

> **exists**(`path`): `Promise`\<`boolean`\>

Defined in: [sdk/utils/src/filesystem/exists.ts:10](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/utils/src/filesystem/exists.ts#L10)

Checks if a file or directory exists at the given path

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `PathLike` | The path to check |

#### Returns

`Promise`\<`boolean`\>

True if the path exists, false otherwise

***

### formatTargetDir()

> **formatTargetDir**(`targetDir`): `string`

Defined in: [sdk/utils/src/package-manager/download-and-extract.ts:62](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/utils/src/package-manager/download-and-extract.ts#L62)

Formats the target directory string by trimming and removing trailing slashes.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `targetDir` | `string` | The target directory path to format |

#### Returns

`string`

The formatted target directory path

#### Example

```typescript
const formattedDir = formatTargetDir("/path/to/directory/");
console.log(formattedDir); // "/path/to/directory"
```

***

### isEmpty()

> **isEmpty**(`path`): `Promise`\<`boolean`\>

Defined in: [sdk/utils/src/package-manager/download-and-extract.ts:78](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/utils/src/package-manager/download-and-extract.ts#L78)

Checks if a directory is empty (contains no files or only a .git directory).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The path to check |

#### Returns

`Promise`\<`boolean`\>

True if the directory is empty, false otherwise

#### Example

```typescript
const dirIsEmpty = await isEmpty("/path/to/directory");
console.log(dirIsEmpty);
```

***

### isPackageInstalled()

> **isPackageInstalled**(`name`, `path`?): `Promise`\<`boolean`\>

Defined in: [sdk/utils/src/package-manager/is-package-installed.ts:17](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/utils/src/package-manager/is-package-installed.ts#L17)

Checks if a package is installed in the project's dependencies.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The name of the package to check. |
| `path`? | `string` | Optional path to the project root. If not provided, it will be determined automatically. |

#### Returns

`Promise`\<`boolean`\>

A boolean indicating whether the package is installed in any of the dependency types (dependencies, devDependencies, or peerDependencies).

#### Throws

If there's an issue reading the package.json file.

#### Example

```typescript
const isInstalled = await isPackageInstalled("react");
console.log(isInstalled); // true or false
```

***

### isValidPackageName()

> **isValidPackageName**(`projectName`): `boolean`

Defined in: [sdk/utils/src/package-manager/download-and-extract.ts:25](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/utils/src/package-manager/download-and-extract.ts#L25)

Checks if the given project name is a valid package name.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `projectName` | `string` | The project name to validate |

#### Returns

`boolean`

True if the project name is valid, false otherwise

#### Example

```typescript
const isValid = isValidPackageName("my-project");
console.log(isValid); // true
```

***

### loadEnv()

> **loadEnv**\<`T`\>(`validateEnv`, `prod`, `path`): `Promise`\<`T` *extends* `true` ? `DotEnv` : `DotEnvPartial`\>

Defined in: [sdk/utils/src/environment/load-env.ts:16](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/utils/src/environment/load-env.ts#L16)

Loads environment variables from .env files.
To enable encryption with dotenvx (https://www.dotenvx.com/docs) run `bunx dotenvx encrypt`

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` *extends* `boolean` | `true` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `validateEnv` | `T` |
| `prod` | `boolean` |
| `path` | `string` |

#### Returns

`Promise`\<`T` *extends* `true` ? `DotEnv` : `DotEnvPartial`\>

A promise that resolves to the validated environment variables.

#### Throws

Will throw an error if validation fails.

#### Example

```ts
const env = await loadEnv();
console.log(env.SETTLEMINT_INSTANCE);
```

***

### setName()

> **setName**(`name`, `path`?): `Promise`\<`void`\>

Defined in: [sdk/utils/src/package-manager/set-name.ts:15](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/utils/src/package-manager/set-name.ts#L15)

Sets the name field in the package.json file.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The new name to set in the package.json file. |
| `path`? | `string` | Optional path to the project root. If not provided, it will be determined automatically. |

#### Returns

`Promise`\<`void`\>

#### Throws

If there's an issue reading, updating, or saving the package.json file.

#### Example

```typescript
await setName("my-new-project-name");
```

***

### toValidPackageName()

> **toValidPackageName**(`projectName`): `string`

Defined in: [sdk/utils/src/package-manager/download-and-extract.ts:41](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/utils/src/package-manager/download-and-extract.ts#L41)

Converts a project name to a valid package name.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `projectName` | `string` | The project name to convert |

#### Returns

`string`

A valid package name

#### Example

```typescript
const validName = toValidPackageName("My Project Name");
console.log(validName); // "my-project-name"
```

***

### validate()

> **validate**\<`T`\>(`schema`, `value`): `T`\[`"_output"`\]

Defined in: [sdk/utils/src/validation.ts:14](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/utils/src/validation.ts#L14)

Validates a value against a given Zod schema.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `ZodType` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `schema` | `T` | The Zod schema to validate against. |
| `value` | `unknown` | The value to validate. |

#### Returns

`T`\[`"_output"`\]

The validated and parsed value.

#### Throws

Will throw an error if validation fails, with formatted error messages.

#### Example

```ts
const validatedId = validate(IdSchema, "550e8400-e29b-41d4-a716-446655440000");
```

## Type Aliases

### Id

> **Id**: `z.infer`\<*typeof* [`IdSchema`](REFERENCE.md#idschema)\>

Defined in: [sdk/utils/src/validation/id.schema.ts:17](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/utils/src/validation/id.schema.ts#L17)

Type definition for ID, inferred from IdSchema.

***

### Template

> **Template**: `object`

Defined in: [sdk/utils/src/package-manager/download-and-extract.ts:8](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/utils/src/package-manager/download-and-extract.ts#L8)

Array of available templates for project creation.

#### Type declaration

##### label

> **label**: `string`

##### value

> **value**: `string`
