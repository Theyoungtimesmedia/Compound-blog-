import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import { supabase } from "@/lib/supabase";

export default function AdminSettingsPage() {
  const [blogName, setBlogName] = useState("The Compound");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const handleSave = async () => { setSaving(true); await supabase.from("site_settings").update({blog_name:blogName}).eq("singleton",true); setSaving(false); setSaved(true); setTimeout(()=>setSaved(false),2500); };
  return (<AdminLayout><div className="p-4 md:p-8 max-w-3xl mx-auto"><div className="flex justify-between mb-8"><h1 className="text-2xl font-black text-black">Settings</h1><div className="flex items-center gap-2">{saved&&<span className="text-xs text-neo-blue font-bold">Saved!</span>}<button onClick={handleSave} disabled={saving} className="px-5 py-2.5 bg-neo-blue text-white text-xs font-black rounded-xl border-[3px] border-black cursor-pointer">{saving?"Saving...":"Save"}</button></div></div><div className="bg-white border-[3px] border-black rounded-xl p-6"><label className="block text-xs font-bold text-black/40 mb-1">Blog Name</label><input value={blogName} onChange={e=>setBlogName(e.target.value)} className="w-full bg-gray-50 border-2 border-black/10 rounded-lg px-4 py-2.5 text-sm" /></div><div className="mt-8"><Link to="/admin" className="text-xs text-neo-blue font-black">&larr; Dashboard</Link></div></div></AdminLayout>);
}