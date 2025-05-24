/**
 * Safely parses a string to a number with proper validation
 * @param value - The string value to parse
 * @returns The parsed number
 * @throws Error if the value cannot be parsed to a valid finite number
 */
export const parseNumber = (value: string): number => {
  if (typeof value !== "string") {
    throw new Error("Value must be a string");
  }

  const trimmed = value.trim();
  if (trimmed === "") {
    throw new Error("Value cannot be empty");
  }

  const parsed = Number(trimmed);

  if (Number.isNaN(parsed)) {
    throw new Error(`"${value}" is not a valid number`);
  }

  if (!Number.isFinite(parsed)) {
    throw new Error(`"${value}" is not a finite number`);
  }

  return parsed;
};
