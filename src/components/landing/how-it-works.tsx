"use client";

import { motion } from "framer-motion";
import { FileText, SlidersHorizontal, Sparkles } from "lucide-react";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Введи тему письма",
    description: "Напиши, о чём должно быть письмо: договор, знакомство, предложение о сотрудничестве — любой контекст.",
  },
  {
    icon: SlidersHorizontal,
    step: "02",
    title: "Выбери тон и длину",
    description: "Формальный или дружелюбный? Краткое или развёрнутое? Настрой письмо под ситуацию одним кликом.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Получи готовое письмо",
    description: "AI генерирует уникальный текст за секунды. Копируй, редактируй или сохраняй в историю.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden border-t py-24 md:py-32">
      {/* Background gradient */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-violet-50/60 via-transparent to-transparent dark:from-violet-950/20" />

      <div className="container max-w-screen-xl px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400"
          >
            Как это работает
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Три шага до готового письма
          </motion.h2>
        </div>

        <div className="relative grid gap-10 md:grid-cols-3">
          {/* Connector line */}
          <div
            aria-hidden
            className="absolute left-1/2 top-12 hidden h-px w-[calc(66%-4rem)] -translate-x-1/2 bg-gradient-to-r from-violet-300 via-indigo-300 to-violet-300 dark:from-violet-700 dark:via-indigo-700 dark:to-violet-700 md:block"
          />

          {steps.map(({ icon: Icon, step, title, description }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-violet-100 bg-white shadow-lg shadow-violet-100 dark:border-violet-900 dark:bg-zinc-900 dark:shadow-violet-900/30">
                  <Icon className="h-9 w-9 text-violet-600 dark:text-violet-400" />
                </div>
                <span className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-xs font-bold text-white shadow-md shadow-violet-500/40">
                  {step}
                </span>
              </div>
              <h3 className="mb-2.5 text-lg font-semibold">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
