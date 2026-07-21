import JSZip from "jszip";
import { fileContents } from "@/mocks/source-contents.tsx";

export async function downloadSourceZip(onProgress?: (msg: string) => void): Promise<void> {
  const zip = new JSZip();
  Object.entries(fileContents).forEach(([path, content]) => zip.file(path, content));
  const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "the-compound-source.zip"; a.click();
  URL.revokeObjectURL(url);
}

export function downloadBlogHtml(): Promise<void> { return Promise.resolve(); }
export function downloadBlogZip(): Promise<void> { return Promise.resolve(); }
export function downloadHtmlFile(name: string, path: string, content: string): void {}
export function downloadSingleFileAs(content: string, fileName: string, language: string): void {}
