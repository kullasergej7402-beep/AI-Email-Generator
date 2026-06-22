# AI Email Generator

Веб-приложение для генерации профессиональных писем с помощью AI. Пользователь указывает тему, выбирает тон и длину — Claude возвращает готовое письмо. Реализованы история генераций, тарифы Free/Pro/Business и профиль пользователя.

## Фичи

- Генерация писем через Claude (claude-sonnet-4-6) или детерминированный mock для разработки
- 5 тонов: официальный, дружелюбный, убедительный, повседневный, профессиональный
- 3 длины: короткое / среднее / длинное
- История генераций в сайдбаре, клик загружает результат
- Страница тарифов (Free / Pro / Business) с mock-checkout flow
- Профиль: редактирование имени, счётчик генераций, управление подпиской
- Тёмная и светлая тема
- Адаптивный дизайн, анимации framer-motion
- Error boundaries на каждом роуте, нет белых экранов

## Стек

| Технология | Версия | Назначение |
|---|---|---|
| Next.js | 14.x (App Router) | Фреймворк, Server Components, Server Actions |
| TypeScript | 5.x strict | Типизация |
| Tailwind CSS | 3.x | Стили |
| shadcn/ui | latest (new-york) | UI-компоненты |
| Supabase | @supabase/ssr | Auth + PostgreSQL + RLS |
| Anthropic SDK | @anthropic-ai/sdk | Генерация писем через Claude |
| framer-motion | 12.x | Анимации |
| next-themes | latest | Тема оформления |
| Zod | 4.x | Валидация данных |
| Vitest | 4.x | Unit-тесты (17 тестов) |
| Playwright | 1.x | E2E-тесты |

## Структура проекта

```
src/
├── app/
│   ├── (auth)/              # login, signup (без шапки сайта)
│   ├── api/generate/        # POST /api/generate — вызов AI-провайдера
│   ├── actions/             # Server Actions: auth.ts, billing.ts, profile.ts
│   ├── dashboard/           # Защищённая страница генератора
│   ├── pricing/             # Публичная страница тарифов
│   ├── profile/             # Защищённая страница профиля
│   ├── error.tsx            # Глобальный error boundary
│   └── not-found.tsx        # 404
├── components/
│   ├── ui/                  # shadcn-компоненты (button, card, dialog…)
│   ├── landing/             # Секции лендинга (hero, features, faq…)
│   ├── email-form.tsx       # Форма генерации + блок результата
│   ├── email-generator-page.tsx  # Клиентский контейнер дашборда
│   ├── generation-history.tsx    # Сайдбар истории
│   ├── pricing-cards.tsx    # Карточки тарифов
│   └── upgrade-modal.tsx    # Mock-checkout диалог
├── lib/
│   ├── ai/                  # AI-слой: provider.ts, mock, anthropic, index (фабрика)
│   ├── supabase/            # client.ts, server.ts, middleware.ts
│   ├── errors.ts            # normalizeError() — единая нормализация ошибок
│   └── utils.ts             # cn() и утилиты
└── types/
    └── ai.ts                # Tone, Length, GenerateEmailInput/Result, HistoryItem

supabase/
└── migrations/
    └── 0001_init.sql        # profiles, email_generations, RLS, триггер

e2e/                         # Playwright тесты (лендинг, pricing, 404)
scripts/
└── test-mock.ts             # Быстрая проверка MockProvider
```

## Локальный запуск

### Предпосылки

