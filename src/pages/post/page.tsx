import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import Footer from "@/pages/home/components/Footer";
import type { Tables } from "@/lib/supabase";

interface CommentItem { id: string; commenter_name: string; comment_body: string; created_at: string; }
function formatDate(dateStr: string) { return new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }).toUpperCase(); }

export default function PostDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Tables["posts"] | null>(null);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [commentName, setCommentName] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const load = async () => {
      setLoading(true);
      const { data, error: err } = await supabase.from("posts").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
      if (err || !data) { setError("Post not found."); setLoading(false); return; }
      setPost(data);
      const { data: cData } = await supabase.from("comments").select("id, commenter_name, comment_body, created_at").eq("post_id", data.id).eq("approved", true).order("created_at", { ascending: true });
      setComments(cData || []);
      setLoading(false);
    };
    load();
  }, [slug]);

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentBody.trim() || !post) return;
    setSubmitting(true);
    await supabase.from("comments").insert({ post_id: post.id, commenter_name: commentName.trim(), comment_body: commentBody.trim(), approved: true });
    setComments((prev) => [...prev, { id: Date.now().toString(), commenter_name: commentName.trim(), comment_body: commentBody.trim(), created_at: new Date().toISOString() }]);
    setCommentBody("");
    setSubmitting(false);
  };

  if (loading) return <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center"><div className="w-10 h-10 border-[3px] border-black border-t-neo-blue rounded-full animate-spin" /></div>;
  if (error || !post) return <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center gap-4"><p className="text-lg font-black text-black">{error || "Post not found."}</p><Link to="/" className="px-5 py-2 bg-neo-blue text-white font-bold text-sm border-[3px] border-black rounded-xl">Go Home</Link></div>;

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <header className="sticky top-0 z-50 w-full bg-[#F8F9FA]/95 backdrop-blur-sm border-b-[2px] border-black/10">
        <div className="flex items-center justify-between px-4 md:px-6 py-4 max-w-5xl mx-auto">
          <Link to="/" className="flex items-center gap-2"><span className="text-lg md:text-xl font-black tracking-tight text-black uppercase whitespace-nowrap">THE COMPOUND</span><span className="w-2.5 h-2.5 rounded-full bg-neo-green inline-block animate-pulse" /></Link>
        </div>
      </header>
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <main className="flex-1 lg:max-w-[680px]">
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 px-4 py-2 border-[2px] border-black rounded-xl bg-white text-sm font-bold text-black cursor-pointer whitespace-nowrap"><i className="ri-arrow-left-line text-sm" />Back</button>
              <span className="px-4 py-2 bg-neo-blue text-white text-xs font-black uppercase tracking-widest border-[2px] border-black rounded-xl">{post.category || "LIFE"}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black leading-[1.1] tracking-tight mb-4">{post.title}</h1>
            <p className="text-base md:text-lg text-black/50 italic font-medium leading-relaxed mb-6">{post.excerpt}</p>
            <div className="flex items-center gap-3 mb-8 pb-6 border-b-[2px] border-black/10">
              <div className="w-12 h-12 rounded-full bg-neo-blue border-[3px] border-black flex items-center justify-center shrink-0"><span className="text-sm font-black text-white">TC</span></div>
              <div><span className="text-xs font-black text-black uppercase tracking-widest">THE COMPOUND KID</span>
                <div className="flex items-center gap-2 text-xs text-black/40 font-bold mt-0.5"><span>{formatDate(post.published_at || post.created_at)}</span><span>·</span><span>{post.read_time_minutes || 5} MIN READ</span></div>
              </div>
            </div>
            {post.cover_image_url && <img src={post.cover_image_url} alt={post.title} className="w-full rounded-2xl border-[3px] border-black object-cover mb-8" style={{ maxHeight: "480px", objectPosition: "center" }} />}
            <article className="prose-content text-base md:text-lg text-black/85 font-medium leading-[1.85] mb-12" dangerouslySetInnerHTML={{ __html: post.content || "" }} />
            <h2 className="text-2xl md:text-3xl font-black text-black mb-4">COMMENTS ({comments.length})</h2>
            {comments.map((c) => (<div key={c.id} className="bg-white border-[2px] border-black rounded-xl p-4 mb-3"><span className="text-sm font-bold text-black">{c.commenter_name}</span><p className="text-sm text-black/70 mt-1">{c.comment_body}</p></div>))}
            <div className="bg-neo-blue border-[3px] border-black rounded-xl p-5 md:p-6" style={{ boxShadow: "4px 4px 0 0 #000000" }}>
              <form onSubmit={handleComment} className="space-y-3">
                <input type="text" value={commentName} onChange={(e) => setCommentName(e.target.value)} placeholder="Your name" required className="w-full bg-white border-[3px] border-black rounded-xl px-4 py-3 text-sm font-medium" />
                <textarea value={commentBody} onChange={(e) => setCommentBody(e.target.value.slice(0, 500))} placeholder="Write something..." required rows={4} maxLength={500} className="w-full bg-white border-[3px] border-black rounded-xl px-4 py-3 text-sm font-medium resize-none" />
                <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-white text-neo-blue font-black text-sm border-[3px] border-black rounded-xl cursor-pointer disabled:opacity-50 whitespace-nowrap">{submitting ? "Posting..." : "Submit"}</button>
              </form>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}