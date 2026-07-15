import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import AddictionFiles from "../pages/addiction/page";
import GamePage from "../pages/game/page";
import CommunityPage from "../pages/community/page";
import ProfilePage from "../pages/profile/page";
import PublicProfilePage from "../pages/profile/PublicProfilePage";
import MessagesPage from "../pages/messages/page";
import ChatPage from "../pages/messages/ChatPage";
import PostDetailPage from "../pages/post/page";
import SourcePage from "../pages/source/page";
import AuthPage from "../pages/auth/page";
import AdminLoginPage from "../pages/admin/LoginPage";
import AdminDashboardPage from "../pages/admin/DashboardPage";
import AdminPostListPage from "../pages/admin/PostListPage";
import AdminPostEditorPage from "../pages/admin/PostEditorPage";
import AdminStreakPage from "../pages/admin/StreakEditorPage";
import AdminSettingsPage from "../pages/admin/SettingsPage";
import AdminAnalyticsPage from "../pages/admin/AnalyticsPage";

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/addiction-files", element: <AddictionFiles /> },
  { path: "/game", element: <GamePage /> },
  { path: "/community", element: <CommunityPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/public-profile", element: <PublicProfilePage /> },
  { path: "/messages", element: <MessagesPage /> },
  { path: "/messages/:userId", element: <ChatPage /> },
  { path: "/post/:slug", element: <PostDetailPage /> },
  { path: "/source", element: <SourcePage /> },
  { path: "/auth", element: <AuthPage /> },
  { path: "/admin/login", element: <AdminLoginPage /> },
  { path: "/admin", element: <AdminDashboardPage /> },
  { path: "/admin/posts", element: <AdminPostListPage /> },
  { path: "/admin/posts/new", element: <AdminPostEditorPage /> },
  { path: "/admin/posts/edit/:id", element: <AdminPostEditorPage /> },
  { path: "/admin/streak", element: <AdminStreakPage /> },
  { path: "/admin/settings", element: <AdminSettingsPage /> },
  { path: "/admin/analytics", element: <AdminAnalyticsPage /> },
  { path: "*", element: <NotFound /> },
];

export default routes;