import type { introspection } from "@/portal/portal-env.d.ts";
import type { createPortalClient } from "@settlemint/sdk-portal";

export type PortalClient = ReturnType<
  typeof createPortalClient<{
    introspection: introspection;
    disableMasking: true;
    scalars: {
      // Change unknown to the type you are using to store metadata
      JSON: unknown;
    };
  }>
>;
