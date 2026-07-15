import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Addiction Files", path: "/addiction-files" },
  { label: "Game", path: "/game" },
  { label: "Community", path: "/community" },
  { label: "Profile", path: "/profile" },
  { label: "Messages", path: "/messages" },
  { label: "Source", path: "/source" },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, signOut, isAdmin } = useAuth();

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b-[3px] border-black">
      <nav className="flex items-center justify-between px-4 md:px-8 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-xl md:text-2xl font-black tracking-tight text-black uppercase">
            THE COMPOUND
          </span>
          <span className="w-3 h-3 rounded-full bg-neo-amber inline-block animate-bounce-soft" />
        </Link>

        <div className="hidden md:flex items-center gap-3">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-bold border-[3px] border-black rounded-xl transition-all duration-150 whitespace-nowrap ${
                  active ? "bg-neo-blue text-white" : "bg-white text-black hover:-translate-x-0.5 hover:-translate-y-0.5"
                }`}
                style={!active ? { boxShadow: "3px 3px 0 0 #000000" } : {}}
              >
                {link.label}
              </Link>
            );
          })}
          {isAdmin && (
            <Link to="/admin" className="px-4 py-2 text-sm font-bold border-[3px] border-black rounded-xl bg-[#111118] text-white">
              Admin
            </Link>
          )}
          {user ? (
            <div className="flex items-center gap-2 ml-2">
              <Link to="/profile" className="flex items-center gap-2 px-3 py-2 border-[3px] border-black rounded-xl bg-neo-gray">
                <span className="text-xs font-bold text-black">{user.displayName}</span>
              </Link>
              <button onClick={signOut} className="w-8 h-8 flex items-center justify-center border-[3px] border-black rounded-lg bg-neo-pink text-white">
                <i className="ri-logout-box-r-line text-sm" />
              </button>
            </div>
          ) : (
            <Link to="/auth" className="px-4 py-2 text-sm font-bold bg-neo-blue text-white border-[3px] border-black rounded-xl">
              Log In
            </Link>
          )}
        </div>

        <button
          className="md:hidden w-10 h-10 flex items-center justify-center border-[3px] border-black rounded-xl bg-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <i className={`ri-${mobileOpen ? "close" : "menu"}-line text-xl`} />
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t-[3px] border-black px-4 pb-6 pt-4 space-y-3">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="block px-4 py-3 text-base font-bold border-[3px] border-black rounded-xl text-center">
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}