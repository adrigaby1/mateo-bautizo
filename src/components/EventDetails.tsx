import { Countdown } from "./Countdown";

type Place = {
  icon: string;
  tag: string;
  time: string;
  name: string;
  address: string;
  mapsUrl: string;
  embedQuery: string;
};

const CHURCH: Place = {
  icon: "⛪",
  tag: "Bautizo",
  time: "12:00",
  name: "Iglesia La Encarnación",
  address: "Marbella",
  mapsUrl: "https://maps.app.goo.gl/ndWZefBDF88nrSvT6?g_st=aw",
  embedQuery: "Iglesia La Encarnación Marbella",
};

const RESTAURANT: Place = {
  icon: "🍽️",
  tag: "Comida",
  time: "14:30",
  name: "Simbad Restaurant and Beach Bar",
  address: "Marbella · frente al mar",
  mapsUrl: "https://maps.app.goo.gl/VhGVhtRCEZu43asr6?g_st=aw",
  embedQuery: "Simbad Restaurant and Beach Bar Marbella",
};

function PlaceCard({ place }: { place: Place }) {
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(place.embedQuery)}&output=embed`;
  return (
    <div className="bg-card backdrop-blur-md rounded-3xl shadow-card p-5 sm:p-6 border border-white/70">
      <div className="flex items-start gap-3 mb-4">
        <div className="text-3xl">{place.icon}</div>
        <div className="flex-1">
          <div className="text-[11px] uppercase tracking-[0.18em] font-display text-foreground/55">
            {place.tag} · {place.time}
          </div>
          <div className="font-display text-lg font-bold leading-tight mt-0.5">{place.name}</div>
          <div className="text-sm text-foreground/65">{place.address}</div>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden shadow-soft mb-4 border-2 border-white bg-white">
        <iframe
          title={`Ubicación — ${place.name}`}
          src={embed}
          width="100%"
          height="220"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <button
        onClick={() => window.open(place.mapsUrl, "_blank", "noopener,noreferrer")}
        type="button"
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-sea text-white font-display font-bold rounded-full shadow-soft hover:scale-[1.02] active:scale-95 transition-all"
      >
        <span className="text-lg">📍</span>
        <span>Cómo llegar</span>
      </button>
    </div>
  );
}

export function EventDetails() {
  const scrollToRsvp = () => {
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="ubicacion" className="relative py-16 px-4 scroll-mt-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/70 backdrop-blur border border-gold-soft/50 text-xs font-display tracking-widest uppercase text-foreground/65 mb-4">
            Detalles del día
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-sea-gradient mb-3">
            Domingo, 5 de Julio 2026
          </h2>
          <p className="text-foreground/65">Marbella · frente al Mediterráneo</p>
        </div>

        {/* Countdown card */}
        <div className="bg-card backdrop-blur-md rounded-3xl shadow-card p-5 sm:p-7 border border-white/70 mb-8">
          <h3 className="font-display text-base sm:text-lg font-bold mb-4 text-center text-foreground/75 tracking-wide">
            ⏳ Cuenta atrás
          </h3>
          <Countdown />
        </div>

        {/* Timeline */}
        <div className="bg-card backdrop-blur-md rounded-3xl shadow-card p-6 sm:p-8 border border-white/70 mb-8">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-center mb-6 text-foreground/80">
            Así será el día
          </h3>
          <ol className="relative border-l-2 border-gold-soft/60 ml-4 space-y-6">
            <li className="ml-6 relative">
              <span className="absolute -left-[34px] top-0 w-7 h-7 rounded-full bg-gradient-sea flex items-center justify-center text-white text-sm shadow-soft">
                ⛪
              </span>
              <div className="text-[11px] uppercase tracking-widest font-display text-foreground/55">
                12:00
              </div>
              <div className="font-display text-lg font-bold">Bautizo de Mateo</div>
              <div className="text-sm text-foreground/65">Iglesia La Encarnación · Marbella</div>
            </li>
            <li className="ml-6 relative">
              <span className="absolute -left-[34px] top-0 w-7 h-7 rounded-full bg-gradient-gold flex items-center justify-center text-white text-sm shadow-soft">
                🌊
              </span>
              <div className="text-[11px] uppercase tracking-widest font-display text-foreground/55">
                14:30
              </div>
              <div className="font-display text-lg font-bold">Comida y celebración</div>
              <div className="text-sm text-foreground/65">Simbad Restaurant · frente al mar</div>
            </li>
          </ol>
        </div>

        {/* Two places */}
        <div className="grid md:grid-cols-2 gap-6">
          <PlaceCard place={CHURCH} />
          <PlaceCard place={RESTAURANT} />
        </div>

        {/* CTA */}
        <div className="mt-10">
          <button
            onClick={scrollToRsvp}
            type="button"
            className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-sea text-white text-lg font-display font-bold rounded-full shadow-glow hover:scale-[1.02] active:scale-95 transition-all animate-pulse-soft"
          >
            <span>Confirmar asistencia</span>
            <span className="text-xl">✨</span>
          </button>
          <p className="text-center text-xs text-foreground/55 mt-2">
            Nos encantaría saber si nos acompañas
          </p>
        </div>
      </div>
    </section>
  );
}
