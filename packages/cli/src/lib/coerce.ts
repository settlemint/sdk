import { type Option, promptConfirm, promptPassword, promptSelect, promptText } from "./cli-message";

/**
 * Coerces text or password input, handling validation and prompts.
 * This function attempts to use existing values, validates them, and prompts for new input if necessary.
 *
 * @param options - Configuration options for the coercion process
 * @returns A Promise that resolves to the coerced string value
 */
export async function coerceText(options: {
  type: "text" | "password";
  envValue?: string;
  cliParamValue?: string;
  defaultValue?: string;
  configValue?: string;
  validate: (value?: string) => boolean;
  promptMessage: string;
  existingMessage: string;
  invalidMessage: string;
}) {
  const {
    configValue,
    defaultValue,
    invalidMessage,
    existingMessage,
    type,
    promptMessage,
    envValue,
    cliParamValue,
    validate,
  } = options;
  let value = envValue || cliParamValue || configValue || defaultValue;

  // Check if existing value is valid
  try {
    if (validate(value)) {
      // Prompt user to change existing valid value
      const change = await promptConfirm({
        message: type === "password" ? existingMessage : `${existingMessage} (${value})`,
        initialValue: false,
      });

      // Return existing value if user doesn't want to change
      if (!change) {
        return value as string;
      }
      // If user wants to change, we'll fall through to the prompt below
    }
    // If validation fails, we'll fall through to the prompt below
  } catch {
    // Continue if value is invalid or throws an error
  }

  // Prompt user for new input
  if (type === "password") {
    // Use password prompt for sensitive information
    value = await promptPassword({
      message: promptMessage,
      validate(value) {
        try {
          if (!validate(value)) {
            return invalidMessage;
          }
          return;
        } catch {
          return invalidMessage;
        }
      },
    });
  } else {
    // Use text prompt for non-sensitive information
    value = await promptText({
      message: promptMessage,
      defaultValue: defaultValue,
      initialValue: value ?? defaultValue,
      placeholder: value ?? defaultValue,
      validate(value) {
        try {
          if (!validate(value)) {
            return invalidMessage;
          }
          return;
        } catch {
          return invalidMessage;
        }
      },
    });
  }

  return value as string;
}

/**
 * Coerces select input, handling validation and prompts.
 * This function attempts to use existing values, validates them, and prompts for selection if necessary.
 *
 * @param params - Configuration parameters for the coercion process
 * @returns A Promise that resolves to the coerced value or undefined if "none" option is selected
 */
export async function coerceSelect<Value>(params: {
  noneOption?: Option<Value>;
  options: Option<Value>[];
  envValue?: Value;
  cliParamValue?: Value;
  configValue?: Value;
  validate: (value?: Value) => boolean;
  promptMessage: string;
  existingMessage: string;
  skipCoerce?: boolean;
}) {
  const {
    skipCoerce,
    configValue,
    options,
    noneOption,
    existingMessage,
    promptMessage,
    envValue,
    cliParamValue,
    validate,
  } = params;

  let value = envValue || cliParamValue || configValue;

  if (!skipCoerce) {
    // Check if existing value is valid
    try {
      if (validate(value)) {
        // Prompt user to change existing valid value
        const change = await promptConfirm({
          message: `${existingMessage} (${
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            typeof value === "string" ? value : value ? (value as any).name : ""
          })`,
          initialValue: false,
        });

        // Return existing value if user doesn't want to change
        if (!change) {
          return value as Value;
        }
        // If user wants to change, we'll fall through to the prompt below
      }
      // If validation fails, we'll fall through to the prompt below
    } catch {
      // Continue if value is invalid or throws an error
    }
  }

  // Prompt user to select new value
  value = await promptSelect({
    options,
    message: promptMessage,
    noneOption,
  });

  // Return undefined if "none" option is selected
  if (noneOption && value === noneOption.value) {
    return undefined;
  }

  return value as Value;
}
