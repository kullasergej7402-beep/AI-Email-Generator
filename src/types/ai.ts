export type Tone =
  | "formal"
  | "friendly"
  | "persuasive"
  | "casual"
  | "professional";

export type Length = "short" | "medium" | "long";

export interface GenerateEmailInput {
  topic: string;
  tone: Tone;
  length: Length;
}

export interface GenerateEmailResult {
  subject: string;
  body: string;
}

export type GenerateStatus = "idle" | "loading" | "error" | "result";

export interface HistoryItem {
  id: string;
  topic: string;
  tone: string;
  length: string;
  result: string;
  created_at: string;
}
