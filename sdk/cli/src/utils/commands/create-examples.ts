export interface CommandExample {
  description: string;
  command: string;
  commandPrefix?: string;
}

export function createExamples(examples: CommandExample[]) {
  return `\nExamples:

${examples
  .map(({ description, command, commandPrefix }) => {
    return `  # ${description}\n  $ ${commandPrefix ?? ""}settlemint ${command}`;
  })
  .join("\n\n")}`;
}
