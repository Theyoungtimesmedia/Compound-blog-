import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubmitted(true); setEmail("");
  };

  return (
    <footer className="w-full bg-white border-t-[3px] border-black">
      <div className="px-6 md:px-12 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
          <div className="flex-1">
            <h3 className="text-3xl md:text-4xl font-black text-black tracking-tight mb-2">THE COMPOUND</h3>
            <p className="text-sm text-black/60 font-bold italic mb-8">Built from the compound</p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-sm">
              <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com" required className="neo-input flex-1" />
              <button type="submit" className="neo-btn neo-btn-primary">
                {submitted ? "You're in!" : "Join"}
              </button>
            </form>
          </div>

          <div className="flex-1">
            <h4 className="text-xs font-black text-black uppercase tracking-widest mb-6">Navigate</h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Addiction Files", path: "/addiction-files" },
                { label: "Game", path: "/game" },
                { label: "Community", path: "/community" },
                { label: "Source Code", path: "/source" },
              ].map((link) => (
                <Link key={link.path} to={link.path} className="text-sm font-bold text-black hover:text-neo-blue transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="mx-6 md:mx-12 py-6 border-t-[3px] border-black flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs font-bold text-black/50">&copy; 2026 The Compound Kid — Open Source</span>
        <Link to="/source" className="text-xs font-bold text-black/50 hover:text-black transition-colors">
          View Source
        </Link>
      </div>
    </footer>
  );
}