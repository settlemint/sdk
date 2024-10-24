import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Glob } from "bun";
import { Project, ScriptKind, SyntaxKind } from "ts-morph";
import type { RegistryItemFileType } from "./schema";

const blockDir = "src/components/blocks";
const libDir = "src/lib";
const themeDir = "src/themes";
const pageDir = "src/app";
const hooksDir = "src/hooks";

const project = new Project({
  compilerOptions: {},
});

async function createTempSourceFile(filename: string) {
  const dir = await mkdtemp(join(tmpdir(), "settlemint-"));
  return join(dir, filename);
}

async function compileBlocks() {
  const blocks = new Glob("*");
  const components = new Glob("*.ts*");
  const libs = new Glob("*.ts");
  const hooks = new Glob("*.ts*");
  const themes = new Glob("*.json");
  const kits = new Glob("*");
  const pages = new Glob("**/*.tsx");

  const all: string[] = [];

  console.log(`Compiling themes in ${themeDir}`);
  for await (const themePath of themes.scan({ cwd: themeDir, onlyFiles: true })) {
    console.log(` - ${themePath}`);
    const name = themePath.replace(".json", "");
    const file = Bun.file(join(themeDir, themePath));
    const raw = await file.json();
    Bun.write(join(process.cwd(), `public/${name}.json`), JSON.stringify(raw, null, 2));
    all.push(`https://settlemint.github.io/sdk/${name}.json`);
  }

  console.log(`Compiling hooks in ${hooksDir}`);
  for await (const hookPath of hooks.scan({ cwd: hooksDir, onlyFiles: true })) {
    if (hookPath === "use-mobile.tsx") continue;
    console.log(` - ${hookPath}`);
    const name = hookPath.replace(".ts", "");
    let description = "";
    const dependencies = new Set<string>();
    const files: { path: string; content: string; type: string; target: string }[] = [];

    const compiled = await compileFile({
      type: "registry:hook",
      basePath: hooksDir,
      componentPath: "",
      filepath: hookPath,
    });
    description = compiled.description;
    for (const dep of compiled.registryDependencies) dependencies.add(dep);
    for (const dep of compiled.dependencies) dependencies.add(dep);
    files.push(compiled.file);

    const component = {
      name,
      description,
      type: "registry:hook",
      dependencies: Array.from(dependencies),
      files,
    };

    Bun.write(join(process.cwd(), `public/${component.name}.json`), JSON.stringify(component, null, 2));
    all.push(`https://settlemint.github.io/sdk/${component.name}.json`);
  }

  console.log(`Compiling libs in ${libDir}`);
  for await (const libPath of libs.scan({ cwd: libDir, onlyFiles: true })) {
    if (libPath === "utils.ts") continue;
    console.log(` - ${libPath}`);
    const name = libPath.replace(".ts", "");
    let description = "";
    const dependencies = new Set<string>();
    const files: { path: string; content: string; type: string; target: string }[] = [];

    const compiled = await compileFile({
      type: "registry:lib",
      basePath: libDir,
      componentPath: "",
      filepath: libPath,
    });
    description = compiled.description;
    for (const dep of compiled.registryDependencies) dependencies.add(dep);
    for (const dep of compiled.dependencies) dependencies.add(dep);
    files.push(compiled.file);

    const component = {
      name,
      description,
      type: "registry:lib",
      dependencies: Array.from(dependencies),
      files,
    };

    Bun.write(join(process.cwd(), `public/${component.name}.json`), JSON.stringify(component, null, 2));
    all.push(`https://settlemint.github.io/sdk/${component.name}.json`);
  }

  console.log(`Compiling blocks in ${blockDir}`);
  for await (const componentPath of blocks.scan({ cwd: blockDir, onlyFiles: false })) {
    console.log(` - ${componentPath}`);

    const name = componentPath;
    let description = "";
    const registryDependencies = new Set<string>();
    const dependencies = new Set<string>();
    const files: { path: string; content: string; type: string; target: string }[] = [];

    for await (const filepath of components.scan({ cwd: join(blockDir, componentPath), onlyFiles: true })) {
      console.log(`   - ${filepath}`);
      const compiled = await compileFile({ type: "registry:component", basePath: blockDir, componentPath, filepath });
      description = compiled.description;
      for (const dep of compiled.registryDependencies) registryDependencies.add(dep);
      for (const dep of compiled.dependencies) dependencies.add(dep);
      files.push(compiled.file);
    }

    const component = {
      name,
      description,
      type: "registry:block",
      registryDependencies: Array.from(registryDependencies),
      dependencies: Array.from(dependencies),
      files,
    };

    Bun.write(join(process.cwd(), `public/${component.name}.json`), JSON.stringify(component, null, 2));
    all.push(`https://settlemint.github.io/sdk/${component.name}.json`);
  }

  console.log(`Compiling pages in ${pageDir}`);
  for await (const pagePath of kits.scan({ cwd: pageDir, onlyFiles: false })) {
    if (pagePath === "blocks" || pagePath.endsWith(".tsx") || pagePath.endsWith(".ts") || pagePath.endsWith(".css")) {
      continue;
    }
    console.log(` - ${pagePath}`);

    const name = pagePath;
    let description = "";
    const registryDependencies = new Set<string>();
    const dependencies = new Set<string>();
    const files: { path: string; content: string; type: string; target: string }[] = [];

    for await (const filepath of pages.scan({ cwd: join(pageDir, pagePath), onlyFiles: true })) {
      console.log(`   - ${filepath}`);
      const compiled = await compileFile({
        type: "registry:page",
        basePath: join(pageDir, pagePath),
        componentPath: "",
        filepath,
      });
      description = compiled.description;

      for (const dep of compiled.registryDependencies) {
        registryDependencies.add(dep);
      }
      registryDependencies.add("https://settlemint.github.io/sdk/settlemint.json");

      for (const dep of compiled.dependencies) {
        dependencies.add(dep);
      }
      files.push(compiled.file);
    }

    const component = {
      name,
      description,
      type: "registry:page",
      registryDependencies: Array.from(registryDependencies),
      dependencies: Array.from(dependencies),
      files,
    };

    Bun.write(join(process.cwd(), `public/${component.name}.json`), JSON.stringify(component, null, 2));
    all.push(`https://settlemint.github.io/sdk/${component.name}.json`);
  }

  Bun.write(
    join(process.cwd(), "public/all.json"),
    JSON.stringify({
      name: "all",
      description: "All components",
      type: "registry:component",
      registryDependencies: all,
      dependencies: [],
      files: [],
    }),
  );
}

