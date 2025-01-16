export function getVariableName(name: string): string {
  return name
    .split(/[^a-zA-Z0-9]/g)
    .map((word, index) => (index === 0 ? word.charAt(0).toLowerCase() : word.charAt(0).toUpperCase()) + word.slice(1))
    .join("");
}
