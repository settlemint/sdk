/**
 * Returns true if the terminal should print, false otherwise.
 * When CLAUDECODE, REPL_ID, or AGENT env vars are set, suppresses info/debug output
 * but warnings and errors will still be displayed.
 * @returns true if the terminal should print, false otherwise.
 */
export function shouldPrint() {
  if (process.env.SETTLEMINT_DISABLE_TERMINAL === "true") {
    return false;
  }
  // In quiet mode (Claude Code), suppress info/debug/status messages
  // Warnings and errors will still be displayed via note() with appropriate levels
  if (process.env.CLAUDECODE || process.env.REPL_ID || process.env.AGENT) {
    return false;
  }
  return true;
}
