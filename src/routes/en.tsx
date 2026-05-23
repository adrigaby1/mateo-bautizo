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

export const Route = createFileRoute("/en")({
  component: IndexEn,
  head: () => ({
    meta: [
      { title: "Mateo Baptism & 1st Birthday · Marbella" },
      {
        name: "description",
        content:
          "Join us to celebrate Mateo's Baptism and 1st Birthday in Marbella on July 5th 2026 🌊",
      },
      { property: "og:title", content: "Mateo invites you to his special day" },
      {
        property: "og:description",
        content: "Baptism & 1st Birthday · Marbella · July 5th 2026",
      },
      { name: "twitter:title", content: "Mateo invites you to his special day" },
      {
        name: "twitter:description",
        content: "Baptism & 1st Birthday · Marbella · July 5th 2026",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "https://mateo-bautizo.lovable.app/og-en.jpg" },
      { name: "twitter:image", content: "https://mateo-bautizo.lovable.app/og-en.jpg" },
      { property: "og:url", content: "https://mateo-bautizo.lovable.app/en" },
      { property: "og:locale", content: "en_US" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://mateo-bautizo.lovable.app/en" },
    ],
  }),
});

function IndexEn() {
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
      <LanguageSwitcher current="en" />
      <div className="relative z-10">
        <Hero onEnter={handleEnter} entered={entered} lang="en" />
        <EventDetails lang="en" />
        <Rsvp lang="en" />
        <Gallery lang="en" />
        <MiniGame lang="en" />
        <EmotionalNote lang="en" />
        <Farewell lang="en" />
      </div>
      <MusicPlayer ref={musicRef} lang="en" />
    </main>
  );
}