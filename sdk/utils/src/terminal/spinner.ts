import isInCi from "is-in-ci";
import yoctoSpinner, { type Spinner } from "yocto-spinner";
import { redBright } from "yoctocolors";
import { maskTokens } from "./mask-tokens.js";
import { note } from "./note.js";

/**
 * Error class used to indicate that the spinner operation failed.
 * This error is used to signal that the operation should be aborted.
 */
export class SpinnerError extends Error {
  constructor(
    message: string,
    public readonly originalError: Error,
  ) {
    super(message);
    this.name = "SpinnerError";
  }
}

/**
 * Options for configuring the spinner behavior
 */
export interface SpinnerOptions<R> {
  /** Message to display when spinner starts */
  startMessage: string;
  /** Async task to execute while spinner is active */
  task: (spinner?: Spinner) => Promise<R>;
  /** Message to display when spinner completes successfully */
  stopMessage: string;
}

/**
 * Displays a loading spinner while executing an async task.
 * Shows progress with start/stop messages and handles errors.
 * Spinner is disabled in CI environments.
 *
 * @param options - Configuration options for the spinner
 * @returns The result from the executed task
 * @throws Will exit process with code 1 if task fails
 * @example
 * import { spinner } from "@settlemint/sdk-utils/terminal";
 *
 * // Show spinner during async task
 * const result = await spinner({
 *   startMessage: "Deploying...",
 *   task: async () => {
 *     // Async work here
 *     return "success";
 *   },
 *   stopMessage: "Deployed successfully!"
 * });
 */
export const spinner = async <R>(options: SpinnerOptions<R>): Promise<R> => {
  const handleError = (error: Error) => {
    const errorMessage = maskTokens(error.message);
    note(redBright(`${errorMessage}\n\n${error.stack}`));
    throw new SpinnerError(errorMessage, error);
  };
  if (isInCi) {
    try {
      note(options.startMessage);
      const result = await options.task();
      note(options.stopMessage);
      return result;
    } catch (err) {
      return handleError(err as Error);
    }
  }
  const spinner = yoctoSpinner().start(options.startMessage);
  try {
    const result = await options.task(spinner);
    spinner.success(options.stopMessage);
    // Ensure spinner success message renders before proceeding to avoid
    // terminal output overlap issues with subsequent messages
    await new Promise((resolve) => process.nextTick(resolve));
    return result;
  } catch (err) {
    spinner.error(redBright(`${options.startMessage} --> Error!`));
    return handleError(err as Error);
  }
};
