import { useState, useEffect } from "react";
import NavBar from "@/pages/home/components/NavBar";
import Footer from "@/pages/home/components/Footer";
import GameCanvas from "./components/GameCanvas";
import { supabase } from "@/lib/supabase";

export default function GamePage() {
  const [hideAddiction, setHideAddiction] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("site_settings").select("hide_addiction_content").eq("singleton", true).maybeSingle();
      if (data?.hide_addiction_content) setHideAddiction(true);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-neo-gray">
      <NavBar />
      <section className="w-full px-4 md:px-8 py-12 md:py-20 bg-white border-b-[3px] border-black">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight leading-none">
            COMPOUND<br /><span className="text-neo-blue">LIFE</span>
          </h1>
          <p className="text-sm font-bold text-black/60 max-w-xs mt-4">Build habits. Break loops. Don&apos;t get too comfortable.</p>
          <div className="w-full bg-neo-blue border-[3px] border-black rounded-xl overflow-hidden py-3 mt-8">
            <div className="flex whitespace-nowrap animate-marquee">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="inline-flex items-center shrink-0 mx-8 text-sm font-black text-white">
                  Build habits. Break loops. Don&apos;t get too comfortable.
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="w-full px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-5xl mx-auto"><GameCanvas /></div>
      </section>
      <section className="w-full px-4 md:px-8 py-12 md:py-16 bg-white border-y-[3px] border-black">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-base md:text-lg text-black/70 font-medium leading-[1.9] mb-8">
            {hideAddiction
              ? "Games are fun. But the real game is learning when to step away. The pause screens get more thoughtful the longer you play. The level system celebrates breaks."
              : "Most people are addicted to something. Games included. Compound Life knows this. It's not trying to trap you — it's trying to teach you what a trap feels like from the inside."}
          </p>
        </div>
      </section>
      <section className="w-full px-4 md:px-8 py-12 md:py-16 bg-neo-gray">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-black mb-8">HOW IT <span className="text-neo-blue">WORKS</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Explore the Compound", "Mini-Games", "The Lesson"].map((title, i) => (
              <div key={i} className="bg-white border-[3px] border-black rounded-xl p-5 md:p-6" style={{ boxShadow: "4px 4px 0 0 #000000" }}>
                <h3 className="text-lg font-black text-black mb-2">{title}</h3>
                <p className="text-sm text-black/70 leading-relaxed font-medium">Learn to build better habits through gameplay.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}