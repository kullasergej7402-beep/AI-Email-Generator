"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EmailForm } from "@/components/email-form";
import { GenerationHistory } from "@/components/generation-history";
import type {
  Tone,
  Length,
  GenerateEmailResult,
  GenerateStatus,
  HistoryItem,
} from "@/types/ai";

interface Props {
  email: string;
  initialHistory: HistoryItem[];
}

export function EmailGeneratorPage({ email, initialHistory }: Props) {
  const router = useRouter();

  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [length, setLength] = useState<Length>("medium");
  const [status, setStatus] = useState<GenerateStatus>("idle");
  const [result, setResult] = useState<GenerateEmailResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleGenerate() {
    if (!topic.trim()) {
      toast.error("Введите тему письма");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, tone, length }),
      });

      const data = await res.json() as { subject?: string; body?: string; message?: string };

      if (!res.ok) {
        throw new Error(data.message ?? "Ошибка генерации");
      }

      setResult({ subject: data.subject!, body: data.body! });
      setStatus("result");
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Неизвестная ошибка";
      setErrorMsg(msg);
      setStatus("error");
    }
  }

  function handleSelectHistory(item: HistoryItem) {
    try {
      const parsed = JSON.parse(item.result) as GenerateEmailResult;
      setResult(parsed);
      setTopic(item.topic);
      setTone(item.tone as Tone);
      setLength(item.length as Length);
      setStatus("result");
    } catch {
      toast.error("Не удалось загрузить генерацию из истории");
    }
  }

  return (
    <div className="container max-w-screen-xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">AI Email Generator</h1>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <EmailForm
          topic={topic}
          tone={tone}
          length={length}
          status={status}
          result={result}
          errorMsg={errorMsg}
          onTopicChange={setTopic}
          onToneChange={setTone}
          onLengthChange={setLength}
          onGenerate={handleGenerate}
        />
        <GenerationHistory
          items={initialHistory}
          onSelect={handleSelectHistory}
        />
      </div>
    </div>
  );
}
