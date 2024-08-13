import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { findProjectRoot } from "@settlemint/sdk-config";

export function writeTsConfig() {
  const root = findProjectRoot(process.cwd());
  const settleMintDir = join(root, ".settlemint");
  const tsconfigPath = join(settleMintDir, "tsconfig.json");

  if (!existsSync(settleMintDir)) {
    mkdirSync(settleMintDir, { recursive: true });
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
