import type { Option } from "@/cli/lib/cli-message";
import { confirm, input, password, select } from "@inquirer/prompts";

// Define options for coercing text input
type CoerceTextOptions = {
  type: "text" | "password";
  envValue?: string;
  cliParamValue?: string;
  defaultValue?: string;
  configValue?: string;
  validate: (value?: string) => boolean;
  promptMessage: string;
  existingMessage: string;
  invalidMessage: string;
  skipCoerce?: boolean;
};

// Function to coerce text input based on various sources and user interaction
export async function coerceText(options: CoerceTextOptions): Promise<string> {
  const {
    type,
    envValue,
    cliParamValue,
    configValue,
    defaultValue,
    validate,
    promptMessage,
    existingMessage,
    invalidMessage,
    skipCoerce,
  } = options;

  // Check environment and CLI values first
  for (const value of [envValue, cliParamValue]) {
    if (value && validate(value)) {
      return value;
    }
  }

  // Determine the initial value
  const value = envValue ?? cliParamValue ?? configValue ?? defaultValue;

  // If a valid value exists and coercion is not skipped, prompt for confirmation
  if (!skipCoerce && value && validate(value)) {
    const change = await confirm({
      message: type === "password" ? existingMessage : `${existingMessage} (${value})`,
      default: false,
    });

    if (!change) {
      return value;
    }
  }

  // Prompt for input using the appropriate function based on the type
  const promptFunction = type === "password" ? password : input;
  return promptFunction({
    message: promptMessage,
    ...(type === "text" && {
      defaultValue,
      initialValue: value ?? defaultValue,
      placeholder: value ?? defaultValue,
    }),
    validate(input) {
      try {
        return validate(input) ?? invalidMessage;
      } catch {
        return invalidMessage;
      }
    },
  });
}

// Define options for coercing select input
type CoerceSelectParams<Value> = {
  noneOption?: Option<Value>;
  options: Option<Value>[];
  envValue?: Value;
  cliParamValue?: Value;
  configValue?: Value;
  validate: (value?: Value) => boolean;
  promptMessage: string;
  existingMessage: string;
  skipCoerce?: boolean;
};

// Function to coerce select input based on various sources and user interaction
export async function coerceSelect<Value>(params: CoerceSelectParams<Value>): Promise<Value | undefined> {
  const {
    noneOption,
    options,
    envValue,
    cliParamValue,
    configValue,
    validate,
    promptMessage,
    existingMessage,
    skipCoerce,
  } = params;

  // Helper function to check if a value is a valid option
  const isValidOption = (value: Value | undefined) =>
    value !== undefined && validate(value) && options.some((option) => option.value === value);

  // Check environment and CLI values first
  for (const value of [envValue, cliParamValue]) {
    if (isValidOption(value)) {
      return value;
    }
  }

  // Determine the initial value
  const value = envValue ?? cliParamValue ?? configValue;

  // If a valid value exists and coercion is not skipped, prompt for confirmation
  if (!skipCoerce && isValidOption(value)) {
    const change = await confirm({
      message: `${existingMessage} (${
        typeof value === "string"
          ? value
          : value && typeof value === "object"
            ? (value as { name?: string }).name ?? ""
            : ""
      })`,
      default: false,
    });

    if (!change) {
      return value;
    }
  }

  // Prompt for select input
  const selectedValue = await select({
    choices: [...(noneOption ? [noneOption] : []), ...options],
    message: promptMessage,
  });

  // Return undefined if 'none' option is selected, otherwise return the selected value
  return noneOption && selectedValue === noneOption.value ? undefined : (selectedValue as Value);
}
