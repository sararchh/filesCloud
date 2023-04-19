import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import { FiSearch } from "react-icons/fi";
import { RiDeleteBin6Line, RiDownloadCloud2Line } from "react-icons/ri";

import MainLayout from "../../layouts/MainLayout/MainLayout";
import { getOneFolder } from "../../services/foldersApi";

import imgNuvem from "../../images/png/upload-na-nuvem.png"

import "./style.css";
import Input from "../../components/Input";

const Folder = () => {
  const { id } = useParams();
  const [folder, setFolder] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOneFolder(id);
      setFolder(data)
    }

    fetchData();
  }, []);

  return (
    <MainLayout pageTitle={folder?.title} btnReturn={true}>
      <div className="containerFolder">

        <div className="selectFile">
          <img src={imgNuvem} alt="Upload na nuvem" className="imgNuvem" />
          <p className="textPoppinsTextFile">Selecione um arquivo ou solte aqui</p>
        </div>

        <span className="inputSearchDoc">
          <Input
            width="331px"
            height="45px"
            outline="none"
            borderRadius="60px"
            border="1px solid #D7D7D7"
            background="#FFFFFF"
            placeholder="Pesquisar documento"
            padding="5px 45px"
            marginTopLabel="0"
          // value={valueInputSearchFolder}
          // onChange={(value) => {
          //   setValueInputSearchFolder(value);
          //   searchFolders(value, folders);
          // }}
          />

          <FiSearch className="svgSearchDoc" />
        </span>


        <table className="containerTable">
          <tr className="containerTr">
            <th className="textPoppinsTextFileDocs containerTh">Nome do documento</th>
            <th className="textPoppinsTextFileDocs containerTh">Enviado por</th>
            <th className="textPoppinsTextFileDocs containerTh">Data da Consulta</th>
            <th className="textPoppinsTextFileDocs containerTh">Tamanho</th>
            <td className="containerTh"></td>
            <th></th>
          </tr>

          <tr className="containerTr containerTrWidth textPoppinsCheckBox">
            <td className="containerTh">Alfreds Futterkiste</td>
            <td className="containerTh">Maria Anders</td>
            <td className="containerTh">Germany</td>
            <td className="containerTh">aa</td>
            <td className="containerTh"> <RiDownloadCloud2Line className="svgFile"/> <RiDeleteBin6Line className="svgFile"/> </td>
          </tr>
  
        </table>
      </div>
    </MainLayout>
  );
}

export default Folder;