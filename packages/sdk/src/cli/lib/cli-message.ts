import { select } from "@inquirer/prompts";
import ora from "ora";
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
  const spinner = ora(options.startMessage).start();
  try {
    const result = await options.task();
    spinner.succeed(options.stopMessage);
    return result;
  } catch (error) {
    spinner.fail(redBright(`${options.startMessage} --> Error!`));
    printNote(redBright(`${(error as Error).message}\n${(error as Error).stack}`), redBright("Error"));
    process.exit(1);
  }
};

type Primitive = Readonly<string | boolean | number>;

export type Option<Value> = Value extends Primitive
  ? {
      value: Value;
      name?: string;
      description?: string;
    }
  : {
      value: Value;
      name: string;
      description?: string;
    };

interface SelectOptions<Value> {
  message: string;
  choices: Option<Value>[];
  default?: Value;
  noneOption?: Option<Value>;
}

export const promptSelect = async <Value>(options: SelectOptions<Value>): Promise<Value | undefined> => {
  if (!options.choices || options.choices.length === 0) {
    printCancel("No choices provided for selection.");
  }

  const choices = [...options.choices];

  if (options.noneOption) {
    choices.unshift(options.noneOption);
  }

  return await select({
    ...options,
    choices,
  });
};

export const printNote = (message?: string, title?: string) => {
  if (title) {
    console.log("");
    console.log(title);
    console.log("");
  }
  if (message) {
    console.log(message);
  }
};
