import { afterEach, describe, expect, it, spyOn } from "bun:test";
import { createLogger } from "./logger.js";

describe("logger", () => {
  const spy = spyOn(console, "info");

  afterEach(() => {
    spy.mockClear();
  });

  it("should log messages", () => {
    const logger = createLogger();
    logger.info("test message");

    expect(spy).toHaveBeenCalledWith("\x1b[34m[INFO] test message\x1b[0m");
  });

  it("should not log info if level is warn", () => {
    const spy = spyOn(console, "info");
    const logger = createLogger({ level: "warn" });
    logger.warn("test message");

    expect(spy).not.toHaveBeenCalled();
  });

  it("should format arguments", () => {
    const logger = createLogger();
    logger.info("test message", { key: "value" });

    expect(spy).toHaveBeenCalledWith('\x1b[34m[INFO] test message\n{\n  "key": "value"\n}\x1b[0m');
  });

  it("should add prefix", () => {
    const logger = createLogger({ prefix: "[TEST-APP]" });
    logger.info("test message");

    expect(spy).toHaveBeenCalledWith("\x1b[34m[TEST-APP][INFO] test message\x1b[0m");
  });

  it("should mask tokens", () => {
    const logger = createLogger();
    logger.info("test message with token: sm_pat_1234567890", { token: "sm_pat_1234567890" });

    expect(spy).toHaveBeenCalledWith('\x1b[34m[INFO] test message with token: ***\n{\n  "token": "***"\n}\x1b[0m');
  });
});
