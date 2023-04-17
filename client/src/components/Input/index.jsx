import React from "react";

import "./style.css"

const Input = ({ type = "input", width, height, background, border, borderRadius, marginTop, marginBottom, marginRight, marginLeft, name = "", placeholder, outline, padding, value, onChange, marginTopLabel, required = false }) => {

  const styleInput = {
    width: width,
    height: height,
    background: background,
    border: border,
    borderRadius: borderRadius,
    outline: outline,
    marginTop: marginTop,
    marginBottom: marginBottom,
    marginRight: marginRight,
    marginLeft: marginLeft,
    padding: padding
  }

  return (
    <div className="contentInput" style={{ width, marginTop: marginTopLabel ? marginTopLabel : "1rem" }}>
      <label className="textPoppinsSubtitle">{name}</label>
      <input
        className="inputStyle"
        style={styleInput}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
}

export default Input;