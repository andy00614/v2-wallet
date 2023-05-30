'use client'

import { TokenManager } from '@/utils/storage';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, createContext, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
  login(eKey: string, publicKey: string): void
  logout(): void
}

// Create a Context
export const AuthContext = createContext<AuthContextType>({ isAuthenticated: false, setAuthenticated: () => { }, login: () => { }, logout: () => { } });

// Create a Provider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const pathName = usePathname()
  const router = useRouter()
  const params = useSearchParams()

  const login = (eKey: string, publicKey: string) => {
    const tokenManager = TokenManager.getInstance()
    tokenManager.setToken(eKey)
    tokenManager.setPublickKey(publicKey)
    setIsAuthenticated(true)
  }

  const logout = () => {
    const tokenManager = TokenManager.getInstance()
    tokenManager.removeToken()
    tokenManager.removePublicKey()
    setIsAuthenticated(false)
  }

  useEffect(() => {
    const handleRouterChange = () => {
      const tokenManger = TokenManager.getInstance();
      const publicKey = tokenManger.getPublicKey()
      if (publicKey?.length === 42) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
    handleRouterChange()
    const tokenManger = TokenManager.getInstance();
    const publicKey = tokenManger.getPublicKey()
    // 跳转逻辑，如果在首页，且已经登录了，直接调到钱包页面
    if (pathName === '/') {
      if (isAuthenticated) {
        router.push(`/account/${publicKey}`)
      }
    } else if (pathName === '/account') {
      console.log(params)
    }

  }, [pathName, isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated: setIsAuthenticated, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};
