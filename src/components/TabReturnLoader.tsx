import { useEffect, useState } from "react";

export default function TabReturnLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        setShow(true);
        setTimeout(() => setShow(false), 1200);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl font-black tracking-tight text-black uppercase">THE COMPOUND</span>
      </div>
      <div className="w-40 h-[3px] bg-black/10 rounded-full overflow-hidden">
        <div className="h-full bg-neo-amber animate-[loading-bar_1s_ease-in-out_infinite]" style={{ width: "60%" }} />
      </div>
      <p className="text-xs text-black/30 font-bold mt-3">Loading your space...</p>
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(60%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}