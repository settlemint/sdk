module.exports = {
  client: {
    includes: ["./**/*.graphql", "./*.graphql"],
    service: {
      name: "settlemint-hasura",
      localSchemaFile: "../../.settlemint/hasura/gql/schema.graphql",
    },
  },
};
