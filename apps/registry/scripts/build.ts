import { Glob, file, write } from "bun";
import type { z } from "zod";
import type { registryItemSchema } from "./schema";

const registries = [
  {
    name: "all",
    description: "All components",
    files: [],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [
      "https://console-release.settlemint.com/registry/collapsed-breadcrumb.json",
      "https://console-release.settlemint.com/registry/dark-mode.json",
      "https://console-release.settlemint.com/registry/address-avatar.json",
      "https://console-release.settlemint.com/registry/query-client.json",
      "https://console-release.settlemint.com/registry/data-table.json",
      "https://console-release.settlemint.com/registry/evm-address.json",
    ],
    tailwind: {},
    cssVars: {},
    meta: {},
    docs: "",
  },
  {
    name: "all-staging",
    description: "All components",
    files: [],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [
      "https://settlemint.github.io/sdk/collapsed-breadcrumb.json",
      "https://settlemint.github.io/sdk/dark-mode.json",
      "https://settlemint.github.io/sdk/address-avatar.json",
      "https://settlemint.github.io/sdk/query-client.json",
      "https://settlemint.github.io/sdk/data-table.json",
      "https://settlemint.github.io/sdk/evm-address.json",
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
    devDependencies: [],
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
    devDependencies: [],
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
    devDependencies: [],
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
    ],
    devDependencies: ["@tanstack/eslint-plugin-query"],
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
    devDependencies: [],
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
    dependencies: [],
    devDependencies: [],
    registryDependencies: ["hover-card"],
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
        type: "registry:lib",
        path: new Glob("./lib/safe-action.ts"),
        targetFunction: (path: string) => path.replace("lib/safe-action", "lib/safe-action"),
      },
      {
        type: "registry:lib",
        path: new Glob("./lib/auth*.ts"),
        targetFunction: (path: string) => path.replace("lib/auth", "lib/auth"),
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
    ],
    devDependencies: ["@types/bcryptjs"],
    registryDependencies: ["button", "form", "input", "card"],
    tailwind: {},
    cssVars: {},
    meta: {},
    docs: "",
  },
  // {
  //   name: "asset-tokenization",
  //   description: "Asset tokenization",
  //   files: [
  //     {
  //       type: "registry:ui",
  //       path: new Glob("./components/ui/settlemint/**/*"),
  //       targetFunction: (path: string) => path.replace("components/ui/settlemint", "components/ui/settlemint"),
  //     },
  //     {
  //       type: "registry:lib",
  //       path: new Glob("./lib/settlemint/**/*"),
  //       targetFunction: (path: string) => path.replace("lib/settlemint", "lib/settlemint"),
  //     },
  //     {
  //       type: "registry:hook",
  //       path: new Glob("./hooks/settlemint/**/*"),
  //       targetFunction: (path: string) => path.replace("hooks/settlemint", "hooks/settlemint"),
  //     },
  //     {
  //       type: "registry:page",
  //       path: new Glob("./app/example/page.tsx"),
  //       targetFunction: (path: string) => path.replace("app", "app"),
  //     },
  //   ],
  //   dependencies: [],
  //   devDependencies: [],
  //   registryDependencies: [],
  //   tailwind: {},
  //   cssVars: {},
  //   meta: {},
  //   docs: "",
  // },
];

for (const registry of registries) {
  const registryBlock: z.infer<typeof registryItemSchema> = {
    name: `settlemint-${registry.name}`,
    type: "registry:block",
    description: registry.description,
    registryDependencies: registry.registryDependencies,
    dependencies: registry.dependencies,
    devDependencies: registry.devDependencies,
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
