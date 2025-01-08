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
<a href="https://fsl.software" rel="nofollow"><img src="https://img.shields.io/npm/l/@settlemint/sdk-thegraph" alt="License"></a>
<a href="https://www.npmjs.com/package/@settlemint/sdk-thegraph" rel="nofollow"><img src="https://img.shields.io/npm/dw/@settlemint/sdk-thegraph" alt="npm"></a>
<a href="https://github.com/settlemint/sdk" rel="nofollow"><img src="https://img.shields.io/github/stars/settlemint/sdk" alt="stars"></a>
</p>

<div align="center">
  <a href="https://console.settlemint.com/documentation/">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://discord.com/invite/Mt5yqFrey9">Discord</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/sdk-thegraph">NPM</a>
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

The SettleMint TheGraph SDK provides a seamless way to interact with TheGraph APIs for blockchain data indexing and querying. It enables you to easily create and manage subgraphs, define schemas, and query indexed blockchain data using GraphQL from your SettleMint-powered blockchain networks.

The SDK offers a type-safe interface for all TheGraph operations, with comprehensive error handling and validation. It integrates smoothly with modern TypeScript applications while providing a simple and intuitive developer experience.

For detailed information about using TheGraph with the SettleMint platform, check out our  [official documentation](https://console.settlemint.com/documentation/docs/using-platform/middleware/#the-graph-middleware).

## Usage

TODO: define default

## API Reference

## Variables

### ClientOptionsSchema

> `const` **ClientOptionsSchema**: `ZodDiscriminatedUnion`\<`"runtime"`, \[`ZodObject`\<\{ `accessToken`: `ZodString`; `instances`: `ZodArray`\<`ZodUnion`\<\[`ZodString`, `ZodString`\]\>\>; `runtime`: `ZodLiteral`\<`"server"`\>; `subgraphName`: `ZodString`; \}, `"strip"`, \{ `accessToken`: `string`; `instances`: `string`[]; `runtime`: `"server"`; `subgraphName`: `string`; \}, \{ `accessToken`: `string`; `instances`: `string`[]; `runtime`: `"server"`; `subgraphName`: `string`; \}\>, `ZodObject`\<\{ `runtime`: `ZodLiteral`\<`"browser"`\>; `subgraphName`: `ZodString`; \}, `"strip"`, \{ `runtime`: `"browser"`; `subgraphName`: `string`; \}, \{ `runtime`: `"browser"`; `subgraphName`: `string`; \}\>\]\>

Defined in: [sdk/thegraph/src/thegraph.ts:15](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/thegraph/src/thegraph.ts#L15)

Schema for validating client options for the Portal client.

## Functions

### createTheGraphClient()

> **createTheGraphClient**\<`Setup`\>(`options`, `clientOptions`?): `object`

Defined in: [sdk/thegraph/src/thegraph.ts:62](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/thegraph/src/thegraph.ts#L62)

Creates a Portal client using URQL

#### Type Parameters

| Type Parameter |
| ------ |
| `Setup` *extends* `AbstractSetupSchema` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | `Omit`\<\{ `accessToken`: `string`; `instances`: `string`[]; `runtime`: `"server"`; `subgraphName`: `string`; \} \| \{ `runtime`: `"browser"`; `subgraphName`: `string`; \}, `"runtime"`\> & `Record`\<`string`, `unknown`\> | The client options for configuring the Portal client. |
| `clientOptions`? | `RequestConfig` | Optional configuration for the URQL client. |

#### Returns

`object`

An object containing the URQL client and the initialized graphql function.

##### client

> **client**: `GraphQLClient`

##### graphql

> **graphql**: `initGraphQLTada`\<`Setup`\>

#### Throws

Will throw an error if the options fail validation.

***

### readFragment()

#### Call Signature

> **readFragment**\<`Document`\>(`_document`, `fragment`): `resultOfT`\<`Document`\>

Defined in: node\_modules/gql.tada/dist/gql-tada.d.ts:2155

Unmasks a fragment mask for a given fragment document and data.

##### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `Document` *extends* `FragmentShape` | `never` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `_document` | `Document` | A GraphQL document of a fragment, created using graphql. |
| `fragment` | `never` | A mask of the fragment, which can be wrapped in arrays, or nullable. |

##### Returns

`resultOfT`\<`Document`\>

The unmasked data of the fragment.

##### Remarks

When graphql is used to create a fragment and is spread into another
fragment or query, their result types will only contain a “reference” to the
fragment. This encourages isolation and is known as “fragment masking.”

This means that you must use [readFragment](REFERENCE.md#readfragment) to unmask these fragment masks
and get to the data. This encourages isolation and only using the data you define
a part of your codebase to require.

##### Example

```
import { FragmentOf, graphql, readFragment } from 'gql.tada';

const bookFragment = graphql(`
  fragment BookComponent on Book {
    id
    title
  }
`);

const getBook = (data: FragmentOf<typeof bookFragment> | null) => {
  // Unmasks the fragment and casts to the result type of `bookFragment`
  // This is intersected with `| null` in this case, due to the input type.
  const book = readFragment(bookFragment, data);
};

const bookQuery = graphql(`
  query Book ($id: ID!) {
    book(id: $id) {
      id
      ...BookComponent
    }
  }
`, [bookFragment]);

const getQuery = (data: ResultOf<typeof bookQuery>) => {
  getBook(data?.book);
};
```

##### See

[readFragment](REFERENCE.md#readfragment) for how to read from fragment masks.

#### Call Signature

> **readFragment**\<`Document`, `T`\>(`_document`, `fragments`): readonly `T` *extends* `resultOrFragmentOf`\<`Document`\> ? `resultOfT`\<`Document`, `T`\> : `T`[]

Defined in: node\_modules/gql.tada/dist/gql-tada.d.ts:2159

Unmasks a fragment mask for a given fragment document and data.

##### Type Parameters

| Type Parameter |
| ------ |
| `Document` *extends* `FragmentShape` |
| `T` *extends* `unknown` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `_document` | `Document` | A GraphQL document of a fragment, created using graphql. |
| `fragments` | readonly `T`[] | - |

##### Returns

readonly `T` *extends* `resultOrFragmentOf`\<`Document`\> ? `resultOfT`\<`Document`, `T`\> : `T`[]

The unmasked data of the fragment.

##### Remarks

When graphql is used to create a fragment and is spread into another
fragment or query, their result types will only contain a “reference” to the
fragment. This encourages isolation and is known as “fragment masking.”

This means that you must use [readFragment](REFERENCE.md#readfragment) to unmask these fragment masks
and get to the data. This encourages isolation and only using the data you define
a part of your codebase to require.

##### Example

```
import { FragmentOf, graphql, readFragment } from 'gql.tada';

const bookFragment = graphql(`
  fragment BookComponent on Book {
    id
    title
  }
`);

const getBook = (data: FragmentOf<typeof bookFragment> | null) => {
  // Unmasks the fragment and casts to the result type of `bookFragment`
  // This is intersected with `| null` in this case, due to the input type.
  const book = readFragment(bookFragment, data);
};

const bookQuery = graphql(`
  query Book ($id: ID!) {
    book(id: $id) {
      id
      ...BookComponent
    }
  }
`, [bookFragment]);

const getQuery = (data: ResultOf<typeof bookQuery>) => {
  getBook(data?.book);
};
```

##### See

[readFragment](REFERENCE.md#readfragment) for how to read from fragment masks.

#### Call Signature

> **readFragment**\<`Document`, `T`\>(`_document`, `fragment`): `T` *extends* `resultOrFragmentOf`\<`Document`\> ? `resultOfT`\<`Document`, `T`\> : `T`

Defined in: node\_modules/gql.tada/dist/gql-tada.d.ts:2166

Unmasks a fragment mask for a given fragment document and data.

##### Type Parameters

| Type Parameter |
| ------ |
| `Document` *extends* `FragmentShape` |
| `T` *extends* `unknown` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `_document` | `Document` | A GraphQL document of a fragment, created using graphql. |
| `fragment` | `T` | A mask of the fragment, which can be wrapped in arrays, or nullable. |

##### Returns

`T` *extends* `resultOrFragmentOf`\<`Document`\> ? `resultOfT`\<`Document`, `T`\> : `T`

The unmasked data of the fragment.

##### Remarks

When graphql is used to create a fragment and is spread into another
fragment or query, their result types will only contain a “reference” to the
fragment. This encourages isolation and is known as “fragment masking.”

This means that you must use [readFragment](REFERENCE.md#readfragment) to unmask these fragment masks
and get to the data. This encourages isolation and only using the data you define
a part of your codebase to require.

##### Example

```
import { FragmentOf, graphql, readFragment } from 'gql.tada';

const bookFragment = graphql(`
  fragment BookComponent on Book {
    id
    title
  }
`);

const getBook = (data: FragmentOf<typeof bookFragment> | null) => {
  // Unmasks the fragment and casts to the result type of `bookFragment`
  // This is intersected with `| null` in this case, due to the input type.
  const book = readFragment(bookFragment, data);
};

const bookQuery = graphql(`
  query Book ($id: ID!) {
    book(id: $id) {
      id
      ...BookComponent
    }
  }
`, [bookFragment]);

const getQuery = (data: ResultOf<typeof bookQuery>) => {
  getBook(data?.book);
};
```

##### See

[readFragment](REFERENCE.md#readfragment) for how to read from fragment masks.

#### Call Signature

> **readFragment**\<`Document`\>(`fragment`): readonly [`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\>[]

Defined in: node\_modules/gql.tada/dist/gql-tada.d.ts:2173

Unmasks a fragment mask for a given fragment document and data.

##### Type Parameters

| Type Parameter |
| ------ |
| `Document` *extends* `FragmentShape` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fragment` | readonly `resultOrFragmentOf`\<`Document`\>[] | A mask of the fragment, which can be wrapped in arrays, or nullable. |

##### Returns

readonly [`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\>[]

The unmasked data of the fragment.

##### Remarks

When graphql is used to create a fragment and is spread into another
fragment or query, their result types will only contain a “reference” to the
fragment. This encourages isolation and is known as “fragment masking.”

This means that you must use [readFragment](REFERENCE.md#readfragment) to unmask these fragment masks
and get to the data. This encourages isolation and only using the data you define
a part of your codebase to require.

##### Example

```
import { FragmentOf, graphql, readFragment } from 'gql.tada';

const bookFragment = graphql(`
  fragment BookComponent on Book {
    id
    title
  }
`);

const getBook = (data: FragmentOf<typeof bookFragment> | null) => {
  // Unmasks the fragment and casts to the result type of `bookFragment`
  // This is intersected with `| null` in this case, due to the input type.
  const book = readFragment(bookFragment, data);
};

const bookQuery = graphql(`
  query Book ($id: ID!) {
    book(id: $id) {
      id
      ...BookComponent
    }
  }
`, [bookFragment]);

const getQuery = (data: ResultOf<typeof bookQuery>) => {
  getBook(data?.book);
};
```

##### See

[readFragment](REFERENCE.md#readfragment) for how to read from fragment masks.

#### Call Signature

> **readFragment**\<`Document`\>(`fragment`): readonly ([`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| `null`)[]

Defined in: node\_modules/gql.tada/dist/gql-tada.d.ts:2176

Unmasks a fragment mask for a given fragment document and data.

##### Type Parameters

| Type Parameter |
| ------ |
| `Document` *extends* `FragmentShape` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fragment` | readonly (`null` \| `resultOrFragmentOf`\<`Document`\>)[] | A mask of the fragment, which can be wrapped in arrays, or nullable. |

##### Returns

readonly ([`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| `null`)[]

The unmasked data of the fragment.

##### Remarks

When graphql is used to create a fragment and is spread into another
fragment or query, their result types will only contain a “reference” to the
fragment. This encourages isolation and is known as “fragment masking.”

This means that you must use [readFragment](REFERENCE.md#readfragment) to unmask these fragment masks
and get to the data. This encourages isolation and only using the data you define
a part of your codebase to require.

##### Example

```
import { FragmentOf, graphql, readFragment } from 'gql.tada';

const bookFragment = graphql(`
  fragment BookComponent on Book {
    id
    title
  }
`);

const getBook = (data: FragmentOf<typeof bookFragment> | null) => {
  // Unmasks the fragment and casts to the result type of `bookFragment`
  // This is intersected with `| null` in this case, due to the input type.
  const book = readFragment(bookFragment, data);
};

const bookQuery = graphql(`
  query Book ($id: ID!) {
    book(id: $id) {
      id
      ...BookComponent
    }
  }
`, [bookFragment]);

const getQuery = (data: ResultOf<typeof bookQuery>) => {
  getBook(data?.book);
};
```

##### See

[readFragment](REFERENCE.md#readfragment) for how to read from fragment masks.

#### Call Signature

> **readFragment**\<`Document`\>(`fragment`): readonly ([`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| `undefined`)[]

Defined in: node\_modules/gql.tada/dist/gql-tada.d.ts:2179

Unmasks a fragment mask for a given fragment document and data.

##### Type Parameters

| Type Parameter |
| ------ |
| `Document` *extends* `FragmentShape` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fragment` | readonly (`undefined` \| `resultOrFragmentOf`\<`Document`\>)[] | A mask of the fragment, which can be wrapped in arrays, or nullable. |

##### Returns

readonly ([`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| `undefined`)[]

The unmasked data of the fragment.

##### Remarks

When graphql is used to create a fragment and is spread into another
fragment or query, their result types will only contain a “reference” to the
fragment. This encourages isolation and is known as “fragment masking.”

This means that you must use [readFragment](REFERENCE.md#readfragment) to unmask these fragment masks
and get to the data. This encourages isolation and only using the data you define
a part of your codebase to require.

##### Example

```
import { FragmentOf, graphql, readFragment } from 'gql.tada';

const bookFragment = graphql(`
  fragment BookComponent on Book {
    id
    title
  }
`);

const getBook = (data: FragmentOf<typeof bookFragment> | null) => {
  // Unmasks the fragment and casts to the result type of `bookFragment`
  // This is intersected with `| null` in this case, due to the input type.
  const book = readFragment(bookFragment, data);
};

const bookQuery = graphql(`
  query Book ($id: ID!) {
    book(id: $id) {
      id
      ...BookComponent
    }
  }
`, [bookFragment]);

const getQuery = (data: ResultOf<typeof bookQuery>) => {
  getBook(data?.book);
};
```

##### See

[readFragment](REFERENCE.md#readfragment) for how to read from fragment masks.

#### Call Signature

> **readFragment**\<`Document`\>(`fragment`): readonly ([`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| `null` \| `undefined`)[]

Defined in: node\_modules/gql.tada/dist/gql-tada.d.ts:2182

Unmasks a fragment mask for a given fragment document and data.

##### Type Parameters

| Type Parameter |
| ------ |
| `Document` *extends* `FragmentShape` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fragment` | readonly (`undefined` \| `null` \| `resultOrFragmentOf`\<`Document`\>)[] | A mask of the fragment, which can be wrapped in arrays, or nullable. |

##### Returns

readonly ([`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| `null` \| `undefined`)[]

The unmasked data of the fragment.

##### Remarks

When graphql is used to create a fragment and is spread into another
fragment or query, their result types will only contain a “reference” to the
fragment. This encourages isolation and is known as “fragment masking.”

This means that you must use [readFragment](REFERENCE.md#readfragment) to unmask these fragment masks
and get to the data. This encourages isolation and only using the data you define
a part of your codebase to require.

##### Example

```
import { FragmentOf, graphql, readFragment } from 'gql.tada';

const bookFragment = graphql(`
  fragment BookComponent on Book {
    id
    title
  }
`);

const getBook = (data: FragmentOf<typeof bookFragment> | null) => {
  // Unmasks the fragment and casts to the result type of `bookFragment`
  // This is intersected with `| null` in this case, due to the input type.
  const book = readFragment(bookFragment, data);
};

const bookQuery = graphql(`
  query Book ($id: ID!) {
    book(id: $id) {
      id
      ...BookComponent
    }
  }
`, [bookFragment]);

const getQuery = (data: ResultOf<typeof bookQuery>) => {
  getBook(data?.book);
};
```

##### See

[readFragment](REFERENCE.md#readfragment) for how to read from fragment masks.

#### Call Signature

> **readFragment**\<`Document`\>(`fragment`): readonly ([`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| \{\})[]

Defined in: node\_modules/gql.tada/dist/gql-tada.d.ts:2185

Unmasks a fragment mask for a given fragment document and data.

##### Type Parameters

| Type Parameter |
| ------ |
| `Document` *extends* `FragmentShape` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fragment` | readonly (\{\} \| `resultOrFragmentOf`\<`Document`\>)[] | A mask of the fragment, which can be wrapped in arrays, or nullable. |

##### Returns

readonly ([`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| \{\})[]

The unmasked data of the fragment.

##### Remarks

When graphql is used to create a fragment and is spread into another
fragment or query, their result types will only contain a “reference” to the
fragment. This encourages isolation and is known as “fragment masking.”

This means that you must use [readFragment](REFERENCE.md#readfragment) to unmask these fragment masks
and get to the data. This encourages isolation and only using the data you define
a part of your codebase to require.

##### Example

```
import { FragmentOf, graphql, readFragment } from 'gql.tada';

const bookFragment = graphql(`
  fragment BookComponent on Book {
    id
    title
  }
`);

const getBook = (data: FragmentOf<typeof bookFragment> | null) => {
  // Unmasks the fragment and casts to the result type of `bookFragment`
  // This is intersected with `| null` in this case, due to the input type.
  const book = readFragment(bookFragment, data);
};

const bookQuery = graphql(`
  query Book ($id: ID!) {
    book(id: $id) {
      id
      ...BookComponent
    }
  }
`, [bookFragment]);

const getQuery = (data: ResultOf<typeof bookQuery>) => {
  getBook(data?.book);
};
```

##### See

[readFragment](REFERENCE.md#readfragment) for how to read from fragment masks.

#### Call Signature

> **readFragment**\<`Document`\>(`fragment`): readonly ([`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| `null` \| \{\})[]

Defined in: node\_modules/gql.tada/dist/gql-tada.d.ts:2188

Unmasks a fragment mask for a given fragment document and data.

##### Type Parameters

| Type Parameter |
| ------ |
| `Document` *extends* `FragmentShape` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fragment` | readonly (`null` \| \{\} \| `resultOrFragmentOf`\<`Document`\>)[] | A mask of the fragment, which can be wrapped in arrays, or nullable. |

##### Returns

readonly ([`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| `null` \| \{\})[]

The unmasked data of the fragment.

##### Remarks

When graphql is used to create a fragment and is spread into another
fragment or query, their result types will only contain a “reference” to the
fragment. This encourages isolation and is known as “fragment masking.”

This means that you must use [readFragment](REFERENCE.md#readfragment) to unmask these fragment masks
and get to the data. This encourages isolation and only using the data you define
a part of your codebase to require.

##### Example

```
import { FragmentOf, graphql, readFragment } from 'gql.tada';

const bookFragment = graphql(`
  fragment BookComponent on Book {
    id
    title
  }
`);

const getBook = (data: FragmentOf<typeof bookFragment> | null) => {
  // Unmasks the fragment and casts to the result type of `bookFragment`
  // This is intersected with `| null` in this case, due to the input type.
  const book = readFragment(bookFragment, data);
};

const bookQuery = graphql(`
  query Book ($id: ID!) {
    book(id: $id) {
      id
      ...BookComponent
    }
  }
`, [bookFragment]);

const getQuery = (data: ResultOf<typeof bookQuery>) => {
  getBook(data?.book);
};
```

##### See

[readFragment](REFERENCE.md#readfragment) for how to read from fragment masks.

#### Call Signature

> **readFragment**\<`Document`\>(`fragment`): readonly ([`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| `undefined` \| \{\})[]

Defined in: node\_modules/gql.tada/dist/gql-tada.d.ts:2191

Unmasks a fragment mask for a given fragment document and data.

##### Type Parameters

| Type Parameter |
| ------ |
| `Document` *extends* `FragmentShape` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fragment` | readonly (`undefined` \| \{\} \| `resultOrFragmentOf`\<`Document`\>)[] | A mask of the fragment, which can be wrapped in arrays, or nullable. |

##### Returns

readonly ([`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| `undefined` \| \{\})[]

The unmasked data of the fragment.

##### Remarks

When graphql is used to create a fragment and is spread into another
fragment or query, their result types will only contain a “reference” to the
fragment. This encourages isolation and is known as “fragment masking.”

This means that you must use [readFragment](REFERENCE.md#readfragment) to unmask these fragment masks
and get to the data. This encourages isolation and only using the data you define
a part of your codebase to require.

##### Example

```
import { FragmentOf, graphql, readFragment } from 'gql.tada';

const bookFragment = graphql(`
  fragment BookComponent on Book {
    id
    title
  }
`);

const getBook = (data: FragmentOf<typeof bookFragment> | null) => {
  // Unmasks the fragment and casts to the result type of `bookFragment`
  // This is intersected with `| null` in this case, due to the input type.
  const book = readFragment(bookFragment, data);
};

const bookQuery = graphql(`
  query Book ($id: ID!) {
    book(id: $id) {
      id
      ...BookComponent
    }
  }
`, [bookFragment]);

const getQuery = (data: ResultOf<typeof bookQuery>) => {
  getBook(data?.book);
};
```

##### See

[readFragment](REFERENCE.md#readfragment) for how to read from fragment masks.

#### Call Signature

> **readFragment**\<`Document`\>(`fragment`): readonly ([`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| `null` \| `undefined` \| \{\})[]

Defined in: node\_modules/gql.tada/dist/gql-tada.d.ts:2194

Unmasks a fragment mask for a given fragment document and data.

##### Type Parameters

| Type Parameter |
| ------ |
| `Document` *extends* `FragmentShape` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fragment` | readonly (`undefined` \| `null` \| \{\} \| `resultOrFragmentOf`\<`Document`\>)[] | A mask of the fragment, which can be wrapped in arrays, or nullable. |

##### Returns

readonly ([`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| `null` \| `undefined` \| \{\})[]

The unmasked data of the fragment.

##### Remarks

When graphql is used to create a fragment and is spread into another
fragment or query, their result types will only contain a “reference” to the
fragment. This encourages isolation and is known as “fragment masking.”

This means that you must use [readFragment](REFERENCE.md#readfragment) to unmask these fragment masks
and get to the data. This encourages isolation and only using the data you define
a part of your codebase to require.

##### Example

```
import { FragmentOf, graphql, readFragment } from 'gql.tada';

const bookFragment = graphql(`
  fragment BookComponent on Book {
    id
    title
  }
`);

const getBook = (data: FragmentOf<typeof bookFragment> | null) => {
  // Unmasks the fragment and casts to the result type of `bookFragment`
  // This is intersected with `| null` in this case, due to the input type.
  const book = readFragment(bookFragment, data);
};

const bookQuery = graphql(`
  query Book ($id: ID!) {
    book(id: $id) {
      id
      ...BookComponent
    }
  }
`, [bookFragment]);

const getQuery = (data: ResultOf<typeof bookQuery>) => {
  getBook(data?.book);
};
```

##### See

[readFragment](REFERENCE.md#readfragment) for how to read from fragment masks.

#### Call Signature

> **readFragment**\<`Document`\>(`fragment`): [`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\>

Defined in: node\_modules/gql.tada/dist/gql-tada.d.ts:2197

Unmasks a fragment mask for a given fragment document and data.

##### Type Parameters

| Type Parameter |
| ------ |
| `Document` *extends* `FragmentShape` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fragment` | `resultOrFragmentOf`\<`Document`\> | A mask of the fragment, which can be wrapped in arrays, or nullable. |

##### Returns

[`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\>

The unmasked data of the fragment.

##### Remarks

When graphql is used to create a fragment and is spread into another
fragment or query, their result types will only contain a “reference” to the
fragment. This encourages isolation and is known as “fragment masking.”

This means that you must use [readFragment](REFERENCE.md#readfragment) to unmask these fragment masks
and get to the data. This encourages isolation and only using the data you define
a part of your codebase to require.

##### Example

```
import { FragmentOf, graphql, readFragment } from 'gql.tada';

const bookFragment = graphql(`
  fragment BookComponent on Book {
    id
    title
  }
`);

const getBook = (data: FragmentOf<typeof bookFragment> | null) => {
  // Unmasks the fragment and casts to the result type of `bookFragment`
  // This is intersected with `| null` in this case, due to the input type.
  const book = readFragment(bookFragment, data);
};

const bookQuery = graphql(`
  query Book ($id: ID!) {
    book(id: $id) {
      id
      ...BookComponent
    }
  }
`, [bookFragment]);

const getQuery = (data: ResultOf<typeof bookQuery>) => {
  getBook(data?.book);
};
```

##### See

[readFragment](REFERENCE.md#readfragment) for how to read from fragment masks.

#### Call Signature

> **readFragment**\<`Document`\>(`fragment`): [`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| `null`

Defined in: node\_modules/gql.tada/dist/gql-tada.d.ts:2200

Unmasks a fragment mask for a given fragment document and data.

##### Type Parameters

| Type Parameter |
| ------ |
| `Document` *extends* `FragmentShape` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fragment` | `null` \| `resultOrFragmentOf`\<`Document`\> | A mask of the fragment, which can be wrapped in arrays, or nullable. |

##### Returns

[`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| `null`

The unmasked data of the fragment.

##### Remarks

When graphql is used to create a fragment and is spread into another
fragment or query, their result types will only contain a “reference” to the
fragment. This encourages isolation and is known as “fragment masking.”

This means that you must use [readFragment](REFERENCE.md#readfragment) to unmask these fragment masks
and get to the data. This encourages isolation and only using the data you define
a part of your codebase to require.

##### Example

```
import { FragmentOf, graphql, readFragment } from 'gql.tada';

const bookFragment = graphql(`
  fragment BookComponent on Book {
    id
    title
  }
`);

const getBook = (data: FragmentOf<typeof bookFragment> | null) => {
  // Unmasks the fragment and casts to the result type of `bookFragment`
  // This is intersected with `| null` in this case, due to the input type.
  const book = readFragment(bookFragment, data);
};

const bookQuery = graphql(`
  query Book ($id: ID!) {
    book(id: $id) {
      id
      ...BookComponent
    }
  }
`, [bookFragment]);

const getQuery = (data: ResultOf<typeof bookQuery>) => {
  getBook(data?.book);
};
```

##### See

[readFragment](REFERENCE.md#readfragment) for how to read from fragment masks.

#### Call Signature

> **readFragment**\<`Document`\>(`fragment`): [`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| `undefined`

Defined in: node\_modules/gql.tada/dist/gql-tada.d.ts:2203

Unmasks a fragment mask for a given fragment document and data.

##### Type Parameters

| Type Parameter |
| ------ |
| `Document` *extends* `FragmentShape` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fragment` | `undefined` \| `resultOrFragmentOf`\<`Document`\> | A mask of the fragment, which can be wrapped in arrays, or nullable. |

##### Returns

[`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| `undefined`

The unmasked data of the fragment.

##### Remarks

When graphql is used to create a fragment and is spread into another
fragment or query, their result types will only contain a “reference” to the
fragment. This encourages isolation and is known as “fragment masking.”

This means that you must use [readFragment](REFERENCE.md#readfragment) to unmask these fragment masks
and get to the data. This encourages isolation and only using the data you define
a part of your codebase to require.

##### Example

```
import { FragmentOf, graphql, readFragment } from 'gql.tada';

const bookFragment = graphql(`
  fragment BookComponent on Book {
    id
    title
  }
`);

const getBook = (data: FragmentOf<typeof bookFragment> | null) => {
  // Unmasks the fragment and casts to the result type of `bookFragment`
  // This is intersected with `| null` in this case, due to the input type.
  const book = readFragment(bookFragment, data);
};

const bookQuery = graphql(`
  query Book ($id: ID!) {
    book(id: $id) {
      id
      ...BookComponent
    }
  }
`, [bookFragment]);

const getQuery = (data: ResultOf<typeof bookQuery>) => {
  getBook(data?.book);
};
```

##### See

[readFragment](REFERENCE.md#readfragment) for how to read from fragment masks.

#### Call Signature

> **readFragment**\<`Document`\>(`fragment`): [`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| `null` \| `undefined`

Defined in: node\_modules/gql.tada/dist/gql-tada.d.ts:2206

Unmasks a fragment mask for a given fragment document and data.

##### Type Parameters

| Type Parameter |
| ------ |
| `Document` *extends* `FragmentShape` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fragment` | `undefined` \| `null` \| `resultOrFragmentOf`\<`Document`\> | A mask of the fragment, which can be wrapped in arrays, or nullable. |

##### Returns

[`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| `null` \| `undefined`

The unmasked data of the fragment.

##### Remarks

When graphql is used to create a fragment and is spread into another
fragment or query, their result types will only contain a “reference” to the
fragment. This encourages isolation and is known as “fragment masking.”

This means that you must use [readFragment](REFERENCE.md#readfragment) to unmask these fragment masks
and get to the data. This encourages isolation and only using the data you define
a part of your codebase to require.

##### Example

```
import { FragmentOf, graphql, readFragment } from 'gql.tada';

const bookFragment = graphql(`
  fragment BookComponent on Book {
    id
    title
  }
`);

const getBook = (data: FragmentOf<typeof bookFragment> | null) => {
  // Unmasks the fragment and casts to the result type of `bookFragment`
  // This is intersected with `| null` in this case, due to the input type.
  const book = readFragment(bookFragment, data);
};

const bookQuery = graphql(`
  query Book ($id: ID!) {
    book(id: $id) {
      id
      ...BookComponent
    }
  }
`, [bookFragment]);

const getQuery = (data: ResultOf<typeof bookQuery>) => {
  getBook(data?.book);
};
```

##### See

[readFragment](REFERENCE.md#readfragment) for how to read from fragment masks.

#### Call Signature

> **readFragment**\<`Document`\>(`fragment`): [`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| \{\}

Defined in: node\_modules/gql.tada/dist/gql-tada.d.ts:2209

Unmasks a fragment mask for a given fragment document and data.

##### Type Parameters

| Type Parameter |
| ------ |
| `Document` *extends* `FragmentShape` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fragment` | \{\} \| `resultOrFragmentOf`\<`Document`\> | A mask of the fragment, which can be wrapped in arrays, or nullable. |

##### Returns

[`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| \{\}

The unmasked data of the fragment.

##### Remarks

When graphql is used to create a fragment and is spread into another
fragment or query, their result types will only contain a “reference” to the
fragment. This encourages isolation and is known as “fragment masking.”

This means that you must use [readFragment](REFERENCE.md#readfragment) to unmask these fragment masks
and get to the data. This encourages isolation and only using the data you define
a part of your codebase to require.

##### Example

```
import { FragmentOf, graphql, readFragment } from 'gql.tada';

const bookFragment = graphql(`
  fragment BookComponent on Book {
    id
    title
  }
`);

const getBook = (data: FragmentOf<typeof bookFragment> | null) => {
  // Unmasks the fragment and casts to the result type of `bookFragment`
  // This is intersected with `| null` in this case, due to the input type.
  const book = readFragment(bookFragment, data);
};

const bookQuery = graphql(`
  query Book ($id: ID!) {
    book(id: $id) {
      id
      ...BookComponent
    }
  }
`, [bookFragment]);

const getQuery = (data: ResultOf<typeof bookQuery>) => {
  getBook(data?.book);
};
```

##### See

[readFragment](REFERENCE.md#readfragment) for how to read from fragment masks.

#### Call Signature

> **readFragment**\<`Document`\>(`fragment`): [`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| `null` \| \{\}

Defined in: node\_modules/gql.tada/dist/gql-tada.d.ts:2212

Unmasks a fragment mask for a given fragment document and data.

##### Type Parameters

| Type Parameter |
| ------ |
| `Document` *extends* `FragmentShape` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fragment` | `null` \| \{\} \| `resultOrFragmentOf`\<`Document`\> | A mask of the fragment, which can be wrapped in arrays, or nullable. |

##### Returns

[`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| `null` \| \{\}

The unmasked data of the fragment.

##### Remarks

When graphql is used to create a fragment and is spread into another
fragment or query, their result types will only contain a “reference” to the
fragment. This encourages isolation and is known as “fragment masking.”

This means that you must use [readFragment](REFERENCE.md#readfragment) to unmask these fragment masks
and get to the data. This encourages isolation and only using the data you define
a part of your codebase to require.

##### Example

```
import { FragmentOf, graphql, readFragment } from 'gql.tada';

const bookFragment = graphql(`
  fragment BookComponent on Book {
    id
    title
  }
`);

const getBook = (data: FragmentOf<typeof bookFragment> | null) => {
  // Unmasks the fragment and casts to the result type of `bookFragment`
  // This is intersected with `| null` in this case, due to the input type.
  const book = readFragment(bookFragment, data);
};

const bookQuery = graphql(`
  query Book ($id: ID!) {
    book(id: $id) {
      id
      ...BookComponent
    }
  }
`, [bookFragment]);

const getQuery = (data: ResultOf<typeof bookQuery>) => {
  getBook(data?.book);
};
```

##### See

[readFragment](REFERENCE.md#readfragment) for how to read from fragment masks.

#### Call Signature

> **readFragment**\<`Document`\>(`fragment`): [`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| `undefined` \| \{\}

Defined in: node\_modules/gql.tada/dist/gql-tada.d.ts:2215

Unmasks a fragment mask for a given fragment document and data.

##### Type Parameters

| Type Parameter |
| ------ |
| `Document` *extends* `FragmentShape` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fragment` | `undefined` \| \{\} \| `resultOrFragmentOf`\<`Document`\> | A mask of the fragment, which can be wrapped in arrays, or nullable. |

##### Returns

[`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| `undefined` \| \{\}

The unmasked data of the fragment.

##### Remarks

When graphql is used to create a fragment and is spread into another
fragment or query, their result types will only contain a “reference” to the
fragment. This encourages isolation and is known as “fragment masking.”

This means that you must use [readFragment](REFERENCE.md#readfragment) to unmask these fragment masks
and get to the data. This encourages isolation and only using the data you define
a part of your codebase to require.

##### Example

```
import { FragmentOf, graphql, readFragment } from 'gql.tada';

const bookFragment = graphql(`
  fragment BookComponent on Book {
    id
    title
  }
`);

const getBook = (data: FragmentOf<typeof bookFragment> | null) => {
  // Unmasks the fragment and casts to the result type of `bookFragment`
  // This is intersected with `| null` in this case, due to the input type.
  const book = readFragment(bookFragment, data);
};

const bookQuery = graphql(`
  query Book ($id: ID!) {
    book(id: $id) {
      id
      ...BookComponent
    }
  }
`, [bookFragment]);

const getQuery = (data: ResultOf<typeof bookQuery>) => {
  getBook(data?.book);
};
```

##### See

[readFragment](REFERENCE.md#readfragment) for how to read from fragment masks.

#### Call Signature

> **readFragment**\<`Document`\>(`fragment`): [`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| `null` \| `undefined` \| \{\}

Defined in: node\_modules/gql.tada/dist/gql-tada.d.ts:2218

Unmasks a fragment mask for a given fragment document and data.

##### Type Parameters

| Type Parameter |
| ------ |
| `Document` *extends* `FragmentShape` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fragment` | `undefined` \| `null` \| \{\} \| `resultOrFragmentOf`\<`Document`\> | A mask of the fragment, which can be wrapped in arrays, or nullable. |

##### Returns

[`ResultOf`](REFERENCE.md#resultofdocument)\<`Document`\> \| `null` \| `undefined` \| \{\}

The unmasked data of the fragment.

##### Remarks

When graphql is used to create a fragment and is spread into another
fragment or query, their result types will only contain a “reference” to the
fragment. This encourages isolation and is known as “fragment masking.”

This means that you must use [readFragment](REFERENCE.md#readfragment) to unmask these fragment masks
and get to the data. This encourages isolation and only using the data you define
a part of your codebase to require.

##### Example

```
import { FragmentOf, graphql, readFragment } from 'gql.tada';

const bookFragment = graphql(`
  fragment BookComponent on Book {
    id
    title
  }
`);

const getBook = (data: FragmentOf<typeof bookFragment> | null) => {
  // Unmasks the fragment and casts to the result type of `bookFragment`
  // This is intersected with `| null` in this case, due to the input type.
  const book = readFragment(bookFragment, data);
};

const bookQuery = graphql(`
  query Book ($id: ID!) {
    book(id: $id) {
      id
      ...BookComponent
    }
  }
`, [bookFragment]);

const getQuery = (data: ResultOf<typeof bookQuery>) => {
  getBook(data?.book);
};
```

##### See

[readFragment](REFERENCE.md#readfragment) for how to read from fragment masks.

## Type Aliases

### ClientOptions

> **ClientOptions**: `z.infer`\<*typeof* [`ClientOptionsSchema`](REFERENCE.md#clientoptionsschema)\>

Defined in: [sdk/thegraph/src/thegraph.ts:31](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/thegraph/src/thegraph.ts#L31)

Type definition for client options derived from the ClientOptionsSchema.

***

### FragmentOf\<Document\>

> **FragmentOf**\<`Document`\>: `makeFragmentRef`\<`Document`\>

Defined in: node\_modules/gql.tada/dist/gql-tada.d.ts:2083

Creates a fragment mask for a given fragment document.

#### Type Parameters

| Type Parameter |
| ------ |
| `Document` *extends* `FragmentShape` |

#### Remarks

When graphql is used to create a fragment and is spread into another
fragment or query, their result types will only contain a “reference” to the
fragment. This encourages isolation and is known as “fragment masking.”

While [readFragment](REFERENCE.md#readfragment) is used to unmask these fragment masks, this utility
creates a fragment mask, so you can accept the masked data in the part of your
codebase that defines a fragment.

#### Example

```
import { FragmentOf, graphql, readFragment } from 'gql.tada';

const bookFragment = graphql(`
  fragment BookComponent on Book {
    id
    title
  }
`);

// May be called with any GraphQL data that contains a spread of `bookFragment`
const getBook = (data: FragmentOf<typeof bookFragment>) => {
  // Unmasks the fragment and casts to the result type of `bookFragment`
  const book = readFragment(bookFragment, data);
};
```

#### See

[readFragment](REFERENCE.md#readfragment) for how to read from fragment masks.

***

### RequestConfig

> **RequestConfig**: `ConstructorParameters`\<*typeof* `GraphQLClient`\>\[`1`\]

Defined in: [sdk/thegraph/src/thegraph.ts:10](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/thegraph/src/thegraph.ts#L10)

Options for configuring the URQL client, excluding 'url' and 'exchanges'.

***

### ResultOf\<Document\>

> **ResultOf**\<`Document`\>: `Document` *extends* `DocumentDecoration`\<infer Result, `any`\> ? `Result` : `never`

Defined in: node\_modules/gql.tada/dist/gql-tada.d.ts:2043

A utility type returning the `Result` type of typed GraphQL documents.

#### Type Parameters

| Type Parameter |
| ------ |
| `Document` |

#### Remarks

This accepts a TadaDocumentNode and returns the attached `Result` type
of GraphQL documents.

***

### VariablesOf\<Document\>

> **VariablesOf**\<`Document`\>: `Document` *extends* `DocumentDecoration`\<`any`, infer Variables\> ? `Variables` : `never`

Defined in: node\_modules/gql.tada/dist/gql-tada.d.ts:2050

A utility type returning the `Variables` type of typed GraphQL documents.

#### Type Parameters

| Type Parameter |
| ------ |
| `Document` |

#### Remarks

This accepts a TadaDocumentNode and returns the attached `Variables` type
of GraphQL documents.

## Contributing

We welcome contributions from the community! Please check out our [Contributing](../../.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](LICENSE) file for more details.
