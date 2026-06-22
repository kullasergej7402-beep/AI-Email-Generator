"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { signOut } from "@/app/actions/auth";
import { LayoutDashboard, LogOut, CreditCard, User } from "lucide-react";
import Link from "next/link";

interface UserMenuProps {
  email: string;
  plan: string;
}

export function UserMenu({ email, plan }: UserMenuProps) {
  const [pending, startTransition] = useTransition();

  const initials = email.slice(0, 2).toUpperCase();
  const isPro = plan === "pro" || plan === "business";

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 rounded-full outline-none ring-ring focus-visible:ring-2"
          aria-label="Меню пользователя"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <div className="flex items-center justify-between px-2 py-1.5">
          <p className="truncate text-xs text-muted-foreground">{email}</p>
          <Badge
            variant={isPro ? "default" : "secondary"}
            className="ml-2 shrink-0 text-xs"
          >
            {isPro ? plan.charAt(0).toUpperCase() + plan.slice(1) : "Free"}
          </Badge>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Профиль
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/pricing" className="cursor-pointer">
            <CreditCard className="mr-2 h-4 w-4" />
            Тарифы
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          disabled={pending}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {pending ? "Выходим…" : "Выйти"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
