import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Lightbox } from "./Lightbox";

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
        <Lightbox
          open
          onClose={close}
          onPrev={prev}
          onNext={next}
          url={photos[openIdx].url}
          filename={photos[openIdx].name}
          index={openIdx}
          total={photos.length}
          label="Foto"
        >
          <img
            src={photos[openIdx].url}
            alt={`Foto ${openIdx + 1}`}
            style={{
              maxWidth: "min(92vw, 900px)",
              maxHeight: "78vh",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              objectPosition: "center",
              display: "block",
            }}
          />
        </Lightbox>
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