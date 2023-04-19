import React, { useCallback, useContext, useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useParams } from 'react-router-dom';

import { FiSearch } from "react-icons/fi";

import MainLayout from "../../layouts/MainLayout/MainLayout";
import Input from "../../components/Input";

import { getOneFolder } from "../../services/foldersApi";
import { createFile, deleteFile, listFiles } from "../../services/filesApi";
import { UserContext } from "../../context/userContext";

import imgNuvem from "../../images/png/upload-na-nuvem.png"

import "./style.css";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import CardTable from "../../components/CardTable";

const Folder = () => {
  const { id } = useParams();
  const { userData } = useContext(UserContext);
  const [folder, setFolder] = useState([]);
  const [files, setFiles] = useState([]);
  const [valueInputSearchDoc, setValueInputSearchDoc] = useState("");
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(null);

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
    const newArray = files.filter((i) => i.original_name.toUpperCase().includes(value.toUpperCase()))
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

  const handleChange = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      await createFile(id, formData);
      fetchDataFiles();
      setFileUploaded(file);
    } catch (error) {
      toast.error("Erro");
    }

  };

  return (
    <MainLayout pageTitle={folder?.title} btnReturn={true}>
      <div className="containerFolder">

        <div className="selectFile">
          <img src={imgNuvem} alt="Upload na nuvem" className="imgNuvem" />

          <FileUploader
            handleChange={handleChange}
            name="file"
            label="Selecione um arquivo ou solte aqui"
            hoverTitle="Selecione um arquivo ou solte aqui"
            classes="drop_area"
            children={fileUploaded ? "Upload realizado. Realizar outro?" : null}
          />
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
          <tr className="containerTrInfosTitle">
            <th className="textPoppinsTextFileDocs containerT">Nome do documento</th>
            <th className="textPoppinsTextFileDocs containerT">Enviado por</th>
            <th className="textPoppinsTextFileDocs containerT">Data da Consulta</th>
            <th className="textPoppinsTextFileDocs containerT">Tamanho</th>
            <th></th>
          </tr>

          {filteredFiles.length > 0 ?
            filteredFiles.map((item) => {
              const dateformatted = handleFormatDate(item.updatedAt)
              return (
                <CardTable
                  key={item.id}
                  item={item}
                  dateformatted={dateformatted}
                  handleDeleteFile={handleDeleteFile}
                  userData={userData}
                />
              )
            })

            :
            Boolean(files.length) && files.map((item) => {
              const dateformatted = handleFormatDate(item.updatedAt)

              return (
                <CardTable
                  key={item.id}
                  item={item}
                  dateformatted={dateformatted}
                  handleDeleteFile={handleDeleteFile}
                  userData={userData}
                />
              )
            })
          }


        </table>
      </div>
    </MainLayout>
  );
}

export default Folder;