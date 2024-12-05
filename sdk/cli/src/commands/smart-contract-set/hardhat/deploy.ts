import { Command } from "@commander-js/extra-typings";
import { hardhatDeployLocalCommand } from "./deploy/local";
import { hardhatDeployRemoteCommand } from "./deploy/remote";

export function hardhatDeployCommand() {
  const deploy = new Command("deploy");
  deploy.addCommand(hardhatDeployLocalCommand());
  deploy.addCommand(hardhatDeployRemoteCommand());

  return deploy;
}
