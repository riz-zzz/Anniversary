"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MailOpen, Heart } from "lucide-react";
import { anniversaryConfig } from "@/config/anniversary";

export default function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const cfg = anniversaryConfig.envelope;

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    // Let the flap + letter animation finish, then swap to the main experience.
    window.setTimeout(onOpen, 1500);
  };

  return (
    <div className="paper flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <p className="text-xs tracking-[0.35em] text-rose">{cfg.label}</p>

        <h1 className="mt-5 max-w-xl font-serif text-4xl leading-snug md:text-5xl">
          {cfg.title}
        </h1>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-brown/70 md:text-base">
          {cfg.intro}
        </p>

        {/* ---- Envelope ---- */}
        <div className="relative mt-12 h-[240px] w-[320px] sm:w-[400px]" style={{ perspective: 900 }}>
          {/* Letter card inside (rises out of the envelope) */}
          <motion.div
            className="absolute inset-x-5 top-1 bottom-4 z-10 rounded-md border border-brown/10 bg-[#fdfbf6] p-4 shadow-card"
            initial={false}
            animate={opening ? { y: -80 } : { y: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut", delay: 0.25 }}
          >
            <div className="flex h-full flex-col items-center justify-center gap-2 px-2">
              <Heart className="h-5 w-5 text-rose" fill="currentColor" strokeWidth={0} />
              <p className="font-serif text-lg italic text-brown/80">
                for {anniversaryConfig.recipientName}
              </p>
              <div className="mt-1 h-px w-16 bg-blush" />
            </div>
          </motion.div>

          {/* Envelope body */}
          <div className="absolute inset-0 z-20 overflow-hidden rounded-lg border border-brown/15 shadow-soft">
            {/* Inner pocket */}
            <div
              className="absolute inset-0 bg-[#e3bdb7]"
              style={{ clipPath: "polygon(0 0, 50% 52%, 100% 0, 100% 100%, 0 100%)" }}
            />
            {/* Side folds */}
            <div
              className="absolute inset-0 bg-blush"
              style={{ clipPath: "polygon(0 0, 50% 52%, 0 100%)" }}
            />
            <div
              className="absolute inset-0 bg-blush"
              style={{ clipPath: "polygon(100% 0, 50% 52%, 100% 100%)" }}
            />
          </div>

          {/* Flap (opens upward) */}
          <motion.div
            className="absolute inset-x-0 top-0 z-30 h-[52%] rounded-t-lg bg-rose/95"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transformOrigin: "top center",
            }}
            initial={false}
            animate={opening ? { rotateX: 180, zIndex: 5 } : { rotateX: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory shadow-sm">
                <Heart className="h-4 w-4 text-rose" fill="currentColor" strokeWidth={0} />
              </span>
            </div>
          </motion.div>
        </div>

        <motion.button
          onClick={handleOpen}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-12 inline-flex items-center gap-2 rounded-full bg-brown px-7 py-3 text-sm font-medium tracking-wide text-ivory shadow-soft transition-colors hover:bg-rose"
          aria-label="Open the letter and enter"
        >
          <MailOpen className="h-4 w-4" />
          {cfg.button}
        </motion.button>

        <p className="mt-10 text-xs text-brown/50">{cfg.footer}</p>
      </motion.div>
    </div>
  );
}
