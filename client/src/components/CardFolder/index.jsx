import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { HiFolderMinus } from "react-icons/hi2";
import { FaEllipsisV } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

import { namesOfMonths } from "../../utils/months";
import Modal from "../Modal";
import Button from "../Button";
import { deleteFolder, updateFolder } from "../../services/foldersApi";
import { FoldersContext } from "../../context/foldersContext";

import "./style.css";
import Input from "../Input";
const CardFolder = ({ props }) => {

  const [newDate, setNewDate] = useState("");

  const [valueInputModal, setValueInputModal] = useState();

  const { handleGetFolders, setOpenMenu, openMenu, statusMenu, setStatusMenu } = useContext(FoldersContext);

  useEffect(() => {
    dateFormat();
  }, []);


  const dateFormat = () => {
    const [datePart,] = props?.date?.split(" ");
    const [day, month, year] = datePart?.split("-");

    setNewDate(day + " de " + namesOfMonths[month] + " de " + year);
  }

  const handleDeleteFolder = async () => {
    try {
      await deleteFolder(props.id);
      await handleGetFolders();
      setOpenMenu(false);

      toast.success("Excluido");
    } catch (error) {
      toast.error("Erro ao excluir");
    }
  }

  const handleRenameFolder = async () => {
    try {
      await updateFolder(props.id, { title: valueInputModal });
      setOpenMenu(false);
    } catch (error) {
      toast.error("Erro ao renomear")
    }
  }

  return (

    <>
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
                  onClick={() => handleRenameFolder()}
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
                  onClick={() => handleDeleteFolder()}
                >
                  Excluir</Button>
              </div>
              <div className="divCenter divAlignCenterText">
                <p className="textPoppins400">
                  Tem certeza que deseja excluir a pasta
                  <span className="textPoppins600"> {props?.title} </span> com
                  <span className="textPoppins600"> {props?.files_count}</span> documentos ?
                </p>
              </div>
            </Modal>
          }

        </div >
      }

      <div className="containerCardFolder">

        <div className="containerCardInfoFolder">
          <div className="divFolderIcon">
            <HiFolderMinus className="svgFolder" />
          </div>

          <div style={{ marginBottom: "1.2rem" }}>
            <p className="textPoppinsTitleCardFolder">{props?.title}</p>
            <p className="textPoppinsSubtitleCardFolder">{newDate}</p>
          </div>

          <FaEllipsisV className="svgEllipsis" style={{ cursor: "pointer" }} onClick={() => setOpenMenu(true)} />
        </div>

        <p className="textPoppinsDocsCardFolder">N° de documentos</p>
        <span className="spanQtdFiles">
          <p className="textPoppinsDocsQtdFiles">{props?.files_count}</p>
        </span>

      </div>
    </>
  );
}

export default CardFolder;