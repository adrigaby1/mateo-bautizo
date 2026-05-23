import camilaAvatar from "@/assets/camila-avatar.png";

export function Farewell() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative py-20 px-4 text-center">
      <div className="max-w-2xl mx-auto">
        <img
          src={camilaAvatar}
          alt="Camila"
          className="w-40 h-40 mx-auto mb-6 object-contain animate-float drop-shadow-2xl"
        />
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-rainbow mb-4 leading-tight">
          ¡Camila te espera para un día mágico lleno de diversión!
        </h2>
        <div className="text-5xl mb-8 flex items-center justify-center gap-3">
          <span className="animate-wiggle inline-block">🦄</span>
          <span className="animate-twinkle inline-block">🌈</span>
          <span className="animate-wiggle inline-block">✨</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollTo("ubicacion")}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-sky-soft to-lilac text-foreground text-lg font-display font-bold rounded-full shadow-card hover:scale-105 active:scale-95 transition-all border-2 border-white/70"
          >
            Ver ubicación 📍
          </button>
          <button
            onClick={() => scrollTo("rsvp")}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-magic text-white text-lg font-display font-bold rounded-full shadow-glow hover:scale-105 active:scale-95 transition-all"
          >
            Confirmar asistencia 💌
          </button>
        </div>

        <div className="mt-12 text-sm text-foreground/50 font-display">
          Hecho con 💖 para Camila
        </div>
      </div>
    </section>
  );
}
