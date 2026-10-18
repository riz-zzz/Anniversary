"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { anniversaryConfig } from "@/config/anniversary";

// Editorial layout pattern: some photos are larger, some smaller.
const SPAN_PATTERN = [
  "md:col-span-2 md:row-span-2",
  "",
  "",
  "md:col-span-2",
  "md:row-span-2",
  "",
  "md:col-span-2",
  "",
];

export default function MemoriesGallery() {
  const photos = anniversaryConfig.photos;
  const [selected, setSelected] = useState<number | null>(null);

  const close = useCallback(() => setSelected(null), []);
  const prev = useCallback(
    () => setSelected((s) => (s === null ? null : (s - 1 + photos.length) % photos.length)),
    [photos.length]
  );
  const next = useCallback(
    () => setSelected((s) => (s === null ? null : (s + 1) % photos.length)),
    [photos.length]
  );

  // Keyboard support for the lightbox
  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, close, prev, next]);

  return (
    <section id="memories" className="paper scroll-mt-20 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <p className="text-xs tracking-[0.35em] text-rose">CHAPTER ONE</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">Our Memories</h2>
          <div className="mx-auto mt-4 flex items-center justify-center gap-3 text-sage">
            <span className="h-px w-12 bg-sage/60" />
            <span className="text-lg leading-none">&amp;</span>
            <span className="h-px w-12 bg-sage/60" />
          </div>
        </motion.div>

        <div className="grid auto-rows-[170px] grid-cols-2 gap-5 md:grid-cols-4 md:auto-rows-[200px] md:gap-8">
          {photos.map((photo, i) => {
            const tilt = ((i % 5) - 2) * 1.1; // gentle, varied rotation
            return (
              <motion.button
                key={photo.src}
                type="button"
                onClick={() => setSelected(i)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
                whileHover={{ scale: 1.02, rotate: 0 }}
                className={`polaroid group relative block h-full w-full overflow-visible text-left ${SPAN_PATTERN[i % SPAN_PATTERN.length]}`}
                style={{ rotate: `${tilt}deg` }}
                aria-label={`Open photo: ${photo.caption}`}
              >
                <span className="block h-full w-full overflow-hidden bg-blush/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="film-photo h-full w-full object-cover"
                  />
                </span>
                <span className="absolute inset-x-0 bottom-2.5 px-3 text-center font-serif text-xs italic text-brown/75 md:text-sm">
                  {photo.caption}
                  {photo.date && (
                    <span className="ml-2 not-italic text-[10px] text-brown/45">{photo.date}</span>
                  )}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* -------- Lightbox -------- */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-brown/85 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            onClick={close}
          >
            <button
              onClick={close}
              aria-label="Close photo viewer"
              className="absolute right-4 top-4 rounded-full bg-ivory/10 p-2 text-ivory transition hover:bg-ivory/25"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-ivory/10 p-2 text-ivory transition hover:bg-ivory/25 sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <motion.figure
              key={selected}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-h-[85vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos[selected].src}
                alt={photos[selected].alt}
                className="max-h-[72vh] w-auto rounded-sm object-contain shadow-soft"
              />
              <figcaption className="mt-4 text-center text-ivory">
                <span className="font-serif italic">{photos[selected].caption}</span>
                {photos[selected].date && (
                  <span className="ml-2 text-sm text-ivory/60">{photos[selected].date}</span>
                )}
                <span className="mt-1 block text-xs tracking-widest text-ivory/50">
                  {selected + 1} / {photos.length}
                </span>
              </figcaption>
            </motion.figure>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-ivory/10 p-2 text-ivory transition hover:bg-ivory/25 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
