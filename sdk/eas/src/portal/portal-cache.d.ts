/* eslint-disable */
/* prettier-ignore */
import type { TadaDocumentNode } from "gql.tada";

declare module "gql.tada" {
  interface setupCache {
    "\n    mutation DeployEASSchemaRegistry(\n      $from: String!\n      $constructorArguments: DeployContractEASSchemaRegistryInput!\n      $gasLimit: String!\n    ) {\n      DeployContractEASSchemaRegistry(from: $from, constructorArguments: $constructorArguments, gasLimit: $gasLimit) {\n        transactionHash\n      }\n    }": TadaDocumentNode<
      { DeployContractEASSchemaRegistry: { transactionHash: string | null } | null },
      { gasLimit: string; constructorArguments: { forwarder: string }; from: string },
      void
    >;
    "\n    mutation DeployEAS($from: String!, $constructorArguments: DeployContractEASInput!, $gasLimit: String!) {\n      DeployContractEAS(from: $from, constructorArguments: $constructorArguments, gasLimit: $gasLimit) {\n        transactionHash\n      }\n    }": TadaDocumentNode<
      { DeployContractEAS: { transactionHash: string | null } | null },
      { gasLimit: string; constructorArguments: { registry: string; forwarder: string }; from: string },
      void
    >;
  }
}
