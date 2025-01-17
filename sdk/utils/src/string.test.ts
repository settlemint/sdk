import { describe, expect, test } from "bun:test";
import { camelCaseToWords, replaceUnderscoresAndHyphensWithSpaces } from "./string.js";

describe("camelCaseToWords", () => {
  test("converts simple camelCase to words", () => {
    expect(camelCaseToWords("camelCase")).toBe("Camel Case");
  });

  test("handles multiple uppercase letters", () => {
    expect(camelCaseToWords("thisIsATest")).toBe("This Is A Test");
  });

  test("handles single word", () => {
    expect(camelCaseToWords("word")).toBe("Word");
  });

  test("handles acronyms", () => {
    expect(camelCaseToWords("parseJSON")).toBe("Parse JSON");
  });

  test("handles empty string", () => {
    expect(camelCaseToWords("")).toBe("");
  });

  test("handles already spaced string", () => {
    expect(camelCaseToWords("Already SpacedSecond")).toBe("Already Spaced Second");
  });

  test("keeps multiple capital letters together", () => {
    expect(camelCaseToWords("BesuQBFTBlockchainNetwork")).toBe("Besu QBFT Blockchain Network");
  });
});

describe("replaceUnderscoresAndHyphensWithSpaces", () => {
  test("replaces underscoes and hyphens with spaces", () => {
    expect(replaceUnderscoresAndHyphensWithSpaces("Already_Spaced-Second")).toBe("Already Spaced Second");
  });
});