compileBlocks()
  .then(() => {
    console.log("Done");
  })
  .catch((err) => {
    console.error(err);
  });

async function compileFile({
  type,
  basePath,
  componentPath,
  filepath,
}: { type: RegistryItemFileType; basePath: string; componentPath: string; filepath: string }) {
  const file = Bun.file(join(basePath, componentPath, filepath));

  const raw = await file.text();
  const tempFile = await createTempSourceFile(join(componentPath, filepath));

  const sourceFile = project.createSourceFile(tempFile, raw, {
    scriptKind: ScriptKind.TSX,
  });

  let description = "";
  if (sourceFile.getVariableDeclaration("description")) {
    description =
      sourceFile
        .getVariableDeclaration("description")
        ?.getInitializer()
        ?.asKind(SyntaxKind.StringLiteral)
        ?.getLiteralValue() ?? "";
  }

  const imports = new Map<
    string,
    {
      module: string;
      text: string;
      isDefault?: boolean;
    }
  >();

  for (const node of sourceFile.getImportDeclarations()) {
    const mod = node.getModuleSpecifier().getLiteralValue();
    for (const item of node.getNamedImports()) {
      imports.set(item.getText(), {
        module: mod,
        text: node.getText(),
      });
    }
  }

  const registryDependencies = new Set<string>();
  for (const { module } of Array.from(imports.values()).filter(({ module }) => module.startsWith("@/components/ui"))) {
    registryDependencies.add(module.replace("@/components/ui/", ""));
  }

  const dependencies = new Set<string>();
  for (const { module } of Array.from(imports.values())
    .filter(({ module }) => !module.startsWith("@/"))
    .filter(({ module }) => {
      if (module.startsWith("@")) {
        return module.split("/").length <= 3;
      }
      return !module.includes("/");
    })) {
    const basePackage = module.match(/^(@[^/]+\/[^/]+)|([^@/][^/]*)/)?.[0] ?? module;
    dependencies.add(basePackage);
  }

  const libDependencies = new Set<string>();

  for (const { module } of Array.from(imports.values())
    .filter(({ module }) => module.startsWith("@/lib"))
    .filter(({ module }) => !module.startsWith("@/lib/utils"))) {
    libDependencies.add(module);
  }

  for (const dep of Array.from(libDependencies)) {
    if (!dep.startsWith("@/lib/settlemint")) {
      registryDependencies.add(`https://settlemint.github.io/sdk/${dep.replace("@/lib/", "")}.json`);
    }
  }

  return {
    description,
    registryDependencies: Array.from(registryDependencies),
    dependencies: Array.from(dependencies),
    file: {
      path: filepath,
      content: raw,
      type: type,
      target: join(basePath.replace("src/", ""), componentPath, filepath),
    },
  };
}
