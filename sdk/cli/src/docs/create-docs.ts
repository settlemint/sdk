import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { type Command, type CommandUnknownOpts, Help } from "@commander-js/extra-typings";
import { sdkCliCommand } from "../commands";

const exitOverride = () => {
  console.log("finished");
};
const sdkCli = sdkCliCommand(exitOverride);

export async function createDocs(command: Command) {
  const help = new Help();
  const docsDir = path.join(__dirname, "..", "..", "docs");

  // Create docs directory if it doesn't exist
  await rm(docsDir, { recursive: true, force: true });
  await mkdir(docsDir, { recursive: true });

  // Get help text for command and write to file
  async function writeHelpToFile(command: Command | CommandUnknownOpts, help: Help, parentPath: string[] = []) {
    if (parentPath.length > 5) {
      console.warn(`Skipping ${command.name()} because it's too deep`);
      return;
    }
    const helpText = help.formatHelp(command, help);
    const location = path.join(docsDir, ...parentPath);
    await mkdir(location, { recursive: true });
    const docPath = path.join(location, `${command.name().toLowerCase()}.md`);
    const helpTextWithLinks = addLinksToChildCommands(
      command.name(),
      helpText,
      command.commands.map((c) => c.name()),
    );
    await writeFile(docPath, `${createTitle(parentPath, command.name())}\n\n<pre>${helpTextWithLinks}</pre>`, {
      flag: "a",
    });
    // Process subcommands recursively
    for (const subcommand of command.commands) {
      await writeHelpToFile(subcommand, help, [...parentPath, command.name().toLowerCase()]);
    }
  }

  await writeHelpToFile(command, help, []);
}

function createTitle(parentPath: string[], commandName: string) {
  if (parentPath.length === 0) {
    return `# ${commandName}`;
  }
  return `# ${parentPath
    .map((part) => {
      const levels = parentPath.length - parentPath.indexOf(part);
      const prefix = "../".repeat(levels) || "./";
      return `[${part}](${prefix}${part.toLowerCase()}.md)`;
    })
    .join(" > ")} > ${commandName}`;
}

function addLinksToChildCommands(commandName: string, helpText: string, childCommands: string[]) {
  let updatedText = helpText;
  for (const command of childCommands) {
    // Create regex that matches the command name at the start of a line
    const regex = new RegExp(`^(\\s{2})(${command}[a-zA-Z\\|]+|${command})\\b`, "gm");
    // Replace with link while preserving any leading whitespace
    updatedText = updatedText.replace(
      regex,
      `$1<a href="./${commandName.toLowerCase()}/${command.toLowerCase()}.md">$2</a>`,
    );
  }
  return updatedText;
}

await createDocs(sdkCli).catch((err) => {
  console.error(err);
  process.exit(1);
});
