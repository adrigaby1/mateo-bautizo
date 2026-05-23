import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { Hero } from "@/components/Hero";
import { EventDetails } from "@/components/EventDetails";
import { Gallery } from "@/components/Gallery";
import { MiniGame } from "@/components/MiniGame";
import { Rsvp } from "@/components/Rsvp";
import { Farewell } from "@/components/Farewell";
import { EmotionalNote } from "@/components/EmotionalNote";
import { FloatingDecor } from "@/components/FloatingDecor";
import { MusicPlayer, type MusicPlayerHandle } from "@/components/MusicPlayer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "✨ Bautizo y 1er cumpleaños de Mateo · 5 julio 2026" },
      {
        name: "description",
        content:
          "Invitación al bautizo y 1er cumpleaños de Mateo el 5 de julio de 2026 en Marbella. Nos haría mucha ilusión que nos acompañes.",
      },
      { property: "og:title", content: "Bautizo y 1er cumpleaños de Mateo ✨" },
      {
        property: "og:description",
        content:
          "Domingo 5 de julio de 2026 · Iglesia La Encarnación + Simbad Beach · Marbella",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

function Index() {
  const musicRef = useRef<MusicPlayerHandle>(null);
  const [entered, setEntered] = useState(false);

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

  const handleEnter = () => {
    setEntered(true);
    musicRef.current?.tryPlay();
    setTimeout(() => {
      document.getElementById("ubicacion")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <main className="relative min-h-screen bg-sky-magic overflow-x-hidden">
      <FloatingDecor />
      <div className="relative z-10">
        <Hero onEnter={handleEnter} entered={entered} />
        <EventDetails />
        <Rsvp />
        <Gallery />
        <MiniGame />
        <EmotionalNote />
        <Farewell />
      </div>
      <MusicPlayer ref={musicRef} />
    </main>
  );
}
