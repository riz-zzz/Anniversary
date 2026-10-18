"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { anniversaryConfig } from "@/config/anniversary";

export default function ClosingMessage() {
  const cfg = anniversaryConfig.closing;
  const { senderName, anniversaryDate } = anniversaryConfig;

  const backToStart = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="paper px-4 py-24 text-center sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-xl"
      >
        {/* Small flower ornament */}
        <svg aria-hidden="true" viewBox="0 0 40 40" className="mx-auto h-12 w-12 text-sage" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M20 36 V 20" strokeLinecap="round" />
          <path d="M20 28 C 14 26, 9 20, 11 13 C 18 15, 21 21, 20 28 Z" />
          <path d="M20 24 C 26 22, 31 16, 29 9 C 22 11, 19 17, 20 24 Z" />
          <circle cx="20" cy="12" r="3.5" className="text-rose" stroke="currentColor" />
        </svg>

        <p className="mt-6 font-serif text-2xl italic leading-relaxed text-brown/85 md:text-3xl">
          {cfg.message}
        </p>

        <p className="mt-6 font-serif text-xl text-brown">— {senderName}</p>
        {anniversaryDate && <p className="mt-1 text-xs text-brown/50">{anniversaryDate}</p>}

        <button
          onClick={backToStart}
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-brown/25 px-6 py-2.5 text-sm text-brown transition hover:border-rose hover:bg-blush/40"
        >
          <ArrowUp className="h-4 w-4" />
          {cfg.button}
        </button>
      </motion.div>
    </section>
  );
}
