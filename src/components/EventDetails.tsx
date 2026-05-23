import { Countdown } from "./Countdown";
import { downloadMateoIcs } from "@/lib/calendar";

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
    <div className="bg-white/75 backdrop-blur-md rounded-[28px] shadow-soft p-6 sm:p-7 border border-white/80 reveal-up">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-12 h-12 rounded-full bg-cream border border-gold-soft/40 flex items-center justify-center text-2xl shrink-0">{place.icon}</div>
        <div className="flex-1">
          <div className="text-[10px] uppercase tracking-[0.22em] font-display text-foreground/50">
            {place.tag} · {place.time}
          </div>
          <div className="font-display text-lg font-semibold leading-tight mt-1 text-foreground/85">{place.name}</div>
          <div className="text-sm text-foreground/60 mt-0.5">{place.address}</div>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden mb-5 border border-white shadow-[0_8px_24px_-12px_rgba(45,86,113,0.18)] bg-white">
        <iframe
          title={`Ubicación — ${place.name}`}
          src={embed}
          width="100%"
          height="200"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <button
        onClick={() => window.open(place.mapsUrl, "_blank", "noopener,noreferrer")}
        type="button"
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-sea text-white font-display font-semibold tracking-wide rounded-full hover:scale-[1.02] active:scale-95 transition-all"
      >
        <span className="text-base">📍</span>
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
    <section id="ubicacion" className="relative py-20 sm:py-24 px-6 sm:px-8 scroll-mt-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 reveal-up">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/60 backdrop-blur border border-gold-soft/40 text-[11px] font-display tracking-[0.22em] uppercase text-foreground/55 mb-4">
            Detalles del día
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-sea-muted mb-3">
            Domingo, 5 de Julio 2026
          </h2>
          <p className="text-foreground/60">Marbella · frente al Mediterráneo</p>
        </div>

        {/* Countdown card */}
        <div className="bg-white/70 backdrop-blur-md rounded-[28px] shadow-soft p-6 sm:p-8 border border-white/80 mb-8 reveal-up delay-1">
          <h3 className="font-display text-[11px] sm:text-xs font-semibold mb-5 text-center text-foreground/55 tracking-[0.25em] uppercase">
            Cuenta atrás
          </h3>
          <Countdown />
          <div className="mt-6 flex justify-center">
            <button
              onClick={downloadMateoIcs}
              type="button"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gold-soft/50 text-foreground/80 font-display font-semibold text-sm rounded-full shadow-soft hover:scale-[1.02] active:scale-95 transition-all"
            >
              Añadir al calendario 📅
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white/70 backdrop-blur-md rounded-[28px] shadow-soft p-7 sm:p-9 border border-white/80 mb-8 reveal-up delay-2">
          <h3 className="font-display text-xl sm:text-2xl font-semibold text-center mb-7 text-foreground/80">
            Así será el día
          </h3>
          <ol className="relative border-l border-gold-soft/40 ml-4 space-y-7">
            <li className="ml-6 relative">
              <span className="absolute -left-[34px] top-0 w-7 h-7 rounded-full bg-gradient-sea flex items-center justify-center text-white text-xs">
                ⛪
              </span>
              <div className="text-[10px] uppercase tracking-[0.22em] font-display text-foreground/50">
                12:00
              </div>
              <div className="font-display text-lg font-semibold text-foreground/85">Bautizo de Mateo</div>
              <div className="text-sm text-foreground/60">Iglesia La Encarnación · Marbella</div>
            </li>
            <li className="ml-6 relative">
              <span className="absolute -left-[34px] top-0 w-7 h-7 rounded-full bg-gradient-gold flex items-center justify-center text-white text-xs">
                🌊
              </span>
              <div className="text-[10px] uppercase tracking-[0.22em] font-display text-foreground/50">
                14:30
              </div>
              <div className="font-display text-lg font-semibold text-foreground/85">Comida y celebración</div>
              <div className="text-sm text-foreground/60">Simbad Restaurant · frente al mar</div>
            </li>
          </ol>
        </div>

        {/* Two places */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-7">
          <PlaceCard place={CHURCH} />
          <PlaceCard place={RESTAURANT} />
        </div>

        {/* CTA */}
        <div className="mt-12">
          <button
            onClick={scrollToRsvp}
            type="button"
            className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-sea text-white text-base sm:text-lg font-display font-semibold tracking-wide rounded-full shadow-soft hover:shadow-glow hover:scale-[1.01] active:scale-95 transition-all"
          >
            <span>Confirmar asistencia</span>
          </button>
          <p className="text-center text-xs text-foreground/50 mt-3 tracking-wide">
            Nos encantaría saber si nos acompañas
          </p>
        </div>
      </div>
    </section>
  );
}
