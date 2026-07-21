import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function LatestPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { supabase.from("posts").select("*").eq("status","published").order("published_at",{ascending:false}).limit(8).then(({data}) => { setPosts(data||[]); setLoading(false); }); }, []);
  return (<div className="w-full py-10"><div className="max-w-6xl mx-auto px-4"><h2 className="text-4xl font-black text-black mb-8">RECENT <span className="text-neo-blue">THOUGHTS</span></h2>{loading?<p>Loading...</p>:<div className="grid grid-cols-1 md:grid-cols-2 gap-6">{posts.map((p:any)=><article key={p.id} className="bg-white border-[3px] border-black rounded-xl overflow-hidden"><div className="p-6"><h3 className="text-lg font-black text-black">{p.title}</h3><Link to={"/post/"+p.slug} className="text-xs font-black text-black hover:text-neo-blue mt-2 inline-block">Read &rarr;</Link></div></article>)}</div>}</div></div>);
}