/**
 * Sets the default values for a cluster service.
 *
 * @param args - The arguments for creating a cluster service.
 * @returns The modified arguments with default values set.
 */
export function setClusterServiceDefaults<
  Args extends {
    size?: "SMALL" | "MEDIUM" | "LARGE" | "CUSTOM" | null | undefined;
    type?: "SHARED" | "DEDICATED" | null | undefined;
  },
>(args: Args): Args {
  return {
    ...args,
    size: args.size ?? "SMALL",
    type: args.type ?? "SHARED",
  };
}
