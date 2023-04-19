import React, { useContext } from "react"
import { useNavigate } from "react-router-dom";

import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoIosArrowDropleftCircle } from "react-icons/io";

import SideMenu from "../../components/SideMenu";
import { UserContext } from "../../context/userContext";

import "./style.css"

const MainLayout = ({ children, pageTitle, btnReturn = false }) => {
  const navigate = useNavigate();

  const { userData } = useContext(UserContext);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideMenu />

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

        {children}
      </div>
    </div>
  );
}

export default MainLayout;