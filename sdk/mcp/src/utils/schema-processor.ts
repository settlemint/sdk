import { loadSchema } from "@graphql-tools/load";
import { UrlLoader } from "@graphql-tools/url-loader";
import type { GraphQLFieldMap, GraphQLNamedType, GraphQLObjectType, GraphQLSchema, GraphQLType } from "graphql";

/**
 * Fetches and processes a GraphQL schema from a given endpoint
 * @param endpoint - The GraphQL endpoint URL
 * @param accessToken - The access token for authentication
 * @returns The raw GraphQL schema
 * @throws Error if the schema cannot be fetched
 */
async function fetchGraphQLSchema(endpoint: string, accessToken: string, adminSecret?: string): Promise<GraphQLSchema> {
  return loadSchema(endpoint, {
    loaders: [new UrlLoader()],
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": accessToken,
      ...(adminSecret ? { "x-hasura-admin-secret": adminSecret } : {}),
    },
    method: "POST",
  });
}

/**
 * Fetches and processes a GraphQL schema from a given endpoint
 * @param endpoint - The GraphQL endpoint URL
 * @param accessToken - The access token for authentication
 * @returns The processed schema result with human-readable description
 * @throws Error if the schema cannot be fetched or processed
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
): Promise<SchemaResult> {
  const schema = await fetchGraphQLSchema(endpoint, accessToken, adminSecret);
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
 * Creates a concise description of a GraphQL schema
 * @param schema - The GraphQL schema to process
 * @returns A bullet-point list of types and their inputs
 */
const createSchemaDescription = (schema: GraphQLSchema): string => {
  const parts: string[] = [];

  // Process Query type
  const queryType = schema.getQueryType();
  if (queryType) {
    const fields = queryType.getFields();
    for (const [name, field] of Object.entries(fields)) {
      const args = field.args.length > 0 ? ` (${field.args.map((arg) => `${arg.name}: ${arg.type}`).join(", ")})` : "";
      const returnType = ` → ${field.type}`;
      parts.push(`• ${name}${args}${returnType}`);
    }
    parts.push("");
  }

  // Process Mutation type
  const mutationType = schema.getMutationType();
  if (mutationType) {
    const fields = mutationType.getFields();
    for (const [name, field] of Object.entries(fields)) {
      const args = field.args.length > 0 ? ` (${field.args.map((arg) => `${arg.name}: ${arg.type}`).join(", ")})` : "";
      const returnType = ` → ${field.type}`;
      parts.push(`• ${name}${args}${returnType}`);
    }
    parts.push("");
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
 * Processes fields of a GraphQL type
 * @param type - The GraphQL object type
 * @returns GraphQL field map
 */
const processFields = (type: GraphQLObjectType<unknown, unknown>): GraphQLFieldMap<unknown, unknown> => {
  return type.getFields();
};

/**
 * Extracts queries from the GraphQL schema
 * @param schema - The GraphQL schema
 * @returns GraphQL field map of query fields
 */
const extractQueries = (schema: GraphQLSchema): GraphQLFieldMap<unknown, unknown> => {
  const queryType = schema.getQueryType();
  if (!queryType) {
  return processFields(queryType);
};

/**
 * Extracts mutations from the GraphQL schema
 * @param schema - The GraphQL schema
 * @returns GraphQL field map of mutation fields
 */
const extractMutations = (schema: GraphQLSchema): GraphQLFieldMap<unknown, unknown> => {
  const mutationType = schema.getMutationType();
  if (!mutationType) {
  return processFields(mutationType);
};

/**
 * Extracts subscriptions from the GraphQL schema
 * @param schema - The GraphQL schema
 * @returns GraphQL field map of subscription fields
 */
const extractSubscriptions = (schema: GraphQLSchema): GraphQLFieldMap<unknown, unknown> => {
  const subscriptionType = schema.getSubscriptionType();
  if (!subscriptionType) {
  return processFields(subscriptionType);
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
const processSchema = (schema: GraphQLSchema): SchemaResult => {
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
