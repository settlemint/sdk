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
  <a href="https://console.settlemint.com/documentation">Documentation</a>
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
    - [camelCaseToWords()](#camelcasetowords)
    - [cancel()](#cancel)
    - [capitalizeFirstLetter()](#capitalizefirstletter)
    - [createLogger()](#createlogger)
    - [emptyDir()](#emptydir)
    - [ensureBrowser()](#ensurebrowser)
    - [ensureServer()](#ensureserver)
    - [executeCommand()](#executecommand)
    - [exists()](#exists)
    - [extractJsonObject()](#extractjsonobject)
    - [fetchWithRetry()](#fetchwithretry)
    - [findMonoRepoPackages()](#findmonorepopackages)
    - [findMonoRepoRoot()](#findmonoreporoot)
    - [formatTargetDir()](#formattargetdir)
    - [getPackageManager()](#getpackagemanager)
    - [getPackageManagerExecutable()](#getpackagemanagerexecutable)
    - [graphqlFetchWithRetry()](#graphqlfetchwithretry)
    - [installDependencies()](#installdependencies)
    - [intro()](#intro)
    - [isEmpty()](#isempty)
    - [isPackageInstalled()](#ispackageinstalled)
    - [list()](#list)
    - [loadEnv()](#loadenv)
    - [makeJsonStringifiable()](#makejsonstringifiable)
    - [maskTokens()](#masktokens)
    - [note()](#note)
    - [outro()](#outro)
    - [projectRoot()](#projectroot)
    - [replaceUnderscoresAndHyphensWithSpaces()](#replaceunderscoresandhyphenswithspaces)
    - [requestLogger()](#requestlogger)
    - [retryWhenFailed()](#retrywhenfailed)
    - [setName()](#setname)
    - [spinner()](#spinner)
    - [table()](#table)
    - [truncate()](#truncate)
    - [tryParseJson()](#tryparsejson)
    - [validate()](#validate)
    - [writeEnv()](#writeenv)
  - [Classes](#classes)
    - [CancelError](#cancelerror)
    - [CommandError](#commanderror)
    - [SpinnerError](#spinnererror)
  - [Interfaces](#interfaces)
    - [ExecuteCommandOptions](#executecommandoptions)
    - [Logger](#logger)
    - [LoggerOptions](#loggeroptions)
    - [SpinnerOptions\<R\>](#spinneroptionsr)
  - [Type Aliases](#type-aliases)
    - [AccessToken](#accesstoken)
    - [ApplicationAccessToken](#applicationaccesstoken)
    - [DotEnv](#dotenv)
    - [DotEnvPartial](#dotenvpartial)
    - [Id](#id)
    - [LogLevel](#loglevel)
    - [PersonalAccessToken](#personalaccesstoken)
    - [Url](#url)
    - [UrlOrPath](#urlorpath)
    - [UrlPath](#urlpath)
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

Defined in: [sdk/utils/src/terminal/ascii.ts:14](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/terminal/ascii.ts#L14)

Prints the SettleMint ASCII art logo to the console in magenta color.
Used for CLI branding and visual identification.

##### Returns

`void`

##### Example

```ts
import { ascii } from "@settlemint/sdk-utils/terminal";

// Prints the SettleMint logo
ascii();
```

***

#### camelCaseToWords()

> **camelCaseToWords**(`s`): `string`

Defined in: [sdk/utils/src/string.ts:29](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/string.ts#L29)

Converts a camelCase string to a human-readable string.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `s` | `string` | The camelCase string to convert |

##### Returns

`string`

The human-readable string

##### Example

```ts
import { camelCaseToWords } from "@settlemint/sdk-utils";

const words = camelCaseToWords("camelCaseString");
// Returns: "Camel Case String"
```

***

#### cancel()

> **cancel**(`msg`): `never`

Defined in: [sdk/utils/src/terminal/cancel.ts:23](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/terminal/cancel.ts#L23)

Displays an error message in red inverse text and throws a CancelError.
Used to terminate execution with a visible error message.
Any sensitive tokens in the message are masked before display.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `msg` | `string` | The error message to display |

##### Returns

`never`

never - Function does not return as it throws an error

##### Example

```ts
import { cancel } from "@settlemint/sdk-utils/terminal";

// Exits process with error message
cancel("An error occurred");
```

***

#### capitalizeFirstLetter()

> **capitalizeFirstLetter**(`val`): `string`

Defined in: [sdk/utils/src/string.ts:13](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/string.ts#L13)

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

#### createLogger()

> **createLogger**(`options`): [`Logger`](#logger)

Defined in: [sdk/utils/src/logging/logger.ts:50](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/logging/logger.ts#L50)

Creates a simple logger with configurable log level

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`LoggerOptions`](#loggeroptions) | Configuration options for the logger |

##### Returns

[`Logger`](#logger)

A logger instance with debug, info, warn, and error methods

##### Example

```ts
import { createLogger } from "@/utils/logging/logger";

const logger = createLogger({ level: 'info' });

logger.info('User logged in', { userId: '123' });
logger.error('Operation failed', new Error('Connection timeout'));
```

***

#### emptyDir()

> **emptyDir**(`dir`): `Promise`\<`void`\>

Defined in: [sdk/utils/src/package-manager/download-and-extract.ts:45](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/package-manager/download-and-extract.ts#L45)

Removes all contents of a directory except the .git folder

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `dir` | `string` | The directory path to empty |

##### Returns

`Promise`\<`void`\>

##### Example

```ts
import { emptyDir } from "@settlemint/sdk-utils/package-manager";

await emptyDir("/path/to/dir"); // Removes all contents except .git
```

***

#### ensureBrowser()

> **ensureBrowser**(): `void`

Defined in: [sdk/utils/src/runtime/ensure-server.ts:31](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/runtime/ensure-server.ts#L31)

Ensures that code is running in a browser environment and not on the server.

##### Returns

`void`

##### Throws

If called from a server environment

##### Example

```ts
import { ensureBrowser } from "@settlemint/sdk-utils/runtime";

// Will throw if running on server
ensureBrowser();
```

***

#### ensureServer()

> **ensureServer**(): `void`

Defined in: [sdk/utils/src/runtime/ensure-server.ts:13](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/runtime/ensure-server.ts#L13)

Ensures that code is running on the server and not in a browser environment.

##### Returns

`void`

##### Throws

If called from a browser environment

##### Example

```ts
import { ensureServer } from "@settlemint/sdk-utils/runtime";

// Will throw if running in browser
ensureServer();
```

***

#### executeCommand()

> **executeCommand**(`command`, `args`, `options?`): `Promise`\<`string`[]\>

Defined in: [sdk/utils/src/terminal/execute-command.ts:51](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/terminal/execute-command.ts#L51)

Executes a command with the given arguments in a child process.
Pipes stdin to the child process and captures stdout/stderr output.
Masks any sensitive tokens in the output before displaying or returning.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `command` | `string` | The command to execute |
| `args` | `string`[] | Array of arguments to pass to the command |
| `options?` | [`ExecuteCommandOptions`](#executecommandoptions) | Options for customizing command execution |

##### Returns

`Promise`\<`string`[]\>

Array of output strings from stdout and stderr

##### Throws

If the process fails to start or exits with non-zero code

##### Example

```ts
import { executeCommand } from "@settlemint/sdk-utils/terminal";

// Execute git clone
await executeCommand("git", ["clone", "repo-url"]);

// Execute silently
await executeCommand("npm", ["install"], { silent: true });
```

***

#### exists()

> **exists**(`path`): `Promise`\<`boolean`\>

Defined in: [sdk/utils/src/filesystem/exists.ts:17](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/filesystem/exists.ts#L17)

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
import { exists } from "@settlemint/sdk-utils/filesystem";

// Check if file exists before reading
if (await exists('/path/to/file.txt')) {
  // File exists, safe to read
}
```

***

#### extractJsonObject()

> **extractJsonObject**\<`T`\>(`value`): `null` \| `T`

Defined in: [sdk/utils/src/json.ts:50](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/json.ts#L50)

Extracts a JSON object from a string.

##### Type Parameters

| Type Parameter |
| ------ |
| `T` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | The string to extract the JSON object from |

##### Returns

`null` \| `T`

The parsed JSON object, or null if no JSON object is found

##### Throws

If the input string is too long (longer than 5000 characters)

##### Example

```ts
import { extractJsonObject } from "@settlemint/sdk-utils";

const json = extractJsonObject<{ port: number }>(
  'port info: {"port": 3000}',
);
// Returns: { port: 3000 }
```

***

#### fetchWithRetry()

> **fetchWithRetry**(`input`, `init?`, `maxRetries?`, `initialSleepTime?`): `Promise`\<`Response`\>

Defined in: [sdk/utils/src/http/fetch-with-retry.ts:18](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/http/fetch-with-retry.ts#L18)

Retry an HTTP request with exponential backoff and jitter.
Only retries on server errors (5xx), rate limits (429), timeouts (408), and network errors.

##### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `input` | `URL` \| `RequestInfo` | `undefined` | The URL or Request object to fetch |
| `init?` | `RequestInit` | `undefined` | The fetch init options |
| `maxRetries?` | `number` | `5` | Maximum number of retry attempts |
| `initialSleepTime?` | `number` | `3_000` | Initial sleep time between retries in ms |

##### Returns

`Promise`\<`Response`\>

The fetch Response

##### Throws

Error if all retries fail

##### Example

```ts
import { fetchWithRetry } from "@settlemint/sdk-utils/http";

const response = await fetchWithRetry("https://api.example.com/data");
```

***

#### findMonoRepoPackages()

> **findMonoRepoPackages**(`projectDir`): `Promise`\<`string`[]\>

Defined in: [sdk/utils/src/filesystem/mono-repo.ts:59](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/filesystem/mono-repo.ts#L59)

Finds all packages in a monorepo

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `projectDir` | `string` | The directory to start searching from |

##### Returns

`Promise`\<`string`[]\>

An array of package directories

##### Example

```ts
import { findMonoRepoPackages } from "@settlemint/sdk-utils/filesystem";

const packages = await findMonoRepoPackages("/path/to/your/project");
console.log(packages); // Output: ["/path/to/your/project/packages/core", "/path/to/your/project/packages/ui"]
```

***

#### findMonoRepoRoot()

> **findMonoRepoRoot**(`startDir`): `Promise`\<`null` \| `string`\>

Defined in: [sdk/utils/src/filesystem/mono-repo.ts:19](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/filesystem/mono-repo.ts#L19)

Finds the root directory of a monorepo

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `startDir` | `string` | The directory to start searching from |

##### Returns

`Promise`\<`null` \| `string`\>

The root directory of the monorepo or null if not found

##### Example

```ts
import { findMonoRepoRoot } from "@settlemint/sdk-utils/filesystem";

const root = await findMonoRepoRoot("/path/to/your/project");
console.log(root); // Output: /path/to/your/project/packages/core
```

***

#### formatTargetDir()

> **formatTargetDir**(`targetDir`): `string`

Defined in: [sdk/utils/src/package-manager/download-and-extract.ts:15](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/package-manager/download-and-extract.ts#L15)

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
import { formatTargetDir } from "@settlemint/sdk-utils/package-manager";

const formatted = formatTargetDir("/path/to/dir/ "); // "/path/to/dir"
```

***

#### getPackageManager()

> **getPackageManager**(`targetDir?`): `Promise`\<`AgentName`\>

Defined in: [sdk/utils/src/package-manager/get-package-manager.ts:15](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/package-manager/get-package-manager.ts#L15)

Detects the package manager used in the current project

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `targetDir?` | `string` | The directory to check for package manager (optional, defaults to process.cwd()) |

##### Returns

`Promise`\<`AgentName`\>

The name of the package manager

##### Example

```ts
import { getPackageManager } from "@settlemint/sdk-utils/package-manager";

const packageManager = await getPackageManager();
console.log(`Using ${packageManager}`);
```

***

#### getPackageManagerExecutable()

> **getPackageManagerExecutable**(`targetDir?`): `Promise`\<\{ `args`: `string`[]; `command`: `string`; \}\>

Defined in: [sdk/utils/src/package-manager/get-package-manager-executable.ts:14](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/package-manager/get-package-manager-executable.ts#L14)

Retrieves the executable command and arguments for the package manager

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `targetDir?` | `string` | The directory to check for package manager (optional, defaults to process.cwd()) |

##### Returns

`Promise`\<\{ `args`: `string`[]; `command`: `string`; \}\>

An object containing the command and arguments for the package manager

##### Example

```ts
import { getPackageManagerExecutable } from "@settlemint/sdk-utils/package-manager";

const { command, args } = await getPackageManagerExecutable();
console.log(`Using ${command} with args: ${args.join(" ")}`);
```

***

#### graphqlFetchWithRetry()

> **graphqlFetchWithRetry**\<`Data`\>(`input`, `init?`, `maxRetries?`, `initialSleepTime?`): `Promise`\<`Data`\>

Defined in: [sdk/utils/src/http/graphql-fetch-with-retry.ts:34](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/http/graphql-fetch-with-retry.ts#L34)

Executes a GraphQL request with automatic retries using exponential backoff and jitter.
Only retries on server errors (5xx), rate limits (429), timeouts (408), and network errors.
Will also retry if the GraphQL response contains errors.

##### Type Parameters

| Type Parameter |
| ------ |
| `Data` |

##### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `input` | `URL` \| `RequestInfo` | `undefined` | The URL or Request object for the GraphQL endpoint |
| `init?` | `RequestInit` | `undefined` | Optional fetch configuration options |
| `maxRetries?` | `number` | `5` | Maximum retry attempts before failing (default: 5) |
| `initialSleepTime?` | `number` | `3_000` | Initial delay between retries in milliseconds (default: 3000) |

##### Returns

`Promise`\<`Data`\>

The parsed GraphQL response data

##### Throws

Error if all retries fail or if GraphQL response contains errors

##### Example

```ts
import { graphqlFetchWithRetry } from "@settlemint/sdk-utils/http";

const data = await graphqlFetchWithRetry<{ user: { id: string } }>(
  "https://api.example.com/graphql",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query GetUser($id: ID!) {
        user(id: $id) {
          id
        }
      }`,
      variables: { id: "123" }
    })
  }
);
```

***

#### installDependencies()

> **installDependencies**(`pkgs`, `cwd?`): `Promise`\<`void`\>

Defined in: [sdk/utils/src/package-manager/install-dependencies.ts:20](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/package-manager/install-dependencies.ts#L20)

Installs one or more packages as dependencies using the detected package manager

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pkgs` | `string` \| `string`[] | A single package name or array of package names to install |
| `cwd?` | `string` | The directory to run the installation in |

##### Returns

`Promise`\<`void`\>

A promise that resolves when installation is complete

##### Throws

If package installation fails

##### Example

```ts
import { installDependencies } from "@settlemint/sdk-utils/package-manager";

// Install a single package
await installDependencies("express");

// Install multiple packages
await installDependencies(["express", "cors"]);
```

***

#### intro()

> **intro**(`msg`): `void`

Defined in: [sdk/utils/src/terminal/intro.ts:16](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/terminal/intro.ts#L16)

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
import { intro } from "@settlemint/sdk-utils/terminal";

// Display intro message
intro("Starting deployment...");
```

***

#### isEmpty()

> **isEmpty**(`path`): `Promise`\<`boolean`\>

Defined in: [sdk/utils/src/package-manager/download-and-extract.ts:31](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/package-manager/download-and-extract.ts#L31)

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
import { isEmpty } from "@settlemint/sdk-utils/package-manager";

if (await isEmpty("/path/to/dir")) {
  // Directory is empty
}
```

***

#### isPackageInstalled()

> **isPackageInstalled**(`name`, `path?`): `Promise`\<`boolean`\>

Defined in: [sdk/utils/src/package-manager/is-package-installed.ts:17](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/package-manager/is-package-installed.ts#L17)

Checks if a package is installed in the project's dependencies, devDependencies, or peerDependencies.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The name of the package to check |
| `path?` | `string` | The path to the project root directory. If not provided, will be automatically determined |

##### Returns

`Promise`\<`boolean`\>

Whether the package is installed

##### Throws

If unable to read or parse the package.json file

##### Example

```ts
import { isPackageInstalled } from "@settlemint/sdk-utils/package-manager";

const isInstalled = await isPackageInstalled("@settlemint/sdk-utils");
console.log(`@settlemint/sdk-utils is installed: ${isInstalled}`);
```

***

#### list()

> **list**(`title`, `items`): `void`

Defined in: [sdk/utils/src/terminal/list.ts:23](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/terminal/list.ts#L23)

Displays a list of items in a formatted manner, supporting nested items.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `title` | `string` | The title of the list |
| `items` | (`string` \| `string`[])[] | The items to display, can be strings or arrays for nested items |

##### Returns

`void`

The formatted list

##### Example

```ts
import { list } from "@settlemint/sdk-utils/terminal";

// Simple list
list("Use cases", ["use case 1", "use case 2", "use case 3"]);

// Nested list
list("Providers", [
  "AWS",
  ["us-east-1", "eu-west-1"],
  "Azure",
  ["eastus", "westeurope"]
]);
```

***

#### loadEnv()

> **loadEnv**\<`T`\>(`validateEnv`, `prod`, `path`): `Promise`\<`T` *extends* `true` ? `object` : `object`\>

Defined in: [sdk/utils/src/environment/load-env.ts:25](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/environment/load-env.ts#L25)

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

`Promise`\<`T` *extends* `true` ? `object` : `object`\>

A promise that resolves to the validated environment variables

##### Throws

Will throw an error if validation fails and validateEnv is true

##### Example

```ts
import { loadEnv } from '@settlemint/sdk-utils/environment';

// Load and validate environment variables
const env = await loadEnv(true, false);
console.log(env.SETTLEMINT_INSTANCE);

// Load without validation
const rawEnv = await loadEnv(false, false);
```

***

#### makeJsonStringifiable()

> **makeJsonStringifiable**\<`T`\>(`value`): `T`

Defined in: [sdk/utils/src/json.ts:73](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/json.ts#L73)

Converts a value to a JSON stringifiable format.

##### Type Parameters

| Type Parameter |
| ------ |
| `T` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `unknown` | The value to convert |

##### Returns

`T`

The JSON stringifiable value

##### Example

```ts
import { makeJsonStringifiable } from "@settlemint/sdk-utils";

const json = makeJsonStringifiable<{ amount: bigint }>({ amount: BigInt(1000) });
// Returns: '{"amount":"1000"}'
```

***

#### maskTokens()

> **maskTokens**(`output`): `string`

Defined in: [sdk/utils/src/logging/mask-tokens.ts:13](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/logging/mask-tokens.ts#L13)

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
import { maskTokens } from "@settlemint/sdk-utils/terminal";

// Masks a token in text
const masked = maskTokens("Token: sm_pat_****"); // "Token: ***"
```

***

#### note()

> **note**(`message`, `level`): `void`

Defined in: [sdk/utils/src/terminal/note.ts:21](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/terminal/note.ts#L21)

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
import { note } from "@settlemint/sdk-utils/terminal";

// Display info note
note("Operation completed successfully");

// Display warning note
note("Low disk space remaining", "warn");
```

***

#### outro()

> **outro**(`msg`): `void`

Defined in: [sdk/utils/src/terminal/outro.ts:16](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/terminal/outro.ts#L16)

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
import { outro } from "@settlemint/sdk-utils/terminal";

// Display outro message
outro("Deployment completed successfully!");
```

***

#### projectRoot()

> **projectRoot**(`fallbackToCwd`, `cwd?`): `Promise`\<`string`\>

Defined in: [sdk/utils/src/filesystem/project-root.ts:18](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/filesystem/project-root.ts#L18)

Finds the root directory of the current project by locating the nearest package.json file

##### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `fallbackToCwd` | `boolean` | `false` | If true, will return the current working directory if no package.json is found |
| `cwd?` | `string` | `undefined` | The directory to start searching for the package.json file from (defaults to process.cwd()) |

##### Returns

`Promise`\<`string`\>

Promise that resolves to the absolute path of the project root directory

##### Throws

Will throw an error if no package.json is found in the directory tree

##### Example

```ts
import { projectRoot } from "@settlemint/sdk-utils/filesystem";

// Get project root path
const rootDir = await projectRoot();
console.log(`Project root is at: ${rootDir}`);
```

***

#### replaceUnderscoresAndHyphensWithSpaces()

> **replaceUnderscoresAndHyphensWithSpaces**(`s`): `string`

Defined in: [sdk/utils/src/string.ts:48](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/string.ts#L48)

Replaces underscores and hyphens with spaces.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `s` | `string` | The string to replace underscores and hyphens with spaces |

##### Returns

`string`

The input string with underscores and hyphens replaced with spaces

##### Example

```ts
import { replaceUnderscoresAndHyphensWithSpaces } from "@settlemint/sdk-utils";

const result = replaceUnderscoresAndHyphensWithSpaces("Already_Spaced-Second");
// Returns: "Already Spaced Second"
```

***

#### requestLogger()

> **requestLogger**(`logger`, `name`, `fn`): (...`args`) => `Promise`\<`Response`\>

Defined in: [sdk/utils/src/logging/request-logger.ts:14](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/logging/request-logger.ts#L14)

Logs the request and duration of a fetch call (> 500ms is logged as warn, otherwise info)

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `logger` | [`Logger`](#logger) | The logger to use |
| `name` | `string` | The name of the request |
| `fn` | *typeof* `fetch` | The fetch function to use |

##### Returns

The fetch function

> (...`args`): `Promise`\<`Response`\>

###### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`args` | \[`string` \| `URL` \| `Request`, `RequestInit`\] |

###### Returns

`Promise`\<`Response`\>

***

#### retryWhenFailed()

> **retryWhenFailed**\<`T`\>(`fn`, `maxRetries`, `initialSleepTime`, `stopOnError?`): `Promise`\<`T`\>

Defined in: [sdk/utils/src/retry.ts:14](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/retry.ts#L14)

Retry a function when it fails.

##### Type Parameters

| Type Parameter |
| ------ |
| `T` |

##### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `fn` | () => `Promise`\<`T`\> | `undefined` | The function to retry. |
| `maxRetries` | `number` | `5` | The maximum number of retries. |
| `initialSleepTime` | `number` | `1_000` | The initial time to sleep between exponential backoff retries. |
| `stopOnError?` | (`error`) => `boolean` | `undefined` | The function to stop on error. |

##### Returns

`Promise`\<`T`\>

The result of the function or undefined if it fails.

##### Example

```ts
import { retryWhenFailed } from "@settlemint/sdk-utils";
import { readFile } from "node:fs/promises";

const result = await retryWhenFailed(() => readFile("/path/to/file.txt"), 3, 1_000);
```

***

#### setName()

> **setName**(`name`, `path?`): `Promise`\<`void`\>

Defined in: [sdk/utils/src/package-manager/set-name.ts:16](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/package-manager/set-name.ts#L16)

Sets the name field in the package.json file

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The new name to set in the package.json file |
| `path?` | `string` | The path to the project root directory. If not provided, will be automatically determined |

##### Returns

`Promise`\<`void`\>

A promise that resolves when the package.json has been updated

##### Throws

If unable to read, update or save the package.json file

##### Example

```ts
import { setName } from "@settlemint/sdk-utils/package-manager";

await setName("my-new-project-name");
```

***

#### spinner()

> **spinner**\<`R`\>(`options`): `Promise`\<`R`\>

Defined in: [sdk/utils/src/terminal/spinner.ts:55](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/terminal/spinner.ts#L55)

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
| `options` | [`SpinnerOptions`](#spinneroptions)\<`R`\> | Configuration options for the spinner |

##### Returns

`Promise`\<`R`\>

The result from the executed task

##### Throws

Will exit process with code 1 if task fails

##### Example

```ts
import { spinner } from "@settlemint/sdk-utils/terminal";

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

#### table()

> **table**(`title`, `data`): `void`

Defined in: [sdk/utils/src/terminal/table.ts:21](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/terminal/table.ts#L21)

Displays data in a formatted table in the terminal.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `title` | `string` | Title to display above the table |
| `data` | `unknown`[] | Array of objects to display in table format |

##### Returns

`void`

##### Example

```ts
import { table } from "@settlemint/sdk-utils/terminal";

const data = [
  { name: "Item 1", value: 100 },
  { name: "Item 2", value: 200 }
];

table("My Table", data);
```

***

#### truncate()

> **truncate**(`value`, `maxLength`): `string`

Defined in: [sdk/utils/src/string.ts:65](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/string.ts#L65)

Truncates a string to a maximum length and appends "..." if it is longer.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | The string to truncate |
| `maxLength` | `number` | The maximum length of the string |

##### Returns

`string`

The truncated string or the original string if it is shorter than the maximum length

##### Example

```ts
import { truncate } from "@settlemint/sdk-utils";

const truncated = truncate("Hello, world!", 10);
// Returns: "Hello, wor..."
```

***

#### tryParseJson()

> **tryParseJson**\<`T`\>(`value`, `defaultValue`): `null` \| `T`

Defined in: [sdk/utils/src/json.ts:23](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/json.ts#L23)

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

`null` \| `T`

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

Defined in: [sdk/utils/src/validation/validate.ts:16](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/validate.ts#L16)

Validates a value against a given Zod schema.

##### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `ZodType`\<`any`, `ZodTypeDef`, `any`\> |

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
import { validate } from "@settlemint/sdk-utils/validation";

const validatedId = validate(IdSchema, "550e8400-e29b-41d4-a716-446655440000");
```

***

#### writeEnv()

> **writeEnv**(`options`): `Promise`\<`void`\>

Defined in: [sdk/utils/src/environment/write-env.ts:41](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/environment/write-env.ts#L41)

Writes environment variables to .env files across a project or monorepo

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `cwd?`: `string`; `env`: `Partial`\<\{ `SETTLEMINT_ACCESS_TOKEN?`: `string`; `SETTLEMINT_ACCESSIBLE_PRIVATE_KEY?`: `string`; `SETTLEMINT_APPLICATION?`: `string`; `SETTLEMINT_BLOCKCHAIN_NETWORK?`: `string`; `SETTLEMINT_BLOCKCHAIN_NETWORK_CHAIN_ID?`: `string`; `SETTLEMINT_BLOCKCHAIN_NODE?`: `string`; `SETTLEMINT_BLOCKCHAIN_NODE_JSON_RPC_ENDPOINT?`: `string`; `SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER?`: `string`; `SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER_JSON_RPC_ENDPOINT?`: `string`; `SETTLEMINT_BLOCKSCOUT?`: `string`; `SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT?`: `string`; `SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT?`: `string`; `SETTLEMINT_CUSTOM_DEPLOYMENT?`: `string`; `SETTLEMINT_CUSTOM_DEPLOYMENT_ENDPOINT?`: `string`; `SETTLEMINT_HASURA?`: `string`; `SETTLEMINT_HASURA_ADMIN_SECRET?`: `string`; `SETTLEMINT_HASURA_DATABASE_URL?`: `string`; `SETTLEMINT_HASURA_ENDPOINT?`: `string`; `SETTLEMINT_HD_PRIVATE_KEY?`: `string`; `SETTLEMINT_HD_PRIVATE_KEY_FORWARDER_ADDRESS?`: `string`; `SETTLEMINT_INSTANCE`: `string`; `SETTLEMINT_IPFS?`: `string`; `SETTLEMINT_IPFS_API_ENDPOINT?`: `string`; `SETTLEMINT_IPFS_GATEWAY_ENDPOINT?`: `string`; `SETTLEMINT_IPFS_PINNING_ENDPOINT?`: `string`; `SETTLEMINT_LOG_LEVEL`: `"error"` \| `"info"` \| `"warn"` \| `"debug"` \| `"none"`; `SETTLEMINT_MINIO?`: `string`; `SETTLEMINT_MINIO_ACCESS_KEY?`: `string`; `SETTLEMINT_MINIO_ENDPOINT?`: `string`; `SETTLEMINT_MINIO_SECRET_KEY?`: `string`; `SETTLEMINT_NEW_PROJECT_NAME?`: `string`; `SETTLEMINT_PORTAL?`: `string`; `SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT?`: `string`; `SETTLEMINT_PORTAL_REST_ENDPOINT?`: `string`; `SETTLEMINT_PORTAL_WS_ENDPOINT?`: `string`; `SETTLEMINT_THEGRAPH?`: `string`; `SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH?`: `string`; `SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS?`: `string`[]; `SETTLEMINT_WORKSPACE?`: `string`; \}\>; `prod`: `boolean`; `secrets`: `boolean`; \} | The options for writing the environment variables |
| `options.cwd?` | `string` | The directory to start searching for the package.json file from (defaults to process.cwd()) |
| `options.env` | `Partial`\<\{ `SETTLEMINT_ACCESS_TOKEN?`: `string`; `SETTLEMINT_ACCESSIBLE_PRIVATE_KEY?`: `string`; `SETTLEMINT_APPLICATION?`: `string`; `SETTLEMINT_BLOCKCHAIN_NETWORK?`: `string`; `SETTLEMINT_BLOCKCHAIN_NETWORK_CHAIN_ID?`: `string`; `SETTLEMINT_BLOCKCHAIN_NODE?`: `string`; `SETTLEMINT_BLOCKCHAIN_NODE_JSON_RPC_ENDPOINT?`: `string`; `SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER?`: `string`; `SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER_JSON_RPC_ENDPOINT?`: `string`; `SETTLEMINT_BLOCKSCOUT?`: `string`; `SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT?`: `string`; `SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT?`: `string`; `SETTLEMINT_CUSTOM_DEPLOYMENT?`: `string`; `SETTLEMINT_CUSTOM_DEPLOYMENT_ENDPOINT?`: `string`; `SETTLEMINT_HASURA?`: `string`; `SETTLEMINT_HASURA_ADMIN_SECRET?`: `string`; `SETTLEMINT_HASURA_DATABASE_URL?`: `string`; `SETTLEMINT_HASURA_ENDPOINT?`: `string`; `SETTLEMINT_HD_PRIVATE_KEY?`: `string`; `SETTLEMINT_HD_PRIVATE_KEY_FORWARDER_ADDRESS?`: `string`; `SETTLEMINT_INSTANCE`: `string`; `SETTLEMINT_IPFS?`: `string`; `SETTLEMINT_IPFS_API_ENDPOINT?`: `string`; `SETTLEMINT_IPFS_GATEWAY_ENDPOINT?`: `string`; `SETTLEMINT_IPFS_PINNING_ENDPOINT?`: `string`; `SETTLEMINT_LOG_LEVEL`: `"error"` \| `"info"` \| `"warn"` \| `"debug"` \| `"none"`; `SETTLEMINT_MINIO?`: `string`; `SETTLEMINT_MINIO_ACCESS_KEY?`: `string`; `SETTLEMINT_MINIO_ENDPOINT?`: `string`; `SETTLEMINT_MINIO_SECRET_KEY?`: `string`; `SETTLEMINT_NEW_PROJECT_NAME?`: `string`; `SETTLEMINT_PORTAL?`: `string`; `SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT?`: `string`; `SETTLEMINT_PORTAL_REST_ENDPOINT?`: `string`; `SETTLEMINT_PORTAL_WS_ENDPOINT?`: `string`; `SETTLEMINT_THEGRAPH?`: `string`; `SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH?`: `string`; `SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS?`: `string`[]; `SETTLEMINT_WORKSPACE?`: `string`; \}\> | The environment variables to write |
| `options.prod` | `boolean` | Whether to write production environment variables |
| `options.secrets` | `boolean` | Whether to write to .env.local files for secrets |

##### Returns

`Promise`\<`void`\>

Promise that resolves when writing is complete

##### Throws

Will throw an error if writing fails

##### Example

```ts
import { writeEnv } from '@settlemint/sdk-utils/environment';

// Write development environment variables
await writeEnv({
  prod: false,
  env: {
    SETTLEMINT_INSTANCE: 'https://dev.example.com'
  },
  secrets: false
});

// Write production secrets
await writeEnv({
  prod: true,
  env: {
    SETTLEMINT_ACCESS_TOKEN: 'secret-token'
  },
  secrets: true
});
```

### Classes

#### CancelError

Defined in: [sdk/utils/src/terminal/cancel.ts:8](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/terminal/cancel.ts#L8)

Error class used to indicate that the operation was cancelled.
This error is used to signal that the operation should be aborted.

##### Extends

- `Error`

***

#### CommandError

Defined in: [sdk/utils/src/terminal/execute-command.ts:16](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/terminal/execute-command.ts#L16)

Error class for command execution errors

##### Extends

- `Error`

##### Constructors

###### Constructor

> **new CommandError**(`message`, `code`, `output`): [`CommandError`](#commanderror)

Defined in: [sdk/utils/src/terminal/execute-command.ts:23](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/terminal/execute-command.ts#L23)

Constructs a new CommandError

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `message` | `string` | The error message |
| `code` | `number` | The exit code of the command |
| `output` | `string`[] | The output of the command |

###### Returns

[`CommandError`](#commanderror)

###### Overrides

`Error.constructor`

##### Properties

###### code

> `readonly` **code**: `number`

Defined in: [sdk/utils/src/terminal/execute-command.ts:25](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/terminal/execute-command.ts#L25)

The exit code of the command

###### output

> `readonly` **output**: `string`[]

Defined in: [sdk/utils/src/terminal/execute-command.ts:26](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/terminal/execute-command.ts#L26)

The output of the command

***

#### SpinnerError

Defined in: [sdk/utils/src/terminal/spinner.ts:12](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/terminal/spinner.ts#L12)

Error class used to indicate that the spinner operation failed.
This error is used to signal that the operation should be aborted.

##### Extends

- `Error`

### Interfaces

#### ExecuteCommandOptions

Defined in: [sdk/utils/src/terminal/execute-command.ts:7](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/terminal/execute-command.ts#L7)

Options for executing a command, extending SpawnOptionsWithoutStdio

##### Extends

- `SpawnOptionsWithoutStdio`

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="silent"></a> `silent?` | `boolean` | Whether to suppress output to stdout/stderr | [sdk/utils/src/terminal/execute-command.ts:9](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/terminal/execute-command.ts#L9) |

***

#### Logger

Defined in: [sdk/utils/src/logging/logger.ts:23](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/logging/logger.ts#L23)

Simple logger interface with basic logging methods
 Logger

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="debug"></a> `debug` | (`message`, ...`args`) => `void` | Log debug information | [sdk/utils/src/logging/logger.ts:25](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/logging/logger.ts#L25) |
| <a id="error"></a> `error` | (`message`, ...`args`) => `void` | Log errors | [sdk/utils/src/logging/logger.ts:31](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/logging/logger.ts#L31) |
| <a id="info"></a> `info` | (`message`, ...`args`) => `void` | Log general information | [sdk/utils/src/logging/logger.ts:27](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/logging/logger.ts#L27) |
| <a id="warn"></a> `warn` | (`message`, ...`args`) => `void` | Log warnings | [sdk/utils/src/logging/logger.ts:29](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/logging/logger.ts#L29) |

***

#### LoggerOptions

Defined in: [sdk/utils/src/logging/logger.ts:12](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/logging/logger.ts#L12)

Configuration options for the logger
 LoggerOptions

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="level"></a> `level?` | [`LogLevel`](#loglevel) | The minimum log level to output | [sdk/utils/src/logging/logger.ts:14](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/logging/logger.ts#L14) |
| <a id="prefix"></a> `prefix?` | `string` | The prefix to add to the log message | [sdk/utils/src/logging/logger.ts:16](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/logging/logger.ts#L16) |

***

#### SpinnerOptions\<R\>

Defined in: [sdk/utils/src/terminal/spinner.ts:25](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/terminal/spinner.ts#L25)

Options for configuring the spinner behavior

##### Type Parameters

| Type Parameter |
| ------ |
| `R` |

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="startmessage"></a> `startMessage` | `string` | Message to display when spinner starts | [sdk/utils/src/terminal/spinner.ts:27](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/terminal/spinner.ts#L27) |
| <a id="stopmessage"></a> `stopMessage` | `string` | Message to display when spinner completes successfully | [sdk/utils/src/terminal/spinner.ts:31](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/terminal/spinner.ts#L31) |
| <a id="task"></a> `task` | (`spinner?`) => `Promise`\<`R`\> | Async task to execute while spinner is active | [sdk/utils/src/terminal/spinner.ts:29](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/terminal/spinner.ts#L29) |

### Type Aliases

#### AccessToken

> **AccessToken** = `string`

Defined in: [sdk/utils/src/validation/access-token.schema.ts:22](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/access-token.schema.ts#L22)

Schema for validating both application and personal access tokens.
Accepts tokens starting with either 'sm_pat_' or 'sm_aat_' prefix.

***

#### ApplicationAccessToken

> **ApplicationAccessToken** = `string`

Defined in: [sdk/utils/src/validation/access-token.schema.ts:8](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/access-token.schema.ts#L8)

Schema for validating application access tokens.
Application access tokens start with 'sm_aat_' prefix.

***

#### DotEnv

> **DotEnv** = `object`

Defined in: [sdk/utils/src/validation/dot-env.schema.ts:101](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L101)

Type definition for the environment variables schema.

##### Type declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="settlemint_access_token"></a> `SETTLEMINT_ACCESS_TOKEN?` | `string` | Application access token for authenticating with SettleMint services | [sdk/utils/src/validation/dot-env.schema.ts:16](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L16) |
| <a id="settlemint_accessible_private_key"></a> `SETTLEMINT_ACCESSIBLE_PRIVATE_KEY?` | `string` | Unique name of the accessible private key | [sdk/utils/src/validation/dot-env.schema.ts:65](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L65) |
| <a id="settlemint_application"></a> `SETTLEMINT_APPLICATION?` | `string` | Unique name of the application | [sdk/utils/src/validation/dot-env.schema.ts:22](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L22) |
| <a id="settlemint_blockchain_network"></a> `SETTLEMINT_BLOCKCHAIN_NETWORK?` | `string` | Unique name of the blockchain network | [sdk/utils/src/validation/dot-env.schema.ts:24](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L24) |
| <a id="settlemint_blockchain_network_chain_id"></a> `SETTLEMINT_BLOCKCHAIN_NETWORK_CHAIN_ID?` | `string` | Chain ID of the blockchain network | [sdk/utils/src/validation/dot-env.schema.ts:26](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L26) |
| <a id="settlemint_blockchain_node"></a> `SETTLEMINT_BLOCKCHAIN_NODE?` | `string` | Unique name of the blockchain node (should have a private key for signing transactions) | [sdk/utils/src/validation/dot-env.schema.ts:28](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L28) |
| <a id="settlemint_blockchain_node_json_rpc_endpoint"></a> `SETTLEMINT_BLOCKCHAIN_NODE_JSON_RPC_ENDPOINT?` | `string` | JSON RPC endpoint for the blockchain node | [sdk/utils/src/validation/dot-env.schema.ts:30](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L30) |
| <a id="settlemint_blockchain_node_or_load_balancer"></a> `SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER?` | `string` | Unique name of the blockchain node or load balancer | [sdk/utils/src/validation/dot-env.schema.ts:32](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L32) |
| <a id="settlemint_blockchain_node_or_load_balancer_json_rpc_endpoint"></a> `SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER_JSON_RPC_ENDPOINT?` | `string` | JSON RPC endpoint for the blockchain node or load balancer | [sdk/utils/src/validation/dot-env.schema.ts:34](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L34) |
| <a id="settlemint_blockscout"></a> `SETTLEMINT_BLOCKSCOUT?` | `string` | Unique name of the Blockscout instance | [sdk/utils/src/validation/dot-env.schema.ts:87](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L87) |
| <a id="settlemint_blockscout_graphql_endpoint"></a> `SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT?` | `string` | GraphQL endpoint URL for Blockscout | [sdk/utils/src/validation/dot-env.schema.ts:89](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L89) |
| <a id="settlemint_blockscout_ui_endpoint"></a> `SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT?` | `string` | UI endpoint URL for Blockscout | [sdk/utils/src/validation/dot-env.schema.ts:91](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L91) |
| <a id="settlemint_custom_deployment"></a> `SETTLEMINT_CUSTOM_DEPLOYMENT?` | `string` | Unique name of the custom deployment | [sdk/utils/src/validation/dot-env.schema.ts:83](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L83) |
| <a id="settlemint_custom_deployment_endpoint"></a> `SETTLEMINT_CUSTOM_DEPLOYMENT_ENDPOINT?` | `string` | Endpoint URL for the custom deployment | [sdk/utils/src/validation/dot-env.schema.ts:85](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L85) |
| <a id="settlemint_hasura"></a> `SETTLEMINT_HASURA?` | `string` | Unique name of the Hasura instance | [sdk/utils/src/validation/dot-env.schema.ts:36](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L36) |
| <a id="settlemint_hasura_admin_secret"></a> `SETTLEMINT_HASURA_ADMIN_SECRET?` | `string` | Admin secret for authenticating with Hasura | [sdk/utils/src/validation/dot-env.schema.ts:40](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L40) |
| <a id="settlemint_hasura_database_url"></a> `SETTLEMINT_HASURA_DATABASE_URL?` | `string` | Database connection URL for Hasura | [sdk/utils/src/validation/dot-env.schema.ts:42](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L42) |
| <a id="settlemint_hasura_endpoint"></a> `SETTLEMINT_HASURA_ENDPOINT?` | `string` | Endpoint URL for the Hasura GraphQL API | [sdk/utils/src/validation/dot-env.schema.ts:38](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L38) |
| <a id="settlemint_hd_private_key"></a> `SETTLEMINT_HD_PRIVATE_KEY?` | `string` | Unique name of the HD private key | [sdk/utils/src/validation/dot-env.schema.ts:61](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L61) |
| <a id="settlemint_hd_private_key_forwarder_address"></a> `SETTLEMINT_HD_PRIVATE_KEY_FORWARDER_ADDRESS?` | `string` | Address of the HD private key forwarder | [sdk/utils/src/validation/dot-env.schema.ts:63](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L63) |
| <a id="settlemint_instance"></a> `SETTLEMINT_INSTANCE` | `string` | Base URL of the SettleMint platform instance | [sdk/utils/src/validation/dot-env.schema.ts:14](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L14) |
| <a id="settlemint_ipfs"></a> `SETTLEMINT_IPFS?` | `string` | Unique name of the IPFS instance | [sdk/utils/src/validation/dot-env.schema.ts:75](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L75) |
| <a id="settlemint_ipfs_api_endpoint"></a> `SETTLEMINT_IPFS_API_ENDPOINT?` | `string` | API endpoint URL for IPFS | [sdk/utils/src/validation/dot-env.schema.ts:77](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L77) |
| <a id="settlemint_ipfs_gateway_endpoint"></a> `SETTLEMINT_IPFS_GATEWAY_ENDPOINT?` | `string` | Gateway endpoint URL for IPFS | [sdk/utils/src/validation/dot-env.schema.ts:81](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L81) |
| <a id="settlemint_ipfs_pinning_endpoint"></a> `SETTLEMINT_IPFS_PINNING_ENDPOINT?` | `string` | Pinning service endpoint URL for IPFS | [sdk/utils/src/validation/dot-env.schema.ts:79](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L79) |
| <a id="settlemint_log_level"></a> `SETTLEMINT_LOG_LEVEL` | `"error"` \| `"info"` \| `"warn"` \| `"debug"` \| `"none"` | The log level to use | [sdk/utils/src/validation/dot-env.schema.ts:95](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L95) |
| <a id="settlemint_minio"></a> `SETTLEMINT_MINIO?` | `string` | Unique name of the MinIO instance | [sdk/utils/src/validation/dot-env.schema.ts:67](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L67) |
| <a id="settlemint_minio_access_key"></a> `SETTLEMINT_MINIO_ACCESS_KEY?` | `string` | Access key for MinIO authentication | [sdk/utils/src/validation/dot-env.schema.ts:71](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L71) |
| <a id="settlemint_minio_endpoint"></a> `SETTLEMINT_MINIO_ENDPOINT?` | `string` | Endpoint URL for MinIO | [sdk/utils/src/validation/dot-env.schema.ts:69](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L69) |
| <a id="settlemint_minio_secret_key"></a> `SETTLEMINT_MINIO_SECRET_KEY?` | `string` | Secret key for MinIO authentication | [sdk/utils/src/validation/dot-env.schema.ts:73](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L73) |
| <a id="settlemint_new_project_name"></a> `SETTLEMINT_NEW_PROJECT_NAME?` | `string` | Name of the new project being created | [sdk/utils/src/validation/dot-env.schema.ts:93](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L93) |
| <a id="settlemint_portal"></a> `SETTLEMINT_PORTAL?` | `string` | Unique name of the Smart Contract Portal instance | [sdk/utils/src/validation/dot-env.schema.ts:53](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L53) |
| <a id="settlemint_portal_graphql_endpoint"></a> `SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT?` | `string` | GraphQL endpoint URL for the Portal | [sdk/utils/src/validation/dot-env.schema.ts:55](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L55) |
| <a id="settlemint_portal_rest_endpoint"></a> `SETTLEMINT_PORTAL_REST_ENDPOINT?` | `string` | REST endpoint URL for the Portal | [sdk/utils/src/validation/dot-env.schema.ts:57](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L57) |
| <a id="settlemint_portal_ws_endpoint"></a> `SETTLEMINT_PORTAL_WS_ENDPOINT?` | `string` | WebSocket endpoint URL for the Portal | [sdk/utils/src/validation/dot-env.schema.ts:59](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L59) |
| <a id="settlemint_thegraph"></a> `SETTLEMINT_THEGRAPH?` | `string` | Unique name of The Graph instance | [sdk/utils/src/validation/dot-env.schema.ts:44](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L44) |
| <a id="settlemint_thegraph_default_subgraph"></a> `SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH?` | `string` | Default The Graph subgraph to use | [sdk/utils/src/validation/dot-env.schema.ts:51](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L51) |
| <a id="settlemint_thegraph_subgraphs_endpoints"></a> `SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS?` | `string`[] | Array of endpoint URLs for The Graph subgraphs | [sdk/utils/src/validation/dot-env.schema.ts:46](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L46) |
| <a id="settlemint_workspace"></a> `SETTLEMINT_WORKSPACE?` | `string` | Unique name of the workspace | [sdk/utils/src/validation/dot-env.schema.ts:20](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L20) |

***

#### DotEnvPartial

> **DotEnvPartial** = `object`

Defined in: [sdk/utils/src/validation/dot-env.schema.ts:112](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L112)

Type definition for the partial environment variables schema.

##### Type declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="settlemint_access_token-1"></a> `SETTLEMINT_ACCESS_TOKEN?` | `string` | Application access token for authenticating with SettleMint services | [sdk/utils/src/validation/dot-env.schema.ts:16](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L16) |
| <a id="settlemint_accessible_private_key-1"></a> `SETTLEMINT_ACCESSIBLE_PRIVATE_KEY?` | `string` | Unique name of the accessible private key | [sdk/utils/src/validation/dot-env.schema.ts:65](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L65) |
| <a id="settlemint_application-1"></a> `SETTLEMINT_APPLICATION?` | `string` | Unique name of the application | [sdk/utils/src/validation/dot-env.schema.ts:22](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L22) |
| <a id="settlemint_blockchain_network-1"></a> `SETTLEMINT_BLOCKCHAIN_NETWORK?` | `string` | Unique name of the blockchain network | [sdk/utils/src/validation/dot-env.schema.ts:24](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L24) |
| <a id="settlemint_blockchain_network_chain_id-1"></a> `SETTLEMINT_BLOCKCHAIN_NETWORK_CHAIN_ID?` | `string` | Chain ID of the blockchain network | [sdk/utils/src/validation/dot-env.schema.ts:26](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L26) |
| <a id="settlemint_blockchain_node-1"></a> `SETTLEMINT_BLOCKCHAIN_NODE?` | `string` | Unique name of the blockchain node (should have a private key for signing transactions) | [sdk/utils/src/validation/dot-env.schema.ts:28](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L28) |
| <a id="settlemint_blockchain_node_json_rpc_endpoint-1"></a> `SETTLEMINT_BLOCKCHAIN_NODE_JSON_RPC_ENDPOINT?` | `string` | JSON RPC endpoint for the blockchain node | [sdk/utils/src/validation/dot-env.schema.ts:30](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L30) |
| <a id="settlemint_blockchain_node_or_load_balancer-1"></a> `SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER?` | `string` | Unique name of the blockchain node or load balancer | [sdk/utils/src/validation/dot-env.schema.ts:32](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L32) |
| <a id="settlemint_blockchain_node_or_load_balancer_json_rpc_endpoint-1"></a> `SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER_JSON_RPC_ENDPOINT?` | `string` | JSON RPC endpoint for the blockchain node or load balancer | [sdk/utils/src/validation/dot-env.schema.ts:34](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L34) |
| <a id="settlemint_blockscout-1"></a> `SETTLEMINT_BLOCKSCOUT?` | `string` | Unique name of the Blockscout instance | [sdk/utils/src/validation/dot-env.schema.ts:87](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L87) |
| <a id="settlemint_blockscout_graphql_endpoint-1"></a> `SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT?` | `string` | GraphQL endpoint URL for Blockscout | [sdk/utils/src/validation/dot-env.schema.ts:89](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L89) |
| <a id="settlemint_blockscout_ui_endpoint-1"></a> `SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT?` | `string` | UI endpoint URL for Blockscout | [sdk/utils/src/validation/dot-env.schema.ts:91](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L91) |
| <a id="settlemint_custom_deployment-1"></a> `SETTLEMINT_CUSTOM_DEPLOYMENT?` | `string` | Unique name of the custom deployment | [sdk/utils/src/validation/dot-env.schema.ts:83](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L83) |
| <a id="settlemint_custom_deployment_endpoint-1"></a> `SETTLEMINT_CUSTOM_DEPLOYMENT_ENDPOINT?` | `string` | Endpoint URL for the custom deployment | [sdk/utils/src/validation/dot-env.schema.ts:85](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L85) |
| <a id="settlemint_hasura-1"></a> `SETTLEMINT_HASURA?` | `string` | Unique name of the Hasura instance | [sdk/utils/src/validation/dot-env.schema.ts:36](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L36) |
| <a id="settlemint_hasura_admin_secret-1"></a> `SETTLEMINT_HASURA_ADMIN_SECRET?` | `string` | Admin secret for authenticating with Hasura | [sdk/utils/src/validation/dot-env.schema.ts:40](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L40) |
| <a id="settlemint_hasura_database_url-1"></a> `SETTLEMINT_HASURA_DATABASE_URL?` | `string` | Database connection URL for Hasura | [sdk/utils/src/validation/dot-env.schema.ts:42](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L42) |
| <a id="settlemint_hasura_endpoint-1"></a> `SETTLEMINT_HASURA_ENDPOINT?` | `string` | Endpoint URL for the Hasura GraphQL API | [sdk/utils/src/validation/dot-env.schema.ts:38](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L38) |
| <a id="settlemint_hd_private_key-1"></a> `SETTLEMINT_HD_PRIVATE_KEY?` | `string` | Unique name of the HD private key | [sdk/utils/src/validation/dot-env.schema.ts:61](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L61) |
| <a id="settlemint_hd_private_key_forwarder_address-1"></a> `SETTLEMINT_HD_PRIVATE_KEY_FORWARDER_ADDRESS?` | `string` | Address of the HD private key forwarder | [sdk/utils/src/validation/dot-env.schema.ts:63](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L63) |
| <a id="settlemint_instance-1"></a> `SETTLEMINT_INSTANCE?` | `string` | Base URL of the SettleMint platform instance | [sdk/utils/src/validation/dot-env.schema.ts:14](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L14) |
| <a id="settlemint_ipfs-1"></a> `SETTLEMINT_IPFS?` | `string` | Unique name of the IPFS instance | [sdk/utils/src/validation/dot-env.schema.ts:75](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L75) |
| <a id="settlemint_ipfs_api_endpoint-1"></a> `SETTLEMINT_IPFS_API_ENDPOINT?` | `string` | API endpoint URL for IPFS | [sdk/utils/src/validation/dot-env.schema.ts:77](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L77) |
| <a id="settlemint_ipfs_gateway_endpoint-1"></a> `SETTLEMINT_IPFS_GATEWAY_ENDPOINT?` | `string` | Gateway endpoint URL for IPFS | [sdk/utils/src/validation/dot-env.schema.ts:81](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L81) |
| <a id="settlemint_ipfs_pinning_endpoint-1"></a> `SETTLEMINT_IPFS_PINNING_ENDPOINT?` | `string` | Pinning service endpoint URL for IPFS | [sdk/utils/src/validation/dot-env.schema.ts:79](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L79) |
| <a id="settlemint_log_level-1"></a> `SETTLEMINT_LOG_LEVEL?` | `"error"` \| `"info"` \| `"warn"` \| `"debug"` \| `"none"` | The log level to use | [sdk/utils/src/validation/dot-env.schema.ts:95](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L95) |
| <a id="settlemint_minio-1"></a> `SETTLEMINT_MINIO?` | `string` | Unique name of the MinIO instance | [sdk/utils/src/validation/dot-env.schema.ts:67](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L67) |
| <a id="settlemint_minio_access_key-1"></a> `SETTLEMINT_MINIO_ACCESS_KEY?` | `string` | Access key for MinIO authentication | [sdk/utils/src/validation/dot-env.schema.ts:71](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L71) |
| <a id="settlemint_minio_endpoint-1"></a> `SETTLEMINT_MINIO_ENDPOINT?` | `string` | Endpoint URL for MinIO | [sdk/utils/src/validation/dot-env.schema.ts:69](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L69) |
| <a id="settlemint_minio_secret_key-1"></a> `SETTLEMINT_MINIO_SECRET_KEY?` | `string` | Secret key for MinIO authentication | [sdk/utils/src/validation/dot-env.schema.ts:73](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L73) |
| <a id="settlemint_new_project_name-1"></a> `SETTLEMINT_NEW_PROJECT_NAME?` | `string` | Name of the new project being created | [sdk/utils/src/validation/dot-env.schema.ts:93](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L93) |
| <a id="settlemint_portal-1"></a> `SETTLEMINT_PORTAL?` | `string` | Unique name of the Smart Contract Portal instance | [sdk/utils/src/validation/dot-env.schema.ts:53](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L53) |
| <a id="settlemint_portal_graphql_endpoint-1"></a> `SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT?` | `string` | GraphQL endpoint URL for the Portal | [sdk/utils/src/validation/dot-env.schema.ts:55](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L55) |
| <a id="settlemint_portal_rest_endpoint-1"></a> `SETTLEMINT_PORTAL_REST_ENDPOINT?` | `string` | REST endpoint URL for the Portal | [sdk/utils/src/validation/dot-env.schema.ts:57](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L57) |
| <a id="settlemint_portal_ws_endpoint-1"></a> `SETTLEMINT_PORTAL_WS_ENDPOINT?` | `string` | WebSocket endpoint URL for the Portal | [sdk/utils/src/validation/dot-env.schema.ts:59](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L59) |
| <a id="settlemint_thegraph-1"></a> `SETTLEMINT_THEGRAPH?` | `string` | Unique name of The Graph instance | [sdk/utils/src/validation/dot-env.schema.ts:44](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L44) |
| <a id="settlemint_thegraph_default_subgraph-1"></a> `SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH?` | `string` | Default The Graph subgraph to use | [sdk/utils/src/validation/dot-env.schema.ts:51](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L51) |
| <a id="settlemint_thegraph_subgraphs_endpoints-1"></a> `SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS?` | `string`[] | Array of endpoint URLs for The Graph subgraphs | [sdk/utils/src/validation/dot-env.schema.ts:46](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L46) |
| <a id="settlemint_workspace-1"></a> `SETTLEMINT_WORKSPACE?` | `string` | Unique name of the workspace | [sdk/utils/src/validation/dot-env.schema.ts:20](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L20) |

***

#### Id

> **Id** = `string`

Defined in: [sdk/utils/src/validation/id.schema.ts:30](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/id.schema.ts#L30)

Type definition for database IDs, inferred from IdSchema.
Can be either a PostgreSQL UUID string or MongoDB ObjectID string.

***

#### LogLevel

> **LogLevel** = `"debug"` \| `"info"` \| `"warn"` \| `"error"` \| `"none"`

Defined in: [sdk/utils/src/logging/logger.ts:6](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/logging/logger.ts#L6)

Log levels supported by the logger

***

#### PersonalAccessToken

> **PersonalAccessToken** = `string`

Defined in: [sdk/utils/src/validation/access-token.schema.ts:15](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/access-token.schema.ts#L15)

Schema for validating personal access tokens.
Personal access tokens start with 'sm_pat_' prefix.

***

#### Url

> **Url** = `string`

Defined in: [sdk/utils/src/validation/url.schema.ts:18](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/url.schema.ts#L18)

Schema for validating URLs.

##### Example

```ts
import { UrlSchema } from "@settlemint/sdk-utils/validation";

// Validate a URL
const isValidUrl = UrlSchema.safeParse("https://console.settlemint.com").success;
// true

// Invalid URLs will fail validation
const isInvalidUrl = UrlSchema.safeParse("not-a-url").success;
// false
```

***

#### UrlOrPath

> **UrlOrPath** = `string`

Defined in: [sdk/utils/src/validation/url.schema.ts:55](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/url.schema.ts#L55)

Schema that accepts either a full URL or a URL path.

##### Example

```ts
import { UrlOrPathSchema } from "@settlemint/sdk-utils/validation";

// Validate a URL
const isValidUrl = UrlOrPathSchema.safeParse("https://console.settlemint.com").success;
// true

// Validate a path
const isValidPath = UrlOrPathSchema.safeParse("/api/v1/users").success;
// true
```

***

#### UrlPath

> **UrlPath** = `string`

Defined in: [sdk/utils/src/validation/url.schema.ts:38](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/url.schema.ts#L38)

Schema for validating URL paths.

##### Example

```ts
import { UrlPathSchema } from "@settlemint/sdk-utils/validation";

// Validate a URL path
const isValidPath = UrlPathSchema.safeParse("/api/v1/users").success;
// true

// Invalid paths will fail validation
const isInvalidPath = UrlPathSchema.safeParse("not-a-path").success;
// false
```

### Variables

#### AccessTokenSchema

> `const` **AccessTokenSchema**: `ZodString`\<[`AccessToken`](#accesstoken)\>

Defined in: [sdk/utils/src/validation/access-token.schema.ts:21](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/access-token.schema.ts#L21)

Schema for validating both application and personal access tokens.
Accepts tokens starting with either 'sm_pat_' or 'sm_aat_' prefix.

***

#### ApplicationAccessTokenSchema

> `const` **ApplicationAccessTokenSchema**: `ZodString`\<[`ApplicationAccessToken`](#applicationaccesstoken)\>

Defined in: [sdk/utils/src/validation/access-token.schema.ts:7](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/access-token.schema.ts#L7)

Schema for validating application access tokens.
Application access tokens start with 'sm_aat_' prefix.

***

#### DotEnvSchema

> `const` **DotEnvSchema**: `ZodObject`\<[`DotEnv`](#dotenv)\>

Defined in: [sdk/utils/src/validation/dot-env.schema.ts:12](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L12)

Schema for validating environment variables used by the SettleMint SDK.
Defines validation rules and types for configuration values like URLs,
access tokens, workspace names, and service endpoints.

***

#### DotEnvSchemaPartial

> `const` **DotEnvSchemaPartial**: `ZodObject`\<[`DotEnvPartial`](#dotenvpartial)\>

Defined in: [sdk/utils/src/validation/dot-env.schema.ts:107](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/dot-env.schema.ts#L107)

Partial version of the environment variables schema where all fields are optional.
Useful for validating incomplete configurations during development or build time.

***

#### IdSchema

> `const` **IdSchema**: `ZodUnion`\<[`Id`](#id)\>

Defined in: [sdk/utils/src/validation/id.schema.ts:17](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/id.schema.ts#L17)

Schema for validating database IDs. Accepts both PostgreSQL UUIDs and MongoDB ObjectIDs.
PostgreSQL UUIDs are 32 hexadecimal characters with hyphens (e.g. 123e4567-e89b-12d3-a456-426614174000).
MongoDB ObjectIDs are 24 hexadecimal characters (e.g. 507f1f77bcf86cd799439011).

##### Example

```ts
import { IdSchema } from "@settlemint/sdk-utils/validation";

// Validate PostgreSQL UUID
const isValidUuid = IdSchema.safeParse("123e4567-e89b-12d3-a456-426614174000").success;

// Validate MongoDB ObjectID
const isValidObjectId = IdSchema.safeParse("507f1f77bcf86cd799439011").success;
```

***

#### PersonalAccessTokenSchema

> `const` **PersonalAccessTokenSchema**: `ZodString`\<[`PersonalAccessToken`](#personalaccesstoken)\>

Defined in: [sdk/utils/src/validation/access-token.schema.ts:14](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/access-token.schema.ts#L14)

Schema for validating personal access tokens.
Personal access tokens start with 'sm_pat_' prefix.

***

#### runsInBrowser

> `const` **runsInBrowser**: `boolean` = `isBrowser`

Defined in: [sdk/utils/src/runtime/ensure-server.ts:40](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/runtime/ensure-server.ts#L40)

Boolean indicating if code is currently running in a browser environment

***

#### runsOnServer

> `const` **runsOnServer**: `boolean` = `!isBrowser`

Defined in: [sdk/utils/src/runtime/ensure-server.ts:45](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/runtime/ensure-server.ts#L45)

Boolean indicating if code is currently running in a server environment

***

#### UniqueNameSchema

> `const` **UniqueNameSchema**: `ZodString`

Defined in: [sdk/utils/src/validation/unique-name.schema.ts:19](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/unique-name.schema.ts#L19)

Schema for validating unique names used across the SettleMint platform.
Only accepts lowercase alphanumeric characters and hyphens.
Used for workspace names, application names, service names etc.

##### Example

```ts
import { UniqueNameSchema } from "@settlemint/sdk-utils/validation";

// Validate a workspace name
const isValidName = UniqueNameSchema.safeParse("my-workspace-123").success;
// true

// Invalid names will fail validation
const isInvalidName = UniqueNameSchema.safeParse("My Workspace!").success;
// false
```

***

#### UrlOrPathSchema

> `const` **UrlOrPathSchema**: `ZodUnion`\<[`UrlOrPath`](#urlorpath)\>

Defined in: [sdk/utils/src/validation/url.schema.ts:54](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/url.schema.ts#L54)

Schema that accepts either a full URL or a URL path.

##### Example

```ts
import { UrlOrPathSchema } from "@settlemint/sdk-utils/validation";

// Validate a URL
const isValidUrl = UrlOrPathSchema.safeParse("https://console.settlemint.com").success;
// true

// Validate a path
const isValidPath = UrlOrPathSchema.safeParse("/api/v1/users").success;
// true
```

***

#### UrlPathSchema

> `const` **UrlPathSchema**: `ZodString`\<[`UrlPath`](#urlpath)\>

Defined in: [sdk/utils/src/validation/url.schema.ts:34](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/url.schema.ts#L34)

Schema for validating URL paths.

##### Example

```ts
import { UrlPathSchema } from "@settlemint/sdk-utils/validation";

// Validate a URL path
const isValidPath = UrlPathSchema.safeParse("/api/v1/users").success;
// true

// Invalid paths will fail validation
const isInvalidPath = UrlPathSchema.safeParse("not-a-path").success;
// false
```

***

#### UrlSchema

> `const` **UrlSchema**: `ZodString`\<[`Url`](#url)\>

Defined in: [sdk/utils/src/validation/url.schema.ts:17](https://github.com/settlemint/sdk/blob/v2.2.3/sdk/utils/src/validation/url.schema.ts#L17)

Schema for validating URLs.

##### Example

```ts
import { UrlSchema } from "@settlemint/sdk-utils/validation";

// Validate a URL
const isValidUrl = UrlSchema.safeParse("https://console.settlemint.com").success;
// true

// Invalid URLs will fail validation
const isInvalidUrl = UrlSchema.safeParse("not-a-url").success;
// false
```

## Contributing

We welcome contributions from the community! Please check out our [Contributing](https://github.com/settlemint/sdk/blob/main/.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](https://github.com/settlemint/sdk/blob/main/LICENSE) file for more details.
