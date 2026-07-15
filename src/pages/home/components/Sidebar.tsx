import { useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import type { Tables } from "@/lib/supabase";

export default function Sidebar() {
  const [trendingPosts, setTrendingPosts] = useState<Tables["posts"][]>([]);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [hideAddiction, setHideAddiction] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data: settingsData } = await supabase.from("site_settings").select("hide_addiction_content").eq("singleton", true).maybeSingle();
      if (settingsData?.hide_addiction_content) setHideAddiction(true);
      const query = supabase.from("posts").select("*").eq("status", "published").order("views", { ascending: false }).limit(5);
      if (hideAddiction) query.neq("category", "Addiction Files");
      const { data } = await query;
      setTrendingPosts(data || []);
    };
    load();
  }, [hideAddiction]);

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubmitting(true);
    try {
      await fetch("https://readdy.ai/api/form/d98sse3558j8vijmgu9g", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ email: email.trim() }).toString() });
    } catch { /* silent */ }
    setSubmitted(true); setEmail(""); setSubmitting(false);
  };

  return (
    <aside className="space-y-5 sticky top-24">
      <div className="bg-white border-[3px] border-black rounded-xl p-5" style={{ boxShadow: "4px 4px 0 0 #000" }}>
        <div className="w-14 h-14 rounded-full bg-neo-blue border-[3px] border-black flex items-center justify-center mb-3"><span className="text-lg font-black text-white">TC</span></div>
        <h3 className="text-sm font-black text-black">The Compound Kid</h3>
        <p className="text-xs text-black/40">Niger State, Nigeria</p>
        <p className="text-xs text-black/60 mt-2 leading-relaxed">I&apos;m 15. I build apps, go to church, and write about all of it.</p>
      </div>
      <div className="bg-white border-[3px] border-black rounded-xl p-5" style={{ boxShadow: "4px 4px 0 0 #000" }}>
        <h4 className="text-xs font-black uppercase tracking-widest mb-3">Trending</h4>
        {trendingPosts.slice(0, 5).map((post, i) => (<Link key={post.id} to={"/post/" + post.slug} className="flex items-start gap-2 text-xs font-bold text-black hover:text-neo-blue mb-2"><span className="text-black/20">{String(i + 1).padStart(2, "0")}</span>{post.title}</Link>))}
        {trendingPosts.length === 0 && <p className="text-xs text-black/40">No posts yet.</p>}
      </div>
      <div className="bg-white border-[3px] border-black rounded-xl p-5" style={{ boxShadow: "4px 4px 0 0 #000" }}>
        <h4 className="text-xs font-black uppercase tracking-widest mb-3">Categories</h4>
        <div className="flex flex-wrap gap-2">
          {(hideAddiction ? ["Faith", "Tech", "Life"] : ["Addiction Files", "Faith", "Tech", "Life"]).map((cat) => (<button key={cat} className="px-2.5 py-1 text-[10px] font-bold border-[2px] border-black rounded-lg bg-neo-gray hover:bg-neo-blue hover:text-white cursor-pointer whitespace-nowrap">{cat}</button>))}
        </div>
      </div>
      <div className="bg-neo-blue border-[3px] border-black rounded-xl p-5 text-white" style={{ boxShadow: "4px 4px 0 0 #000" }}>
        <h4 className="text-xs font-black uppercase tracking-widest mb-2 opacity-60">Newsletter</h4>
        <p className="text-sm font-bold leading-snug mb-4">New posts straight to your inbox.</p>
        <form onSubmit={handleSubscribe} className="space-y-2">
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="w-full bg-white/20 border-[2px] border-white/30 rounded-xl px-3 py-2 text-xs font-medium text-white placeholder:text-white/40" />
          <button type="submit" disabled={submitting} className="w-full px-4 py-2 bg-white text-neo-blue font-black text-xs border-[2px] border-black rounded-xl cursor-pointer disabled:opacity-50 whitespace-nowrap">{submitting ? "..." : submitted ? "You're in!" : "Subscribe"}</button>
        </form>
      </div>
    </aside>
  );
}