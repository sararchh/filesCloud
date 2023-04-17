import React from "react";

import './style.css';
import stevejobs from '../../images/png/stevejobs.png';

const ThowColumnLayoutLoginRegister = ({ children }) => {
  return (
    <div className="container">
      <div className="containerImage">
        <img className="image" src={stevejobs} alt="steve jobs" />
      </div>

      <div className="content">{children}</div>
    </div>
  )
}

export default ThowColumnLayoutLoginRegister;