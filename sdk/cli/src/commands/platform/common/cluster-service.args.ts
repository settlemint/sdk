import { type Command, Option, type OptionValues } from "@commander-js/extra-typings";

export function addClusterServiceArgs<Args extends OptionValues>(cmd: Command<[string], Args>) {
  return addClusterServiceProviderAndRegionsArgs(cmd)
    .addOption(
      new Option("--size <size>", "Network size")
        .choices(["CUSTOM", "LARGE", "MEDIUM", "SMALL"])
        .argParser((value) => value as "CUSTOM" | "LARGE" | "MEDIUM" | "SMALL" | null | undefined),
    )
    .addOption(
      new Option("--type <type>", "Network type")
        .choices(["DEDICATED", "SHARED"])
        .argParser((value) => value as "DEDICATED" | "SHARED" | null | undefined),
    ) as Command<
    [string],
    Args & {
      provider: string;
      region: string;
      size: "CUSTOM" | "LARGE" | "MEDIUM" | "SMALL" | null | undefined;
      type: "DEDICATED" | "SHARED" | null | undefined;
    }
  >;
}

export function addClusterServiceProviderAndRegionsArgs<Args extends OptionValues>(cmd: Command<[string], Args>) {
  return cmd
    .requiredOption("--provider <provider>", "Network provider")
    .requiredOption("--region <region>", "Deployment region") as Command<
    [string],
    Args & {
      provider: string;
      region: string;
    }
  >;
}
