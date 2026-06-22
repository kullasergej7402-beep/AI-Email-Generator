"use server";

import { createClient } from "@/lib/supabase/server";

export async function updateFullName(fullName: string): Promise<{ error?: string }> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Необходима авторизация" };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName.trim() })
    .eq("id", user.id);

  if (error) {
    console.error("[updateFullName]", error.message);
    return { error: "Не удалось сохранить имя. Попробуйте ещё раз." };
  }

  return {};
}
