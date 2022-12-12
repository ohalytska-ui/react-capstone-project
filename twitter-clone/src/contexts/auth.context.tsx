import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { logInToUserAccount } from '../api';
import { addNewUserAccount } from '../api';
import { UserInfo, UserProfile, AuthContextValue } from '../models';
import { AuthProviderProps } from './types';

const getTokenFromLocalStorage = (): string | null => {
  const token = localStorage.getItem('token');
  return token || null;
};

const storage = {
  getToken: () => getTokenFromLocalStorage(),
  setToken: (token: string) => localStorage.setItem('token', token),
  clear: () => localStorage.removeItem('token'),
};

export const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Provides the AuthContext to its child components.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>();
  const getToken = async () => Promise.resolve().then(() => storage.getToken());

  const login = async (userProfile: UserProfile) => {
    const res = await logInToUserAccount(userProfile);
    if (res?.token) {
      storage.setToken(res.token);
      setToken(res.token);
    }
  };

  const registration = async (newUser: UserInfo) => {
    const res = await addNewUserAccount(newUser);
    if (res?.token) {
      storage.setToken(res.token);
      setToken(res.token);
    }
  };

  const logout = () => {
    storage.clear();
    setToken(null);
  };

  useEffect(() => {
    const token = storage.getToken();
    if (token) {
      setToken(token);
    }
  }, [token]);

  const isAuthenticated = useMemo(() => !!token, [token]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        login,
        registration,
        logout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * ```ts
 * const {
 *   // Auth state:
 *   isAuthenticated,
 *   // Auth methods:
 *   login,
 *   registration,
 *   logout,
 *   getToken,
 * } = useAuth();
 * ```
 *
 * Use the `useAuth` hook in your components to access the auth state and methods.
 *
 * For getting user you should use refetchUser first
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be used within an AuthProvider`);
  }
  return context;
};
