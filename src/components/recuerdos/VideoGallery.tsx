import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Pager } from "./PhotoGallery";
import { Lightbox } from "./Lightbox";
import { downloadFile } from "@/lib/download";

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
              <button
                onClick={(e) => { e.stopPropagation(); downloadFile(v.url, v.name); }}
                aria-label="Descargar vídeo"
                className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white/95 flex items-center justify-center text-sm shadow-soft hover:scale-110 transition-transform z-10"
              >
                ⬇
              </button>
            </div>
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
          url={videos[openIdx].url}
          filename={videos[openIdx].name}
          index={openIdx}
          total={videos.length}
          label="Vídeo"
        >
          <video
            key={videos[openIdx].url}
            src={videos[openIdx].url}
            controls
            autoPlay
            playsInline
            style={{
              maxWidth: "min(92vw, 900px)",
              maxHeight: "70vh",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              background: "#000",
              borderRadius: 20,
              display: "block",
            }}
          />
        </Lightbox>
      )}
    </div>
  );
}