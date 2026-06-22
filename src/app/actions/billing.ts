"use server";

import { createClient } from "@/lib/supabase/server";

export async function upgradeToPro(): Promise<{ error?: string }> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Необходима авторизация" };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ plan: "pro" })
    .eq("id", user.id);

  if (error) {
    console.error("[upgradeToPro]", error.message);
    return { error: "Не удалось обновить план. Попробуйте ещё раз." };
  }

  return {};
}
