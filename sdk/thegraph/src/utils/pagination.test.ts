import { beforeEach, describe, expect, it, mock } from "bun:test";
import { initGraphQLTada } from "gql.tada";
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
              args: [];
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
          ];
        },
        {
          kind: "SCALAR";
          name: "String";
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
  tokens: {
    name: string;
    symbol: string;
  }[];
}

interface PaginationVariables {
  first?: number;
  skip?: number;
}

const TEST_TOKENS = Array.from({ length: 1_000 }, (_, i) => ({
  name: `Token ${i}`,
  symbol: `TKN${i}`,
}));
const DEFAULT_PAGE_SIZE = 500;

describe("createTheGraphClientWithPagination", () => {
  const requestMock = mock(async (_document, variables: PaginationVariables) => {
    const { first = DEFAULT_PAGE_SIZE, skip = 0 } = variables;
    return Promise.resolve<ResponseData>({
      tokens: TEST_TOKENS.slice(skip, skip + first),
    });
  });
  const client = createTheGraphClientWithPagination({
    request: requestMock as unknown as GraphQLClient["request"],
  });

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

  it("should return the first page of tokens if @fetchAll is not used", async () => {
    const result = await client.query(
      theGraphGraphql(`
        query {
          tokens {
            name
            symbol
          }
        }`),
      {},
    );
    expect(result.tokens).toHaveLength(DEFAULT_PAGE_SIZE);
    expect(result.tokens).toEqual(TEST_TOKENS.slice(0, DEFAULT_PAGE_SIZE));
    expect(requestMock).toHaveBeenCalledTimes(1);
  });

  it("should preserve existing variables", async () => {});

  it("should have no duplicates in the result due to changes in the data", async () => {});
});
