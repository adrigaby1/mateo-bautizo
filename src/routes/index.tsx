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
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Link } from "@tanstack/react-router";
import { RECUERDOS_ENABLED } from "@/config/recuerdos";

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
      { name: "twitter:title", content: "Bautizo y 1er cumpleaños de Mateo ✨" },
      {
        name: "twitter:description",
        content:
          "Domingo 5 de julio de 2026 · Iglesia La Encarnación + Simbad Beach · Marbella",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        property: "og:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/yNS6AmhGPHT88PDgk5e37xao27q1/social-images/social-1779547075239-InShot_20260523_163644596.webp",
      },
      {
        name: "twitter:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/yNS6AmhGPHT88PDgk5e37xao27q1/social-images/social-1779547075239-InShot_20260523_163644596.webp",
      },
      { property: "og:url", content: "https://mateo-bautizo.lovable.app/" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://mateo-bautizo.lovable.app/" },
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
      <LanguageSwitcher current="es" />
      <div className="relative z-10">
        <Hero onEnter={handleEnter} entered={entered} />
        <EventDetails />
        <Rsvp />
        <Gallery />
        <MiniGame />
        <EmotionalNote />
        {RECUERDOS_ENABLED && (
          <div className="flex justify-center px-6 pb-4">
            <Link
              to="/recuerdos"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sea text-white font-display font-semibold shadow-glow hover:scale-105 transition-transform"
            >
              Ver recuerdos 📸
            </Link>
          </div>
        )}
        <Farewell />
      </div>
      <MusicPlayer ref={musicRef} />
    </main>
  );
}
