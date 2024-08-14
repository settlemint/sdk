
import createClient from "openapi-fetch";
import type { paths } from "./codegen/portal-schema";

export const portal = createClient<paths>({ baseUrl: `${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/proxy/portal/rest` });
