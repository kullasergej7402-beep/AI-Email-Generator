"use client";

import { motion } from "framer-motion";
import {
  Clock,
  MessageSquare,
  AlignLeft,
  History,
  Shield,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Clock,
    title: "Экономия времени",
    description:
      "Письмо, которое раньше занимало 20 минут, теперь готово за 10 секунд.",
  },
  {
    icon: MessageSquare,
    title: "Разные тоны",
    description:
      "Формальный, дружелюбный, нейтральный, убедительный — выбери подходящий стиль.",
  },
  {
    icon: AlignLeft,
    title: "Любая длина",
    description:
      "Короткая заметка, средний follow-up или развёрнутое коммерческое предложение.",
  },
  {
    icon: History,
    title: "История генераций",
    description:
      "Все письма сохраняются в личном кабинете — найди и переиспользуй лучшее.",
  },
  {
    icon: Shield,
    title: "Безопасность данных",
    description:
      "Твои данные защищены. Мы не передаём содержимое писем третьим лицам.",
  },
  {
    icon: Zap,
    title: "Мгновенный результат",
    description:
      "Никаких очередей и загрузок — AI отвечает в реальном времени.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container max-w-screen-xl px-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Преимущества
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Всё, что нужно для идеального письма
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardContent className="flex flex-col gap-3 p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
