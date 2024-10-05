import yoctoSpinner from "yocto-spinner";
import { redBright } from "yoctocolors";
import { note } from "./note.js";

interface SpinnerOptions<R> {
  startMessage: string;
  task: () => Promise<R>;
  stopMessage: string;
}

export const spinner = async <R>(options: SpinnerOptions<R>): Promise<R> => {
  const spinner = yoctoSpinner().start(options.startMessage);
  try {
    const result = await options.task();
    spinner.success(options.stopMessage);
    return result;
  } catch (error) {
    spinner.error(redBright(`${options.startMessage} --> Error!`));
    note(redBright(`${(error as Error).message}\n${(error as Error).stack}`));
    process.exit(1);
  }
};
