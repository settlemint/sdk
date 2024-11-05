import { rmdir } from "node:fs/promises";
import { resolve } from "node:path";
import { PROJECT_NAME } from "../constants/config.e2e";

export async function tearDown() {
  try {
    await rmdir(resolve(__dirname, "../", PROJECT_NAME), { recursive: true });
  } catch (err) {
    console.log("Failed to delete project dir", err);
  }
}
