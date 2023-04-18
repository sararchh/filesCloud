import React, { createContext, useEffect, useState } from 'react';

import { getFolders } from "../services/foldersApi";

export const FoldersContext = createContext({});

export function FoldersProvider({ children }) {
  const [folders, setFolders] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [statusMenu, setStatusMenu] = useState(0);

  const handleGetFolders = async () => {
    const response = await getFolders();
    setFolders(response);
  }

  useEffect(() => {
    setStatusMenu(0);
    handleGetFolders();
  }, [openMenu === false]);

  return (
    <FoldersContext.Provider
      value={{
        folders,
        handleGetFolders,
        setOpenMenu,
        openMenu,
        statusMenu,
        setStatusMenu
      }}>
      {children}
    </FoldersContext.Provider>
  );
}
