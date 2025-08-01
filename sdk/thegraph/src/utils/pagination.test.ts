import { beforeEach, describe, expect, it, mock } from "bun:test";
import { initGraphQLTada } from "gql.tada";
import type { DocumentNode, FieldNode } from "graphql";
import type { GraphQLClient } from "graphql-request";
import { createTheGraphClientWithPagination } from "./pagination.js";

const theGraphGraphql = initGraphQLTada<{
  introspection: {
    __schema: {
      queryType: { name: "Query" };
      types: [
        {
          kind: "OBJECT";
          name: "Query";
          fields: [
            {
              name: "tokens";
              args: [
                {
                  name: "orderBy";
                  type: { kind: "SCALAR"; name: "String"; ofType: null };
                  defaultValue: null;
                },
                {
                  name: "orderDirection";
                  type: { kind: "SCALAR"; name: "String"; ofType: null };
                  defaultValue: null;
                },
                {
                  name: "where";
                  type: { kind: "INPUT_OBJECT"; name: "TokenFilterInput"; ofType: null };
                  defaultValue: null;
                },
                {
                  name: "first";
                  type: { kind: "SCALAR"; name: "Int"; ofType: null };
                  defaultValue: null;
                },
                {
                  name: "skip";
                  type: { kind: "SCALAR"; name: "Int"; ofType: null };
                  defaultValue: null;
                },
              ];
              type: {
                kind: "LIST";
                ofType: {
                  kind: "OBJECT";
                  name: "Token";
                  ofType: null;
                };
              };
              isDeprecated: false;
              deprecationReason: null;
            },
            {
              name: "token";
              args: [
                {
                  name: "name";
                  type: { kind: "SCALAR"; name: "String"; ofType: null };
                  defaultValue: null;
                },
              ];
              type: {
                kind: "OBJECT";
                name: "Token";
                ofType: null;
              };
              isDeprecated: false;
              deprecationReason: null;
            },
          ];
        },
        {
          kind: "OBJECT";
          name: "Token";
          fields: [
            {
              name: "name";
              args: [];
              type: { kind: "SCALAR"; name: "String"; ofType: null };
              isDeprecated: false;
              deprecationReason: null;
            },
            {
              name: "symbol";
              args: [];
              type: { kind: "SCALAR"; name: "String"; ofType: null };
              isDeprecated: false;
              deprecationReason: null;
            },
            {
              name: "holders";
              args: [];
              type: {
                kind: "LIST";
                ofType: {
                  kind: "OBJECT";
                  name: "Holder";
                  ofType: null;
                };
              };
              isDeprecated: false;
              deprecationReason: null;
            },
          ];
        },
        {
          kind: "OBJECT";
          name: "Holder";
          fields: [
            {
              name: "name";
              args: [];
              type: { kind: "SCALAR"; name: "String"; ofType: null };
              isDeprecated: false;
              deprecationReason: null;
            },
          ];
        },
        {
          kind: "INPUT_OBJECT";
          name: "TokenFilterInput";
          inputFields: [
            {
              name: "name";
              type: { kind: "SCALAR"; name: "String"; ofType: null };
              defaultValue: null;
            },
          ];
        },
        {
          kind: "SCALAR";
          name: "String";
        },
        {
          kind: "SCALAR";
          name: "Int";
        },
      ];
      directives: [];
    };
  };
  disableMasking: true;
  scalars: {
    Bytes: string;
    Int8: string;
    BigInt: string;
    BigDecimal: string;
    Timestamp: string;
  };
}>();

interface ResponseData {
  token?: {
    name: string;
    symbol: string;
    holders?: {
      name: string;
    }[];
  };
  tokens?: {
    name: string;
    symbol: string;
    holders?: {
      name: string;
    }[];
  }[];
}

interface RequestVariables {
  name?: string;
  first?: number;
  skip?: number;
  orderBy?: string;
  orderDirection?: string;
  where?: {
    name?: string;
  };
}

