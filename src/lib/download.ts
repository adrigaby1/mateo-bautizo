export async function downloadFile(url: string, filename?: string): Promise<void> {
  const fallbackName = filename || url.split("/").pop()?.split("?")[0] || "recuerdo-mateo";
  try {
    const response = await fetch(url, { mode: "cors", credentials: "omit" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fallbackName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1500);
  } catch {
    // Fallback: open in new tab
    window.open(url, "_blank", "noopener,noreferrer");
  }
}