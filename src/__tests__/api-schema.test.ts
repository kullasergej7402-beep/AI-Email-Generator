import { describe, it, expect } from "vitest";
import { z } from "zod";

const schema = z.object({
  topic: z.string().min(3).max(500),
  tone: z.enum(["formal", "friendly", "persuasive", "casual", "professional"]),
  length: z.enum(["short", "medium", "long"]),
});

describe("generate API schema", () => {
  it("accepts valid input", () => {
    const result = schema.safeParse({ topic: "Тест", tone: "formal", length: "short" });
    expect(result.success).toBe(true);
  });

  it("rejects topic shorter than 3 chars", () => {
    const result = schema.safeParse({ topic: "AB", tone: "formal", length: "short" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid tone", () => {
    const result = schema.safeParse({ topic: "Valid topic", tone: "angry", length: "short" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid length", () => {
    const result = schema.safeParse({ topic: "Valid topic", tone: "formal", length: "huge" });
    expect(result.success).toBe(false);
  });

  it("rejects missing fields", () => {
    const result = schema.safeParse({ topic: "Valid topic" });
    expect(result.success).toBe(false);
  });
});
