import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { UserMenu } from "@/components/user-menu";
import { MobileMenu } from "@/components/mobile-menu";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/pricing", label: "Тарифы" },
];

export async function SiteHeader() {
  let user = null;
  let plan = "free";

  try {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user ?? null;

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("plan")
        .eq("id", user.id)
        .single();
      plan = profile?.plan ?? "free";
    }
  } catch {
    // если Supabase недоступен — показываем шапку без авторизации
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Mail className="h-5 w-5" />
          <span>AI Email Generator</span>
        </Link>

        <nav className="ml-8 hidden gap-6 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {user ? (
            <UserMenu email={user.email ?? ""} plan={plan} />
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>

        <div className="ml-auto flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <MobileMenu
            user={user ? { email: user.email ?? "", plan } : null}
          />
        </div>
      </div>
    </header>
  );
}
