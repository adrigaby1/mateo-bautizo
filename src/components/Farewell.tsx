import mateoAvatar from "@/assets/mateo-avatar.png";

export function Farewell() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative py-20 px-4 text-center">
      <div className="max-w-2xl mx-auto">
        <img
          src={mateoAvatar}
          alt="Mateo"
          loading="lazy"
          className="w-32 h-32 mx-auto mb-6 object-contain animate-soft-float"
          style={{ filter: "drop-shadow(0 18px 30px rgba(45,86,113,0.18))" }}
        />
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-sea-muted mb-4 leading-tight">
          Mateo te espera frente al mar 🌊
        </h2>
        <p className="text-foreground/65 mb-8 max-w-md mx-auto">
          Será un día sencillo, luminoso y lleno de cariño. Gracias por formar parte.
        </p>
        <div className="text-3xl mb-8 flex items-center justify-center gap-3">
          <span className="animate-twinkle inline-block">✨</span>
          <span className="animate-float inline-block">🐚</span>
          <span className="animate-twinkle inline-block">⭐</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollTo("ubicacion")}
            className="w-full sm:w-auto px-8 py-4 bg-white text-foreground text-base font-display font-bold rounded-full shadow-card hover:scale-105 active:scale-95 transition-all border border-gold-soft/60"
          >
            Ver ubicación 📍
          </button>
          <button
            onClick={() => scrollTo("rsvp")}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-sea text-white text-base font-display font-bold rounded-full shadow-glow hover:scale-105 active:scale-95 transition-all"
          >
            Confirmar asistencia ✨
          </button>
        </div>

        <div className="mt-12 text-sm text-foreground/50 font-display">
          Mateo · Bautizo + 1<sup>er</sup> cumpleaños · Marbella 2026
        </div>
      </div>
    </section>
  );
}
