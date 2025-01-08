import { isBrowser } from "environment";

/**
 * Ensures that code is running on the server and not in a browser environment.
 *
 * @throws {Error} If called from a browser environment
 * @example
 * import { ensureServer } from "@settlemint/sdk-utils";
 *
 * // Will throw if running in browser
 * ensureServer();
 */
export function ensureServer(): void {
  if (isBrowser) {
    throw new Error(
      "This function can only be used on the server as including it in the browser will expose your access token.",
    );
  }
}

/**
 * Ensures that code is running in a browser environment and not on the server.
 *
 * @throws {Error} If called from a server environment
 * @example
 * import { ensureBrowser } from "@settlemint/sdk-utils";
 *
 * // Will throw if running on server
 * ensureBrowser();
 */
export function ensureBrowser(): void {
  if (!isBrowser) {
    throw new Error("This function can only be used on the browser as it is missing the access token.");
  }
}

/**
 * Boolean indicating if code is currently running in a browser environment
 */
export const runsInBrowser = isBrowser;

/**
 * Boolean indicating if code is currently running in a server environment
 */
export const runsOnServer = !isBrowser;
