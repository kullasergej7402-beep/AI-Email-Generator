"use client";

import { motion } from "framer-motion";
import { FileText, SlidersHorizontal, Sparkles } from "lucide-react";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Введи тему письма",
    description:
      "Напиши, о чём должно быть письмо: договор, знакомство, предложение о сотрудничестве — любой контекст.",
  },
  {
    icon: SlidersHorizontal,
    step: "02",
    title: "Выбери тон и длину",
    description:
      "Формальный или дружелюбный? Краткое или развёрнутое? Настрой письмо под ситуацию одним кликом.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Получи готовое письмо",
    description:
      "AI генерирует уникальный текст за секунды. Копируй, редактируй или сохраняй в историю.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-t bg-muted/30 py-20 md:py-28"
    >
      <div className="container max-w-screen-xl px-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Как это работает
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Три шага до готового письма
          </h2>
        </div>

        <div className="relative grid gap-8 md:grid-cols-3">
          {/* connector line (desktop) */}
          <div
            aria-hidden
            className="absolute left-1/2 top-10 hidden h-px w-2/3 -translate-x-1/2 bg-border md:block"
          />

          {steps.map(({ icon: Icon, step, title, description }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border bg-background shadow-sm">
                <Icon className="h-8 w-8 text-primary" />
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {step}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
