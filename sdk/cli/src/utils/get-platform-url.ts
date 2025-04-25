import type { ServiceType } from "@/spinners/services.spinner";
import type { Application, Workspace } from "@settlemint/sdk-js";

export function getClusterServicePlatformUrl<Service extends { id: string }>(
  instance: string,
  application: Application,
  service: Service,
  serviceType: ServiceType,
) {
  return new URL(
    `${getWorkspaceUrlPath(application.workspace)}${getApplicationUrlPath(application)}/${getUrlPathForService(service, serviceType)}`,
    instance,
  ).toString();
}

export function getWorkspaceUrl(instance: string, workspace: Pick<Workspace, "id">) {
  return new URL(getWorkspaceUrlPath(workspace), instance).toString();
}

export function getApplicationUrl(instance: string, application: Application) {
  return new URL(
    `${getWorkspaceUrlPath(application.workspace)}${getApplicationUrlPath(application)}/dashboard`,
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
  if (serviceType === "load-balancer") {
    return `loadbalancers/${encodeURIComponent(service.id)}/details`;
  }
  return "";
}

function getWorkspaceUrlPath(workspace: Pick<Workspace, "id">) {
  return `/workspaces/${encodeURIComponent(workspace.id)}`;
}

function getApplicationUrlPath(application: Pick<Application, "id">) {
  return `/applications/${encodeURIComponent(application.id)}`;
}