- Node.js 20+
- Аккаунт [Supabase](https://supabase.com) (бесплатный, без карты)
- Опционально: API-ключ [Anthropic](https://console.anthropic.com) (нужен только для `AI_PROVIDER=anthropic`)

### Установка

```bash
git clone <your-repo-url>
cd ai-email-generator
npm install
```

### Переменные окружения

```bash
cp .env.example .env.local
```

Заполни `.env.local`:

| Переменная | Описание | Обязательна |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL проекта Supabase (Settings → API) | Да |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon-ключ Supabase (Settings → API) | Да |
| `ANTHROPIC_API_KEY` | Ключ Anthropic | Только при `AI_PROVIDER=anthropic` |
| `AI_PROVIDER` | `mock` или `anthropic` | Нет (по умолчанию `mock`) |

### Настройка Supabase

1. Создай проект на [supabase.com](https://supabase.com)
2. **Settings → API** → скопируй Project URL и anon-ключ в `.env.local`
3. **SQL Editor** → вставь содержимое `supabase/migrations/0001_init.sql` → **Run**
4. **Authentication → Providers → Email** → отключи **Confirm email** (для разработки)

### Запуск

```bash
npm run dev
# → http://localhost:3000
```

## Mock ↔ реальный Claude

Переключается переменной `AI_PROVIDER` в `.env.local`:

| Значение | Поведение |
|---|---|
| `mock` (по умолчанию) | Детерминированный ответ, задержка 600–1200 мс, ключи не нужны |
| `anthropic` | Реальный Claude (claude-sonnet-4-6), нужен `ANTHROPIC_API_KEY` |

```bash
# Быстрая проверка mock без запуска приложения
npm run test:mock
```

### Добавить нового провайдера (OpenAI, Gemini и т.д.)

1. Создай `src/lib/ai/openai-provider.ts`, реализуй интерфейс `EmailProvider`
2. Добавь ветку в `src/lib/ai/index.ts`
3. Добавь `AI_PROVIDER=openai` и ключ в `.env.local`

Остальной код (`/api/generate`, Dashboard) не меняется.

## Скрипты

```bash
npm run dev          # dev-сервер с hot reload
npm run build        # production-сборка
npm run start        # запуск production-сборки
npm run lint         # ESLint
npm test             # unit-тесты Vitest (17 тестов)
npm run test:watch   # Vitest в watch-режиме
npm run test:e2e     # E2E-тесты Playwright
npm run test:mock    # проверка MockProvider через tsx
```

## Docker

```bash
# Сборка и запуск через docker compose (использует .env.local)
docker compose up --build

# Или напрямую
docker build -t ai-email-generator .
docker run -p 3000:3000 --env-file .env.local ai-email-generator
```

Образ использует `output: 'standalone'` — минимальный финальный размер.

## Деплой на Vercel

1. Запушь код в GitHub-репозиторий
2. [vercel.com](https://vercel.com) → **New Project** → импортируй репозиторий
3. В **Environment Variables** добавь все переменные из `.env.local` (`AI_PROVIDER=anthropic`)
4. **Deploy**
5. После деплоя в Supabase: **Authentication → URL Configuration** → добавь прод-домен в **Site URL** и **Redirect URLs**

## Принятые решения

### Стек

Next.js 14 App Router выбран за Server Components и Server Actions — Supabase-клиент и AI-ключи остаются строго на сервере без отдельного backend. Supabase даёт auth, PostgreSQL и RLS «из коробки». shadcn/ui — копируемые компоненты, а не библиотека, что даёт полный контроль над стилями без vendor lock-in.

### AI-слой

Построен на интерфейсе `EmailProvider` с фабрикой `getEmailProvider()`. Переключение `mock ↔ anthropic` через переменную окружения без изменений в коде приложения. Добавление нового провайдера — один новый файл и одна ветка в фабрике.

### Монетизация

Mock-checkout меняет `profiles.plan` напрямую через Server Action. Stripe подключается без переписывания UI: action заменяется созданием Checkout Session, webhook обновляет план по событию `checkout.session.completed`. Детальная инструкция — в `CLAUDE.md`.

### Обработка ошибок

Трёхуровневая защита: `error.tsx` на уровне каждого роута (error boundary) → `normalizeError()` преобразует системные ошибки (сетевые, JWT, RLS, AI, rate limit) в читаемый текст → toast/inline-alert на клиенте. Белых экранов нет ни при сетевых сбоях, ни при ошибках AI.
