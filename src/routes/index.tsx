import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { MemoriesHero } from "@/components/MemoriesHero";
import { MemoriesGallery } from "@/components/MemoriesGallery";
import { MemoriesFarewell } from "@/components/MemoriesFarewell";
import { FloatingDecor } from "@/components/FloatingDecor";
import { MusicPlayer, type MusicPlayerHandle } from "@/components/MusicPlayer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "🦄 Recuerdos del cumple de Camila" },
      {
        name: "description",
        content: "Galería privada con fotos y vídeos del cumpleaños mágico de Camila 💖",
      },
      { property: "og:title", content: "🦄 Recuerdos del cumple de Camila" },
      {
        property: "og:description",
        content: "Gracias por acompañar a Camila en su día mágico ✨",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

function Index() {
  const musicRef = useRef<MusicPlayerHandle>(null);

  return (
    <main className="relative min-h-screen bg-sky-magic overflow-x-hidden">
      <FloatingDecor />
      <div className="relative z-10">
        <MemoriesHero onViewMemories={() => musicRef.current?.tryPlay()} />
        <MemoriesGallery />
        <MemoriesFarewell />
      </div>
      <MusicPlayer ref={musicRef} />
    </main>
  );
}
