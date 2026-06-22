"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signUp(formData: FormData) {
  const supabase = createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    if (error.message.includes("already registered")) {
      return { error: "Пользователь с таким email уже зарегистрирован." };
    }
    if (error.message.includes("Password should be")) {
      return { error: "Пароль должен быть не менее 6 символов." };
    }
    return { error: error.message };
  }

  // Email confirmation required — session is null until user clicks the link
  if (data.user && !data.session) {
    return {
      error: `Письмо с подтверждением отправлено на ${email}. Перейдите по ссылке в письме, затем войдите.`,
    };
  }

  redirect("/dashboard");
}

export async function signIn(formData: FormData) {
  const supabase = createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    if (
      error.message.includes("Invalid login credentials") ||
      error.message.includes("invalid_credentials")
    ) {
      return { error: "Неверный email или пароль." };
    }
    if (error.message.includes("Email not confirmed")) {
      return { error: "Подтвердите email перед входом." };
    }
    return { error: error.message };
  }

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}
