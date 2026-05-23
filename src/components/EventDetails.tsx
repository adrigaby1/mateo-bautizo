import { Countdown } from "./Countdown";

export function EventDetails() {
  const placeName = "Área infantil 10086";
  const parkName = "Parque de la Cuña Verde de Latina";
  const city = "Madrid";
  // Enlace oficial compartido por la familia
  const officialMapsUrl = "https://maps.app.goo.gl/Dpm1EDk8T6u2pMbaA";
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(`${placeName} ${city}`)}&output=embed`;

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
                <div className="font-display text-xl font-bold">29 abril 2026</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-lilac/40">
              <div className="text-4xl">⏰</div>
              <div>
                <div className="text-xs uppercase tracking-wider font-display text-foreground/60">Hora</div>
                <div className="font-display text-xl font-bold">17:30 h</div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-display text-lg font-bold mb-2 flex items-center gap-2">
              ⏳ Cuenta atrás mágica
            </h3>
            <Countdown />
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-mint/40 mb-6">
            <div className="text-3xl">📍</div>
            <div className="flex-1">
              <div className="font-display font-bold mb-1">{placeName}</div>
              <div className="text-sm text-foreground/80">{parkName}</div>
              <div className="text-sm text-foreground/60">{city}</div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-soft mb-6 border-4 border-white bg-white">
            <iframe
              title="Ubicación del cumple — Área infantil 10086"
              src={embedUrl}
              width="100%"
              height="280"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
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

        <div className="mt-8 rounded-3xl p-6 sm:p-7 border-2 border-lilac/60 bg-gradient-to-br from-lilac/40 to-pink-soft/40 shadow-soft">
          <div className="flex items-start gap-3 mb-3">
            <div className="text-3xl">☔</div>
            <div>
              <h3 className="font-display text-2xl font-bold text-rainbow">Plan B por lluvia</h3>
              <p className="text-sm text-foreground/80 mt-1">
                Si el tiempo no acompaña, os invitamos a pasar por casa a celebrar con Camila 🦄🎉
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-white/60 mb-4">
            <span className="text-xl">📍</span>
            <span className="text-sm font-display font-bold">Calle Gregorio Vacas 14, Bajo C, Madrid</span>
          </div>
          <button
            onClick={() => window.open("https://www.google.com/maps?q=Calle+Gregorio+Vacas+14+Bajo+C+Madrid", "_blank", "noopener,noreferrer")}
            type="button"
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-magic text-white font-display font-bold rounded-full shadow-glow hover:scale-105 active:scale-95 transition-all"
          >
            <span className="text-xl">📍</span>
            <span>Cómo llegar al Plan B</span>
          </button>
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
