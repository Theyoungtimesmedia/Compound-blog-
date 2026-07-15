import { useState, useEffect, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import NavBar from "@/pages/home/components/NavBar";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

interface MessageItem { id: string; sender_id: string; receiver_id: string; body: string; image_url: string | null; video_url: string | null; sticker: string | null; created_at: string; read_at: string | null; }
interface ProfileInfo { user_id: string; display_name: string | null; username: string | null; }

export default function ChatPage() {
  const { userId } = useParams<{ userId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [otherProfile, setOtherProfile] = useState<ProfileInfo | null>(null);

  useEffect(() => {
    if (!userId || !user) { setLoading(false); return; }
    const load = async () => {
      const { data: prof } = await supabase.from("profiles").select("user_id, display_name, username").eq("user_id", userId).maybeSingle();
      setOtherProfile(prof);
      const { data } = await supabase.from("messages").select("*").or("and(sender_id.eq." + user.id + ",receiver_id.eq." + userId + "),and(sender_id.eq." + userId + ",receiver_id.eq." + user.id + ")").order("created_at", { ascending: true });
      setMessages(data || []);
      setLoading(false);
    };
    load();
  }, [userId, user]);

  const sendMessage = useCallback(async () => {
    if (!chatInput.trim() || !userId || !user) return;
    const trimmed = chatInput.trim();
    setChatInput("");
    const { data } = await supabase.from("messages").insert({ sender_id: user.id, receiver_id: userId, body: trimmed }).select().single();
    if (data) setMessages((prev) => [...prev, data]);
  }, [chatInput, userId, user]);

  const otherName = otherProfile?.display_name || otherProfile?.username || "User";
  const otherInitials = otherName.charAt(0).toUpperCase();

  if (!user) return (<div className="min-h-screen bg-neo-gray"><NavBar /><div className="flex flex-col items-center justify-center min-h-[60vh]"><p className="text-sm font-black text-black/40 mb-2">Log in to send messages</p><Link to="/auth" className="px-6 py-2.5 bg-neo-blue text-white font-black text-sm border-[3px] border-black rounded-xl">Log In</Link></div></div>);

  return (
    <div className="min-h-screen bg-neo-gray flex flex-col">
      <NavBar />
      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 py-4">
        <div className="flex items-center gap-3 mb-4 bg-white border-[3px] border-black rounded-xl p-3">
          <button onClick={() => navigate("/messages")} className="w-8 h-8 flex items-center justify-center"><i className="ri-arrow-left-line" /></button>
          <div className="w-10 h-10 rounded-full border-[3px] border-black flex items-center justify-center bg-neo-blue"><span className="text-sm font-black text-white">{otherInitials}</span></div>
          <span className="text-sm font-black text-black">{otherName}</span>
        </div>
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {loading ? <p className="text-sm text-black/40">Loading...</p> : messages.map((msg) => { const isMe = msg.sender_id === user?.id; return (<div key={msg.id} className={"flex " + (isMe ? "justify-end" : "justify-start")}><div className={"max-w-[80%] px-4 py-2.5 text-sm border-[2px] border-black rounded-xl " + (isMe ? "bg-neo-blue text-white" : "bg-white text-black")}><p>{msg.body}</p></div></div>); })}
        </div>
        <div className="flex items-center gap-2 bg-white border-[3px] border-black rounded-xl p-3">
          <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && chatInput.trim()) sendMessage(); }} placeholder="Type a message..." className="flex-1 bg-neo-gray border-[2px] border-black rounded-xl px-4 py-3 text-sm" />
          <button onClick={sendMessage} disabled={!chatInput.trim()} className="w-10 h-10 flex items-center justify-center bg-neo-blue text-white border-[2px] border-black rounded-xl disabled:opacity-30 cursor-pointer"><i className="ri-send-plane-fill" /></button>
        </div>
      </div>
    </div>
  );
}