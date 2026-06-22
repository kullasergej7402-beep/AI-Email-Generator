import { describe, it, expect } from "vitest";
import { MockProvider } from "@/lib/ai/mock-provider";

describe("MockProvider", () => {
  it("generates an email with subject and body", async () => {
    const provider = new MockProvider();
    const result = await provider.generate({
      topic: "Тестовая тема",
      tone: "formal",
      length: "short",
    });

    expect(result).toHaveProperty("subject");
    expect(result).toHaveProperty("body");
    expect(result.subject.length).toBeGreaterThan(0);
    expect(result.body.length).toBeGreaterThan(0);
  });

  it("includes the topic in the body", async () => {
    const provider = new MockProvider();
    const topic = "Уникальная тема для теста";
    const result = await provider.generate({ topic, tone: "professional", length: "medium" });

    expect(result.body).toContain(topic);
  });

  it("generates different lengths", async () => {
    const provider = new MockProvider();

    const short = await provider.generate({ topic: "Test", tone: "casual", length: "short" });
    const long = await provider.generate({ topic: "Test", tone: "casual", length: "long" });

    expect(long.body.length).toBeGreaterThan(short.body.length);
  });

  it("throws on simulateError flag", async () => {
    const provider = new MockProvider(true);

    await expect(
      provider.generate({ topic: "Test", tone: "formal", length: "short" })
    ).rejects.toThrow("Simulated provider error");
  });
});
