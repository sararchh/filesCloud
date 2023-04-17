import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";

import Input from "../../components/Input";

import { FiSearch } from "react-icons/fi";

import Button from "../../components/Button";
import CardFolder from "../../components/CardFolder";

import "./style.css";
import { getFolders } from "../../services/foldersApi";

const Storage = () => {
  const [valueInput, setValueInput] = useState();
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    handleGetFolders();
  }, []);

  const handleGetFolders = async () => {
    const response = await getFolders();
    setFolders(response);
  }

  console.log(folders);

  return (
    <MainLayout>

      <div className="contentSearch">
        <span className="inputSearch">
          <Input
            width="331px"
            height="45px"
            outline="none"
            borderRadius="60px"
            border="1px solid #D7D7D7"
            background="#FFFFFF"
            placeholder="Pesquisar pasta"
            padding="5px 45px"
            marginTopLabel="0"
            value={valueInput}
            onChange={(value) => setValueInput(value)}
          />

          <FiSearch className="svgSearch" />
        </span>

        <Button
          type="button"
          color="white"
          width="176px"
          height="45px"
          background="#476EE6"
          borderRadius="60px"
          border="none"
        >
          Nova Pasta
        </Button>
      </div>

      <div className="contentCardFolders">

        {Boolean(folders.length) && folders?.map((item) => (
          <>
            <CardFolder
            title={item.title}
            files_count={item.files_count}
            date={item.date}
            />
          </>
        ))}

      </div>

    </MainLayout>
  );

}

export default Storage;