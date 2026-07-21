import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Fill in both fields."); return; }
    setLoading(true);
    const { error: signInError } = await signIn(email, password);
    setLoading(false);
    if (signInError) { setError(signInError); return; }
    navigate("/admin");
  };

  return (<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4"><div className="w-full max-w-[400px]"><div className="text-center mb-10"><h1 className="text-2xl font-black text-black">THE COMPOUND</h1><p className="text-xs text-black/40 uppercase mt-1">Admin Access</p></div><div className="bg-white border-[3px] border-black rounded-xl p-6 md:p-8">{error && <div className="mb-4 px-3 py-2.5 bg-red-500/10 border-2 border-red-500/20 rounded-lg text-xs text-red-500">{error}</div>}<form onSubmit={handleSubmit} className="space-y-5"><div><label className="block text-xs font-bold text-black/40 mb-2">Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@thecompound.ng" className="w-full bg-white border-2 border-black/10 rounded-lg px-4 py-3 text-sm" /></div><div><label className="block text-xs font-bold text-black/40 mb-2">Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" className="w-full bg-white border-2 border-black/10 rounded-lg px-4 py-3 text-sm" /></div><button type="submit" disabled={loading} className="w-full bg-neo-blue text-white font-bold text-sm py-3 border-2 border-black rounded-lg disabled:opacity-50 cursor-pointer">{loading?"Signing in...":"Sign In"}</button></form></div></div></div>);
}