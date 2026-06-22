import type { EmailProvider } from "./provider";
import type { GenerateEmailInput, GenerateEmailResult } from "@/types/ai";

const TONE_OPENERS: Record<string, string> = {
  formal:
    "Уважаемый(ая) получатель, настоящим письмом я хотел(а) бы обратиться к вам по следующему вопросу.",
  friendly:
    "Привет! Надеюсь, у тебя всё хорошо. Хотел(а) написать тебе по одному делу.",
  persuasive:
    "Я уверен(а), что это предложение заинтересует вас, и хочу поделиться с вами важной информацией.",
  casual: "Привет, как дела? Вот хотел(а) написать тебе кое-что важное.",
  professional:
    "Добрый день. Пишу вам в рамках нашего сотрудничества по следующему вопросу.",
};

const TONE_CLOSERS: Record<string, string> = {
  formal:
    "С уважением и надеждой на продуктивное взаимодействие,\n[Ваше имя]",
  friendly: "Буду рад(а) твоему ответу, жду с нетерпением!\nС уважением, [Имя]",
  persuasive:
    "Уверен(а), что вы оцените преимущества данного предложения. Жду вашего решения.\nС уважением, [Имя]",
  casual: "Напиши, как тебе это! Пока,\n[Имя]",
  professional:
    "Буду рад(а) обсудить детали при необходимости.\nС уважением, [Имя]",
};

const LENGTH_PARAGRAPHS: Record<string, number> = {
  short: 1,
  medium: 2,
  long: 3,
};

function buildBody(
  topic: string,
  tone: string,
  paragraphCount: number
): string {
  const opener = TONE_OPENERS[tone] ?? TONE_OPENERS.professional;
  const closer = TONE_CLOSERS[tone] ?? TONE_CLOSERS.professional;

  const paragraphs = [
    `${opener}\n\nТема данного обращения: ${topic}.`,
    `Хотел(а) бы подробнее остановиться на ключевых аспектах: данный вопрос требует вашего внимания, поскольку он непосредственно влияет на результаты нашей совместной работы.`,
    `Предлагаю рассмотреть следующие шаги для достижения наилучшего результата. Буду готов(а) предоставить дополнительную информацию или ответить на ваши вопросы в удобное для вас время.`,
  ];

  return [...paragraphs.slice(0, paragraphCount), closer].join("\n\n");
}

function buildSubject(topic: string, tone: string): string {
  const prefixes: Record<string, string> = {
    formal: "Официальное обращение:",
    friendly: "Привет! Тема:",
    persuasive: "Важное предложение:",
    casual: "Кстати,",
    professional: "Re:",
  };
  return `${prefixes[tone] ?? ""} ${topic}`.trim();
}

export class MockProvider implements EmailProvider {
  constructor(private readonly simulateError = false) {}

  async generate(input: GenerateEmailInput): Promise<GenerateEmailResult> {
    const delay = 600 + Math.random() * 600;
    await new Promise((r) => setTimeout(r, delay));

    if (this.simulateError) {
      throw new Error("Simulated provider error (for testing)");
    }

    const paragraphs = LENGTH_PARAGRAPHS[input.length] ?? 2;

    return {
      subject: buildSubject(input.topic, input.tone),
      body: buildBody(input.topic, input.tone, paragraphs),
    };
  }
}