const requestMock = mock(async (document: DocumentNode, variables: RequestVariables) => {
  // Check if the "holders" field in the query has "skip" or "first" arguments set
  let shouldFetchHolders = false;
  let holdersFieldHasPagination = false;
  let shouldFetchToken = false;
  let shouldFetchTokens = false;
  const checkHoldersField = (sel: FieldNode) => {
    for (const tokenField of sel?.selectionSet?.selections ?? []) {
      if (tokenField.kind === "Field" && tokenField.name.value === "holders") {
        shouldFetchHolders = true;
        if (Array.isArray(tokenField.arguments)) {
          for (const arg of tokenField.arguments) {
            if (
              (arg.name.value === "skip" && arg.value.kind === "IntValue") ||
              (arg.name.value === "first" && arg.value.kind === "IntValue")
            ) {
              holdersFieldHasPagination = true;
              break;
            }
          }
        }
      }
    }
  };
  if (document && typeof document === "object" && "definitions" in document) {
    for (const def of document.definitions) {
      if (def.kind === "OperationDefinition" && def.selectionSet) {
        for (const sel of def.selectionSet.selections) {
          if (sel.kind === "Field" && sel.name.value === "tokens" && sel.selectionSet) {
            shouldFetchTokens = true;
            checkHoldersField(sel);
          }
          if (sel.kind === "Field" && sel.name.value === "token") {
            shouldFetchToken = true;
            checkHoldersField(sel);
          }
        }
      }
    }
  }
  const { first = DEFAULT_PAGE_SIZE, skip = 0 } = variables;
  const result: ResponseData = {};
  if (shouldFetchTokens) {
    result.tokens = TEST_TOKENS.slice(skip, skip + first).map((token) => {
      if (!shouldFetchHolders) {
        return token;
      }
      return {
        ...token,
        holders: holdersFieldHasPagination
          ? TEST_HOLDERS.slice(skip, skip + first)
          : TEST_HOLDERS.slice(0, DEFAULT_PAGE_SIZE),
      };
    });
  }
  if (shouldFetchToken) {
    const token = TEST_TOKENS.find((token) => token.name === variables.name);
    if (!token) {
      throw new Error(`Token with name ${variables.name} not found`);
    }
    result.token = shouldFetchHolders
      ? {
          ...token,
          holders: holdersFieldHasPagination
            ? TEST_HOLDERS.slice(skip, skip + first)
            : TEST_HOLDERS.slice(0, DEFAULT_PAGE_SIZE),
        }
      : token;
  }
  return Promise.resolve<ResponseData>(result);
});
const client = createTheGraphClientWithPagination({
  request: requestMock as unknown as GraphQLClient["request"],
});

const TEST_HOLDERS = Array.from({ length: 1_000 }, (_, i) => ({
  name: `Holder ${i}`,
}));
const TEST_TOKENS = Array.from({ length: 1_000 }, (_, i) => ({
  name: `Token ${i}`,
  symbol: `TKN${i}`,
}));
const DEFAULT_PAGE_SIZE = 500;

