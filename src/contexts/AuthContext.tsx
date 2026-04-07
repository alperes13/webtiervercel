'use client';

import { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { UserSession } from '@/types';

interface AuthContextType {
  session: UserSession | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  login: (session: UserSession) => void;
  logout: () => void;
  updateSession: (updates: Partial<UserSession>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const {
    value: session,
    setValue: setSession,
    removeValue: removeSession,
    isHydrated,
  } = useLocalStorage<UserSession | null>('webtier_session', null);

  const isAuthenticated = useMemo(() => {
    if (!session) return false;
    return session.expiresAt > Date.now();
  }, [session]);

  const login = useCallback(
    (newSession: UserSession) => {
      setSession(newSession);
    },
    [setSession]
  );

  const logout = useCallback(() => {
    removeSession();
  }, [removeSession]);

  const updateSession = useCallback(
    (updates: Partial<UserSession>) => {
      if (session) {
        setSession({ ...session, ...updates });
      }
    },
    [session, setSession]
  );

  const value = useMemo(
    () => ({ session, isAuthenticated, isHydrated, login, logout, updateSession }),
    [session, isAuthenticated, isHydrated, login, logout, updateSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
