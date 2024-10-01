// Type definitions for various services
type NodeSvc = { rpcUrl: string; name: string; chainId: number; uniqueName: string };
type GraphSvc = { gqlUrl: string; name: string; uniqueName: string };
type PortalSvc = { gqlUrl: string; restUrl: string; name: string; uniqueName: string };
type HasuraSvc = { gqlUrl: string; name: string; adminSecret: string; uniqueName: string };
type UserWalletSvc = { name: string; uniqueName: string };
type IpfsStorageSvc = {
  apiUrl: string;
  pinningUrl: string;
  name: string;
  uniqueName: string;
};

type MinioStorageSvc = {
  s3Url: string;
  accessKey: string;
  secretKey: string;
  name: string;
  uniqueName: string;
};

type CustomDeploymentSvc = {
  id: string;
  name: string;
  port: number;
  uniqueName: string;
  url?: string;
  imagePath: string;
};
// Type definition for Application
// Represents an application with its associated services
type Appl = {
  id: string;
  name: string;
  portals: PortalSvc[]; // List of Portal services
  graphs: GraphSvc[]; // List of Graph services
  hasuras: HasuraSvc[]; // List of Hasura services
  nodes: NodeSvc[]; // List of Node services
  customDeployments: CustomDeploymentSvc[]; // List of Custom Deployment services
  ipfsStorages: IpfsStorageSvc[]; // List of IPFS Storage services
  minioStorages: MinioStorageSvc[]; // List of Minio Storage services
  userWallets: UserWalletSvc[]; // List of User Wallet services
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

export async function updateCustomDeployment({
  instance,
  pat,
  id,
  data,
}: {
  instance: string;
  pat: string;
  id: string;
  data: { imagePath: string; port: number };
}) {
  const result = await fetch(`${instance}/cm/sdk/custom-deployment/${encodeURIComponent(id)}/update-image`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": pat,
    },
    body: JSON.stringify(data),
  });

  if (!result.ok) {
    const errorResponse: { message: string; error: string; statusCode: number } = await result.json();
    throw new Error(`Failed to update custom deployment. ${errorResponse.message}`);
  }

  return (await result.json()) as Promise<CustomDeploymentSvc>;
}
