import { useEffect, useState, createContext, useContext, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";

interface AuthUser { id: string; email: string; displayName: string; avatar: string; }
interface AuthContextType { user: AuthUser | null; isAdmin: boolean; loading: boolean; signIn: (email: string, password: string) => Promise<{error:string|null}>; signUp: (email: string, password: string, displayName: string) => Promise<{error:string|null}>; signOut: () => Promise<void>; }

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) buildUser(session.user).then(() => setLoading(false));
      else setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) buildUser(session.user);
      else { setUser(null); setIsAdmin(false); setLoading(false); }
    });
    return () => subscription.unsubscribe();
  }, []);

  const buildUser = async (authUser: { id: string; email?: string }) => {
    const { data: profile } = await supabase.from("profiles").select("display_name, username").eq("user_id", authUser.id).maybeSingle();
    const { data: adminRow } = await supabase.from("admin_users").select("user_id").eq("user_id", authUser.id).maybeSingle();
    setUser({ id: authUser.id, email: authUser.email || "", displayName: profile?.display_name || profile?.username || "User", avatar: (profile?.display_name || "U").charAt(0).toUpperCase() });
    setIsAdmin(!!adminRow);
    setLoading(false);
  };

  const signIn = async (email: string, password: string) => { const { error } = await supabase.auth.signInWithPassword({ email, password }); return { error: error?.message || null }; };
  const signUp = async (email: string, password: string, displayName: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { display_name: displayName } } });
    if (error) return { error: error.message };
    if (data.user) await supabase.from("profiles").insert({ user_id: data.user.id, username: displayName.toLowerCase().replace(/\s+/g,"_"), display_name: displayName });
    return { error: null };
  };
  const signOut = async () => { await supabase.auth.signOut(); setUser(null); setIsAdmin(false); };

  return (<AuthContext.Provider value={{ user, isAdmin, loading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>);
}

export function useAuth() { const ctx = useContext(AuthContext); if (!ctx) throw new Error("useAuth must be used within AuthProvider"); return ctx; }