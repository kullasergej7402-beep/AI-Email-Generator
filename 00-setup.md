# Фаза 0 — Скелет проекта и конвенции

**Предпосылки:** пустая папка / новый репозиторий.
**После фазы:** проект стартует, есть `CLAUDE.md`, тема, shadcn/ui, клиенты Supabase и схема БД. Сделай commit после каждого промпта.

---

## Промпт 0.1 — Инициализация + CLAUDE.md

```
Создай новый проект — AI Email Generator (MVP для тестового задания).

Стек: Next.js 14 (App Router) + TypeScript (strict) + Tailwind CSS + shadcn/ui + Supabase + Anthropic API.

Сделай:
1. Инициализируй Next.js 14 с App Router, TypeScript, Tailwind, ESLint, путь импорта "@/*".
2. Заведи структуру каталогов:
   - src/app — роуты (App Router)
   - src/components/ui — shadcn-компоненты
   - src/components — собственные компоненты
   - src/lib — клиенты и утилиты (supabase, ai, utils)
   - src/types — общие типы
   - supabase — миграции SQL
3. Создай файл CLAUDE.md в корне с конвенциями проекта, чтобы я мог ссылаться на него в следующих шагах. В CLAUDE.md опиши:
   - стек и версии
   - структуру папок
   - правила: server components по умолчанию, "use client" только где нужно; никаких any; все async-границы обёрнуты в try/catch; пользователю всегда показываем человекочитаемую ошибку, не белый экран; компоненты маленькие и переиспользуемые
   - именование: PascalCase для компонентов, kebab-case для файлов роутов
   - где лежат переменные окружения и что каждая значит
4. Создай .env.example со всеми нужными переменными (Supabase URL/anon key, ANTHROPIC_API_KEY, AI_PROVIDER=mock|anthropic) и .env.local с теми же ключами-заглушками.
5. Создай README.md с заголовком и разделом "Локальный запуск" (пока кратко, допишем в конце).

Не пиши пока бизнес-логику. Только скелет, конфиги и CLAUDE.md. В конце покажи дерево проекта и убедись, что `npm run dev` стартует.
```

---

## Промпт 0.2 — shadcn/ui, тема, базовый layout

```
Опираясь на CLAUDE.md:

1. Инициализируй shadcn/ui (стиль "new-york", base color neutral) и добавь компоненты, которые понадобятся дальше: button, input, textarea, select, card, label, dialog, dropdown-menu, sonner (toast), skeleton, badge, tabs, separator, avatar, accordion, alert.
2. Настрой тему: поддержка светлой/тёмной (next-themes), переключатель в шапке. Подбери аккуратную нейтральную палитру с одним акцентным цветом.
3. Сделай корневой layout: шрифт (Inter через next/font), <Toaster /> от sonner, ThemeProvider.
4. Сделай общие компоненты-обёртки: SiteHeader (лого + навигация + переключатель темы + кнопки Login/Sign up или меню пользователя) и SiteFooter. Пока навигация может вести на заглушки.
5. Добавь framer-motion в зависимости (понадобится для анимаций позже).

Проверь, что всё собирается и тема переключается.
```

---

## Промпт 0.3 — Supabase: клиенты + схема БД

```
Опираясь на CLAUDE.md, настрой Supabase.

1. Установи @supabase/supabase-js и @supabase/ssr.
2. Создай в src/lib/supabase три клиента:
   - client.ts — браузерный клиент
   - server.ts — серверный клиент с cookies (App Router)
   - middleware.ts — хелпер для обновления сессии
3. Создай src/middleware.ts, который обновляет сессию Supabase на каждом запросе.
4. Создай SQL-миграцию supabase/migrations/0001_init.sql:
   - таблица profiles (id uuid PK = auth.users.id, email text, full_name text, plan text default 'free', created_at)
   - таблица email_generations (id uuid PK, user_id uuid FK -> auth.users, topic text, tone text, length text, result text, created_at)
   - триггер: при создании пользователя в auth.users автоматически создаётся строка в profiles
   - включи RLS на обеих таблицах и политики: пользователь видит/меняет только свои строки
5. В README добавь раздел "Настройка Supabase": создать проект, выполнить миграцию, куда вставить URL и anon key.

Не трогай UI. Покажи итоговый SQL и объясни политики RLS.
```
