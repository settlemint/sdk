import { magentaBright } from "yoctocolors";
import { shouldPrint } from "./should-print.js";

/**
 * Prints the SettleMint ASCII art logo to the console in magenta color.
 * Used for CLI branding and visual identification.
 *
 * @example
 * import { ascii } from "@settlemint/sdk-utils/terminal";
 *
 * // Prints the SettleMint logo
 * ascii();
 */
export const ascii = (): void => {
  if (!shouldPrint()) {
    return;
  }
  console.log(
    magentaBright(`
  _________       __    __  .__            _____  .__        __
 /   _____/ _____/  |__/  |_|  |   ____   /     \\ |__| _____/  |_
 \\_____  \\_/ __ \\   __\\   __\\  | _/ __ \\ /  \\ /  \\|  |/    \\   __\\
 /        \\  ___/|  |  |  | |  |_\\  ___//    Y    \\  |   |  \\  |
/_________/\\_____>__|  |__| |____/\\_____>____|____/__|___|__/__|
`),
  );
};
