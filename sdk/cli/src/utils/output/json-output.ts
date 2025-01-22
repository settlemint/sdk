/**
 * Outputs the given data in JSON format.
 * @param data - The data to output in JSON format.
 */
export function jsonOutput(data: unknown) {
  console.log(JSON.stringify(data, null, 2));
}
