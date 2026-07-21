import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import { supabase } from "@/lib/supabase";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({posts:0,pub:0});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([
      supabase.from("posts").select("*",{count:"exact",head:true}),
      supabase.from("posts").select("*",{count:"exact",head:true}).eq("status","published"),
    ]).then(([{count:t},{count:p}])=>{ setStats({posts:t||0,pub:p||0}); setLoading(false); });
  },[]);
  return (<AdminLayout><div className="p-4 md:p-8 max-w-7xl mx-auto"><div className="flex justify-between mb-8"><h1 className="text-2xl font-black text-black">Dashboard</h1><Link to="/admin/posts/new" className="px-5 py-2.5 bg-neo-blue text-white text-sm font-bold rounded-xl border-[3px] border-black cursor-pointer">New Post</Link></div>{loading?<p>Loading...</p>:<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">{[{l:"Total Posts",v:stats.posts},{l:"Published",v:stats.pub}].map(s=><div key={s.l} className="bg-white border-[3px] border-black rounded-xl p-5"><p className="text-2xl font-black text-black">{s.v}</p><p className="text-xs text-black/40 mt-1">{s.l}</p></div>)}</div>}<div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">{[{to:"/admin/posts",l:"Posts",i:"ri-article-line"},{to:"/admin/analytics",l:"Analytics",i:"ri-bar-chart-line"},{to:"/admin/settings",l:"Settings",i:"ri-settings-4-line"},{to:"/admin/streak",l:"Streak",i:"ri-fire-line"}].map(a=><Link key={a.l} to={a.to} className="flex flex-col items-center gap-2 p-4 bg-gray-50 border-2 border-black rounded-xl cursor-pointer"><i className={a.i+" text-lg text-black/40"} /><span className="text-xs font-black text-black/60">{a.l}</span></Link>)}</div></div></AdminLayout>);
}