export function FloatingDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-16 left-5 text-4xl animate-float-slow opacity-40">☁️</div>
      <div className="absolute top-32 right-8 text-2xl animate-twinkle opacity-50">✨</div>
      <div className="absolute bottom-40 left-6 text-2xl animate-float opacity-50">🐚</div>
      <div className="absolute bottom-24 right-10 text-2xl animate-float opacity-40">🌊</div>
      <div className="absolute top-1/3 right-4 text-xl animate-twinkle opacity-40">⭐</div>
    </div>
  );
}
