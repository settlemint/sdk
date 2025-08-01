import { sortBy } from "es-toolkit";
import { get, isArray, isEmpty, set } from "es-toolkit/compat";
import type { TadaDocumentNode } from "gql.tada";
import { type ArgumentNode, type DocumentNode, Kind, type SelectionNode, visit } from "graphql";
import type { GraphQLClient, Variables } from "graphql-request";

// Constants for TheGraph limits
const THE_GRAPH_LIMIT = 500;
const FIRST_ARG = "first";
const SKIP_ARG = "skip";
const FETCH_ALL_DIRECTIVE = "fetchAll";

interface ListField {
  path: string[];
  fieldName: string;
  alias?: string;
  hasFirstArg: boolean;
  firstValue?: number;
  skipValue?: number;
  otherArgs: ArgumentNode[];
  selections?: ReadonlyArray<SelectionNode>;
  hasFetchAllDirective?: boolean;
  firstValueIsDefault?: boolean; // Track if first value was defaulted
}

/**
 * Detects and strips @fetchAll directives from a GraphQL document
 *
 * @param {DocumentNode} document - The GraphQL document to process
 * @returns {Object} Processed document and list of fields with @fetchAll
 *
 * @remarks
 * This function:
 * - Identifies fields decorated with @fetchAll directive
 * - Removes the directive from the AST (The Graph doesn't recognize it)
 * - Returns both the cleaned document and a list of fields to auto-paginate
 */
function stripFetchAllDirective(document: DocumentNode): {
  document: DocumentNode;
  fetchAllFields: Set<string>;
} {
  const fetchAllFields = new Set<string>();

  const strippedDocument = visit(document, {
    Field(node) {
      // Check if this field has the @fetchAll directive
      if (node.directives && node.directives.length > 0) {
        const hasFetchAll = node.directives.some((dir) => dir.name.value === FETCH_ALL_DIRECTIVE);

        if (hasFetchAll) {
          const fieldIdentifier = node.alias?.value || node.name.value;
          fetchAllFields.add(fieldIdentifier);

          // Return a new node without the @fetchAll directive
          return {
            ...node,
            directives: node.directives.filter((dir) => dir.name.value !== FETCH_ALL_DIRECTIVE),
          };
        }
      }

      return node;
    },
  });

  return {
    document: strippedDocument,
    fetchAllFields,
  };
}

/**
 * Custom merge function for deep object merging with special handling for lists
 *
 * @param {unknown} target - The target object or value to merge into
 * @param {unknown} source - The source object or value to merge from
 * @returns {unknown} Merged result with preservation of arrays and specific merge logic
 *
 * @remarks
 * Key behaviors:
 * - Preserves existing arrays without merging
 * - Handles null and undefined values
 * - Performs deep merge for nested objects
 * - Prioritizes source values for primitives
 *
 */
function customMerge(target: unknown, source: unknown): unknown {
  if (source == null) return target;
  if (target == null) return source;

  // Preserve existing arrays (paginated data) - don't merge them
  if (isArray(target) || isArray(source)) {
    return target;
  }

  if (typeof target !== "object" || typeof source !== "object") {
    return source;
  }

  // Manually merge objects to ensure arrays are preserved
  const targetObj = target as Record<string, unknown>;
  const sourceObj = source as Record<string, unknown>;
  const result: Record<string, unknown> = { ...targetObj };

  for (const key in sourceObj) {
    if (Object.hasOwn(sourceObj, key)) {
      result[key] = key in result ? customMerge(result[key], sourceObj[key]) : sourceObj[key];
    }
  }

  return result;
}

