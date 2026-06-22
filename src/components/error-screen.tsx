"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  title?: string;
  message?: string;
  reset?: () => void;
}

export function ErrorScreen({
  title = "Что-то пошло не так",
  message = "Произошла непредвиденная ошибка. Попробуйте позже.",
  reset,
}: Props) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <AlertTriangle className="h-10 w-10 text-destructive/70" />
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      <div className="flex gap-2">
        {reset && <Button onClick={reset}>Повторить</Button>}
        <Button variant="outline" asChild>
          <Link href="/">На главную</Link>
        </Button>
      </div>
    </div>
  );
}
