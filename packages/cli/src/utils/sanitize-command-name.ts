export function sanitizeCommandName(name: string): string {
  return name.split(" ").join("-").toLowerCase();
}
