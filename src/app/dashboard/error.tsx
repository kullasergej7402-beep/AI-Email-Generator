"use client";

import { useEffect } from "react";
import { ErrorScreen } from "@/components/error-screen";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[DashboardError]", error);
  }, [error]);

  return (
    <ErrorScreen
      title="Ошибка загрузки Dashboard"
      message="Не удалось загрузить данные. Попробуйте обновить страницу."
      reset={reset}
    />
  );
}
