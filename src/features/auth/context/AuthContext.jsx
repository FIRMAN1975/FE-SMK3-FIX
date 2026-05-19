import React, { createContext, useContext, useState, useEffect } from 'react';
import keycloak from '../../../config/keycloak';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    keycloak.init({ onLoad: 'check-sso', checkLoginIframe: false })
      .then((authenticated) => {
        setIsAuth(authenticated);
        setIsReady(true);
      })
      .catch(() => setIsReady(true));

    keycloak.onTokenExpired = () => {
      keycloak.updateToken(30).catch(() => setIsAuth(false));
    };
  }, []);

  const login = () => keycloak.login();
  const logout = () => keycloak.logout();

  if (!isReady) return <div>Memuat Sistem...</div>;

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, token: keycloak.token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);