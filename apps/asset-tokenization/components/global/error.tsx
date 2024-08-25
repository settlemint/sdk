import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import CrossIcon from "./icons/cross";

interface ErrorComponentProps {
  error: Error & { digest?: string };
}

export function ErrorComponent({ error }: PropsWithChildren<ErrorComponentProps>) {
  const errorMessage = error.message || "An unexpected error occurred";
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center p-4">
      <div className="mx-auto max-w-xl w-full text-center">
        <CrossIcon className="mx-auto h-12 w-12 text-destructive" aria-hidden="true" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oops, something went wrong!
        </h1>
        <p className="mt-4 text-muted-foreground">{errorMessage}</p>
        {error.digest && (
          <p className="mt-2 text-sm text-muted-foreground">
            Error ID: <span className="font-mono">{error.digest}</span>
          </p>
        )}
        {isDevelopment && (
          <pre className="mt-4 max-w-full overflow-x-auto text-left text-sm text-destructive p-4 bg-muted rounded-md">
            {error.stack}
          </pre>
        )}
        <div className="mt-6">
          <Link href="/" passHref legacyBehavior>
            <Button variant="default">Go to Homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
