"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UpgradeModal } from "@/components/upgrade-modal";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "Для личного использования",
    features: [
      "10 генераций/месяц",
      "Тоны: официальный, профессиональный",
      "История на 7 дней",
      "Копирование в буфер обмена",
    ],
    popular: false,
    cta: "Начать бесплатно",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19",
    description: "Для профессионалов",
    features: [
      "Неограниченные генерации",
      "Все 5 тонов письма",
      "История на 90 дней",
      "Приоритетная поддержка",
      "Ранний доступ к новинкам",
    ],
    popular: true,
    cta: "Перейти на Pro",
  },
  {
    id: "business",
    name: "Business",
    price: "$49",
    description: "Для команд",
    features: [
      "Всё из Pro",
      "API-доступ",
      "Кастомные шаблоны",
      "До 5 пользователей",
      "SLA-поддержка 24/7",
    ],
    popular: false,
    cta: "Написать нам",
  },
] as const;

type PlanId = (typeof PLANS)[number]["id"];

interface Props {
  isLoggedIn: boolean;
  currentPlan: string;
}

export function PricingCards({ isLoggedIn, currentPlan }: Props) {
  const router = useRouter();
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  function handleCta(planId: PlanId) {
    if (currentPlan === planId) return;

    if (planId === "business") {
      window.location.href = "mailto:hello@example.com";
      return;
    }

    if (!isLoggedIn) {
      router.push("/signup");
      return;
    }

    if (planId === "pro") {
      setUpgradeOpen(true);
    }
  }

  function getCtaLabel(plan: (typeof PLANS)[number]) {
    if (currentPlan === plan.id) return "Текущий план";
    return plan.cta;
  }

  return (
    <>
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        {PLANS.map((plan, i) => {
          const isCurrent = currentPlan === plan.id;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
            <Card
              className={cn(
                "relative flex h-full flex-col",
                plan.popular && "border-primary shadow-lg shadow-primary/10"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge className="px-3 py-1 text-xs">Популярный</Badge>
                </div>
              )}

              <CardHeader className="pb-4">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="pt-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">/месяц</span>
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  disabled={isCurrent}
                  onClick={() => handleCta(plan.id)}
                >
                  {getCtaLabel(plan)}
                </Button>
              </CardFooter>
            </Card>
            </motion.div>
          );
        })}
      </div>

      <UpgradeModal open={upgradeOpen} onOpenChange={setUpgradeOpen} />
    </>
  );
}
