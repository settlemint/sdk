import { describe, expect, test } from "bun:test";
import { ZodError } from "zod";
import { UniqueNameSchema } from "./unique-name.schema.js";

describe("UniqueNameSchema", () => {
  test("should validate valid unique names", () => {
    const validNames = ["kit-demo-workspace-dcfea", "kit-dc58a"];

    for (const validName of validNames) {
      expect(() => UniqueNameSchema.parse(validName)).not.toThrow();
    }
  });

  test("should reject invalid unique names", () => {
    const invalidNames = [
      "My-Project", // uppercase not allowed
      "project_name", // underscore not allowed
      "project.name", // period not allowed
      "project name", // spaces not allowed
      "project@name", // special chars not allowed
      "", // empty string
      "a!b", // exclamation mark not allowed
      "name#1", // hash not allowed
      "name$", // dollar sign not allowed
    ];

    for (const invalidName of invalidNames) {
      expect(() => UniqueNameSchema.parse(invalidName)).toThrow(ZodError);
    }
  });

  test("should reject non-string inputs", () => {
    const invalidInputs = [null, undefined, 123, true, {}, []];

    for (const invalidInput of invalidInputs) {
      expect(() => UniqueNameSchema.parse(invalidInput)).toThrow(ZodError);
    }
  });
});
