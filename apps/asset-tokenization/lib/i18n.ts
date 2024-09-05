import type { AvailableLanguageTag } from "@/paraglide/runtime";
import { Middleware, Navigation, PrefixStrategy } from "@inlang/paraglide-next";

const strategy = PrefixStrategy<AvailableLanguageTag>({ prefixDefault: "always" });

export const middleware = Middleware({ strategy });
export const { Link, useRouter, usePathname, redirect, permanentRedirect } = Navigation({ strategy });
