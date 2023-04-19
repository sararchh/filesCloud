import React from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";
import Logo from "../../images/png/logo.png"

import { BsFolder2 } from "react-icons/bs";
import { BiMessageDots } from "react-icons/bi";
import { BsCardChecklist } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { RxExit } from "react-icons/rx";

const SideMenu = ({ className = "", setOpenSideMenu }) => {
  const navigate = useNavigate();

  const handleExit = () => {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className={`contentMenuBackgroud ${className}`} >
      <div className="contentMenu">
        <img src={Logo} className="imgLogo" alt="logo" />

        <div className="cardOptions" onClick={() => navigate("/storage")}>
          <BsFolder2 className="svgIcon" />
          <p className="text">Armazenamento</p>
        </div>

        <div className="cardOptions">
          <BsCardChecklist className="svgIcon" />
          <p className="text">Exemplo</p>
        </div>

        <div className="cardOptions">
          <BiMessageDots className="svgIcon" />
          <p className="text">Exemplo</p>
        </div>

        <div className="cardOptions" style={{ marginBottom: "15rem" }}>
          <AiOutlineSetting className="svgIcon" />
          <p className="text">Exemplo</p>
        </div>

        <div className="cardOptions">
          <RxExit className="svgIcon" />
          <button
            style={{ outline: "none", background: "transparent", border: "none" }}
            className="text"
            onClick={() => handleExit()}>Sair</button>
        </div>
      </div>

      <div className="divCloseSideMenu" onClick={() => setOpenSideMenu(false)} />
    </div>
  );
}

export default SideMenu;