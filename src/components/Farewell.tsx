import mateoAvatar from "@/assets/mateo-avatar.png";

export function Farewell({ lang = "es" }: { lang?: "es" | "en" }) {
  const t = {
    title: lang === "en"
      ? "Thank you for being part of Mateo's special day 🌊"
      : "Mateo te espera frente al mar 🌊",
    body: lang === "en"
      ? "With love from Mateo and family 🤍"
      : "Será un día luminoso, lleno de alegría y de cariño. Gracias por formar parte.",
    location: lang === "en" ? "View location 📍" : "Ver ubicación 📍",
    confirm: lang === "en" ? "Confirm attendance ✨" : "Confirmar asistencia ✨",
    footer: lang === "en"
      ? "Mateo · Baptism + 1st birthday · Marbella 2026"
      : null,
  };
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
          className="w-56 h-56 sm:w-64 sm:h-64 mx-auto mb-6 object-contain rounded-full animate-soft-float"
          style={{ filter: "drop-shadow(0 22px 36px rgba(45,86,113,0.20)) drop-shadow(0 6px 12px rgba(221,190,135,0.25))" }}
        />
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-sea-muted mb-4 leading-tight">
          {t.title}
        </h2>
        <p className="text-foreground/65 mb-8 max-w-md mx-auto">
          {t.body}
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
            {t.location}
          </button>
          <button
            onClick={() => scrollTo("rsvp")}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-sea text-white text-base font-display font-bold rounded-full shadow-glow hover:scale-105 active:scale-95 transition-all"
          >
            {t.confirm}
          </button>
        </div>

        <div className="mt-12 text-sm text-foreground/50 font-display">
          {lang === "en" ? (
            <>Mateo · Baptism + 1<sup>st</sup> birthday · Marbella 2026</>
          ) : (
            <>Mateo · Bautizo + 1<sup>er</sup> cumpleaños · Marbella 2026</>
          )}
        </div>
      </div>
    </section>
  );
}
