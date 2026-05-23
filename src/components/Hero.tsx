import mateoAvatar from "@/assets/mateo-avatar.png";

interface HeroProps {
  onEnter: () => void;
}

export function Hero({ onEnter }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* Mediterranean glow */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-gradient-sea opacity-25 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-gradient-gold opacity-30 blur-3xl" />

      {/* Soft animated wave at bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full h-32 sm:h-40 opacity-60 animate-wave pointer-events-none"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,120 C320,200 720,40 1440,120 L1440,200 L0,200 Z"
          fill="url(#waveGrad)"
        />
        <defs>
          <linearGradient id="waveGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.08 220)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.62 0.10 220)" stopOpacity="0.85" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl animate-pop-in">
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-gradient-gold rounded-full blur-3xl opacity-60 scale-110" />
          <img
            src={mateoAvatar}
            alt="Mateo - Bautizo y 1er cumpleaños"
            className="relative w-72 h-72 sm:w-96 sm:h-96 object-contain drop-shadow-2xl animate-float animate-fade-in"
          />
        </div>

        <div className="mb-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur border border-gold-soft/50 text-xs sm:text-sm font-display tracking-widest uppercase text-foreground/70">
          ⛪ Bautizo + 1er Cumpleaños ✨
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-bold text-sea-gradient leading-tight mb-4 px-2">
          Mateo celebra su Bautizo y 1<sup>er</sup> cumpleaños ✨
        </h1>

        <p className="text-base sm:text-xl text-foreground/75 font-medium mb-8 max-w-xl">
          Nos haría muchísima ilusión compartir este día tan especial contigo
        </p>

        <button
          onClick={onEnter}
          className="group relative px-10 py-5 bg-gradient-sea text-white text-lg sm:text-xl font-display font-bold rounded-full shadow-glow hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-2">
            Entrar a la invitación ✨
          </span>
          <div className="absolute inset-0 rounded-full bg-gradient-gold opacity-0 group-hover:opacity-40 blur-xl transition-opacity" />
        </button>

        <div className="mt-8 text-xs sm:text-sm text-muted-foreground animate-twinkle">
          Desliza hacia abajo ⬇️
        </div>
      </div>
    </section>
  );
}
