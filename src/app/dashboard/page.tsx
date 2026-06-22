import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EmailGeneratorPage } from "@/components/email-generator-page";
import type { HistoryItem } from "@/types/ai";

export const metadata = { title: "Dashboard — AI Email Generator" };

export default async function DashboardPage() {
  try {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const user = data.user ?? null;

    if (!user) redirect("/login");

    const { data: history } = await supabase
      .from("email_generations")
      .select("id, topic, tone, length, result, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(20);

    return (
      <EmailGeneratorPage
        email={user.email ?? ""}
        initialHistory={(history ?? []) as HistoryItem[]}
      />
    );
  } catch {
    redirect("/login");
  }
}
