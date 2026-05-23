import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  emoji: string;
  size: number;
}

const EMOJIS = ["⭐", "✨", "🌟", "💖", "🦄", "🌈", "🎀"];

export function Confetti({ count = 30 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const arr: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 5,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      size: 16 + Math.random() * 20,
    }));
    setParticles(arr);
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute animate-fall"
          style={{
            left: `${p.left}%`,
            top: "-40px",
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            animationIterationCount: "infinite",
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
