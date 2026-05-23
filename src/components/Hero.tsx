import camilaAvatar from "@/assets/camila-avatar.png";
import { Confetti } from "./Confetti";

interface HeroProps {
  onEnter: () => void;
}

export function Hero({ onEnter }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      <Confetti count={25} />

      {/* Decorative rainbow arc */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-rainbow opacity-30 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-gradient-magic opacity-30 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl animate-pop-in">
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-rainbow rounded-full blur-2xl opacity-50 scale-110" />
          <img
            src={camilaAvatar}
            alt="Camila - 3 años"
            className="relative w-64 h-64 sm:w-80 sm:h-80 object-contain drop-shadow-2xl animate-float"
          />
        </div>

        <h1 className="font-display text-4xl sm:text-6xl font-bold text-rainbow leading-tight mb-3 px-2">
          ¡Estás invitado al cumpleaños de Camila!
        </h1>

        <p className="text-lg sm:text-2xl text-foreground/80 font-medium mb-8">
          Ven a celebrar sus 3 añitos 🎉🦄
        </p>

        <button
          onClick={onEnter}
          className="group relative px-10 py-5 bg-gradient-magic text-white text-xl sm:text-2xl font-display font-bold rounded-full shadow-glow hover:scale-110 active:scale-95 transition-all duration-300 animate-wiggle"
        >
          <span className="relative z-10 flex items-center gap-3">
            ✨ Entrar a la invitación ✨
          </span>
          <div className="absolute inset-0 rounded-full bg-rainbow opacity-0 group-hover:opacity-50 blur-xl transition-opacity" />
        </button>

        <div className="mt-8 text-sm text-muted-foreground animate-twinkle">
          Desliza hacia abajo ⬇️
        </div>
      </div>
    </section>
  );
}
