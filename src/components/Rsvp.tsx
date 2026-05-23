import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { downloadMateoIcs } from "@/lib/calendar";

const WHATSAPP_PHONE = "34671338704"; // sin "+", formato internacional

export function Rsvp() {
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
        `✨ Nueva confirmación — ${name.trim()} asistirá con ${guests} ${guests === 1 ? "persona" : "personas"}.`,
      ];
      if (message.trim()) parts.push(`💬 ${message.trim()}`);
      if (alergias.trim()) parts.push(`🥜 Alergias: ${alergias.trim()}`);
      const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(parts.join("\n"))}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="rsvp" className="relative py-16 px-4 scroll-mt-6">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/70 backdrop-blur border border-gold-soft/50 text-xs font-display tracking-widest uppercase text-foreground/65 mb-3">
            Confirmación
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-sea-gradient mb-2">
            ¿Nos acompañarás?
          </h2>
          <p className="text-foreground/65 text-sm sm:text-base">
            Nos haría mucha ilusión celebrarlo contigo
          </p>
        </div>

        <div className="bg-card backdrop-blur-md rounded-3xl shadow-card p-6 sm:p-8 border border-white/70">
          {submitted === null && (
            <>
              <label className="block font-display font-semibold mb-2 text-foreground/80 text-sm">
                Tu nombre
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Escribe tu nombre completo"
                maxLength={100}
                className="w-full px-5 py-3.5 rounded-2xl border border-border bg-white/85 text-base focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 mb-4"
              />

              <label className="block font-display font-semibold mb-2 text-foreground/80 text-sm">
                Nº de asistentes
              </label>
              <div className="flex items-center gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  className="w-12 h-12 rounded-full bg-white border border-border font-display font-bold text-xl shadow-soft active:scale-95 transition"
                  aria-label="Quitar asistente"
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
                  aria-label="Añadir asistente"
                >
                  +
                </button>
              </div>

              <label className="block font-display font-semibold mb-2 text-foreground/80 text-sm">
                Mensaje para Mateo <span className="text-xs font-normal text-foreground/50">(opcional)</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Un mensajito bonito para Mateo…"
                maxLength={500}
                rows={3}
                className="w-full px-5 py-3 rounded-2xl border border-border bg-white/85 text-base focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 mb-5 resize-none"
              />

              <label className="block font-display font-semibold mb-2 text-foreground/80 text-sm">
                ¿Alguna alergia o intolerancia alimentaria? <span className="text-xs font-normal text-foreground/50">(opcional)</span>
              </label>
              <textarea
                value={alergias}
                onChange={(e) => setAlergias(e.target.value)}
                placeholder="Ej: sin gluten, alergia a los frutos secos…"
                maxLength={300}
                rows={2}
                className="w-full px-5 py-3 rounded-2xl border border-border bg-white/85 text-base focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 mb-5 resize-none"
              />

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-100 text-red-700 text-sm text-center">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => submit(true)}
                  disabled={!name.trim() || loading}
                  className="px-6 py-4 bg-gradient-sea text-white font-display font-bold rounded-2xl shadow-soft hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100"
                >
                  {loading ? "Enviando…" : "Sí asistiremos ✨"}
                </button>
                <button
                  onClick={() => submit(false)}
                  disabled={!name.trim() || loading}
                  className="px-6 py-4 bg-white border border-border text-foreground font-display font-bold rounded-2xl shadow-soft hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100"
                >
                  No podremos ir
                </button>
              </div>
            </>
          )}

          {submitted === true && (
            <div className="text-center py-6 animate-pop-in">
              <div className="text-5xl mb-3">🌊✨</div>
              <h3 className="font-display text-2xl font-bold text-sea-gradient mb-2">
                ¡Gracias, {name}!
              </h3>
              <p className="text-foreground/70 mb-6">
                Nos hace muchísima ilusión que vengas. Mateo te espera 💙
              </p>
              <button
                onClick={downloadMateoIcs}
                type="button"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-sea text-white font-display font-semibold rounded-full shadow-soft hover:scale-[1.02] active:scale-95 transition-all"
              >
                Añadir al calendario 📅
              </button>
            </div>
          )}

          {submitted === false && (
            <div className="text-center py-6 animate-pop-in">
              <div className="text-5xl mb-3">💙</div>
              <h3 className="font-display text-2xl font-bold text-sea-gradient mb-2">
                ¡Te echaremos de menos, {name}!
              </h3>
              <p className="text-foreground/70">Gracias por avisarnos.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
