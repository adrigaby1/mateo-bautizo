import { useEffect, useState } from "react";

const EVENT_DATE = new Date("2026-07-05T12:00:00");

export function Countdown() {
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

  const items = [
    { label: "Días", value: time.d, color: "bg-gradient-sea" },
    { label: "Horas", value: time.h, color: "bg-gradient-gold" },
    { label: "Min", value: time.m, color: "bg-gradient-sea" },
    { label: "Seg", value: time.s, color: "bg-gradient-gold" },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
      {items.map((it) => (
        <div key={it.label} className="flex flex-col items-center">
          <div className={`${it.color} w-full aspect-square rounded-2xl flex items-center justify-center shadow-soft`}>
            <span className="text-2xl sm:text-4xl font-display font-bold text-white drop-shadow">
              {String(it.value).padStart(2, "0")}
            </span>
          </div>
          <span className="mt-2 text-xs sm:text-sm font-display font-semibold text-foreground/70">{it.label}</span>
        </div>
      ))}
    </div>
  );
}
