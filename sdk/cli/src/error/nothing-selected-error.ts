import { cancel } from "@settlemint/sdk-utils/terminal";

export function nothingSelectedError(type: string) {
  return cancel(`No ${type} selected. Please select a ${type} to continue.`);
}
