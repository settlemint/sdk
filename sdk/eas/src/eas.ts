export * from "./schema.js";

export function createEASClient() {
  return {
    submitAttestation() {
      console.log("[EAS] Submitting attestation");
    },

    parseAttestation() {
      console.log("[EAS] Parsing attestation");
    },

    createSchema() {
      console.log("[EAS] Creating schema");
    },

    getSchema() {
      console.log("[EAS] Getting schema");
    },

    getAttestations() {
      console.log("[EAS] Getting attestations");
    },
  };
}
