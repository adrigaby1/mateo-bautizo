import { useEffect, useState, useCallback } from "react";
import img1 from "@/assets/mateo-1.jpg";
import img2 from "@/assets/mateo-2.jpg";
import img3 from "@/assets/mateo-3.jpg";
import img4 from "@/assets/mateo-4.jpg";
import img5 from "@/assets/mateo-5.jpg";

const PHOTOS = [img1, img2, img3, img4, img5];

export function Gallery() {
  const [idx, setIdx] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Auto-rotate only when modal closed
  useEffect(() => {
    if (openIdx !== null) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % PHOTOS.length), 3500);
    return () => clearInterval(t);
  }, [openIdx]);

  const closeModal = useCallback(() => setOpenIdx(null), []);
  const prev = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length)),
    []
  );
  const next = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i + 1) % PHOTOS.length)),
    []
  );

  // Keyboard navigation in modal
  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIdx, closeModal, prev, next]);

  const onTouchStart = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 50) prev();
    else if (dx < -50) next();
    setTouchStartX(null);
  };

  return (
    <section className="relative py-20 sm:py-24 px-6 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 reveal-up">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/60 backdrop-blur border border-gold-soft/40 text-[11px] font-display tracking-[0.22em] uppercase text-foreground/55 mb-3">
            Galería
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-sea-muted mb-2">
            El mundo de Mateo
          </h2>
          <p className="text-foreground/60">Pequeños momentos, grandes recuerdos</p>
        </div>

        <div
          className="relative aspect-[4/5] sm:aspect-[4/3] rounded-[28px] overflow-hidden shadow-soft border border-white/80 cursor-pointer reveal-up delay-1"
          style={{ background: "linear-gradient(135deg, oklch(0.95 0.03 80), oklch(0.92 0.04 220))" }}
          onClick={() => setOpenIdx(idx)}
        >
          {PHOTOS.map((src, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: i === idx ? 1 : 0 }}
            >
              {/* Blurred background fill */}
              <img
                src={src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-60"
              />
              {/* Full image, contained */}
              <img
                src={src}
                alt={`Mateo ${i + 1}`}
                loading="lazy"
                className="relative w-full h-full object-contain object-center"
              />
            </div>
          ))}

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent p-6 pointer-events-none">
            <div className="flex justify-center gap-2">
              {PHOTOS.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIdx(i);
                  }}
                  aria-label={`Ir a foto ${i + 1}`}
                  className={`h-2 rounded-full transition-all pointer-events-auto ${
                    i === idx ? "w-8 bg-white" : "w-2 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full font-display font-bold text-sm shadow-soft">
            ✨ {idx + 1} / {PHOTOS.length}
          </div>
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full font-display font-bold text-xs shadow-soft">
            🔍 Ver
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 mt-4">
          {PHOTOS.map((src, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                i === idx ? "border-primary scale-110 shadow-soft" : "border-white/60 opacity-70"
              }`}
              style={{ background: "oklch(0.95 0.03 80)" }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      {openIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in"
          onClick={closeModal}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            aria-label="Cerrar"
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/95 text-2xl font-bold shadow-glow hover:scale-110 transition-all flex items-center justify-center"
          >
            ✕
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Anterior"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 text-2xl font-bold shadow-glow hover:scale-110 transition-all flex items-center justify-center"
          >
            ‹
          </button>

          <img
            src={PHOTOS[openIdx]}
            alt={`Mateo ${openIdx + 1}`}
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Siguiente"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 text-2xl font-bold shadow-glow hover:scale-110 transition-all flex items-center justify-center"
          >
            ›
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 px-4 py-1.5 rounded-full font-display font-bold text-sm shadow-glow">
            ✨ {openIdx + 1} / {PHOTOS.length}
          </div>
        </div>
      )}
    </section>
  );
}
