import { createClient } from "@/lib/supabase/server";
import { PricingCards } from "@/components/pricing-cards";

export const metadata = { title: "Тарифы — AI Email Generator" };

export default async function PricingPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let currentPlan = "free";
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single();
    currentPlan = profile?.plan ?? "free";
  }

  return (
    <div className="container max-w-screen-xl px-4 py-16">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">Тарифы</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Выберите план, который подходит вам. Изменить можно в любое время.
        </p>
      </div>
      <PricingCards isLoggedIn={!!user} currentPlan={currentPlan} />
    </div>
  );
}
