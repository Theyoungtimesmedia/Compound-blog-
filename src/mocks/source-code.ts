export interface FileNode { name: string; path: string; type: "file"|"directory"; children?: FileNode[]; language?: string; }
export function getLanguageFromPath(path: string): string { const ext = path.split('.').pop()||''; const map: Record<string,string> = { tsx:'tsx', ts:'typescript', jsx:'jsx', js:'javascript', css:'css', html:'html', json:'json', md:'markdown' }; return map[ext]||'text'; }
export function flattenFileTree(node: FileNode): FileNode[] { const r: FileNode[]=[]; if(node.type==='file') r.push(node); if(node.children) node.children.forEach(c=>r.push(...flattenFileTree(c))); return r; }
export const fileTree: FileNode = { name:'the-compound',path:'',type:'directory',children:[] };
export const allFiles = flattenFileTree(fileTree);