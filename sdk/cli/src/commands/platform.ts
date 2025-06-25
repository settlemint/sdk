import { createCommand } from "@/commands/platform/create";
import { deleteCommand } from "@/commands/platform/delete";
import { pauseCommand } from "@/commands/platform/pause";
import { restartCommand } from "@/commands/platform/restart";
import { resumeCommand } from "@/commands/platform/resume";
import { updateCommand } from "@/commands/platform/update";
import { Command } from "@commander-js/extra-typings";
import { configCommand } from "./platform/config";
import { listCommand } from "./platform/list";

/**
 * Creates and returns the 'platform' command for the SettleMint SDK.
 * This command provides functionality related to the SettleMint platform,
 * including custom deployments management.
 *
 * @returns {Command} The configured 'platform' command
 */
export function platformCommand(): Command {
  return new Command("platform")
    .description("Manage SettleMint platform resources")
    .addCommand(configCommand())
    .addCommand(createCommand())
    .addCommand(deleteCommand())
    .addCommand(listCommand())
    .addCommand(pauseCommand())
    .addCommand(resumeCommand())
    .addCommand(restartCommand())
    .addCommand(updateCommand());
}
