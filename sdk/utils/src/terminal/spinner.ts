import isInCi from "is-in-ci";
import yoctoSpinner, { type Spinner } from "yocto-spinner";
import { redBright } from "yoctocolors";
import { note } from "./note.js";

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
 * import { spinner } from "@settlemint/sdk-utils";
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
  if (isInCi) {
    return options.task();
  }
  const spinner = yoctoSpinner().start(options.startMessage);
  try {
    const result = await options.task(spinner);
    spinner.success(options.stopMessage);
    return result;
  } catch (error) {
    spinner.error(redBright(`${options.startMessage} --> Error!`));
    note(redBright(`${(error as Error).message}\n${(error as Error).stack}`));
    process.exit(1);
  }
};
