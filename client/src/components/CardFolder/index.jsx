import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { HiFolderMinus } from "react-icons/hi2";
import { FaEllipsisV } from "react-icons/fa";

import { namesOfMonths } from "../../utils/months";

import "./style.css";

const CardFolder = ({ data, setOpenMenu, }) => {
  const navigate = useNavigate();
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

          <div style={{ marginBottom: "1.2rem", cursor:"pointer" }} onClick={()=> navigate(`/storage/folder/${data?.id}`)}>
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