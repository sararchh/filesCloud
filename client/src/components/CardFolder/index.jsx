import React, { useEffect, useState } from "react";
import { HiFolderMinus } from "react-icons/hi2";
import { FaEllipsisV } from "react-icons/fa";

import "./style.css";
import { namesOfMonths } from "../../utils/months";

const CardFolder = ({ title, files_count, date }) => {
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    dateFormat();
  }, []);

  const dateFormat = () => {
    const [datePart, hourPart] = date?.split(" ");
    const [day, month, year] = datePart?.split("-");

    setNewDate(day + " de " +  namesOfMonths[month] + " de " + year);
  }

  return (
    <div className="containerCardFolder">

      <div className="containerCardInfoFolder">
        <div className="divFolderIcon">
          <HiFolderMinus className="svgFolder" />
        </div>

        <div style={{ marginBottom: "1.2rem" }}>
          <p className="textPoppinsTitleCardFolder">{title}</p>
          <p className="textPoppinsSubtitleCardFolder">{newDate}</p>
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