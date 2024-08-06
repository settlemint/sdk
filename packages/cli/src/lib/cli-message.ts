import {
  type ConfirmOptions,
  type PasswordOptions,
  type SelectOptions,
  type TextOptions,
  cancel,
  confirm,
  intro,
  isCancel,
  note,
  outro,
  password,
  select,
  spinner,
  text,
} from "@clack/prompts";
import { greenBright, inverse, magentaBright, redBright } from "yoctocolors";

/**
 * Prints the SettleMint ASCII art logo in magenta color.
 * This function uses console.log to display a stylized ASCII representation of the SettleMint logo.
 */
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

/**
 * Prints an intro message in magenta with inverse style.
 * @param msg - The message to be displayed as intro.
 */
export const printIntro = (msg: string) => intro(inverse(magentaBright(msg)));

/**
 * Prints an outro message in green with inverse style.
 * @param msg - The message to be displayed as outro.
 */
export const printOutro = (msg: string) => outro(inverse(greenBright(msg)));

/**
 * Prints a cancellation message in red with inverse style.
 * @param msg - The message to be displayed for cancellation.
 */
export const printCancel = (msg: string) => cancel(inverse(redBright(msg)));

/**
 * Handles cancellation of prompts.
 * If the result is a cancellation, it prints a cancel message and exits the process.
 * @param result - The result to check for cancellation.
 */
const handleCancellation = (result: unknown) => {
  if (isCancel(result)) {
    // If result is a cancellation, print cancel message and exit
    printCancel("Cancelled");
    process.exit(0);
  }
};

/**
 * Prompts for confirmation and handles cancellation.
 * @param options - The options for the confirmation prompt.
 * @returns A promise that resolves to a boolean representing the user's confirmation.
 */
export const promptConfirm = async (options: ConfirmOptions) => {
  const result = await confirm(options);
  handleCancellation(result);
  return result as boolean;
};

/**
 * Prompts for password input and handles cancellation.
 * @param options - The options for the password prompt.
 * @returns A promise that resolves to a string representing the user's password input.
 */
export const promptPassword = async (options: PasswordOptions) => {
  const result = await password(options);
  handleCancellation(result);
  return result as string;
};

/**
 * Prompts for text input and handles cancellation.
 * @param options - The options for the text prompt.
 * @returns A promise that resolves to a string representing the user's text input.
 */
export const promptText = async (options: TextOptions) => {
  const result = await text(options);
  handleCancellation(result);
  return result as string;
};

/**
 * Displays a spinner during an asynchronous task.
 * @param options - The options for the spinner, including start message, task, and stop message.
 * @returns A promise that resolves to the result of the task.
 */
export const printSpinner = async <R>(options: {
  startMessage: string;
  task: () => Promise<R>;
  stopMessage: string;
}): Promise<R> => {
  const s = spinner();
  s.start(options.startMessage);
  try {
    const result = await options.task();
    s.stop(options.stopMessage);
    return result;
  } catch (error) {
    s.stop(redBright(`${options.startMessage} --> Error!`));
    printNote(`${(error as Error).message}\n${(error as Error).stack}`, redBright("Error"));
    process.exit(1);
  }
};

// Type definition for primitive values that can be used in options
type Primitive = Readonly<string | boolean | number>;

/**
 * Type definition for an option object with conditional label requirement.
 * If the Value type extends Primitive, the label is optional.
 * Otherwise, the label is required.
 */
export type Option<Value> = Value extends Primitive
  ? {
      value: Value;
      label?: string;
      hint?: string;
    }
  : {
      value: Value;
      label: string;
      hint?: string;
    };

/**
 * Prompts for selection from a list of options.
 * @param options - The options for the select prompt, including a possible 'none' option.
 * @returns A promise that resolves to the selected value or undefined.
 */
export const promptSelect = async <Value>(
  options: SelectOptions<Option<Value>[], Value> & { noneOption?: Option<Value> },
): Promise<Value | undefined> => {
  // Return undefined if no options are provided
  if (options.options.length === 0) {
    return undefined;
  }

  // Add 'none' option to the beginning of the options list if provided
  if (options.noneOption) {
    options.options.unshift(options.noneOption);
  }

  const result = await select<Option<Value>[], Value>(options);

  handleCancellation(result);

  return result as Value;
};

/**
 * Prints a note with an optional title.
 * @param message - The message to be displayed in the note.
 * @param title - An optional title for the note.
 */
export const printNote = (message?: string, title?: string) => note(message, title);
