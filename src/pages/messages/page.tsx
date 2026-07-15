import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "@/pages/home/components/NavBar";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

interface MessageItem { id: string; sender_id: string; receiver_id: string; body: string; created_at: string; read_at: string | null; }
interface Conversation { userId: string; name: string; initials: string; color: string; lastMessage: string; lastTime: string; unread: number; }

export default function MessagesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    const load = async () => {
      const { data: msgs } = await supabase.from("messages").select("*").or("sender_id.eq." + user.id + ",receiver_id.eq." + user.id).order("created_at", { ascending: false });
      const msgList = msgs || [];
      const userIds = [...new Set(msgList.flatMap((m) => [m.sender_id, m.receiver_id]))].filter((id) => id !== user.id);
      let profMap: Record<string, { display_name: string | null; username: string | null }> = {};
      if (userIds.length > 0) {
        const { data: profData } = await supabase.from("profiles").select("user_id, display_name, username").in("user_id", userIds);
        profData?.forEach((p) => { profMap[p.user_id] = p; });
      }
      const convMap: Record<string, Conversation> = {};
      msgList.forEach((m) => {
        const otherId = m.sender_id === user.id ? m.receiver_id : m.sender_id;
        if (!convMap[otherId]) {
          const p = profMap[otherId];
          const name = p?.display_name || p?.username || "User";
          const colors = ["#22C55E", "#2563EB", "#F43F5E", "#F59E0B"];
          convMap[otherId] = { userId: otherId, name, initials: name.charAt(0).toUpperCase(), color: colors[otherId.charCodeAt(0) % colors.length], lastMessage: m.body, lastTime: new Date(m.created_at).toLocaleDateString(), unread: m.receiver_id === user.id && !m.read_at ? 1 : 0 };
        }
      });
      setConversations(Object.values(convMap));
      setLoading(false);
    };
    load();
  }, [user]);

  if (!user) return (<div className="min-h-screen bg-neo-gray"><NavBar /><div className="flex flex-col items-center justify-center flex-1 px-4 pt-20"><p className="text-sm font-black text-black/40 mb-2">Log in to see your messages</p><Link to="/auth" className="px-6 py-2.5 bg-neo-blue text-white font-black text-sm border-[3px] border-black rounded-xl">Log In</Link></div></div>);

  return (
    <div className="min-h-screen bg-neo-gray">
      <NavBar />
      <div className="w-full px-4 md:px-8 py-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-black text-black mb-4">Messages</h2>
          {loading ? <p className="text-sm text-black/40">Loading...</p> : conversations.length === 0 ? <p className="text-sm text-black/40">No messages yet.</p> : conversations.map((c) => (<button key={c.userId} onClick={() => navigate("/messages/" + c.userId)} className="w-full flex items-center gap-3 p-4 bg-white border-[3px] border-black rounded-xl mb-3 hover:bg-black/5 cursor-pointer" style={{ boxShadow: "3px 3px 0 0 #000000" }}><div className="w-10 h-10 rounded-full border-[3px] border-black flex items-center justify-center" style={{ backgroundColor: c.color }}><span className="text-sm font-black text-white">{c.initials}</span></div><div className="flex-1 text-left"><span className="text-sm font-black text-black">{c.name}</span><p className="text-xs text-black/50 truncate">{c.lastMessage}</p></div></button>))}
        </div>
      </div>
    </div>
  );
}