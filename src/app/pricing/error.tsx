"use client";

import { useEffect } from "react";
import { ErrorScreen } from "@/components/error-screen";

export default function PricingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[PricingError]", error);
  }, [error]);

  return (
    <ErrorScreen
      title="Ошибка загрузки тарифов"
      message="Не удалось загрузить страницу тарифов."
      reset={reset}
    />
  );
}
