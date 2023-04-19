import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";

import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { HiMenuAlt2 } from "react-icons/hi";

import SideMenu from "../../components/SideMenu";
import { UserContext } from "../../context/userContext";

import Logo from "../../images/png/logo.png";

import "./style.css"

const MainLayout = ({ children, pageTitle, btnReturn = false }) => {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);

  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>

      <SideMenu className={openSideMenu ? "menuMobile" : ""} setOpenSideMenu={setOpenSideMenu}/>

      <div className="contentMain">
        <header className="contentHeader">
          <div className="contentTitleAndBtn">
            {btnReturn &&
              <IoIosArrowDropleftCircle className="btnReturn" onClick={() => navigate("/storage")} />
            }
            <p className="textPoppinsTitle600">{pageTitle}</p>
          </div>

          <div className="contentHeaderUser">
            <div style={{ display: "flex", alignItems: "center" }}>
              <img className="imgAvatar" src="https://http.cat/200" alt="avatar" />
              <p className="textConfortaa">{userData?.name}</p>
            </div>
            <MdOutlineKeyboardArrowDown />
          </div>
        </header>

        <header className="contentHeaderMobile">
          <HiMenuAlt2 className="iconMenu" onClick={() => setOpenSideMenu(true)} />
          <img src={Logo} alt="logo" className="logoMobile" />

          <img className="imgAvatar" src="https://http.cat/200" alt="avatar" />
        </header>

        {children}
      </div>
    </div>
  );
}

export default MainLayout;