import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/profile-form";

export const metadata = { title: "Профиль — AI Email Generator" };

export default async function ProfilePage() {
  let user = null;

  try {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user ?? null;
  } catch {
    redirect("/login");
  }

  if (!user) redirect("/login");

  const [{ data: profile }, { count }] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, plan")
      .eq("id", user.id)
      .single(),
    supabase
      .from("email_generations")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id),
  ]);

  return (
    <div className="container max-w-xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-bold">Профиль</h1>
      <ProfileForm
        email={user.email ?? ""}
        createdAt={user.created_at}
        plan={profile?.plan ?? "free"}
        fullName={profile?.full_name ?? ""}
        generationsCount={count ?? 0}
      />
    </div>
  );
}
