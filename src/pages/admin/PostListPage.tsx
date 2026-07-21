import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import { supabase } from "@/lib/supabase";

export default function AdminPostListPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { supabase.from("posts").select("*").order("created_at",{ascending:false}).then(({data}) => { setPosts(data||[]); setLoading(false); }); }, []);
  return (<AdminLayout><div className="p-4 md:p-8 max-w-7xl mx-auto"><div className="flex justify-between mb-6"><h1 className="text-2xl font-black text-black">Posts</h1><Link to="/admin/posts/new" className="px-5 py-2.5 bg-neo-blue text-white text-sm font-bold rounded-xl border-[3px] border-black cursor-pointer">New Post</Link></div><div className="bg-white border-[3px] border-black rounded-xl overflow-hidden"><table className="w-full"><thead><tr className="border-b border-black/10"><th className="px-5 py-3 text-xs font-black text-black/30">Title</th><th className="px-5 py-3 text-xs font-black text-black/30">Status</th><th className="px-5 py-3 text-xs font-black text-black/30">Views</th></tr></thead><tbody>{loading?<tr><td colSpan={3} className="text-center py-8 text-xs text-black/30">Loading...</td></tr>:posts.map((p:any)=><tr key={p.id} className="border-b border-black/5"><td className="px-5 py-3 text-sm font-bold">{p.title}</td><td className="px-5 py-3"><span className={"px-2 py-0.5 rounded-full text-xs font-bold "+(p.status==="published"?"bg-neo-blue/10 text-neo-blue":"bg-black/5 text-black/40")}>{p.status}</span></td><td className="px-5 py-3 text-xs">{p.views||0}</td></tr>)}</tbody></table></div></div></AdminLayout>);
}