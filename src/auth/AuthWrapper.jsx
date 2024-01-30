/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/no-cycle */
import { useState, useContext, createContext } from 'react';

import Router from 'src/routes/sections';

import utenti from 'src/data/utenti.json';

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const [user, setUser] = useState({ useremail: '', isAuthenticated: false });

  const login = (email, password) =>
    new Promise((resolve, reject) => {
      utenti.forEach((e) => {
        if (e.email === email && e.password === password && e.status === 'active') {
          setUser({ ...e, useremail: email, isAuthenticated: true });
          resolve('success');
        }
      });

      reject(new Error('no logged'));
    });

  const logout = () => {
    setUser({ ...user, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router />
    </AuthContext.Provider>
  );
};
