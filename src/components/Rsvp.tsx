import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { downloadMateoIcs } from "@/lib/calendar";

const WHATSAPP_PHONE = "34645166406"; // sin "+", formato internacional

export function Rsvp({ lang = "es" }: { lang?: "es" | "en" }) {
  const t = {
    badge: lang === "en" ? "Confirmation" : "Confirmación",
    title: lang === "en" ? "Will you join us?" : "¿Nos acompañarás?",
    sub: lang === "en" ? "Please confirm your attendance" : "Nos haría mucha ilusión celebrarlo contigo",
    nameLabel: lang === "en" ? "Guest name" : "Tu nombre",
    namePh: lang === "en" ? "Write your name here…" : "Escribe tu nombre completo",
    guestsLabel: lang === "en" ? "Number of guests" : "Nº de asistentes",
    removeGuest: lang === "en" ? "Remove guest" : "Quitar asistente",
    addGuest: lang === "en" ? "Add guest" : "Añadir asistente",
    msgLabel: lang === "en" ? "Message for Mateo" : "Mensaje para Mateo",
    optional: lang === "en" ? "(optional)" : "(opcional)",
    msgPh: lang === "en" ? "Happy Baptism Mateo!" : "Un mensajito bonito para Mateo…",
    allergyLabel: lang === "en" ? "Any allergies or food intolerances?" : "¿Alguna alergia o intolerancia alimentaria?",
    allergyPh: lang === "en" ? "E.g. gluten-free, nut allergy…" : "Ej: sin gluten, alergia a los frutos secos…",
    err: lang === "en" ? "We couldn't save your reply. Please try again." : "No hemos podido guardar tu respuesta. Inténtalo de nuevo, por favor.",
    yes: lang === "en" ? "Yes, I'll be there ✨" : "Sí asistiremos ✨",
    no: lang === "en" ? "Sorry, I can't attend" : "No podremos ir",
    sending: lang === "en" ? "Sending…" : "Enviando…",
    thanks: lang === "en" ? "Thank you" : "Gracias",
    thanksMsg: lang === "en" ? "We're so excited you'll be there. Mateo is waiting for you 💙" : "Nos hace muchísima ilusión que vengas. Mateo te espera 💙",
    missTitle: lang === "en" ? "We'll miss you" : "¡Te echaremos de menos",
    missMsg: lang === "en" ? "Thanks for letting us know." : "Gracias por avisarnos.",
    addCal: lang === "en" ? "Add to calendar 📅" : "Añadir al calendario 📅",
    waNew: lang === "en" ? "New confirmation" : "Nueva confirmación",
    waPpl: lang === "en" ? (n: number) => (n === 1 ? "person" : "people") : (n: number) => (n === 1 ? "persona" : "personas"),
    waWill: lang === "en" ? "will attend with" : "asistirá con",
    waAllergy: lang === "en" ? "Allergies" : "Alergias",
  };
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [alergias, setAlergias] = useState("");
  const [submitted, setSubmitted] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (asistira: boolean) => {
    if (!name.trim()) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase.from("rsvp_mateo" as never).insert({
      nombre: name.trim(),
      asistentes: asistira ? guests : 0,
      asistira,
      mensaje: message.trim() || null,
      alergias: alergias.trim() || null,
    } as never);
    setLoading(false);
    if (error) {
      setError("No hemos podido guardar tu respuesta. Inténtalo de nuevo, por favor.");
      return;
    }
    setSubmitted(asistira);

    if (asistira) {
      const parts = [
        `✨ ${t.waNew} — ${name.trim()} ${t.waWill} ${guests} ${t.waPpl(guests)}.`,
      ];
      if (message.trim()) parts.push(`💬 ${message.trim()}`);
      if (alergias.trim()) parts.push(`🥜 ${t.waAllergy}: ${alergias.trim()}`);
      const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(parts.join("\n"))}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="rsvp" className="relative py-16 px-4 scroll-mt-6">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/70 backdrop-blur border border-gold-soft/50 text-xs font-display tracking-widest uppercase text-foreground/65 mb-3">
            {t.badge}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-sea-gradient mb-2">
            {t.title}
          </h2>
          <p className="text-foreground/65 text-sm sm:text-base">
            {t.sub}
          </p>
        </div>

        <div className="bg-card backdrop-blur-md rounded-3xl shadow-card p-6 sm:p-8 border border-white/70">
          {submitted === null && (
            <>
              <label className="block font-display font-semibold mb-2 text-foreground/80 text-sm">
                {t.nameLabel}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePh}
                maxLength={100}
                className="w-full px-5 py-3.5 rounded-2xl border border-border bg-white/85 text-base focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 mb-4"
              />

              <label className="block font-display font-semibold mb-2 text-foreground/80 text-sm">
                {t.guestsLabel}
              </label>
              <div className="flex items-center gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  className="w-12 h-12 rounded-full bg-white border border-border font-display font-bold text-xl shadow-soft active:scale-95 transition"
                  aria-label={t.removeGuest}
                >
                  −
                </button>
                <div className="flex-1 text-center font-display text-2xl font-bold bg-sand/40 rounded-2xl py-3">
                  {guests}
                </div>
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.min(20, g + 1))}
                  className="w-12 h-12 rounded-full bg-white border border-border font-display font-bold text-xl shadow-soft active:scale-95 transition"
                  aria-label={t.addGuest}
                >
                  +
                </button>
              </div>

              <label className="block font-display font-semibold mb-2 text-foreground/80 text-sm">
                {t.msgLabel} <span className="text-xs font-normal text-foreground/50">{t.optional}</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.msgPh}
                maxLength={500}
                rows={3}
                className="w-full px-5 py-3 rounded-2xl border border-border bg-white/85 text-base focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 mb-5 resize-none"
              />

              <label className="block font-display font-semibold mb-2 text-foreground/80 text-sm">
                {t.allergyLabel} <span className="text-xs font-normal text-foreground/50">{t.optional}</span>
              </label>
              <textarea
                value={alergias}
                onChange={(e) => setAlergias(e.target.value)}
                placeholder={t.allergyPh}
                maxLength={300}
                rows={2}
                className="w-full px-5 py-3 rounded-2xl border border-border bg-white/85 text-base focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 mb-5 resize-none"
              />

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-100 text-red-700 text-sm text-center">
                  {t.err}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => submit(true)}
                  disabled={!name.trim() || loading}
                  className="px-6 py-4 bg-gradient-sea text-white font-display font-bold rounded-2xl shadow-soft hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100"
                >
                  {loading ? t.sending : t.yes}
                </button>
                <button
                  onClick={() => submit(false)}
                  disabled={!name.trim() || loading}
                  className="px-6 py-4 bg-white border border-border text-foreground font-display font-bold rounded-2xl shadow-soft hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100"
                >
                  {t.no}
                </button>
              </div>
            </>
          )}

          {submitted === true && (
            <div className="text-center py-6 animate-pop-in">
              <div className="text-5xl mb-3">🌊✨</div>
              <h3 className="font-display text-2xl font-bold text-sea-gradient mb-2">
                {lang === "en" ? `Thank you, ${name}!` : `¡Gracias, ${name}!`}
              </h3>
              <p className="text-foreground/70 mb-6">
                {t.thanksMsg}
              </p>
              <button
                onClick={downloadMateoIcs}
                type="button"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-sea text-white font-display font-semibold rounded-full shadow-soft hover:scale-[1.02] active:scale-95 transition-all"
              >
                {t.addCal}
              </button>
            </div>
          )}

          {submitted === false && (
            <div className="text-center py-6 animate-pop-in">
              <div className="text-5xl mb-3">💙</div>
              <h3 className="font-display text-2xl font-bold text-sea-gradient mb-2">
                {lang === "en" ? `We'll miss you, ${name}!` : `¡Te echaremos de menos, ${name}!`}
              </h3>
              <p className="text-foreground/70">{t.missMsg}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
