import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import LatestPosts from "./components/LatestPosts";
import WhoIsThis from "./components/WhoIsThis";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-neo-gray">
      <NavBar />
      <Hero />
      <div className="w-full px-4 md:px-8 py-10 md:py-14">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <LatestPosts />
            <div className="mt-12"><WhoIsThis /></div>
          </div>
          <div className="lg:w-[300px] shrink-0">
            <Sidebar />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}