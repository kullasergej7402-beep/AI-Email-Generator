import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <FileQuestion className="h-10 w-10 text-muted-foreground" />
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Страница не найдена</h2>
        <p className="text-sm text-muted-foreground">
          Страницы не существует или она была перемещена.
        </p>
      </div>
      <Button asChild>
        <Link href="/">На главную</Link>
      </Button>
    </div>
  );
}
