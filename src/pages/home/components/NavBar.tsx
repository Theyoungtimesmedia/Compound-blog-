import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { label: "Home", path: "/" }, { label: "Addiction Files", path: "/addiction-files" },
  { label: "Game", path: "/game" }, { label: "Community", path: "/community" },
  { label: "Profile", path: "/profile" }, { label: "Source", path: "/source" },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, signOut, isAdmin } = useAuth();
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (<header className="sticky top-0 z-50 w-full bg-white border-b-[3px] border-black"><nav className="flex items-center justify-between px-4 md:px-8 py-4"><Link to="/" className="flex items-center gap-2"><span className="text-xl md:text-2xl font-black text-black uppercase">THE COMPOUND</span></Link><div className="hidden md:flex items-center gap-3">{navLinks.map(link=><Link key={link.path} to={link.path} className={"relative px-4 py-2 text-sm font-bold border-[3px] border-black rounded-xl whitespace-nowrap "+(location.pathname===link.path?"bg-neo-blue text-white":"bg-white text-black")}>{link.label}</Link>)}{isAdmin&&<Link to="/admin" className="px-4 py-2 text-sm font-bold border-[3px] border-black rounded-xl bg-black text-white">Admin</Link>}{user?<button onClick={signOut} className="w-8 h-8 flex items-center justify-center border-[3px] border-black rounded-lg bg-neo-pink text-white cursor-pointer"><i className="ri-logout-box-r-line text-sm" /></button>:<Link to="/auth" className="px-4 py-2 text-sm font-bold bg-neo-blue text-white border-[3px] border-black rounded-xl">Log In</Link>}</div></nav></header>);
}