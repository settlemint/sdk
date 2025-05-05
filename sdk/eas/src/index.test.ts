import { describe, expect, test } from "bun:test";
import { createEASClient } from "./index";

describe("EAS Client", () => {
  test("should create an EAS client", () => {
    const eas = createEASClient();
    expect(eas).toBeDefined();
    expect(typeof eas.submitAttestation).toBe("function");
    expect(typeof eas.parseAttestation).toBe("function");
    expect(typeof eas.createSchema).toBe("function");
    expect(typeof eas.getSchema).toBe("function");
    expect(typeof eas.getAttestations).toBe("function");
  });

  test("should execute all functions without errors", () => {
    const eas = createEASClient();
    expect(() => eas.submitAttestation()).not.toThrow();
    expect(() => eas.parseAttestation()).not.toThrow();
    expect(() => eas.createSchema()).not.toThrow();
    expect(() => eas.getSchema()).not.toThrow();
    expect(() => eas.getAttestations()).not.toThrow();
  });
});
