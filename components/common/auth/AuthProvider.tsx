"use client";

import { createSupabaseClient } from "@/lib/supabase/client";
import { getPlayerWithUserId } from "@/services/supabase/players";
import { AppUser } from "@/types/User";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextValue = {
  user: AppUser | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
  initialUser: AppUser | null;
}

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const [user, setUser] = useState<AppUser | null>(initialUser);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  useEffect(() => {
    const supabase = createSupabaseClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const authUser = session?.user ?? null;
      if (event === "INITIAL_SESSION" && initialUser?.id === authUser?.id) {
        setUser(initialUser);
        setIsLoading(false);
        return;
      }
      if (event === "TOKEN_REFRESHED") {
        setIsLoading(false);
        return;
      }
      if (!authUser) {
        setUser(null);
        setIsLoading(false);
        return;
      }
      setUser((prev) =>
        prev?.id === authUser.id
          ? { ...authUser, player: prev.player }
          : { ...authUser, player: null },
      );
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [initialUser]);

  useEffect(() => {
    if (!user?.id || user.player) return;

    let cancelled = false;
    getPlayerWithUserId(user.id).then((player) => {
      if (cancelled) return;
      setUser((prev) =>
        prev?.id === user.id ? { ...prev, player: player ?? null } : prev,
      );
    });

    return () => {
      cancelled = true;
    };
  }, [user?.id, user?.player]);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
