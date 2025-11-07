/**
 * Determines whether terminal output should be printed based on environment variables.
 *
 * **Environment Variable Precedence:**
 * 1. `SETTLEMINT_DISABLE_TERMINAL="true"` - Completely disables all terminal output (highest priority)
 * 2. `CLAUDECODE`, `REPL_ID`, or `AGENT` (any truthy value) - Enables quiet mode, suppressing info/debug/status messages
 *
 * **Quiet Mode Behavior:**
 * When quiet mode is active (Claude Code environments), this function returns `false` to suppress
 * informational output. However, warnings and errors are always displayed regardless of quiet mode,
 * as they are handled separately in the `note()` function with level-based filtering.
 *
 * @returns `true` if terminal output should be printed, `false` if suppressed
 */
export function shouldPrint(): boolean {
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
