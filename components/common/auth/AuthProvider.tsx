"use client";

import { createSupabaseClient } from "@/lib/supabase/client";
import { getPlayerWithUserId } from "@/services/supabase/players";
import { AppUser } from "@/types/User";
import { User } from "@supabase/supabase-js";
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

async function withPlayer(user: User | null): Promise<AppUser | null> {
  if (!user) return null;
  const player = await getPlayerWithUserId(user.id);
  return { ...user, player: player ?? null };
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
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      const authUser = session?.user ?? null;
      if (
        event === "INITIAL_SESSION" &&
        initialUser?.id === authUser?.id
      ) {
        setUser(initialUser);
        setIsLoading(false);
        return;
      }
      setUser(await withPlayer(authUser));
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [initialUser]);

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
