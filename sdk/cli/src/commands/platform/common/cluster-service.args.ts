import { type Command, Option, type OptionValues } from "@commander-js/extra-typings";

export function addClusterServiceArgs<Args extends OptionValues>(cmd: Command<[string], Args>) {
  return cmd
    .option("--provider <provider>", "Network provider (run `settlemint platform config` to see available providers)")
    .option("--region <region>", "Deployment region (run `settlemint platform config` to see available regions)")
    .addOption(
      new Option("--size <size>", "Network size")
        .choices(["LARGE", "MEDIUM", "SMALL"])
        .argParser((value) => value as "LARGE" | "MEDIUM" | "SMALL" | null | undefined)
        .default("SMALL"),
    )
    .addOption(
      new Option("--type <type>", "Network type")
        .choices(["DEDICATED", "SHARED"])
        .argParser((value) => value as "DEDICATED" | "SHARED" | null | undefined)
        .default("SHARED"),
    ) as Command<
    [string],
    Args & {
      provider: string | undefined;
      region: string | undefined;
      size: "LARGE" | "MEDIUM" | "SMALL" | null | undefined;
      type: "DEDICATED" | "SHARED" | null | undefined;
    }
  >;
}
