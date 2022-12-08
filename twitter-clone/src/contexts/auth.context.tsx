import React, { createContext, useContext, useMemo, useState } from 'react';
import { logInToUserAccount } from '../api';
import { addNewUserAccount } from '../api';
import { UserInfo, UserProfile, AuthContextValue } from '../models';
import { AuthProviderProps } from './types';

const getTokenFromLocalStorage = () => {
  const token = window.localStorage.getItem('token');
  return token || null;
};

const storage = {
  getToken: () => getTokenFromLocalStorage(),
  setToken: (token: string) => window.localStorage.setItem('token', token),
  clear: () => window.localStorage.removeItem('token'),
};

export const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Provides the AuthContext to its child components.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const getToken = async () => Promise.resolve().then(() => storage.getToken());

  const login = async (userProfile: UserProfile) => {
    const isSuccessResponse = await logInToUserAccount(userProfile);
    storage.setToken('test'); // TODO: get from backend
    setIsSuccess(isSuccessResponse);
  };

  const registration = async (newUser: UserInfo) => {
    const isSuccessResponse = await addNewUserAccount(newUser);
    storage.setToken('test'); // TODO: get from backend
    setIsSuccess(isSuccessResponse);
  };

  const logout = () => {
    storage.clear();
    setIsSuccess(false);
  };

  const token = useMemo(() => storage.getToken(), [isSuccess]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
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
