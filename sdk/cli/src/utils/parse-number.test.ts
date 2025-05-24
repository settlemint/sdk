/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test } from "bun:test";
import { parseNumber } from "./parse-number.js";

describe("parseNumber", () => {
  test("parses valid integer strings", () => {
    expect(parseNumber("123")).toBe(123);
    expect(parseNumber("0")).toBe(0);
    expect(parseNumber("-42")).toBe(-42);
  });

  test("parses valid decimal strings", () => {
    expect(parseNumber("3.14")).toBe(3.14);
    expect(parseNumber("-2.5")).toBe(-2.5);
    expect(parseNumber("0.0")).toBe(0);
  });

  test("handles whitespace trimming", () => {
    expect(parseNumber("  123  ")).toBe(123);
    expect(parseNumber("\t42\n")).toBe(42);
    expect(parseNumber(" -3.14 ")).toBe(-3.14);
  });

  test("throws error for non-string input", () => {
    // biome-ignore lint/suspicious/noExplicitAny: Testing type validation
    expect(() => parseNumber(123 as any)).toThrow("Value must be a string");
    // biome-ignore lint/suspicious/noExplicitAny: Testing type validation
    expect(() => parseNumber(null as any)).toThrow("Value must be a string");
    // biome-ignore lint/suspicious/noExplicitAny: Testing type validation
    expect(() => parseNumber(undefined as any)).toThrow("Value must be a string");
  });

  test("throws error for empty strings", () => {
    expect(() => parseNumber("")).toThrow("Value cannot be empty");
    expect(() => parseNumber("   ")).toThrow("Value cannot be empty");
    expect(() => parseNumber("\t\n")).toThrow("Value cannot be empty");
  });

  test("throws error for invalid number strings", () => {
    expect(() => parseNumber("abc")).toThrow('"abc" is not a valid number');
    expect(() => parseNumber("12.34.56")).toThrow('"12.34.56" is not a valid number');
    expect(() => parseNumber("not-a-number")).toThrow('"not-a-number" is not a valid number');
  });

  test("throws error for infinity values", () => {
    expect(() => parseNumber("Infinity")).toThrow('"Infinity" is not a finite number');
    expect(() => parseNumber("-Infinity")).toThrow('"-Infinity" is not a finite number');
  });

  test("handles scientific notation", () => {
    expect(parseNumber("1e5")).toBe(100000);
    expect(parseNumber("2.5e-2")).toBe(0.025);
    expect(parseNumber("-3e4")).toBe(-30000);
  });

  test("handles edge cases", () => {
    expect(parseNumber("0")).toBe(0);
    expect(parseNumber("-0")).toBe(-0);
    expect(parseNumber("0.000001")).toBe(0.000001);
  });
});
