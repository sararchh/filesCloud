import React, { createContext, useEffect, useState } from 'react';

import { getFolders } from "../services/foldersApi";

export const FoldersContext = createContext({});

export function FoldersProvider({ children }) {
  const [folders, setFolders] = useState([]);

  const handleGetFolders = async () => {
    const response = await getFolders();
    setFolders(response);
  }

  return (
    <FoldersContext.Provider
      value={{
        folders,
        handleGetFolders
      }}>
      {children}
    </FoldersContext.Provider>
  );
}
