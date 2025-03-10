import {
  type GraphQLArgument,
  type GraphQLField,
  type GraphQLInputField,
  type GraphQLNamedType,
  type GraphQLType,
  isInputObjectType,
  isObjectType,
} from "graphql";

type SchemaTypes = Record<string, GraphQLNamedType>;

/**
 * Recursively collects all custom types (input and output) used in a GraphQL type
 */
const collectCustomTypes = (
  type: GraphQLType,
  schema: SchemaTypes,
  collectedTypes: Set<string> = new Set(),
): Set<string> => {
  // Remove any [] and ! from the type name
  const typeName = type.toString().replace(/[\[\]!]/g, "");

  // Skip if we've already collected this type or if it's a built-in scalar
  if (collectedTypes.has(typeName) || ["String", "Int", "Float", "Boolean", "ID"].includes(typeName)) {
    return collectedTypes;
  }

  const schemaType = schema[typeName];
  if (!schemaType) {
    return collectedTypes;
  }

  // Add this type to our collection
  collectedTypes.add(typeName);

  // If it's an input object type, collect types from all its fields
  if (isInputObjectType(schemaType)) {
    const fields = schemaType.getFields();
    for (const field of Object.values(fields) as GraphQLInputField[]) {
      collectCustomTypes(field.type, schema, collectedTypes);
    }
  }

  // If it's an object type, collect types from all its fields
  if (isObjectType(schemaType)) {
    const fields = schemaType.getFields();
    for (const field of Object.values(fields) as GraphQLField<unknown, unknown>[]) {
      collectCustomTypes(field.type, schema, collectedTypes);
      // Also collect types from field arguments
      for (const arg of field.args) {
        collectCustomTypes(arg.type, schema, collectedTypes);
      }
    }
  }

  return collectedTypes;
};

/**
 * Generates SDL for a custom type
 */
const generateTypeSDL = (typeName: string, schema: SchemaTypes): string => {
  const type = schema[typeName];
  if (!type) return "";

  if (isInputObjectType(type)) {
    const fields = type.getFields();
    const fieldSDLs = Object.values(fields)
      .map((field: GraphQLInputField) => `  ${field.name}: ${field.type}`)
      .join("\n");
    return `input ${typeName} {\n${fieldSDLs}\n}`;
  }

  if (isObjectType(type)) {
    const fields = type.getFields();
    const fieldSDLs = Object.values(fields)
      .map((field: GraphQLField<unknown, unknown>) => {
        const args =
          field.args.length > 0
            ? `(${field.args.map((arg: GraphQLArgument) => `${arg.name}: ${arg.type}`).join(", ")})`
            : "";
        return `  ${field.name}${args}: ${field.type}`;
      })
      .join("\n");
    return `type ${typeName} {\n${fieldSDLs}\n}`;
  }

  return "";
};

/**
 * Generates full SDL for a GraphQL field including all its types
 */
export const generateFieldSDL = (
  field: GraphQLField<unknown, unknown>,
  fieldName: string,
  schema: SchemaTypes,
): string => {
  // Format the field definition
  const args = field.args.length > 0 ? `(${field.args.map((arg) => `${arg.name}: ${arg.type}`).join(", ")})` : "";
  const returnType = field.type.toString();
  const description = field.description ? `"""${field.description}"""\n` : "";

  // Convert Map to Record for type compatibility if needed
  const typesRecord = schema instanceof Map ? Object.fromEntries(schema) : schema;

  // Collect all custom types used in the field
  const customTypes = new Set<string>();

  // Add types from arguments
  for (const arg of field.args) {
    collectCustomTypes(arg.type, typesRecord, customTypes);
  }

  // Add types from return type
  collectCustomTypes(field.type, typesRecord, customTypes);

  // Generate SDL for the field and all its custom types
  const fieldSDL = `${description}${fieldName}${args}: ${returnType}`;
  const typeSDLs = Array.from(customTypes)
    .map((typeName) => generateTypeSDL(typeName, typesRecord))
    .filter(Boolean)
    .join("\n\n");

  return `# ${fieldName}\n${fieldSDL}\n\n# Types\n${typeSDLs}`;
};
