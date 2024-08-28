module.exports = {
  client: {
    includes: ["./**/*.graphql", "./*.graphql"],
    service: {
      name: "settlemint-portal",
      localSchemaFile: "../../.settlemint/portal/gql/schema.graphql",
    },
  },
};
