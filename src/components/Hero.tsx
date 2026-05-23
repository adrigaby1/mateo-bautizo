import mateoAvatar from "@/assets/mateo-avatar.png";

interface HeroProps {
  onEnter: () => void;
  entered?: boolean;
}

export function Hero({ onEnter, entered }: HeroProps) {
  return (
    <section
      className={`relative flex flex-col items-center justify-center px-6 sm:px-8 py-16 transition-all duration-700 ease-out ${
        entered ? "min-h-screen opacity-100" : "h-screen overflow-hidden"
      }`}
    >
      {/* Mediterranean glow */}
      <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-gradient-sea opacity-[0.14] blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-[32rem] h-[32rem] rounded-full bg-gradient-gold opacity-[0.22] blur-3xl" />

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

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        <div className="mb-8 relative flex items-center justify-center reveal-up">
          {/* radial blur halo - integrates avatar with background */}
          <div
            className="absolute w-[40rem] h-[40rem] sm:w-[52rem] sm:h-[52rem] rounded-full opacity-80 blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, oklch(0.95 0.04 80 / 0.85) 0%, oklch(0.92 0.035 230 / 0.55) 40%, transparent 72%)",
            }}
          />
          {/* warm dorado glow */}
          <div className="absolute w-[36rem] h-[36rem] sm:w-[44rem] sm:h-[44rem] rounded-full bg-gold-soft opacity-30 blur-[120px]" />
          <img
            src={mateoAvatar}
            alt="Mateo - Bautizo y 1er cumpleaños"
            className="relative w-[36rem] h-[36rem] sm:w-[44rem] sm:h-[44rem] max-w-[92vw] max-h-[92vw] object-contain animate-soft-float rounded-full"
            style={{ filter: "drop-shadow(0 28px 40px rgba(45,86,113,0.18)) drop-shadow(0 6px 12px rgba(221,190,135,0.25))" }}
          />
        </div>

        <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur border border-gold-soft/40 text-[11px] sm:text-xs font-display tracking-[0.22em] uppercase text-foreground/60 reveal-up delay-1">
          Bautizo · 1er Cumpleaños
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-semibold leading-[1.15] mb-5 px-2 reveal-up delay-2">
          <span className="block text-sea-muted font-medium">Mateo celebra su</span>
          <span className="block text-gold-warm font-bold mt-1">Bautizo</span>
          <span className="block text-sea-muted text-2xl sm:text-3xl font-light tracking-wide my-1">y su</span>
          <span className="block text-olive-soft font-bold">1<sup className="text-base align-super">er</sup> cumpleaños</span>
        </h1>

        <p className="text-base sm:text-lg text-foreground/65 font-normal mb-10 max-w-md leading-relaxed reveal-up delay-3">
          Nos haría muchísima ilusión compartir este día tan especial contigo
        </p>

        <button
          onClick={onEnter}
          className="group relative px-10 py-5 bg-gradient-sea text-white text-base sm:text-lg font-display font-semibold tracking-wide rounded-full shadow-soft hover:shadow-glow hover:scale-[1.03] active:scale-95 transition-all duration-500 reveal-up delay-3"
        >
          <span className="relative z-10 flex items-center gap-2">
            Entrar a la invitación
          </span>
          <div className="absolute inset-0 rounded-full bg-gradient-gold opacity-0 group-hover:opacity-30 blur-xl transition-opacity" />
        </button>

        <div className="mt-10 text-[11px] sm:text-xs text-muted-foreground tracking-[0.2em] uppercase font-display">
          Desliza hacia abajo
        </div>
      </div>
    </section>
  );
}
