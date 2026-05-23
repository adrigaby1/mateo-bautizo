import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export type MusicPlayerHandle = {
  tryPlay: () => void;
};

export const MusicPlayer = forwardRef<MusicPlayerHandle>(function MusicPlayer(_, ref) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      a.volume = 0.5;
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
      <audio ref={audioRef} src="/music/birthday-music.mp3" loop preload="auto" />
      <button
        onClick={toggle}
        aria-label={playing ? "Pausar música" : "Reproducir música"}
        style={{ bottom: "24px", left: "20px" }}
        className={`fixed z-[100] flex items-center gap-2 pl-3 pr-4 py-3 rounded-full bg-gradient-magic text-white font-display text-sm shadow-glow hover:scale-105 active:scale-95 transition-all ${
          !playing ? "animate-pulse-soft" : ""
        }`}
      >
        <span className="text-xl leading-none">{playing ? "⏸️" : "🎵"}</span>
        <span className="whitespace-nowrap">
          {playing ? "Pausar" : "Toca para música"}
        </span>
      </button>
    </>
  );
});
