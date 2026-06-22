# CLAUDE.md — AI Email Generator

## Стек и версии

| Технология | Версия |
|---|---|
| Next.js | 14.x (App Router) |
| TypeScript | 5.x (strict mode) |
| Tailwind CSS | 3.x |
| shadcn/ui | latest (style: new-york, base: neutral) |
| Supabase | @supabase/supabase-js + @supabase/ssr |
| Anthropic SDK | @anthropic-ai/sdk latest |
| framer-motion | latest |
| next-themes | latest |

## Структура папок

```
src/
  app/                  # Роуты (App Router)
  components/
    ui/                 # shadcn-компоненты
    (...)               # Собственные компоненты
  lib/
    supabase/
      client.ts         # Браузерный Supabase клиент
      server.ts         # Серверный Supabase клиент (cookies)
      middleware.ts     # Хелпер обновления сессии
    ai.ts               # Клиент Anthropic / mock-провайдер
    utils.ts            # Общие утилиты (cn и др.)
  types/                # Общие TypeScript типы
supabase/
  migrations/           # SQL-миграции
```

## Правила разработки

### Server vs Client компоненты
- Server Components по умолчанию — не добавляй `"use client"` без необходимости.
- `"use client"` только если: useState, useEffect, браузерные API, обработчики событий, анимации.

### TypeScript
- Никаких `any`. Если тип неизвестен — используй `unknown` и сужай.
- Включён `strict: true` в `tsconfig.json`.

### Обработка ошибок
- Все async-операции обёрнуты в `try/catch`.
- Пользователю всегда показываем человекочитаемое сообщение (через toast или Error-компонент), никогда белый экран.
- Ошибки API логируем в `console.error` на сервере; на клиент отдаём только безопасное сообщение.

### Компоненты
- Маленькие и переиспользуемые. Если компонент > ~150 строк — рассмотри разбивку.
- Не дублируй логику — выноси в `src/lib` или в хук.

## Именование

| Сущность | Конвенция | Пример |
|---|---|---|
| React-компоненты | PascalCase | `EmailForm.tsx` |
| Файлы роутов | kebab-case | `app/email-generator/page.tsx` |
| Утилиты / хелперы | camelCase | `formatDate.ts` |
| SQL-миграции | `NNNN_description.sql` | `0001_init.sql` |

## Переменные окружения

Все переменные хранятся в `.env.local` (не коммитится). Шаблон — `.env.example`.

| Переменная | Описание |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL проекта Supabase (публичный) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon-ключ Supabase (публичный) |
| `ANTHROPIC_API_KEY` | Секретный API-ключ Anthropic |
| `AI_PROVIDER` | `mock` для разработки без затрат, `anthropic` для реального API |

## AI-провайдеры

### Архитектура

Слой генерации писем основан на интерфейсе `EmailProvider` (`src/lib/ai/provider.ts`).
Фабрика `getEmailProvider()` (`src/lib/ai/index.ts`) читает `process.env.AI_PROVIDER` и возвращает нужную реализацию.

```
src/lib/ai/
  provider.ts           ← интерфейс EmailProvider
  mock-provider.ts      ← детерминированный mock (разработка)
  anthropic-provider.ts ← Claude (claude-sonnet-4-6)
  index.ts              ← фабрика getEmailProvider()
```

### Как добавить нового провайдера (OpenAI, Gemini и т.д.)

1. **Создай файл** `src/lib/ai/openai-provider.ts`:

   ```ts
   import OpenAI from "openai";
   import type { EmailProvider } from "./provider";
   import type { GenerateEmailInput, GenerateEmailResult } from "@/types/ai";

   export class OpenAIProvider implements EmailProvider {
     private readonly client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

     async generate(input: GenerateEmailInput): Promise<GenerateEmailResult> {
       // вызов API, парсинг ответа в { subject, body }
       throw new Error("Not implemented");
     }
   }
   ```

2. **Добавь ветку в фабрику** `src/lib/ai/index.ts`:

   ```ts
   if (provider === "openai") {
     return new OpenAIProvider();
   }
   ```

3. **Добавь переменную окружения** в `.env.local`:
   ```
   AI_PROVIDER=openai
   OPENAI_API_KEY=sk-...
   ```

Всё — остальной код (`/api/generate`, Dashboard) не меняется.

### Проверка mock-провайдера

```bash
npx tsx scripts/test-mock.ts
```

## Монетизация

### Текущее состояние (mock)

Апгрейд реализован через server action `upgradeToPro()` (`src/app/actions/billing.ts`),
который напрямую пишет `plan = 'pro'` в `profiles`. Это demo flow — реального платежа нет.

### Как подключить Stripe

1. **Установи SDK:** `npm install stripe @stripe/stripe-js`

2. **Добавь переменные** в `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   ```

3. **Замени mock-checkout** на Stripe Checkout Session:
   - `src/app/actions/billing.ts` → вместо прямого UPDATE создай Checkout Session и верни `url`
   - Редиректни пользователя на `url` вместо показа модалки

4. **Обработай webhook** `POST /api/webhooks/stripe`:
   - Верифицируй подпись через `stripe.webhooks.constructEvent()`
   - На событие `checkout.session.completed` → UPDATE `profiles.plan = 'pro'`
   - На `customer.subscription.deleted` → UPDATE `profiles.plan = 'free'`

5. **UI не меняется** — `PricingCards`, `UpgradeModal` и badge в шапке остаются как есть.
   Единственное изменение: `UpgradeModal` вместо показа fake-карты делает `router.push(checkoutUrl)`.
