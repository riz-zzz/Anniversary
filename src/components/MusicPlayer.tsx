"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Repeat, Volume2, Music2, Loader2, AlertCircle } from "lucide-react";
import { anniversaryConfig } from "@/config/anniversary";
import { registerAudioControls } from "@/lib/audioBus";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [blocked, setBlocked] = useState(false); // autoplay was rejected by the browser
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [loop, setLoop] = useState(true);
  const [coverOk, setCoverOk] = useState(true);

  const song = anniversaryConfig.song;

  useEffect(() => {
    // ONE persistent Audio element for the whole visit.
    const audio = new Audio(song.src);
    audio.loop = true;
    audio.volume = 0.8;
    audio.preload = "metadata";
    audioRef.current = audio;

    const onTime = () => setTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onPlay = () => {
      setPlaying(true);
      setBlocked(false);
      setLoading(false);
    };
    const onPause = () => setPlaying(false);
    const onError = () => {
      setError(true);
      setLoading(false);
    };
    const onWaiting = () => setLoading(true);
    const onCanPlay = () => setLoading(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);

    const attemptPlay = async () => {
      setLoading(true);
      try {
        await audio.play();
      } catch {
        // Browser autoplay policy rejected it — the UI shows a Play button.
        setBlocked(true);
      } finally {
        setLoading(false);
      }
    };

    // Register on the shared bus so the envelope & the YouTube finale
    // can control this exact player (single stream, position preserved).
    const unregister = registerAudioControls({
      play: attemptPlay,
      resume: attemptPlay,
      pause: () => audio.pause(),
    });

    return () => {
      unregister();
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.loop = loop;
  }, [loop]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || error) return;
    if (playing) {
      audio.pause();
    } else {
      setLoading(true);
      audio.play().catch(() => setBlocked(true));
    }
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setTime(value);
  };

  return (
    <motion.aside
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      aria-label="Background music player"
      className="fixed bottom-4 right-4 z-40 w-[calc(100vw-2rem)] max-w-[310px] rounded-2xl border border-brown/10 bg-[#fdfbf6]/95 p-3.5 shadow-soft backdrop-blur"
    >
      {error ? (
        <div className="flex items-start gap-2.5 text-brown/70">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose" />
          <p className="text-xs leading-relaxed">
            Audio file not found. Add your song at{" "}
            <code className="rounded bg-blush/40 px-1">public/audio/our-song.mp3</code>
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3">
            {/* Cover */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-blush/50">
              {coverOk ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={song.cover}
                  alt={`Album cover for ${song.title}`}
                  className="h-full w-full object-cover"
                  onError={() => setCoverOk(false)}
                />
              ) : (
                <Music2 className="h-5 w-5 text-rose" />
              )}
            </div>

            {/* Title */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-brown">{song.title}</p>
              <p className="truncate text-xs text-brown/60">{song.artist}</p>
            </div>

            {/* Play / Pause */}
            <button
              onClick={toggle}
              aria-label={playing ? "Pause music" : "Play music"}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brown text-ivory transition hover:bg-rose"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : playing ? (
                <Pause className="h-4 w-4" fill="currentColor" strokeWidth={0} />
              ) : (
                <Play className="ml-0.5 h-4 w-4" fill="currentColor" strokeWidth={0} />
              )}
            </button>
          </div>

          {/* Progress */}
          <div className="mt-3 flex items-center gap-2 text-[10px] tabular-nums text-brown/55">
            <span>{formatTime(time)}</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={time}
              onChange={(e) => seek(Number(e.target.value))}
              aria-label="Seek"
              className="h-1 flex-1 cursor-pointer accent-rose"
            />
            <span>{formatTime(duration)}</span>
          </div>

          {/* Loop + volume */}
          <div className="mt-2 flex items-center gap-3">
            <button
              onClick={() => setLoop((l) => !l)}
              aria-pressed={loop}
              aria-label={loop ? "Turn loop off" : "Turn loop on"}
              className={`rounded-full p-1.5 transition ${
                loop ? "bg-blush/60 text-brown" : "text-brown/45 hover:text-brown"
              }`}
            >
              <Repeat className="h-3.5 w-3.5" />
            </button>
            <div className="flex flex-1 items-center gap-2 text-brown/55">
              <Volume2 className="h-3.5 w-3.5 shrink-0" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                aria-label="Volume"
                className="h-1 flex-1 cursor-pointer accent-rose"
              />
            </div>
          </div>

          {/* Autoplay-blocked hint */}
          {blocked && !playing && (
            <p className="mt-2 rounded-md bg-blush/40 px-2 py-1.5 text-[11px] leading-snug text-brown/75">
              Your browser blocked autoplay — tap the play button to start our song.
            </p>
          )}
        </>
      )}
    </motion.aside>
  );
}
