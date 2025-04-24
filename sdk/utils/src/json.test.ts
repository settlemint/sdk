import { describe, expect, test } from "bun:test";
import { extractJsonObject } from "./json.js";

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
