import { Command } from "@commander-js/extra-typings";
import { hardhatScriptLocalCommand } from "./script/local";
import { hardhatScriptRemoteCommand } from "./script/remote";

export function hardhatScriptCommand() {
  const script = new Command("script");
  script.addCommand(hardhatScriptRemoteCommand());
  script.addCommand(hardhatScriptLocalCommand());

  return script;
}
