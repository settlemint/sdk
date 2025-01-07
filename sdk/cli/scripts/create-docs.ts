import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { type Command, type CommandUnknownOpts, Help } from "@commander-js/extra-typings";
import { sdkCliCommand } from "../src/commands";

const exitOverride = () => {
  console.log("finished");
};
const sdkCli = sdkCliCommand(exitOverride);

const MAX_DEPTH = 2;

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
    const location = join(docsDir, ...parentPath.slice(0, MAX_DEPTH));
    const helpText = escapeHtml(help.formatHelp(command, help));
    await mkdir(location, { recursive: true });
    const useParentFile = parentPath.length > MAX_DEPTH;
    const filename = useParentFile ? parentPath[MAX_DEPTH] : command.name();
    const docPath = join(location, `${filename.toLowerCase()}.md`);
    console.log(`Generating documentation for ${command.name()} at ${docPath}`);
    const helpTextWithLinks = addLinksToChildCommands(
      command.name(),
      helpText,
      command.commands.map((c) => c.name()),
      parentPath.length >= MAX_DEPTH,
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
  if (parentPath.length === 0) {
    return `# ${commandName}`;
  }
  const parentsToShow = useParentFile ? parentPath.slice(2) : parentPath;
  const parent = parentPath[parentPath.length - 1];
  const parents = parentsToShow.map((part, index: number) => {
    if (useParentFile && index > 0) {
      const parent = parentsToShow[index - 1];
      return {
        name: part,
        url: `#${parent.toLowerCase()}-${part.toLowerCase()}`,
      };
    }
    if (useParentFile) {
      return {
        name: part,
        url: "#home",
      };
    }
    const levels = parentPath.length - parentPath.indexOf(part);
    const prefix = "../".repeat(levels) || "./";
    return {
      name: part,
      url: `${prefix}${part.toLowerCase()}.md`,
    };
  });

  if (!useParentFile) {
    return `<h1 id="home">${parents
      .map((parent) => {
        return `<a href="${parent.url}">${escapeHtml(parent.name)}</a>`;
      })
      .join(" > ")} > ${commandName}</h1>`;
  }

  return `<h3 id="${parent.toLowerCase()}-${commandName.toLowerCase()}">${parents
    .map((parent) => {
      return `<a href="${parent.url}">${escapeHtml(parent.name)}</a>`;
    })
    .join(" > ")} > ${commandName}</h3>`;
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
