import { useParams } from "react-router-dom";
import NavBar from "@/pages/home/components/NavBar";

export default function ChatPage() {
  const { userId } = useParams<{userId:string}>();
  return (<div className="min-h-screen bg-neo-gray"><NavBar /><div className="max-w-3xl mx-auto px-4 py-8"><h1 className="text-2xl font-black text-black">Chat with {userId}</h1></div></div>);
}