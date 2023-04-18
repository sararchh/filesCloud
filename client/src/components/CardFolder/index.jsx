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

const CardFolder = ({ data, setOpenMenu, }) => {
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    dateFormat();
  }, []);


  const dateFormat = () => {
    const [datePart,] = data?.date?.split(" ");
    const [day, month, year] = datePart?.split("-");

    setNewDate(day + " de " + namesOfMonths[month] + " de " + year);
  }

  return (

    <>
      <div className="containerCardFolder">

        <div className="containerCardInfoFolder">
          <div className="divFolderIcon">
            <HiFolderMinus className="svgFolder" />
          </div>

          <div style={{ marginBottom: "1.2rem" }}>
            <p className="textPoppinsTitleCardFolder">{data?.title}</p>
            <p className="textPoppinsSubtitleCardFolder">{newDate}</p>
          </div>

          <FaEllipsisV className="svgEllipsis" style={{ cursor: "pointer" }} onClick={() => setOpenMenu(true)} />
        </div>

        <p className="textPoppinsDocsCardFolder">N° de documentos</p>
        <span className="spanQtdFiles">
          <p className="textPoppinsDocsQtdFiles">{data?.files_count}</p>
        </span>

      </div>
    </>
  );
}

export default CardFolder;