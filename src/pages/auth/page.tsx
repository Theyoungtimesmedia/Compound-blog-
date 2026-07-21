import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Email and password required."); return; }
    setLoading(true);
    const { error: err } = await signIn(email, password);
    if (err) { setError(err); setLoading(false); return; }
    setLoading(false);
    navigate("/profile");
  };

  return (<div className="min-h-screen bg-neo-gray flex flex-col"><header className="bg-white border-b-2 border-black p-4"><Link to="/" className="font-black text-black">THE COMPOUND</Link></header><main className="flex-1 flex items-center justify-center"><div className="bg-white border-2 border-black rounded-xl p-8 max-w-md w-full"><h1 className="text-xl font-black mb-6">Log In</h1>{error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>}<form onSubmit={handleSubmit} className="space-y-4"><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full bg-gray-50 border-2 border-black/10 rounded-lg px-4 py-3" /><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full bg-gray-50 border-2 border-black/10 rounded-lg px-4 py-3" /><button type="submit" disabled={loading} className="w-full bg-neo-blue text-white font-bold py-3 rounded-lg border-2 border-black">{loading?"Loading...":"Log In"}</button></form></div></main></div>);
}