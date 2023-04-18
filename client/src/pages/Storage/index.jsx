import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";

import { FiSearch } from "react-icons/fi";
import { GrClose } from "react-icons/gr";

import Button from "../../components/Button";
import CardFolder from "../../components/CardFolder";
import Input from "../../components/Input";
import Modal from "../../components/Modal";

import { FoldersContext } from "../../context/foldersContext";

import "./style.css";
import { toast } from "react-toastify";
import { createFolder } from "../../services/foldersApi";
const Storage = () => {
  const [valueInput, setValueInput] = useState();
  const [valueInputCreateFolder, setValueInputCreateFolder] = useState();
  const [newFolder, setNewFolder] = useState(false);

  const { handleGetFolders, setOpenMenu, folders } = useContext(FoldersContext);

  useEffect(() => {
    handleGetFolders();
  }, []);

  useEffect(() => {
    handleGetFolders();
  }, [newFolder === false])

  const handleCreateFolder = async () => {
    console.log(valueInputCreateFolder);
    try {
      await createFolder({ title: valueInputCreateFolder });
      setNewFolder(false);
    } catch (error) {
      toast.error("Erro ao cadastrar");
    }
  }

  return (
    <MainLayout>

      {newFolder === true &&
        < Modal >
          <div className="listing">
            <span className="divCenter" >
              <GrClose className="svgModal" onClick={() => { setNewFolder(false) }} style={{ marginRight: "20px" }} />
              <p className="textPoppinsTitleCardFolder">Criar pasta</p>
            </span>

            <Button
              width="80px"
              height="37px"
              borderRadius="50px"
              background="#476EE6"
              border="none"
              color="#FFFFFF"
              onClick={() => handleCreateFolder()}
            >
              Criar</Button>
          </div>
          <div className="divCenter" style={{ marginTop: "2rem" }}>
            <Input
              name="Nome da pasta"
              placeholder="Insira o nome da pasta"
              width="336px"
              height="45px"
              border="1px solid #E3E8EF"
              borderRadius="7px"
              padding="10px"
              marginTop="10px"
              outline="none"
              value={valueInputCreateFolder}
              onChange={(e) => setValueInputCreateFolder(e)}
            />
          </div>
        </Modal>
      }

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
          onClick={() => setNewFolder(true)}
        >
          Nova Pasta
        </Button>
      </div>

      <div className="contentCardFolders">

        {Boolean(folders.length) && folders?.map((item, index) => (
          <div key={index}>
            <CardFolder
              props={item}
            />
          </div>
        ))}

      </div>
    </MainLayout>
  );

}

export default Storage;