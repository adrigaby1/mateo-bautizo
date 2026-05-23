import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function RsvpMalaga() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (respuesta: boolean) => {
    if (!name.trim()) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase.from("rsvp_malaga").insert({
      nombre: name.trim(),
      respuesta,
      mensaje: message.trim() || null,
    });
    setLoading(false);
    if (error) {
      setError("¡Ups! No pudimos guardar tu confirmación. Intenta de nuevo.");
      return;
    }
    setSubmitted(respuesta);
  };

  return (
    <section id="rsvp" className="relative py-16 px-4 scroll-mt-6">
      <div className="max-w-xl mx-auto">
        <h2 className="text-center font-display text-4xl sm:text-5xl font-bold text-rainbow mb-3">
          💌 ¿Vendrás al cumple en Málaga?
        </h2>
        <p className="text-center text-foreground/70 mb-8">Confirma tu asistencia mágica</p>

        <div className="bg-card backdrop-blur-md rounded-3xl shadow-card p-6 sm:p-8 border-2 border-white/60">
          {submitted === null && (
            <>
              <label className="block font-display font-bold mb-2 text-foreground/80">
                Nombre 🧒
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Escribe tu nombre aquí..."
                maxLength={100}
                className="w-full px-5 py-4 rounded-2xl border-2 border-border bg-white/80 text-lg font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 mb-4"
              />

              <label className="block font-display font-bold mb-2 text-foreground/80">
                Mensaje para Camila 💖 <span className="text-xs font-normal text-foreground/50">(opcional)</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="¡Feliz cumple Camila!"
                maxLength={500}
                rows={2}
                className="w-full px-5 py-3 rounded-2xl border-2 border-border bg-white/80 text-base font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 mb-5 resize-none"
              />

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-100 text-red-700 text-sm text-center">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => submit(true)}
                  disabled={!name.trim() || loading}
                  className="px-6 py-4 bg-gradient-magic text-white font-display font-bold rounded-2xl shadow-soft hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100"
                >
                  {loading ? "✨ ..." : "✨ Sí asistiré"}
                </button>
                <button
                  onClick={() => submit(false)}
                  disabled={!name.trim() || loading}
                  className="px-6 py-4 bg-white border-2 border-border text-foreground font-display font-bold rounded-2xl shadow-soft hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100"
                >
                  😢 No podré ir
                </button>
              </div>
            </>
          )}

          {submitted === true && (
            <div className="text-center py-6 animate-pop-in">
              <div className="text-6xl mb-3">🦄✨</div>
              <h3 className="font-display text-2xl font-bold text-rainbow mb-2">
                ¡Yupi, {name}!
              </h3>
              <p className="text-foreground/70">Camila se va a poner súper feliz de verte en Málaga 💖</p>
            </div>
          )}

          {submitted === false && (
            <div className="text-center py-6 animate-pop-in">
              <div className="text-6xl mb-3">🌈</div>
              <h3 className="font-display text-2xl font-bold text-rainbow mb-2">
                ¡Te echaremos de menos, {name}!
              </h3>
              <p className="text-foreground/70">Gracias por avisar 💕</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
