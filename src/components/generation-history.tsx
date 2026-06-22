"use client";

import { History } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { HistoryItem } from "@/types/ai";

const TONE_LABELS: Record<string, string> = {
  formal: "Официальный",
  friendly: "Дружелюбный",
  persuasive: "Убедительный",
  casual: "Повседневный",
  professional: "Профессиональный",
};

interface Props {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

export function GenerationHistory({ items, onSelect }: Props) {
  return (
    <Card className="h-fit lg:sticky lg:top-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <History className="h-4 w-4" />
          История
          {items.length > 0 && (
            <span className="ml-auto text-sm font-normal text-muted-foreground">
              {items.length}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {items.length === 0 ? (
          <p className="px-6 pb-6 text-sm text-muted-foreground">
            Здесь появятся ваши генерации
          </p>
        ) : (
          <div className="max-h-[480px] overflow-y-auto">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelect(item)}
                className="w-full border-t px-4 py-3 text-left transition-colors hover:bg-muted/50 first:border-t-0"
              >
                <p className="truncate text-sm font-medium">{item.topic}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {TONE_LABELS[item.tone] ?? item.tone} ·{" "}
                  {new Date(item.created_at).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
