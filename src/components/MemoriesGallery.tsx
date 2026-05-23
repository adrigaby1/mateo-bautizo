import { useEffect, useState, useCallback, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Play,
  ArrowUp,
  Sparkles,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const DEFAULT_BUCKET = "camila-madrid-2026";
const PHOTOS_PREFIX = "fotos";
const VIDEOS_PREFIX = "videos";

const IMG_EXT = ["jpg", "jpeg", "png", "webp", "gif"];
const VID_EXT = ["mp4", "mov", "webm", "m4v"];

type MediaItem = {
  type: "photo" | "video";
  name: string;
  path: string;
  url: string;
  createdAt: string | null;
};

type LightboxTarget = { kind: "photo" | "video"; index: number } | null;

function extOf(name: string) {
  return name.split(".").pop()?.toLowerCase() ?? "";
}

async function listFolder(
  bucket: string,
  prefix: string,
  kind: "photo" | "video"
): Promise<MediaItem[]> {
  const { data, error } = await supabase.storage.from(bucket).list(prefix, {
    limit: 1000,
    sortBy: { column: "created_at", order: "desc" },
  });
  if (error || !data) return [];
  const allowed = kind === "photo" ? IMG_EXT : VID_EXT;
  return data
    .filter((f) => f.name && allowed.includes(extOf(f.name)))
    .map((f) => {
      const path = `${prefix}/${f.name}`;
      const { data: pub } = supabase.storage.from(bucket).getPublicUrl(path);
      return {
        type: kind,
        name: f.name,
        path,
        url: pub.publicUrl,
        createdAt: (f as any).created_at ?? null,
      };
    });
}

type GalleryProps = {
  bucket?: string;
  title?: string;
};

type PagerProps = {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
};

function Pager({ page, totalPages, onChange }: PagerProps) {
  if (totalPages <= 1) return null;
  const btn =
    "p-2 sm:px-3 sm:py-2 bg-white/90 text-foreground rounded-full shadow-card border-2 border-white/70 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all inline-flex items-center justify-center";
  return (
    <div className="mt-5 flex items-center justify-center gap-2 flex-wrap">
      <button
        onClick={() => onChange(1)}
        disabled={page === 1}
        aria-label="Primera página"
        className={btn}
      >
        <ChevronsLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className={btn + " gap-1"}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline font-display">Anterior</span>
      </button>
      <span className="px-4 py-2 bg-gradient-to-r from-pink-soft to-lilac text-foreground font-display font-bold rounded-full shadow-card border-2 border-white/70 text-sm whitespace-nowrap">
        Página {page} de {totalPages}
      </span>
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className={btn + " gap-1"}
      >
        <span className="hidden sm:inline font-display">Siguiente</span>
        <ChevronRight className="w-4 h-4" />
      </button>
      <button
        onClick={() => onChange(totalPages)}
        disabled={page === totalPages}
        aria-label="Última página"
        className={btn}
      >
        <ChevronsRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export function MemoriesGallery({ bucket = DEFAULT_BUCKET, title }: GalleryProps = {}) {
  const isMobile = useIsMobile();
  const [photos, setPhotos] = useState<MediaItem[]>([]);
  const [videos, setVideos] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [target, setTarget] = useState<LightboxTarget>(null);
  const [photoPage, setPhotoPage] = useState(1);
  const [videoPage, setVideoPage] = useState(1);

  const photosPerPage = isMobile ? 6 : 12;
  const videosPerPage = isMobile ? 4 : 6;

  useEffect(() => {
    let alive = true;
    (async () => {
      const [p, v] = await Promise.all([
        listFolder(bucket, PHOTOS_PREFIX, "photo"),
        listFolder(bucket, VIDEOS_PREFIX, "video"),
      ]);
      if (!alive) return;
      const sortFn = (a: MediaItem, b: MediaItem) => {
        const ta = a.createdAt ? Date.parse(a.createdAt) : 0;
        const tb = b.createdAt ? Date.parse(b.createdAt) : 0;
        return tb - ta;
      };
      setPhotos(p.sort(sortFn));
      setVideos(v.sort(sortFn));
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [bucket]);

  const photoTotalPages = Math.max(1, Math.ceil(photos.length / photosPerPage));
  const videoTotalPages = Math.max(1, Math.ceil(videos.length / videosPerPage));

  // Reset to valid page if breakpoint changes
  useEffect(() => {
    if (photoPage > photoTotalPages) setPhotoPage(1);
  }, [photoTotalPages, photoPage]);
  useEffect(() => {
    if (videoPage > videoTotalPages) setVideoPage(1);
  }, [videoTotalPages, videoPage]);

  const pagedPhotos = useMemo(
    () => photos.slice((photoPage - 1) * photosPerPage, photoPage * photosPerPage),
    [photos, photoPage, photosPerPage]
  );
  const pagedVideos = useMemo(
    () => videos.slice((videoPage - 1) * videosPerPage, videoPage * videosPerPage),
    [videos, videoPage, videosPerPage]
  );

  const close = useCallback(() => setTarget(null), []);
  const navigate = useCallback(
    (delta: number) => {
      setTarget((t) => {
        if (!t) return t;
        const list = t.kind === "photo" ? photos : videos;
        if (list.length === 0) return null;
        return { kind: t.kind, index: (t.index + delta + list.length) % list.length };
      });
    },
    [photos, videos]
  );

  useEffect(() => {
    if (!target) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [target, close, navigate]);

  const handleDownload = async (item: MediaItem) => {
    try {
      const res = await fetch(item.url);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = item.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      window.open(item.url, "_blank");
    }
  };

  const open: MediaItem | null = target
    ? (target.kind === "photo" ? photos : videos)[target.index] ?? null
    : null;
  const total = target ? (target.kind === "photo" ? photos.length : videos.length) : 0;

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToTopOfSection = () => {
    document.getElementById("recuerdos")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToPhotos = () => {
    document.getElementById("fotos-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const scrollToVideos = () => {
    document.getElementById("videos-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onPhotoPageChange = (p: number) => {
    setPhotoPage(p);
    requestAnimationFrame(scrollToPhotos);
  };
  const onVideoPageChange = (p: number) => {
    setVideoPage(p);
    requestAnimationFrame(scrollToVideos);
  };

  return (
    <section id="recuerdos" className="relative py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-rainbow leading-tight mb-3">
            {title ?? "Recuerdos del cumple de Camila 📸🎥"}
          </h2>
          <p className="text-foreground/70 text-base sm:text-lg max-w-xl mx-auto">
            Toca cualquier recuerdo para verlo en grande o descargarlo. 🦄✨
          </p>
          <p className="mt-4 text-xs text-muted-foreground italic">
            🔒 Galería compartida solo con las familias que tienen este enlace.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-foreground/60">
            Cargando recuerdos mágicos… ✨
          </div>
        ) : photos.length === 0 && videos.length === 0 ? (
          <div className="bg-card/80 backdrop-blur rounded-3xl shadow-card border-2 border-white/70 p-10 text-center">
            <div className="text-5xl mb-3">🦄</div>
            <p className="font-display text-xl mb-2">Las fotos llegan muy pronto…</p>
            <p className="text-sm text-foreground/60">
              Estamos preparando los recuerdos del cumple. ¡Vuelve en unos días! 🌈
            </p>
          </div>
        ) : (
          <>
            {/* PHOTOS BLOCK */}
            {photos.length > 0 && (
              <div id="fotos-grid" className="mb-12 scroll-mt-24">
                <h3 className="font-display text-xl sm:text-2xl text-foreground/80 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-magic" /> Fotos
                  <span className="text-sm font-normal text-foreground/50">
                    ({photos.length})
                  </span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {pagedPhotos.map((item, i) => {
                    const globalIdx = (photoPage - 1) * photosPerPage + i;
                    return (
                      <button
                        key={item.path}
                        onClick={() => setTarget({ kind: "photo", index: globalIdx })}
                        className="group relative aspect-square overflow-hidden rounded-2xl bg-muted shadow-card border-2 border-white/70 active:scale-95 transition-transform"
                      >
                        <img
                          src={item.url}
                          alt={item.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
                <Pager
                  page={photoPage}
                  totalPages={photoTotalPages}
                  onChange={onPhotoPageChange}
                />
              </div>
            )}

            {/* VIDEOS BLOCK */}
            {videos.length > 0 && (
              <div id="videos-grid" className="mb-8 scroll-mt-24">
                <h3 className="font-display text-xl sm:text-2xl text-foreground/80 mb-4 flex items-center gap-2">
                  <Play className="w-5 h-5 text-magic" /> Vídeos
                  <span className="text-sm font-normal text-foreground/50">
                    ({videos.length})
                  </span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {pagedVideos.map((item, i) => {
                    const globalIdx = (videoPage - 1) * videosPerPage + i;
                    return (
                      <div
                        key={item.path}
                        className="group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-lilac/40 to-sky-soft/40 shadow-card border-2 border-white/70"
                      >
                        <button
                          onClick={() => setTarget({ kind: "video", index: globalIdx })}
                          className="absolute inset-0 w-full h-full flex items-center justify-center active:scale-95 transition-transform"
                          aria-label="Reproducir vídeo"
                        >
                          <div className="bg-white/90 rounded-full p-4 shadow-glow">
                            <Play className="w-7 h-7 text-magic" fill="currentColor" />
                          </div>
                        </button>
                        <div className="absolute bottom-2 left-2 bg-white/90 rounded-full px-2 py-0.5 text-[10px] font-display pointer-events-none">
                          🎥 Vídeo
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(item);
                          }}
                          className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-2 shadow-glow active:scale-90 transition"
                          aria-label="Descargar vídeo"
                        >
                          <Download className="w-4 h-4 text-magic" />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <Pager
                  page={videoPage}
                  totalPages={videoTotalPages}
                  onChange={onVideoPageChange}
                />
              </div>
            )}

            {/* NAV BUTTONS */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={scrollToTopOfSection}
                className="px-5 py-3 bg-white/90 text-foreground font-display rounded-full shadow-card border-2 border-white/70 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" /> Subir
              </button>
              <button
                onClick={scrollTop}
                className="px-5 py-3 bg-white/90 text-foreground font-display rounded-full shadow-card border-2 border-white/70 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <ArrowUp className="w-4 h-4" /> Volver al inicio
              </button>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-6">
              💡 Puedes abrir y descargar cada foto o vídeo individualmente.
            </p>
          </>
        )}
      </div>

      {/* Lightbox */}
      {open && target && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 shadow-glow z-10"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 rounded-full px-4 py-1.5 text-sm font-display shadow-glow z-10">
            {target.kind === "photo" ? "Foto" : "Vídeo"} {target.index + 1} de {total}
          </div>

          {total > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(-1);
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-glow z-10"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(1);
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-glow z-10"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div
            className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {open.type === "photo" ? (
              <img
                key={open.path}
                src={open.url}
                alt={open.name}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-glow"
              />
            ) : (
              <video
                key={open.path}
                src={open.url}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="max-h-[75vh] w-auto max-w-full rounded-2xl shadow-glow bg-black"
              />
            )}

            <button
              onClick={() => handleDownload(open)}
              className="px-6 py-3 bg-gradient-magic text-white font-display font-bold rounded-full shadow-glow hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Descargar recuerdo
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
