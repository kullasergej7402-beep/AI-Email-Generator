-- =============================================================
-- 0001_init.sql — начальная схема AI Email Generator
-- =============================================================

-- -----------------------------------------------------------
-- Таблица profiles
-- Создаётся автоматически для каждого нового пользователя
-- через триггер handle_new_user (см. ниже).
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  email       TEXT,
  full_name   TEXT,
  plan        TEXT NOT NULL DEFAULT 'free',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------
-- Таблица email_generations
-- Хранит историю генераций писем пользователя.
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.email_generations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  topic       TEXT NOT NULL,
  tone        TEXT NOT NULL,
  length      TEXT NOT NULL,
  result      TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------
-- Индексы для производительности
-- -----------------------------------------------------------
CREATE INDEX IF NOT EXISTS email_generations_user_id_idx
  ON public.email_generations (user_id);

CREATE INDEX IF NOT EXISTS email_generations_created_at_idx
  ON public.email_generations (user_id, created_at DESC);

-- -----------------------------------------------------------
-- Триггер: при регистрации нового пользователя создаём профиль
-- -----------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name'
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- -----------------------------------------------------------
-- Row Level Security (RLS)
-- -----------------------------------------------------------

-- profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Пользователь видит только свой профиль"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Пользователь может обновить свой профиль"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- email_generations
ALTER TABLE public.email_generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Пользователь видит только свои генерации"
  ON public.email_generations
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Пользователь может создавать генерации"
  ON public.email_generations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Пользователь может удалять свои генерации"
  ON public.email_generations
  FOR DELETE
  USING (auth.uid() = user_id);
