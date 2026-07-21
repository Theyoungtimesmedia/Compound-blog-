import NavBar from "@/pages/home/components/NavBar";
import Footer from "@/pages/home/components/Footer";
import AddictionHeader from "./components/AddictionHeader";
import QuoteBlocks from "./components/QuoteBlocks";
import StreakSection from "./components/StreakSection";
import AddictionPosts from "./components/AddictionPosts";
import ShoutoutMarquee from "./components/ShoutoutMarquee";
import ClosingSection from "./components/ClosingSection";

export default function AddictionFiles() {
  return (<div className="min-h-screen bg-white"><NavBar /><AddictionHeader /><QuoteBlocks /><StreakSection /><AddictionPosts /><ShoutoutMarquee /><ClosingSection /><Footer /></div>);
}