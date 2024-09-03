"use server";

import fs from "node:fs/promises";

export async function uploadFile(state: unknown, formData: FormData) {
  const file = formData.get("file") as File;
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  await fs.writeFile(`./public/uploads/${file.name}`, bytes);
}
