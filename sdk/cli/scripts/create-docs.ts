import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { type Command, type CommandUnknownOpts, Help } from "@commander-js/extra-typings";
import { sdkCliCommand } from "../src/commands";

const exitOverride = () => {
  console.log("finished");
};
const sdkCli = sdkCliCommand(exitOverride);

export async function createDocs(command: Command) {
  console.log("Starting documentation generation...");
  const help = new Help();
  const docsDir = join(__dirname, "..", "docs");

  // Create docs directory if it doesn't exist
  console.log(`Cleaning and creating docs directory at ${docsDir}`);
  await rm(docsDir, { recursive: true, force: true });
  await mkdir(docsDir, { recursive: true });

  // Get help text for command and write to file
  async function writeHelpToFile(command: Command | CommandUnknownOpts, help: Help, parentPath: string[] = []) {
    if (parentPath.length > 5) {
      console.warn(`Skipping ${command.name()} because it's too deep`);
      return;
    }
    const location = join(docsDir, ...parentPath.slice(0, 2));
    const helpText = escapeHtml(help.formatHelp(command, help));
    await mkdir(location, { recursive: true });
    const useParentFile = parentPath.length > 2;
    const filename = useParentFile ? parentPath[2] : command.name();
    const docPath = join(location, `${filename.toLowerCase()}.md`);
    console.log(`Generating documentation for ${command.name()} at ${docPath}`);
    const helpTextWithLinks = addLinksToChildCommands(
      command.name(),
      helpText,
      command.commands.map((c) => c.name()),
      useParentFile,
    );
    await writeFile(
      docPath,
      `${createTitle(parentPath, command.name(), useParentFile)}\n\n<pre>${helpTextWithLinks}</pre>\n\n`,
      {
        flag: "a",
      },
    );
    // Process subcommands recursively
    for (const subcommand of command.commands) {
      await writeHelpToFile(subcommand, help, [...parentPath, command.name().toLowerCase()]);
    }
  }

  await writeHelpToFile(command, help, []);
  console.log("Documentation generation completed successfully!");
}

function createTitle(parentPath: string[], commandName: string, useParentFile: boolean) {
  const parents = parentPath.map((part) => {
    const levels = parentPath.length - parentPath.indexOf(part);
    const prefix = "../".repeat(levels) || "./";
    return {
      name: part,
      url: `${prefix}${part.toLowerCase()}.md`,
    };
  });
  if (parentPath.length === 0) {
    return `# ${commandName}`;
  }
  if (useParentFile) {
    const parent = parents[2];
    const parentId = parents[parents.length - 1].name.toLowerCase();
    return `<h2 id="${parentId}-${commandName.toLowerCase()}"><a href="${parent.url}">${escapeHtml(parent.name)}</a> > ${escapeHtml(commandName)}</h2>`;
  }
  return `# ${parents
    .map((parent) => {
      return `[${parent.name}](${parent.url})`;
    })
    .join(" > ")} > ${commandName}`;
}

function addLinksToChildCommands(commandName: string, helpText: string, childCommands: string[], onSamePage: boolean) {
  if (childCommands.length === 0) {
    return helpText;
  }
  console.log(`Adding links for ${childCommands.length} child commands in ${commandName}`);
  let updatedText = helpText;
  for (const childCommand of childCommands) {
    // Create regex that matches the command name at the start of a line
    const regex = new RegExp(`^(\\s{2})(${childCommand}[a-zA-Z\\|]+|${childCommand})\\b`, "gm");
    // Replace with link while preserving any leading whitespace
    if (onSamePage) {
      updatedText = updatedText.replace(
        regex,
        `$1<a href="#${commandName.toLowerCase()}-${childCommand.toLowerCase()}">$2</a>`,
      );
    } else {
      updatedText = updatedText.replace(
        regex,
        `$1<a href="./${commandName.toLowerCase()}/${childCommand.toLowerCase()}.md">$2</a>`,
      );
    }
  }
  return updatedText;
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

createDocs(sdkCli).catch((err) => {
  console.error("Error generating documentation:", err);
  process.exit(1);
});
