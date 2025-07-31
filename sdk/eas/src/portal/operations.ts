import type { PortalClient } from "./portal-client.js";

export const GraphQLOperations = {
  mutations: {
    deploySchemaRegistry: (graphql: PortalClient["graphql"]) =>
      graphql(`
        mutation DeployContractEASSchemaRegistry(
          $from: String!
          $constructorArguments: DeployContractEASSchemaRegistryInput!
          $gasLimit: String!
        ) {
          DeployContractEASSchemaRegistry(from: $from, constructorArguments: $constructorArguments, gasLimit: $gasLimit) {
            transactionHash
          }
        }`),

    deployEAS: (graphql: PortalClient["graphql"]) =>
      graphql(`
        mutation DeployContractEAS($from: String!, $constructorArguments: DeployContractEASInput!, $gasLimit: String!) {
          DeployContractEAS(from: $from, constructorArguments: $constructorArguments, gasLimit: $gasLimit) {
            transactionHash
          }
        }`),

    registerSchema: (graphql: PortalClient["graphql"]) =>
      graphql(`
        mutation EASSchemaRegistryRegister(
          $address: String!
          $from: String!
          $input: EASSchemaRegistryRegisterInput!
          $gasLimit: String!
        ) {
          EASSchemaRegistryRegister(address: $address, from: $from, input: $input, gasLimit: $gasLimit) {
            transactionHash
          }
        }`),

    attest: (graphql: PortalClient["graphql"]) =>
      graphql(`
        mutation EASAttest($address: String!, $from: String!, $input: EASAttestInput!, $gasLimit: String!) {
          EASAttest(address: $address, from: $from, input: $input, gasLimit: $gasLimit) {
            transactionHash
          }
        }`),

    multiAttest: (graphql: PortalClient["graphql"]) =>
      graphql(`
        mutation EASMultiAttest($address: String!, $from: String!, $input: EASMultiAttestInput!, $gasLimit: String!) {
          EASMultiAttest(address: $address, from: $from, input: $input, gasLimit: $gasLimit) {
            transactionHash
          }
        }`),

    revoke: (graphql: PortalClient["graphql"]) =>
      graphql(`
        mutation EASRevoke($address: String!, $from: String!, $input: EASRevokeInput!, $gasLimit: String!) {
          EASRevoke(address: $address, from: $from, input: $input, gasLimit: $gasLimit) {
            transactionHash
          }
        }`),
  },

  queries: {
    getSchema: (graphql: PortalClient["graphql"]) =>
      graphql(`
        query EASSchemaRegistryGetSchema($address: String!, $uid: String!) {
          EASSchemaRegistry(address: $address) {
            getSchema(uid: $uid) {
              uid
              resolver
              revocable
              schema
            }
          }
        }`),

    getAttestation: (graphql: PortalClient["graphql"]) =>
      graphql(`
        query EASGetAttestation($address: String!, $uid: String!) {
          EAS(address: $address) {
            getAttestation(uid: $uid) {
              uid
              schema
              attester
              recipient
              time
              expirationTime
              revocable
              refUID
              data
              revocationTime
            }
          }
        }`),

    isAttestationValid: (graphql: PortalClient["graphql"]) =>
      graphql(`
        query EASIsAttestationValid($address: String!, $uid: String!) {
          EAS(address: $address) {
            isAttestationValid(uid: $uid)
          }
        }`),

    getTimestamp: (graphql: PortalClient["graphql"]) =>
      graphql(`
        query EASGetTimestamp($address: String!, $data: String!) {
          EAS(address: $address) {
            getTimestamp(data: $data)
          }
        }`),
  },
};
