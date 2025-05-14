import { describe, expect, test } from "bun:test";
import { extractJsonObject, makeJsonStringifiable } from "./json.js";

describe("extractJsonObject", () => {
  test("extracts a JSON object from a string", () => {
    const result =
      extractJsonObject(`objc[45989]: Class GNotificationCenterDelegate is implemented in both /Users/janbevers/Projects/sdk/test/contracts-subgraphs/node_modules/canvas/build/Release/libgio-2.0.0.dylib (0x119b20648) and /Users/janbevers/Projects/sdk/test/contracts-subgraphs/node_modules/@img/sharp-libvips-darwin-arm64/lib/libvips-cpp.42.dylib (0x11d8c1a28). This may cause spurious casting failures and mysterious crashes. One of the duplicates must be removed or renamed.
{"solidity":{"version":"0.8.24","settings":{"viaIR":true,"optimizer":{"enabled":true,"runs":10000}}},"networks":{"hardhat":{},"btp":{"url":"","gasPrice":"auto"}},"etherscan":{},"sourcify":{"enabled":true}}`);
    expect(result).toEqual({
      solidity: { version: "0.8.24", settings: { viaIR: true, optimizer: { enabled: true, runs: 10000 } } },
      networks: { hardhat: {}, btp: { url: "", gasPrice: "auto" } },
      etherscan: {},
      sourcify: { enabled: true },
    });
  });
});

describe("makeJsonStringifiable", () => {
  test("converts a value to a JSON stringifiable format", () => {
    const result = makeJsonStringifiable({ amount: BigInt(1000) });
    expect(result).toEqual({ amount: "1000" });
  });
  test("returns the value if it is already JSON stringifiable", () => {
    const result = makeJsonStringifiable({ amount: 1000 });
    expect(result).toEqual({ amount: 1000 });
  });
  test("returns the value if it is undefined", () => {
    const result = makeJsonStringifiable(undefined);
    expect(result).toEqual(undefined);
  });
  test("returns the value if it is null", () => {
    const result = makeJsonStringifiable(null);
    expect(result).toEqual(null);
  });
  test("supports nested objects and arrays", () => {
    const result = makeJsonStringifiable({
      amount: { value: BigInt(1000) },
      items: [{ value: BigInt(1000) }, { value: BigInt(2000) }],
    });
    expect(result).toEqual({
      amount: { value: "1000" },
      items: [{ value: "1000" }, { value: "2000" }],
    });
  });
});
