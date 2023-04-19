import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export function UserProvider({ children }) {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState("");

  useEffect(() => {
    saveUserData();
  }, [])

  function saveUserData()  {
    const getToken = localStorage.getItem('@TOKEN');
    const getUserData = localStorage.getItem('@MAIL');
    setToken(getToken ? getToken : "");
    setUserData(getUserData ? JSON.parse(getUserData) : "");
  }

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        userData,
        setUserData,
        saveUserData
      }}>
      {children}
    </UserContext.Provider>
  );
}
