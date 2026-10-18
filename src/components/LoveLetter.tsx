"use client";

import { motion } from "framer-motion";
import { anniversaryConfig } from "@/config/anniversary";

export default function LoveLetter() {
  const cfg = anniversaryConfig.letter;
  const { recipientName, senderName, anniversaryDate } = anniversaryConfig;

  return (
    <section id="letter" className="scroll-mt-20 px-4 py-20 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="paper relative mx-auto max-w-2xl rounded-lg border border-brown/10 p-8 shadow-soft sm:p-12"
      >
        {/* Corner ornament */}
        <svg
          aria-hidden="true"
          viewBox="0 0 40 40"
          className="absolute right-5 top-5 h-10 w-10 text-sage/70"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M20 34 C 20 24, 20 16, 20 8" strokeLinecap="round" />
          <path d="M20 20 C 14 18, 10 12, 12 6 C 18 7, 21 13, 20 20 Z" />
          <path d="M20 24 C 26 22, 30 16, 28 10 C 22 11, 19 17, 20 24 Z" />
        </svg>

        <p className="text-center text-xs tracking-[0.35em] text-rose">CHAPTER TWO</p>
        <h2 className="mt-3 text-center font-serif text-3xl md:text-4xl">{cfg.title}</h2>

        {cfg.date && (
          <p className="mt-3 text-center text-xs text-brown/50">{cfg.date}</p>
        )}

        <div className="mx-auto mb-8 mt-6 flex items-center justify-center gap-3 text-sage">
          <span className="h-px w-10 bg-sage/50" />
          <span className="text-sm">&amp;</span>
          <span className="h-px w-10 bg-sage/50" />
        </div>

        <p className="font-serif text-lg italic text-brown/85">Dear {recipientName},</p>

        <div className="mt-5 space-y-5 font-serif text-[1.05rem] leading-relaxed text-brown/80">
          {cfg.body.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.12 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <div className="mt-10 text-right">
          <p className="font-serif italic text-brown/70">{cfg.closingLine}</p>
          <p className="mt-1 font-serif text-2xl text-brown" style={{ fontStyle: "italic" }}>
            {senderName}
          </p>
          {anniversaryDate && (
            <p className="mt-1 text-xs text-brown/50">{anniversaryDate}</p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
