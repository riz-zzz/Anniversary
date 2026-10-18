"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Flower2 } from "lucide-react";
import { anniversaryConfig } from "@/config/anniversary";

const PETALS = 6;

function FlowerSvg({ bloomed }: { bloomed: boolean }) {
  const reduce = useReducedMotion();

  const grow = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { scale: 0, opacity: 0 },
          animate: bloomed ? { scale: 1, opacity: 1 } : {},
          transition: { delay, type: "spring" as const, stiffness: 55, damping: 12 },
        };

  return (
    <svg viewBox="0 0 200 340" className="h-72 w-44 md:h-96 md:w-56" role="img" aria-label="A blooming flower illustration">
      {/* Stem */}
      <motion.path
        d="M100 330 C 96 270, 106 220, 100 130"
        fill="none"
        stroke="#A6AD96"
        strokeWidth="4"
        strokeLinecap="round"
        {...(reduce
          ? {}
          : {
              initial: { pathLength: 0 },
              animate: bloomed ? { pathLength: 1 } : {},
              transition: { duration: 1.1, ease: "easeInOut" },
            })}
      />

      {/* Leaves */}
      <motion.path
        d="M100 260 C 78 254, 62 236, 64 214 C 88 218, 100 238, 100 260 Z"
        fill="#A6AD96"
        opacity={0.85}
        {...grow(0.5)}
        style={{ transformOrigin: "100px 260px" }}
      />
      <motion.path
        d="M100 220 C 122 214, 138 196, 136 174 C 112 178, 100 198, 100 220 Z"
        fill="#A6AD96"
        opacity={0.7}
        {...grow(0.7)}
        style={{ transformOrigin: "100px 220px" }}
      />

      {/* Petals */}
      {Array.from({ length: PETALS }).map((_, i) => (
        <motion.ellipse
          key={i}
          cx={100}
          cy={76}
          rx={17}
          ry={36}
          fill="#E8C9C4"
          stroke="#B77C83"
          strokeWidth={1.4}
          {...grow(0.9 + i * 0.16)}
          style={{ transformOrigin: "100px 110px", rotate: i * (360 / PETALS) }}
        />
      ))}

      {/* Center */}
      <motion.circle
        cx={100}
        cy={110}
        r={13}
        fill="#B77C83"
        {...grow(1.8)}
        style={{ transformOrigin: "100px 110px" }}
      />
    </svg>
  );
}

export default function FlowerBloom() {
  const cfg = anniversaryConfig.flowers;
  const [bloomed, setBloomed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  return (
    <section id="flowers" className="scroll-mt-20 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.35em] text-rose">CHAPTER THREE</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">{cfg.title}</h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-brown/70">
            {cfg.intro}
          </p>
        </motion.div>

        {/* Bloom starts when the section scrolls into view */}
        <motion.div
          className="mt-10 flex justify-center"
          onViewportEnter={() => setBloomed(true)}
          viewport={{ once: true, margin: "-100px" }}
        >
          <FlowerSvg bloomed={bloomed} />
        </motion.div>

        <div className="mt-8">
          <button
            onClick={() => setShowMessage((s) => !s)}
            className="inline-flex items-center gap-2 rounded-full border border-rose/50 px-5 py-2 text-sm text-brown transition hover:bg-blush/50"
            aria-expanded={showMessage}
          >
            <Flower2 className="h-4 w-4 text-rose" />
            {cfg.button}
          </button>

          <AnimatePresence>
            {showMessage && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
                className="paper mx-auto mt-6 max-w-md rounded-lg border border-brown/10 p-6 font-serif italic leading-relaxed text-brown/80 shadow-card"
              >
                {cfg.hiddenMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
