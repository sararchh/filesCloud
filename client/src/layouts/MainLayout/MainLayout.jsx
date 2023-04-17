import React from "react"
import SideMenu from "../../components/SideMenu";

import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import "./style.css"

const MainLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideMenu />

      <div className="contentMain">

        <header className="contentHeader">
          <p className="textPoppinsTitle600">Armazenamento</p>

          <div className="contentHeaderUser">
            <div style={{display: "flex", alignItems:"center"}}>
              <img className="imgAvatar" src="https://http.cat/200" alt="avatar" />
              <p className="textConfortaa">Nome do User</p>
            </div>
            <MdOutlineKeyboardArrowDown />
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}

export default MainLayout;