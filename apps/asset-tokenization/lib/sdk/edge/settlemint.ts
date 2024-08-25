import { chain } from "@/.settlemint/node/chain";
import type { paths } from "@/.settlemint/portal/rest/portal-schema.d.ts";
import { createSdk } from "@settlemint/sdk/edge";
import config from "../../../.settlemintrc.json";

export const settlemint = createSdk<paths>(config, {
  chain,
});
