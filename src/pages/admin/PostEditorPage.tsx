import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import { supabase } from "@/lib/supabase";

export default function AdminPostEditorPage() {
  const { id } = useParams(); const navigate = useNavigate();
  const isNew = !id || id === "new";
  const [title, setTitle] = useState(""); const [content, setContent] = useState("");
  const [category, setCategory] = useState("Life");
  const [saving, setSaving] = useState(false);
  useEffect(() => { if (isNew) return; supabase.from("posts").select("*").eq("id",id).maybeSingle().then(({data}) => { if(data) { setTitle(data.title); setContent(data.content||""); setCategory(data.category||"Life"); } }); }, [id,isNew]);
  const handleSave = async (publish = false) => {
    setSaving(true);
    const payload = { title, content, category, slug: title.toLowerCase().replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").slice(0,80), status: publish?"published":"draft", published_at: publish?new Date().toISOString():null };
    if (isNew) { const { data } = await supabase.from("posts").insert(payload).select().single(); if(data) navigate("/admin/posts/edit/"+data.id); }
    else await supabase.from("posts").update(payload).eq("id",id!);
    setSaving(false);
  };
  return (<AdminLayout><div className="p-5 md:p-8 max-w-4xl mx-auto"><div className="flex justify-between mb-6"><button onClick={()=>navigate("/admin/posts")} className="text-xs font-bold text-black/40 cursor-pointer">&larr; Back</button><div className="flex gap-2"><button onClick={()=>handleSave(false)} disabled={saving} className="px-4 py-2 bg-black/5 text-xs font-bold rounded-lg cursor-pointer">{saving?"Saving...":"Save"}</button><button onClick={()=>handleSave(true)} disabled={saving} className="px-4 py-2 bg-neo-blue text-white text-xs font-bold rounded-lg cursor-pointer">Publish</button></div></div><input type="text" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Post title..." className="w-full text-2xl font-black border-b-2 pb-2 mb-5 outline-none" /><select value={category} onChange={e=>setCategory(e.target.value)} className="bg-gray-50 border-2 border-black/10 rounded-lg px-3 py-2 mb-5 text-sm">{[ "Addiction Files","Tech","Faith","Personal","Life"].map(c=><option key={c}>{c}</option>)}</select><textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Start writing..." className="w-full min-h-[400px] bg-gray-50 border-2 border-black/10 rounded-lg p-4 text-sm resize-none" /></div></AdminLayout>);
}