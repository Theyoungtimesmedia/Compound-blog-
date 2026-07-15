import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/pages/home/components/NavBar";
import Footer from "@/pages/home/components/Footer";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

interface CommunityPostItem { id: string; body: string; likes_count: number; comments_count: number; created_at: string; }
const tabs = ["Posts", "About"];
function timeAgo(dateStr: string) { const diff = Date.now() - new Date(dateStr).getTime(); const mins = Math.floor(diff / 60000); if (mins < 60) return mins + "m ago"; const hrs = Math.floor(mins / 60); if (hrs < 24) return hrs + "h ago"; return Math.floor(hrs / 24) + "d ago"; }

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("Posts");
  const [profile, setProfile] = useState<{ display_name: string | null; username: string | null; bio: string | null; website: string | null; created_at: string; } | null>(null);
  const [posts, setPosts] = useState<CommunityPostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editBio, setEditBio] = useState("");
  const [editWebsite, setEditWebsite] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!user) { setLoading(false); return; }
      const { data: p } = await supabase.from("profiles").select("display_name, username, bio, website, created_at").eq("user_id", user.id).maybeSingle();
      setProfile(p); setEditBio(p?.bio || ""); setEditWebsite(p?.website || "");
      const { data: cp } = await supabase.from("community_posts").select("id, body, likes_count, comments_count, created_at").eq("user_id", user.id).order("created_at", { ascending: false });
      setPosts(cp || []); setLoading(false);
    };
    load();
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return; setSaving(true);
    await supabase.from("profiles").upsert({ user_id: user.id, username: profile?.username || user.displayName, display_name: profile?.display_name || user.displayName, bio: editBio, website: editWebsite }, { onConflict: "user_id" });
    setProfile((prev) => prev ? { ...prev, bio: editBio, website: editWebsite } : prev);
    setEditing(false); setSaving(false);
  };

  const displayName = profile?.display_name || user?.displayName || "Guest";
  const initials = displayName.charAt(0).toUpperCase();
  const joinedDate = profile?.created_at ? new Date(profile.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "Recently";

  return (
    <div className="min-h-screen bg-neo-gray">
      <NavBar />
      <div className="w-full h-40 md:h-56 border-b-[3px] border-black bg-[#0F172A]" />
      <div className="w-full px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative -mt-12 md:-mt-16 mb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-[4px] border-black bg-neo-blue flex items-center justify-center shrink-0" style={{ boxShadow: "4px 4px 0 0 #000000" }}><span className="text-3xl md:text-4xl font-black text-white">{initials}</span></div>
              <div className="flex-1 pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-black text-black">{displayName}</h1>
                    <p className="text-sm font-bold text-black/50">@{profile?.username || "user"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {user ? (<>
                      <button onClick={() => setEditing(!editing)} className="px-5 py-2 text-sm font-black bg-white text-black border-[3px] border-black rounded-xl cursor-pointer whitespace-nowrap" style={{ boxShadow: "3px 3px 0 0 #000000" }}>{editing ? "Cancel" : "Edit Profile"}</button>
                      <button onClick={signOut} className="px-5 py-2 text-sm font-black bg-neo-pink text-white border-[3px] border-black rounded-xl cursor-pointer whitespace-nowrap" style={{ boxShadow: "3px 3px 0 0 #000000" }}>Log Out</button>
                    </>) : (<Link to="/auth" className="px-5 py-2 text-sm font-black bg-neo-blue text-white border-[3px] border-black rounded-xl cursor-pointer whitespace-nowrap" style={{ boxShadow: "3px 3px 0 0 #000000" }}>Log In</Link>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white border-[3px] border-black rounded-xl p-4 md:p-5 mb-5" style={{ boxShadow: "4px 4px 0 0 #000000" }}>
            {editing ? (
              <div className="space-y-3">
                <textarea value={editBio} onChange={(e) => setEditBio(e.target.value)} rows={3} className="w-full bg-neo-gray border-[2px] border-black rounded-xl px-3 py-2 text-sm font-medium" />
                <button onClick={handleSaveProfile} disabled={saving} className="px-5 py-2 bg-neo-blue text-white font-black text-sm border-[3px] border-black rounded-xl cursor-pointer whitespace-nowrap">{saving ? "Saving..." : "Save Changes"}</button>
              </div>
            ) : (<p className="text-sm text-black/80 font-medium leading-relaxed">{profile?.bio || "No bio yet."}</p>)}
          </div>
          <div className="flex items-center gap-6 mb-5"><div className="text-center"><span className="text-lg font-black text-black">{posts.length}</span><span className="text-xs text-black/40 font-bold block">Posts</span></div></div>
          <div className="flex items-center gap-1 border-b-[3px] border-black mb-5">
            {tabs.map((tab) => (<button key={tab} onClick={() => setActiveTab(tab)} className={"px-4 py-2.5 text-sm font-black cursor-pointer whitespace-nowrap " + (activeTab === tab ? "text-black" : "text-black/40")}>{tab}</button>))}
          </div>
          <div className="pb-12">
            {loading ? <p className="text-sm text-black/40">Loading...</p> : posts.length === 0 ? <p className="text-sm text-black/40">No posts yet.</p> : posts.map((post) => (<div key={post.id} className="bg-white border-[3px] border-black rounded-xl p-4 mb-3" style={{ boxShadow: "4px 4px 0 0 #000000" }}><p className="text-sm text-black/80">{post.body}</p><span className="text-xs text-black/30">{timeAgo(post.created_at)}</span></div>))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}