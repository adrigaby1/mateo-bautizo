import { useEffect, useMemo, useRef, useState, useCallback } from "react";

type Photo = { name: string; url: string };

function usePerPage() {
  const [n, setN] = useState(12);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 640) setN(6);
      else if (w < 1024) setN(9);
      else setN(12);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return n;
}

export function PhotoGallery({ photos }: { photos: Photo[] }) {
  const perPage = usePerPage();
  const [page, setPage] = useState(1);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const totalPages = Math.max(1, Math.ceil(photos.length / perPage));

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  const slice = useMemo(
    () => photos.slice((page - 1) * perPage, page * perPage),
    [photos, page, perPage]
  );
  const offset = (page - 1) * perPage;

  const goto = (p: number) => {
    setPage(p);
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
  };

  const close = useCallback(() => setOpenIdx(null), []);
  const prev = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );
  const next = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIdx, close, prev, next]);

  if (!photos.length) {
    return (
      <p className="text-center text-foreground/55 py-12">
        Aún no hay fotos disponibles.
      </p>
    );
  }

  return (
    <div>
      <div ref={topRef} className="scroll-mt-24" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {slice.map((p, i) => {
          const globalIdx = offset + i;
          return (
            <button
              key={p.name}
              onClick={() => setOpenIdx(globalIdx)}
              className="group aspect-square rounded-2xl overflow-hidden border border-white/70 bg-cream shadow-soft hover:shadow-glow transition-all"
            >
              <img
                src={p.url}
                alt={`Recuerdo ${globalIdx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </button>
          );
        })}
      </div>

      <Pager page={page} totalPages={totalPages} onGo={goto} />

      {openIdx !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
        >
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Cerrar"
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/95 text-xl font-bold shadow-glow"
          >✕</button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Anterior"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 text-2xl font-bold shadow-glow"
          >‹</button>
          <img
            src={photos[openIdx].url}
            alt={`Foto ${openIdx + 1}`}
            className="max-w-full max-h-[82vh] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Siguiente"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 text-2xl font-bold shadow-glow"
          >›</button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <span className="bg-white/95 px-4 py-1.5 rounded-full font-display font-semibold text-sm shadow-glow">
              Foto {openIdx + 1} de {photos.length}
            </span>
            <a
              href={photos[openIdx].url}
              download={photos[openIdx].name}
              onClick={(e) => e.stopPropagation()}
              className="bg-sea text-white px-4 py-1.5 rounded-full font-display font-semibold text-sm shadow-glow hover:scale-105 transition-transform"
            >
              ⬇ Descargar
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export function Pager({
  page, totalPages, onGo,
}: { page: number; totalPages: number; onGo: (p: number) => void }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-3 mt-8">
      <button
        onClick={() => onGo(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-4 py-2 rounded-full bg-white/80 border border-gold-soft/40 font-display text-sm text-sea-muted shadow-soft disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-glow transition-all"
      >‹ Anterior</button>
      <span className="font-display text-sm text-foreground/70 tabular-nums">
        Página {page} de {totalPages}
      </span>
      <button
        onClick={() => onGo(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="px-4 py-2 rounded-full bg-white/80 border border-gold-soft/40 font-display text-sm text-sea-muted shadow-soft disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-glow transition-all"
      >Siguiente ›</button>
    </div>
  );
}