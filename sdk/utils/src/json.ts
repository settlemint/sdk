export function tryParseJson<T>(value: string, defaultValue: T | null = null): T | null {
  try {
    const parsed = JSON.parse(value) as T;
    if (parsed === undefined || parsed === null) {
      return defaultValue;
    }
    return parsed;
  } catch (err) {
    // Invalid json
    return defaultValue;
  }
}
