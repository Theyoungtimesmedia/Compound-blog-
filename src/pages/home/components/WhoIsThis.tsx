import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function WhoIsThis() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full px-4 md:px-8 py-10 md:py-14 bg-white border-y-[3px] border-black">
      <div className={"max-w-5xl mx-auto " + (visible ? "animate-fade-up" : "opacity-0")}>
        <div className="neo-border bg-neo-blue/5 p-5 md:p-8 flex flex-col md:flex-row items-center gap-8 md:gap-10">
          <div className="w-36 h-36 md:w-44 md:h-44 border-[3px] border-black rounded-full bg-neo-green flex items-center justify-center shrink-0"><span className="text-5xl md:text-6xl text-black font-black">TC</span></div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-black mb-2">WHO IS <span className="text-neo-blue">THIS?</span></h2>
            <span className="inline-block font-mono text-sm text-black/60 mb-6 border-[2px] border-black rounded-lg px-3 py-1 bg-white font-bold">· The Compound Kid</span>
            <p className="text-base md:text-lg text-black/80 leading-[1.8] mb-8 font-medium">I&apos;m 15. I live in Nigeria. I build apps, go to church, fight battles nobody sees, and write about all of it. This blog is where I figure things out — faith, code, life. It&apos;s messy. It&apos;s honest. It&apos;s mine.</p>
            <Link to="/about" className="neo-btn neo-btn-secondary">Read my story <i className="ri-arrow-right-line ml-2" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}