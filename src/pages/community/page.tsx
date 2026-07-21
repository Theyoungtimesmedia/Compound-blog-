import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/pages/home/components/NavBar";
import PostComposer from "./components/PostComposer";
import AskCompass from "./components/AskCompass";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

export default function CommunityPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { supabase.from("community_posts").select("*").order("created_at",{ascending:false}).limit(30).then(({data}) => { setPosts(data||[]); setLoading(false); }); }, []);
  return (<div className="min-h-screen bg-neo-gray"><NavBar /><div className="max-w-4xl mx-auto px-4 py-6"><h1 className="text-2xl font-black text-black mb-4">The Compound Floor</h1>{user ? <PostComposer onPost={(p:any)=>{}} /> : <Link to="/auth" className="block text-center p-3 bg-white border-2 border-black rounded-xl">Log in to post</Link>}<div className="space-y-4 mt-6">{loading ? <p>Loading...</p> : posts.map((p:any)=><div key={p.id} className="bg-white border-2 border-black rounded-xl p-4"><p>{p.body}</p></div>)}</div></div><AskCompass /></div>);
}