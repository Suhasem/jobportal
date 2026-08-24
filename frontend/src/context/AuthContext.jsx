import { createContext, useContext, useState, useCallback } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

function readStoredUser() {
  const raw = localStorage.getItem('jp_user');
  return raw ? JSON.parse(raw) : null;
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('jp_token'));
  const [user, setUser] = useState(readStoredUser);

  const persist = (authResponse) => {
    const { token: newToken, ...userInfo } = authResponse;
    localStorage.setItem('jp_token', newToken);
    localStorage.setItem('jp_user', JSON.stringify(userInfo));
    setToken(newToken);
    setUser(userInfo);
  };

  const login = useCallback(async (email, password) => {
    const response = await api.login({ email, password });
    persist(response);
    return response;
  }, []);

  const register = useCallback(async (name, email, password, role) => {
    const response = await api.register({ name, email, password, role });
    persist(response);
    return response;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('jp_token');
    localStorage.removeItem('jp_user');
    setToken(null);
    setUser(null);
  }, []);

  const value = { token, user, isAuthenticated: !!token, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
