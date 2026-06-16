import { useEffect } from "react";
import { downloadFile } from "@/lib/download";

type Props = {
  open: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  url: string;
  filename: string;
  index: number;
  total: number;
  label: "Foto" | "Vídeo";
  children: React.ReactNode;
};

export function Lightbox({
  open, onClose, onPrev, onNext, url, filename, index, total, label, children,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, onPrev, onNext]);

  if (!open) return null;

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(10, 20, 30, 0.75)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      {/* Prev arrow */}
      {total > 1 && (
        <button
          onClick={(e) => { stop(e); onPrev(); }}
          aria-label="Anterior"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-[10000] w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 text-2xl font-bold shadow-glow hover:scale-110 transition-transform flex items-center justify-center"
        >‹</button>
      )}

      {/* Next arrow */}
      {total > 1 && (
        <button
          onClick={(e) => { stop(e); onNext(); }}
          aria-label="Siguiente"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-[10000] w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 text-2xl font-bold shadow-glow hover:scale-110 transition-transform flex items-center justify-center"
        >›</button>
      )}

      {/* Central container */}
      <div
        onClick={stop}
        className="relative flex flex-col items-center"
        style={{
          maxWidth: "min(92vw, 900px)",
          maxHeight: "86vh",
        }}
      >
        {/* Close button */}
        <button
          onClick={(e) => { stop(e); onClose(); }}
          aria-label="Cerrar"
          className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-[10001] w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-xl font-bold shadow-glow flex items-center justify-center hover:scale-110 transition-transform"
        >✕</button>

        {/* Media frame */}
        <div
          className="overflow-hidden flex items-center justify-center"
          style={{
            background: "#FAF6EF",
            borderRadius: 24,
            boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
            maxWidth: "min(92vw, 900px)",
            maxHeight: "78vh",
          }}
        >
          {children}
        </div>

        {/* Footer: counter + download */}
        <div
          className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <span className="bg-white/95 px-4 py-2 rounded-full font-display font-semibold text-xs sm:text-sm shadow-glow text-sea-muted">
            {label} {index + 1} de {total}
          </span>
          <button
            onClick={(e) => { stop(e); downloadFile(url, filename); }}
            className="bg-sea text-white px-4 py-2 rounded-full font-display font-semibold text-xs sm:text-sm shadow-glow hover:scale-105 transition-transform inline-flex items-center gap-1.5"
          >
            <span aria-hidden>⬇️</span> Descargar
          </button>
        </div>
      </div>
    </div>
  );
}