"use client";

import { Copy, RefreshCw, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Tone, Length, GenerateEmailResult, GenerateStatus } from "@/types/ai";

const TONES: { value: Tone; label: string }[] = [
  { value: "formal", label: "Официальный" },
  { value: "friendly", label: "Дружелюбный" },
  { value: "persuasive", label: "Убедительный" },
  { value: "casual", label: "Повседневный" },
  { value: "professional", label: "Профессиональный" },
];

const LENGTHS: { value: Length; label: string }[] = [
  { value: "short", label: "Короткое" },
  { value: "medium", label: "Среднее" },
  { value: "long", label: "Длинное" },
];

interface Props {
  topic: string;
  tone: Tone;
  length: Length;
  status: GenerateStatus;
  result: GenerateEmailResult | null;
  errorMsg: string;
  onTopicChange: (v: string) => void;
  onToneChange: (v: Tone) => void;
  onLengthChange: (v: Length) => void;
  onGenerate: () => void;
}

export function EmailForm({
  topic, tone, length, status, result, errorMsg,
  onTopicChange, onToneChange, onLengthChange, onGenerate,
}: Props) {
  async function copyResult() {
    if (!result) return;
    await navigator.clipboard.writeText(`Subject: ${result.subject}\n\n${result.body}`);
    toast.success("Скопировано в буфер обмена");
  }

  const isLoading = status === "loading";

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Тема письма</Label>
            <Textarea
              id="topic"
              placeholder="Например: Запрос о сотрудничестве с компанией ABC..."
              value={topic}
              onChange={(e) => onTopicChange(e.target.value)}
              disabled={isLoading}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Тон</Label>
              <Select
                value={tone}
                onValueChange={(v) => onToneChange(v as Tone)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TONES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Длина</Label>
              <Select
                value={length}
                onValueChange={(v) => onLengthChange(v as Length)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LENGTHS.map((l) => (
                    <SelectItem key={l.value} value={l.value}>
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={onGenerate}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Генерируем...
              </>
            ) : (
              "Сгенерировать письмо"
            )}
          </Button>
        </CardContent>
      </Card>

      {isLoading && (
        <Card>
          <CardContent className="pt-6 space-y-3">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </CardContent>
        </Card>
      )}

      {status === "error" && (
        <Alert variant="destructive">
          <AlertDescription className="flex items-center justify-between gap-4">
            <span>{errorMsg}</span>
            <Button variant="ghost" size="sm" onClick={onGenerate}>
              Повторить
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {status === "result" && result && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card>
            <CardHeader className="pb-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Тема письма
              </p>
              <p className="text-lg font-semibold">{result.subject}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Текст
                </p>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{result.body}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyResult}>
                  <Copy className="mr-2 h-4 w-4" />
                  Скопировать
                </Button>
                <Button variant="outline" size="sm" onClick={onGenerate}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Ещё раз
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
