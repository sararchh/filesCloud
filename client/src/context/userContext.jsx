import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export function UserProvider({ children }) {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState("");

  useEffect(() => {
    if (typeof window !== undefined) {
      const getToken = localStorage.getItem('@TOKEN');
      const getUserData = localStorage.getItem('@MAIL');
      setToken(getToken ? getToken : "");
      setUserData(getUserData ? JSON.parse(getUserData) : "");
    }
  }, [])

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        userData,
        setUserData
      }}>
      {children}
    </UserContext.Provider>
  );
}
