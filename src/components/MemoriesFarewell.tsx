import camilaAvatar from "@/assets/camila-avatar.png";
import { ArrowUp } from "lucide-react";

type Props = { location?: string };

export function MemoriesFarewell({ location = "Madrid 2026" }: Props = {}) {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section className="relative py-20 px-4 text-center">
      <div className="max-w-2xl mx-auto">
        <img
          src={camilaAvatar}
          alt="Camila"
          className="w-32 h-32 mx-auto mb-6 object-contain animate-float drop-shadow-2xl"
        />
        <h2 className="font-display text-2xl sm:text-4xl font-bold text-rainbow mb-6 leading-tight">
          Gracias por hacer que Camila viviera un día lleno de magia, risas y mucho cariño 💖
        </h2>
        <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-8">
          Se fue feliz, emocionada y con el corazón lleno de recuerdos bonitos.
        </p>

        <div className="text-4xl mb-8 flex items-center justify-center gap-3">
          <span className="animate-wiggle inline-block">🦄</span>
          <span className="animate-twinkle inline-block">🌈</span>
          <span className="animate-wiggle inline-block">✨</span>
          <span className="animate-twinkle inline-block">💖</span>
        </div>

        <button
          onClick={scrollTop}
          className="px-8 py-4 bg-gradient-to-r from-sky-soft to-lilac text-foreground text-lg font-display font-bold rounded-full shadow-card hover:scale-105 active:scale-95 transition-all border-2 border-white/70 inline-flex items-center gap-2"
        >
          <ArrowUp className="w-5 h-5" />
          Volver arriba
        </button>

        <div className="mt-12 text-xs text-foreground/50 font-display">
          Camila · 3 añitos · {location} · Hecho con 💖
        </div>
      </div>
    </section>
  );
}
