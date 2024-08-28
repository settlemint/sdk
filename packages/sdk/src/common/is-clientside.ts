export function isClientSide(): boolean {
  return typeof window !== "undefined" && typeof window.document !== "undefined";
}
