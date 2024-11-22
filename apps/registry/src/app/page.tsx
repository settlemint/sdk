import Link from "next/link";

export default function Home() {
  return (
    <main>
      <ul className="flex flex-col gap-4">
        <li>
          <Link href="/blocks">Blocks</Link>
        </li>
      </ul>
    </main>
  );
}
