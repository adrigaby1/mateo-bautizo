import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export type MusicPlayerHandle = {
  tryPlay: () => void;
};

export const MusicPlayer = forwardRef<MusicPlayerHandle, { lang?: "es" | "en"; visible?: boolean }>(function MusicPlayer({ lang = "es", visible = true }, ref) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const labels = lang === "en"
    ? { play: "Play music", pause: "Pause music", on: "Pause", off: "Music" }
    : { play: "Reproducir música", pause: "Pausar música", on: "Pausar", off: "Música" };

  const play = async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      a.volume = 0.25;
      await a.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const pause = () => {
    audioRef.current?.pause();
    setPlaying(false);
  };

  useImperativeHandle(ref, () => ({
    tryPlay: () => {
      void play();
    },
  }));

  const toggle = () => {
    if (playing) pause();
    else void play();
  };

  return (
    <>
      <audio ref={audioRef} src="/music/mateo-music.mp3" loop preload="auto" />
      <button
        onClick={toggle}
        aria-label={playing ? labels.pause : labels.play}
        className={`fixed z-[100] bottom-[18px] left-4 sm:bottom-6 sm:left-6 flex items-center gap-2 pl-3 pr-4 py-3 rounded-full bg-gradient-magic text-white font-display text-sm shadow-glow hover:scale-105 active:scale-95 transition-all ${
          !playing ? "animate-pulse-soft" : ""
        }`}
      >
        <span className="text-xl leading-none">{playing ? "⏸️" : "🎵"}</span>
        <span className="whitespace-nowrap">
          {playing ? labels.on : labels.off}
        </span>
      </button>
    </>
  );
});
