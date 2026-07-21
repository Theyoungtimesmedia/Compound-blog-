import { useEffect, useState } from "react";

export default function TabReturnLoader() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => { if (document.visibilityState === "visible") { setShow(true); setTimeout(() => setShow(false), 1200); } };
    document.addEventListener("visibilitychange", h);
    return () => document.removeEventListener("visibilitychange", h);
  }, []);
  if (!show) return null;
  return (<div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"><span className="text-xl font-black text-black">THE COMPOUND</span></div>);
}