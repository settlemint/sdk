export {};

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}b`;
  const kb = bytes / 1024;
  if (kb < 1024) {
  const mb = kb / 1024;
  return `${mb.toFixed(2)}mb`;
}

async function build() {
  console.log("🏗️  Building bundle...");
  try {
    const build = await Bun.build({
      entrypoints: ["./src/mcp.ts"],
      outdir: "./dist",
      target: "node",
      format: "esm",
      splitting: false,
      sourcemap: "external",
      minify: process.env.NODE_ENV === "production",
    });

    if (!build.success) {
      throw new Error(build.logs.join("\n"));
    }

    console.log(`📦 Bundle: ${formatSize(build.outputs[0].size)}`);
  } catch (error) {
    throw new Error(`Bundle build failed: ${error.message}`);
  }

  console.log("✨ Build complete!");
}

build().catch((err) => {
  console.error("❌ Build failed:", err.message);
  process.exit(1);
});
