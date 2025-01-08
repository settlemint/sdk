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
<a href="https://fsl.software" rel="nofollow"><img src="https://img.shields.io/npm/l/@settlemint/sdk-utils" alt="License"></a>
<a href="https://www.npmjs.com/package/@settlemint/sdk-utils" rel="nofollow"><img src="https://img.shields.io/npm/dw/@settlemint/sdk-utils" alt="npm"></a>
<a href="https://github.com/settlemint/sdk" rel="nofollow"><img src="https://img.shields.io/github/stars/settlemint/sdk" alt="stars"></a>
</p>

<div align="center">
  <a href="https://console.settlemint.com/documentation/">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://discord.com/invite/Mt5yqFrey9">Discord</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/sdk-utils">NPM</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/settlemint/sdk/issues">Issues</a>
  <br />
</div>

## Table of Contents

- [About](#about)
- [API Reference](#api-reference)
  - [Functions](#functions)
    - [ascii()](#ascii)
    - [cancel()](#cancel)
    - [capitalizeFirstLetter()](#capitalizefirstletter)
    - [emptyDir()](#emptydir)
    - [ensureBrowser()](#ensurebrowser)
    - [ensureServer()](#ensureserver)
    - [executeCommand()](#executecommand)
    - [exists()](#exists)
    - [formatTargetDir()](#formattargetdir)
    - [getPackageManager()](#getpackagemanager)
    - [getPackageManagerExecutable()](#getpackagemanagerexecutable)
    - [installDependencies()](#installdependencies)
    - [intro()](#intro)
    - [isEmpty()](#isempty)
    - [isPackageInstalled()](#ispackageinstalled)
    - [loadEnv()](#loadenv)
    - [maskTokens()](#masktokens)
    - [note()](#note)
    - [outro()](#outro)
    - [projectRoot()](#projectroot)
    - [setName()](#setname)
    - [spinner()](#spinner)
    - [tryParseJson()](#tryparsejson)
    - [validate()](#validate)
    - [writeEnv()](#writeenv)
  - [Interfaces](#interfaces)
    - [ExecuteCommandOptions](#executecommandoptions)
    - [SpinnerOptions\<R\>](#spinneroptions\r\)
  - [Type Aliases](#type-aliases)
    - [DotEnv](#dotenv)
    - [DotEnvPartial](#dotenvpartial)
    - [Id](#id)
    - [Template](#template)
  - [Variables](#variables)
    - [AccessTokenSchema](#accesstokenschema)
    - [ApplicationAccessTokenSchema](#applicationaccesstokenschema)
    - [DotEnvSchema](#dotenvschema)
    - [DotEnvSchemaPartial](#dotenvschemapartial)
    - [IdSchema](#idschema)
    - [PersonalAccessTokenSchema](#personalaccesstokenschema)
    - [runsInBrowser](#runsinbrowser)
    - [runsOnServer](#runsonserver)
    - [UniqueNameSchema](#uniquenameschema)
    - [UrlOrPathSchema](#urlorpathschema)
    - [UrlPathSchema](#urlpathschema)
    - [UrlSchema](#urlschema)
- [Contributing](#contributing)
- [License](#license)

## About

The SettleMint Utils SDK provides a collection of shared utilities and helper functions used across the SettleMint SDK packages. It includes common functionality for configuration management, error handling, validation, and type definitions that ensure consistency and reliability across the SDK ecosystem.

## API Reference

### Functions

#### ascii()

> **ascii**(): `void`

Defined in: [sdk/utils/src/terminal/ascii.ts:13](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/terminal/ascii.ts#L13)

Prints the SettleMint ASCII art logo to the console in magenta color.
Used for CLI branding and visual identification.

##### Returns

`void`

##### Example

```ts
import { ascii } from "@settlemint/sdk-utils";

// Prints the SettleMint logo
ascii();
```

***

#### cancel()

> **cancel**(`msg`): `never`

Defined in: [sdk/utils/src/terminal/cancel.ts:17](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/terminal/cancel.ts#L17)

Displays an error message in red inverse text and exits the process.
Used to terminate execution with a visible error message.
Any sensitive tokens in the message are masked before display.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `msg` | `string` | The error message to display |

##### Returns

`never`

never - Function does not return as it exits the process

##### Example

```ts
import { cancel } from "@settlemint/sdk-utils";

// Exits process with error message
cancel("An error occurred");
```

***

#### capitalizeFirstLetter()

> **capitalizeFirstLetter**(`val`): `string`

Defined in: [sdk/utils/src/string.ts:13](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/string.ts#L13)

Capitalizes the first letter of a string.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `val` | `string` | The string to capitalize |

##### Returns

`string`

The input string with its first letter capitalized

##### Example

```ts
import { capitalizeFirstLetter } from "@settlemint/sdk-utils";

const capitalized = capitalizeFirstLetter("hello");
// Returns: "Hello"
```

***

#### emptyDir()

> **emptyDir**(`dir`): `Promise`\<`void`\>

Defined in: [sdk/utils/src/package-manager/download-and-extract.ts:53](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/package-manager/download-and-extract.ts#L53)

Removes all contents of a directory except the .git folder

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `dir` | `string` | The directory path to empty |

##### Returns

`Promise`\<`void`\>

##### Example

```ts
import { emptyDir } from "@settlemint/sdk-utils";

await emptyDir("/path/to/dir"); // Removes all contents except .git
```

***

#### ensureBrowser()

> **ensureBrowser**(): `void`

Defined in: [sdk/utils/src/runtime/ensure-server.ts:31](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/runtime/ensure-server.ts#L31)

Ensures that code is running in a browser environment and not on the server.

##### Returns

`void`

##### Throws

If called from a server environment

##### Example

```ts
import { ensureBrowser } from "@settlemint/sdk-utils";

// Will throw if running on server
ensureBrowser();
```

***

#### ensureServer()

> **ensureServer**(): `void`

Defined in: [sdk/utils/src/runtime/ensure-server.ts:13](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/runtime/ensure-server.ts#L13)

Ensures that code is running on the server and not in a browser environment.

##### Returns

`void`

##### Throws

If called from a browser environment

##### Example

```ts
import { ensureServer } from "@settlemint/sdk-utils";

// Will throw if running in browser
ensureServer();
```

***

#### executeCommand()

> **executeCommand**(`command`, `args`, `options`?): `Promise`\<`string`[]\>

Defined in: [sdk/utils/src/terminal/execute-command.ts:31](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/terminal/execute-command.ts#L31)

Executes a command with the given arguments in a child process.
Pipes stdin to the child process and captures stdout/stderr output.
Masks any sensitive tokens in the output before displaying or returning.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `command` | `string` | The command to execute |
| `args` | `string`[] | Array of arguments to pass to the command |
| `options`? | [`ExecuteCommandOptions`](README.md#executecommandoptions) | Options for customizing command execution |

##### Returns

`Promise`\<`string`[]\>

Array of output strings from stdout and stderr

##### Throws

If the process fails to start or exits with non-zero code

##### Example

```ts
import { executeCommand } from "@settlemint/sdk-utils";

// Execute git clone
await executeCommand("git", ["clone", "repo-url"]);

// Execute silently
await executeCommand("npm", ["install"], { silent: true });
```

***

#### exists()

> **exists**(`path`): `Promise`\<`boolean`\>

Defined in: [sdk/utils/src/filesystem/exists.ts:17](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/filesystem/exists.ts#L17)

Checks if a file or directory exists at the given path

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `PathLike` | The file system path to check for existence |

##### Returns

`Promise`\<`boolean`\>

Promise that resolves to true if the path exists, false otherwise

##### Example

```ts
import { exists } from "@settlemint/sdk-utils";

// Check if file exists before reading
if (await exists('/path/to/file.txt')) {
  // File exists, safe to read
}
```

***

#### formatTargetDir()

> **formatTargetDir**(`targetDir`): `string`

Defined in: [sdk/utils/src/package-manager/download-and-extract.ts:23](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/package-manager/download-and-extract.ts#L23)

Formats a directory path by removing trailing slashes and whitespace

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `targetDir` | `string` | The directory path to format |

##### Returns

`string`

The formatted directory path

##### Example

```ts
import { formatTargetDir } from "@settlemint/sdk-utils";

const formatted = formatTargetDir("/path/to/dir/ "); // "/path/to/dir"
```

***

#### getPackageManager()

> **getPackageManager**(`targetDir`?): `Promise`\<`AgentName`\>

Defined in: [sdk/utils/src/package-manager/get-package-manager.ts:15](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/package-manager/get-package-manager.ts#L15)

Detects the package manager used in the current project

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `targetDir`? | `string` | The directory to check for package manager (optional, defaults to process.cwd()) |

##### Returns

`Promise`\<`AgentName`\>

The name of the package manager

##### Example

```ts
import { getPackageManager } from "@settlemint/sdk-utils";

const packageManager = await getPackageManager();
console.log(`Using ${packageManager}`);
```

***

#### getPackageManagerExecutable()

> **getPackageManagerExecutable**(`targetDir`?): `Promise`\<\{ `args`: `string`[]; `command`: `string`; \}\>

Defined in: [sdk/utils/src/package-manager/get-package-manager-executable.ts:14](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/package-manager/get-package-manager-executable.ts#L14)

Retrieves the executable command and arguments for the package manager

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `targetDir`? | `string` | The directory to check for package manager (optional, defaults to process.cwd()) |

##### Returns

`Promise`\<\{ `args`: `string`[]; `command`: `string`; \}\>

An object containing the command and arguments for the package manager

##### Example

```ts
import { getPackageManagerExecutable } from "@settlemint/sdk-utils";

const { command, args } = await getPackageManagerExecutable();
console.log(`Using ${command} with args: ${args.join(" ")}`);
```

***

#### installDependencies()

> **installDependencies**(`pkgs`): `Promise`\<`void`\>

Defined in: [sdk/utils/src/package-manager/install-dependencies.ts:18](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/package-manager/install-dependencies.ts#L18)

Installs one or more packages as dependencies using the detected package manager

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pkgs` | `string` \| `string`[] | A single package name or array of package names to install |

##### Returns

`Promise`\<`void`\>

A promise that resolves when installation is complete

##### Throws

If package installation fails

##### Example

```ts
import { installDependencies } from "@settlemint/sdk-utils";

// Install a single package
await installDependencies("express");

// Install multiple packages
await installDependencies(["express", "cors"]);
```

***

#### intro()

> **intro**(`msg`): `void`

Defined in: [sdk/utils/src/terminal/intro.ts:15](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/terminal/intro.ts#L15)

Displays an introductory message in magenta text with padding.
Any sensitive tokens in the message are masked before display.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `msg` | `string` | The message to display as introduction |

##### Returns

`void`

##### Example

```ts
import { intro } from "@settlemint/sdk-utils";

// Display intro message
intro("Starting deployment...");
```

***

#### isEmpty()

> **isEmpty**(`path`): `Promise`\<`boolean`\>

Defined in: [sdk/utils/src/package-manager/download-and-extract.ts:39](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/package-manager/download-and-extract.ts#L39)

Checks if a directory is empty or contains only a .git folder

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The directory path to check |

##### Returns

`Promise`\<`boolean`\>

True if directory is empty or contains only .git, false otherwise

##### Example

```ts
import { isEmpty } from "@settlemint/sdk-utils";

if (await isEmpty("/path/to/dir")) {
  // Directory is empty
}
```

***

#### isPackageInstalled()

> **isPackageInstalled**(`name`, `path`?): `Promise`\<`boolean`\>

Defined in: [sdk/utils/src/package-manager/is-package-installed.ts:12](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/package-manager/is-package-installed.ts#L12)

Checks if a package is installed in the project's dependencies, devDependencies, or peerDependencies.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The name of the package to check |
| `path`? | `string` | The path to the project root directory. If not provided, will be automatically determined |

##### Returns

`Promise`\<`boolean`\>

Whether the package is installed

##### Throws

If unable to read or parse the package.json file

***

#### loadEnv()

> **loadEnv**\<`T`\>(`validateEnv`, `prod`, `path`): `Promise`\<`T` *extends* `true` ? [`DotEnv`](README.md#dotenv) : [`DotEnvPartial`](README.md#dotenvpartial)\>

Defined in: [sdk/utils/src/environment/load-env.ts:25](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/environment/load-env.ts#L25)

Loads environment variables from .env files.
To enable encryption with dotenvx (https://www.dotenvx.com/docs) run `bunx dotenvx encrypt`

##### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` *extends* `boolean` | `true` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `validateEnv` | `T` | Whether to validate the environment variables against the schema |
| `prod` | `boolean` | Whether to load production environment variables |
| `path` | `string` | Optional path to the directory containing .env files. Defaults to process.cwd() |

##### Returns

`Promise`\<`T` *extends* `true` ? [`DotEnv`](README.md#dotenv) : [`DotEnvPartial`](README.md#dotenvpartial)\>

A promise that resolves to the validated environment variables

##### Throws

Will throw an error if validation fails and validateEnv is true

##### Example

```ts
import { loadEnv } from '@settlemint/sdk-utils';

// Load and validate environment variables
const env = await loadEnv(true, false);
console.log(env.SETTLEMINT_INSTANCE);

// Load without validation
const rawEnv = await loadEnv(false, false);
```

***

#### maskTokens()

> **maskTokens**(`output`): `string`

Defined in: [sdk/utils/src/terminal/mask-tokens.ts:13](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/terminal/mask-tokens.ts#L13)

Masks sensitive SettleMint tokens in output text by replacing them with asterisks.
Handles personal access tokens (PAT), application access tokens (AAT), and service account tokens (SAT).

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `output` | `string` | The text string that may contain sensitive tokens |

##### Returns

`string`

The text with any sensitive tokens masked with asterisks

##### Example

```ts
import { maskTokens } from "@settlemint/sdk-utils";

// Masks a token in text
const masked = maskTokens("Token: sm_pat_abc123"); // "Token: ***"
```

***

#### note()

> **note**(`message`, `level`): `void`

Defined in: [sdk/utils/src/terminal/note.ts:20](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/terminal/note.ts#L20)

Displays a note message with optional warning level formatting.
Regular notes are displayed in normal text, while warnings are shown in yellow.
Any sensitive tokens in the message are masked before display.

##### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `message` | `string` | `undefined` | The message to display as a note |
| `level` | `"info"` \| `"warn"` | `"info"` | The note level: "info" (default) or "warn" for warning styling |

##### Returns

`void`

##### Example

```ts
import { note } from "@settlemint/sdk-utils";

// Display info note
note("Operation completed successfully");

// Display warning note
note("Low disk space remaining", "warn");
```

***

#### outro()

> **outro**(`msg`): `void`

Defined in: [sdk/utils/src/terminal/outro.ts:15](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/terminal/outro.ts#L15)

Displays a closing message in green inverted text with padding.
Any sensitive tokens in the message are masked before display.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `msg` | `string` | The message to display as conclusion |

##### Returns

`void`

##### Example

```ts
import { outro } from "@settlemint/sdk-utils";

// Display outro message
outro("Deployment completed successfully!");
```

***

#### projectRoot()

> **projectRoot**(): `Promise`\<`string`\>

Defined in: [sdk/utils/src/filesystem/project-root.ts:16](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/filesystem/project-root.ts#L16)

Finds the root directory of the current project by locating the nearest package.json file

##### Returns

`Promise`\<`string`\>

Promise that resolves to the absolute path of the project root directory

##### Throws

Will throw an error if no package.json is found in the directory tree

##### Example

```ts
import { projectRoot } from "@settlemint/sdk-utils";

// Get project root path
const rootDir = await projectRoot();
console.log(`Project root is at: ${rootDir}`);
```

***

#### setName()

> **setName**(`name`, `path`?): `Promise`\<`void`\>

Defined in: [sdk/utils/src/package-manager/set-name.ts:16](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/package-manager/set-name.ts#L16)

Sets the name field in the package.json file

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The new name to set in the package.json file |
| `path`? | `string` | The path to the project root directory. If not provided, will be automatically determined |

##### Returns

`Promise`\<`void`\>

A promise that resolves when the package.json has been updated

##### Throws

If unable to read, update or save the package.json file

##### Example

```ts
import { setName } from "@settlemint/sdk-utils";

await setName("my-new-project-name");
```

***

#### spinner()

> **spinner**\<`R`\>(`options`): `Promise`\<`R`\>

Defined in: [sdk/utils/src/terminal/spinner.ts:39](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/terminal/spinner.ts#L39)

Displays a loading spinner while executing an async task.
Shows progress with start/stop messages and handles errors.
Spinner is disabled in CI environments.

##### Type Parameters

| Type Parameter |
| ------ |
| `R` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`SpinnerOptions`](README.md#spinneroptionsr)\<`R`\> | Configuration options for the spinner |

##### Returns

`Promise`\<`R`\>

The result from the executed task

##### Throws

Will exit process with code 1 if task fails

##### Example

```ts
import { spinner } from "@settlemint/sdk-utils";

// Show spinner during async task
const result = await spinner({
  startMessage: "Deploying...",
  task: async () => {
    // Async work here
    return "success";
  },
  stopMessage: "Deployed successfully!"
});
```

***

#### tryParseJson()

> **tryParseJson**\<`T`\>(`value`, `defaultValue`): `T` \| `null`

Defined in: [sdk/utils/src/json.ts:23](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/json.ts#L23)

Attempts to parse a JSON string into a typed value, returning a default value if parsing fails.

##### Type Parameters

| Type Parameter |
| ------ |
| `T` |

##### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `value` | `string` | `undefined` | The JSON string to parse |
| `defaultValue` | `null` \| `T` | `null` | The value to return if parsing fails or results in null/undefined |

##### Returns

`T` \| `null`

The parsed JSON value as type T, or the default value if parsing fails

##### Example

```ts
import { tryParseJson } from "@settlemint/sdk-utils";

const config = tryParseJson<{ port: number }>(
  '{"port": 3000}',
  { port: 8080 }
);
// Returns: { port: 3000 }

const invalid = tryParseJson<string[]>(
  'invalid json',
  []
);
// Returns: []
```

***

#### validate()

> **validate**\<`T`\>(`schema`, `value`): `T`\[`"_output"`\]

Defined in: [sdk/utils/src/validation.ts:14](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/validation.ts#L14)

Validates a value against a given Zod schema.

##### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `ZodType` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `schema` | `T` | The Zod schema to validate against. |
| `value` | `unknown` | The value to validate. |

##### Returns

`T`\[`"_output"`\]

The validated and parsed value.

##### Throws

Will throw an error if validation fails, with formatted error messages.

##### Example

```ts
const validatedId = validate(IdSchema, "550e8400-e29b-41d4-a716-446655440000");
```

***

#### writeEnv()

> **writeEnv**(`prod`, `env`, `secrets`): `Promise`\<`void`\>

Defined in: [sdk/utils/src/environment/write-env.ts:81](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/environment/write-env.ts#L81)

Writes environment variables to .env files across a project or monorepo

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `prod` | `boolean` | Whether to write production environment variables |
| `env` | `Partial`\<\{ `SETTLEMINT_ACCESS_TOKEN`: `string`; `SETTLEMINT_APPLICATION`: `string`; `SETTLEMINT_BLOCKCHAIN_NETWORK`: `string`; `SETTLEMINT_BLOCKCHAIN_NODE`: `string`; `SETTLEMINT_BLOCKSCOUT`: `string`; `SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT`: `string`; `SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT`: `string`; `SETTLEMINT_CUSTOM_DEPLOYMENT`: `string`; `SETTLEMINT_CUSTOM_DEPLOYMENT_ENDPOINT`: `string`; `SETTLEMINT_HASURA`: `string`; `SETTLEMINT_HASURA_ADMIN_SECRET`: `string`; `SETTLEMINT_HASURA_DATABASE_URL`: `string`; `SETTLEMINT_HASURA_ENDPOINT`: `string`; `SETTLEMINT_HD_PRIVATE_KEY`: `string`; `SETTLEMINT_INSTANCE`: `string`; `SETTLEMINT_IPFS`: `string`; `SETTLEMINT_IPFS_API_ENDPOINT`: `string`; `SETTLEMINT_IPFS_GATEWAY_ENDPOINT`: `string`; `SETTLEMINT_IPFS_PINNING_ENDPOINT`: `string`; `SETTLEMINT_LOAD_BALANCER`: `string`; `SETTLEMINT_MINIO`: `string`; `SETTLEMINT_MINIO_ACCESS_KEY`: `string`; `SETTLEMINT_MINIO_ENDPOINT`: `string`; `SETTLEMINT_MINIO_SECRET_KEY`: `string`; `SETTLEMINT_NEW_PROJECT_NAME`: `string`; `SETTLEMINT_PERSONAL_ACCESS_TOKEN`: `string`; `SETTLEMINT_PORTAL`: `string`; `SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT`: `string`; `SETTLEMINT_PORTAL_REST_ENDPOINT`: `string`; `SETTLEMINT_SMART_CONTRACT_ADDRESS`: `string`; `SETTLEMINT_SMART_CONTRACT_DEPLOYMENT_ID`: `string`; `SETTLEMINT_THEGRAPH`: `string`; `SETTLEMINT_THEGRAPH_SUBGRAPH_NAME`: `string`; `SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS`: `string`[]; `SETTLEMINT_WORKSPACE`: `string`; \}\> | The environment variables to write |
| `secrets` | `boolean` | Whether to write to .env.local files for secrets |

##### Returns

`Promise`\<`void`\>

Promise that resolves when writing is complete

##### Throws

Will throw an error if writing fails

##### Example

```ts
import { writeEnv } from '@settlemint/sdk-utils';

// Write development environment variables
await writeEnv(false, {
  SETTLEMINT_INSTANCE: 'https://dev.example.com'
}, false);

// Write production secrets
await writeEnv(true, {
  SETTLEMINT_ACCESS_TOKEN: 'secret-token'
}, true);
```

### Interfaces

#### ExecuteCommandOptions

Defined in: [sdk/utils/src/terminal/execute-command.ts:7](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/terminal/execute-command.ts#L7)

Options for executing a command, extending SpawnOptionsWithoutStdio

##### Extends

- `SpawnOptionsWithoutStdio`

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="silent"></a> `silent?` | `boolean` | Whether to suppress output to stdout/stderr | [sdk/utils/src/terminal/execute-command.ts:9](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/terminal/execute-command.ts#L9) |

***

#### SpinnerOptions\<R\>

Defined in: [sdk/utils/src/terminal/spinner.ts:9](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/terminal/spinner.ts#L9)

Options for configuring the spinner behavior

##### Type Parameters

| Type Parameter |
| ------ |
| `R` |

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="startmessage"></a> `startMessage` | `string` | Message to display when spinner starts | [sdk/utils/src/terminal/spinner.ts:11](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/terminal/spinner.ts#L11) |
| <a id="stopmessage"></a> `stopMessage` | `string` | Message to display when spinner completes successfully | [sdk/utils/src/terminal/spinner.ts:15](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/terminal/spinner.ts#L15) |
| <a id="task"></a> `task` | () => `Promise`\<`R`\> | Async task to execute while spinner is active | [sdk/utils/src/terminal/spinner.ts:13](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/terminal/spinner.ts#L13) |

### Type Aliases

#### DotEnv

> **DotEnv**: `z.infer`\<*typeof* [`DotEnvSchema`](README.md#dotenvschema)\>

Defined in: [sdk/utils/src/validation/dot-env.schema.ts:56](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/validation/dot-env.schema.ts#L56)

Type definition for the environment variables schema.

***

#### DotEnvPartial

> **DotEnvPartial**: `z.infer`\<*typeof* [`DotEnvSchemaPartial`](README.md#dotenvschemapartial)\>

Defined in: [sdk/utils/src/validation/dot-env.schema.ts:67](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/validation/dot-env.schema.ts#L67)

Type definition for the partial environment variables schema.

***

#### Id

> **Id**: `z.infer`\<*typeof* [`IdSchema`](README.md#idschema)\>

Defined in: [sdk/utils/src/validation/id.schema.ts:30](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/validation/id.schema.ts#L30)

Type definition for database IDs, inferred from IdSchema.
Can be either a PostgreSQL UUID string or MongoDB ObjectID string.

***

#### Template

> **Template**: `object`

Defined in: [sdk/utils/src/package-manager/download-and-extract.ts:8](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/package-manager/download-and-extract.ts#L8)

Available templates for project creation

##### Type declaration

| Name | Type | Defined in |
| ------ | ------ | ------ |
| <a id="label"></a> `label` | `string` | [sdk/utils/src/package-manager/download-and-extract.ts:8](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/package-manager/download-and-extract.ts#L8) |
| <a id="value"></a> `value` | `string` | [sdk/utils/src/package-manager/download-and-extract.ts:8](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/package-manager/download-and-extract.ts#L8) |

### Variables

#### AccessTokenSchema

> `const` **AccessTokenSchema**: `ZodString`

Defined in: [sdk/utils/src/validation/access-token.schema.ts:21](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/validation/access-token.schema.ts#L21)

Schema for validating both application and personal access tokens.
Accepts tokens starting with either 'sm_pat_' or 'sm_aat_' prefix.

***

#### ApplicationAccessTokenSchema

> `const` **ApplicationAccessTokenSchema**: `ZodString`

Defined in: [sdk/utils/src/validation/access-token.schema.ts:7](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/validation/access-token.schema.ts#L7)

Schema for validating application access tokens.
Application access tokens start with 'sm_aat_' prefix.

***

#### DotEnvSchema

> `const` **DotEnvSchema**: `ZodObject`\<\{ `SETTLEMINT_ACCESS_TOKEN`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_APPLICATION`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_BLOCKCHAIN_NETWORK`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_BLOCKCHAIN_NODE`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_BLOCKSCOUT`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_CUSTOM_DEPLOYMENT`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_CUSTOM_DEPLOYMENT_ENDPOINT`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_HASURA`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_HASURA_ADMIN_SECRET`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_HASURA_DATABASE_URL`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_HASURA_ENDPOINT`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_HD_PRIVATE_KEY`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_INSTANCE`: `ZodDefault`\<`ZodString`\>; `SETTLEMINT_IPFS`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_IPFS_API_ENDPOINT`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_IPFS_GATEWAY_ENDPOINT`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_IPFS_PINNING_ENDPOINT`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_LOAD_BALANCER`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_MINIO`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_MINIO_ACCESS_KEY`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_MINIO_ENDPOINT`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_MINIO_SECRET_KEY`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_NEW_PROJECT_NAME`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_PERSONAL_ACCESS_TOKEN`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_PORTAL`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_PORTAL_REST_ENDPOINT`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_SMART_CONTRACT_ADDRESS`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_SMART_CONTRACT_DEPLOYMENT_ID`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_THEGRAPH`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_THEGRAPH_SUBGRAPH_NAME`: `ZodOptional`\<`ZodString`\>; `SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS`: `ZodEffects`\<`ZodOptional`\<`ZodArray`\<`ZodString`\>\>, `undefined` \| `string`[], `unknown`\>; `SETTLEMINT_WORKSPACE`: `ZodOptional`\<`ZodString`\>; \}, `"strip"`, \{ `SETTLEMINT_ACCESS_TOKEN`: `string`; `SETTLEMINT_APPLICATION`: `string`; `SETTLEMINT_BLOCKCHAIN_NETWORK`: `string`; `SETTLEMINT_BLOCKCHAIN_NODE`: `string`; `SETTLEMINT_BLOCKSCOUT`: `string`; `SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT`: `string`; `SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT`: `string`; `SETTLEMINT_CUSTOM_DEPLOYMENT`: `string`; `SETTLEMINT_CUSTOM_DEPLOYMENT_ENDPOINT`: `string`; `SETTLEMINT_HASURA`: `string`; `SETTLEMINT_HASURA_ADMIN_SECRET`: `string`; `SETTLEMINT_HASURA_DATABASE_URL`: `string`; `SETTLEMINT_HASURA_ENDPOINT`: `string`; `SETTLEMINT_HD_PRIVATE_KEY`: `string`; `SETTLEMINT_INSTANCE`: `string`; `SETTLEMINT_IPFS`: `string`; `SETTLEMINT_IPFS_API_ENDPOINT`: `string`; `SETTLEMINT_IPFS_GATEWAY_ENDPOINT`: `string`; `SETTLEMINT_IPFS_PINNING_ENDPOINT`: `string`; `SETTLEMINT_LOAD_BALANCER`: `string`; `SETTLEMINT_MINIO`: `string`; `SETTLEMINT_MINIO_ACCESS_KEY`: `string`; `SETTLEMINT_MINIO_ENDPOINT`: `string`; `SETTLEMINT_MINIO_SECRET_KEY`: `string`; `SETTLEMINT_NEW_PROJECT_NAME`: `string`; `SETTLEMINT_PERSONAL_ACCESS_TOKEN`: `string`; `SETTLEMINT_PORTAL`: `string`; `SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT`: `string`; `SETTLEMINT_PORTAL_REST_ENDPOINT`: `string`; `SETTLEMINT_SMART_CONTRACT_ADDRESS`: `string`; `SETTLEMINT_SMART_CONTRACT_DEPLOYMENT_ID`: `string`; `SETTLEMINT_THEGRAPH`: `string`; `SETTLEMINT_THEGRAPH_SUBGRAPH_NAME`: `string`; `SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS`: `string`[]; `SETTLEMINT_WORKSPACE`: `string`; \}, \{ `SETTLEMINT_ACCESS_TOKEN`: `string`; `SETTLEMINT_APPLICATION`: `string`; `SETTLEMINT_BLOCKCHAIN_NETWORK`: `string`; `SETTLEMINT_BLOCKCHAIN_NODE`: `string`; `SETTLEMINT_BLOCKSCOUT`: `string`; `SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT`: `string`; `SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT`: `string`; `SETTLEMINT_CUSTOM_DEPLOYMENT`: `string`; `SETTLEMINT_CUSTOM_DEPLOYMENT_ENDPOINT`: `string`; `SETTLEMINT_HASURA`: `string`; `SETTLEMINT_HASURA_ADMIN_SECRET`: `string`; `SETTLEMINT_HASURA_DATABASE_URL`: `string`; `SETTLEMINT_HASURA_ENDPOINT`: `string`; `SETTLEMINT_HD_PRIVATE_KEY`: `string`; `SETTLEMINT_INSTANCE`: `string`; `SETTLEMINT_IPFS`: `string`; `SETTLEMINT_IPFS_API_ENDPOINT`: `string`; `SETTLEMINT_IPFS_GATEWAY_ENDPOINT`: `string`; `SETTLEMINT_IPFS_PINNING_ENDPOINT`: `string`; `SETTLEMINT_LOAD_BALANCER`: `string`; `SETTLEMINT_MINIO`: `string`; `SETTLEMINT_MINIO_ACCESS_KEY`: `string`; `SETTLEMINT_MINIO_ENDPOINT`: `string`; `SETTLEMINT_MINIO_SECRET_KEY`: `string`; `SETTLEMINT_NEW_PROJECT_NAME`: `string`; `SETTLEMINT_PERSONAL_ACCESS_TOKEN`: `string`; `SETTLEMINT_PORTAL`: `string`; `SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT`: `string`; `SETTLEMINT_PORTAL_REST_ENDPOINT`: `string`; `SETTLEMINT_SMART_CONTRACT_ADDRESS`: `string`; `SETTLEMINT_SMART_CONTRACT_DEPLOYMENT_ID`: `string`; `SETTLEMINT_THEGRAPH`: `string`; `SETTLEMINT_THEGRAPH_SUBGRAPH_NAME`: `string`; `SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS`: `unknown`; `SETTLEMINT_WORKSPACE`: `string`; \}\>

Defined in: [sdk/utils/src/validation/dot-env.schema.ts:12](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/validation/dot-env.schema.ts#L12)

Schema for validating environment variables used by the SettleMint SDK.
Defines validation rules and types for configuration values like URLs,
access tokens, workspace names, and service endpoints.

***

#### DotEnvSchemaPartial

> `const` **DotEnvSchemaPartial**: `ZodObject`\<\{ `SETTLEMINT_ACCESS_TOKEN`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_APPLICATION`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_BLOCKCHAIN_NETWORK`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_BLOCKCHAIN_NODE`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_BLOCKSCOUT`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_CUSTOM_DEPLOYMENT`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_CUSTOM_DEPLOYMENT_ENDPOINT`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_HASURA`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_HASURA_ADMIN_SECRET`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_HASURA_DATABASE_URL`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_HASURA_ENDPOINT`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_HD_PRIVATE_KEY`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_INSTANCE`: `ZodOptional`\<`ZodDefault`\<`ZodString`\>\>; `SETTLEMINT_IPFS`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_IPFS_API_ENDPOINT`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_IPFS_GATEWAY_ENDPOINT`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_IPFS_PINNING_ENDPOINT`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_LOAD_BALANCER`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_MINIO`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_MINIO_ACCESS_KEY`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_MINIO_ENDPOINT`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_MINIO_SECRET_KEY`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_NEW_PROJECT_NAME`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_PERSONAL_ACCESS_TOKEN`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_PORTAL`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_PORTAL_REST_ENDPOINT`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_SMART_CONTRACT_ADDRESS`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_SMART_CONTRACT_DEPLOYMENT_ID`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_THEGRAPH`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_THEGRAPH_SUBGRAPH_NAME`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS`: `ZodOptional`\<`ZodEffects`\<`ZodOptional`\<`ZodArray`\<`ZodString`\>\>, `undefined` \| `string`[], `unknown`\>\>; `SETTLEMINT_WORKSPACE`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; \}, `"strip"`, \{ `SETTLEMINT_ACCESS_TOKEN`: `string`; `SETTLEMINT_APPLICATION`: `string`; `SETTLEMINT_BLOCKCHAIN_NETWORK`: `string`; `SETTLEMINT_BLOCKCHAIN_NODE`: `string`; `SETTLEMINT_BLOCKSCOUT`: `string`; `SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT`: `string`; `SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT`: `string`; `SETTLEMINT_CUSTOM_DEPLOYMENT`: `string`; `SETTLEMINT_CUSTOM_DEPLOYMENT_ENDPOINT`: `string`; `SETTLEMINT_HASURA`: `string`; `SETTLEMINT_HASURA_ADMIN_SECRET`: `string`; `SETTLEMINT_HASURA_DATABASE_URL`: `string`; `SETTLEMINT_HASURA_ENDPOINT`: `string`; `SETTLEMINT_HD_PRIVATE_KEY`: `string`; `SETTLEMINT_INSTANCE`: `string`; `SETTLEMINT_IPFS`: `string`; `SETTLEMINT_IPFS_API_ENDPOINT`: `string`; `SETTLEMINT_IPFS_GATEWAY_ENDPOINT`: `string`; `SETTLEMINT_IPFS_PINNING_ENDPOINT`: `string`; `SETTLEMINT_LOAD_BALANCER`: `string`; `SETTLEMINT_MINIO`: `string`; `SETTLEMINT_MINIO_ACCESS_KEY`: `string`; `SETTLEMINT_MINIO_ENDPOINT`: `string`; `SETTLEMINT_MINIO_SECRET_KEY`: `string`; `SETTLEMINT_NEW_PROJECT_NAME`: `string`; `SETTLEMINT_PERSONAL_ACCESS_TOKEN`: `string`; `SETTLEMINT_PORTAL`: `string`; `SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT`: `string`; `SETTLEMINT_PORTAL_REST_ENDPOINT`: `string`; `SETTLEMINT_SMART_CONTRACT_ADDRESS`: `string`; `SETTLEMINT_SMART_CONTRACT_DEPLOYMENT_ID`: `string`; `SETTLEMINT_THEGRAPH`: `string`; `SETTLEMINT_THEGRAPH_SUBGRAPH_NAME`: `string`; `SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS`: `string`[]; `SETTLEMINT_WORKSPACE`: `string`; \}, \{ `SETTLEMINT_ACCESS_TOKEN`: `string`; `SETTLEMINT_APPLICATION`: `string`; `SETTLEMINT_BLOCKCHAIN_NETWORK`: `string`; `SETTLEMINT_BLOCKCHAIN_NODE`: `string`; `SETTLEMINT_BLOCKSCOUT`: `string`; `SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT`: `string`; `SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT`: `string`; `SETTLEMINT_CUSTOM_DEPLOYMENT`: `string`; `SETTLEMINT_CUSTOM_DEPLOYMENT_ENDPOINT`: `string`; `SETTLEMINT_HASURA`: `string`; `SETTLEMINT_HASURA_ADMIN_SECRET`: `string`; `SETTLEMINT_HASURA_DATABASE_URL`: `string`; `SETTLEMINT_HASURA_ENDPOINT`: `string`; `SETTLEMINT_HD_PRIVATE_KEY`: `string`; `SETTLEMINT_INSTANCE`: `string`; `SETTLEMINT_IPFS`: `string`; `SETTLEMINT_IPFS_API_ENDPOINT`: `string`; `SETTLEMINT_IPFS_GATEWAY_ENDPOINT`: `string`; `SETTLEMINT_IPFS_PINNING_ENDPOINT`: `string`; `SETTLEMINT_LOAD_BALANCER`: `string`; `SETTLEMINT_MINIO`: `string`; `SETTLEMINT_MINIO_ACCESS_KEY`: `string`; `SETTLEMINT_MINIO_ENDPOINT`: `string`; `SETTLEMINT_MINIO_SECRET_KEY`: `string`; `SETTLEMINT_NEW_PROJECT_NAME`: `string`; `SETTLEMINT_PERSONAL_ACCESS_TOKEN`: `string`; `SETTLEMINT_PORTAL`: `string`; `SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT`: `string`; `SETTLEMINT_PORTAL_REST_ENDPOINT`: `string`; `SETTLEMINT_SMART_CONTRACT_ADDRESS`: `string`; `SETTLEMINT_SMART_CONTRACT_DEPLOYMENT_ID`: `string`; `SETTLEMINT_THEGRAPH`: `string`; `SETTLEMINT_THEGRAPH_SUBGRAPH_NAME`: `string`; `SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS`: `unknown`; `SETTLEMINT_WORKSPACE`: `string`; \}\>

Defined in: [sdk/utils/src/validation/dot-env.schema.ts:62](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/validation/dot-env.schema.ts#L62)

Partial version of the environment variables schema where all fields are optional.
Useful for validating incomplete configurations during development or build time.

***

#### IdSchema

> `const` **IdSchema**: `ZodUnion`\<\[`ZodString`, `ZodString`\]\>

Defined in: [sdk/utils/src/validation/id.schema.ts:17](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/validation/id.schema.ts#L17)

Schema for validating database IDs. Accepts both PostgreSQL UUIDs and MongoDB ObjectIDs.
PostgreSQL UUIDs are 32 hexadecimal characters with hyphens (e.g. 123e4567-e89b-12d3-a456-426614174000).
MongoDB ObjectIDs are 24 hexadecimal characters (e.g. 507f1f77bcf86cd799439011).

##### Example

```ts
import { IdSchema } from "@settlemint/sdk-utils";

// Validate PostgreSQL UUID
const isValidUuid = IdSchema.safeParse("123e4567-e89b-12d3-a456-426614174000").success;

// Validate MongoDB ObjectID
const isValidObjectId = IdSchema.safeParse("507f1f77bcf86cd799439011").success;
```

***

#### PersonalAccessTokenSchema

> `const` **PersonalAccessTokenSchema**: `ZodString`

Defined in: [sdk/utils/src/validation/access-token.schema.ts:14](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/validation/access-token.schema.ts#L14)

Schema for validating personal access tokens.
Personal access tokens start with 'sm_pat_' prefix.

***

#### runsInBrowser

> `const` **runsInBrowser**: `boolean` = `isBrowser`

Defined in: [sdk/utils/src/runtime/ensure-server.ts:40](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/runtime/ensure-server.ts#L40)

Boolean indicating if code is currently running in a browser environment

***

#### runsOnServer

> `const` **runsOnServer**: `boolean` = `!isBrowser`

Defined in: [sdk/utils/src/runtime/ensure-server.ts:45](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/runtime/ensure-server.ts#L45)

Boolean indicating if code is currently running in a server environment

***

#### UniqueNameSchema

> `const` **UniqueNameSchema**: `ZodString`

Defined in: [sdk/utils/src/validation/unique-name.schema.ts:19](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/validation/unique-name.schema.ts#L19)

Schema for validating unique names used across the SettleMint platform.
Only accepts lowercase alphanumeric characters and hyphens.
Used for workspace names, application names, service names etc.

##### Example

```ts
import { UniqueNameSchema } from "@settlemint/sdk-utils";

// Validate a workspace name
const isValidName = UniqueNameSchema.safeParse("my-workspace-123").success;
// true

// Invalid names will fail validation
const isInvalidName = UniqueNameSchema.safeParse("My Workspace!").success;
// false
```

***

#### UrlOrPathSchema

> `const` **UrlOrPathSchema**: `ZodUnion`\<\[`ZodString`, `ZodString`\]\>

Defined in: [sdk/utils/src/validation/url.schema.ts:54](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/validation/url.schema.ts#L54)

Schema that accepts either a full URL or a URL path.

##### Example

```ts
import { UrlOrPathSchema } from "@settlemint/sdk-utils";

// Validate a URL
const isValidUrl = UrlOrPathSchema.safeParse("https://console.settlemint.com").success;
// true

// Validate a path
const isValidPath = UrlOrPathSchema.safeParse("/api/v1/users").success;
// true
```

***

#### UrlPathSchema

> `const` **UrlPathSchema**: `ZodString`

Defined in: [sdk/utils/src/validation/url.schema.ts:34](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/validation/url.schema.ts#L34)

Schema for validating URL paths.

##### Example

```ts
import { UrlPathSchema } from "@settlemint/sdk-utils";

// Validate a URL path
const isValidPath = UrlPathSchema.safeParse("/api/v1/users").success;
// true

// Invalid paths will fail validation
const isInvalidPath = UrlPathSchema.safeParse("not-a-path").success;
// false
```

***

#### UrlSchema

> `const` **UrlSchema**: `ZodString`

Defined in: [sdk/utils/src/validation/url.schema.ts:17](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/utils/src/validation/url.schema.ts#L17)

Schema for validating URLs.

##### Example

```ts
import { UrlSchema } from "@settlemint/sdk-utils";

// Validate a URL
const isValidUrl = UrlSchema.safeParse("https://console.settlemint.com").success;
// true

// Invalid URLs will fail validation
const isInvalidUrl = UrlSchema.safeParse("not-a-url").success;
// false
```

## Contributing

We welcome contributions from the community! Please check out our [Contributing](../../.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](LICENSE) file for more details.
