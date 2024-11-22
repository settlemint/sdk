import { isBrowser } from "environment";

export function ensureServer(): void {
  if (isBrowser) {
    throw new Error(
      "This function can only be used on the server as including it in the browser will expose your access token.",
    );
  }
}

export function ensureBrowser(): void {
  if (!isBrowser) {
    throw new Error("This function can only be used on the browser as it is missing the access token.");
  }
}

export const runsInBrowser = isBrowser;
export const runsOnServer = !isBrowser;
