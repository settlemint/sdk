import { printAsciiArt, printCancel, printIntro, printOutro, printSpinner } from "@/lib/cli-message";
import { loadSettleMintApplicationConfig } from "@settlemint/sdk-config/loader";
import { Command } from "commander";
import { runCli } from "../../lib/run-cli";

const dump = new Command("dump")
  .description("Dump Hasura database")
  .option("-o, --output <file>", "Output file name", "db.sql")
  .option("-s, --schema <schema>", "Schema to dump", "public")
  .option("--inserts", "Include INSERT statements", false)
  .option("--clean-output", "Clean output", true)
  .option("--source <source>", "Source name", "default")
  .action(async ({ output, schema, inserts, cleanOutput, source }) => {
    printAsciiArt();
    printIntro("Dumping the Hasura database");

    const app = await loadSettleMintApplicationConfig();
    if (!app) {
      printCancel("No application configuration found");
      process.exit(1);
    }

    const hasuraUrl = app.hasuraGql;
    if (!hasuraUrl) {
      printCancel("No Hasura URL found");
      process.exit(1);
    }

    const adminSecret = process.env.SETTLEMINT_HASURA_GQL_ADMIN_SECRET;
    if (!adminSecret) {
      printCancel("No Hasura admin secret found");
      process.exit(1);
    }

    const opts = ["-O", "-x", `--schema=${schema}`, ...(inserts ? ["--inserts"] : [])];

    const payload = JSON.stringify({
      opts,
      clean_output: cleanOutput,
      source,
    });

    await printSpinner({
      startMessage: "Dumping the Hasura database",
      stopMessage: `Hasura database dumped to ${output}`,
      task: async () => {
        const curlCommand = [
          "curl",
          "-d",
          payload,
          "-H",
          `x-hasura-admin-secret: ${adminSecret}`,
          `${hasuraUrl}/v1alpha1/pg_dump`,
        ];

        await runCli({
          command: "sh",
          commandOptions: ["-c", `${curlCommand.join(" ")} > ${output}`],
          logFileName: "hasura-dump.log",
          outputToConsole: true,
        });
      },
    });

    printOutro("Database dump completed successfully");
  });

export { dump };
