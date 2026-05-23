import camilaAvatar from "@/assets/camila-avatar.png";
import { Confetti } from "./Confetti";

type Props = {
  onViewMemories?: () => void;
  title?: string;
  subtitle?: string;
};

export function MemoriesHero({ onViewMemories, title, subtitle }: Props) {
  const handleClick = () => {
    onViewMemories?.();
    document.getElementById("recuerdos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      <Confetti count={20} />

      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-rainbow opacity-30 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-gradient-magic opacity-30 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl animate-pop-in">
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-rainbow rounded-full blur-2xl opacity-50 scale-110" />
          <img
            src={camilaAvatar}
            alt="Camila"
            className="relative w-56 h-56 sm:w-72 sm:h-72 object-contain drop-shadow-2xl animate-float"
          />
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-bold text-rainbow leading-tight mb-4 px-2">
          {title ?? "Gracias por acompañar a Camila en su día mágico 🦄✨"}
        </h1>

        <p className="text-base sm:text-lg text-foreground/80 font-medium mb-8 px-2 leading-relaxed">
          {subtitle ?? "Camila estuvo muy contenta y emocionada. Gracias por venir, por jugar, por compartir este día con nosotros y por tantos regalos tan bonitos. Será un cumpleaños que no olvidará 💖"}
        </p>

        <button
          onClick={handleClick}
          className="group relative px-8 py-4 bg-gradient-magic text-white text-lg sm:text-xl font-display font-bold rounded-full shadow-glow hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-2">
            Ver recuerdos 📸✨
          </span>
          <div className="absolute inset-0 rounded-full bg-rainbow opacity-0 group-hover:opacity-50 blur-xl transition-opacity" />
        </button>

        <div className="mt-6 text-sm text-muted-foreground animate-twinkle">
          Desliza hacia abajo ⬇️
        </div>
      </div>
    </section>
  );
}
