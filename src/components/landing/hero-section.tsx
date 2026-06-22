"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">

      {/* Animated gradient orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-violet-500/25 blur-[120px] dark:bg-violet-600/20"
          style={{ animation: "float-slow 12s ease-in-out infinite" }}
        />
        <div
          className="absolute -right-40 top-10 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[100px] dark:bg-indigo-600/15"
          style={{ animation: "float-medium 10s ease-in-out infinite" }}
        />
        <div
          className="absolute -bottom-20 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-rose-400/15 blur-[100px] dark:bg-rose-500/10"
          style={{ animation: "float-fast 8s ease-in-out infinite" }}
        />
      </div>

      {/* Dot grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle,_rgba(120,80,220,0.06)_1px,_transparent_1px)] [background-size:28px_28px] dark:bg-[radial-gradient(circle,_rgba(180,140,255,0.05)_1px,_transparent_1px)]"
      />

      <div className="flex max-w-4xl flex-col items-center gap-7">

        {/* Badge */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-xs font-semibold text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
              <Sparkles className="h-3 w-3" />
              Powered by Claude AI
            </span>
          </motion.div>
        )}

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Пиши{" "}
          <span className="gradient-text">
            письма
          </span>
          {" "}за секунды с&nbsp;AI
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          Укажи тему, выбери тон и длину — Claude напишет профессиональное письмо. Никаких шаблонов, только уникальный текст под твою задачу.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30 hover:from-violet-700 hover:to-indigo-700 hover:shadow-violet-500/40 transition-all duration-300"
            asChild
          >
            <Link href="/signup">
              Попробовать бесплатно
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-2 hover:bg-violet-50 dark:hover:bg-violet-950/30" asChild>
            <a href="#how-it-works">
              Как это работает
              <ChevronDown className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>

        {/* Stats row */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex items-center gap-8 pt-2 text-sm text-muted-foreground"
          >
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-foreground">5+</span>
              <span>тонов письма</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-foreground">10 сек</span>
              <span>среднее время</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-foreground">Free</span>
              <span>без карты</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Scroll hint */}
      {mounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 flex flex-col items-center gap-1 text-muted-foreground"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
