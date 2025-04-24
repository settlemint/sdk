/**
 * Returns true if the terminal should print, false otherwise.
 * @returns true if the terminal should print, false otherwise.
 */
export function shouldPrint() {
  return process.env.DISABLE_TERMINAL !== "true";
}
