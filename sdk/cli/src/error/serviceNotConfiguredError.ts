type ServiceType = "IPFS storage" | "Blockchain node";

function getMessage(type: ServiceType) {
  return `Please connect to your ${type} service first. Use the "settlemint connect" command to do this.`;
}

export class ServiceNotConfiguredError extends Error {
  constructor(type: ServiceType) {
    super(getMessage(type));
  }
}
