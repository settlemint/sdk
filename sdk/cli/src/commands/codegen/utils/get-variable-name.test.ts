import { describe, expect, test } from "bun:test";
import { getVariableName } from "./get-variable-name";

describe("getVariableName", () => {
  test("converts hyphenated string to camelCase", () => {
    expect(getVariableName("my-variable-name")).toBe("myVariableName");
  });

  test("converts underscore string to camelCase", () => {
    expect(getVariableName("my_variable_name")).toBe("myVariableName");
  });

  test("converts space separated string to camelCase", () => {
    expect(getVariableName("my variable name")).toBe("myVariableName");
  });

  test("handles mixed separators", () => {
    expect(getVariableName("my-variable_name test")).toBe("myVariableNameTest");
  });

  test("preserves numbers", () => {
    expect(getVariableName("test-123-name")).toBe("test123Name");
  });

  test("handles single word", () => {
    expect(getVariableName("test")).toBe("test");
  });

  test("preserves casing inside word", () => {
    expect(getVariableName("myXMLParser")).toBe("myXMLParser");
    expect(getVariableName("get-XMLData")).toBe("getXMLData");
    expect(getVariableName("parse_JSONString")).toBe("parseJSONString");
  });

  test("handles empty string", () => {
    expect(getVariableName("")).toBe("");
  });
});
