export function FloatingDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-10 left-4 text-5xl animate-float-slow opacity-70">☁️</div>
      <div className="absolute top-24 right-8 text-3xl animate-twinkle opacity-80">✨</div>
      <div className="absolute top-44 left-10 text-2xl animate-twinkle opacity-60">⭐</div>
      <div className="absolute top-60 right-14 text-5xl animate-float-slow opacity-60">☁️</div>
      <div className="absolute bottom-40 left-6 text-3xl animate-float opacity-80">🐚</div>
      <div className="absolute bottom-24 right-10 text-3xl animate-float opacity-70">🌊</div>
      <div className="absolute top-1/2 left-3 text-xl animate-twinkle opacity-60">✨</div>
      <div className="absolute top-1/3 right-4 text-2xl animate-twinkle opacity-70">⭐</div>
    </div>
  );
}
