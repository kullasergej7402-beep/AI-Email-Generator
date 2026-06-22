# Фаза 3 — AI-слой + Dashboard

**Предпосылки:** пройдены фазы 0–2.
**После фазы:** есть переключаемый AI-слой (mock ↔ реальная LLM) и рабочий дашборд с генерацией и историей. Commit после каждого промпта.
**Совет:** дашборд — крупный промпт, запусти в plan mode.

---

## Промпт 3.1 — Провайдеро-независимый AI-слой

```
Опираясь на CLAUDE.md, создай слой генерации, который легко переключается между mock и реальной LLM.

1. src/types/ai.ts — типы:
   - Tone = 'formal' | 'friendly' | 'persuasive' | 'casual' | 'professional'
   - Length = 'short' | 'medium' | 'long'
   - GenerateEmailInput { topic: string; tone: Tone; length: Length }
   - GenerateEmailResult { subject: string; body: string }
2. src/lib/ai/provider.ts — интерфейс EmailProvider с методом generate(input): Promise<GenerateEmailResult>.
3. Две реализации:
   - src/lib/ai/mock-provider.ts — детерминированно собирает правдоподобное письмо из topic/tone/length, имитирует задержку 600-1200мс, иногда (по флагу) кидает ошибку для теста error handling.
   - src/lib/ai/anthropic-provider.ts — реальный вызов Anthropic API (claude-sonnet-4-6 или актуальная модель), системный промпт под тон и длину, парсинг ответа в { subject, body }. Используй переменную ANTHROPIC_API_KEY на сервере.
4. src/lib/ai/index.ts — фабрика getEmailProvider(), которая по env AI_PROVIDER (mock|anthropic) возвращает нужную реализацию. По умолчанию mock.
5. Документируй в CLAUDE.md, как добавить нового провайдера (OpenAI/Gemini) — просто новый файл + ветка в фабрике.

Никакого UI. Покажи, что mock-провайдер работает (мини-скрипт или unit-тест).
```

---

## Промпт 3.2 — Dashboard UI + API-роут генерации

```
Опираясь на CLAUDE.md и AI-слое, собери Dashboard на /dashboard (только для авторизованных).

1. API-роут POST /api/generate:
   - принимает { topic, tone, length }, валидирует zod
   - вызывает getEmailProvider().generate()
   - сохраняет результат в email_generations для текущего пользователя
   - возвращает { subject, body }
   - оборачивает всё в try/catch, на ошибку — статус 4xx/5xx + понятное message
   - (опционально) проверка плана: free лимит N генераций/день, при превышении — 402 с сообщением про upgrade
2. UI дашборда:
   - поле ввода темы письма (textarea)
   - выбор тона (Select с вариантами Tone, с человекочитаемыми подписями)
   - выбор длины (Select: короткое / среднее / длинное)
   - кнопка Generate с состоянием loading (спиннер, disabled)
   - блок результата: subject + body, кнопка "Скопировать", кнопка "Сгенерировать заново"
   - состояния: пусто / загрузка (skeleton) / ошибка (алерт с текстом + retry) / результат
3. Сайдбар или вкладка "История" — список последних генераций пользователя из БД, клик открывает результат.
4. Всё адаптивно. Лёгкие анимации появления результата.

Проверь полный цикл на mock-провайдере, включая ветку ошибки.
```
