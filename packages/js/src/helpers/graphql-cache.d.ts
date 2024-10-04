/* eslint-disable */
/* prettier-ignore */
import type { TadaDocumentNode, $tada } from 'gql.tada';

declare module 'gql.tada' {
 interface setupCache {
    "\n  query getWorkspacesAndApplications {\n    workspaces {\n      id\n      name\n      applications {\n        id\n        name\n\n      }\n    }\n  }\n":
      TadaDocumentNode<{ workspaces: { id: string; name: string; applications: { id: string; name: string; }[]; }[]; }, {}, void>;
  }
}
