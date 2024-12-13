export {};

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}b`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(2)}kb`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)}mb`;
}

async function build() {
  console.log("🏗️  Building bundle...");
  const build = await Bun.build({
    entrypoints: ["./src/cli.ts"],
    outdir: "./dist",
    target: "node",
    format: "esm",
    splitting: false,
    sourcemap: "external",
    minify: process.env.NODE_ENV === "production",
    external: ["hardhat", "hardhat/*"],
  });
  console.log(`📦 Bundle: ${formatSize(build.outputs[0].size)}`);

  console.log("📝 Generating types...");
  const proc = Bun.spawn(["tsc", "--emitDeclarationOnly", "--declaration", "--outDir", "dist"], {
    stdout: "inherit",
    stderr: "inherit",
  });

  await proc.exited;
  console.log("✨ Build complete!");
}

build();
