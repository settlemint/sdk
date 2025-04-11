import { maskTokens } from "./mask-tokens.js";

/**
 * Log levels supported by the logger
 */
export type LogLevel = "debug" | "info" | "warn" | "error" | "none";

/**
 * Configuration options for the logger
 * @interface LoggerOptions
 */
export interface LoggerOptions {
  /** The minimum log level to output */
  level?: LogLevel;
  /** The prefix to add to the log message */
  prefix?: string;
}

/**
 * Simple logger interface with basic logging methods
 * @interface Logger
 */
export interface Logger {
  /** Log debug information */
  debug: (message: string, ...args: unknown[]) => void;
  /** Log general information */
  info: (message: string, ...args: unknown[]) => void;
  /** Log warnings */
  warn: (message: string, ...args: unknown[]) => void;
  /** Log errors */
  error: (message: string, ...args: unknown[]) => void;
}

/**
 * Creates a simple logger with configurable log level
 *
 * @param options - Configuration options for the logger
 * @param options.level - The minimum log level to output (default: warn)
 * @param options.prefix - The prefix to add to the log message (default: "")
 * @returns A logger instance with debug, info, warn, and error methods
 *
 * @example
 * import { createLogger } from "@/utils/logging/logger";
 *
 * const logger = createLogger({ level: 'info' });
 *
 * logger.info('User logged in', { userId: '123' });
 * logger.error('Operation failed', new Error('Connection timeout'));
 */
export function createLogger(options: LoggerOptions = {}): Logger {
  const { level = "warn", prefix = "" } = options;

  const logLevels: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
    none: 4,
  };

  const currentLevelValue = logLevels[level];

  const formatArgs = (args: unknown[]): string => {
    if (args.length === 0 || args.every((arg) => arg === undefined || arg === null)) {
      return "";
    }

    const formatted = args
      .map((arg) => {
        if (arg instanceof Error) {
          return `\n${arg.stack || arg.message}`;
        }
        if (typeof arg === "object" && arg !== null) {
          return `\n${JSON.stringify(arg, null, 2)}`;
        }
        return ` ${String(arg)}`;
      })
      .join("");

    return `, args:${formatted}`;
  };

  const shouldLog = (level: LogLevel): boolean => {
    return logLevels[level] >= currentLevelValue;
  };

  return {
    debug: (message: string, ...args: unknown[]) => {
      if (shouldLog("debug")) {
        console.debug(`\x1b[32m${prefix}[DEBUG] ${maskTokens(message)}${maskTokens(formatArgs(args))}\x1b[0m`);
      }
    },
    info: (message: string, ...args: unknown[]) => {
      if (shouldLog("info")) {
        console.info(`\x1b[34m${prefix}[INFO] ${maskTokens(message)}${maskTokens(formatArgs(args))}\x1b[0m`);
      }
    },
    warn: (message: string, ...args: unknown[]) => {
      if (shouldLog("warn")) {
        console.warn(`\x1b[33m${prefix}[WARN] ${maskTokens(message)}${maskTokens(formatArgs(args))}\x1b[0m`);
      }
    },
    error: (message: string, ...args: unknown[]) => {
      if (shouldLog("error")) {
        console.error(`\x1b[31m${prefix}[ERROR] ${maskTokens(message)}${maskTokens(formatArgs(args))}\x1b[0m`);
      }
    },
  };
}

/**
 * Default logger instance with standard configuration
 */
export const logger = createLogger();
