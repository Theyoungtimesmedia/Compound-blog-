import { Link } from "react-router-dom";
import NavBar from "@/pages/home/components/NavBar";
import Footer from "@/pages/home/components/Footer";

export default function PublicProfilePage() {
  return (<div className="min-h-screen bg-neo-gray"><NavBar /><div className="max-w-4xl mx-auto px-4 py-12"><h1 className="text-2xl font-black text-black">Public Profile</h1></div><Footer /></div>);
}