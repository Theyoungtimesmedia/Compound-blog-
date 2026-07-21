import { Link } from "react-router-dom";

export default function Footer() {
  return (<footer className="w-full bg-white border-t-[3px] border-black px-6 py-12"><div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between gap-6"><div><h3 className="text-2xl font-black text-black">THE COMPOUND</h3><p className="text-sm text-black/60 mt-2">Built from the compound.</p></div><nav className="flex flex-col gap-2"><Link to="/source" className="text-sm font-bold text-black hover:text-neo-blue">Source Code</Link><Link to="/community" className="text-sm font-bold text-black hover:text-neo-blue">Community</Link></nav></div><div className="max-w-6xl mx-auto mt-8 pt-6 border-t-2 border-black/10 text-xs text-black/50">&copy; 2026 The Compound Kid</div></footer>);
}