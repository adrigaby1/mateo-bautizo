export function downloadMateoIcs() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Mateo Bautizo//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:mateo-bautizo-2026@mateo-bautizo.lovable.app`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    "DTSTART:20260705T100000Z",
    "DTEND:20260705T160000Z",
    "SUMMARY:Bautizo y 1er cumpleaños de Mateo",
    "LOCATION:Iglesia La Encarnación, Marbella",
    "DESCRIPTION:Bautizo a las 12:00 en Iglesia La Encarnación · Comida a las 14:30 en Simbad Restaurant\\, frente al mar",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "bautizo-mateo.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}