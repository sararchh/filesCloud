import React, { useCallback, useContext, useEffect, useState } from "react";
import { debounce } from "lodash";

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

  const [valueInputCreateFolder, setValueInputCreateFolder] = useState();
  const [newFolder, setNewFolder] = useState(false);
 
  const [valueInputModal, setValueInputModal] = useState();
  const [filteredFolder, setFilteredFolder] = useState([]);

  const { handleGetFolders, folders, setOpenMenu, openMenu, statusMenu, setStatusMenu, handleRenameFolder,
    handleDeleteFolder, valueInputSearchFolder, setValueInputSearchFolder, selectedItem, setSelectedItem } = useContext(FoldersContext);

  useEffect(() => {
    handleGetFolders();
  }, []);

  useEffect(() => {
    handleGetFolders();
  }, [newFolder === false])

  const handleCreateFolder = async () => {
    try {
      await createFolder({ title: valueInputCreateFolder });
      setNewFolder(false);
    } catch (error) {
      toast.error("Erro ao cadastrar");
    }
  }

  const searchFolders = useCallback(
    debounce((value, folders) => filterFolders(value, folders), 500),
    []
  )

  const filterFolders = (value, folders) => {
    const newArray = folders.filter((i) => i.title.toUpperCase().trim() === value.toUpperCase().trim());
    setFilteredFolder(newArray)
  }

  return (
    <MainLayout pageTitle="Armazenamento">

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

      {openMenu === true &&
        <div>
          {statusMenu === 0 &&
            < Modal >
              <div className="listing">
                <p className="textPoppinsTitleCardFolder">Ações</p>
                <GrClose className="svgModal" onClick={() => { setOpenMenu(false) }} />
              </div>
              <div className="listing divCenter">
                <p className="textPoppinsTitleCardFolder" onClick={() => setStatusMenu(1)}>Editar nome pasta</p>
              </div>
              <div className="listing divCenter">
                <p className="textPoppinsRed" onClick={() => setStatusMenu(2)}>Excluir pasta</p>
              </div>
            </Modal>
          }

          {statusMenu === 1 &&
            < Modal >
              <div className="listing">
                <span className="divCenter" >
                  <GrClose className="svgModal" onClick={() => { setOpenMenu(false) }} style={{ marginRight: "20px" }} />
                  <p className="textPoppinsTitleCardFolder">Renomear pasta</p>
                </span>

                <Button
                  width="80px"
                  height="37px"
                  borderRadius="50px"
                  background="#476EE6"
                  border="none"
                  color="#FFFFFF"
                  onClick={() => handleRenameFolder(selectedItem?.id, valueInputModal)}
                >
                  Renomear</Button>
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
                  value={valueInputModal}
                  onChange={(e) => setValueInputModal(e)}
                />
              </div>
            </Modal>
          }


          {statusMenu === 2 &&
            < Modal >
              <div className="listing">
                <span className="divCenter" >
                  <GrClose className="svgModal" onClick={() => { setOpenMenu(false) }} style={{ marginRight: "20px" }} />
                  <p className="textPoppinsTitleCardFolder">Excluir pasta</p>
                </span>

                <Button
                  width="80px"
                  height="37px"
                  borderRadius="50px"
                  background="#FFE1E1"
                  border="none"
                  color="#EA0000"
                  onClick={() => handleDeleteFolder(selectedItem?.id)}
                >
                  Excluir</Button>
              </div>
              <div className="divCenter divAlignCenterText">
                <p className="textPoppins400">
                  Tem certeza que deseja excluir a pasta
                  <span className="textPoppins600"> {selectedItem?.title} </span> com
                  <span className="textPoppins600"> {selectedItem?.files_count}</span> documentos ?
                </p>
              </div>
            </Modal>
          }

        </div >
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
            value={valueInputSearchFolder}
            onChange={(value) => {
              setValueInputSearchFolder(value);
              searchFolders(value, folders);
            }}
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

        {filteredFolder.length > 0  ?
          Boolean(filteredFolder) && filteredFolder.map((item) => (
            <div key={item.id} onClick={() => setSelectedItem(item)}>
              <CardFolder
                data={item}
                setOpenMenu={setOpenMenu}
              />
            </div>
          ))
          :
          Boolean(folders.length) && folders.map((item) => (
            <div key={item.id} onClick={() => setSelectedItem(item)}>
              <CardFolder
                data={item}
                setOpenMenu={setOpenMenu}
              />
            </div>
          ))
        }



      </div>
    </MainLayout >
  );

}

export default Storage;