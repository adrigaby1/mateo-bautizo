import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { MemoriesHero } from "@/components/MemoriesHero";
import { MemoriesGallery } from "@/components/MemoriesGallery";
import { MemoriesFarewell } from "@/components/MemoriesFarewell";
import { FloatingDecor } from "@/components/FloatingDecor";
import { MusicPlayer, type MusicPlayerHandle } from "@/components/MusicPlayer";

export const Route = createFileRoute("/malaga")({
  component: MalagaPage,
  head: () => ({
    meta: [
      { title: "🦄 Recuerdos del cumple de Camila en Málaga" },
      {
        name: "description",
        content: "Galería privada con fotos y vídeos del cumple de Camila en Málaga 💖",
      },
      { property: "og:title", content: "🦄 Recuerdos del cumple de Camila en Málaga" },
      {
        property: "og:description",
        content: "Gracias por acompañar a Camila en su día mágico en Málaga ✨",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

function MalagaPage() {
  const musicRef = useRef<MusicPlayerHandle>(null);

  return (
    <main className="relative min-h-screen bg-sky-magic overflow-x-hidden">
      <FloatingDecor />
      <div className="relative z-10">
        <MemoriesHero
          onViewMemories={() => musicRef.current?.tryPlay()}
          title="Gracias por acompañar a Camila en su día mágico en Málaga 🦄✨"
          subtitle="Camila estuvo muy feliz y emocionada de compartir este día con vosotros. Gracias por venir, por celebrar en familia y por tantos momentos bonitos. Será un cumpleaños que no olvidará 💖"
        />
        <MemoriesGallery
          bucket="camila-malaga-2026"
          title="Recuerdos del cumple de Camila en Málaga 📸🎥"
        />
        <MemoriesFarewell location="Málaga 2026" />
      </div>
      <MusicPlayer ref={musicRef} />
    </main>
  );
}
