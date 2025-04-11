import { afterEach, describe, expect, it, spyOn } from "bun:test";
import { createLogger } from "./logger.js";

describe("logger", () => {
  const infoSpy = spyOn(console, "info");
  const warnSpy = spyOn(console, "warn");
  const errorSpy = spyOn(console, "error");
  const debugSpy = spyOn(console, "debug");

  afterEach(() => {
    infoSpy.mockClear();
    warnSpy.mockClear();
    errorSpy.mockClear();
    debugSpy.mockClear();
  });

  it("should log messages", () => {
    const logger = createLogger({ level: "info" });
    logger.info("test message");

    expect(infoSpy).toHaveBeenCalledWith("\x1b[34m[INFO] test message\x1b[0m");
  });

  it("should not log info if level is warn", () => {
    const logger = createLogger({ level: "warn" });
    logger.warn("test message");

    expect(infoSpy).not.toHaveBeenCalled();
  });

  it("should format arguments", () => {
    const logger = createLogger({ level: "info" });
    logger.info("test message", { key: "value" });

    expect(infoSpy).toHaveBeenCalledWith('\x1b[34m[INFO] test message, args:\n{\n  "key": "value"\n}\x1b[0m');
  });

  it("should add prefix", () => {
    const logger = createLogger({ level: "info", prefix: "[TEST-APP]" });
    logger.info("test message");

    expect(infoSpy).toHaveBeenCalledWith("\x1b[34m[TEST-APP][INFO] test message\x1b[0m");
  });

  it("should mask tokens", () => {
    const logger = createLogger({ level: "info" });
    logger.info("test message with token: sm_pat_1234567890", { token: "sm_pat_1234567890" });

    expect(infoSpy).toHaveBeenCalledWith(
      '\x1b[34m[INFO] test message with token: ***, args:\n{\n  "token": "***"\n}\x1b[0m',
    );
  });

  it("should not log if level is none", () => {
    const logger = createLogger({ level: "none" });
    logger.info("test message");

    expect(infoSpy).not.toHaveBeenCalled();
    expect(debugSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
