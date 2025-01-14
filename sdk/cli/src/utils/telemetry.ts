import { loadEnv } from "@settlemint/sdk-utils/environment";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function telemetry(data: {
  command?: string;
  status: "success" | "error";
  message?: string;
  prod?: boolean;
  instance?: string;
}) {
  if (process.env.SETTLEMINT_DISABLE_TELEMETRY) {
    return;
  }

  try {
    const { prod, command, status, message, instance } = data;
    const env: Partial<DotEnv> = await loadEnv(false, !!prod);

    const targetInstance = instance ?? env.SETTLEMINT_INSTANCE;
    if (!targetInstance) {
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 500);

    await fetch(`${targetInstance}/api/telemetry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        command,
        status,
        message,
        workspace: env.SETTLEMINT_WORKSPACE,
        application: env.SETTLEMINT_APPLICATION,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);
  } catch (error) {
    console.error("Failed to send telemetry data", error);
    // Swallow any other errors
  }
}
