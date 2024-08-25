import { Button } from "@/components/ui/button";
import Link from "next/link";
import CrossIcon from "./icons/cross";

export function ErrorComponent({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const errorMessage = error.message || "An unexpected error occurred";
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center">
      <div className="mx-auto max-w-xl text-center">
        <CrossIcon className="mx-auto" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oops, something went wrong!
        </h1>
        <p className="mt-4 text-muted-foreground">{errorMessage}</p>
        {error.digest && <p className="mt-2 text-sm text-muted-foreground">Error ID: {error.digest}</p>}
        {isDevelopment && (
          <pre className="mt-4 max-w-full overflow-x-auto text-left text-sm text-red-500">{error.stack}</pre>
        )}
        <div className="mt-6">
          <Link href="/">
            <Button variant="default">Go to Homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
