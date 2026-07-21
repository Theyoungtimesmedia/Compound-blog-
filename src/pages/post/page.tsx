import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function PostDetailPage() {
  const { slug } = useParams<{slug:string}>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { if (!slug) return; supabase.from("posts").select("*").eq("slug",slug).eq("status","published").maybeSingle().then(({data}) => { setPost(data); setLoading(false); }); }, [slug]);
  if (loading) return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  if (!post) return <div className="min-h-screen flex flex-col items-center justify-center"><p>Post not found.</p><Link to="/">Go Home</Link></div>;
  return (<div className="min-h-screen bg-white"><header className="border-b-2 border-black/10 p-4"><Link to="/" className="font-black text-black">THE COMPOUND</Link></header><main className="max-w-3xl mx-auto px-4 py-8"><h1 className="text-4xl font-black text-black">{post.title}</h1><article className="mt-6" dangerouslySetInnerHTML={{__html:post.content||""}} /></main></div>);
}