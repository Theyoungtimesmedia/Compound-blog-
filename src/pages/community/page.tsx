import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "@/pages/home/components/NavBar";
import PostComposer from "./components/PostComposer";
import AskCompass from "./components/AskCompass";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

interface ProfileInfo { user_id: string; display_name: string | null; username: string | null; }
interface CommunityPost { id: string; user_id: string; body: string; image_url: string | null; likes_count: number; comments_count: number; created_at: string; }

function timeAgo(dateStr: string) { const diff = Date.now() - new Date(dateStr).getTime(); const mins = Math.floor(diff / 60000); if (mins < 60) return mins + "m ago"; const hrs = Math.floor(mins / 60); if (hrs < 24) return hrs + "h ago"; return Math.floor(hrs / 24) + "d ago"; }

export default function CommunityPage() {
  const { user } = useAuth(); const navigate = useNavigate();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [profiles, setProfiles] = useState<Record<string, ProfileInfo>>({});
  const [loading, setLoading] = useState(true);
  const [hideAddiction, setHideAddiction] = useState(false);

  useEffect(() => { supabase.from("site_settings").select("hide_addiction_content").eq("singleton", true).maybeSingle().then(({ data }) => { if (data?.hide_addiction_content) setHideAddiction(true); }); }, []);

  const loadPosts = useCallback(async () => {
    const { data: postData } = await supabase.from("community_posts").select("*").order("created_at", { ascending: false }).limit(30);
    const postsList = postData || []; setPosts(postsList);
    const userIds = [...new Set(postsList.map((p: CommunityPost) => p.user_id))];
    if (userIds.length > 0) {
      const { data: profData } = await supabase.from("profiles").select("user_id, display_name, username").in("user_id", userIds);
      const profMap: Record<string, ProfileInfo> = {};
      profData?.forEach((p: ProfileInfo) => { profMap[p.user_id] = p; });
      setProfiles(profMap);
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  const handleNewPost = (newPost: CommunityPost) => { setPosts((prev) => [newPost, ...prev]); };

  function getAuthor(userId: string) {
    const p = profiles[userId];
    if (!p) return { name: "Anonymous", initials: "A", color: "#6B7280" };
    const name = p.display_name || p.username || "User";
    const colors = ["#22C55E", "#2563EB", "#F43F5E", "#F59E0B"];
    return { name, initials: name.charAt(0).toUpperCase(), color: colors[userId.charCodeAt(0) % colors.length] };
  }

  return (
    <div className="min-h-screen bg-neo-gray flex flex-col">
      <NavBar />
      <div className="flex-1 w-full px-4 md:px-8 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
            <div className="space-y-5">
              {user ? <PostComposer onPost={handleNewPost} /> : (
                <div className="bg-white border-[3px] border-black rounded-xl p-4 md:p-5" style={{ boxShadow: "4px 4px 0 0 #000000" }}>
                  <p className="text-sm font-bold text-black mb-2">What&apos;s on your mind?</p>
                  <Link to="/auth" className="block w-full bg-neo-gray border-[2px] border-black rounded-xl px-4 py-3 text-sm font-medium text-black/50 text-center">Log in to post something</Link>
                </div>
              )}
              <div className="flex items-center gap-3"><div className="h-[2px] flex-1 bg-black/10" /><span className="text-xs font-mono text-black/30 font-bold uppercase tracking-widest">Latest Posts</span><div className="h-[2px] flex-1 bg-black/10" /></div>
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (<div key={i} className="bg-white border-[3px] border-black rounded-xl p-5 animate-pulse" style={{ boxShadow: "4px 4px 0 0 #000000" }}><div className="space-y-2"><div className="w-full h-3 bg-black/5 rounded" /><div className="w-3/4 h-3 bg-black/5 rounded" /></div></div>))
              ) : posts.map((post) => {
                const author = getAuthor(post.user_id);
                return (
                  <div key={post.id} className="bg-white border-[3px] border-black rounded-xl p-4 md:p-5" style={{ boxShadow: "4px 4px 0 0 #000000" }}>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full border-[3px] border-black flex items-center justify-center shrink-0" style={{ backgroundColor: author.color }}><span className="text-sm font-black text-white">{author.initials}</span></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap mb-1">
                          <button onClick={() => navigate("/public-profile?id=" + post.user_id)} className="text-sm font-black text-black hover:text-neo-blue transition-colors cursor-pointer">{author.name}</button>
                          <span className="text-xs text-black/30">·</span><span className="text-xs text-black/30 font-bold">{timeAgo(post.created_at)}</span>
                        </div>
                        <p className="text-sm text-black/80 font-medium leading-relaxed whitespace-pre-wrap">{post.body}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 pt-3 border-t-[2px] border-black/5">
                      <button className="flex items-center gap-1.5 text-xs text-black/40 font-bold hover:text-neo-pink transition-colors cursor-pointer"><span className="w-4 h-4 flex items-center justify-center"><i className="ri-heart-line" /></span>{post.likes_count || 0}</button>
                      <button className="flex items-center gap-1.5 text-xs text-black/40 font-bold hover:text-neo-blue transition-colors cursor-pointer"><span className="w-4 h-4 flex items-center justify-center"><i className="ri-chat-1-line" /></span>{post.comments_count || 0}</button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="hidden lg:block space-y-5">
              <div className="bg-white border-[3px] border-black rounded-xl p-4" style={{ boxShadow: "4px 4px 0 0 #000000" }}>
                <h3 className="text-xs font-black text-black uppercase tracking-widest mb-3">Community Rules</h3>
                <ul className="space-y-2">
                  {["No shame. No judgment.", "Share what you want.", "Be kind."].map((rule, i) => (<li key={i} className="text-xs text-black/70 font-medium"><span className="font-black text-neo-blue">{i + 1}.</span> {rule}</li>))}
                </ul>
              </div>
              <div className="bg-white border-[3px] border-black rounded-xl p-4" style={{ boxShadow: "4px 4px 0 0 #000000" }}>
                <h3 className="text-xs font-black text-black uppercase tracking-widest mb-3">Trending</h3>
                <div className="flex flex-wrap gap-2">
                  {(hideAddiction ? ["#faith", "#tech", "#code", "#community"] : ["#streak", "#day1", "#faith", "#tech"]).map((tag) => (<span key={tag} className="px-2.5 py-1 text-xs font-bold border-[2px] border-black rounded-lg bg-neo-gray">{tag}</span>))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AskCompass />
    </div>
  );
}