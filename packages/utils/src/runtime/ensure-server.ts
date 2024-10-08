import { isBrowser } from "environment";

export function ensureServer(): void {
  if (isBrowser) {
    throw new Error(
      "createServerHasuraClient can only be used on the server as including it in the browser will expose your access token.",
    );
  }
}
