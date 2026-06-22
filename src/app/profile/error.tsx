"use client";

import { useEffect } from "react";
import { ErrorScreen } from "@/components/error-screen";

export default function ProfileError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[ProfileError]", error);
  }, [error]);

  return (
    <ErrorScreen
      title="Ошибка загрузки профиля"
      message="Не удалось загрузить данные профиля."
      reset={reset}
    />
  );
}
