import { stringify } from "yaml";

/**
 * Outputs the given data in YAML format.
 * @param data - The data to output in YAML format.
 */
export function yamlOutput(data: unknown) {
  console.log(stringify(data));
}
