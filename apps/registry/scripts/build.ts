import { Glob, file, write } from "bun";
import type { z } from "zod";
import type { registryItemSchema } from "./schema";

const registries = [
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
