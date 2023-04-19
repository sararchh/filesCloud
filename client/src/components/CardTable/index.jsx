import React from "react";
import { RiDeleteBin6Line, RiDownloadCloud2Line } from "react-icons/ri";

import "./style.css"
const CardTable = ({ item, dateformatted, handleDeleteFile, userData }) => {
  return (
    <>

      <tr className="containerDesktop containerTr containerTrWidth textPoppinsCheckBox" key={item.id}>
        <td className="containerT">{item.original_name}</td>
        <td className="containerT">{userData?.name}</td>
        <td className="containerT">{dateformatted}</td>
        <td className="containerT">{item.size}</td>
        <td className="containerT" >
          <a onClick={() => window.open(item.url, "_blank")} >
            <RiDownloadCloud2Line className="svgFile" />
          </a>
          <RiDeleteBin6Line className="svgFile" onClick={() => handleDeleteFile(item)} />
        </td>
      </tr>

      <tr className="containerTr containerTrMobile containerTrWidth textPoppinsCheckBox" key={item.id}>
        <div className="divStyleTitleFile">
          <td className="containerT">{item.original_name}</td>

          <td className="containerT alignIcon" >
            <a onClick={() => window.open(item.url, "_blank")} >
              <RiDownloadCloud2Line className="svgFile" />
            </a>
            <RiDeleteBin6Line className="svgFile" onClick={() => handleDeleteFile(item)} />
          </td>
        </div>

        <td className="alignTextInfos">
          <p className="textPoppinsTextFileDocs">Enviado por</p>
          <p> {userData?.name}</p>
        </td>

        <td className="alignTextInfos">
          <p className="textPoppinsTextFileDocs">Data da consulta</p>
          <p> {dateformatted}</p>
        </td>

        <td className="alignTextInfos">
          <p className="textPoppinsTextFileDocs">Tamanho</p>
          <p> {item.size}</p>
        </td>
      </tr>

    </>
  );

}

export default CardTable;