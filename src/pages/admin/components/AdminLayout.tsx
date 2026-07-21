import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const adminNav = [
  { label: "Dashboard", path: "/admin", icon: "ri-dashboard-line" },
  { label: "Posts", path: "/admin/posts", icon: "ri-article-line" },
  { label: "Streak", path: "/admin/streak", icon: "ri-fire-line" },
  { label: "Settings", path: "/admin/settings", icon: "ri-settings-4-line" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();
  useEffect(() => { if (!isAdmin && !user) navigate("/admin/login"); }, [isAdmin, user, navigate]);
  if (!isAdmin) return <div className="min-h-screen bg-white flex items-center justify-center"><div className="w-10 h-10 border-2 border-black/10 border-t-neo-blue rounded-full animate-spin" /></div>;
  return (<div className="min-h-screen bg-white flex"><aside className="hidden lg:flex flex-col w-[260px] bg-white border-r-[3px] border-black fixed h-screen"><div className="p-6 border-b-[3px] border-black"><Link to="/admin"><span className="text-sm font-black">THE COMPOUND</span></Link></div><nav className="flex-1 py-4 px-3 space-y-1">{adminNav.map(item=><Link key={item.path} to={item.path} className={"flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold border-2 "+(location.pathname===item.path?"bg-neo-blue text-white border-black":"text-black/50 border-transparent")}><i className={item.icon} />{item.label}</Link>)}</nav><div className="p-4 border-t-[3px] border-black"><button onClick={async()=>{await signOut();navigate("/admin/login");}} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-black/40 cursor-pointer"><i className="ri-logout-box-r-line" />Log Out</button></div></aside><main className="flex-1 lg:ml-[260px] pt-14 lg:pt-0 min-h-screen bg-[#F8FAFC]">{children}</main></div>);
}