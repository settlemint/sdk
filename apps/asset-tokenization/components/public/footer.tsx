import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-white">
        &copy; {new Date().getFullYear()}{" "}
        <Link href="https://settlemint.com" className="hover:underline">
          SettleMint
        </Link>
        . Freely available under the Functional Source License, Version 1.1, MIT Future License.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          href="https://console.settlemint.com/documentation/docs/terms-and-policies/terms-of-service/"
          className="text-xs hover:underline underline-offset-4 text-white/80"
        >
          Terms of Service
        </Link>
        <Link
          href="https://console.settlemint.com/documentation/docs/terms-and-policies/privacy-policy/"
          className="text-xs hover:underline underline-offset-4 text-white/80"
        >
          Privacy
        </Link>
        <Link
          href="https://console.settlemint.com/documentation/docs/terms-and-policies/cookie-policy/"
          className="text-xs hover:underline underline-offset-4 text-white/80"
        >
          Cookies
        </Link>
      </nav>
    </footer>
  );
}
