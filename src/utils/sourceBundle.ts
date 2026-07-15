import JSZip from "jszip";
import { fileContents } from "@/mocks/source-contents";

export async function downloadSourceZip(onProgress?: (msg: string) => void): Promise<void> {
  // Builds a ZIP file client-side from all embedded file contents
  // Uses JSZip to create the archive and triggers browser download
  const zip = new JSZip();
  const entries = Object.entries(fileContents);
  for (const [path, content] of entries) {
    zip.file(path, content);
  }
  const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "the-compound-source.zip";
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadSingleFileAs(content: string, fileName: string, language: string): void {
  // Downloads a single file converted to the target language
  const extMap: Record<string, string> = { python: "py", javascript: "js", /* ... */ };
  const ext = extMap[language] || "txt";
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName.replace(/\.[^.]+$/, "") + "." + ext;
  a.click();
  URL.revokeObjectURL(url);
}