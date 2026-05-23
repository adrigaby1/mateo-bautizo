import mateoAvatar from "@/assets/mateo-avatar.png";

interface HeroProps {
  onEnter: () => void;
  entered?: boolean;
}

export function Hero({ onEnter, entered }: HeroProps) {
  return (
    <section
      className={`relative flex flex-col items-center px-4 sm:px-8 transition-all duration-700 ease-out ${
        entered
          ? "min-h-[100svh] justify-center py-12 sm:py-16 opacity-100"
          : "min-h-[100svh] h-auto justify-center overflow-y-auto hero-initial"
      }`}
      style={
        !entered
          ? {
              paddingTop: "clamp(16px, 3vh, 48px)",
              paddingBottom: "clamp(32px, 6vh, 96px)",
            }
          : undefined
      }
    >
      {/* Mediterranean glow */}
      <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-gradient-sea opacity-[0.14] blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-32 -right-32 w-[32rem] h-[32rem] rounded-full bg-gradient-gold opacity-[0.22] blur-3xl pointer-events-none -z-10" />

      {/* Soft animated wave at bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full h-24 sm:h-32 opacity-60 animate-wave pointer-events-none -z-10"
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

      <div
        className={`relative z-10 flex flex-col items-center text-center max-w-2xl w-full ${
          entered ? "gap-6 sm:gap-8" : ""
        }`}
        style={!entered ? { gap: "clamp(8px, 1.6vh, 18px)" } : undefined}
      >
        <div className="relative flex items-center justify-center reveal-up shrink-0">
          {/* radial blur halo - integrates avatar with background */}
          <div
            className="absolute w-[40rem] h-[40rem] sm:w-[52rem] sm:h-[52rem] rounded-full opacity-80 blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, oklch(0.95 0.04 80 / 0.85) 0%, oklch(0.92 0.035 230 / 0.55) 40%, transparent 72%)",
            }}
          />
          {/* warm dorado glow */}
          <div className="absolute w-[36rem] h-[36rem] sm:w-[44rem] sm:h-[44rem] rounded-full bg-gold-soft opacity-30 blur-[120px] pointer-events-none" />
          <img
            src={mateoAvatar}
            alt="Mateo - Bautizo y 1er cumpleaños"
            className="relative object-contain animate-soft-float rounded-full max-w-[92vw] w-auto h-auto"
            style={{
              maxHeight: "min(34vh, 240px)",
              filter:
                "drop-shadow(0 28px 40px rgba(45,86,113,0.18)) drop-shadow(0 6px 12px rgba(221,190,135,0.25))",
            }}
          />
          <style>{`
            @media (min-width: 640px) { .hero-initial img.animate-soft-float, section img.animate-soft-float { max-height: min(32vh, 260px) !important; } }
            @media (min-width: 1024px) { .hero-initial img.animate-soft-float, section img.animate-soft-float { max-height: min(34vh, 300px) !important; } }
          `}</style>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur border border-gold-soft/40 text-[10px] sm:text-xs font-display tracking-[0.22em] uppercase text-foreground/60 reveal-up delay-1 shrink-0">
          Bautizo · 1er Cumpleaños
        </div>

        <h1
          className="font-display font-semibold leading-[1.1] px-2 reveal-up delay-2 shrink-0"
          style={{ fontSize: "clamp(1.6rem, 5vw, 2.75rem)" }}
        >
          <span className="block text-sea-muted font-medium">Mateo celebra su</span>
          <span className="block text-gold-warm font-bold mt-1">Bautizo</span>
          <span className="block text-sea-muted font-light tracking-wide my-0.5" style={{ fontSize: "clamp(1.1rem, 3.5vw, 1.75rem)" }}>y su</span>
          <span className="block text-olive-soft font-bold">1<sup className="text-base align-super">er</sup> cumpleaños</span>
        </h1>

        <p className="text-sm sm:text-base lg:text-lg text-foreground/65 font-normal max-w-md leading-snug sm:leading-relaxed reveal-up delay-3 line-clamp-2 shrink-0">
          Nos haría muchísima ilusión compartir este día tan especial contigo
        </p>

        <button
          onClick={onEnter}
          className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-sea text-white text-sm sm:text-base lg:text-lg font-display font-semibold tracking-wide rounded-full shadow-soft hover:shadow-glow hover:scale-[1.03] active:scale-95 transition-all duration-500 reveal-up delay-3 shrink-0 mb-5"
        >
          <span className="relative z-10 flex items-center gap-2">
            Entrar a la invitación
          </span>
          <div className="absolute inset-0 rounded-full bg-gradient-gold opacity-0 group-hover:opacity-30 blur-xl transition-opacity" />
        </button>

        {entered && (
          <div className="text-[11px] sm:text-xs text-muted-foreground tracking-[0.2em] uppercase font-display">
            Desliza hacia abajo
          </div>
        )}
      </div>
    </section>
  );
}
