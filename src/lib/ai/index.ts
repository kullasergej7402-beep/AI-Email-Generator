import type { EmailProvider } from "./provider";
import { MockProvider } from "./mock-provider";
import { AnthropicProvider } from "./anthropic-provider";

export function getEmailProvider(): EmailProvider {
  const provider = process.env.AI_PROVIDER ?? "mock";

  if (provider === "anthropic") {
    return new AnthropicProvider();
  }

  return new MockProvider();
}
