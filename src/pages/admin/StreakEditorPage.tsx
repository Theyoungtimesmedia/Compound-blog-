import { useState, useEffect } from "react";
import AdminLayout from "./components/AdminLayout";
import { supabase } from "@/lib/supabase";

export default function AdminStreakPage() {
  const [current, setCurrent] = useState(0);
  const [longest, setLongest] = useState(0);
  const [saving, setSaving] = useState(false);
  useEffect(() => { supabase.from("streak_data").select("*").order("updated_at",{ascending:false}).limit(1).maybeSingle().then(({data}) => { if(data) { setCurrent(data.current_streak); setLongest(data.longest_streak); } }); }, []);
  const save = async () => { setSaving(true); await supabase.from("streak_data").update({current_streak:current,longest_streak:longest}).neq("id",""); setSaving(false); };
  return (<AdminLayout><div className="p-4 md:p-8 max-w-5xl mx-auto"><h1 className="text-2xl font-black text-black mb-8">Streak Editor</h1><div className="grid grid-cols-2 gap-4 mb-8"><div className="bg-white border-[3px] border-black rounded-xl p-5"><label className="block text-xs font-bold text-black/40 mb-1">Current</label><input type="number" value={current} onChange={e=>setCurrent(parseInt(e.target.value)||0)} className="w-full bg-gray-50 border-2 border-black/10 rounded-lg px-3 py-2 text-2xl font-black" /></div><div className="bg-white border-[3px] border-black rounded-xl p-5"><label className="block text-xs font-bold text-black/40 mb-1">Longest</label><input type="number" value={longest} onChange={e=>setLongest(parseInt(e.target.value)||0)} className="w-full bg-gray-50 border-2 border-black/10 rounded-lg px-3 py-2 text-2xl font-black" /></div></div><button onClick={save} disabled={saving} className="px-6 py-2.5 bg-neo-blue text-white text-xs font-black border-2 border-black rounded-lg cursor-pointer">{saving?"Saving...":"Save"}</button></div></AdminLayout>);
}