import Link from "next/link";

export default function Blocks() {
  return (
    <main>
      <ul className="flex flex-col gap-4">
        <li>
          <Link href="/blocks/address-avatar">Address Avatar</Link>
        </li>
        <li>
          <Link href="/blocks/collapsed-breadcrumb">Collapsed Breadcrumb</Link>
        </li>
        <li>
          <Link href="/blocks/dark-mode">Dark Mode</Link>
        </li>
        <li>
          <Link href="/blocks/evm-address">EVM Address</Link>
        </li>
        <li>
          <Link href="/blocks/logo">Logo</Link>
        </li>
      </ul>
    </main>
  );
}
