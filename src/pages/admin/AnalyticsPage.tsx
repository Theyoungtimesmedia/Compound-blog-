import { useEffect, useState } from "react";
import AdminLayout from "./components/AdminLayout";
import { supabase } from "@/lib/supabase";

export default function AdminAnalyticsPage() {
  const [totalViews, setTotalViews] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => { supabase.from("posts").select("views").then(({data}) => { setTotalViews((data||[]).reduce((s:any,p:any)=>s+(p.views||0),0)); setLoading(false); }); }, []);
  return (<AdminLayout><div className="p-4 md:p-8 max-w-7xl mx-auto"><h1 className="text-2xl font-black text-black mb-8">Analytics</h1>{loading?<p>Loading...</p>:<div className="bg-white border-[3px] border-black rounded-xl p-5"><p className="text-2xl font-black text-black">{totalViews.toLocaleString()}</p><p className="text-xs text-black/40">Total Views</p></div>}</div></AdminLayout>);
}