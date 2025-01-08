## Variables

### ClientOptionsSchema

> `const` **ClientOptionsSchema**: `ZodDiscriminatedUnion`\<`"runtime"`, \[`ZodObject`\<\{ `accessToken`: `ZodString`; `instance`: `ZodUnion`\<\[`ZodString`, `ZodString`\]\>; `runtime`: `ZodLiteral`\<`"server"`\>; \}, `"strip"`, \{ `accessToken`: `string`; `instance`: `string`; `runtime`: `"server"`; \}, \{ `accessToken`: `string`; `instance`: `string`; `runtime`: `"server"`; \}\>, `ZodObject`\<\{ `runtime`: `ZodLiteral`\<`"browser"`\>; \}, `"strip"`, \{ `runtime`: `"browser"`; \}, \{ `runtime`: `"browser"`; \}\>\]\>

Defined in: [sdk/portal/src/portal.ts:15](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/portal/src/portal.ts#L15)

Schema for validating client options for the Portal client.

## Functions

### createPortalClient()

> **createPortalClient**\<`Setup`\>(`options`, `clientOptions`?): `object`

Defined in: [sdk/portal/src/portal.ts:52](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/portal/src/portal.ts#L52)

Creates a Portal client using URQL

#### Type Parameters

| Type Parameter |
| ------ |
| `Setup` *extends* `AbstractSetupSchema` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | `Omit`\<\{ `accessToken`: `string`; `instance`: `string`; `runtime`: `"server"`; \} \| \{ `runtime`: `"browser"`; \}, `"runtime"`\> & `Record`\<`string`, `unknown`\> | The client options for configuring the Portal client. |
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

Defined in: [sdk/portal/src/portal.ts:29](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/portal/src/portal.ts#L29)

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

Defined in: [sdk/portal/src/portal.ts:10](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/portal/src/portal.ts#L10)

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
