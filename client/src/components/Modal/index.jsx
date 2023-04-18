import React from "react";

import "./style.css";
const Modal = ({ children }) => {

  return (
    <div className="modal">
      <div className="cardModal">
        {children}
      </div>
    </div>
  );
}

export default Modal;