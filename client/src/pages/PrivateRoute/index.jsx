import React from "react";

import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const mail = localStorage.getItem("@MAIL");

  return mail != undefined ? children : <Navigate to="/" />
}

export default PrivateRoute;