// Extract all list fields (queries that have pagination arguments or @fetchAll)
function extractListFields(document: DocumentNode, variables?: Variables, fetchAllFields?: Set<string>): ListField[] {
  const fields: ListField[] = [];
  const pathStack: string[] = [];

  visit(document, {
    Field: {
      enter: (node) => {
        const fieldIdentifier = node.alias?.value || node.name.value;
        pathStack.push(fieldIdentifier);

        // Skip meta fields
        if (node.name.value.startsWith("__")) {
          return;
        }

        // Check if this field has pagination arguments (first or skip)
        let hasFirstArg = false;
        let hasSkipArg = false;
        let firstValue: number | undefined;
        let skipValue: number | undefined;
        let firstValueIsDefault = false;
        const otherArgs: ArgumentNode[] = [];

        if (node.arguments) {
          for (const arg of node.arguments) {
            if (arg.name.value === FIRST_ARG) {
              hasFirstArg = true;
              if (arg.value.kind === Kind.INT) {
                firstValue = Number.parseInt(arg.value.value);
              } else if (arg.value.kind === Kind.VARIABLE && variables) {
                const varName = arg.value.name.value;
                const varValue = (variables as Record<string, unknown>)[varName];
                firstValue = typeof varValue === "number" ? varValue : undefined;
                // If variable is defined in query but not passed in input, check if it's a standard pagination variable
                if (firstValue === undefined && varName === "first") {
                  hasFirstArg = true;
                  firstValue = THE_GRAPH_LIMIT; // Default to THE_GRAPH_LIMIT
                  firstValueIsDefault = true; // Mark that this was defaulted
                }
              }
            } else if (arg.name.value === SKIP_ARG) {
              hasSkipArg = true;
              if (arg.value.kind === Kind.INT) {
                skipValue = Number.parseInt(arg.value.value);
              } else if (arg.value.kind === Kind.VARIABLE && variables) {
                const varName = arg.value.name.value;
                const varValue = (variables as Record<string, unknown>)[varName];
                skipValue = typeof varValue === "number" ? varValue : undefined;
                // If variable is defined in query but not passed in input, check if it's a standard pagination variable
                if (skipValue === undefined && varName === "skip") {
                  hasSkipArg = true;
                  skipValue = 0; // Default to 0
                }
              }
            } else {
              otherArgs.push(arg);
            }
          }
        }

        // Check if this field has @fetchAll directive
        const fieldIdentifierForDirective = node.alias?.value || node.name.value;
        const hasFetchAllDirective = fetchAllFields?.has(fieldIdentifierForDirective);

        // Consider it a list field if it has pagination arguments OR @fetchAll
        const hasPaginationArgs = hasFirstArg || hasSkipArg;
        const shouldPaginate = hasPaginationArgs || hasFetchAllDirective;

        if (shouldPaginate) {
          fields.push({
            path: [...pathStack],
            fieldName: node.name.value,
            alias: node.alias?.value,
            hasFirstArg,
            firstValue: hasFetchAllDirective && !hasFirstArg ? THE_GRAPH_LIMIT : firstValue,
            skipValue: hasFetchAllDirective && !hasSkipArg ? 0 : skipValue,
            otherArgs,
            selections: node.selectionSet?.selections,
            hasFetchAllDirective,
            firstValueIsDefault,
          });
        }
      },
      leave: () => {
        pathStack.pop();
      },
    },
  });

  return fields;
}

// Create a query for a single field with specific pagination
function createSingleFieldQuery(
  document: DocumentNode,
  targetField: ListField,
  skip: number,
  first: number,
): DocumentNode {
  const targetPath = [...targetField.path];
  const pathStack: string[] = [];

  return visit(document, {
    Field: {
      enter: (node) => {
        const fieldIdentifier = node.alias?.value || node.name.value;
        pathStack.push(fieldIdentifier);

        // Check if we're on the path to target field
        const onPath = pathStack.every((segment, i) => i >= targetPath.length || segment === targetPath[i]);

        if (!onPath) {
          pathStack.pop();
          return null; // Remove fields not on path
        }

        // If this is our target field, update pagination
        const isTarget =
          pathStack.length === targetPath.length && pathStack.every((segment, i) => segment === targetPath[i]);

        if (isTarget) {
          const newArgs: ArgumentNode[] = [...targetField.otherArgs];

          // Add pagination arguments
          newArgs.push(
            {
              kind: Kind.ARGUMENT,
              name: { kind: Kind.NAME, value: FIRST_ARG },
              value: { kind: Kind.INT, value: first.toString() },
            },
            {
              kind: Kind.ARGUMENT,
              name: { kind: Kind.NAME, value: SKIP_ARG },
              value: { kind: Kind.INT, value: skip.toString() },
            },
          );

          return { ...node, arguments: newArgs };
        }

        return undefined;
      },
      leave: () => {
        pathStack.pop();
      },
    },
  });
}

// Create query without list fields
function createNonListQuery(document: DocumentNode, listFields: ListField[]): DocumentNode | null {
  let hasFields = false;
  const pathStack: string[] = [];

  const filtered = visit(document, {
    Field: {
      enter: (node) => {
        const fieldIdentifier = node.alias?.value || node.name.value;
        pathStack.push(fieldIdentifier);

        // Check if this field is a list field
        const isList = listFields.some(
          (field) =>
            field.path.length === pathStack.length && field.path.every((segment, i) => segment === pathStack[i]),
        );

        if (isList) {
          pathStack.pop();
          return null;
        }

        hasFields = true;
        return undefined;
      },
      leave: () => {
        pathStack.pop();
      },
    },
  });

  return hasFields ? filtered : null;
}

