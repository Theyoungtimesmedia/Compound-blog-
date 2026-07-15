import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import type { Tables } from "@/lib/supabase";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [featuredPost, setFeaturedPost] = useState<Tables["posts"] | null>(null);
  const [hideAddiction, setHideAddiction] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const load = async () => {
      const { data: settingsData } = await supabase.from("site_settings").select("hide_addiction_content").eq("singleton", true).maybeSingle();
      const shouldHide = !!settingsData?.hide_addiction_content;
      setHideAddiction(shouldHide);
      const query = supabase.from("posts").select("*").eq("status", "published").order("published_at", { ascending: false }).limit(1);
      if (shouldHide) query.neq("category", "Addiction Files");
      const { data } = await query.maybeSingle();
      if (data) setFeaturedPost(data);
    };
    load();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-neo-gray border-b-[3px] border-black">
      <div className="w-full bg-neo-blue border-b-[3px] border-black overflow-hidden py-2.5">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, setIdx) => (<div key={setIdx} className="flex shrink-0">{[...Array(5)].map((_, i) => (<span key={i} className="text-sm font-black text-black mx-6 tracking-widest uppercase">Built from the compound · Raw · Honest · Nigerian · Youth ·</span>))}</div>))}
        </div>
      </div>
      <div className="relative z-10 w-full px-4 md:px-8 pt-10 md:pt-14 pb-12 md:pb-16 flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-8">
        <div className={"w-full lg:w-[55%] " + (visible ? "animate-slide-in-left" : "opacity-0")}>
          <span className="inline-flex items-center gap-2 font-mono text-xs text-black/60 tracking-wide mb-4 border-[2px] border-black rounded-lg px-3 py-1.5 bg-white font-bold"><span className="w-2 h-2 rounded-full bg-neo-blue animate-pulse" />/from_the_compound</span>
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-black tracking-tighter text-black leading-[0.85] mb-6">THE<br /><span className="text-neo-blue">COMPOUND</span></h1>
          <p className="text-lg md:text-xl text-black/80 font-medium mb-2">Where a 15-year-old Nigerian</p>
          <p className="text-xl md:text-2xl text-black italic font-bold mb-8">builds, breaks, and thinks too much.</p>
          <div className="flex flex-wrap gap-4">
            {featuredPost ? (
              <Link to={"/post/" + featuredPost.slug} className="px-6 py-3.5 bg-neo-blue text-white font-black text-base border-[3px] border-black rounded-xl cursor-pointer whitespace-nowrap" style={{ boxShadow: "5px 5px 0 0 #000000" }}>Start Reading <i className="ri-arrow-right-line ml-2" /></Link>
            ) : (
              <Link to={hideAddiction ? "/community" : "/addiction-files"} className="px-6 py-3.5 bg-neo-blue text-white font-black text-base border-[3px] border-black rounded-xl cursor-pointer whitespace-nowrap" style={{ boxShadow: "5px 5px 0 0 #000000" }}>Start Reading <i className="ri-arrow-right-line ml-2" /></Link>
            )}
            {!hideAddiction && <Link to="/addiction-files" className="px-6 py-3.5 bg-white text-black font-black text-base border-[3px] border-black rounded-xl cursor-pointer whitespace-nowrap" style={{ boxShadow: "5px 5px 0 0 #000000" }}>Addiction Files</Link>}
          </div>
        </div>
        <div className={"w-full lg:w-[45%] flex justify-center lg:justify-end " + (visible ? "animate-slide-in-right" : "opacity-0")} style={{ animationDelay: "0.2s" }}>
          <div className="bg-white p-2 border-[3px] border-black rounded-xl rotate-[-2deg] hover:rotate-0 transition-transform duration-300" style={{ boxShadow: "6px 6px 0 0 #000000" }}>
            <img src="https://readdy.ai/api/search-image?query=Bold%20neobrutalist%20abstract%20digital%20illustration%20featuring%20playful%20geometric%20shapes%20in%20electric%20blue%20vibrant%20green%20and%20coral%20pink%20with%20thick%20black%20outlines%20clean%20white%20background%20flat%20Memphis%20style%20design%20high%20contrast%20energetic%20youthful&width=600&height=500&seq=compound_hero_source&orientation=squarish" alt="The Compound" className="w-full max-w-md h-auto object-cover rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}