describe("createTheGraphClientWithPagination", () => {
  beforeEach(() => {
    requestMock.mockClear();
  });

  it("should return all tokens if @fetchAll is used", async () => {
    const result = await client.query(
      theGraphGraphql(`
        query {
          tokens @fetchAll {
            name
            symbol
          }
        }`),
      {},
    );
    expect(result.tokens).toHaveLength(TEST_TOKENS.length);
    expect(result.tokens).toEqual(TEST_TOKENS);
    const expectedCalls = Math.ceil(TEST_TOKENS.length / DEFAULT_PAGE_SIZE);
    // If the number of tokens is an exact multiple of the page size, we expect one extra call
    expect(requestMock).toHaveBeenCalledTimes(
      TEST_TOKENS.length % DEFAULT_PAGE_SIZE === 0 ? expectedCalls + 1 : expectedCalls,
    );
  });

  it("should return all token holders if @fetchAll is used", async () => {
    const result = await client.query(
      theGraphGraphql(`
        query($name: String) {
          token(name: $name) {
            name
            symbol
            holders @fetchAll {
              name
            }
          }
        }`),
      {
        name: "Token 100",
      },
    );
    expect(result.token).toEqual({
      name: "Token 100",
      symbol: "TKN100",
      holders: TEST_HOLDERS,
    });
  });

  it("should allow multiple queries in a single request", async () => {
    const result = await client.query(
      theGraphGraphql(`
        query($name: String) {
          token(name: $name) {
            name
            symbol
            holders @fetchAll {
              name
            }
          }
          tokens @fetchAll {
            name
            symbol
          }
        }`),
      {
        name: "Token 100",
      },
    );
    expect(result).toEqual({
      token: {
        name: "Token 100",
        symbol: "TKN100",
        holders: TEST_HOLDERS,
      },
      tokens: TEST_TOKENS,
    });
  });

  it("should return the first page of tokens and holders if @fetchAll is not used", async () => {
    const result = await client.query(
      theGraphGraphql(`
        query {
          tokens {
            name
            symbol
            holders {
              name
            }
          }
        }`),
      {},
    );
    expect(result.tokens).toHaveLength(DEFAULT_PAGE_SIZE);
    expect(result.tokens).toEqual(
      TEST_TOKENS.slice(0, DEFAULT_PAGE_SIZE).map((token) => {
        return {
          ...token,
          holders: TEST_HOLDERS.slice(0, DEFAULT_PAGE_SIZE),
        };
      }),
    );
    expect(requestMock).toHaveBeenCalledTimes(1);
  });

  it("should not allow nesting of @fetchAll fields inside a list", async () => {
    expect(() =>
      client.query(
        theGraphGraphql(`
        query {
          tokens @fetchAll {
            name
            symbol
            holders @fetchAll {
              name
            }
          }
        }`),
        {},
      ),
    ).toThrow("Nesting of @fetchAll directive is not supported: tokens.holders is a child of tokens");

    expect(() =>
      client.query(
        theGraphGraphql(`
        query {
          tokens {
            name
            symbol
            holders @fetchAll {
              name
            }
          }
        }`),
        {},
      ),
    ).toThrow(
      "Response is an array, but expected a single object for field tokens. The @fetchAll directive is not supported inside a query that returns a list of items.",
    );
  });

  it("should preserve existing variables", async () => {
    const result = await client.query(
      theGraphGraphql(`
        query ($orderBy: String, $orderDirection: String, $where: TokenFilterInput)  {
          tokens(orderBy: $orderBy, orderDirection: $orderDirection, where: TokenFilterInput) @fetchAll {
            name
            symbol
            holders {
              name
            }
          }
        }`),
      {
        orderBy: "name",
        orderDirection: "asc",
        where: {
          name: "Token",
        },
      },
    );
    expect(result.tokens).toHaveLength(TEST_TOKENS.length);
    expect(result.tokens).toEqual(
      TEST_TOKENS.map((token) => {
        return {
          ...token,
          holders: TEST_HOLDERS.slice(0, DEFAULT_PAGE_SIZE),
        };
      }),
    );
    expect(requestMock).toHaveBeenNthCalledWith(1, expect.anything(), {
      orderBy: "name",
      orderDirection: "asc",
      where: {
        name: "Token",
      },
      first: DEFAULT_PAGE_SIZE,
      skip: 0,
    });
    expect(requestMock).toHaveBeenNthCalledWith(2, expect.anything(), {
      orderBy: "name",
      orderDirection: "asc",
      where: {
        name: "Token",
      },
      first: DEFAULT_PAGE_SIZE,
      skip: DEFAULT_PAGE_SIZE,
    });
  });
});
