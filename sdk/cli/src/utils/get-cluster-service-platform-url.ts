import type { ServiceType } from "@/spinners/services.spinner";
import type { Application } from "@settlemint/sdk-js";

export function getClusterServicePlatformUrl<Service extends { id: string }>(
  instance: string,
  application: Application,
  service: Service,
  serviceType: ServiceType,
) {
  return new URL(
    `workspaces/${encodeURIComponent(application.workspace.id)}/applications/${encodeURIComponent(application.id)}/${getUrlPathForService(service, serviceType)}`,
    instance,
  ).toString();
}

function getUrlPathForService<Service extends { id: string }>(service: Service, serviceType: ServiceType) {
  if (serviceType === "blockchain-network") {
    return `networks/${encodeURIComponent(service.id)}/details`;
  }
  if (serviceType === "blockchain-node") {
    return `nodes/${encodeURIComponent(service.id)}/details`;
  }
  if (serviceType === "middleware") {
    return `middlewares/${encodeURIComponent(service.id)}/details`;
  }
  if (serviceType === "integration-tool") {
    return `integration/${encodeURIComponent(service.id)}/details`;
  }
  if (serviceType === "private-key") {
    return `keyvault/${encodeURIComponent(service.id)}/details`;
  }
  if (serviceType === "storage") {
    return `storage/${encodeURIComponent(service.id)}/details`;
  }
  if (serviceType === "insights") {
    return `insights/${encodeURIComponent(service.id)}/details`;
  }
  return "";
}
