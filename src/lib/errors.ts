export function normalizeError(err: unknown): string {
  if (typeof err === "string") return err;

  if (err instanceof Error) {
    const msg = err.message.toLowerCase();

    if (msg.includes("fetch failed") || msg.includes("econnrefused") || msg.includes("network")) {
      return "Нет соединения с сервером. Проверьте интернет и попробуйте снова.";
    }
    if (msg.includes("jwt") || msg.includes("token expired") || msg.includes("unauthorized")) {
      return "Сессия истекла. Войдите снова.";
    }
    if (msg.includes("row level security") || msg.includes("rls")) {
      return "Нет доступа к данным.";
    }
    if (msg.includes("api key") || msg.includes("authentication")) {
      return "Ошибка конфигурации AI. Обратитесь к администратору.";
    }
    if (msg.includes("rate limit") || msg.includes("too many requests")) {
      return "Слишком много запросов. Попробуйте через минуту.";
    }
    if (msg.includes("failed to parse") || msg.includes("invalid email format")) {
      return "Не удалось обработать ответ AI. Попробуйте ещё раз.";
    }

    return err.message || "Неизвестная ошибка.";
  }

  return "Неизвестная ошибка. Попробуйте ещё раз.";
}
