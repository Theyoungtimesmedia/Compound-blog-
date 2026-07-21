interface AIWritingPanelProps { isOpen: boolean; onClose: () => void; editorContent: string; postTitle: string; onApplySEO?: (a:string,b:string,c:string)=>void; onInsertContent?: (html:string,replace:boolean)=>void; }

export default function AIWritingPanel({ isOpen, onClose }: AIWritingPanelProps) {
  if (!isOpen) return null;
  return (<div className="fixed top-0 right-0 h-full z-[60] w-[380px] bg-gray-50 border-l-2 border-black/10 p-4"><div className="flex justify-between mb-4"><span className="text-sm font-black">AI Assistant</span><button onClick={onClose} className="cursor-pointer"><i className="ri-close-line" /></button></div><p className="text-xs text-black/40">AI writing assistant is available in the full source download.</p></div>);
}