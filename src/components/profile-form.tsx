"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateFullName } from "@/app/actions/profile";
import { signOut } from "@/app/actions/auth";

interface Props {
  email: string;
  createdAt: string;
  plan: string;
  fullName: string;
  generationsCount: number;
}

export function ProfileForm({
  email,
  createdAt,
  plan,
  fullName: initialName,
  generationsCount,
}: Props) {
  const [name, setName] = useState(initialName);
  const [savePending, startSave] = useTransition();
  const [logoutPending, startLogout] = useTransition();

  const isPro = plan === "pro" || plan === "business";
  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);

  const formattedDate = new Date(createdAt).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function handleSave() {
    startSave(async () => {
      const result = await updateFullName(name);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Имя сохранено");
      }
    });
  }

  function handleLogout() {
    startLogout(async () => {
      try {
        await signOut();
      } catch {
        toast.error("Не удалось выйти. Попробуйте ещё раз.");
      }
    });
  }

  return (
    <div className="space-y-4">
      {/* Account info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Аккаунт</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium">{email}</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Дата регистрации</p>
              <p className="text-sm font-medium">{formattedDate}</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Текущий план</p>
              <div className="mt-1">
                <Badge variant={isPro ? "default" : "secondary"}>
                  {planLabel}
                </Badge>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/pricing">Управление подпиской</Link>
            </Button>
          </div>

          <Separator />

          <div>
            <p className="text-xs text-muted-foreground">Сгенерировано писем</p>
            <p className="text-2xl font-bold">{generationsCount}</p>
          </div>
        </CardContent>
      </Card>

      {/* Editable name */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Личные данные</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Имя</Label>
            <div className="flex gap-2">
              <Input
                id="full_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                disabled={savePending}
                className="flex-1"
              />
              <Button
                onClick={handleSave}
                disabled={savePending || name === initialName}
                size="default"
              >
                {savePending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Сохранить"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logout */}
      <Button
        variant="destructive"
        className="w-full"
        onClick={handleLogout}
        disabled={logoutPending}
      >
        {logoutPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Выходим...
          </>
        ) : (
          "Выйти из аккаунта"
        )}
      </Button>
    </div>
  );
}
