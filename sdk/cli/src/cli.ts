#!/usr/bin/env node
import { sdkCliCommand } from "@/commands/index";
import { ascii } from "@settlemint/sdk-utils/terminal";

ascii();

sdkCliCommand();
