import spawn, { type Options } from "nano-spawn";

export async function run({
  command,
  args,
  options,
}: {
  command: string;
  args: string[];
  options?: Options;
}): Promise<string> {
  const result = await spawn(command, args, {
    preferLocal: true,
    ...options,
  });

  return result.output;
}
