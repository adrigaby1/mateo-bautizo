import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import {
  RECUERDOS_ENABLED,
  RECUERDOS_BUCKET,
  RECUERDOS_PHOTOS_FOLDER,
  RECUERDOS_VIDEOS_FOLDER,
  PHOTO_EXTS,
  VIDEO_EXTS,
} from "@/config/recuerdos";
import { supabase } from "@/integrations/supabase/client";
import { FloatingDecor } from "@/components/FloatingDecor";
import { MusicPlayer, type MusicPlayerHandle } from "@/components/MusicPlayer";
import { PhotoGallery } from "@/components/recuerdos/PhotoGallery";
import { VideoGallery } from "@/components/recuerdos/VideoGallery";
import mateoAvatar from "@/assets/mateo-recuerdos-avatar.png.asset.json";

export const Route = createFileRoute("/recuerdos")({
  component: Recuerdos,
  head: () => ({
    meta: [
      { title: "Recuerdos del día especial de Mateo 📸" },
      {
        name: "description",
        content:
          "Fotos y vídeos del Bautizo y 1er cumpleaños de Mateo. Galería privada compartida con familia y amigos.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

type Asset = { name: string; url: string };

async function listFolder(folder: string, allowed: string[]): Promise<Asset[]> {
  const { data, error } = await supabase.storage
    .from(RECUERDOS_BUCKET)
    .list(folder, { limit: 1000, sortBy: { column: "name", order: "asc" } });
  if (error || !data) return [];
  return data
    .filter((f) => {
      const ext = f.name.split(".").pop()?.toLowerCase();
      return ext && allowed.includes(ext);
    })
    .map((f) => {
      const path = `${folder}/${f.name}`;
      const { data: pub } = supabase.storage.from(RECUERDOS_BUCKET).getPublicUrl(path);
      return { name: f.name, url: pub.publicUrl };
    });
}

function Disabled() {
  return (
    <main className="relative min-h-[100svh] bg-sky-magic flex items-center justify-center px-6 overflow-hidden">
      <FloatingDecor />
      <div className="relative z-10 max-w-xl text-center bg-white/70 backdrop-blur-md border border-white/80 rounded-3xl shadow-soft p-8 sm:p-12 reveal-up">
        <div className="text-5xl mb-4">🤍</div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-sea-muted mb-3">
          Los recuerdos de Mateo estarán disponibles después del evento
        </h1>
        <p className="text-foreground/65 mb-8">
          Muy pronto compartiremos aquí las fotos y vídeos de este día tan especial.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sea text-white font-display font-semibold shadow-glow hover:scale-105 transition-transform"
        >
          ← Volver a la invitación
        </Link>
      </div>
    </main>
  );
}

function Active() {
  const [entered, setEntered] = useState(false);
  const [photos, setPhotos] = useState<Asset[]>([]);
  const [videos, setVideos] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const musicRef = useRef<MusicPlayerHandle>(null);

  useEffect(() => {
    if (!entered) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [entered]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [p, v] = await Promise.all([
        listFolder(RECUERDOS_PHOTOS_FOLDER, PHOTO_EXTS),
        listFolder(RECUERDOS_VIDEOS_FOLDER, VIDEO_EXTS),
      ]);
      if (cancelled) return;
      setPhotos(p);
      setVideos(v);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  const handleEnter = () => {
    setEntered(true);
    musicRef.current?.tryPlay();
  };

  return (
    <main className="relative min-h-screen bg-sky-magic overflow-x-hidden">
      <FloatingDecor />
      <RecuerdosWelcome onEnter={handleEnter} entered={entered} />
      <div className={`relative z-10 mx-auto w-full max-w-[1100px] px-4 sm:px-8 py-12 sm:py-16 transition-opacity duration-700 ${entered ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        {/* Back link */}
        <div className="mb-6 reveal-up">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-display tracking-[0.18em] uppercase text-foreground/55 hover:text-sea-muted transition-colors"
          >
            ← Invitación
          </Link>
        </div>

        {/* HERO */}
        <header className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/55 backdrop-blur-xl shadow-soft px-6 sm:px-12 pt-8 sm:pt-10 pb-10 sm:pb-12 text-center reveal-up">
          <div aria-hidden className="pointer-events-none absolute -top-10 -left-10 w-44 h-44 rounded-full bg-sky-med/40 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-12 -right-10 w-52 h-52 rounded-full bg-gold-soft/30 blur-3xl" />

          {/* Floating avatar with warm halo — matches invitation Hero */}
          <div className="relative mx-auto mb-5 flex items-center justify-center">
            <div
              aria-hidden
              className="absolute w-[28rem] h-[28rem] sm:w-[36rem] sm:h-[36rem] rounded-full opacity-80 blur-3xl pointer-events-none animate-halo-pulse"
              style={{
                background:
                  "radial-gradient(circle at 50% 45%, oklch(0.95 0.04 80 / 0.85) 0%, oklch(0.92 0.035 230 / 0.55) 40%, transparent 72%)",
              }}
            />
            <div
              aria-hidden
              className="absolute w-[24rem] h-[24rem] sm:w-[32rem] sm:h-[32rem] rounded-full bg-gold-soft opacity-30 blur-[110px] pointer-events-none"
            />
            <img
              src={mateoAvatar.url}
              alt="Avatar de Mateo"
              className="relative object-contain rounded-full animate-soft-float"
              style={{
                width: "clamp(160px, 22vw, 240px)",
                height: "clamp(160px, 22vw, 240px)",
                WebkitMaskImage:
                  "radial-gradient(circle at 50% 50%, #000 58%, rgba(0,0,0,0.85) 66%, rgba(0,0,0,0) 78%)",
                maskImage:
                  "radial-gradient(circle at 50% 50%, #000 58%, rgba(0,0,0,0.85) 66%, rgba(0,0,0,0) 78%)",
                filter:
                  "drop-shadow(0 24px 36px rgba(45,86,113,0.18)) drop-shadow(0 6px 12px rgba(221,190,135,0.28))",
              }}
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-gold-soft/40 text-[10px] font-display tracking-[0.25em] uppercase text-foreground/60 mb-4">
            <span>🌊</span> Álbum familiar <span>✨</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-semibold text-sea-muted leading-tight mb-4">
            Recuerdos del día especial<br className="hidden sm:block" /> de Mateo 📸🎥
          </h1>

          <p className="text-foreground/70 max-w-2xl mx-auto mb-5 text-sm sm:text-base leading-relaxed">
            Gracias por acompañarnos en un día tan bonito. Aquí podréis revivir
            y descargar los momentos más especiales del Bautizo y 1er cumpleaños
            de Mateo 🤍
          </p>

          <div className="relative max-w-xl mx-auto">
            <div className="rounded-2xl bg-gradient-to-r from-sand/60 via-cream to-sky-med/50 border border-white/80 px-5 py-3 shadow-soft">
              <p className="font-display italic text-sea-muted text-sm sm:text-base">
                “Un día lleno de cariño, familia y recuerdos para siempre.”
              </p>
            </div>
          </div>

          <p className="mt-6 text-[11px] text-foreground/45 italic">
            Galería compartida solo con las personas que tienen este enlace.
          </p>
        </header>

        {loading ? (
          <p className="text-center text-foreground/55 py-20">Cargando recuerdos…</p>
        ) : (
          <>
            {/* FOTOS */}
            <section className="mt-16 sm:mt-20 reveal-up">
              <SectionHeader
                kicker="Fotos"
                title="Fotos del recuerdo 📸"
                subtitle="Pequeños momentos llenos de emoción"
              />
              {photos.length === 0 ? (
                <EmptyCard text="Muy pronto añadiremos más fotos de este día tan especial." />
              ) : (
                <div className={photos.length < 4 ? "max-w-2xl mx-auto" : ""}>
                  <PhotoGallery photos={photos} />
                </div>
              )}
            </section>

            <Divider />

            {/* VÍDEOS */}
            <section className="reveal-up">
              <SectionHeader
                kicker="Vídeos"
                title="Vídeos del día 🎥"
                subtitle="Momentos para volver a vivir"
              />
              {videos.length === 0 ? (
                <EmptyCard text="Muy pronto añadiremos los vídeos de este día tan especial." />
              ) : (
                <div className={videos.length < 3 ? "max-w-3xl mx-auto" : ""}>
                  <VideoGallery videos={videos} />
                </div>
              )}
            </section>

            <Divider />

            {/* CIERRE EMOTIVO */}
            <section className="reveal-up">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/55 backdrop-blur-xl shadow-soft p-8 sm:p-12 text-center">
                <div aria-hidden className="pointer-events-none absolute -top-10 right-0 w-40 h-40 rounded-full bg-olive/25 blur-3xl" />
                <div className="text-4xl mb-3">🤍</div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-sea-muted mb-3">
                  Gracias por formar parte de este recuerdo
                </h2>
                <p className="text-foreground/70 max-w-xl mx-auto mb-7 text-sm sm:text-base leading-relaxed">
                  Nos hace mucha ilusión compartir estas fotos y vídeos con
                  vosotros. Gracias por acompañar a Mateo en un día tan especial
                  para nuestra familia.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-sea text-white font-display font-semibold shadow-glow hover:scale-105 transition-transform"
                >
                  ← Volver a la invitación
                </Link>
              </div>
            </section>
          </>
        )}
      </div>

      {/* Onda decorativa inferior */}
      <svg
        aria-hidden
        className="relative z-0 w-full h-16 sm:h-24 text-sky-med/50 mt-4"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 C200,100 400,0 600,40 C800,80 1000,20 1200,60 L1200,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>
      <MusicPlayer ref={musicRef} />
    </main>
  );
}

function Recuerdos() {
  return RECUERDOS_ENABLED ? <Active /> : <Disabled />;
}

function SectionHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/70 backdrop-blur border border-gold-soft/40 text-[10px] font-display tracking-[0.25em] uppercase text-foreground/55 mb-3">
        {kicker}
      </div>
      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-sea-muted">
        {title}
      </h2>
      <p className="text-foreground/60 text-sm sm:text-base mt-2">{subtitle}</p>
    </div>
  );
}

function Divider() {
  return (
    <div className="my-14 sm:my-20 flex items-center justify-center gap-4" aria-hidden>
      <span className="h-px w-20 sm:w-32 bg-gradient-to-r from-transparent to-gold-soft/70" />
      <span className="text-gold-soft text-lg">✦</span>
      <span className="h-px w-20 sm:w-32 bg-gradient-to-l from-transparent to-gold-soft/70" />
    </div>
  );
}

function EmptyCard({ text }: { text: string }) {
  return (
    <div className="max-w-md mx-auto text-center rounded-3xl border border-white/70 bg-white/55 backdrop-blur-md shadow-soft px-6 py-10">
      <div className="text-3xl mb-2">🌿</div>
      <p className="text-foreground/65 italic text-sm">{text}</p>
    </div>
  );
}