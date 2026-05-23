import { useEffect, useState, useCallback } from "react";
import img1 from "@/assets/camila-1.jpg";
import img2 from "@/assets/camila-2.jpg";
import img3 from "@/assets/camila-3.jpg";
import img4 from "@/assets/camila-4.jpg";
import img5 from "@/assets/camila-5.jpg";
import img6 from "@/assets/camila-6.jpg";
import img7 from "@/assets/camila-7.jpg";

const PHOTOS = [img1, img2, img3, img4, img5, img6, img7];

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
    <section className="relative py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center font-display text-4xl sm:text-5xl font-bold text-rainbow mb-3">
          📸 Recuerdos de Camila
        </h2>
        <p className="text-center text-foreground/70 mb-10">Momentos mágicos llenos de luz ✨</p>

        <div
          className="relative aspect-[4/5] sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-card border-4 border-white cursor-pointer"
          style={{ background: "linear-gradient(135deg, #FADADD 0%, #E0BBE4 50%, #C5E1FF 100%)" }}
          onClick={() => setOpenIdx(idx)}
        >
          {PHOTOS.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Camila ${i + 1}`}
              className="absolute inset-0 w-full h-full object-contain transition-opacity duration-1000"
              style={{ opacity: i === idx ? 1 : 0 }}
            />
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
            🦄 {idx + 1} / {PHOTOS.length}
          </div>
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full font-display font-bold text-xs shadow-soft">
            🔍 Ver
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mt-4">
          {PHOTOS.map((src, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                i === idx ? "border-primary scale-110 shadow-soft" : "border-white/60 opacity-70"
              }`}
              style={{ background: "#FADADD" }}
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
            alt={`Camila ${openIdx + 1}`}
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
            🦄 {openIdx + 1} / {PHOTOS.length}
          </div>
        </div>
      )}
    </section>
  );
}
