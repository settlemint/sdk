import packageJson from "./package.json" with { type: "json" };

/** @type {Partial<import("typedoc").TypeDocOptions>} */
export default {
  // Output configuration
  outputFileStrategy: "modules",
  cleanOutputDir: false,
  entryFileName: "REFERENCE.md",
  readme: "none",
  exclude: ["**/node_modules/**"],
  gitRevision: `v${packageJson.version}`,

  // Content organization
  groupOrder: ["Variables", "Functions", "*"],
  excludeNotDocumented: true,

  // Formatting options
  parametersFormat: "table",
  interfacePropertiesFormat: "table",
  indexFormat: "table",
  enumMembersFormat: "table",
  typeDeclarationFormat: "table",

  // Display options
  hideBreadcrumbs: true,
  hidePageHeader: true,
  hidePageTitle: true,

  // Plugins
  plugin: ["typedoc-plugin-markdown"],
};
