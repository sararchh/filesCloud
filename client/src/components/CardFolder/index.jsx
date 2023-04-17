import React from "react";
import { HiFolderMinus } from "react-icons/hi2";
import { FaEllipsisV } from "react-icons/fa";

import "./style.css";

const CardFolder = ({title, files_count, date}) => {
  return (
    <div className="containerCardFolder">

      <div className="containerCardInfoFolder">
        <div className="divFolderIcon">
          <HiFolderMinus className="svgFolder" />
        </div>

        <div style={{ marginBottom: "1.2rem" }}>
          <p className="textPoppinsTitleCardFolder">{title}</p>
          <p className="textPoppinsSubtitleCardFolder">{date}</p>
        </div>

        <FaEllipsisV className="svgEllipsis" />
      </div>

      <p className="textPoppinsDocsCardFolder">N° de documentos</p>
      <span className="spanQtdFiles">
        <p className="textPoppinsDocsQtdFiles">{files_count}</p>
      </span>

    </div>
  );
}

export default CardFolder;