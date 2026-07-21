import { Link } from "react-router-dom";
import NavBar from "@/pages/home/components/NavBar";
import Footer from "@/pages/home/components/Footer";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  return (<div className="min-h-screen bg-neo-gray"><NavBar /><div className="max-w-4xl mx-auto px-4 py-12"><h1 className="text-2xl font-black text-black">Profile</h1><p className="text-sm text-black/60">{user?.displayName||"Guest"}</p>{user ? <button onClick={signOut} className="mt-4 px-5 py-2 bg-neo-pink text-white border-2 border-black rounded-xl">Log Out</button> : <Link to="/auth" className="mt-4 inline-block px-5 py-2 bg-neo-blue text-white border-2 border-black rounded-xl">Log In</Link>}</div><Footer /></div>);
}