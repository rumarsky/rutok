import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([.$?*|{}()[]\\\/+^])/g, '\\$1') +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getCookie('accessToken'));

  useEffect(() => {
    setIsAuthenticated(!!getCookie('accessToken'));
  }, []);

  const login = (accessToken, refreshToken) => {
    document.cookie = `accessToken=${encodeURIComponent(accessToken)}`;
    document.cookie = `refreshToken=${encodeURIComponent(refreshToken)}`;
    setIsAuthenticated(true);
  };

  const logout = () => {
    document.cookie = 'accessToken=; Max-Age=0';
    document.cookie = 'refreshToken=; Max-Age=0';
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    getAccessToken: () => getCookie('accessToken'),
    getRefreshToken: () => getCookie('refreshToken'),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}