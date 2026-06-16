import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Pager } from "./PhotoGallery";

type Video = { name: string; url: string };

function usePerPage() {
  const [n, setN] = useState(6);
  useEffect(() => {
    const calc = () => setN(window.innerWidth < 640 ? 4 : 6);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return n;
}

export function VideoGallery({ videos }: { videos: Video[] }) {
  const perPage = usePerPage();
  const [page, setPage] = useState(1);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const totalPages = Math.max(1, Math.ceil(videos.length / perPage));

  useEffect(() => { if (page > totalPages) setPage(1); }, [page, totalPages]);

  const slice = useMemo(
    () => videos.slice((page - 1) * perPage, page * perPage),
    [videos, page, perPage]
  );
  const offset = (page - 1) * perPage;

  const goto = (p: number) => {
    setPage(p);
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
  };

  const close = useCallback(() => setOpenIdx(null), []);
  const prev = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i - 1 + videos.length) % videos.length)),
    [videos.length]
  );
  const next = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i + 1) % videos.length)),
    [videos.length]
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

  if (!videos.length) {
    return (
      <p className="text-center text-foreground/55 py-12">
        Aún no hay vídeos disponibles.
      </p>
    );
  }

  return (
    <div>
      <div ref={topRef} className="scroll-mt-24" />
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {slice.map((v, i) => {
          const globalIdx = offset + i;
          return (
            <div
              key={v.name}
              className="relative aspect-video rounded-2xl overflow-hidden bg-cream border border-white/70 shadow-soft hover:shadow-glow transition-all group"
            >
              {/* Lazy: only the <video> element with preload=metadata loads metadata, not full video */}
              <video
                src={v.url}
                preload="metadata"
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setOpenIdx(globalIdx)}
                aria-label="Reproducir"
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
              >
                <span className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center text-2xl shadow-glow group-hover:scale-110 transition-transform">
                  ▶
                </span>
              </button>
              <a
                href={v.url}
                download={v.name}
                onClick={(e) => e.stopPropagation()}
                aria-label="Descargar vídeo"
                className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center text-sm shadow-soft hover:scale-110 transition-transform"
              >
                ⬇
              </a>
            </div>
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
          <video
            key={videos[openIdx].url}
            src={videos[openIdx].url}
            controls
            autoPlay
            playsInline
            className="max-w-full max-h-[82vh] rounded-2xl shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Siguiente"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 text-2xl font-bold shadow-glow"
          >›</button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <span className="bg-white/95 px-4 py-1.5 rounded-full font-display font-semibold text-sm shadow-glow">
              Vídeo {openIdx + 1} de {videos.length}
            </span>
            <a
              href={videos[openIdx].url}
              download={videos[openIdx].name}
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