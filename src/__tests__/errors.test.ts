import { describe, it, expect } from "vitest";
import { normalizeError } from "@/lib/errors";

describe("normalizeError", () => {
  it("returns string as-is", () => {
    expect(normalizeError("простая ошибка")).toBe("простая ошибка");
  });

  it("handles network errors", () => {
    expect(normalizeError(new Error("fetch failed"))).toContain("соединения");
    expect(normalizeError(new Error("econnrefused"))).toContain("соединения");
  });

  it("handles JWT/auth errors", () => {
    expect(normalizeError(new Error("jwt expired"))).toContain("Сессия");
  });

  it("handles RLS errors", () => {
    expect(normalizeError(new Error("row level security"))).toContain("доступа");
  });

  it("handles rate limit errors", () => {
    expect(normalizeError(new Error("rate limit exceeded"))).toContain("запросов");
  });

  it("handles AI parse errors", () => {
    expect(normalizeError(new Error("failed to parse"))).toContain("AI");
  });

  it("returns original message for unknown errors", () => {
    expect(normalizeError(new Error("some random error"))).toBe("some random error");
  });

  it("handles non-Error unknown values", () => {
    expect(normalizeError(null)).toContain("Неизвестная");
    expect(normalizeError(undefined)).toContain("Неизвестная");
    expect(normalizeError(42)).toContain("Неизвестная");
  });
});
