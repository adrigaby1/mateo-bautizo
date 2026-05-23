import { useMemo, useState } from "react";

const STARS = [
  { x: 12, y: 20, msg: "Mateo llegó para llenar nuestra vida de luz ✨" },
  { x: 78, y: 15, msg: "Su sonrisa es como el mar en calma 🌊" },
  { x: 30, y: 55, msg: "Hoy bautizamos a Mateo con todo nuestro amor 💙" },
  { x: 65, y: 65, msg: "1 año lleno de pequeñas grandes alegrías 🌟" },
  { x: 18, y: 78, msg: "Gracias por celebrar este día con nosotros 🐚" },
  { x: 85, y: 80, msg: "El mejor regalo es tenerte aquí 💛" },
];

export function MiniGame() {
  const [discovered, setDiscovered] = useState<Set<number>>(new Set());
  const [active, setActive] = useState<number | null>(null);

  const bubbles = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 26,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 8,
      })),
    []
  );

  const reveal = (i: number) => {
    setActive(i);
    setDiscovered((prev) => new Set(prev).add(i));
  };

  return (
    <section className="relative py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/70 backdrop-blur border border-gold-soft/50 text-xs font-display tracking-widest uppercase text-foreground/65 mb-3">
            Pequeña experiencia
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-sea-gradient mb-2">
            Toca las estrellas del mar
          </h2>
          <p className="text-foreground/65 text-sm sm:text-base">
            Descubre mensajitos escondidos entre las olas
          </p>
        </div>

        <div className="bg-card backdrop-blur-md rounded-3xl shadow-card p-4 sm:p-5 border border-white/70">
          <div
            className="relative rounded-2xl overflow-hidden border-2 border-white shadow-soft"
            style={{
              height: "380px",
              background:
                "linear-gradient(180deg, oklch(0.95 0.03 230) 0%, oklch(0.85 0.07 220) 60%, oklch(0.72 0.10 220) 100%)",
            }}
          >
            {/* Floating bubbles */}
            {bubbles.map((b) => (
              <span
                key={b.id}
                className="absolute bottom-0 rounded-full bg-white/40 backdrop-blur-sm pointer-events-none animate-bubble"
                style={{
                  left: `${b.left}%`,
                  width: `${b.size}px`,
                  height: `${b.size}px`,
                  animationDuration: `${b.duration}s`,
                  animationDelay: `${b.delay}s`,
                  animationIterationCount: "infinite",
                }}
              />
            ))}

            {/* Stars to discover */}
            {STARS.map((s, i) => {
              const found = discovered.has(i);
              return (
                <button
                  key={i}
                  onClick={() => reveal(i)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all ${
                    found ? "opacity-70 scale-90" : "animate-twinkle"
                  }`}
                  style={{
                    left: `${s.x}%`,
                    top: `${s.y}%`,
                    fontSize: "34px",
                    filter: "drop-shadow(0 2px 8px rgba(255,255,255,0.6))",
                  }}
                  aria-label={`Descubrir mensaje ${i + 1}`}
                >
                  {found ? "🌟" : "⭐"}
                </button>
              );
            })}

            {/* Message popup */}
            {active !== null && (
              <button
                onClick={() => setActive(null)}
                className="absolute inset-x-4 bottom-4 mx-auto max-w-md rounded-2xl bg-white/95 backdrop-blur p-4 shadow-glow text-center animate-pop-in"
              >
                <p className="font-display text-base sm:text-lg text-foreground/85 leading-snug">
                  {STARS[active].msg}
                </p>
                <span className="block mt-2 text-[11px] uppercase tracking-widest text-foreground/45">
                  toca para cerrar
                </span>
              </button>
            )}
          </div>

          <div className="mt-4 text-center text-sm font-display text-foreground/65">
            ⭐ {discovered.size} / {STARS.length} mensajes descubiertos
          </div>
        </div>
      </div>
    </section>
  );
}
