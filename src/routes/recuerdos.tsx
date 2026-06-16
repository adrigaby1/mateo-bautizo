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
  const [photos, setPhotos] = useState<Asset[]>([]);
  const [videos, setVideos] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const musicRef = useRef<MusicPlayerHandle>(null);

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

  return (
    <main className="relative min-h-screen bg-sky-magic overflow-x-hidden">
      <FloatingDecor />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 py-16 sm:py-20">
        <header className="text-center mb-12 reveal-up">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-display tracking-[0.18em] uppercase text-foreground/55 mb-4 hover:text-sea-muted transition-colors"
          >
            ← Invitación
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-sea-muted mb-3">
            Recuerdos del día especial de Mateo 📸🎥
          </h1>
          <p className="text-foreground/65 max-w-2xl mx-auto mb-3">
            Gracias por acompañarnos en un momento tan bonito. Aquí podréis ver y
            descargar las fotos y vídeos del Bautizo y 1er cumpleaños de Mateo 🤍
          </p>
          <p className="text-xs text-foreground/45 italic">
            Galería compartida solo con las personas que tienen este enlace.
          </p>
        </header>

        {loading ? (
          <p className="text-center text-foreground/55 py-16">Cargando recuerdos…</p>
        ) : (
          <>
            <section className="mb-16">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/60 backdrop-blur border border-gold-soft/40 text-[11px] font-display tracking-[0.22em] uppercase text-foreground/55">
                  Fotos
                </div>
              </div>
              <PhotoGallery photos={photos} />
            </section>

            <section>
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/60 backdrop-blur border border-gold-soft/40 text-[11px] font-display tracking-[0.22em] uppercase text-foreground/55">
                  Vídeos
                </div>
              </div>
              <VideoGallery videos={videos} />
            </section>
          </>
        )}
      </div>
      <MusicPlayer ref={musicRef} />
    </main>
  );
}

function Recuerdos() {
  return RECUERDOS_ENABLED ? <Active /> : <Disabled />;
}