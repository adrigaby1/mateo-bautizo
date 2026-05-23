import { CountdownMalaga } from "./CountdownMalaga";

export function EventDetailsMalaga() {
  const placeName = "Málaga";
  const officialMapsUrl = "https://maps.app.goo.gl/9ujSqvcAWbKe9JvC6";
  const embedSrc = "https://www.google.com/maps?q=36.755806,-4.330583&output=embed";

  const handleDirections = () => {
    window.open(officialMapsUrl, "_blank", "noopener,noreferrer");
  };

  const handleScrollToRsvp = () => {
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="ubicacion" className="relative py-16 px-4 scroll-mt-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center font-display text-4xl sm:text-5xl font-bold text-rainbow mb-3">
          ✨ Detalles mágicos ✨
        </h2>
        <p className="text-center text-foreground/70 mb-10">¡Apunta la fecha en tu calendario!</p>

        <div className="bg-card backdrop-blur-md rounded-3xl shadow-card p-6 sm:p-8 border-2 border-white/60">
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-pink-soft/40">
              <div className="text-4xl">📅</div>
              <div>
                <div className="text-xs uppercase tracking-wider font-display text-foreground/60">Fecha</div>
                <div className="font-display text-xl font-bold">Domingo 3 mayo 2026</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-lilac/40">
              <div className="text-4xl">⏰</div>
              <div>
                <div className="text-xs uppercase tracking-wider font-display text-foreground/60">Hora</div>
                <div className="font-display text-xl font-bold">14:00 h</div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-display text-lg font-bold mb-2 flex items-center gap-2">
              ⏳ Cuenta atrás mágica
            </h3>
            <CountdownMalaga />
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-mint/40 mb-6">
            <div className="text-3xl">📍</div>
            <div className="flex-1">
              <div className="font-display font-bold mb-1">{placeName}</div>
              <div className="text-sm text-foreground/60">Celebración en familia 🎈</div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-soft mb-6 border-4 border-white bg-white">
            <iframe
              title="Ubicación del cumple — Málaga"
              src={embedSrc}
              width="100%"
              height="280"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <button
            onClick={handleDirections}
            type="button"
            className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-magic text-white text-lg font-display font-bold rounded-full shadow-glow hover:scale-105 active:scale-95 transition-all"
          >
            <span className="text-2xl">📍</span>
            <span>Cómo llegar</span>
          </button>
          <p className="text-center text-xs text-foreground/50 mt-2">
            Se abrirá en Google Maps
          </p>
        </div>

        <div className="mt-8">
          <button
            onClick={handleScrollToRsvp}
            type="button"
            className="w-full flex items-center justify-center gap-3 px-8 py-6 bg-gradient-magic text-white text-xl font-display font-bold rounded-full shadow-glow hover:scale-105 active:scale-95 transition-all animate-pulse-soft"
          >
            <span>Confirmar asistencia</span>
            <span className="text-2xl">💌</span>
          </button>
          <p className="text-center text-xs text-foreground/60 mt-2">
            ¡Responde aquí para que sepamos que vienes! 🦄
          </p>
        </div>
      </div>
    </section>
  );
}
