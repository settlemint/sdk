import { loadSchema } from "@graphql-tools/load";
import { UrlLoader } from "@graphql-tools/url-loader";
import type {
  GraphQLArgument,
  GraphQLFieldMap,
  GraphQLNamedType,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLType,
} from "graphql";

/**
 * Creates a promise that rejects after a specified timeout
 * @param ms - Timeout in milliseconds
 * @returns A promise that rejects after the specified timeout
 */
const createTimeoutPromise = (ms: number): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Operation timed out after ${ms}ms`));
    }, ms);
  });
};

/**
 * Fetches and processes a GraphQL schema from a given endpoint
 * @param endpoint - The GraphQL endpoint URL
 * @param accessToken - The access token for authentication
 * @param adminSecret - Optional admin secret for Hasura GraphQL endpoints
 * @param timeoutMs - Optional timeout in milliseconds (defaults to 30000ms/30s)
 * @returns The raw GraphQL schema
 * @throws Error if the schema cannot be fetched or the operation times out
 */
async function fetchGraphQLSchema(
  endpoint: string,
  accessToken: string,
  adminSecret?: string,
  timeoutMs = 30000,
): Promise<GraphQLSchema> {
  const schemaPromise = loadSchema(endpoint, {
    loaders: [new UrlLoader()],
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": accessToken,
      ...(adminSecret ? { "x-hasura-admin-secret": adminSecret } : {}),
    },
    method: "POST",
  });

  // Race between the schema loading and a timeout
  return Promise.race([schemaPromise, createTimeoutPromise(timeoutMs)]);
}

/**
 * Fetches and processes a GraphQL schema from a given endpoint
 * @param endpoint - The GraphQL endpoint URL
 * @param accessToken - The access token for authentication
 * @param adminSecret - Optional admin secret for Hasura GraphQL endpoints
 * @param timeoutMs - Optional timeout in milliseconds (defaults to 30000ms/30s)
 * @returns The processed schema result with human-readable description
 * @throws Error if the schema cannot be fetched or processed or the operation times out
 * @example
 * import { fetchProcessedSchema } from '@/utils/fetch/portal';
 *
 * const result = await fetchProcessedSchema('https://api.example.com/graphql', 'token');
 * console.log(result.schemaDescription); // Human-readable schema description
 * console.log(result.rawSchemaInfo); // Raw schema information
 */
export async function fetchProcessedSchema(
  endpoint: string,
  accessToken: string,
  adminSecret?: string,
  timeoutMs = 30000,
): Promise<SchemaResult> {
  const schema = await fetchGraphQLSchema(endpoint, accessToken, adminSecret, timeoutMs);
  return processSchema(schema);
}

/**
 * Interface representing the extracted schema information
 */
interface SchemaInfo {
  queries: GraphQLFieldMap<unknown, unknown>;
  mutations: GraphQLFieldMap<unknown, unknown>;
  subscriptions: GraphQLFieldMap<unknown, unknown>;
  types: Map<string, GraphQLNamedType>;
}

/**
 * Interface representing the result of fetching a GraphQL schema
 */
interface SchemaResult {
  /** The human-readable schema content */
  schemaDescription: string;
  /** The raw schema information for direct usage */
  rawSchemaInfo: SchemaInfo;
  /** List of query names */
  queryNames: string[];
  /** List of mutation names */
  mutationNames: string[];
}

/**
 * Formats a field for display in the schema description
 * @param name - The field name
 * @param field - The GraphQL field
 * @returns A formatted string representation of the field
 */
const formatField = (name: string, field: { args: readonly GraphQLArgument[]; type: GraphQLType }): string => {
  const args = field.args.length > 0 ? ` (${field.args.map((arg) => `${arg.name}: ${arg.type}`).join(", ")})` : "";
  const returnType = ` → ${field.type}`;
  return `• ${name}${args}${returnType}`;
};

/**
 * Formats a collection of fields for display in the schema description
 * @param fields - The GraphQL field map
 * @returns An array of formatted field strings
 */
const formatFields = (fields: GraphQLFieldMap<unknown, unknown>): string[] => {
  return Object.entries(fields).map(([name, field]) => formatField(name, field));
};

/**
 * Creates a concise description of a GraphQL schema
 * @param schema - The GraphQL schema to process
 * @returns A bullet-point list of types and their inputs
 */
const createSchemaDescription = (schema: GraphQLSchema): string => {
  const parts: string[] = [];

  // Process Query type
  const queryType = schema.getQueryType();
  if (queryType) {
    parts.push(...formatFields(queryType.getFields()), "");
  }

  // Process Mutation type
  const mutationType = schema.getMutationType();
  if (mutationType) {
    parts.push(...formatFields(mutationType.getFields()), "");
  }

  return parts.join("\n").trim();
};

/**
 * Extracts the type name from a GraphQL type
 * @param type - The GraphQL type
 * @returns The type name as a string
 */
const getTypeName = (type: GraphQLType): string => {
  const typeName = type.toString();
  return typeName.replace(/[[\]!]/g, "");
};

/**
 * Extracts operation fields from a GraphQL schema based on the provided type getter
 * @param schema - The GraphQL schema
 * @param getType - Function that returns the operation type from the schema
 * @returns GraphQL field map of operation fields
 */
const extractOperationFields = (
  schema: GraphQLSchema,
  getType: (schema: GraphQLSchema) => GraphQLObjectType<unknown, unknown> | undefined | null,
): GraphQLFieldMap<unknown, unknown> => {
  const type = getType(schema);
  return type ? type.getFields() : {};
};

/**
 * Extracts queries from the GraphQL schema
 * @param schema - The GraphQL schema
 * @returns GraphQL field map of query fields
 */
const extractQueries = (schema: GraphQLSchema): GraphQLFieldMap<unknown, unknown> => {
  return extractOperationFields(schema, (s) => s.getQueryType());
};

/**
 * Extracts mutations from the GraphQL schema
 * @param schema - The GraphQL schema
 * @returns GraphQL field map of mutation fields
 */
const extractMutations = (schema: GraphQLSchema): GraphQLFieldMap<unknown, unknown> => {
  return extractOperationFields(schema, (s) => s.getMutationType());
};

/**
 * Extracts subscriptions from the GraphQL schema
 * @param schema - The GraphQL schema
 * @returns GraphQL field map of subscription fields
 */
const extractSubscriptions = (schema: GraphQLSchema): GraphQLFieldMap<unknown, unknown> => {
  return extractOperationFields(schema, (s) => s.getSubscriptionType());
};

/**
 * Extracts all types from the GraphQL schema
 * @param schema - The GraphQL schema
 * @returns Map of type names to their GraphQL types
 */
const extractTypes = (schema: GraphQLSchema): Map<string, GraphQLNamedType> => {
  const typeMap = schema.getTypeMap();
  const types = new Map<string, GraphQLNamedType>();

  for (const [name, type] of Object.entries(typeMap)) {
    // Skip internal GraphQL types
    if (name.startsWith("__")) {
      continue;
    }
    types.set(name, type);
  }

  return types;
};

/**
 * Extracts all schema information including queries, mutations, subscriptions, and types
 * @param schema - The GraphQL schema
 * @returns Complete schema information
 */
const extractSchemaInfo = (schema: GraphQLSchema): SchemaInfo => {
  return {
    queries: extractQueries(schema),
    mutations: extractMutations(schema),
    subscriptions: extractSubscriptions(schema),
    types: extractTypes(schema),
  };
};

/**
 * Extracts just the names of operations from a field map
 * @param fields - The GraphQL field map
 * @returns Array of operation names
 */
const extractOperationNames = (fields: GraphQLFieldMap<unknown, unknown>): string[] => {
  return Object.keys(fields);
};

/**
 * Processes a GraphQL schema and returns both human-readable and raw versions
 * @param schema - The GraphQL schema to process
 * @returns An object containing the schema description and raw schema info
 * @example
 * import { processSchema } from '@/utils/schema-processor';
 *
 * const result = await processSchema(schema);
 * console.log(result.schemaDescription); // Human-readable schema description
 * console.log(result.rawSchemaInfo); // Raw schema information
 */
export const processSchema = (schema: GraphQLSchema): SchemaResult => {
  const schemaInfo = extractSchemaInfo(schema);
  const schemaDescription = createSchemaDescription(schema);
  const queryNames = extractOperationNames(schemaInfo.queries);
  const mutationNames = extractOperationNames(schemaInfo.mutations);

  return {
    schemaDescription,
    rawSchemaInfo: schemaInfo,
    queryNames,
    mutationNames,
  };
};
