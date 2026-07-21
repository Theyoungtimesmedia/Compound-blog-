import { Link } from "react-router-dom";

export default function Hero() {
  return (<section className="w-full bg-neo-gray border-b-[3px] border-black"><div className="max-w-6xl mx-auto px-4 md:px-8 py-16"><div className="flex flex-col lg:flex-row items-start lg:items-center gap-8"><div className="flex-1"><h1 className="text-6xl md:text-8xl font-black text-black leading-[0.85] mb-6">THE<br /><span className="text-neo-blue">COMPOUND</span></h1><p className="text-lg text-black/80">Where a 15-year-old Nigerian builds, breaks, and thinks too much.</p><div className="flex gap-4 mt-8"><Link to="/addiction-files" className="px-6 py-3 bg-neo-blue text-white font-black border-[3px] border-black rounded-xl">Start Reading</Link></div></div></div></div></section>);
}