import { Link } from "react-router-dom";
import NavBar from "@/pages/home/components/NavBar";
import { useAuth } from "@/hooks/useAuth";

export default function MessagesPage() {
  const { user } = useAuth();
  return (<div className="min-h-screen bg-neo-gray"><NavBar /><div className="max-w-2xl mx-auto px-4 py-8"><h1 className="text-2xl font-black text-black">Messages</h1>{!user && <Link to="/auth" className="mt-4 inline-block px-5 py-2 bg-neo-blue text-white border-2 border-black rounded-xl">Log In</Link>}</div></div>);
}