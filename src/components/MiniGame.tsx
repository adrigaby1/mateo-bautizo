import { useEffect, useRef, useState } from "react";

interface Target {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
}

const EMOJIS = ["🦄", "⭐", "🌈", "✨", "💖"];
const GAME_DURATION = 30;

export function MiniGame() {
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(GAME_DURATION);
  const [targets, setTargets] = useState<Target[]>([]);
  const [finished, setFinished] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          setPlaying(false);
          setFinished(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    if (!playing) return;
    const spawner = setInterval(() => {
      setTargets((cur) => {
        if (cur.length >= 5) return cur;
        const newTarget: Target = {
          id: idRef.current++,
          x: 5 + Math.random() * 85,
          y: 5 + Math.random() * 80,
          emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
          size: 40 + Math.random() * 30,
        };
        return [...cur, newTarget];
      });
    }, 700);
    return () => clearInterval(spawner);
  }, [playing]);

  // auto-remove targets after a while
  useEffect(() => {
    if (!playing || targets.length === 0) return;
    const t = setTimeout(() => {
      setTargets((cur) => cur.slice(1));
    }, 1800);
    return () => clearTimeout(t);
  }, [targets, playing]);

  const start = () => {
    setScore(0);
    setTime(GAME_DURATION);
    setTargets([]);
    setFinished(false);
    setPlaying(true);
  };

  const hit = (id: number) => {
    setScore((s) => s + 1);
    setTargets((cur) => cur.filter((t) => t.id !== id));
  };

  return (
    <section className="relative py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-center font-display text-4xl sm:text-5xl font-bold text-rainbow mb-3">
          🎮 ¡Atrapa los unicornios!
        </h2>
        <p className="text-center text-foreground/70 mb-8">Toca todas las estrellitas y unicornios mágicos ✨</p>

        <div className="bg-card backdrop-blur-md rounded-3xl shadow-card p-4 sm:p-6 border-2 border-white/60">
          <div className="flex justify-between items-center mb-4 gap-3">
            <div className="bg-gradient-pink rounded-2xl px-4 py-2 text-white font-display font-bold shadow-soft">
              ⭐ {score}
            </div>
            <div className="bg-gradient-magic rounded-2xl px-4 py-2 text-white font-display font-bold shadow-soft">
              ⏱ {time}s
            </div>
          </div>

          <div
            ref={areaRef}
            className="relative bg-rainbow rounded-2xl overflow-hidden border-4 border-white shadow-soft"
            style={{ height: "400px" }}
          >
            {!playing && !finished && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur">
                <button
                  onClick={start}
                  className="px-8 py-4 bg-gradient-magic text-white text-xl font-display font-bold rounded-full shadow-glow hover:scale-110 active:scale-95 transition-all animate-wiggle"
                >
                  🎮 ¡Empezar a jugar!
                </button>
              </div>
            )}

            {finished && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur p-6 text-center animate-pop-in">
                <div className="text-6xl mb-3">🏆</div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-rainbow mb-2">
                  ¡Eres un súper invitado del cumple de Camila!
                </h3>
                <p className="text-lg text-foreground/70 mb-4">Conseguiste <b>{score}</b> puntos ⭐</p>
                <button
                  onClick={start}
                  className="px-6 py-3 bg-gradient-pink text-white font-display font-bold rounded-full shadow-soft hover:scale-105 transition"
                >
                  🔁 Jugar otra vez
                </button>
              </div>
            )}

            {playing &&
              targets.map((t) => (
                <button
                  key={t.id}
                  onClick={() => hit(t.id)}
                  className="absolute animate-pop-in active:scale-50 transition-transform select-none"
                  style={{
                    left: `${t.x}%`,
                    top: `${t.y}%`,
                    fontSize: `${t.size}px`,
                  }}
                >
                  {t.emoji}
                </button>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
