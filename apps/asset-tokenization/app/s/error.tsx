"use client";

import { ErrorComponent } from "@/components/global/error";
import React from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

function ErrorPage({ error }: ErrorPageProps) {
  return <ErrorComponent error={error} />;
}

export default React.memo(ErrorPage);
