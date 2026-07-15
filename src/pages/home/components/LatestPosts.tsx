import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import type { Tables } from "@/lib/supabase";

const allFilters = ["All", "Addiction Files", "Faith", "Tech", "Life"];

function estimateReadTime(content: string | null): number {
  if (!content) return 3;
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function LatestPosts() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [posts, setPosts] = useState<Tables["posts"][]>([]);
  const [loading, setLoading] = useState(true);
  const [hideAddiction, setHideAddiction] = useState(false);

  useEffect(() => {
    supabase.from("site_settings").select("hide_addiction_content").eq("singleton", true).maybeSingle().then(({ data }) => {
      if (data?.hide_addiction_content) setHideAddiction(true);
    });
  }, []);

  const filters = hideAddiction ? allFilters.filter((f) => f !== "Addiction Files") : allFilters;

  useEffect(() => {
    const load = async () => {
      let query = supabase.from("posts").select("*").eq("status", "published").order("published_at", { ascending: false }).limit(8);
      if (hideAddiction) query = query.neq("category", "Addiction Files");
      if (activeFilter !== "All") query = query.eq("category", activeFilter);
      const { data } = await query;
      let result = data || [];
      if (hideAddiction && activeFilter === "All") {
        result = result.filter((post: Tables["posts"]) => {
          const title = (post.title || "").toLowerCase();
          return !["addict", "addiction", "recovery", "sobriety", "withdrawal", "porn", "masturbat"].some((kw) => title.includes(kw));
        });
      }
      setPosts(result); setLoading(false);
    };
    load();
  }, [activeFilter, hideAddiction]);

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <div className="w-full px-4 md:px-8 py-10 md:py-14 bg-neo-gray">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight">RECENT <span className="text-neo-blue">THOUGHTS</span></h2>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (<button key={f} data-filter={f} onClick={() => setActiveFilter(f)} className={"px-4 py-2 text-sm font-bold border-[3px] border-black rounded-xl cursor-pointer whitespace-nowrap " + (activeFilter === f ? "bg-neo-blue text-white" : "bg-white text-black")} style={activeFilter !== f ? { boxShadow: "3px 3px 0 0 #000000" } : {}}>{f}</button>))}
          </div>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">{Array.from({ length: 4 }).map((_, i) => (<div key={i} className="bg-white border-[3px] border-black rounded-xl overflow-hidden animate-pulse" style={{ boxShadow: "4px 4px 0 0 #000" }}><div className="h-48 md:h-52 bg-black/5 border-b-[3px] border-black" /><div className="p-5 md:p-6 space-y-3"><div className="w-24 h-4 bg-black/5 rounded" /><div className="w-full h-6 bg-black/5 rounded" /></div></div>))}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {posts.map((post) => {
              const readTime = post.read_time_minutes || estimateReadTime(post.content);
              return (
                <article key={post.id} className="bg-white border-[3px] border-black rounded-xl overflow-hidden group" style={{ boxShadow: "4px 4px 0 0 #000" }}>
                  <div className="relative border-b-[3px] border-black overflow-hidden h-48 md:h-52">
                    <img src={post.cover_image_url || "https://readdy.ai/api/search-image?query=Minimalist%20abstract%20geometric%20shapes%20bold%20black%20outlines%20flat%20neobrutalist%20style%20blue%20green%20accents%20clean%20white%20background%20modern%20digital%20art&width=400&height=280&seq=fallback_post&orientation=landscape"} alt={post.title} className="w-full h-full object-cover object-top" />
                    <span className="absolute top-3 left-3 px-3 py-1 border-[2px] border-black rounded-lg text-[10px] font-black text-white bg-black">{post.category || "Blog"}</span>
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="flex items-center gap-3 mb-2 text-[10px] font-bold text-black/30 uppercase tracking-wider"><span>{formatDate(post.published_at || post.created_at)}</span><span className="w-1 h-1 rounded-full bg-black/20" /><span>{readTime} MIN READ</span></div>
                    <h3 className="text-lg md:text-xl font-black text-black mb-2 leading-tight">{post.title}</h3>
                    <p className="text-sm text-black/60 leading-relaxed mb-5 line-clamp-2 font-medium">{post.excerpt || post.title}</p>
                    <Link to={"/post/" + post.slug} className="inline-flex items-center gap-1 text-xs font-black text-black hover:text-neo-blue transition-colors">Read <i className="ri-arrow-right-line" /></Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
        {!loading && posts.length === 0 && <div className="text-center py-20 bg-white border-[3px] border-black rounded-xl" style={{ boxShadow: "4px 4px 0 0 #000" }}><p className="text-lg font-black text-black">No posts yet.</p></div>}
      </div>
    </div>
  );
}