export interface FileNode {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: FileNode[];
  language?: string;
}

export const fileTree: FileNode = {
  name: "the-compound",
  path: "",
  type: "directory",
  children: [
    { name: "index.html", path: "index.html", type: "file", language: "html" },
    { name: "package.json", path: "package.json", type: "file", language: "json" },
    { name: "project_plan.md", path: "project_plan.md", type: "file", language: "markdown" },
    { name: "tailwind.config.ts", path: "tailwind.config.ts", type: "file", language: "typescript" },
    { name: "vite.config.ts", path: "vite.config.ts", type: "file", language: "typescript" },
    {
      name: "src",
      path: "src",
      type: "directory",
      children: [
        { name: "App.tsx", path: "src/App.tsx", type: "file", language: "tsx" },
        { name: "main.tsx", path: "src/main.tsx", type: "file", language: "tsx" },
        { name: "index.css", path: "src/index.css", type: "file", language: "css" },
        { name: "components", path: "src/components", type: "directory", children: [
          { name: "TabReturnLoader.tsx", path: "src/components/TabReturnLoader.tsx", type: "file", language: "tsx" },
        ]},
        { name: "hooks", path: "src/hooks", type: "directory", children: [
          { name: "useAuth.tsx", path: "src/hooks/useAuth.tsx", type: "file", language: "tsx" },
        ]},
        { name: "lib", path: "src/lib", type: "directory", children: [
          { name: "supabase.ts", path: "src/lib/supabase.ts", type: "file", language: "typescript" },
        ]},
        { name: "mocks", path: "src/mocks", type: "directory", children: [
          { name: "addiction-data.ts", path: "src/mocks/addiction-data.ts", type: "file", language: "typescript" },
          { name: "community-data.ts", path: "src/mocks/community-data.ts", type: "file", language: "typescript" },
          { name: "game-data.ts", path: "src/mocks/game-data.ts", type: "file", language: "typescript" },
          { name: "posts.ts", path: "src/mocks/posts.ts", type: "file", language: "typescript" },
          { name: "source-code.ts", path: "src/mocks/source-code.ts", type: "file", language: "typescript" },
        ]},
        { name: "pages", path: "src/pages", type: "directory", children: [
          { name: "NotFound.tsx", path: "src/pages/NotFound.tsx", type: "file", language: "tsx" },
          { name: "addiction", path: "src/pages/addiction", type: "directory", children: [
            { name: "page.tsx", path: "src/pages/addiction/page.tsx", type: "file", language: "tsx" },
          ]},
          { name: "admin", path: "src/pages/admin", type: "directory", children: [
            { name: "LoginPage.tsx", path: "src/pages/admin/LoginPage.tsx", type: "file", language: "tsx" },
            { name: "DashboardPage.tsx", path: "src/pages/admin/DashboardPage.tsx", type: "file", language: "tsx" },
            { name: "PostEditorPage.tsx", path: "src/pages/admin/PostEditorPage.tsx", type: "file", language: "tsx" },
          ]},
          { name: "auth", path: "src/pages/auth", type: "directory", children: [
            { name: "page.tsx", path: "src/pages/auth/page.tsx", type: "file", language: "tsx" },
          ]},
          { name: "community", path: "src/pages/community", type: "directory", children: [
            { name: "page.tsx", path: "src/pages/community/page.tsx", type: "file", language: "tsx" },
          ]},
          { name: "game", path: "src/pages/game", type: "directory", children: [
            { name: "page.tsx", path: "src/pages/game/page.tsx", type: "file", language: "tsx" },
          ]},
          { name: "home", path: "src/pages/home", type: "directory", children: [
            { name: "page.tsx", path: "src/pages/home/page.tsx", type: "file", language: "tsx" },
            { name: "components", path: "src/pages/home/components", type: "directory", children: [
              { name: "NavBar.tsx", path: "src/pages/home/components/NavBar.tsx", type: "file", language: "tsx" },
              { name: "Hero.tsx", path: "src/pages/home/components/Hero.tsx", type: "file", language: "tsx" },
              { name: "Footer.tsx", path: "src/pages/home/components/Footer.tsx", type: "file", language: "tsx" },
            ]},
          ]},
          { name: "messages", path: "src/pages/messages", type: "directory", children: [
            { name: "page.tsx", path: "src/pages/messages/page.tsx", type: "file", language: "tsx" },
            { name: "ChatPage.tsx", path: "src/pages/messages/ChatPage.tsx", type: "file", language: "tsx" },
          ]},
          { name: "post", path: "src/pages/post", type: "directory", children: [
            { name: "page.tsx", path: "src/pages/post/page.tsx", type: "file", language: "tsx" },
          ]},
          { name: "profile", path: "src/pages/profile", type: "directory", children: [
            { name: "page.tsx", path: "src/pages/profile/page.tsx", type: "file", language: "tsx" },
          ]},
          { name: "source", path: "src/pages/source", type: "directory", children: [
            { name: "page.tsx", path: "src/pages/source/page.tsx", type: "file", language: "tsx" },
          ]},
        ]},
        { name: "router", path: "src/router", type: "directory", children: [
          { name: "config.tsx", path: "src/router/config.tsx", type: "file", language: "tsx" },
          { name: "index.ts", path: "src/router/index.ts", type: "file", language: "typescript" },
        ]},
        { name: "utils", path: "src/utils", type: "directory", children: [
          { name: "sourceBundle.ts", path: "src/utils/sourceBundle.ts", type: "file", language: "typescript" },
        ]},
      ],
    },
  ],
};

export function getLanguageFromPath(path: string): string {
  const ext = path.split(".").pop() || "";
  const map: Record<string, string> = {
    tsx: "tsx", ts: "typescript", jsx: "jsx", js: "javascript",
    css: "css", html: "html", json: "json", md: "markdown",
  };
  return map[ext] || "text";
}

export function flattenFileTree(node: FileNode): FileNode[] {
  const result: FileNode[] = [];
  if (node.type === "file") result.push(node);
  if (node.children) node.children.forEach((child) => result.push(...flattenFileTree(child)));
  return result;
}

export const allFiles = flattenFileTree(fileTree);