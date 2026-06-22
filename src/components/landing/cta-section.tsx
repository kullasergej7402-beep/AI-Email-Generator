"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container max-w-screen-xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-2xl border bg-muted/40 px-8 py-14 text-center shadow-sm"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Готов попробовать?
          </h2>
          <p className="max-w-md text-muted-foreground">
            Зарегистрируйся бесплатно и получи первые письма уже сегодня. Без
            кредитной карты, без обязательств.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/signup">
                Начать бесплатно
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Уже есть аккаунт</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
