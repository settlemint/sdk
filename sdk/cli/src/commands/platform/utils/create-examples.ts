export interface CommandExample {
  description: string;
  command: string;
}

export function createExamples(examples: CommandExample[]) {
  return `\nExamples:

${examples
  .map(({ description, command }) => {
    return `  # ${description}\n  $ bunx @settlemint/sdk-cli@latest ${command}`;
  })
  .join("\n\n")}`;
}
