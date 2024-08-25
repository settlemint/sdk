"use client"; // Error boundaries must be Client Components

import { ErrorComponent } from "@/components/global/error";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return <ErrorComponent error={error} />;
}
