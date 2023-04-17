import React from "react";
import { HiFolderMinus } from "react-icons/hi2";
import { FaEllipsisV } from "react-icons/fa";

import "./style.css";

const CardFolder = () => {
  return (
    <div className="containerCardFolder">

      <div className="containerCardInfoFolder">
        <div className="divFolderIcon">
          <HiFolderMinus className="svgFolder" />
        </div>

        <div style={{ marginBottom: "1.2rem" }}>
          <p className="textPoppinsTitleCardFolder">Notas Fiscais</p>
          <p className="textPoppinsSubtitleCardFolder">9 de setembro de 2023</p>
        </div>

        <FaEllipsisV className="svgEllipsis" />
      </div>

      <p className="textPoppinsDocsCardFolder">N° de documentos</p>
      <span className="spanQtdFiles">
        <p className="textPoppinsDocsQtdFiles">750</p>
      </span>

    </div>
  );
}

export default CardFolder;