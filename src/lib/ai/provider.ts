import type { GenerateEmailInput, GenerateEmailResult } from "@/types/ai";

export interface EmailProvider {
  generate(input: GenerateEmailInput): Promise<GenerateEmailResult>;
}
