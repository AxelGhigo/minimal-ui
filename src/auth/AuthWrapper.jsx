/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-no-constructed-context-values */
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'universal-cookie';
/* eslint-disable import/no-cycle */
import { useState, useContext, createContext } from 'react';

import Router from 'src/routes/sections';

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const cookies = new Cookies();

  const [user, setUser] = useState(cookies.get('__User') || { isAuthenticated: false });

  const login = (email, password) =>
    new Promise((resolve, reject) => {
      fetch('https://api-parent-pay.vercel.app/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.error) reject(new Error(res.error));
          console.log('res', res);
          setUser({ ...res.data, isAuthenticated: true });
          cookies.set(
            '__User',
            JSON.stringify({
              ...res.data,
              jwt: res.accessToken,
              useremail: email,
              isAuthenticated: true,
            })
          );
          resolve('success');
        })
        .catch((error) => reject(new Error(error)));
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
