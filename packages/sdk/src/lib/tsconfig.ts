import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { findProjectRoot } from "@settlemint/sdk-config";

export function writeTsConfig() {
  const root = findProjectRoot(process.cwd());
  const btpDir = join(root, ".btp");
  const tsconfigPath = join(btpDir, "tsconfig.json");

  if (!existsSync(btpDir)) {
    mkdirSync(btpDir, { recursive: true });
  }

  writeFileSync(
    tsconfigPath,
    JSON.stringify(
      {
        compilerOptions: {
          lib: ["dom", "dom.iterable", "esnext"],
          allowJs: true,
          skipLibCheck: true,
          strict: true,
          noEmit: true,
          esModuleInterop: true,
          module: "esnext",
          moduleResolution: "bundler",
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: "preserve",
          incremental: true,
          noImplicitAny: false,
          plugins: [
            {
              name: "next",
            },
          ],
          paths: {
            "@/*": ["./*"],
          },
        },
        include: ["**/*.ts", "**/*.tsx"],
        exclude: ["node_modules"],
      },
      null,
      2,
    ),
  );
}
