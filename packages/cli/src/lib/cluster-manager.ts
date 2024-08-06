// Type definitions for various services
export type NodeSvc = { rpcUrl: string; name: string; chainId: number; uniqueName: string };
export type GraphSvc = { gqlUrl: string; name: string; uniqueName: string };
export type PortalSvc = { gqlUrl: string; restUrl: string; name: string; uniqueName: string };
export type HasuraSvc = { gqlUrl: string; name: string; adminSecret: string; uniqueName: string };

// Type definition for Application
// Represents an application with its associated services
export type Appl = {
  id: string;
  name: string;
  portals: PortalSvc[]; // List of Portal services
  graphs: GraphSvc[]; // List of Graph services
  hasuras: HasuraSvc[]; // List of Hasura services
  nodes: NodeSvc[]; // List of Node services
};

// Type definition for Workspace
// Represents a workspace containing applications and child workspaces
export type Works = {
  id: string;
  name: string;
  applications: Appl[]; // List of applications in the workspace
  childWorkspaces: Works[]; // List of child workspaces
};

/**
 * Function to fetch services from the instance
 * @param {Object} params - The parameters for the function
 * @param {string} params.instance - The instance URL
 * @param {string} params.pat - The personal access token for authentication
 * @returns {Promise<Works[]>} A promise that resolves to an array of Works
 */
export async function getServices({ instance, pat }: { instance: string; pat: string }): Promise<Works[]> {
  // Fetch services from the instance
  const result = await fetch(`${instance}/cm/sdk/services`, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": pat,
    },
  });

  // If fetch was not successful, return empty array
  if (!result.ok) {
    // Branch: Unsuccessful fetch
    console.warn(`Failed to fetch services. Status: ${result.status}`);
    return [];
  }

  // Branch: Successful fetch
  // Parse and return the fetched services
  const services = await result.json();
  return services as Works[];
}
