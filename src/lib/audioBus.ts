/**
 * A tiny shared "bus" so ANY component can talk to the single persistent
 * background-music player mounted at the root — without re-mounting it.
 *
 * The MusicPlayer registers its controls once on mount.
 * The YouTube finale calls pauseBackgroundMusic() when the video plays,
 * so the two audios never overlap.
 */

type AudioControls = {
  play: () => void;
  pause: () => void;
  resume: () => void;
};

let controls: AudioControls | null = null;

export function registerAudioControls(c: AudioControls) {
  controls = c;
  return () => {
    controls = null;
  };
}

/** Ask the background music to start (may be blocked by autoplay policy — handled in the player UI). */
export function playBackgroundMusic() {
  controls?.play();
}

/** Pause but REMEMBER the position — resume() continues where it left off. */
export function pauseBackgroundMusic() {
  controls?.pause();
}

export function resumeBackgroundMusic() {
  controls?.resume();
}
