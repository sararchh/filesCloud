import React from "react";

import "./style.css";
const Modal = ({ children }) => {

  return (
    <div className="cardModal">
      {children}
    </div>
  );
}

export default Modal;