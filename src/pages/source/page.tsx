import NavBar from "@/pages/home/components/NavBar";
import Footer from "@/pages/home/components/Footer";

export default function SourcePage() {
  return (<div className="min-h-screen bg-neo-gray"><NavBar /><div className="max-w-7xl mx-auto px-4 py-12"><h1 className="text-4xl font-black text-black">Source Code</h1><p className="text-sm text-black/60 mt-4">Download the full source to explore the complete file tree with syntax highlighting and AI conversion.</p></div><Footer /></div>);
}