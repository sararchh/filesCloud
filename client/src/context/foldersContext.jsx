import React, { createContext, useEffect, useState } from 'react';

import { deleteFolder, getFolders, updateFolder } from "../services/foldersApi";
import { toast } from 'react-toastify';

export const FoldersContext = createContext({});

export function FoldersProvider({ children }) {
  const [folders, setFolders] = useState([]);
  const [valueInputSearchFolder, setValueInputSearchFolder] = useState();

  const [openMenu, setOpenMenu] = useState(false);
  const [statusMenu, setStatusMenu] = useState(0);

  useEffect(() => {
    setStatusMenu(0);
    handleGetFolders();
  }, [openMenu === false]);



  const handleGetFolders = async () => {
    const response = await getFolders();
    setFolders(response);
  }

  const handleDeleteFolder = async (id) => {
    try {
      await deleteFolder(id);
      await handleGetFolders();
      setOpenMenu(false);

      toast.success("Excluido");
    } catch (error) {
      toast.error("Erro ao excluir");
    }
  }

  const handleRenameFolder = async (id, title) => {
    try {
      await updateFolder(id, { title });
      setOpenMenu(false);
    } catch (error) {
      toast.error("Erro ao renomear")
    }
  }

  return (
    <FoldersContext.Provider
      value={{
        folders,
        handleGetFolders,
        setOpenMenu,
        openMenu,
        statusMenu,
        setStatusMenu,
        handleRenameFolder,
        handleDeleteFolder,
        valueInputSearchFolder,
        setValueInputSearchFolder
      }}>
      {children}
    </FoldersContext.Provider>
  );
}
