import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";

import Input from "../../components/Input";

import { FiSearch } from "react-icons/fi";

import "./style.css";
import Button from "../../components/Button";

const Storage = () => {
  const [valueInput, setValueInput] = useState();

  return (
    <MainLayout>

      <div className="contentSearch">
        <span className="inputSearch">
          <Input
            width="331px"
            height="45px"
            borderRadius="60px"
            border="1px solid #D7D7D7"
            background="#FFFFFF"
            placeholder="Pesquisar pasta"
            padding="5px 45px"
            marginTopLabel="0"
            value={valueInput}
            onChange={(value) => setValueInput(value)}
          />

          <FiSearch className="svgSearch" />
        </span>

        <Button
          type="button"
          color="white"
          width="176px"
          height="45px"
          background="#476EE6"
          borderRadius="60px"
          border="none"
        >
          Nova Pasta
        </Button>
      </div>


      <p>Storage</p>
    </MainLayout>
  );

}

export default Storage;