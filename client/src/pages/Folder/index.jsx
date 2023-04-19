import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import { FiSearch } from "react-icons/fi";
import { RiDeleteBin6Line, RiDownloadCloud2Line } from "react-icons/ri";

import MainLayout from "../../layouts/MainLayout/MainLayout";
import Input from "../../components/Input";

import { getOneFolder } from "../../services/foldersApi";
import { deleteFile, listFiles } from "../../services/filesApi";
import { UserContext } from "../../context/userContext";

import imgNuvem from "../../images/png/upload-na-nuvem.png"

import "./style.css";
import { debounce } from "lodash";
import { toast } from "react-toastify";

const Folder = () => {
  const { id } = useParams();
  const { userData } = useContext(UserContext);
  const [folder, setFolder] = useState([]);
  const [files, setFiles] = useState([]);
  const [valueInputSearchDoc, setValueInputSearchDoc] = useState("");
  const [filteredFiles, setFilteredFiles] = useState([]);

  useEffect(() => {
    const fetchDataFolder = async () => {
      const data = await getOneFolder(id);
      setFolder(data)
    }

    fetchDataFiles();
    fetchDataFolder();
  }, []);


  const fetchDataFiles = async () => {
    const data = await listFiles(id);
    setFiles(data)
  }

  const searchFilesDoc = useCallback(
    debounce((value, files) => filterFiles(value, files), 500),
    []
  );

  const filterFiles = (value, files) => {
    const newArray = files.filter((i) => i.original_name.toUpperCase().trim() === value.toUpperCase().trim());
    setFilteredFiles(newArray);
  }

  const handleFormatDate = (date) => {
    const newDate = new Date(date);
    const dataformatted = newDate.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(',', ' -');

    return dataformatted;
  }

  const handleDeleteFile = async (item) => {
    try {
      await deleteFile(item.id);
      fetchDataFiles();
      toast.success("Excluido");
    } catch (error) {
      toast.error("Erro ao excluir");
    }
  }

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
            value={valueInputSearchDoc}
            onChange={(value) => {
              setValueInputSearchDoc(value);
              searchFilesDoc(value, files);
            }}
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

          {filteredFiles.length > 0 ?
            filteredFiles.map((item) => {
              const dateformatted = handleFormatDate(item.updatedAt)
              return (
                <tr className="containerTr containerTrWidth textPoppinsCheckBox" key={item.id}>
                  <td className="containerTh">{item.original_name}</td>
                  <td className="containerTh">{userData?.name}</td>
                  <td className="containerTh">{dateformatted}</td>
                  <td className="containerTh">{item.size}</td>
                  <td className="containerTh" >
                    <RiDownloadCloud2Line className="svgFile" />
                    <RiDeleteBin6Line className="svgFile" onClick={() => handleDeleteFile(item)} />
                  </td>
                </tr>
              )
            })

            :
            Boolean(files.length) && files.map((item) => {
              const dateformatted = handleFormatDate(item.updatedAt)

              return (
                <tr className="containerTr containerTrWidth textPoppinsCheckBox" key={item.id}>
                  <td className="containerTh">{item.original_name}</td>
                  <td className="containerTh">{userData?.name}</td>
                  <td className="containerTh">{dateformatted}</td>
                  <td className="containerTh">{item.size}</td>
                  <td className="containerTh">
                    <RiDownloadCloud2Line className="svgFile" />
                    <RiDeleteBin6Line className="svgFile" onClick={() => handleDeleteFile(item)} />
                  </td>
                </tr>
              )
            })
          }


        </table>
      </div>
    </MainLayout>
  );
}

export default Folder;