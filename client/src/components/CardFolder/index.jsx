import React, { useEffect, useState } from "react";

import { HiFolderMinus } from "react-icons/hi2";
import { FaEllipsisV } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

import { namesOfMonths } from "../../utils/months";
import Modal from "../Modal";

import "./style.css";
const CardFolder = ({ props }) => {
  const [newDate, setNewDate] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [statusMenu, setStatusMenu] = useState(0);

  useEffect(() => {
    dateFormat();
  }, []);

  const dateFormat = () => {
    const [datePart,] = props?.date?.split(" ");
    const [day, month, year] = datePart?.split("-");

    setNewDate(day + " de " + namesOfMonths[month] + " de " + year);
  }

  const handleDeleteFolder = () => {
    console.log("excluir", props);
  }

  return (

    <>
      {openMenu === true &&
        <div className="modal">
          {statusMenu === 0 &&
            < Modal >
              <div className="listing">
                <p className="textPoppinsTitleCardFolder">Ações</p>
                <GrClose className="svgModal" onClick={() => { setOpenMenu(false) }} />
              </div>
              <div className="listing divCenter">
                <p className="textPoppinsTitleCardFolder" onClick={() => console.log("editar", props)}>Editar nome pasta</p>
              </div>
              <div className="listing divCenter">
                <p className="textPoppinsRed" onClick={() => setStatusMenu(2)}>Excluir pasta</p>
              </div>
            </Modal>
          }

          {statusMenu === 2 &&
            < Modal >
              <div className="listing">
                <p className="textPoppinsTitleCardFolder">Ações</p>
                <GrClose className="svgModal" onClick={() => { setOpenMenu(false) }} />
              </div>
              <div className="divCenter divAlignCenterText">
                <p className="textPoppinsTitleCardFolder">
                  Tem certeza que deseja excluir a pasta {props?.title} com {props?.files_count} documentos ?
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