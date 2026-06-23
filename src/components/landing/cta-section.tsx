"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container max-w-screen-xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-violet-950 to-zinc-900 px-8 py-20 text-center shadow-2xl shadow-black/30 dark:shadow-black/50"
        >
          {/* Inner glow orbs */}
          <div aria-hidden className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet-600/30 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />

          {/* Dot grid overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.08)_1px,_transparent_1px)] [background-size:24px_24px]"
          />

          <div className="relative flex flex-col items-center gap-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Готов попробовать?
            </h2>
            <p className="max-w-md text-lg text-white/75">
              Зарегистрируйся бесплатно и получи первые письма уже сегодня. Без кредитной карты, без обязательств.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="bg-white text-violet-700 hover:bg-white/90 shadow-lg font-semibold"
                asChild
              >
                <Link href="/signup">
                  Начать бесплатно
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 hover:border-white/60"
                asChild
              >
                <Link href="/login">Уже есть аккаунт</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
