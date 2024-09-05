import { select } from "@inquirer/prompts";
import type { Prettify } from "viem";
import yoctoSpinner from "yocto-spinner";
import { greenBright, inverse, magentaBright, redBright } from "yoctocolors";

// ASCII art and color functions remain unchanged
export const printAsciiArt = () =>
  console.log(
    magentaBright(`
  _________       __    __  .__            _____  .__        __
 /   _____/ _____/  |__/  |_|  |  ____    /     \\ |__| _____/  |_
 \\_____  \\_/ __ \\   __\\   __\\  | _/ __ \\ /  \\ /  \\|  |/    \\   __\\
 /        \\  ___/|  |  |  | |  |_\\  ___//    Y    \\  |   |  \\  |
/_________/\\_____>__|  |__| |____/\\_____>____|____/__|___|__/__|
`),
  );

export const printIntro = (msg: string) => {
  console.log("");
  console.log(inverse(magentaBright(msg)));
  console.log("");
};
export const printOutro = (msg: string) => {
  console.log("");
  console.log(inverse(greenBright(msg)));
  console.log("");
};

export const printCancel = (msg: string) => {
  console.log("");
  console.log(inverse(redBright(msg)));
  console.log("");
  process.exit(1);
};

interface SpinnerOptions<R> {
  startMessage: string;
  task: () => Promise<R>;
  stopMessage: string;
}

export const printSpinner = async <R>(options: SpinnerOptions<R>): Promise<R> => {
  const spinner = yoctoSpinner().start(options.startMessage);
  try {
    const result = await options.task();
    spinner.success(options.stopMessage);
    return result;
  } catch (error) {
    spinner.error(redBright(`${options.startMessage} --> Error!`));
    printNote(redBright(`${(error as Error).message}\n${(error as Error).stack}`));
    process.exit(1);
  }
};

type SelectOptions<Value> = Parameters<typeof select<Value | undefined>>[0];
export interface PromtSelectOptions<Value> extends SelectOptions<Value> {
  noneOption?: boolean;
}

export const promptSelect = async <Value>(options: Prettify<PromtSelectOptions<Value>>): Promise<Value | undefined> => {
  if (!options.choices || options.choices.length === 0) {
    printCancel(`${options.message}: no choices provided for selection.`);
  }

  const choices = options.choices.map((choice) =>
    typeof choice === "string" ? { value: choice as Value, name: choice } : choice,
  );

  if (options.noneOption) {
    choices.unshift({ value: undefined, name: "None" });
  }

  return await select({
    ...options,
    choices,
  });
};

export const printNote = (message: string) => {
  console.log("");
  console.log(message);
};
