"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { anniversaryConfig } from "@/config/anniversary";
import { extractVideoId } from "@/lib/youtube";
import { pauseBackgroundMusic } from "@/lib/audioBus";

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export default function YouTubeFinale() {
  const cfg = anniversaryConfig.youtube;
  const videoId = extractVideoId(cfg.url);
  const holderRef = useRef<HTMLDivElement>(null);
  const [playerLoaded, setPlayerLoaded] = useState(false);

  /**
   * The player is created ONLY when the visitor interacts (or when the
   * section is reached and they press play). Nothing autoplays with sound,
   * and the page stays light because no iframe loads upfront.
   */
  const loadPlayer = () => {
    if (playerLoaded || !videoId || !holderRef.current) return;
    setPlayerLoaded(true);

    const createPlayer = () => {
      new window.YT.Player(holderRef.current!, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: { rel: 0, modestbranding: 1 },
        events: {
          onStateChange: (event: { data: number }) => {
            // Pause the background music the moment the video starts,
            // so the two audios never overlap. Music keeps its position;
            // the mini-player can resume it manually at any time.
            if (event.data === window.YT.PlayerState.PLAYING) {
              pauseBackgroundMusic();
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
      return;
    }

    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      createPlayer();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  };

  return (
    <section id="song" className="scroll-mt-20 bg-brown px-4 py-24 text-ivory sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.35em] text-blush">THE FINALE</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">{cfg.heading}</h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ivory/70">
            {cfg.intro}
          </p>

          <div className="mt-6 flex items-center justify-center gap-3 text-blush/70">
            <span className="h-px w-12 bg-blush/40" />
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M12 21s-7.5-4.6-9.8-9.2C.6 8.2 2.6 4.5 6.2 4.5c2 0 3.4 1.1 4.2 2.4.4.7 1.4.7 1.8 0 .8-1.3 2.2-2.4 4.2-2.4 3.6 0 5.6 3.7 4 7.3C19.5 16.4 12 21 12 21Z" />
            </svg>
            <span className="h-px w-12 bg-blush/40" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-10"
        >
          <div className="rounded-2xl border border-ivory/15 bg-ivory/5 p-2 shadow-soft">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black/40">
              {/* Placeholder until interaction — keeps the page light (lazy). */}
              {!playerLoaded && videoId && (
                <button
                  onClick={loadPlayer}
                  className="group absolute inset-0 flex h-full w-full flex-col items-center justify-center"
                  aria-label="Play the video: A Song for You"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                    alt="Video thumbnail for A Song for You"
                    className="absolute inset-0 h-full w-full object-cover opacity-60 transition group-hover:opacity-75"
                  />
                  <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-ivory/90 text-brown shadow-soft transition group-hover:scale-105">
                    <Play className="ml-1 h-7 w-7" fill="currentColor" strokeWidth={0} />
                  </span>
                  <span className="relative z-10 mt-4 text-xs tracking-[0.25em] text-ivory/90">
                    PRESS PLAY
                  </span>
                </button>
              )}

              {/* Fallback if the URL is still the placeholder / invalid */}
              {!videoId && (
                <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
                  <p className="text-sm text-ivory/80">
                    Add your video URL in{" "}
                    <code className="rounded bg-ivory/10 px-1.5 py-0.5 text-xs">
                      src/config/anniversary.ts
                    </code>
                  </p>
                  <a
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-blush underline underline-offset-4"
                  >
                    Open YouTube <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}

              {/* The API mounts the real player into this div on interaction */}
              <div ref={holderRef} className="absolute inset-0" />
            </div>
          </div>

          <p className="mt-6 font-serif text-lg italic text-ivory/85">{cfg.caption}</p>
        </motion.div>
      </div>
    </section>
  );
}
