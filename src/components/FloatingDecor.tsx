export function FloatingDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-10 left-4 text-5xl animate-float-slow opacity-80">☁️</div>
      <div className="absolute top-20 right-8 text-4xl animate-float opacity-90">⭐</div>
      <div className="absolute top-40 left-12 text-3xl animate-twinkle">✨</div>
      <div className="absolute top-60 right-16 text-5xl animate-float-slow opacity-80">☁️</div>
      <div className="absolute bottom-32 left-8 text-4xl animate-float">🌈</div>
      <div className="absolute bottom-20 right-10 text-3xl animate-twinkle">💖</div>
      <div className="absolute top-1/2 left-2 text-2xl animate-twinkle opacity-70">⭐</div>
      <div className="absolute top-1/3 right-4 text-2xl animate-twinkle">✨</div>
    </div>
  );
}
