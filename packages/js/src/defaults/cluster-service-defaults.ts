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
