import { describe, expect, test } from "bun:test";
import { createEASClient } from "./index.js";

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

  test("should execute all functions without errors", async () => {
    const eas = createEASClient();
    await eas.submitAttestation();
    await eas.parseAttestation();
    await eas.createSchema();
    await eas.getSchema();
    await eas.getAttestations();
  });
});
