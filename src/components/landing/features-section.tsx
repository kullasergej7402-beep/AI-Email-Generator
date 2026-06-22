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

const features = [
  {
    icon: Clock,
    title: "Экономия времени",
    description: "Письмо, которое раньше занимало 20 минут, теперь готово за 10 секунд.",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-100 dark:bg-violet-950",
    glow: "hover:shadow-violet-500/10",
  },
  {
    icon: MessageSquare,
    title: "Разные тоны",
    description: "Формальный, дружелюбный, нейтральный, убедительный — выбери подходящий стиль.",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-950",
    glow: "hover:shadow-blue-500/10",
  },
  {
    icon: AlignLeft,
    title: "Любая длина",
    description: "Короткая заметка, средний follow-up или развёрнутое коммерческое предложение.",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-100 dark:bg-indigo-950",
    glow: "hover:shadow-indigo-500/10",
  },
  {
    icon: History,
    title: "История генераций",
    description: "Все письма сохраняются в личном кабинете — найди и переиспользуй лучшее.",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-950",
    glow: "hover:shadow-amber-500/10",
  },
  {
    icon: Shield,
    title: "Безопасность данных",
    description: "Твои данные защищены. Мы не передаём содержимое писем третьим лицам.",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-950",
    glow: "hover:shadow-emerald-500/10",
  },
  {
    icon: Zap,
    title: "Мгновенный результат",
    description: "Никаких очередей и загрузок — AI отвечает в реальном времени.",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-100 dark:bg-rose-950",
    glow: "hover:shadow-rose-500/10",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container max-w-screen-xl px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400"
          >
            Преимущества
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Всё, что нужно для идеального письма
          </motion.h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description, color, bg, glow }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className={`group rounded-2xl border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl ${glow}`}
            >
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${bg} transition-transform duration-300 group-hover:scale-110`}>
                <Icon className={`h-6 w-6 ${color}`} />
              </div>
              <h3 className="mb-2 text-base font-semibold">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
