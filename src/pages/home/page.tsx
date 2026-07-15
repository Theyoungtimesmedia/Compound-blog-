import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import LatestPosts from "./components/LatestPosts";
import WhoIsThis from "./components/WhoIsThis";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-neo-gray">
      <NavBar />
      <Hero />
      <LatestPosts />
      <WhoIsThis />
      <Footer />
    </div>
  );
}