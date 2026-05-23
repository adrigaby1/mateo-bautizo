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

const CHURCH_ES: Place = {
  icon: "⛪",
  tag: "Bautizo",
  time: "12:00",
  name: "Iglesia La Encarnación",
  address: "Marbella",
  mapsUrl: "https://maps.app.goo.gl/ndWZefBDF88nrSvT6?g_st=aw",
  embedQuery: "Iglesia La Encarnación Marbella",
};

const RESTAURANT_ES: Place = {
  icon: "🍽️",
  tag: "Comida",
  time: "14:30",
  name: "Simbad Restaurant and Beach Bar",
  address: "Marbella · frente al mar",
  mapsUrl: "https://maps.app.goo.gl/VhGVhtRCEZu43asr6?g_st=aw",
  embedQuery: "Simbad Restaurant and Beach Bar Marbella",
};

const CHURCH_EN: Place = { ...CHURCH_ES, tag: "Baptism", address: "Marbella" };
const RESTAURANT_EN: Place = { ...RESTAURANT_ES, tag: "Lunch", address: "Marbella · seafront" };

function PlaceCard({ place, ctaLabel }: { place: Place; ctaLabel: string }) {
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
        <span>{ctaLabel}</span>
      </button>
    </div>
  );
}

export function EventDetails({ lang = "es" }: { lang?: "es" | "en" }) {
  const t = {
    badge: lang === "en" ? "Special Details" : "Detalles del día",
    date: lang === "en" ? "Sunday, July 5th 2026" : "Domingo, 5 de Julio 2026",
    sub: lang === "en" ? "Marbella · by the Mediterranean" : "Marbella · frente al Mediterráneo",
    countdown: lang === "en" ? "Magical countdown" : "Cuenta atrás",
    addCal: lang === "en" ? "Add to calendar 📅" : "Añadir al calendario 📅",
    dayTitle: lang === "en" ? "How the day will go" : "Así será el día",
    baptism: lang === "en" ? "Mateo's Baptism" : "Bautizo de Mateo",
    churchAddr: lang === "en" ? "La Encarnación Church · Marbella" : "Iglesia La Encarnación · Marbella",
    lunch: lang === "en" ? "Lunch and celebration" : "Comida y celebración",
    restAddr: lang === "en" ? "Simbad Restaurant · seafront" : "Simbad Restaurant · frente al mar",
    confirm: lang === "en" ? "Confirm attendance" : "Confirmar asistencia",
    confirmSub: lang === "en" ? "We'd love to know if you'll be there" : "Nos encantaría saber si nos acompañas",
    directions: lang === "en" ? "Get directions" : "Cómo llegar",
  };
  const CHURCH = lang === "en" ? CHURCH_EN : CHURCH_ES;
  const RESTAURANT = lang === "en" ? RESTAURANT_EN : RESTAURANT_ES;

  const scrollToRsvp = () => {
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="ubicacion" className="relative py-20 sm:py-24 px-6 sm:px-8 scroll-mt-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 reveal-up">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/60 backdrop-blur border border-gold-soft/40 text-[11px] font-display tracking-[0.22em] uppercase text-foreground/55 mb-4">
            {t.badge}
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-sea-muted mb-3">
            {t.date}
          </h2>
          <p className="text-foreground/60">{t.sub}</p>
        </div>

        {/* Countdown card */}
        <div className="bg-white/70 backdrop-blur-md rounded-[28px] shadow-soft p-6 sm:p-8 border border-white/80 mb-8 reveal-up delay-1">
          <h3 className="font-display text-[11px] sm:text-xs font-semibold mb-5 text-center text-foreground/55 tracking-[0.25em] uppercase">
            {t.countdown}
          </h3>
          <Countdown lang={lang} />
          <div className="mt-6 flex justify-center">
            <button
              onClick={downloadMateoIcs}
              type="button"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gold-soft/50 text-foreground/80 font-display font-semibold text-sm rounded-full shadow-soft hover:scale-[1.02] active:scale-95 transition-all"
            >
              {t.addCal}
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white/70 backdrop-blur-md rounded-[28px] shadow-soft p-7 sm:p-9 border border-white/80 mb-8 reveal-up delay-2">
          <h3 className="font-display text-xl sm:text-2xl font-semibold text-center mb-7 text-foreground/80">
            {t.dayTitle}
          </h3>
          <ol className="relative border-l border-gold-soft/40 ml-4 space-y-7">
            <li className="ml-6 relative">
              <span className="absolute -left-[34px] top-0 w-7 h-7 rounded-full bg-gradient-sea flex items-center justify-center text-white text-xs">
                ⛪
              </span>
              <div className="text-[10px] uppercase tracking-[0.22em] font-display text-foreground/50">
                12:00
              </div>
              <div className="font-display text-lg font-semibold text-foreground/85">{t.baptism}</div>
              <div className="text-sm text-foreground/60">{t.churchAddr}</div>
            </li>
            <li className="ml-6 relative">
              <span className="absolute -left-[34px] top-0 w-7 h-7 rounded-full bg-gradient-gold flex items-center justify-center text-white text-xs">
                🌊
              </span>
              <div className="text-[10px] uppercase tracking-[0.22em] font-display text-foreground/50">
                14:30
              </div>
              <div className="font-display text-lg font-semibold text-foreground/85">{t.lunch}</div>
              <div className="text-sm text-foreground/60">{t.restAddr}</div>
            </li>
          </ol>
        </div>

        {/* Two places */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-7">
          <PlaceCard place={CHURCH} ctaLabel={t.directions} />
          <PlaceCard place={RESTAURANT} ctaLabel={t.directions} />
        </div>

        {/* CTA */}
        <div className="mt-12">
          <button
            onClick={scrollToRsvp}
            type="button"
            className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-sea text-white text-base sm:text-lg font-display font-semibold tracking-wide rounded-full shadow-soft hover:shadow-glow hover:scale-[1.01] active:scale-95 transition-all"
          >
            <span>{t.confirm}</span>
          </button>
          <p className="text-center text-xs text-foreground/50 mt-3 tracking-wide">
            {t.confirmSub}
          </p>
        </div>
      </div>
    </section>
  );
}
