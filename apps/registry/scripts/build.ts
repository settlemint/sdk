import { Glob, file, write } from "bun";
import type { z } from "zod";
import type { registryItemSchema } from "./schema";

const registries = [
  {
    name: "asset-tokenization",
    description: "Asset tokenization",
    files: [
      {
        type: "registry:page",
        path: new Glob("./app/asset-tokenization/**/*"),
        targetFunction: (path: string) => path.replace("app/asset-tokenization", "app"),
      },
      {
        type: "registry:lib",
        path: new Glob("./next.config.*"),
        targetFunction: (path: string) => path.replace("next.config", "next.config"),
      },
    ],
    dependencies: [
      "lucide-react",
      "sonner",
      "@settlemint/sdk-cli",
      "@settlemint/sdk-next",
      "@settlemint/sdk-hasura",
      "@settlemint/sdk-ipfs",
      "@settlemint/sdk-minio",
      "@settlemint/sdk-portal",
      "@settlemint/sdk-thegraph",
      "babel-plugin-react-compiler",
    ],
    registryDependencies: [
      "sheet",
      "navigation-menu",
      "button",
      "badge",
      "collapsible",
      "separator",
      "sidebar",
      "tooltip",
      "https://console-release.settlemint.com/registry/address-avatar.json",
      "https://console-release.settlemint.com/registry/collapsed-breadcrumb.json",
      "https://console-release.settlemint.com/registry/dark-mode.json",
      "https://console-release.settlemint.com/registry/data-table.json",
      "https://console-release.settlemint.com/registry/evm-address.json",
      "https://console-release.settlemint.com/registry/logo.json",
      "https://console-release.settlemint.com/registry/query-client.json",
      "https://console-release.settlemint.com/registry/sidepanel.json",
      "https://console-release.settlemint.com/registry/auth.json",
      "https://console-release.settlemint.com/registry/theming.json",
      "https://console-release.settlemint.com/registry/token-charts.json",
    ],
    tailwind: {},
    cssVars: {},
    meta: {},
    docs: "",
  },
  {
    name: "asset-tokenization-staging",
    description: "Asset tokenization",
    files: [
      {
        type: "registry:page",
        path: new Glob("./app/asset-tokenization/**/*"),
        targetFunction: (path: string) => path.replace("app/asset-tokenization", "app"),
      },
      {
        type: "registry:lib",
        path: new Glob("./next.config.*"),
        targetFunction: (path: string) => path.replace("next.config", "next.config"),
      },
    ],
    dependencies: [
      "lucide-react",
      "sonner",
      "@settlemint/sdk-cli",
      "@settlemint/sdk-next",
      "@settlemint/sdk-hasura",
      "@settlemint/sdk-ipfs",
      "@settlemint/sdk-minio",
      "@settlemint/sdk-portal",
      "@settlemint/sdk-thegraph",
      "babel-plugin-react-compiler",
    ],
    registryDependencies: [
      "sheet",
      "navigation-menu",
      "button",
      "badge",
      "collapsible",
      "separator",
      "sidebar",
      "tooltip",
      "https://settlemint.github.io/sdk/address-avatar.json",
      "https://settlemint.github.io/sdk/collapsed-breadcrumb.json",
      "https://settlemint.github.io/sdk/dark-mode.json",
      "https://settlemint.github.io/sdk/data-table.json",
      "https://settlemint.github.io/sdk/evm-address.json",
      "https://settlemint.github.io/sdk/form.json",
      "https://settlemint.github.io/sdk/input-numeric.json",
      "https://settlemint.github.io/sdk/logo.json",
      "https://settlemint.github.io/sdk/query-client.json",
      "https://settlemint.github.io/sdk/sidepanel.json",
      "https://settlemint.github.io/sdk/token-charts.json",
      "https://settlemint.github.io/sdk/auth.json",
      "https://settlemint.github.io/sdk/theming.json",
    ],
    tailwind: {},
    cssVars: {},
    meta: {},
    docs: "",
  },
  {
    name: "collapsed-breadcrumb",
    description: "Collapsed breadcrumb",
    files: [
      {
        type: "registry:ui",
        path: new Glob("./components/ui/collapsed-breadcrumb/**/*"),
        targetFunction: (path: string) =>
          path.replace("components/ui/collapsed-breadcrumb", "components/ui/collapsed-breadcrumb"),
      },
    ],
    dependencies: [],
    registryDependencies: ["breadcrumb", "button", "popover"],
    tailwind: {},
    cssVars: {},
    meta: {},
    docs: "",
  },
  {
    name: "dark-mode",
    description: "Dark mode",
    files: [
      {
        type: "registry:ui",
        path: new Glob("./components/ui/dark-mode/**/*"),
        targetFunction: (path: string) => path.replace("components/ui/dark-mode", "components/ui/dark-mode"),
      },
    ],
    dependencies: ["lucide-react", "next-themes"],
    registryDependencies: ["button", "dropdown-menu", "skeleton"],
    tailwind: {},
    cssVars: {},
    meta: {},
    docs: "",
  },
  {
    name: "address-avatar",
    description: "Address avatar",
    files: [
      {
        type: "registry:ui",
        path: new Glob("./components/ui/address-avatar/**/*"),
        targetFunction: (path: string) => path.replace("components/ui/address-avatar", "components/ui/address-avatar"),
      },
    ],
    dependencies: ["react-awesome-gravatar", "viem", "react-jazzicon"],
    registryDependencies: ["avatar", "skeleton"],
    tailwind: {},
    cssVars: {},
    meta: {},
    docs: "",
  },
  {
    name: "query-client",
    description: "Query client",
    files: [
      {
        type: "registry:ui",
        path: new Glob("./components/ui/query-client/**/*"),
        targetFunction: (path: string) => path.replace("components/ui/query-client", "components/ui/query-client"),
      },
    ],
    dependencies: [
      "@tanstack/react-query",
      "@tanstack/query-sync-storage-persister",
      "@tanstack/react-query-next-experimental",
      "@tanstack/react-query-persist-client",
      "@tanstack/react-query-devtools",
      "@tanstack/eslint-plugin-query",
    ],
    registryDependencies: [],
    tailwind: {},
    cssVars: {},
    meta: {},
    docs: "",
  },
  {
    name: "data-table",
    description: "Data table",
    files: [
      {
        type: "registry:ui",
        path: new Glob("./components/ui/data-table/**/*"),
        targetFunction: (path: string) => path.replace("components/ui/data-table", "components/ui/data-table"),
      },
    ],
    dependencies: ["@tanstack/react-table", "lucide-react"],
    registryDependencies: ["table", "select", "button", "input"],
    tailwind: {},
    cssVars: {},
    meta: {},
    docs: "",
  },
  {
    name: "evm-address",
    description: "EVM address",
    files: [
      {
        type: "registry:ui",
        path: new Glob("./components/ui/evm-address/**/*"),
        targetFunction: (path: string) => path.replace("components/ui/evm-address", "components/ui/evm-address"),
      },
      {
        type: "registry:lib",
        path: new Glob("./lib/hex.ts"),
        targetFunction: (path: string) => path.replace("lib/hex", "lib/hex"),
      },
      {
        type: "registry:lib",
        path: new Glob("./lib/number.ts"),
        targetFunction: (path: string) => path.replace("lib/number", "lib/number"),
      },
    ],
    dependencies: ["@settlemint/sdk-cli"],
    registryDependencies: ["hover-card"],
    tailwind: {},
    cssVars: {},
    meta: {},
    docs: "",
  },
  {
    name: "form",
    description: "Multistep Form",
    files: [
      {
        type: "registry:ui",
        path: new Glob("./components/ui/form/**/*"),
        targetFunction: (path: string) => path.replace("components/ui/form", "components/ui/form"),
      },
    ],
    dependencies: ["nuqs", "react-dropzone", "usehooks-ts", "sonner"],
    registryDependencies: ["textarea", "button", "input", "sheet"],
    tailwind: {},
    cssVars: {},
    meta: {},
    docs: "",
  },
  {
    name: "input-numeric",
    description: "Numeric input",
    files: [
      {
        type: "registry:ui",
        path: new Glob("./components/ui/input-numeric/**/*"),
        targetFunction: (path: string) => path.replace("components/ui/input-numeric", "components/ui/input-numeric"),
      },
    ],
    dependencies: ["react-hook-form"],
    registryDependencies: ["input"],
    tailwind: {},
    cssVars: {},
    meta: {},
    docs: "",
  },
  {
    name: "sidepanel",
    description: "Sidepanel",
    files: [
      {
        type: "registry:ui",
        path: new Glob("./components/ui/sidepanel/**/*"),
        targetFunction: (path: string) => path.replace("components/ui/sidepanel", "components/ui/sidepanel"),
      },
    ],
    dependencies: [],
    registryDependencies: ["sheet"],
    tailwind: {},
    cssVars: {},
    meta: {},
    docs: "",
  },
  {
    name: "auth",
    description: "Authentication",
    files: [
      {
        type: "registry:page",
        path: new Glob("./app/auth/**/*"),
        targetFunction: (path: string) => path.replace("app/auth", "app/auth"),
      },
      {
        type: "registry:page",
        path: new Glob("./app/api/auth/**/*"),
        targetFunction: (path: string) => path.replace("app/api/auth", "app/api/auth"),
      },
      {
        type: "registry:lib",
        path: new Glob("./lib/safe-action.ts"),
        targetFunction: (path: string) => path.replace("lib/safe-action", "lib/safe-action"),
      },
      {
        type: "registry:lib",
        path: new Glob("./lib/auth*.ts"),
        targetFunction: (path: string) => path.replace("lib/auth", "lib/auth"),
      },
      {
        type: "registry:lib",
        path: new Glob("./middleware.ts"),
        targetFunction: (path: string) => path.replace("middleware", "middleware"),
      },
      {
        type: "registry:lib",
        path: new Glob("./public/placeholders/**/*"),
        targetFunction: (path: string) => path.replace("public/placeholders", "public/placeholders"),
      },
    ],
    dependencies: [
      "next-safe-action",
      "next-auth@beta",
      "bcryptjs",
      "zod",
      "@hookform/resolvers",
      "@next-safe-action/adapter-react-hook-form",
      "zod-form-data",
      "lucide-react",
      "@types/bcryptjs",
      "@settlemint/sdk-cli",
      "path-to-regexp",
    ],
    registryDependencies: ["button", "form", "input", "card"],
    tailwind: {},
    cssVars: {},
    meta: {},
    docs: "",
  },
  {
    name: "theming",
    description: "Theming",
    files: [
      {
        type: "registry:lib",
        path: new Glob("./lib/fonts.ts"),
        targetFunction: (path: string) => path.replace("lib/fonts", "lib/fonts"),
      },
      {
        type: "registry:lib",
        path: new Glob("./lib/site-config.ts"),
        targetFunction: (path: string) => path.replace("lib/site-config", "lib/site-config"),
      },
      {
        type: "registry:page",
        path: new Glob("./app/globals.css"),
        targetFunction: (path: string) => path.replace("app/globals", "app/globals"),
      },
      {
        type: "registry:page",
        path: new Glob("./app/layout.tsx"),
        targetFunction: (path: string) => path.replace("app/layout", "app/layout"),
      },
      {
        type: "registry:lib",
        path: new Glob("./tailwind.config.ts"),
        targetFunction: (path: string) => path.replace("tailwind.config", "tailwind.config"),
      },
    ],
    dependencies: [],
    registryDependencies: [],
    tailwind: {},
    cssVars: {},
    meta: {},
    docs: "",
  },
  {
    name: "logo",
    description: "Logo",
    files: [
      {
        type: "registry:lib",
        path: new Glob("./public/logos/**/*"),
        targetFunction: (path: string) => path.replace("public/logos", "public/logos"),
      },
      {
        type: "registry:ui",
        path: new Glob("./components/ui/logo/**/*"),
        targetFunction: (path: string) => path.replace("components/ui/logo", "components/ui/logo"),
      },
    ],
    dependencies: [],
    registryDependencies: [],
    tailwind: {},
    cssVars: {},
    meta: {},
    docs: "",
  },
  {
    name: "token-charts",
    description: "Token charts",
    files: [
      {
        type: "registry:ui",
        path: new Glob("./components/ui/token-charts/**/*"),
        targetFunction: (path: string) => path.replace("components/ui/token-charts", "components/ui/token-charts"),
      },
    ],
    dependencies: ["date-fns"],
    registryDependencies: ["chart"],
    tailwind: {},
    cssVars: {},
    meta: {},
    docs: "",
  },
];

for (const registry of registries) {
  const registryBlock: z.infer<typeof registryItemSchema> = {
    name: `settlemint-${registry.name}`,
    type: "registry:block",
    description: registry.description,
    registryDependencies: registry.registryDependencies,
    dependencies: registry.dependencies,
    tailwind: registry.tailwind,
    cssVars: registry.cssVars,
    meta: registry.meta,
    docs: registry.docs,
    files: [],
  };

  for (const config of registry.files) {
    for await (const matchedFile of config.path.scan({ cwd: ".", onlyFiles: true })) {
      const content = await file(matchedFile).text();
      registryBlock.files!.push({
        path: matchedFile,
        content,
        type: config.type as
          | "registry:ui"
          | "registry:lib"
          | "registry:hook"
          | "registry:page"
          | "registry:style"
          | "registry:example"
          | "registry:block"
          | "registry:component"
          | "registry:theme",
        target: config.targetFunction(matchedFile),
      });
    }
  }
  await write(`./public/${registry.name}.json`, JSON.stringify(registryBlock, null, 2), { createPath: true });
}
