/* eslint-disable react/jsx-no-constructed-context-values */
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'universal-cookie';
/* eslint-disable import/no-cycle */
import { useState, useContext, createContext } from 'react';

import Router from 'src/routes/sections';

import utenti from 'src/data/utenti.json';

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const cookies = new Cookies();

  const [user, setUser] = useState(cookies.get('__User') || { isAuthenticated: false });

  const login = (email, password) =>
    new Promise((resolve, reject) => {
      utenti.forEach((e) => {
        if (e.email === email && e.password === password && e.status === 'active') {
          setUser({ ...e, useremail: email, isAuthenticated: true });
          cookies.set('__User', JSON.stringify({ ...e, useremail: email, isAuthenticated: true }));
          resolve('success');
        }
      });

      reject(new Error('no logged'));
    });

  const logout = () => {
    cookies.remove('__User');
    setUser({ ...user, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router />
    </AuthContext.Provider>
  );
};
