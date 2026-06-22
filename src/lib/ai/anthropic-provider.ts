import Anthropic from "@anthropic-ai/sdk";
import type { EmailProvider } from "./provider";
import type { GenerateEmailInput, GenerateEmailResult } from "@/types/ai";

const TONE_DESCRIPTIONS: Record<string, string> = {
  formal: "formal and professional, suitable for official correspondence",
  friendly: "warm and friendly, as if writing to a close colleague",
  persuasive: "persuasive and compelling, designed to convince the reader to act",
  casual: "casual and informal, like writing to a friend",
  professional: "professional and business-like, maintaining a respectful tone",
};

const LENGTH_GUIDELINES: Record<string, string> = {
  short: "concise — 1 short paragraph, around 50–80 words in the body",
  medium: "moderate — 2–3 paragraphs, around 100–150 words in the body",
  long: "detailed — 3–4 paragraphs, around 200–300 words in the body",
};

export class AnthropicProvider implements EmailProvider {
  private readonly client: Anthropic;

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async generate(input: GenerateEmailInput): Promise<GenerateEmailResult> {
    const toneDesc = TONE_DESCRIPTIONS[input.tone] ?? TONE_DESCRIPTIONS.professional;
    const lengthDesc = LENGTH_GUIDELINES[input.length] ?? LENGTH_GUIDELINES.medium;

    const message = await this.client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: `You are an expert email writer. Generate a single email based on the given topic, tone, and length.

Respond with a raw JSON object — no markdown, no code blocks, no extra text:
{"subject": "...", "body": "..."}

Rules:
- subject: concise, relevant to the topic
- body: plain text only, use \\n for line breaks between paragraphs
- tone must be: ${toneDesc}
- length must be: ${lengthDesc}`,
      messages: [
        {
          role: "user",
          content: `Write an email about: ${input.topic}`,
        },
      ],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text response from Anthropic API");
    }

    let parsed: GenerateEmailResult;
    try {
      const raw = textBlock.text
        .replace(/^```(?:json)?\n?/i, "")
        .replace(/\n?```$/i, "")
        .trim();
      parsed = JSON.parse(raw) as GenerateEmailResult;
    } catch {
      throw new Error("Failed to parse email response from AI");
    }

    if (!parsed.subject || !parsed.body) {
      throw new Error("Invalid email format returned from AI");
    }

    return { subject: parsed.subject, body: parsed.body };
  }
}
