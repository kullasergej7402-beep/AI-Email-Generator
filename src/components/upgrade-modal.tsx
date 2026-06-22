"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { upgradeToPro } from "@/app/actions/billing";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpgradeModal({ open, onOpenChange }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  function handleConfirm() {
    startTransition(async () => {
      const result = await upgradeToPro();
      if (result.error) {
        toast.error(result.error);
        return;
      }
      setSuccess(true);
      toast.success("Добро пожаловать в Pro!");
      setTimeout(() => {
        onOpenChange(false);
        router.push("/dashboard");
        router.refresh();
      }, 1500);
    });
  }

  function handleOpenChange(val: boolean) {
    if (pending) return;
    if (!val) setSuccess(false);
    onOpenChange(val);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Переход на Pro</DialogTitle>
          <DialogDescription>
            Это demo flow — реальные платёжные данные не собираются.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <ShieldCheck className="h-12 w-12 text-primary" />
            <p className="font-semibold">Вы на Pro!</p>
            <p className="text-sm text-muted-foreground">Переходим в Dashboard...</p>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="rounded-lg border bg-muted/40 p-4 space-y-3">
              <div className="flex items-center justify-between text-sm font-medium">
                <span>Pro план</span>
                <span>$19 / месяц</span>
              </div>
              <div className="rounded-md border border-dashed bg-background px-3 py-2.5 font-mono text-sm tracking-wider text-muted-foreground">
                •••• •••• •••• 4242
              </div>
              <p className="text-center text-xs text-muted-foreground">
                demo — не вводите реальные данные карты
              </p>
            </div>
          </div>
        )}

        {!success && (
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => handleOpenChange(false)}
              disabled={pending}
            >
              Отмена
            </Button>
            <Button onClick={handleConfirm} disabled={pending}>
              {pending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Обрабатываем...
                </>
              ) : (
                "Подтвердить"
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
