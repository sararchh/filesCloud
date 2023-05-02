import React from "react";

import './style.css';
import image from '../../images/svg/undraw_cloud_hosting_7xb1.svg';

const ThowColumnLayoutLoginRegister = ({ children }) => {
  return (
    <div className="container">
      <div className="containerImage">
        <img className="image" src={image} alt="logo" />
      </div>

      <div className="content">{children}</div>
    </div>
  )
}

export default ThowColumnLayoutLoginRegister;