import Link from "next/link";
import type { PropsWithChildren } from "react";

const CURRENT_YEAR = new Date().getFullYear();

const footerLinks = [
  {
    href: "https://console.settlemint.com/documentation/docs/terms-and-policies/terms-of-service/",
    label: "Terms of Service",
  },
  { href: "https://console.settlemint.com/documentation/docs/terms-and-policies/privacy-policy/", label: "Privacy" },
  { href: "https://console.settlemint.com/documentation/docs/terms-and-policies/cookie-policy/", label: "Cookies" },
];

function FooterLink({ href, children }: PropsWithChildren<{ href: string }>) {
  return (
    <Link href={href} className="text-xs hover:underline underline-offset-4">
      {children}
    </Link>
  );
}

export function PublicFooter() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
      <p className="text-xs">
        &copy; {CURRENT_YEAR}{" "}
        <Link href="https://settlemint.com" className="hover:underline">
          SettleMint
        </Link>
        . Functional Source License, Version 1.1, MIT Future License.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        {footerLinks.map(({ href, label }) => (
          <FooterLink key={href} href={href}>
            {label}
          </FooterLink>
        ))}
      </nav>
    </footer>
  );
}
