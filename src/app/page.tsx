"use client";

import { useRef, useState } from "react";
import Envelope from "@/components/Envelope";
import MainNav from "@/components/MainNav";
import MemoriesGallery from "@/components/MemoriesGallery";
import LoveLetter from "@/components/LoveLetter";
import FlowerBloom from "@/components/FlowerBloom";
import YouTubeFinale from "@/components/YouTubeFinale";
import ClosingMessage from "@/components/ClosingMessage";
import MusicPlayer from "@/components/MusicPlayer";
import { playBackgroundMusic } from "@/lib/audioBus";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setOpened(true);
    // Browsers usually allow audio after a real user gesture (this click).
    // If it is still blocked, the MusicPlayer shows a clear Play button.
    playBackgroundMusic();
    window.setTimeout(() => {
      mainRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 900);
  };

  return (
    <>
      {/* Persistent player: mounted ONCE at the root, never re-mounted,
          so the music never restarts or overlaps while exploring. */}
      <MusicPlayer />

      {!opened ? (
        <Envelope onOpen={handleOpen} />
      ) : (
        <div ref={mainRef}>
          <MainNav />
          <main>
            <MemoriesGallery />
            <LoveLetter />
            <FlowerBloom />
            <YouTubeFinale />
            <ClosingMessage />
          </main>
          <footer className="pb-28 pt-4 text-center text-xs text-brown/50">
            made with love, just for you
          </footer>
        </div>
      )}
    </>
  );
}
