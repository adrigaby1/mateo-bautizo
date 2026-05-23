export function EmotionalNote() {
  return (
    <section className="relative py-20 sm:py-24 px-6 sm:px-8">
      <div className="max-w-xl mx-auto text-center reveal-up">
        <div className="bg-white/60 backdrop-blur-md rounded-[32px] border border-white/70 shadow-soft px-8 py-12 sm:px-12 sm:py-14">
          <div className="text-2xl mb-4 opacity-70">🤍</div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-sea-muted leading-snug mb-5">
            Un día muy especial para nuestra familia
          </h2>
          <div className="w-12 h-px bg-gold-soft/60 mx-auto mb-5" />
          <p className="text-foreground/65 text-base sm:text-lg leading-relaxed font-light">
            Gracias por acompañarnos en un momento tan importante para Mateo.
            Nos hará muchísima ilusión compartir este día tan especial con vosotros.
          </p>
        </div>
      </div>
    </section>
  );
}