// Filter variables to only include used ones
function filterVariables(variables: Variables | undefined, document: DocumentNode): Variables | undefined {
  if (!variables) return undefined;

  const usedVariables = new Set<string>();

  visit(document, {
    Variable: (node) => {
      usedVariables.add(node.name.value);
    },
  });

  const filtered: Variables = {};
  const varsObj = variables as Record<string, unknown>;
  for (const key of usedVariables) {
    if (key in varsObj) {
      (filtered as Record<string, unknown>)[key] = varsObj[key];
    }
  }

  return isEmpty(filtered) ? undefined : filtered;
}

export function createTheGraphClientWithPagination(theGraphClient: Pick<GraphQLClient, "request">) {
  // Execute pagination for a list field
  async function executeListFieldPagination(
    document: DocumentNode,
    variables: Variables | undefined,
    field: ListField,
  ): Promise<unknown[]> {
    const results: unknown[] = [];
    let currentSkip = field.skipValue || 0;
    let hasMore = true;

    // For fields with pagination arguments, always attempt to fetch data
    // and continue if we get a full page (indicating more data might exist)
    const batchSize = Math.min(field.firstValue || THE_GRAPH_LIMIT, THE_GRAPH_LIMIT);

    while (hasMore) {
      const query = createSingleFieldQuery(document, field, currentSkip, batchSize);
      const existingVariables = filterVariables(variables, query) ?? {};
      const response = await theGraphClient.request(query, {
        ...existingVariables,
        first: batchSize,
        skip: currentSkip,
      });

      // Use array path format for es-toolkit's get function
      const data = get(response, field.path);

      if (isArray(data) && data.length > 0) {
        results.push(...data);

        // Continue fetching if:
        // 1. We have @fetchAll directive (fetch everything)
        // 2. We have an explicit first value > THE_GRAPH_LIMIT and haven't reached it
        // 3. We have a defaulted first value and got a full batch (treating it as "no explicit value")
        // 4. We have no first value and got a full batch
        if (field.hasFetchAllDirective) {
          // With @fetchAll, continue if we got a full batch
          hasMore = data.length === batchSize;
        } else if (field.firstValue && !field.firstValueIsDefault) {
          // With explicit first value (not defaulted), only continue if:
          // - We haven't reached the requested amount yet
          // - We got a full batch (indicating more data might exist)
          hasMore = data.length === batchSize && results.length < field.firstValue;
        } else {
          // When first is not specified or was defaulted (using default batch size),
          // continue if we got a full batch (standard TheGraph pagination behavior)
          hasMore = data.length === batchSize;
        }
      } else {
        hasMore = false;
      }

      currentSkip += batchSize;
    }

    return results;
  }

  return {
    async query<TResult, TVariables extends Variables>(
      document: TadaDocumentNode<TResult, TVariables>,
      variables: Omit<TVariables, "skip" | "first">,
    ): Promise<TResult> {
      // First, detect and strip @fetchAll directives
      const { document: processedDocument, fetchAllFields } = stripFetchAllDirective(document);

      // Extract all list fields (including those with @fetchAll)
      const listFields = extractListFields(processedDocument, variables, fetchAllFields);

      // If no list fields, execute normally
      if (listFields.length === 0) {
        return theGraphClient.request(processedDocument, variables as Variables);
      }

      // Execute paginated queries for all list fields
      const result: Record<string, unknown> = {};

      // Sort fields by depth to handle nested fields correctly
      const sortedFields = sortBy(listFields, [(field) => field.path.length]);

      // Process list fields in parallel for better performance
      const fieldDataPromises = sortedFields.map(async (field) => ({
        field,
        data: await executeListFieldPagination(processedDocument, variables, field),
      }));

      const fieldResults = await Promise.all(fieldDataPromises);

      // Set results in order
      for (const { field, data } of fieldResults) {
        // Use array path format for es-toolkit's set function
        set(result, field.path, data);
      }

      // Execute non-list fields (single entity queries)
      const nonListQuery = createNonListQuery(processedDocument, listFields);

      if (nonListQuery) {
        const nonListResult = await theGraphClient.request(
          nonListQuery,
          filterVariables(variables, nonListQuery) ?? {},
        );

        // Merge results, preserving list data
        const merged = customMerge(result, nonListResult);
        return merged as TResult;
      }

      return result as TResult;
    },
  } as const;
}
