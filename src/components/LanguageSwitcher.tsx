import { Link } from "@tanstack/react-router";

export function LanguageSwitcher({ current }: { current: "es" | "en" }) {
  const base =
    "px-2 py-1 rounded-full text-[11px] font-display tracking-wider transition-all";
  const active = "bg-white/90 text-foreground shadow-soft";
  const idle = "text-foreground/55 hover:text-foreground/80";
  return (
    <div className="fixed z-[100] top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-white/65 backdrop-blur-md border border-white/70 shadow-soft">
      <Link to="/" className={`${base} ${current === "es" ? active : idle}`} aria-label="Español">
        🇪🇸 ES
      </Link>
      <span className="text-foreground/30 text-[10px]">|</span>
      <Link to="/en" className={`${base} ${current === "en" ? active : idle}`} aria-label="English">
        🇬🇧 EN
      </Link>
    </div>
  );
}