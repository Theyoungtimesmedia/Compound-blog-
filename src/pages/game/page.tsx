import { useState, useEffect } from "react";
import NavBar from "@/pages/home/components/NavBar";
import Footer from "@/pages/home/components/Footer";
import GameCanvas from "./components/GameCanvas";
import { supabase } from "@/lib/supabase";

export default function GamePage() {
  const [hideAddiction] = useState(false);
  useEffect(() => { supabase.from("site_settings").select("hide_addiction_content").eq("singleton",true).maybeSingle(); }, []);
  return (<div className="min-h-screen bg-neo-gray"><NavBar /><div className="px-4 md:px-8 py-12"><h1 className="text-4xl font-black text-black">COMPOUND<span className="text-neo-blue">LIFE</span></h1><GameCanvas /></div><Footer /></div>);
}