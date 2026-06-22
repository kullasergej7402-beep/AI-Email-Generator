"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X } from "lucide-react";
import { signOut } from "@/app/actions/auth";
import { toast } from "sonner";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/pricing", label: "Тарифы" },
];

interface MobileMenuProps {
  user: { email: string; plan: string } | null;
}

export function MobileMenu({ user }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const isPro = user?.plan === "pro" || user?.plan === "business";

  function handleSignOut() {
    startTransition(async () => {
      try {
        await signOut();
      } catch {
        toast.error("Не удалось выйти. Попробуйте ещё раз.");
      }
    });
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle menu"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open && (
        <div className="absolute left-0 right-0 top-14 z-50 border-t bg-background px-4 pb-4 shadow-md">
          <nav className="flex flex-col gap-1 pt-3">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="mt-3 flex flex-col gap-2 border-t pt-3">
            {user ? (
              <>
                <div className="flex items-center justify-between px-3">
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                  <Badge variant={isPro ? "default" : "secondary"} className="text-xs">
                    {isPro
                      ? user.plan.charAt(0).toUpperCase() + user.plan.slice(1)
                      : "Free"}
                  </Badge>
                </div>
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleSignOut}
                  disabled={pending}
                >
                  {pending ? "Выходим…" : "Выйти"}
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/login" onClick={() => setOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/signup" onClick={() => setOpen(false)}>
                    Sign up
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
