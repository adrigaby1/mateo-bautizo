import { useEffect, useState } from "react";

const EVENT_DATE = new Date("2026-07-05T12:00:00");

export function Countdown({ lang = "es" }: { lang?: "es" | "en" }) {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const t = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  function getTimeLeft() {
    const diff = EVENT_DATE.getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff / 3600000) % 24),
      m: Math.floor((diff / 60000) % 60),
      s: Math.floor((diff / 1000) % 60),
    };
  }

  const labels = lang === "en"
    ? { d: "Days", h: "Hours", m: "Min", s: "Sec" }
    : { d: "Días", h: "Horas", m: "Min", s: "Seg" };
  const items = [
    { label: labels.d, value: time.d },
    { label: labels.h, value: time.h },
    { label: labels.m, value: time.m },
    { label: labels.s, value: time.s },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-sm mx-auto">
      {items.map((it) => (
        <div key={it.label} className="flex flex-col items-center">
          <div className="w-full aspect-square rounded-2xl flex items-center justify-center bg-white/70 backdrop-blur border border-gold-soft/30">
            <span className="text-xl sm:text-3xl font-display font-semibold text-foreground/80">
              {String(it.value).padStart(2, "0")}
            </span>
          </div>
          <span className="mt-2 text-[10px] sm:text-xs font-display tracking-[0.18em] uppercase text-foreground/55">{it.label}</span>
        </div>
      ))}
    </div>
  );
}
